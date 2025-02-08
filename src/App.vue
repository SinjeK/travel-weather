<template>
  <div class="container">
    <!-- TODO: Accessibility -->
    <div class="left-side">
      <h1 class="text">Hi!</h1>
      <p class="text">So you can't decide where to travel next? Why not check what the weather was like last year?</p>
      <DateSelector @updated-dates="handleUpdatedDates"/>
      <CitySelector @updated-selection="handleUpdatedCities"/>
    </div>
    <div class="right-side">
      <city-card v-for="location in travelLocationList" :key="location.name" :city="location" :start-date="startDate" :end-date="endDate"></city-card>
    </div>
  </div>
  <footer-component />
</template>

<script setup lang="ts">
import type { TravelLocation } from "./interfaces/TravelLocation.ts";
import { type Ref, ref, toRaw } from "vue";
import CityCard from "./components/CityCard.vue";
import CitySelector from "./components/CitySelector.vue";
import DateSelector from "./components/DateSelector.vue";
import FooterComponent from "./components/FooterComponent.vue";

const travelLocationList: Ref<TravelLocation[]> = ref([])
const startDate: Ref<string> = ref('')
const endDate: Ref<string> = ref('')

const handleUpdatedCities = (state: Ref<TravelLocation[]>) => {
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

const handleUpdatedDates = (dateRange: string[]) => {
  startDate.value = dateRange[0]
  endDate.value = dateRange[1]
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  margin: 25px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
}

.left-side {
  border-right: 2px solid #537e72;
  height: 70vh;
  max-width: 35vw;
  padding: 10px;

  @media only screen and (max-width: 600px) {
    border-bottom: 2px solid #537e72;
    border-right: none;
    height: fit-content;
    max-width: 80vw;
  }
}

.right-side {
  height: fit-content;
  margin-left: 10px;
  min-width: 60vw;
  overflow-y: scroll;

  @media only screen and (max-width: 600px) {
    height: fit-content;
  }
}

.text {
  margin-bottom: 10px;
  text-align: left;
}

.p-multiselect {
  margin-top: 5px;
}
</style>
