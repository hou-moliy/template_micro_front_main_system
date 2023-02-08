const BASEURL = process.env.VUE_APP_BASE_URL;
const ENV = process.env.NODE_ENV;

export default {
  [ENV]: {
    "MARKETING": `${BASEURL}/marketing/`,
    "PORTAL": `${BASEURL}/portal/`,
    "SYSTEM": `${BASEURL}/system/`,
    "WXMP": `${BASEURL}/wxmp/`,
    "WEB": `${BASEURL}/web/`,
  },
  "dev": {
    "MARKETING": "http://10.4.5.0:9528/marketing/",
    "PORTAL": "http://192.168.31.146:9530/portal/",
    "SYSTEM": "http://192.168.31.146:9531/system/",
    "WXMP": "http://192.168.31.146:9532/wxmp/",
    "WEB": "http://192.168.31.146:9536/web/",
  },
};
