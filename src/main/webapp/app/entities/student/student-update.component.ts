import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import StudentService from './student.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IStudent, Student } from '@/shared/model/student.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'StudentUpdate',
  setup() {
    const studentService = inject('studentService', () => new StudentService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const student: Ref<IStudent> = ref(new Student());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveStudent = async studentId => {
      try {
        const res = await studentService().find(studentId);
        student.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.studentId) {
      retrieveStudent(route.params.studentId);
    }

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      firstName: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      lastName: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      email: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      age: {},
    };
    const v$ = useVuelidate(validationRules, student as any);
    v$.value.$validate();

    return {
      studentService,
      alertService,
      student,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.student.id) {
        this.studentService()
          .update(this.student)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('studentsApp.student.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.studentService()
          .create(this.student)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('studentsApp.student.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
