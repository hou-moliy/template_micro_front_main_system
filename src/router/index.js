import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Layout from "@/layout";
/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以被访问
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://www.baidu.com/",
        meta: { title: "外部链接", icon: "link" },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];
const createRouter = () => new Router({
  mode: "history",
  base: process.env.VUE_APP_PROJECT_PATH || "/",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

const router = createRouter();

export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
