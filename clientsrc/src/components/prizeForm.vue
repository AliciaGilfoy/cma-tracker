<template>
  <div v-if="prizeForm" class="col-12 pb-4">
    <form @submit.prevent="createPrize" class="bg-light p-3">
      <div class="form-group">
        <label for="name">Prize Name</label>
        <input
          class="form-control"
          type="text"
          name="name"
          id="name"
          v-model="newPrize.name"
          placeholder="Enter prize name..."
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group">
        <label for="description">Prize Description</label>
        <input
          class="form-control"
          type="text"
          name="description"
          id="description"
          v-model="newPrize.description"
          placeholder="Enter a description if needed..."
        />
      </div>
      <div class="form-group">
        <label for="point">Prize price</label>
        <input
          class="form-control"
          type="number"
          name="price"
          id="price"
          v-model="newPrize.price"
          placeholder="Enter price..."
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group">
        <label class="float-left" for="instructor">Select Type</label>
        <select class="custom-select" id="instructorSelect" v-model="type">
          <option value="swag">Swag</option>
          <option value="private lesson">Private Lesson</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group" v-if="instructors">
        <label class="float-left" for="instructor">Select Instructor</label>
        <select class="custom-select" id="instructorSelect" v-model="selected">
          <option
            v-for="instructor in instructors"
            :key="instructor._id"
            :value="instructor._id"
          >{{instructor.name}}</option>
        </select>
      </div>
      <button class="btn btn-sm btn-success">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PrizeForm",
  props: [],
  mounted() {
    this.findInstructors(this.$store.state.profiles);
  },
  methods: {
    createPrize() {
      let prize = {
        name: this.newPrize.name,
        description: this.newPrize.description,
        price: this.newPrize.price,
        type: this.type,
        instructorId: this.selected
      };
      this.$store.dispatch("createPrize", prize);
      this.prizeForm = false;
    },
    findInstructors(profiles) {
      for (let i = 0; i < profiles.length; i++) {
        let profile = profiles[i];
        if (profile.instructor) {
          this.instructors.push(profile);
        }
      }
    }
  },
  data() {
    return {
      newPrize: {},
      selected: "",
      instructors: [],
      type: "",
      prizeForm: true
    };
  },
  computed: {
    profiles() {
      return this.$store.state.profiles;
    }
  }
};
</script>

<style>
</style>