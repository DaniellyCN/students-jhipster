/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Student from './student.vue';
import StudentService from './student.service';
import AlertService from '@/shared/alert/alert.service';

type StudentComponentType = InstanceType<typeof Student>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Student Management Component', () => {
    let studentServiceStub: SinonStubbedInstance<StudentService>;
    let mountOptions: MountingOptions<StudentComponentType>['global'];

    beforeEach(() => {
      studentServiceStub = sinon.createStubInstance<StudentService>(StudentService);
      studentServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          studentService: () => studentServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        studentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Student, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(studentServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.students[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: StudentComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Student, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        studentServiceStub.retrieve.reset();
        studentServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        studentServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeStudent();
        await comp.$nextTick(); // clear components

        // THEN
        expect(studentServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(studentServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
