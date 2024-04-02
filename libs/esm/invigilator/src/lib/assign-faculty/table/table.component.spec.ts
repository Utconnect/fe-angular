import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';
import { InvigilatorAssignFacultyTableComponent } from './table.component';

describe('InvigilatorAssignFacultyTableComponent', () => {
  let component: InvigilatorAssignFacultyTableComponent;
  let fixture: ComponentFixture<InvigilatorAssignFacultyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        InvigilatorAssignFacultyStore,
        provideMockStore({
          initialState: {
            [esmFeatureKey]: esmInitialState,
          },
        }),
        { provide: ESM_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignFacultyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
