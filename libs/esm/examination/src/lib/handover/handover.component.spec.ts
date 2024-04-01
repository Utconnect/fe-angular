import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { ExaminationHandoverComponent, TAIGA_UI } from './handover.component';

describe('HandoverComponent', () => {
  let component: ExaminationHandoverComponent;
  let fixture: ComponentFixture<ExaminationHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, LetModule, TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {
              handedOverUserId: null,
              report: '',
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
