import { inject } from '@angular/core';
import { ESM_CONFIG } from '@esm/config';

export const getEnv = () => inject(ESM_CONFIG);
