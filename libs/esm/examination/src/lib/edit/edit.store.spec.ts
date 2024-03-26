import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  APP_STORE_PROVIDER,
  ResultBuilder,
  TESTING_COMMON_IMPORTS,
} from '@esm/cdk';
import { CreateExaminationRequest, ExaminationStatus } from '@esm/data';
import { ExaminationService } from '@esm/api';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { ExaminationEditStore } from './edit.store';

describe('ExaminationEditStore', () => {
  let store: ExaminationEditStore;
  let mockExaminationService: jasmine.SpyObj<ExaminationService>;
  let router: Router;

  beforeEach(async () => {
    mockExaminationService = jasmine.createSpyObj<ExaminationService>(
      'ExaminationService',
      ['create'],
    );

    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        APP_STORE_PROVIDER,
        ExaminationEditStore,
        {
          provide: ExaminationService,
          useValue: mockExaminationService,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(ExaminationEditStore);
    router = TestBed.inject(Router);
  });

  it('should have initial state', () => {
    const expected = cold('a', { a: 'idle' });
    expect(store.status$).toBeObservable(expected);
  });

  describe('Effect create', () => {
    const params: CreateExaminationRequest = {
      name: 'Mock name',
      displayId: 'Mock ID',
      description: 'Mock description',
      expectStartAt: new Date(2023, 0, 1, 7, 0, 0, 0),
      expectEndAt: new Date(2023, 1, 1, 7, 0, 0, 0),
      createdAt: new Date(),
    };

    it('[Called] should patch state `loading`', () => {
      mockExaminationService.create.and.returnValue(cold('--|'));
      const expected = cold('a', { a: 'loading' });

      store.create(params);

      expect(store.status$).toBeObservable(expected);
      expect(mockExaminationService.create).toHaveBeenCalled();
    });

    it('[Create successful] should navigate to created examination', fakeAsync(() => {
      const navigateSpy = spyOn(router, 'navigateByUrl');

      mockExaminationService.create.and.returnValue(
        of(
          ResultBuilder.success({
            id: 'mock-id',
            displayId: 'Mock display ID',
            name: 'Mock name',
            description: 'Mock description',
            expectStartAt: params.expectStartAt?.toUTCString() ?? '',
            expectEndAt: params.expectEndAt?.toUTCString() ?? '',
            status: ExaminationStatus.Idle,
            createdAt: new Date(),
            updatedAt: null,
            createdBy: {
              id: 'Mock',
              invigilatorId: 'Mock',
              fullName: 'Mock',
              email: 'Mock',
              createdAt: new Date(2023, 1, 1),
              department: null,
              faculty: null,
              role: 'ExaminationDepartmentHead',
              isMale: true,
              phoneNumber: '',
            },
          }),
        ),
      );

      store.create(params);

      expect(navigateSpy).toHaveBeenCalledWith('mock-id/exam/data');
    }));

    it('[Error] should patch state `error`', fakeAsync(() => {
      mockExaminationService.create.and.returnValue(cold('--#'));
      const expected = cold('a-b', { a: 'loading', b: 'error' });

      store.create(params);

      expect(store.status$).toBeObservable(expected);
    }));
  });
});
