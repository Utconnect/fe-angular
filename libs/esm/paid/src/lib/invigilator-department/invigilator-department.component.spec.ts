import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmPaidInvigilatorDepartmentComponent } from './invigilator-department.component';

describe('InvigilatorDepartmentComponent', () => {
  let component: EsmPaidInvigilatorDepartmentComponent;
  let fixture: ComponentFixture<EsmPaidInvigilatorDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(EsmPaidInvigilatorDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
