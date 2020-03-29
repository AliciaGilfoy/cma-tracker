<template>
  <div class="card col-10 m-2">
    <div class="card-header">
      {{profileData.name}}
      <button class="btn btn-sm btn-outline-secondary mx-1">Edit Name</button>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{profileData.email}}</h5>
      <p class="card-text">
        Students:
        <span
          v-for="student in students"
          :key="student.name"
          class="mx-1"
        >{{student.name}},</span>
      </p>
      <p class="card-text text-warning">
        <span v-if="profileData.instructor&&profileData.admin">Admin - Instructor</span>
        <span v-else-if="profileData.admin">Admin</span>
        <span v-else-if="profileData.instructor">Instructor</span>
      </p>
      <p class="card-text text-warning">
        <button
          @click="changeAdmin(profileData._id, true, profileData.instructor)"
          v-if="!profileData.admin"
          class="btn btn-sm btn-primary mx-1"
        >Mark as Admin</button>
        <button
          @click="changeInstructor(profileData._id, true,  profileData.admin)"
          v-if="!profileData.instructor"
          class="btn btn-sm btn-primary mx-1"
        >Mark as Instructor</button>
        <button
          @click="changeAdmin(profileData._id, false, profileData.instructor)"
          v-if="profileData.admin"
          class="btn btn-sm btn-danger mx-1"
        >Remove Admin</button>
        <button
          @click="changeInstructor(profileData._id, false, profileData.admin)"
          v-if="profileData.instructor"
          class="btn btn-sm btn-danger mx-1"
        >Remove Instructor</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["profileData"],
  mounted() {
    this.findStudents(this.$store.state.students);
  },
  components: {},
  computed: {},
  methods: {
    findStudents(students) {
      for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.profileEmail == this.profileData.email) {
          this.students.push(student);
        }
      }
    },
    changeAdmin(id, boolean, instructor) {
      let update = {
        profileId: id,
        body: {
          admin: boolean,
          instructor: instructor
        }
      };
      this.$store.dispatch("updateProfilePermissions", update);
    },
    changeInstructor(id, boolean, admin) {
      let update = {
        profileId: id,
        body: {
          instructor: boolean,
          admin: admin
        }
      };
      this.$store.dispatch("updateProfilePermissions", update);
    }
  },
  data() {
    return {
      students: []
    };
  }
};
</script>

<style scoped>
</style>