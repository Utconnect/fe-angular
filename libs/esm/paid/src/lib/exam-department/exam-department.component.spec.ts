import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmPaidExamDepartmentComponent } from './exam-department.component';

describe('ExamDepartmentComponent', () => {
  let component: EsmPaidExamDepartmentComponent;
  let fixture: ComponentFixture<EsmPaidExamDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(EsmPaidExamDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
