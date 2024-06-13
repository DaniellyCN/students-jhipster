import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import StudentService from './student.service';
import { type IStudent } from '@/shared/model/student.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Student',
  setup() {
    const { t: t$ } = useI18n();
    const studentService = inject('studentService', () => new StudentService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const students: Ref<IStudent[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveStudents = async () => {
      isFetching.value = true;
      try {
        const res = await studentService().retrieve();
        students.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveStudents();
    };

    onMounted(async () => {
      await retrieveStudents();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IStudent) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeStudent = async () => {
      try {
        await studentService().delete(removeId.value);
        const message = t$('studentsApp.student.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveStudents();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      students,
      handleSyncList,
      isFetching,
      retrieveStudents,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeStudent,
      t$,
    };
  },
});
