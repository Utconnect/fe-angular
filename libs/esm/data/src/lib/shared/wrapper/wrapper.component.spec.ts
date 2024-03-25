import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { DataWrapperComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: DataWrapperComponent;
  let fixture: ComponentFixture<DataWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
    }).compileComponents();

    fixture = TestBed.createComponent(DataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
