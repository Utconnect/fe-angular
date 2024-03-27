import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataFacultyComponent, NGRX, TAIGA_UI } from './faculty.component';

describe('DataFacultyComponent', () => {
  let component: DataFacultyComponent;
  let fixture: ComponentFixture<DataFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NGRX, TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
