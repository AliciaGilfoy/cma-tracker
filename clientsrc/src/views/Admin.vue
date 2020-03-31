<template>
  <div class="container-fluid page">
    <div class="row text-center bg-black text-success">
      <h1 class="col-12">Welcome Admin {{ profile.name }}</h1>
      <div class="col-12 bg-black text-white text-center">
        <h3>Please make a selection.</h3>
      </div>
    </div>
    <div class="row button-row bg-black p-3">
      <button
        class="btn btn-outline-success my-2"
        @click="studentsShow=true,challengesShow=false,tasksShow=false,prizesShow=false,redeamedsShow=false,taskForm=false,challengeForm=false,prizeForm=false,profileShow=false"
      >Students</button>
      <button
        class="btn btn-outline-success my-2"
        @click="profileShow=true,challengesShow=false,tasksShow=false,prizesShow=false,redeamedsShow=false,taskForm=false,challengeForm=false,prizeForm=false,studentsShow=false"
      >Profiles</button>
      <button
        class="btn btn-outline-primary my-2"
        @click="challengesShow=true,studentsShow=false,tasksShow=false,prizesShow=false,redeamedsShow=false,taskForm=false,challengeForm=false,prizeForm=false,profileShow=false"
      >Challenges</button>
      <button
        class="btn btn-outline-warning my-2"
        @click="tasksShow=true,studentsShow=false,challengesShow=false,prizesShow=false,redeamedsShow=false,taskForm=false,challengeForm=false,prizeForm=false,profileShow=false"
      >Tasks</button>
      <button
        class="btn btn-outline-info my-2"
        @click="prizesShow=true,studentsShow=false,challengesShow=false,tasksShow=false,redeamedsShow=false,taskForm=false,challengeForm=false,prizeForm=false,profileShow=false"
      >Prizes</button>
      <button
        class="btn btn-outline-danger my-2"
        @click="redeamedsShow=true,studentsShow=false,challengesShow=false,tasksShow=false,prizesShow=false,taskForm=false,challengeForm=false,prizeForm=false,profileShow=false"
      >Redeemed Prizes</button>
    </div>
    <div class="row pt-4 bg-dark" v-if="challengesShow">
      <div class="col-12 text-center pb-4">
        <button
          v-if="!challengeForm"
          @click="challengeForm=!challengeForm"
          class="btn btn-primary m-1"
        >Add New Challenge</button>
        <button
          v-if="challengeForm"
          @click="challengeForm=!challengeForm"
          class="btn btn-warning m-1"
        >Cancel</button>
      </div>
      <challenge-form v-if="challengeForm" />
      <div class="main-row col-12">
        <challenge
          class="col-md-5 col-sm-12"
          v-for="(challengeObj) in challenges"
          :key="challengeObj._id"
          :challengeData="challengeObj"
        />
      </div>
    </div>
    <div class="row main-row pt-4 bg-dark" v-if="studentsShow">
      <div class="col-12 text-center">
        <button
          v-if="sorted"
          @click="sortByPoints"
          class="btn btn-primary my-2 float-left"
        >Sort by Points</button>
        <button
          v-if="!sorted"
          @click="sortByName"
          class="btn btn-primary my-2 float-left"
        >Sort by Name</button>
        <h3 class="text-white my-1 pr-5">Students:</h3>
      </div>
      <student
        class="col-12"
        v-for="(studentObj) in students"
        :key="studentObj._id"
        :studentData="studentObj"
      />
    </div>
    <div class="row main-row pt-4 bg-dark" v-if="profileShow">
      <profile v-for="(profileObj) in profiles" :key="profileObj._id" :profileData="profileObj" />
    </div>
    <div class="row pt-4 bg-success" v-if="tasksShow">
      <div class="col-12 text-center pb-4">
        <button
          v-if="!taskForm"
          @click="taskForm=!taskForm"
          class="btn btn-primary m-1"
        >Add New Daily Task</button>
        <button v-if="taskForm" @click="taskForm=!taskForm" class="btn btn-warning m-1">Cancel</button>
      </div>
      <task-form v-if="taskForm" />
      <div class="main-row col-12">
        <ul class="p-3 col-md-8 col-sm-12 bg-light m-2">
          <task v-for="(taskObj) in tasks" :key="taskObj._id" :taskData="taskObj" />
        </ul>
      </div>
    </div>
    <div class="row main-row pt-4 bg-success" v-if="redeamedsShow">
      <redeamed
        v-for="(redeamedObj) in redeameds"
        :key="redeamedObj._id"
        :redeamedData="redeamedObj"
      />
    </div>
    <div class="row pt-4 bg-dark" v-if="prizesShow">
      <div class="col-12 text-center pb-4">
        <button
          v-if="!prizeForm"
          @click="prizeForm=!prizeForm"
          class="btn btn-primary m-1"
        >Add New Prize</button>
        <button v-if="prizeForm" @click="prizeForm=!prizeForm" class="btn btn-warning m-1">Cancel</button>
      </div>
      <prize-form v-if="prizeForm" />
      <div class="main-row col-12">
        <prize v-for="(prizeObj) in prizes" :key="prizeObj._id" :prizeData="prizeObj" />
      </div>
    </div>
  </div>
</template>

<script>
import Student from "../components/student";
import Prize from "../components/prize";
import Redeamed from "../components/redeamed";
import Challenge from "../components/challenge";
import Task from "../components/task";
import TaskForm from "../components/taskForm";
import ChallengeForm from "../components/challengeForm";
import PrizeForm from "../components/prizeForm";
import Profile from "../components/profile";

export default {
  name: "Admin",
  mounted() {
    this.$store.dispatch("getAllStudents");
    this.$store.dispatch("getAllPrizes");
    this.$store.dispatch("getAllRedeameds");
    this.$store.dispatch("getAllTasks");
    this.$store.dispatch("getAllChallenges");
    this.$store.dispatch("getAllProfiles");
    this.$store.dispatch("setActiveStudent", {});
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    students() {
      return this.$store.state.students;
    },
    prizes() {
      return this.$store.state.prizes;
    },
    redeameds() {
      return this.$store.state.redeameds;
    },
    challenges() {
      return this.$store.state.challenges;
    },
    tasks() {
      return this.$store.state.tasks;
    },
    profiles() {
      return this.$store.state.profiles;
    }
  },
  data() {
    return {
      redeamedsShow: false,
      studentsShow: true,
      challengesShow: false,
      tasksShow: false,
      prizesShow: false,
      challengeForm: false,
      taskForm: false,
      prizeForm: false,
      profileShow: false,
      sorted: true
    };
  },
  methods: {
    sortByName() {
      let sortedStudents = this.students.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      this.students = sortedStudents;
      this.sorted = true;
    },
    sortByPoints() {
      let sortedStudents = this.students.sort((a, b) =>
        a.points < b.points ? 1 : -1
      );
      this.students = sortedStudents;
      this.sorted = false;
    }
  },
  components: {
    Student,
    Prize,
    Redeamed,
    Challenge,
    Task,
    TaskForm,
    ChallengeForm,
    PrizeForm,
    Profile
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.button-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.bg-black {
  background-color: black;
}
.main-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: flex-start;
  flex-wrap: wrap;
  min-height: 100vh;
}
ul {
  list-style-type: none;
}
.title-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
