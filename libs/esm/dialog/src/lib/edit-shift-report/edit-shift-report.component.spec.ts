import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESMDomainEnumsExamMethod, GetHandoverDataData } from '@esm/api';
import { EsmExamMethodPipe } from '@esm/pipes';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import {
  EsmEditShiftReportDialogComponent,
  NGRX,
  TAIGA_UI,
} from './edit-shift-report.component';

describe('EditShiftReportDialogComponent', () => {
  let component: EsmEditShiftReportDialogComponent;
  let fixture: ComponentFixture<EsmEditShiftReportDialogComponent>;
  const defaultContext: GetHandoverDataData['data'][number] = {
    handedOverUserId: null,
    report: '',
    id: '',
    invigilatorShift: [
      {
        id: '',
        orderIndex: 1,
        invigilator: {
          department: {
            faculty: {
              name: '',
            },
            name: '',
          },
          fullName: '',
          id: '',
        },
      },
    ],
    room: {
      displayId: '',
    },
    shiftGroup: {
      id: '',
      method: ESMDomainEnumsExamMethod.Oral,
      startAt: new Date(),
      shift: null,
      departmentAssign: false,
      module: {
        displayId: 'mock-module-id',
        name: 'Mock module name',
        faculty: {
          displayId: null,
          name: '',
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, EsmExamMethodPipe, NGRX, TAIGA_UI],
      providers: [
        ESM_STORE_PROVIDER,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: defaultContext,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmEditShiftReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
