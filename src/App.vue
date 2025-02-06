<template>
  <div class="container">
    <!-- TODO: Accessibility and Responsiveness -->
    <div class="left-side">
      <h1 class="text">Hi!</h1>
      <p class="text">So you can't decide where to travel next? Why not compare what the weather was like last year?</p>
      <!-- TODO: allow selection of cities -->
      <CitySelector @updated-selection="handleUpdatedSelection"/>
      <!-- TODO: allow selection of dates -->
    </div>
    <div class="right-side">
      <city-card v-for="location in travelLocationList" :city="location"></city-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import CityCard from "./components/CityCard.vue";
import CitySelector from "./components/CitySelector.vue";
import type {TravelLocation} from "./interfaces/TravelLocation.ts";
import {type Ref, ref, toRaw} from "vue";

let travelLocationList: Ref<TravelLocation[]> = ref([])

function handleUpdatedSelection(state: Ref<TravelLocation[]>) {
  const rawState = toRaw(state);
  const newLocations: TravelLocation[] = [];

  if (!Array.isArray(rawState)) {
    console.log('Emit is not an array.');
    return
  }
  for (const location of rawState) {
    const rawLocation = toRaw(location);
    newLocations.push(rawLocation);
  }
  travelLocationList.value = newLocations
}


</script>

<style scoped lang="scss">
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

// TODO: replace
.p-multiselect {
  border: 1px solid #535bf2;
  border-radius: 5px;
  margin: 2px;
  padding: 5px;
}
</style>
