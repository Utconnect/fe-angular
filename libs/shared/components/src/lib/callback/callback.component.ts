import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from '@auth';
import { CallbackService } from '@utconnect/services';

@Component({
  selector: 'utconnect-callback',
  standalone: true,
  imports: [CommonModule],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly jwtService = inject(JwtService);
  private readonly callbackService = inject(CallbackService);

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.jwtService.setJwt({
      accessToken: params['access_token'],
      tokenType: params['token_type'],
      expiresIn: params['expires_in'],
      refreshToken: params['refresh_token'],
    });
    this.callbackService.navigate();
  }
}
