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
import Swal from "sweetalert2";

export default {
  name: "Redeamed",
  props: ["redeamedData"],
  methods: {
    completeRedeamed(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Mark Complete!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Success!", "Prize has been marked redeamed.", "success");
          this.$store.dispatch("completeRedeamed", id);
        }
      });
    }
  }
};
</script>

<style>
</style>