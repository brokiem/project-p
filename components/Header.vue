<script>
export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <h2 class="text-3xl text-center text-gray-900 dark:text-white pt-16 pb-16" style="background-color: #F8F9FC;">
    {{ title }}
  </h2>
</template>

<style scoped>

</style>
