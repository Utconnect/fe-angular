import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { InvigilatorAssignRoomStore } from '../assign-room.store';
import { InvigilatorAssignRoomHeaderComponent } from './header.component';

describe('InvigilatorAssignRoomHeaderComponent', () => {
  let component: InvigilatorAssignRoomHeaderComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [ESM_STORE_PROVIDER, InvigilatorAssignRoomStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
