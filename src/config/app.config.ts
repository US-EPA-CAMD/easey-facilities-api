require('dotenv').config();
import { registerAs } from '@nestjs/config';
import { parseBool } from '@us-epa-camd/easey-common/utilities';

const path = process.env.EASEY_FACILITIES_API_PATH || 'facilities-mgmt';
const host = process.env.EASEY_FACILITIES_API_HOST || 'localhost';
const port = +process.env.EASEY_FACILITIES_API_PORT || 8020;

export const PAGINATION_MAX_PER_PAGE =
  +process.env.EASEY_FACILITY_API_PAGINATION_MAX_PER_PAGE || 25000;

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

export default registerAs('app', () => ({
  name: 'facilities-api',
  title: process.env.EASEY_FACILITIES_API_TITLE || 'Facilities Management',
  description:
    'Facility management API endpoints for power sector facilities and their attributes (e.g. units, stacks, and owners)',
  path,
  host,
  apiHost: process.env.EASEY_API_GATEWAY_HOST || 'api.epa.gov/easey/dev',
  port,
  uri,
  env: process.env.EASEY_FACILITIES_API_ENV || 'local-dev',
  enableCors: parseBool(process.env.EASEY_FACILITIES_API_ENABLE_CORS, true),
  enableApiKey: parseBool(
    process.env.EASEY_FACILITIES_API_ENABLE_API_KEY,
    true,
  ),
  enableAuthToken: parseBool(
    process.env.EASEY_FACILITIES_API_ENABLE_AUTH_TOKEN,
  ),
  enableGlobalValidationPipes: parseBool(
    process.env.EASEY_FACILITIES_API_ENABLE_GLOBAL_VALIDATION_PIPE,
    true,
  ),
  version: process.env.EASEY_FACILITIES_API_VERSION || 'v0.0.0',
  published: process.env.EASEY_FACILITIES_API_PUBLISHED || 'local',
  perPageLimit: PAGINATION_MAX_PER_PAGE,
  enableSecretToken: parseBool(
    process.env.EASEY_FACILITIES_API_ENABLE_SECRET_TOKEN,
    false,
  ),
}));
