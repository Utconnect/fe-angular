import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmPaidInvigilatorComponent } from './invigilator.component';

describe('InvigilatorComponent', () => {
  let component: EsmPaidInvigilatorComponent;
  let fixture: ComponentFixture<EsmPaidInvigilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(EsmPaidInvigilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
