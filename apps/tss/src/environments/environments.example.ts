import { EsmConfig } from '@esm/config';

export const environment: EsmConfig = {
  production: false,
  baseUrl: 'http://localhost:5000/',
  syncfusionLicense:
    'MzQzMjQyOEAzMjMwMmUzNDJlMzBsRXR4dGdDYVJVZEdwWjlYYWROZGVNQUxScWd0ekN2TEZuQ0lhdzlGYXd3PQ==;MzQzMjQyOUAzMjMwMmUzNDJlMzBPdll5UkxhSS8wdEppbGNWL1d2Yk9kdW40UjhmMTZIalJRUlhvMnhOREVnPQ==;Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQFljQX9WdkBjXH9fdnFVTg==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3pTfkRmWXpedXRUQWJUVQ==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxXdk1iXH9bcHFVR2dYUk0=;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RckVrWHpedXRQRmFbVUd/;MzQzMjQzNEAzMjMwMmUzNDJlMzBNVHYzcnB0QXRVVlQ1aUQ1cFR5dVZiSFhGcHlTNEd0bWQrelE4T1AwQ0tJPQ==;MzQzMjQzNUAzMjMwMmUzNDJlMzBjeVAzSWhsVzlxQ2tiU21aVGFqVHlMZlhqYlJQMHV1L2gwZXgzMjhuVHAwPQ==;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxXdk1iXH9bcHFVR2lcV0E=;MzQzMjQzN0AzMjMwMmUzNDJlMzBoV1lFNFF4cTB5VDVtWG4xZzhUV2djQnBMVkJtR1NNb000VVZYVW1la0VvPQ==;MzQzMjQzOEAzMjMwMmUzNDJlMzBMcXM3bmkycThZbFNSa2hDaGpHWWIyWEhRVWFhb1RWMUNGNStoQ0RuRlhVPQ==;MzQzMjQzOUAzMjMwMmUzNDJlMzBNVHYzcnB0QXRVVlQ1aUQ1cFR5dVZiSFhGcHlTNEd0bWQrelE4T1AwQ0tJPQ==',
  recaptcha: {
    siteKey: '',
  },
  pusher: {
    key: 'exampleKey',
    cluster: 'exampleCluster',
  },
  loginUrl:
    'http://localhost:5100/login?returnUrl=http://localhost:4201/callback',
  logoutUrl: 'http://localhost:5100/logout',
};
