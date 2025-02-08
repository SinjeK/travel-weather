<template>
  <div class="footer">
    <div class="footer-item">Created using <a href="https://open-meteo.com/" target="_blank">open-meteo.com</a></div>
    <div class="footer-item" @click="openImprint">Imprint</div>
  </div>
  <Drawer v-model:visible="visible" header="Imprint" class="footer-drawer">
    <div>Maria Mustermann</div>
    <div>Musterstr. 123</div>
    <div>45678 Musterstadt</div>
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
  justify-content: center;
  margin-left: 10vw;
}

.footer-item {
  color: black;
  font-size: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: auto;

  a {
    color: #537e72;
    font-weight: bold;
  }
}

.footer-drawer {
  background-color: #e7e9ff;
}
</style>