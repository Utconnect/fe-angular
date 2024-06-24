import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarMenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: TopBarMenuComponent;
  let fixture: ComponentFixture<TopBarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
