import { api } from "../services/AxiosService";

export const prizeStore = {
  actions: {
    async getAllPrizes({ commit }) {
      try {
        let res = await api.get("prizes");
        commit("setPrizes", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getPrizeById({ commit }, id) {
      try {
        let res = await api.get("prizes/" + id);
        commit("setActivePrize", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    setActivePrize({ commit }, prize) {
      commit("setActivePrize", prize)
    },

    async createPrize({ commit, dispatch }, newPrize) {
      try {
        let res = await api.post("prizes", newPrize)
        dispatch(this.getAllPrizes)
      } catch (error) {
        console.error(error);
      }
    },

    async editPrize({ commit, dispatch }, update) {
      try {
        let res = await api.put("prizes/" + update.id, update.body)
        dispatch(this.getAllPrizes)
      } catch (error) {
        console.error(error);
      }
    },

    async deleteById({ commit, dispatch }, id) {
      try {
        let res = await api.put("prizes/" + id + "/delete")
        dispatch(this.getAllPrizes)
      } catch (error) {
        console.error(error);
      }
    }
  }
}