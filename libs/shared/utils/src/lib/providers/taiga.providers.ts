import { inject, Provider } from '@angular/core';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import { TUI_ANIMATIONS_DURATION, TUI_SANITIZER } from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_VIETNAMESE_LANGUAGE } from '@taiga-ui/i18n';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { of } from 'rxjs';
import {
  duplicatedFactory,
  emailFactory,
  requiredFactory,
} from '../helpers/validation-errors';

export const TAIGA_PROVIDERS: Provider = [
  {
    provide: TUI_SANITIZER,
    useClass: NgDompurifySanitizer,
  },
  {
    provide: TUI_LANGUAGE,
    useValue: of(TUI_VIETNAMESE_LANGUAGE),
  },
  {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required: requiredFactory,
      email: emailFactory,
      duplicated: duplicatedFactory,
    },
  },
  {
    provide: TUI_ANIMATIONS_DURATION,
    useFactory: (): number => (inject(TUI_IS_CYPRESS) ? 0 : 300),
  },
];
