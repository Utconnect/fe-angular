import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import {
  EsmDialogEditFacultyComponent,
  NGRX,
  TAIGA_UI,
} from './edit-faculty.component';

describe('EditFacultyDialogComponent', () => {
  let component: EsmDialogEditFacultyComponent;
  let fixture: ComponentFixture<EsmDialogEditFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI],
      providers: [
        ESM_STORE_PROVIDER,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {
              moduleId: null,
              moduleName: null,
              department: null,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmDialogEditFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
