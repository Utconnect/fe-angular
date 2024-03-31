import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmTopBarCreateButtonComponent } from './top-bar-create-button.component';

describe('TopBarCreateButtonComponent', () => {
  let component: EsmTopBarCreateButtonComponent;
  let fixture: ComponentFixture<EsmTopBarCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsmTopBarCreateButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmTopBarCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
