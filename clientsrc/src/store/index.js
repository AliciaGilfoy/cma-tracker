import Vue from "vue";
import Vuex from "vuex";
import { api } from "../services/AxiosService";
import router from "../router";
import { prizeStore } from "./prizesStore";
import { studentStore } from "./studentsStore";
import { challengeStore } from "./challengesStore";
import { redeamedStore } from "./redeamedsStore";
import { taskStore } from "./tasksStore";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    profile: {},
    profiles: [],
    students: [],
    activeStudent: {},
    challenges: [],
    activeChallenge: {},
    prizes: [],
    activePrize: {},
    activePrizes: [],
    redeameds: [],
    activeRedeameds: {},
    tasks: [],
    activeTask: {},
    error: ""


  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setProfiles(state, profiles) {
      state.profiles = profiles.sort((a, b) => (a.name > b.name) ? 1 : -1);
    },
    setActiveStudent(state, student) {
      state.activeStudent = student;
    },
    setStudents(state, students) {
      state.students = students.sort((a, b) => (a.name > b.name) ? 1 : -1);
    },
    deleteStudent(state, id) {
      state.students = state.students.filter(s => s._id != id)
    },
    updatePoints(state, { studentId, points }) {
      let student = state.students.find(s => s._id == studentId)
      student.points = points
    },
    setChallenges(state, challenges) {
      state.challenges = challenges;
    },
    setPrizes(state, prizes) {
      state.prizes = prizes;
    },
    setActivePrize(state, prize) {
      state.activePrize = prize;
    },
    setActivePrizes(state, prizes) {
      state.activePrizes = prizes.filter(p => p.active != false)
    },
    addPrize(state, prize) {
      state.prizes.push(prize)
    },
    deletePrize(state, id) {
      state.prizes.filter(r => r._id != id)
    },
    setRedeameds(state, redeameds) {
      state.redeameds = redeameds
    },
    addRedeamed(state, redeamed) {
      state.redeameds.push(redeamed)
    },
    deleteRedeamed(state, id) {
      state.redeameds.filter(r => r._id != id)
    },
    setTasks(state, tasks) {
      state.tasks = tasks.sort((a, b) =>
        a.point < b.point ? 1 : -1
      );
    },
    setActiveTask(state, task) {
      state.activeTask = task
    },
    setError(state, message) {
      state.error = message
    },

  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllProfiles({ commit }) {
      try {
        let res = await api.get("profile/all");
        commit("setProfiles", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getStudentsByProfileId({ commit }) {
      try {
        let id = this.state.profile._id
        let res = await api.get("profile/" + id + "/students");
        commit("setStudents", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async getRedeamedsByProfileId({ commit }) {
      try {
        let id = this.state.profile._id
        let res = await api.get("profile/" + id + "/redeamed");
        commit("setRedeameds", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    resetError({ commit }) {
      let message = ""
      commit("setError", message)
    },

    async updateProfilePermissions({ commit, dispatch }, update) {
      try {
        let res = await api.put("profile/" + update.profileId + "/editPermissions", update)
        dispatch("getAllProfiles")
      } catch (error) {
        console.error(error);
      }
    },

    async updateProfile({ commit, dispatch }, update) {
      try {
        let res = await api.put("profile/" + update.profileId, update)
        commit("setProfile", res.data)
      } catch (error) {
        console.error(error);
      }
    }

  },
  modules: {
    challengeStore,
    prizeStore,
    redeamedStore,
    studentStore,
    taskStore
  }
});
