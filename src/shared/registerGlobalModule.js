/**
 * @desc 提供给子应用的方法，用于注入全局的store模块，继承主应用的全局状态
 * @param {vuex实例} store
 * @param {qiankun下发的props} props
 */
function registerGlobalModule (store, props = {}) {
  if (!store || !store.hasModule) {
    return;
  }
  // 获取初始化的state
  const initState = props.getGlobalState && props.getGlobalState() || {};
  // 将父应用的数据存储到子应用中，命名空间固定为global
  if (!store.hasModule("global")) {
    const globalModule = initStateByProps(initState, props);
    // 注册globalStore
    store.registerModule("global", globalModule);
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch("global/setGlobalStateActions", initState);
  }
}

const initStateByProps = (initState, props) => {
  return {
    namespaced: true,
    state: initState,
    actions: {
      // 子应用改变state并通知父应用
      setGlobalStateActions ({ state, commit }, payload) {
        commit("SET_GLOBAL_STATE", { ...state, ...payload });
        commit("EMIT_GLOBAL_STATE", { ...state, ...payload });
      },
      // 初始化，只用于mount时同步父应用的数据
      initGlobalStateActions ({ commit }, payload) {
        commit("SET_GLOBAL_STATE", payload);
      },
    },
    mutations: {
      // 更改数据
      SET_GLOBAL_STATE (state, payload) {
        Object.assign(state, payload);
      },
      // 通知父应用
      EMIT_GLOBAL_STATE (state, data) {
        if (props.setGlobalState) {
          props.setGlobalState(data);
        }
      },
    },
  };
};

export default registerGlobalModule;

