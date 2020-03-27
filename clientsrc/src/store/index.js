import Vue from "vue";
import Vuex from "vuex";
import { api } from "../services/AxiosService";
import router from "../router";
import { prizeStore } from "./prizesStore";
import { studentStore } from "./studentsStore";
import { challengeStore } from "./challengesStore";
import { redeamedStore } from "./redeamedsStore";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    profile: {},
    students: {},
    activeStudent: {},
    challenges: [],
    activeChallenge: {},
    prizes: [],
    activePrize: {},
    redeameds: [],
    activeRedeameds: {},


  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setActiveStudent(state, student) {
      state.activeStudent = student;
    },
    setStudents(state, { student, name }) {
      Vue.set(state.students, name, student);
    },
    updatePoints(state, {studentId, points}){
      let student = state.students.find(s => s._id = studentId)
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
    addPrize(state, prize){
      state.prizes.push(prize)
    },
    deletePrize(state, id){
      state.prizes.filter(r => r._id != id)
    },
    setRedeameds(state, redeameds) {
      state.redeameds = redeameds
    },
    addRedeamed(state, redeamed){
      state.redeameds.push(redeamed)
    },
    deleteRedeamed(state, id){
      state.redeameds.filter(r => r._id != id)
    }

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

  },
  modules: {
    challengeStore,
    prizeStore,
    redeamedStore,
    studentStore
  }
});
