import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsmHomeComponent } from './home.component';

describe('EsmHomeComponent', () => {
  let component: EsmHomeComponent;
  let fixture: ComponentFixture<EsmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsmHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
