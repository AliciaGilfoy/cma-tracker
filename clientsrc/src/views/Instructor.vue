<template>
  <div class="container-fluid page">
    <div class="row text-center pic-row bg-pic text-white">
      <h1 class="col-12 m-0 p-2 bg-gray">Welcome Instructor {{ profile.name }}</h1>
      <h5
        class="col-12 m-0 p-2 bg-gray"
      >These are the redeamed prizes that are connected to you. Please mark them complete when completed.</h5>
    </div>
    <div class="row main-row pt-4 bg-success" v-if="myRedeameds.length>0">
      <redeamed
        v-for="(redeamedObj) in myRedeameds"
        :key="redeamedObj._id"
        :redeamedData="redeamedObj"
      />
    </div>
    <div class="row main-row pt-4 bg-success" v-if="myRedeameds.length==0"></div>
  </div>
</template>

<script>
import Redeamed from "../components/redeamed";

export default {
  name: "Instructor",
  mounted() {
    this.$store.dispatch("getAllRedeameds");
    this.getMyRedeameds(this.$store.state.redeameds);
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    redeameds() {
      return this.$store.state.redeameds;
    }
  },
  data() {
    return {
      myRedeameds: []
    };
  },
  components: {
    Redeamed
  },
  methods: {
    getMyRedeameds(redeameds) {
      let id = this.profile._id;
      for (let i = 0; i < redeameds.length; i++) {
        let redeamed = redeameds[i];
        if (redeamed.instructorId == id) {
          this.myRedeameds.push(redeamed);
        }
      }
    }
  }
};
</script>

<style scoped>
.main-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: flex-start;
  flex-wrap: wrap;
  min-height: 100vh;
}
.bg-pic {
  background-image: url("../assets/background3.jpg");
  background-position: center;
  background-size: cover;
  height: 20rem;
}
.pic-row {
  display: flex;
  flex-direction: row;
  align-content: flex-end;
}
.bg-gray {
  background-color: rgba(71, 71, 71, 0.795);
}
</style>
