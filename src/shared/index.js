import { initGlobalState } from "qiankun";
import registerGlobalModule from "./registerGlobalModule";
import Vue from "vue";
import userStore from "@/store/modules/user";
// 初始化 state
const initialState = Vue.observable(userStore.state);
// 初始化全局状态
const actions = initGlobalState(initialState);

// 在当前应用监听全局状态，有变更触发 callback
actions.onGlobalStateChange((state, pre) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(pre, "旧数据");
  console.log(state, "新数据");
  // 更新主应用数据
  updateMainDate(state);
});
// 获取globalState下的某个子级对象，无key，表示取全部
actions.getGlobalState = (key) => {
  return key ? initialState[key] : { ...initialState };
};
actions.registerGlobalModule = registerGlobalModule;
// 更新主应用数据
const updateMainDate = (state) => {
  for (const key in state) {
    initialState[key] = state[key];
  }
};
export default actions;