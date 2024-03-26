import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationGeneralComponent } from './general.component';

describe('GeneralComponent', () => {
  let component: ExaminationGeneralComponent;
  let fixture: ComponentFixture<ExaminationGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(ExaminationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
