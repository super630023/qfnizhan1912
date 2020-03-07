import axios from 'axios'

const module = {
  namespaced: true,
  state: {
    cinemaList: [],
    cityList: []
  },
  actions: {
    getCinemaAction (store) {
      axios.get('/ajax/cinemaList?day=2020-03-05&offset=0&limit=5000&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1583341086597&cityId=10&optimus_uuid=C71F30C05D4811EA955213B16E54E79E40FAB32AD7FC457EA198380F39DC7547&optimus_risk_level=71&optimus_code=10').then(res => {
        console.log(res.data.cinemas)
        store.commit('setCinemaList', res.data.cinemas)
      })
    },
    getCityAction (store) {
      axios.get('/ajax/filterCinemas?ci=10&optimus_uuid=C71F30C05D4811EA955213B16E54E79E40FAB32AD7FC457EA198380F39DC7547&optimus_risk_level=71&optimus_code=10').then(res => {
        console.log(res.data.district.subItems)
        store.commit('setCityList', [res.data.district.subItems, res.data.brand.subItems])
      })
    }
  },
  mutations: {
    setCinemaList (state, data) {
      console.log('setcinemaList', data)
      state.cinemaList = data
    },
    setCityList (state, data) {
      console.log('setcityList', data)
      state.cityList = data
    }

  },
  getters: {
    topDataList (state) {
      return state.cinemaList.slice(0, 5)
    }

  }
}

export default module
