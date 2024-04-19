import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmExaminationReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: EsmExaminationReportComponent;
  let fixture: ComponentFixture<EsmExaminationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(EsmExaminationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
