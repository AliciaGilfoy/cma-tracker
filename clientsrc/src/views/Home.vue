<template>
  <div class="container home bg-secondary">
    <div class="row heading-row">
      <img alt="Champions logo" src="../assets/logo.png" />
      <h1 class="col-12 text-center text-success">Welcome to the CMA Tracker</h1>
      <h3
        v-if="!profile.email"
        class="col-12 text-center text-success"
      >Login to submit your students points.</h3>
      <div v-if="error.length>0" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" @click="resetError">&times;</button>
        <strong>Warning!</strong>
        {{this.error}}
      </div>
    </div>
    <div class="row p-3">
      <div class="col-md-6 col-sm-12 text-secondary bg-white rounded p-3">
        <div class="row text-center p-0">
          <h3 class="col-12 title-row">
            <u>Daily Activities:</u>
          </h3>
          <p class="text-center col-12">Can only be submitted once per date.</p>
          <ul class="p-0 col-12">
            <daily-challenge v-for="(taskObj) in tasks" :key="taskObj._id" :taskData="taskObj" />
          </ul>
        </div>
        <div class="row text-center p-0 button-row">
          <button
            v-if="profile.email"
            @click="getStudents"
            type="button"
            data-toggle="modal"
            data-target="#submitPointsModal"
            class="btn btn-success text-white mt-2 col-6"
          >Submit your student's points.</button>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <h3 v-if="this.challenges" class="col-12 title-row text-white text-center">
          <u>Black Belt Challenge</u>
        </h3>
        <challenge
          v-for="(challengeObj) in challenges"
          :key="challengeObj._id"
          :challengeData="challengeObj"
        />

        <!-- Modal -->
        <div
          class="modal fade"
          id="submitPointsModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Submit your student's points.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitPoints" id="pointsForm">
                  <div class="form-group">
                    <label class="float-left" for="student">Select student</label>
                    <select class="custom-select" id="studentSelect" v-model="selected">
                      <option
                        v-for="(studentObj) in students"
                        :key="studentObj._id"
                        :value="studentObj"
                      >{{studentObj.name}}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <datepicker v-model="date" placeholder="Select Date" :format="format"></datepicker>
                  </div>
                  <div class="check-boxes">
                    <div
                      class="form-group form-check float-left"
                      v-for="(taskObj) in tasks"
                      :key="taskObj._id"
                    >
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :id="taskObj._id"
                        :value="taskObj._id"
                        v-model="total"
                      />
                      <label class="form-check-label" for="exampleCheck1">
                        {{taskObj.name}}
                        <span class="text-warning">({{taskObj.point}} points)</span>
                      </label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-center p-0 button-row" v-if="profile.email">
          <router-link :to="{name: 'Dashboard'}" class="col-6">
            <button
              class="btn btn-lg btn-outline-success text-white mt-2"
            >Check your student(s) points.</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DailyChallenge from "../components/task";
import Challenge from "../components/challenge";
import Datepicker from "vuejs-datepicker";

export default {
  name: "home",
  data() {
    return {
      selected: "",
      total: [],
      date: "",
      format: "MM dd yyyy"
    };
  },
  mounted() {
    this.$store.dispatch("getAllTasks");
    this.$store.dispatch("getAllChallenges");
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    challenges() {
      return this.$store.state.challenges;
    },
    students() {
      return this.$store.state.students;
    },
    profile() {
      return this.$store.state.profile;
    },
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    submitPoints() {
      let totalPoints = 0;
      for (let i = 0; i < this.total.length; i++) {
        let task = this.total[i];
        let taskPoint = this.tasks.find(t => t._id == task);
        let point = taskPoint.point;
        totalPoints += point;
      }
      let date = this.date.toLocaleDateString();
      let update = {
        id: this.selected._id,
        points: totalPoints,
        date: date
      };
      console.log(update);
      this.$store.dispatch("addPoints", update);
      let formData = event.target;
      formData.reset();
      $("#submitPointsModal").modal("toggle");
    },
    getStudents() {
      this.$store.dispatch("getStudentsByProfileId");
    },
    resetError() {
      this.$store.dispatch("resetError");
    }
  },
  components: {
    DailyChallenge,
    Challenge,
    Datepicker
  }
};
</script>

<style scoped>
.heading-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
}
.home {
  min-height: 100vh;
  max-width: 100vw;
}
ul {
  list-style-type: none;
}
.title-row {
  width: 100%;
  padding: 0;
}
.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.top-row {
  background-color: black;
  position: absolute;
}
.check-boxes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.modal-body {
  height: fit-content;
}
</style>