// 子应用到菜单
import Layout from "@/layout";
const appRouter = {
  path: "/vue-son",
  component: Layout,
  redirect: "doc1",
  name: "vue-son",
  meta: {
    title: "微·子系统",
    icon: "table",
  },
  children: [
    {
      path: "dashboard",
      name: "index",
      meta: { title: "子应用·测试页面首页", icon: "menuSon" },
    },
    {
      path: "tabMenu/tab",
      name: "Tab",
      meta: { title: "子应用·测试页面1", icon: "menuSon" },
    },
    {
      path: "documentationMenu/documentation",
      name: "Documentation",
      meta: { title: "子应用·测试页面2", icon: "menuSon" },
    },
  ],
};
export default appRouter;
