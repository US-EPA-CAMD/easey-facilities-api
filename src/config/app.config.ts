import { registerAs } from '@nestjs/config';

const title = 'Facility Management';
const path = 'api/facility-mgmt';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 7000;

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