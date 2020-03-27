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
            <img class="icon" src="../assets/kick.png" />Attend a Live Class on
            <a href="https://www.zoom.us" target="_blank">Zoom.com</a>
            <span class="text-warning">(5 points)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" /> Attend a
            <a
              href="https://championsmartialarts.win/studentsection/videos_albums"
              target="_blank"
            >Recorded Class</a> – Only if you did not attend live class
            <span class="text-warning">(3 points)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Watch a
            <a
              href="https://www.bay-ata.com/members/mobile_dojahng/training_tips.php"
              target="_blank"
            >Training Tips Video</a> and practice the material in it
            <span class="text-warning">(2 points)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Practice their belt philosophy and ATA philosophy – Only until 1st strip is earned
            <span
              class="text-warning"
            >(2 points)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Post a picture or video of your training on your Facebook page and tag CMA
            <span
              class="text-warning"
            >(2 points)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Practice your form or lower rank forms 3 x per day outside of regular live class.
            <span
              class="text-warning"
            >(2 points)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Do 3 sets of 10 pushups, 10 jumping jacks, 10 burpies, 10 squats, and 10 crunches
            <span
              class="text-warning"
            >(1 point)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Complete the daily Writing Assignment
            <span class="text-warning">(1 point)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Do your Taekwondo stretches outside of a live class
            <span class="text-warning">(1 point)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Make your bed
            <span class="text-warning">(1 point)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Clean your room
            <span class="text-warning">(1 point)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />Clear the table and wash dishes after dinner
            <span class="text-warning">(1 point)</span>
          </li>
          <li>
            <img class="icon" src="../assets/kick.png" />1 Act of Kindness
            <span class="text-warning">(1 point)</span>
          </li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="row text-center p-0 button-row">
          <button
            @click="checkScore=!checkScore"
            class="btn btn-success text-white mt-3"
          >Check your student's total points.</button>
          <div v-if="checkScore" class="col-12 text-white p-3">
            <p>
              Please be sure to spell your name correctly.
              <br />And use the same parent name used when entering the points.
            </p>
            <form action></form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      checkScore: false
    };
  }
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
.button-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top-row {
  background-color: black;
  position: absolute;
}
</style>