<template>
  <div class="container-fluid bg-dark page">
    <div class="about text-center row bg-success">
      <h1 class="text-white col-12 p-0 m-0">
        <strong>Welcome To The Prize Store!</strong>
      </h1>
      <h3 class="text-dark col-12 p-0 mb-1">
        <strong>Select a student to use their points.</strong>
      </h3>
    </div>
    <div class="row main-row">
      <div class="col-sm-12 mx-2 student-section">
        <div class="row student-row my-4">
          <div
            class="col-md-3 col-sm-6 m-1 p-0 student-card card border-success"
            v-for="student in students"
            :key="student._id"
          >
            <div
              @click="setActiveStudent(student)"
              v-if="activeStudent.name!=student.name"
              class="card-header h3 bg-light text-dark text-center"
            >
              <h3>
                <img class="image mr-4" src="../assets/student.png" />
                <strong>{{student.name}}</strong>
              </h3>
            </div>
            <div
              v-if="activeStudent.name==student.name"
              class="card-header h3 bg-success text-dark text-center"
            >
              <h3>
                <img class="image mr-4" src="../assets/student.png" />
                <strong>{{student.name}}</strong>
              </h3>
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">
                <strong class="text-dark">Total Points:</strong>
                {{student.points}}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 mx-2 prize-section">
        <div class="row bg-success p-2 text-white">
          <h2 class="col-12 text-center">
            <strong>Prizes:</strong>
          </h2>
        </div>
        <div class="row prize-row my-4">
          <prize v-for="(prizeObj) in prizes" :key="prizeObj._id" :prizeData="prizeObj" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Student from "../components/student";
import Prize from "../components/prize";

export default {
  name: "Store",
  mounted() {
    this.$store.dispatch("getStudentsByProfileId");
    this.$store.dispatch("getAllPrizes");
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
    prizes() {
      return this.$store.state.prizes;
    },
    activeStudent() {
      return this.$store.state.activeStudent;
    }
  },
  components: {
    Student,
    Prize
  },
  methods: {
    setActiveStudent(student) {
      this.$store.dispatch("setActiveStudent", student);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.bg-pic {
  background-image: url("../assets/background2.jpg");
  background-position-y: top;
  background-size: cover;
  height: 15rem;
}
.bg-ltgray {
  background-color: rgba(71, 71, 71, 0.795);
}
.student-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.prize-row {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
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
.card-header {
  cursor: pointer;
}
</style>