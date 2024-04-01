import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { ExaminationExamStore } from '../exam.store';
import { ExaminationExamHeaderComponent } from './header.component';

describe('ExaminationExamHeaderComponent', () => {
  let component: ExaminationExamHeaderComponent;
  let fixture: ComponentFixture<ExaminationExamHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        ExaminationExamStore,
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationExamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
