<template>
  <div class="container">
    <div class="left-side">
      <h1 class="text">Hi!</h1>
      <p class="text">So you can't decide where to travel next? Why not compare what the weather was like last year?</p>
      <!-- TODO: allow selection of cities -->
      <!-- TODO: allow selection of dates -->
    </div>
    <div class="right-side">
      <city-card v-for="location in travelLocationList" :city="location"></city-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import CityCard from "./components/CityCard.vue";
import type {TravelLocation} from "./interfaces/TravelLocation.ts";

const travelLocationList: TravelLocation[] = [
  {
    name: 'Seville',
    lat: 37.39,
    lng: -5.99
  },
  {
    name: 'Rome',
    lat: 41.90,
    lng: 12.49
  },
  {
    name: 'Athens',
    lat: 37.98,
    lng: 23.72
  }]
</script>

<style scoped>
.container {
  margin: 25px;
  width: 750px;
  display: flex;
}

.left-side {
  height: 50vh;
  width: 30%;
  border-right: 2px solid #535bf2;
}

.right-side {
  height: 50vh;
  width: 70%;
}

.text {
  margin: 10px;
  text-align: left;
}
</style>
