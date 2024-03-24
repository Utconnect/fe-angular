import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

export const TESTING_COMMON_IMPORTS = [
  FormsModule,
  HttpClientTestingModule,
  NoopAnimationsModule,
  ReactiveFormsModule,
  RouterTestingModule,
];
