import { ESM_CONFIG } from '@esm/config';
import { esmFeatureKey, esmInitialState } from '@esm/store';
import { appStoreTestProvider } from '@utconnect/test';

export const ESM_STORE_PROVIDER = appStoreTestProvider(
  esmFeatureKey,
  esmInitialState,
  ESM_CONFIG,
);
