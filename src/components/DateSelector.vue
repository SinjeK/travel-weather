<template>
  <DatePicker
      v-model="dates"
      selectionMode="range"
      :manualInput="false"
      class="date-selector"
      dateFormat="dd.mm.yy"
      placeholder="Pick your dates"
  />
</template>

<script setup lang="ts">
import { DatePicker } from "primevue";
import { ref, watch } from "vue";
import { isValidDateRange } from "../utils.ts";

const dates = ref()
const emit = defineEmits([ 'updatedDates' ])

watch(dates, async (newDates) => {
  const startDate = new Date(newDates[0])
  const endDate = new Date(newDates[1])

  if (isValidDateRange(startDate, endDate)) {
    startDate.setHours(1)
    endDate.setHours(1)
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    emit('updatedDates', [ startDateString, endDateString ]);
  }
})
</script>

<style scoped lang="scss">
.date-selector {
  width: 100%;
  height: 36px;
}
</style>