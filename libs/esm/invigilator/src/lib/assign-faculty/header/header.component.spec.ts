import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';
import { InvigilatorAssignFacultyHeaderComponent } from './header.component';

describe('InvigilatorAssignFacultyHeaderComponent', () => {
  let component: InvigilatorAssignFacultyHeaderComponent;
  let fixture: ComponentFixture<InvigilatorAssignFacultyHeaderComponent>;

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

    fixture = TestBed.createComponent(InvigilatorAssignFacultyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
