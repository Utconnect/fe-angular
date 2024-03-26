import { ComponentFixture, TestBed } from '@angular/core/testing';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { DataDepartmentComponent } from './department.component';

describe('DataDepartmentComponent', () => {
  let component: DataDepartmentComponent;
  let fixture: ComponentFixture<DataDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
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
