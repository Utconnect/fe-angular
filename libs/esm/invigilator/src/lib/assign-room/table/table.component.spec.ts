import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
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
      providers: [APP_STORE_PROVIDER, InvigilatorAssignRoomStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
