import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { DataInvigilatorComponent } from './invigilator.component';

describe('DataInvigilatorComponent', () => {
  let component: DataInvigilatorComponent;
  let fixture: ComponentFixture<DataInvigilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataInvigilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
