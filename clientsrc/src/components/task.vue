<template>
  <li>
    <blockquote class="blockquote">
      <p class="mb-0">
        <img class="icon" src="../assets/kick.png" />
        {{taskData.name}}
        <a
          class="mx-1"
          v-if="taskData.link"
          :href="taskData.link"
          target="_blank"
        >
          <i class="fas fa-external-link-alt"></i>
        </a>
        <span class="text-warning">({{taskData.point}} points)</span>
        <button
          @click="deleteTask(taskData._id)"
          class="btn btn-sm btn-danger m-1"
          v-if="$route.name=='Admin'"
        >delete</button>
      </p>
      <footer v-if="taskData.description" class="blockquote-footer">{{taskData.description}}</footer>
    </blockquote>
  </li>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Task",
  props: ["taskData"],
  methods: {
    deleteTask(task) {
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
          Swal.fire("Deleted!", "Task has been deleted.", "success");
          this.$store.dispatch("deleteTaskById", task);
        }
      });
    }
  }
};
</script>

<style scoped>
.icon {
  height: 30px;
  width: 30px;
}
</style>