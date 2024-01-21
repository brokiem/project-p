<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello {{ route.fullPath}}!
    </h1>
  </div>
</template>
