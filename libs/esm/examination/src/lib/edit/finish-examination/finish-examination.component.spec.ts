import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { ExaminationEditFinishExaminationComponent } from './finish-examination.component';
import { ExaminationEditFinishExaminationStore } from './finish-examination.store';

describe('ExaminationEditFinishExaminationComponent', () => {
  let component: ExaminationEditFinishExaminationComponent;
  let fixture: ComponentFixture<ExaminationEditFinishExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [ESM_STORE_PROVIDER, ExaminationEditFinishExaminationStore],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ExaminationEditFinishExaminationComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
