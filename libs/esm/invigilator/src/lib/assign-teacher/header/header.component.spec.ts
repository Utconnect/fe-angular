import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { provideComponentStore } from '@ngrx/component-store';
import { InvigilatorAssignTeacherStore } from '../assign-teacher.store';
import {
  InvigilatorAssignTeacherHeaderComponent,
  TAIGA_UI,
} from './header.component';

describe('InvigilatorAssignTeacherHeaderComponent', () => {
  let component: InvigilatorAssignTeacherHeaderComponent;
  let fixture: ComponentFixture<InvigilatorAssignTeacherHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TAIGA_UI],
      providers: [
        ESM_STORE_PROVIDER,
        provideComponentStore(InvigilatorAssignTeacherStore),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignTeacherHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
