import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import {
  ExaminationDataFinalComponent,
  NGRX,
  TAIGA_UI,
} from './final.component';

describe('ExaminationDataFinalComponent', () => {
  let component: ExaminationDataFinalComponent;
  let fixture: ComponentFixture<ExaminationDataFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, ScrollingModule, NGRX, TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initial methods', () => {
      const storeSpy = spyOn(component['store'], 'getData');
      component.ngOnInit();
      expect(storeSpy).toHaveBeenCalled();
    });
  });
});
