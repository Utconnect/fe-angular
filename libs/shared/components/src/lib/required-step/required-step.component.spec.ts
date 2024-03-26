import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER } from '@esm/cdk';
import { SafeExaminationDataComponent } from './safe-examination-data.component';

describe('SafeExaminationDataComponent', () => {
  let component: SafeExaminationDataComponent;
  let fixture: ComponentFixture<SafeExaminationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeExaminationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
