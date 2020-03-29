<template>
  <div class="card m-2">
    <div class="card-body bg-dark text-success text-center">
      <h4 v-if="prize" class="card-title">Student: {{student.name}}</h4>
      <h5 v-if="prize" class="card-title">{{prize.name}}</h5>
      <p v-if="prize" class="card-text">{{prize.description}}</p>
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
  },
  mounted() {
    this.$store.dispatch("getAllPrizes");
  },
  computed: {
    student() {
      return this.$store.state.students.find(
        s => s._id == this.redeamedData.studentId
      );
    },
    prize() {
      return this.$store.state.prizes.find(
        p => p._id == this.redeamedData.prizeId
      );
    }
  }
};
</script>

<style>
</style>