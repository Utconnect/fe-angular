import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import {
  InvigilatorAssignTeacherComponent,
  NGRX,
} from './assign-teacher.component';

describe('InvigilatorAssignTeacherComponent', () => {
  let component: InvigilatorAssignTeacherComponent;
  let fixture: ComponentFixture<InvigilatorAssignTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX],
      providers: [ESM_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should handle update status changes', () => {
      const updateStatusChangesSpy = spyOn<any>(
        component,
        'handleUpdateStatusChanges',
      );
      component.ngOnInit();
      expect(updateStatusChangesSpy).toHaveBeenCalled();
    });
  });
});
