const module = {
  namespaced: true,
  state: {
    cityName: '上海',
    cityId: '310100'
  },
  actions: {

  },
  mutations: {
    setCityName (state, name) {
      state.cityName = name
    },
    setCityId (state, id) {
      state.cityId = id
    }
  }
}

export default module
