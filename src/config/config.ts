import 'dotenv/config';

const url = process.env.OCC_URL;
const appKey = process.env.OCC_APPKEY;

export const envVariables = {
  url,
  appKey,
};
