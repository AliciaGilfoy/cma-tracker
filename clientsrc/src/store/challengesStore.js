import { api } from "../services/AxiosService";

export const challengeStore = {
  actions: {
    async getAllChallenges({ commit }) {
      try {
        let res = await api.get("challenges");
        commit("setChallenges", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    setActiveChallenge({ commit }, challenge) {
      commit("setActiveChallenge", challenge)
    },

    async getChallengeById({ commit }, id) {
      try {
        let res = await api.get("challenges/" + id);
        commit("setActiveChallenge", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async createChallenge({ commit, dispatch }, newChallenge) {
      try {
        let res = await api.post("challenges", newChallenge)
        dispatch("getAllChallenges")
      } catch (error) {
        console.error(error);
      }
    },

    async editChallenge({ commit, dispatch }, update) {
      try {
        let res = await api.put("challenges/" + update.id, update.body)
        dispatch("getAllChallenges")
      } catch (error) {
        console.error(error);
      }
    },

    async deleteById({ commit, dispatch }, id) {
      try {
        let res = await api.delete("challenges/" + id)
        dispatch("getAllChallenges")
      } catch (error) {
        console.error(error);
      }
    }
  },
}