import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { ExaminationEditFinishExaminationComponent } from './finish-examination.component';
import { ExaminationEditFinishExaminationStore } from './finish-examination.store';

describe('ExaminationEditFinishExaminationComponent', () => {
  let component: ExaminationEditFinishExaminationComponent;
  let fixture: ComponentFixture<ExaminationEditFinishExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, ExaminationEditFinishExaminationStore],
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
