/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import StudentDetails from './student-details.vue';
import StudentService from './student.service';
import AlertService from '@/shared/alert/alert.service';

type StudentDetailsComponentType = InstanceType<typeof StudentDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const studentSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Student Management Detail Component', () => {
    let studentServiceStub: SinonStubbedInstance<StudentService>;
    let mountOptions: MountingOptions<StudentDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      studentServiceStub = sinon.createStubInstance<StudentService>(StudentService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          studentService: () => studentServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        studentServiceStub.find.resolves(studentSample);
        route = {
          params: {
            studentId: '' + 123,
          },
        };
        const wrapper = shallowMount(StudentDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.student).toMatchObject(studentSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        studentServiceStub.find.resolves(studentSample);
        const wrapper = shallowMount(StudentDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
