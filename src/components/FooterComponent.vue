<template>
  <div class="footer">
    <div class="footer-item">Credit goes to <a href="https://open-meteo.com/" target="_blank">open-meteo.com</a></div>
    <div class="footer-item" @click="openImprint">Imprint</div>
  </div>
  <Drawer v-model:visible="visible" header="Imprint" class="footer-drawer">
    <p>
      TODO
    </p>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Drawer } from "primevue";

const visible = ref(false)
const openImprint = () => {
  visible.value = !visible.value
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
}

.footer-item {
  align-items: center;
  color: black;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: auto;
  font-size: 10px;

  a {
    color: #535bf2;
    font-weight: bold;
  }
}

.footer-drawer {
  background-color: #e7e9ff;
}
</style>