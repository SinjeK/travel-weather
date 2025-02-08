<template>
  <MultiSelect
      v-model="selectedCities"
      display="chip"
      :options="cities"
      optionLabel="name"
      placeholder="Select cities"
      :maxSelectedLabels="3"
      class="city-multiselect w-full md:w-20rem"
  />
</template>

<script setup lang="ts">
import type { TravelLocation } from "../interfaces/TravelLocation.ts";
import MultiSelect from "primevue/multiselect";
import { ref, type Ref, watch } from "vue";

// TODO: find an API for this instead of hardcoding the list
const cities: TravelLocation[] = [
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
    name: 'Paris',
    lat: 48.86,
    lng: 2.34
  },
  {
    name: 'Madrid',
    lat: 40.41,
    lng: -3.70
  },
  {
    name: 'Lisbon',
    lat: 38.73,
    lng: -9.14
  },
  {
    name: 'Marseille',
    lat: 43.29,
    lng: 5.37
  },
  {
    name: 'Naples',
    lat: 40.85,
    lng: 14.30
  },
  {
    name: 'Athens',
    lat: 37.98,
    lng: 23.72
  } ]
const selectedCities: Ref<TravelLocation[]> = ref([])
const emit = defineEmits([ 'updatedSelection' ])

watch(selectedCities, async (newSelection) => {
  emit('updatedSelection', newSelection)
})
</script>

<style scoped lang="scss">
.city-multiselect {
  margin-bottom: 20px;
  width: 100%;
}
</style>