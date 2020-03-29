<template>
  <div class="card m-2">
    <div class="card-body bg-dark text-success text-center">
      <h4 class="card-title">Student: {{redeamedData.studentName}}</h4>
      <h5 class="card-title">{{redeamedData.prizeName}}</h5>
      <button
        v-if="!redeamedData.complete"
        @click="completeRedeamed(redeamedData._id)"
        class="btn btn-sm btn-success"
      >Mark Complete</button>
      <p v-if="redeamedData.complete">Marked Completed by {{redeamedData.completedBy}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Redeamed",
  props: ["redeamedData"],
  methods: {
    completeRedeamed(id) {
      this.$store.dispatch("completeRedeamed", id);
    }
  }
};
</script>

<style>
</style>