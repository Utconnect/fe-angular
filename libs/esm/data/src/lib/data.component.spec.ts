import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { DataComponent, TAIGA_UI } from './data.component';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [
        {
          provide: TUI_SANITIZER,
          useClass: NgDompurifySanitizer,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
