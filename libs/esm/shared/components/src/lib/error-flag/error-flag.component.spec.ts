import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmErrorFlagComponent } from './error-flag.component';

describe('EsmErrorFlagComponent', () => {
  let component: EsmErrorFlagComponent;
  let fixture: ComponentFixture<EsmErrorFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(EsmErrorFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
