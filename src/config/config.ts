import 'dotenv/config';

let url = '';
let appKey = '';

if (process.env.NODE_ENV === 'dev') {
  url = process.env.DEV_URL;
  appKey = process.env.DEV_APPKEY;
} else if (process.env.NODE_ENV === 'tst') {
  url = process.env.TST_URL;
  appKey = process.env.TST_APPKEY;
} else if (process.env.NODE_ENV === 'prd') {
  url = process.env.PRD_URL;
  appKey = process.env.PRD_APPKEY;
}

export const envVariables = {
  url,
  appKey,
};
