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
        <button class="btn btn-sm btn-danger m-1" v-if="$route.name=='Admin'">delete</button>
        <button class="btn btn-sm btn-success m-1" v-if="$route.name=='Admin'">Add points</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Student",
  props: ["studentData"],
  components: {},
  methods: {}
};
</script>

<style>
.icon {
  height: 30px;
  width: 30px;
}
.student-card {
  width: 100%;
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