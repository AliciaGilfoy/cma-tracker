import { api } from "../services/AxiosService";

export const taskStore = {
  actions: {
    async getAllTasks({ commit }) {
      try {
        let res = await api.get("tasks");
        commit("setTasks", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    setActiveTask({ commit }, task) {
      commit("setActiveTask", task)
    },

    async getTaskById({ commit }, id) {
      try {
        let res = await api.get("tasks/" + id);
        commit("setActiveTask", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async createTask({ commit, dispatch }, newTask) {
      try {
        let res = await api.post("tasks", newTask)
        dispatch("getAllTasks")
      } catch (error) {
        console.error(error);
      }
    },

    async editTask({ commit, dispatch }, update) {
      try {
        let res = await api.put("tasks/" + update.id, update.body)
        dispatch("getAllTasks")
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTaskById({ commit, dispatch }, id) {
      try {
        let res = await api.delete("tasks/" + id)
        dispatch("getAllTasks")
      } catch (error) {
        console.error(error);
      }
    }
  },
}