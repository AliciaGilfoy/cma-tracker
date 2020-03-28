<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img
        v-if="$route.name == 'Home'"
        class="big-icon"
        src="../assets/ATALogo2.png"
        alt="ATA logo"
      />
      <img v-else class="big-icon" src="../assets/logo.png" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto float-right text-right">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Dashboard' }"
        >
          <router-link class="nav-link" :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Store' }"
        >
          <router-link class="nav-link" :to="{ name: 'Store' }">Store</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated && this.profile.admin == true"
          :class="{ active: $route.name == 'Admin' }"
        >
          <router-link class="nav-link" :to="{ name: 'Admin' }">Admin Page</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated && this.profile.instructor == true"
          :class="{ active: $route.name == 'Instructor' }"
        >
          <router-link class="nav-link" :to="{ name: 'Instructor' }">Instructor Page</router-link>
        </li>
      </ul>
      <div>
        <button class="btn btn-success nav-item" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger nav-item" @click="logout" v-if="$auth.isAuthenticated">logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.big-icon {
  height: 50px;
  width: auto;
}
.bg-black {
  background-color: black;
}
</style>
