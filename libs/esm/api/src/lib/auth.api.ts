import { Injectable } from '@angular/core';
import { IAuthService } from '@auth';
import { AuthService } from './__generated__/auth.api';

@Injectable()
export class EsmAuthService extends AuthService implements IAuthService {}
