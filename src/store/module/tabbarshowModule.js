const module = {
  namespaced: true,
  state: {
    isTabbarShow: true
  },
  actions: {

  },
  mutations: {
    show (state) {
      // console.log("show")
      state.isTabbarShow = true
    },
    hide (state) {
      // console.log("hide")
      state.isTabbarShow = false
    }
  }
}

export default module
