import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import StudentService from './student.service';
import { type IStudent } from '@/shared/model/student.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'StudentDetails',
  setup() {
    const studentService = inject('studentService', () => new StudentService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const student: Ref<IStudent> = ref({});

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

    return {
      alertService,
      student,

      previousState,
      t$: useI18n().t,
    };
  },
});
