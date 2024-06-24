import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: TopBarUserComponent;
  let fixture: ComponentFixture<TopBarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
