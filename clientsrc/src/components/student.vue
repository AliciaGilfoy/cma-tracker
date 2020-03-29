<template>
  <div class="student-card card border-success mb-3">
    <div class="card-header h3 bg-light text-dark">
      <h3>
        <img class="image mr-4" src="../assets/student.png" />
        <strong>{{studentData.name}}</strong>
      </h3>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <strong class="text-success">Total Points:</strong>
        {{studentData.points}}
      </h5>
      <h5 class="card-text">
        <strong class="text-success">Completed Days:</strong>
        {{studentData.date.length.toString()}}
      </h5>
      <h6 class="card-text">
        <strong class="text-success">Completed Challenges:</strong>
        {{studentData.challengeName.length.toString()}}
      </h6>
      <div class="buttonRow row">
        <button
          @click="deleteStudent(studentData._id)"
          class="btn btn-sm btn-danger m-1"
          v-if="$route.name=='Admin'"
        >delete</button>
        <button
          v-if="$route.name=='Admin'"
          type="button"
          data-toggle="collapse"
          :data-target="'#pointsChange' +studentData._id"
          class="btn btn-sm btn-success m-1"
        >Add/Remove points</button>
      </div>
      <div
        class="card-text bg-success p-2 text-center collapse mt-1"
        :id="'pointsChange' +studentData._id"
      >
        <form action id="pointsForm">
          <label for="points">Points to add:</label>
          <input v-model="selected" type="number" name="points" id="points" />
          <small id="Help" class="form-text">To remove points set negative number.</small>
          <button
            @click.prevent="addPointsAdmin(studentData._id)"
            class="btn btn-sm btn-secondary m-1"
            v-if="$route.name=='Admin'"
          >Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Student",
  props: ["studentData"],
  components: {},
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    deleteStudent(id) {
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
          Swal.fire("Deleted!", "Student has been deleted.", "success");
          this.$store.dispatch("deleteStudentById", id);
        }
      });
    },
    addPointsAdmin(id) {
      let update = {
        id: id,
        points: this.selected
      };
      this.$store.dispatch("addPointsAdmin", update);
      $("#pointsChange" + id).collapse("hide");
      this.selected = 0;
    }
  }
};
</script>

<style scoped>
.icon {
  height: 30px;
  width: 30px;
}
.student-card {
  width: 100%;
  height: fit-content;
}
.image {
  height: 40px;
  width: auto;
}
.buttonRow {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>