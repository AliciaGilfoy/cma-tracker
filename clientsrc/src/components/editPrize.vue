<template>
  <div v-if="editPrize" class="col-12 pb-4">
    <form @submit.prevent="editThisPrize(prizeData._id)" class="bg-light p-3">
      <div class="form-group m-0 p-0">
        <label for="name">Prize Name</label>
        <input
          class="form-control"
          type="text"
          name="name"
          id="name"
          v-model="newPrize.name"
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group m-0 p-0">
        <label for="description">Prize Description</label>
        <input
          class="form-control"
          type="text"
          name="description"
          id="description"
          v-model="newPrize.description"
        />
      </div>
      <div class="form-group m-0 p-0">
        <label for="point">Prize price</label>
        <input
          class="form-control"
          type="number"
          name="price"
          id="price"
          v-model="newPrize.price"
          required
        />
        <small id="Help" class="form-text text-muted">Required</small>
      </div>
      <div class="form-group m-0 p-0">
        <label class="float-left" for="instructor">Select Type</label>
        <select class="custom-select" id="instructorSelect" v-model="type">
          <option value="swag">Swag</option>
          <option value="private lesson">Private Lesson</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group m-0 p-0" v-if="instructors">
        <label class="float-left" for="instructor">Select Instructor</label>
        <select class="custom-select" id="instructorSelect" v-model="selected">
          <option :value="prizeData.instructorId" selected>{{prizeData.instructorName}}</option>
          <option
            v-for="instructor in instructors"
            :key="instructor._id"
            :value="instructor._id"
          >{{instructor.name}}</option>
        </select>
      </div>
      <button class="btn btn-sm btn-success">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditPrize",
  props: ["prizeData"],
  mounted() {
    this.findInstructors(this.$store.state.profiles);
    this.setPrizeData();
  },
  methods: {
    editThisPrize(id) {
      let update = {
        id: id,
        body: {
          name: this.newPrize.name,
          description: this.newPrize.description,
          price: this.newPrize.price,
          type: this.type,
          instructorId: this.selected
        }
      };
      this.$store.dispatch("editPrize", update);
      this.editPrize = false;
    },
    findInstructors(profiles) {
      for (let i = 0; i < profiles.length; i++) {
        let profile = profiles[i];
        if (profile.instructor) {
          this.instructors.push(profile);
        }
      }
    },
    setPrizeData() {
      this.newPrize = this.prizeData;
    }
  },
  data() {
    return {
      newPrize: {},
      selected: "",
      instructors: [],
      type: "",
      editPrize: true
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