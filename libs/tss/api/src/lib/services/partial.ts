import { inject } from '@angular/core';
import { TssConfig, TSS_CONFIG } from '@tss/config';

export const getEnv = (): TssConfig => inject(TSS_CONFIG);
