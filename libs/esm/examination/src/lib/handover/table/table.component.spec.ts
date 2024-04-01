import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { ExaminationHandoverStore } from '../handover.store';
import { ExaminationHandoverTableComponent } from './table.component';

describe('ExaminationHandoverTableComponent', () => {
  let component: ExaminationHandoverTableComponent;
  let fixture: ComponentFixture<ExaminationHandoverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, ExaminationHandoverStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationHandoverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
