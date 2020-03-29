<template>
  <div class="col-12 pb-4">
    <form @submit.prevent="createTask" class="bg-light p-3">
      <div class="form-group">
        <label for="name">Task Name</label>
        <input
          class="form-control"
          type="text"
          name="name"
          id="name"
          v-model="newTask.name"
          placeholder="Enter task name..."
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group">
        <label for="description">Task Description</label>
        <input
          class="form-control"
          type="text"
          name="description"
          id="description"
          v-model="newTask.description"
          placeholder="Enter a description if needed..."
        />
      </div>
      <div class="form-group">
        <label for="point">Task point value</label>
        <input
          class="form-control"
          type="number"
          name="point"
          id="point"
          v-model="newTask.point"
          placeholder="Enter value..."
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group">
        <label for="link">Link</label>
        <input
          class="form-control"
          type="text"
          name="link"
          id="link"
          v-model="newTask.link"
          placeholder="Enter a link if needed..."
        />
      </div>
      <button class="btn btn-sm btn-success">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  props: [],
  methods: {
    createTask() {
      debugger;
      this.$store.dispatch("createTask", this.newTask);
    }
  },
  data() {
    return {
      newTask: {}
    };
  }
};
</script>

<style>
</style>