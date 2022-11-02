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
    microRoutes: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    SET_MICRO_ROUTES: (state, microRoutes) => {
      state.microRoutes = microRoutes;
    },
  },
  actions: {
    // 生成路由
    generateRoutes ({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data);
          commit("SET_ROUTES", accessedRoutes);
          resolve(accessedRoutes);
        });
      });
    },
    // 生成微应用注册表
    generateMicroRoutes ({ commit }) {
      return new Promise(resolve => {
        // 请求后端接口
        // getMicroRoutes().then(res => {
        //   if (res.code === 200) {
        commit("SET_MICRO_ROUTES", []);
        resolve();
        //   }
        // });
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter (asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}

// 遍历后端传来的微前端路由注册信息
// function handleMicroRoutes (microRoutes) {
//   const list = microRoutes.map((item) => {
//     if (process.env) {
//     }
//   });
// }


export default {
  namespaced: true,
  ...permission,
};