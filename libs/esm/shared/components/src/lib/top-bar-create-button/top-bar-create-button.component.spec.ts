import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarCreateButtonComponent } from './top-bar-create-button.component';

describe('TopBarCreateButtonComponent', () => {
  let component: TopBarCreateButtonComponent;
  let fixture: ComponentFixture<TopBarCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarCreateButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
