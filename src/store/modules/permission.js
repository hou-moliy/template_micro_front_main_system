import { constantRoutes } from "@/router/index";
import { getRouters } from "@/api/menu";
import Layout from "@/layout";
export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};
const permission = {
  state: {
    routes: [],
    addRoutes: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
  },
  actions: {
    // 生成路由
    generateRoutes ({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          res.data.forEach(item => {
            if (item.menuBelong) {
              item.path = "/" + item.menuBelong + item.path;
            }
          });
          const accessedRoutes = filterAsyncRouter(res.data);
          commit("SET_ROUTES", accessedRoutes);
          resolve(accessedRoutes);
        });
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter (asyncRouterMap, type) {
  return asyncRouterMap.filter(route => {
    if (type === "children") {
      delete route.component;
    }
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, "children");
    }
    return true;
  });
}
export default {
  namespaced: true,
  ...permission,
};
