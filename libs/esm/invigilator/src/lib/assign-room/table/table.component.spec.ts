import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { InvigilatorAssignRoomStore } from '../assign-room.store';
import {
  InvigilatorAssignRoomTableComponent,
  TAIGA_UI,
} from './table.component';

describe('InvigilatorAssignRoomTableComponent', () => {
  let component: InvigilatorAssignRoomTableComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [ESM_STORE_PROVIDER, InvigilatorAssignRoomStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
