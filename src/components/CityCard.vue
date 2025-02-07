<template>
  <div class="city-card">
    <div class="city-card__header">
      {{ city.name }}
    </div>
    <div class="city-card__body">
      <div class="city-card__flex-item" v-for="item in weatherData">
        <div class="city-card__date">{{ formatDate(item.time) }}</div>
        <div class="city-card__temp">{{ formatTemperature(item.temperature) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TravelLocation } from "../interfaces/TravelLocation.ts";
import { getWeatherForLocation } from "../services/WeatherService.ts";
import type { WeatherResponse } from "../interfaces/WeatherResponse.ts";
import { onMounted, type Ref, ref, watch } from "vue";

const props = defineProps<{
  city: TravelLocation,
  startDate: string,
  endDate: string
}>()

const weatherData: Ref<WeatherResponse[]> = ref([])
onMounted(async () => {
  weatherData.value = await getWeatherForLocation(props.city, props.startDate, props.endDate);
})

watch( () => props, async () => {
      weatherData.value = await getWeatherForLocation(props.city, props.startDate, props.endDate);
    },{ deep: true }
)

function formatDate(dateString: string) {
  const date = dateString.split('T')[0]
  const dateSections = date.split('-')
  const generatedDate = new Date(Number(dateSections[0]), Number(dateSections[1]) - 1, Number(dateSections[2]))
  return Intl.DateTimeFormat('de-DE').format(generatedDate)
}

function formatTemperature(temp: number) {
  return `${Number(temp).toFixed(1)} °C`
}
</script>

<style scoped lang="scss">
.city-card {
  margin: 10px;
  border: 1px solid #535bf2;
  border-radius: 5px;
  padding: 3px;

  &__header {
    font-weight: bold;
    text-align: left;
  }

  &__body {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  &__flex-item {
    flex-basis: fit-content;
    width: fit-content;
    margin: 5px;
  }

  &__date {
    font-size: 12px;
    font-weight: lighter;
  }

  &__temp {
    font-size: 14px;
  }
}
</style>