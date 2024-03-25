import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataDepartmentComponent, TAIGA_UI } from './department.component';

describe('DataDepartmentComponent', () => {
  let component: DataDepartmentComponent;
  let fixture: ComponentFixture<DataDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
