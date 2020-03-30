<template>
  <div class="card text-white bg-success mb-3">
    <div class="card-header header-row">
      <img class="icon" src="../assets/blackbelt.png" />
      <h3 class="pl-2">
        <strong>{{challengeData.name}}</strong>
      </h3>
      <a class="mx-1" v-if="challengeData.link" :href="challengeData.link" target="_blank">
        <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
    <div class="card-body">
      <h4 class="card-title text-center">Earn {{challengeData.point}} points!</h4>
      <p class="card-text text-center">{{challengeData.description}}</p>
      <div class="row text-center p-0 button-row">
        <button
          @click="deleteChallenge(challengeData._id)"
          class="btn btn-sm btn-danger m-1"
          v-if="$route.name=='Admin'"
        >delete</button>
        <button
          v-if="profile.email && $route.name!='Admin'"
          @click="getStudents"
          type="button"
          data-toggle="modal"
          :data-target="'#modal'+challengeData._id"
          class="btn btn-outline-secondary mt-2 col-6"
        >Submit your student's challenge.</button>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'modal'+challengeData._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title text-secondary"
              id="exampleModalCenterTitle"
            >Submit your student's challenge!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitChallenge(challengeData)" id="pointsForm">
              <div class="form-group">
                <label class="float-left text-secondary" for="student">Select student</label>
                <select class="custom-select" id="studentSelect" v-model="selected">
                  <option
                    v-for="(studentObj) in students"
                    :key="studentObj._id"
                    :value="studentObj"
                  >{{studentObj.name}}</option>
                </select>
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
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Challenge",
  props: ["challengeData"],
  methods: {
    getStudents() {
      this.$store.dispatch("getStudentsByProfileId");
    },
    submitChallenge(data) {
      let totalPoints = data.point;
      let challengeId = data._id;
      let challengeName = data.name;
      let update = {
        id: this.selected._id,
        points: totalPoints * 1,
        challengeId: challengeId,
        challengeName: challengeName
      };
      this.$store.dispatch("addChallenge", update);
      let formData = event.target;
      formData.reset();
      $("#modal" + this.challengeData._id).modal("toggle");
    },
    deleteChallenge(challenge) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Challenge has been deleted.", "success");
          this.$store.dispatch("deleteChallengeById", challenge);
        }
      });
    }
  },
  computed: {
    students() {
      return this.$store.state.students;
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  data() {
    return {
      selected: ""
    };
  }
};
</script>

<style scoped>
.icon {
  height: 30px;
  width: auto;
}
.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.header-row {
  display: flex;
  flex-direction: row;
}
</style>