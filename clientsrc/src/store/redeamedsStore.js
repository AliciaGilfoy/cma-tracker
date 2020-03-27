import { api } from "../services/AxiosService";

export const redeamedStore = {
  actions: {
    async getAllRedeameds({ commit }) {
      try {
        let res = await api.get("redeameds");
        commit("setRedeameds", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getRedeamedById({ commit }, id) {
      try {
        let res = await api.get("redeameds/" + id);
        commit("setActiveRedeamed", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    setActiveRedeamed({ commit }, redeamed) {
      commit("setActiveRedeamed", redeamed)
    },

    async createRedeamed({ commit, dispatch }, newRedeamed) {
      try {
        let res = await api.post("redeameds", newRedeamed)
        commit("addRedeamed", res.data)
      } catch (error) {
        console.error(error);
      }
    },

    async editRedeamed({ commit, dispatch }, update) {
      try {
        let res = await api.put("redeameds/" + update.id, update.body)
        dispatch(this.getAllRedeameds)
      } catch (error) {
        console.error(error);
      }
    },

    async completeRedeamed({ commit, dispatch }) {
      try {
        let update = { "completed": true }
        let res = await api.put("redeameds/" + update.id + "/complete", update)
        dispatch(this.getAllRedeameds)
      } catch (error) {
        console.error(error);
      }
    },

    async deleteById({ commit, dispatch }, id) {
      try {
        let res = await api.delete("redeameds/" + id);
        commit("deleteRedeamed", id)
      } catch (error) {
        console.error(error);
      }
    }
  }
}