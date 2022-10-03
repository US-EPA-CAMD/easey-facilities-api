import { registerAs } from '@nestjs/config';
import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean,
} from '@us-epa-camd/easey-common/utilities';

require('dotenv').config();

const path = getConfigValue('EASEY_FACILITIES_API_PATH', 'facilities-mgmt');
const host = getConfigValue('EASEY_FACILITIES_API_HOST', 'localhost');
const port = getConfigValueNumber('EASEY_FACILITIES_API_PORT', 8020);

export const PAGINATION_MAX_PER_PAGE = getConfigValueNumber(
  'EASEY_FACILITIES_API_PAGINATION_MAX_PER_PAGE', 500,
);

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

export default registerAs('app', () => ({
  name: 'facilities-api',
  host, port, path, uri,
  title: getConfigValue(
    'EASEY_FACILITIES_API_TITLE', 'Facilities Management',
  ),
  description: getConfigValue(
    'EASEY_FACILITIES_API_DESCRIPTION',
    'Facility management API endpoints for power sector facilities and their attributes (e.g. units, stacks, and owners)',
  ),
  apiHost: getConfigValue(
    'EASEY_API_GATEWAY_HOST', 'api.epa.gov/easey/dev',
  ),
  env: getConfigValue(
    'EASEY_FACILITIES_API_ENV', 'local-dev',
  ),
  enableCors: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_CORS', true,
  ),
  enableApiKey: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_API_KEY',
  ),
  enableGlobalValidationPipes: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_GLOBAL_VALIDATION_PIPE', true,
  ),
  version: getConfigValue(
    'EASEY_FACILITIES_API_VERSION', 'v0.0.0',
  ),
  published: getConfigValue(
    'EASEY_FACILITIES_API_PUBLISHED', 'local',
  ),
  perPageLimit: PAGINATION_MAX_PER_PAGE,
  secretToken: getConfigValue(
    'EASEY_FACILITIES_API_SECRET_TOKEN',
  ),
  enableSecretToken: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_SECRET_TOKEN',
  ),
  // ENABLES DEBUG CONSOLE LOGS
  enableDebug: getConfigValueBoolean(
    'EASEY_FACILITIES_API_ENABLE_DEBUG',
  ),
}));
