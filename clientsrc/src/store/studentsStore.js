import { api } from "../services/AxiosService";

export const studentStore = {
  actions: {
    async getAllStudents({ commit }) {
      try {
        let res = await api.get("students");
        commit("setStudents", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getStudentById({ commit }, id) {
      try {
        let res = await api.get("students/" + id);
        commit("setActiveStudent", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    setActiveStudent({ commit }, student) {
      commit("setActiveStudent", student)
    },

    async createStudent({ commit, dispatch }, newStudent) {
      try {
        let res = await api.post("students", newStudent)
        dispatch("getStudentsByProfileId")
      } catch (error) {
        console.error(error);
      }
    },

    async editStudent({ commit, dispatch }, update) {
      try {
        let res = await api.put("students/" + update.id + "/edit", update.body)
        dispatch(this.getAllStudents)
      } catch (error) {
        console.error(error);
      }
    },

    async addPoints({ commit, dispatch }, update) {
      try {
        let res = await api.put("students/" + update.id, { points: update.points, date: update.date })
        if (res.data == "No") {
          let message = "You already added points for that date."
          commit("setError", message)
        }
        let studentId = update.id
        let points = res.data.points
        commit("updatePoints", { studentId, points })
      } catch (error) {
        console.error(error);
      }
    },

    async addPointsAdmin({ commit, dispatch }, update) {
      try {
        let res = await api.put("students/" + update.id + "/adminPoints", { points: update.points })
        let studentId = update.id
        let points = res.data.points
        commit("updatePoints", { studentId, points })
      } catch (error) {
        console.error(error);
      }
    },

    async addChallenge({ commit, dispatch }, update) {
      try {
        let res = await api.put("students/" + update.id + "/challenge", { points: update.points, challengeId: update.challengeId, challengeName: update.challengeName })
        if (res.data == "No") {
          let message = "You already completed that challenge."
          commit("setError", message)
        }
      } catch (error) {
        console.error(error);
      }
    },

    async spendPoints({ commit, dispatch }, update) {
      try {
        let res = await api.put("students/" + update.studentId + "/spend", update)
        let points = res.data.points
        let studentId = update.studentId
        commit("updatePoints", { studentId, points })
      } catch (error) {
        console.error(error);
      }
    },

    async deleteStudentById({ commit, dispatch }, id) {
      try {
        let res = await api.delete("students/" + id);
        commit("deleteStudent", id)
      } catch (error) {
        console.error(error);
      }
    },

    async deleteAllStudents({ commit, dispatch }, id) {
      try {
        let res = await api.delete("students/");
        dispatch(this.getAllStudents)
      } catch (error) {
        console.error(error);
      }
    }
  }
}