import { registerAs } from '@nestjs/config';

const title = 'Facility Management';
const path = 'api/facility-mgmt';
const host = process.env.EASEY_API_HOST || 'localhost';
const port = process.env.EASEY_FACILITY_MGMT_API_PORT || 8080;

let uri = `https://${host}/${path}`

if (host == 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

export default registerAs('app', () => ({
  title,
  path,
  host,
  port,
  uri,
}));