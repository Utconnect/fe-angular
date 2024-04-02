import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { EsmConfirmDialogComponent, NGRX, TAIGA_UI } from './confirm.component';

describe('EsmConfirmDialogComponent', () => {
  let component: EsmConfirmDialogComponent;
  let fixture: ComponentFixture<EsmConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NGRX, TAIGA_UI],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {
              moduleId: null,
              moduleName: null,
              department: null,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EsmConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
