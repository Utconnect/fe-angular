import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import {
  ExaminationDataImportComponent,
  NGRX,
  TAIGA_UI,
} from './import.component';
import { ExaminationDataImportStore } from './import.store';

describe('ExaminationDataImportComponent', () => {
  let component: ExaminationDataImportComponent;
  let fixture: ComponentFixture<ExaminationDataImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI],
      providers: [
        ExaminationDataImportStore,
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should handle observables', () => {
      const spy = spyOn<any>(component, 'handleUploadSuccess');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('removeFile', () => {
    it('should assign null to `file`', () => {
      component.removeFile();
      expect(component.file).toEqual(null);
    });
  });

  describe('clearRejected', () => {
    it('should call methods', () => {
      const storeSpy = spyOn(component['store'], 'clearRejected');
      const removeFileSpy = spyOn(component, 'removeFile');

      component.clearRejected();

      expect(storeSpy).toHaveBeenCalled();
      expect(removeFileSpy).toHaveBeenCalled();
    });
  });

  describe('importFile', () => {
    it('should call `store.import`', () => {
      const storeSpy = spyOn(component['store'], 'import');
      component.importFile(new File([], 'Mock file'));
      expect(storeSpy).toHaveBeenCalled();
    });
  });

  describe('handleUploadSuccess', () => {
    it('[Success] Reload examination', fakeAsync(() => {
      const spy = spyOn(component['store'], 'reloadExamination');
      component['store'].patchState({ status: 'success' });
      component.status$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
      });
    }));

    it('[Success] Reload examination', fakeAsync(() => {
      const spy = spyOn(component['store'], 'reloadExamination');
      for (const status of ['idle', 'loading', 'error'] as const) {
        component['store'].patchState({ status });
        component.status$.subscribe(() => {
          expect(spy).not.toHaveBeenCalled();
        });
      }
    }));
  });
});
