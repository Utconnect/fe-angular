import { ESM_CONFIG } from '@esm/config';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import {
  DiagramAllModule,
  DiagramModule,
} from '@syncfusion/ej2-angular-diagrams';
import { EsmExaminationProcessComponent, TAIGA_UI } from './process.component';
import { ExaminationProcessStore } from './process.store';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';

describe('ExaminationProcessComponent', () => {
  let component: EsmExaminationProcessComponent;
  let fixture: ComponentFixture<EsmExaminationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TESTING_COMMON_IMPORTS,
        DiagramModule,
        DiagramAllModule,
        LetModule,
        TAIGA_UI,
      ],
      providers: [
        ExaminationProcessStore,
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmExaminationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
