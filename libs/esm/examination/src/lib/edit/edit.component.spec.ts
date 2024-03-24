import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { ExaminationEditComponent, TAIGA_UI } from './edit.component';

describe('ExaminationEditComponent', () => {
  let component: ExaminationEditComponent;
  let fixture: ComponentFixture<ExaminationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCreate', () => {
    it('should call `store.create`', () => {
      const spy = spyOn(component['store'], 'create');

      component['buildCreateForm']();

      component.form!.patchValue({
        description: 'Mock description',
        displayId: 'Mock ID',
        name: 'Mock name',
        expectedDateRange: new TuiDayRange(
          new TuiDay(2023, 0, 1),
          new TuiDay(2023, 1, 1),
        ),
      });

      component.onCreate();

      expect(spy).toHaveBeenCalled();
    });
  });
});
