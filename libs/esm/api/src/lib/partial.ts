import { inject } from '@angular/core';
import { EsmConfig, ESM_CONFIG } from '@esm/config';

export const getEnv = (): EsmConfig => inject(ESM_CONFIG);
