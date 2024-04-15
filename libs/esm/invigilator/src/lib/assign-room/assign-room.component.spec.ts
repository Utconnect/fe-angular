import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { LetModule } from '@ngrx/component';
import { InvigilatorAssignRoomComponent } from './assign-room.component';

describe('AssignRoomComponent', () => {
  let component: InvigilatorAssignRoomComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, LetModule],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
