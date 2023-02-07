import envConfig from "./config.js";// 配置子应用访问地址
import actions from "@/shared";
const ENV = process.env.NODE_ENV || "dev";
const config = envConfig[ENV];
const {
  MARKETING,
  PORTAL,
  SYSTEM,
  WXMP,
  WEB,
} = config;
export default [
  /**
   * name: 微应用名称 - 具有唯一性，name和activeRule要一致
   * entry: 微应用入口 - 通过该地址加载微应用
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  // {
  //   name: `${process.env.VUE_APP_PROJECT_PATH}/vue-son`,
  //   entry: VUE_SON_APP,
  //   container: "#Appmicro",
  //   activeRule: `${process.env.VUE_APP_PROJECT_PATH}/vue-son`,
  //   props: actions,
  // },
  // {
  //   name: `${process.env.VUE_APP_PROJECT_PATH}/subapp1`,
  //   entry: SUB_APP1,
  //   container: "#Appmicro",
  //   activeRule: `${process.env.VUE_APP_PROJECT_PATH}/subapp1`,
  //   props: actions,
  // },

  {
    name: "marketing",
    entry: MARKETING,
    container: "#Appmicro",
    activeRule: "/marketing",
    props: actions,
  },
  {
    name: "portal",
    entry: PORTAL,
    container: "#Appmicro",
    activeRule: "/portal",
    props: actions,
  },
  {
    name: "system",
    entry: SYSTEM,
    container: "#Appmicro",
    activeRule: "/system",
    props: actions,
  },
  {
    name: "wxmp",
    entry: WXMP,
    container: "#Appmicro",
    activeRule: "/wxmp",
    props: actions,
  },
  {
    name: "web",
    entry: WEB,
    container: "#Appmicro",
    activeRule: "/web",
    props: actions,
  },
];
