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
};
