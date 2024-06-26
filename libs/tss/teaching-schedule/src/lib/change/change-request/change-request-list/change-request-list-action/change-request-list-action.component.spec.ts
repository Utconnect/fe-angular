import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TssTeachingChangeRequestListActionComponent } from './change-request-list-action.component';

describe('TssTeachingChangeRequestListActionComponent', () => {
  let component: TssTeachingChangeRequestListActionComponent;
  let fixture: ComponentFixture<TssTeachingChangeRequestListActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TssTeachingChangeRequestListActionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TssTeachingChangeRequestListActionComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
