import { registerAs } from '@nestjs/config';

const path = process.env.EASEY_FACILITIES_API_PATH || 'api/facility-mgmt'
const host = process.env.EASEY_FACILITIES_API_HOST || 'localhost';
const port = process.env.EASEY_FACILITIES_API_PORT || 8080;

let uri = `https://${host}/${path}`

if (host == 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

export default registerAs('app', () => ({
  title: process.env.EASEY_FACILITIES_API_TITLE || 'Facilities Management',
  path,
  host,
  port,
  uri,
  env: process.env.EASEY_FACILITIES_API_ENV || 'local-dev',
  version: process.env.EASEY_FACILITIES_API_VERSION || 'v0.0.0',
  published: process.env.EASEY_FACILITIES_API_PUBLISHED || 'local',
}));
