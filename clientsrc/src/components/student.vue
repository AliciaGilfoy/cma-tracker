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
        <strong class="text-success">Completed Dates:</strong>
        {{studentData.date.toString()}}
      </h5>
      <h5 class="card-text">
        <strong class="text-success">Completed Challenges:</strong>
        {{studentData.challengeName.toString()}}
      </h5>
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
</style>