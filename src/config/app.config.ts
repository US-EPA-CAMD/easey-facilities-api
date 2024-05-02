import { registerAs } from '@nestjs/config';
import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean,
} from '@us-epa-camd/easey-common/utilities';

require('dotenv').config();

const host = getConfigValue('EASEY_FACILITIES_API_HOST', 'localhost');
const port = getConfigValueNumber('EASEY_FACILITIES_API_PORT', 8020);
const path = getConfigValue('EASEY_FACILITIES_API_PATH', 'facilities-mgmt');

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

const apiHost = getConfigValue(
  'EASEY_API_GATEWAY_HOST',
  'api.epa.gov/easey/dev',
);

export const PAGINATION_MAX_PER_PAGE = getConfigValueNumber(
  'EASEY_FACILITIES_API_PAGINATION_MAX_PER_PAGE',
  500,
);

export default registerAs('app', () => ({
  name: 'facilities-api',
  host,
  port,
  path,
  uri,
  title: getConfigValue('EASEY_FACILITIES_API_TITLE', 'Facilities Management'),
  currentUser: getConfigValue(
    'EASEY_FACILITIES_API_CURRENT_USER',
    '{"userId": ""}',
  ),
  description: getConfigValue(
    'EASEY_FACILITIES_API_DESCRIPTION',
    'Facility management API endpoints for power sector facilities and their attributes (e.g. units, stacks, and owners)',
  ),
  env: getConfigValue('EASEY_FACILITIES_API_ENV', 'local-dev'),
  apiKey: getConfigValue('EASEY_FACILITIES_API_KEY'),
  enableApiKey: getConfigValueBoolean('EASEY_FACILITIES_API_ENABLE_API_KEY'),
  secretToken: getConfigValue('EASEY_FACILITIES_API_SECRET_TOKEN'),
  enableSecretToken: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_SECRET_TOKEN',
  ),
  enableCors: getConfigValueBoolean('EASEY_FACILITIES_API_ENABLE_CORS', true),
  enableGlobalValidationPipes: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_GLOBAL_VALIDATION_PIPE',
    true,
  ),
  version: getConfigValue('EASEY_FACILITIES_API_VERSION', 'v0.0.0'),
  published: getConfigValue('EASEY_FACILITIES_API_PUBLISHED', 'local'),
  enableRoleGuard: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_ROLE_GUARD',
    true,
  ),
  enableAuthToken: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_AUTH_TOKEN',
    true,
  ),
  // ENABLES DEBUG CONSOLE LOGS
  enableDebug: getConfigValueBoolean('EASEY_FACILITIES_API_ENABLE_DEBUG'),
  perPageLimit: PAGINATION_MAX_PER_PAGE,
  apiHost: apiHost,
  authApi: {
    uri: getConfigValue('EASEY_AUTH_API', `https://${apiHost}/auth-mgmt`),
  },
}));
