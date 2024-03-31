import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  EsmEditModuleDialogComponent,
  NGRX,
  TAIGA_UI,
} from './edit-module.component';

describe('AddModuleDialogComponent', () => {
  let component: EsmEditModuleDialogComponent;
  let fixture: ComponentFixture<EsmEditModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI],
      providers: [
        APP_STORE_PROVIDER,
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

    fixture = TestBed.createComponent(EsmEditModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
