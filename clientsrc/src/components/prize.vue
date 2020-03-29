<template>
  <div class="card m-1 col-md-3 col-sm-12 bg-light border border-success card-content">
    <div class="card-body text-success text-center">
      <h3 v-if="prizeData" class="card-title">
        <strong>{{prizeData.name}}</strong>
      </h3>
      <p v-if="prizeData" class="card-text">{{prizeData.description}}</p>
      <p v-if="prizeData" class="card-text text-warning">
        Cost: {{prizeData.price}} points
        <span
          v-if="!prizeData.active"
          class="text-danger mx-2 p-1 border border-danger"
        >
          <strong>Inactive</strong>
        </span>
      </p>
      <button
        v-if="prizeData.price<activeStudent.points"
        @click="buyPrize(prizeData)"
        class="btn btn-sm btn-success"
      >Redeam Points for this Prize</button>
      <div class="buttonRow row">
        <button
          @click="deletePrize(prizeData._id)"
          class="btn btn-sm btn-danger m-1"
          v-if="$route.name=='Admin'&&prizeData.active"
        >Make Unavailable</button>
        <button
          @click="activatePrize(prizeData._id)"
          class="btn btn-sm btn-success m-1"
          v-if="$route.name=='Admin'&&!prizeData.active"
        >Make Available</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prize",
  props: ["prizeData"],
  data() {
    return {
      todaysDate: `${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/")}`
    };
  },
  methods: {
    buyPrize(prize) {
      if (prize.instructorId) {
        let update = {
          studentId: this.activeStudent._id,
          studentName: this.activeStudent.name,
          points: prize.price,
          prizeId: prize._id,
          prizeName: prize.name,
          instructorId: prize.instructorId,
          date: this.todaysDate
        };
        this.$store.dispatch("spendPoints", update);
        this.$store.dispatch("createRedeamed", update);
      } else {
        let update = {
          studentId: this.activeStudent._id,
          points: prize.price,
          prizeName: prize.name,
          studentName: this.activeStudent.name,
          prizeId: prize._id,
          instructorId: "5e7ff8cd59b18b366c1fc058",
          date: this.todaysDate
        };
        this.$store.dispatch("spendPoints", update);
        this.$store.dispatch("createRedeamed", update);
      }
    },
    deletePrize(id) {
      this.$store.dispatch("deletePrizeById", id);
    },
    activatePrize(id) {
      let update = {
        id: id,
        body: {
          active: true
        }
      };
      this.$store.dispatch("editPrize", update);
    }
  },
  computed: {
    activeStudent() {
      return this.$store.state.activeStudent;
    }
  }
};
</script>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card {
  height: fit-content;
}
</style>