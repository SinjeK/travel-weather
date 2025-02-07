<template>
  <div class="container">
    <!-- TODO: Accessibility and Responsiveness -->
    <div class="left-side">
      <h1 class="text">Hi!</h1>
      <p class="text">So you can't decide where to travel next? Why not compare what the weather was like last year?</p>
      <CitySelector @updated-selection="handleUpdatedCities"/>
      <DateSelector @updated-dates="handleUpdatedDates"/>
    </div>
    <div class="right-side">
      <city-card v-for="location in travelLocationList" :city="location" :start-date="startDate" :end-date="endDate"></city-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {TravelLocation} from "./interfaces/TravelLocation.ts";
import {type Ref, ref, toRaw} from "vue";
import CityCard from "./components/CityCard.vue";
import CitySelector from "./components/CitySelector.vue";
import DateSelector from "./components/DateSelector.vue";

let travelLocationList: Ref<TravelLocation[]> = ref([])
let startDate: Ref<string> = ref('')
let endDate: Ref<string> = ref('')

function handleUpdatedCities(state: Ref<TravelLocation[]>) {
  const selectedLocations = toRaw(state);
  const newLocations: TravelLocation[] = [];

  if (!Array.isArray(selectedLocations)) {
    console.log('Emit is not an array.');
    return
  }

  for (const location of selectedLocations) {
    const rawLocation = toRaw(location);
    newLocations.push(rawLocation);
  }
  travelLocationList.value = newLocations
}

function handleUpdatedDates(dateRange: string[]) {
  startDate.value = dateRange[0]
  endDate.value = dateRange[1]
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

.p-multiselect {
  border: 1px solid #535bf2;
  border-radius: 5px;
  margin: 2px;
  padding: 5px;
}
</style>
