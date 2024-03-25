import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  DataInvigilatorComponent,
  NGRX,
  TAIGA_UI,
} from './invigilator.component';

describe('DataInvigilatorComponent', () => {
  let component: DataInvigilatorComponent;
  let fixture: ComponentFixture<DataInvigilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI, ScrollingModule],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
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
