import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESM_STORE_PROVIDER } from '@esm/test';
import { LetModule } from '@ngrx/component';
import { TESTING_COMMON_IMPORTS } from '@utconnect/test';
import { InvigilatorAssignRoomComponent } from './assign-room.component';

describe('AssignRoomComponent', () => {
  let component: InvigilatorAssignRoomComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, LetModule],
      providers: [ESM_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
