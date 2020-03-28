<template>
  <div class="container-fluid bg-success page">
    <div class="about text-center row pic-row bg-pic">
      <h1 class="text-success col-12 p-0 bg-ltgray m-0">
        <strong>Welcome {{ profile.name }}</strong>
      </h1>
    </div>
    <div class="row main-row slanted">
      <div class="col-sm-12 col-md-5 mx-2 student-section">
        <div class="text-center title-row row mt-2">
          <button @click="studentForm = !studentForm" class="btn btn-success text-dark">
            <i class="fas fa-user-plus h4"></i>
          </button>
          <h1 class="text-secondary text-center ml-5">Your Students:</h1>
        </div>
        <div class="row student-row">
          <div class="student-card card border-success mb-3">
            <div class="card-header h3 bg-dark text-success" v-if="studentForm">
              <form @submit.prevent="addStudent">
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="newStudent.name"
                  placeholder="Enter students name..."
                  required
                />
                <button class="btn btn-sm btn-success ml-3">Add</button>
              </form>
            </div>
          </div>
          <student
            v-for="(studentObj) in students"
            :key="studentObj._id"
            :studentData="studentObj"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-5 redeamed-row">
        <div class="shop-row row">
          <router-link :to="{name: 'Store'}">
            <button class="btn btn-lg btn-outline-secondary mt-2">
              Prize Store
              <i class="fas fa-store"></i>
            </button>
          </router-link>
        </div>
        <h1 v-if="this.redeameds" class="text-secondary text-center mt-2">Your Prizes:</h1>
        <redeamed
          v-for="(redeamedObj) in redeameds"
          :key="redeamedObj._id"
          :redeamedData="redeamedObj"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Student from "../components/student";
import Redeamed from "../components/redeamed";

export default {
  name: "Dashboard",
  mounted() {
    this.$store.dispatch("getStudentsByProfileId");
    this.$store.dispatch("getRedeamedsByProfileId");
  },
  data() {
    return {
      studentForm: false,
      newStudent: {
        name: ""
      }
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    students() {
      return this.$store.state.students;
    },
    redeameds() {
      return this.$store.state.redeameds;
    }
  },
  components: {
    Student,
    Redeamed
  },
  methods: {
    addStudent() {
      this.$store.dispatch("createStudent", this.newStudent);
      this.studentForm = false;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.bg-pic {
  background-image: url("../assets/background1.jpg");
  background-position: center;
  background-size: cover;
  height: 20rem;
}
.bg-ltgray {
  background-color: rgba(71, 71, 71, 0.795);
}
.student-row {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.shop-row {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
.pic-row {
  display: flex;
  flex-direction: row;
  align-content: flex-end;
}
.main-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.page {
  min-height: 100vh;
}
.title-row {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
}
</style>