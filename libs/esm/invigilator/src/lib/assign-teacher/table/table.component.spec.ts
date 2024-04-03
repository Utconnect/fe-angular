import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { provideComponentStore } from '@ngrx/component-store';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { InvigilatorAssignTeacherStore } from '../assign-teacher.store';
import {
  InvigilatorAssignTeacherTableComponent,
  TAIGA_UI,
} from './table.component';

describe('InvigilatorAssignTeacherTableComponent', () => {
  let component: InvigilatorAssignTeacherTableComponent;
  let fixture: ComponentFixture<InvigilatorAssignTeacherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [
        ESM_STORE_PROVIDER,
        provideComponentStore(InvigilatorAssignTeacherStore),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignTeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
