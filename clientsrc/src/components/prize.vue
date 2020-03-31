<template>
  <div class="card m-1 col-md-3 col-sm-12 bg-light border border-success card-content">
    <div v-if="editing&&$route.name=='Admin'" class="card-body text-success text-center">
      <edit-prize v-for="(prizeObj) in prizeToEdit" :key="prizeObj._id" :prizeData="prizeObj" />
    </div>
    <div v-if="!editing" class="card-body text-success text-center">
      <h3 class="card-title">
        <strong>{{prizeData.name}}</strong>
      </h3>
      <p class="card-text">{{prizeData.description}}</p>
      <p class="card-text text-warning">
        Cost: {{prizeData.price}} points
        <span
          v-if="prizeData.active==false"
          class="text-danger mx-2 p-1 border border-danger"
        >
          <strong>Inactive</strong>
        </span>
      </p>
      <button
        v-if="prizeData.price<activeStudent.points"
        @click="buyPrize(prizeData)"
        class="btn btn-sm btn-success"
      >Redeem Points for this Prize</button>
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
        <button
          @click="editPrize(prizeData)"
          class="btn btn-sm btn-secondary m-1"
          v-if="$route.name=='Admin'"
        >Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import EditPrize from "../components/editPrize";

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
        .join("/")}`,
      editing: false,
      prizeToEdit: []
    };
  },
  methods: {
    buyPrize(prize) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Use my points!"
      }).then(result => {
        if (result.value) {
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
            Swal.fire("Redeemed!", "Points have been redeemed.", "success");
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
            Swal.fire("Redeemed!", "Points have been redeemed.", "success");
            this.$store.dispatch("spendPoints", update);
            this.$store.dispatch("createRedeamed", update);
          }
        }
      });
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
    },
    editPrize(prize) {
      this.editing = true;
      this.prizeToEdit.push(prize);
    }
  },
  computed: {
    activeStudent() {
      return this.$store.state.activeStudent;
    }
  },
  components: {
    EditPrize
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