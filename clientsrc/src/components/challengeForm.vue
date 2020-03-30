<template>
  <div v-if="challengeForm" class="col-12 pb-4">
    <form @submit.prevent="createChallenge" class="bg-light p-3">
      <div class="form-group">
        <label for="name">Challenge Name</label>
        <input
          class="form-control"
          type="text"
          name="name"
          id="name"
          v-model="newChallenge.name"
          placeholder="Enter challenge name..."
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group">
        <label for="description">Challenge Description</label>
        <input
          class="form-control"
          type="text"
          name="description"
          id="description"
          v-model="newChallenge.description"
          placeholder="Enter a description if needed..."
        />
      </div>
      <div class="form-group">
        <label for="point">Challenge point value</label>
        <input
          class="form-control"
          type="number"
          name="point"
          id="point"
          v-model="newChallenge.point"
          placeholder="Enter value..."
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <button class="btn btn-sm btn-success">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChallengeForm",
  props: [],
  methods: {
    createChallenge() {
      this.$store.dispatch("createChallenge", this.newChallenge);
      this.challengeForm = false;
    }
  },
  data() {
    return {
      newChallenge: {},
      challengeForm: true
    };
  }
};
</script>

<style>
</style>