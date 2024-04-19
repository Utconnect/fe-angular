import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsmExaminationDocumentComponent } from './document.component';

describe('DocumentComponent', () => {
  let component: EsmExaminationDocumentComponent;
  let fixture: ComponentFixture<EsmExaminationDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(EsmExaminationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
