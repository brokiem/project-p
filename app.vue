<script>
import { initFlowbite } from "flowbite";

export default {
  mounted() {
    initFlowbite();
  },
};
</script>

<template>
  <NuxtLoadingIndicator color="#03DAC6" :height="3" :throttle="0"/>

  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
