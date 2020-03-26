<template>
  <div class="container home bg-secondary">
    <div class="row heading-row">
      <img alt="Champions logo" src="../assets/logo.png" />
      <h1 class="col-12 text-center text-success">Welcome to the CMA Daily Tracker</h1>
    </div>
    <div class="row p-3">
      <div class="col-md-6 col-sm-12 text-secondary bg-white rounded p-3">
        <div class="row text-center p-0">
          <h3 class="col-12 title-row">
            Each day, see how many of these
            <br />
            <u>activities you can complete:</u>
          </h3>
        </div>
        <ul class="p-0">
          <li>
            <img class="icon" src="../assets/kick.png" />Attend a Live Class on Zoom.com (5 points)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" /> Attend a Recorded Class – Only if you did not attend live class (3 points)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Watch a Training Tips Video and practice the material in it (2 points)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Practice their belt philosophy and ATA philosophy – Only until 1st strip is earned (2 points)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Post a picture or video of your training on your Facebook page and tag CMA (2 points)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Practice your form or lower rank forms 3 x per day outside of regular live class. (2 points)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Do 3 sets of 10 pushups, 10 jumping jacks, 10 burpies, 10 squats, and 10 crunches (1 point)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Complete the daily Writing Assignment (1 point)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Do your Taekwondo stretches outside of a live class (1 point)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Make your bed (1 point)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Clean your room (1 point)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Clear the table and wash dishes after dinner (1 point)
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />1 Act of Kindness (1 point)
          </li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-12"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
.heading-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
}
.home {
  min-height: 100vh;
  max-width: 100vw;
}
.icon {
  height: 30px;
  width: 30px;
}
ul {
  list-style-type: none;
}
.title-row {
  width: 100%;
  padding: 0;
}
</style>