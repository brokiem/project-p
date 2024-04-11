<script lang="ts">
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "Pagination",
  components: {ChevronLeftIcon, ChevronRightIcon},
  props: {
    totalPaginationPages: Number,
    paginationBaseUrl: String,
    currentPage: Number,
    maxDisplayedPaginationNumbers: Number,
  },
  setup(props) {
    const visiblePageRange = calculateVisiblePageRange(props.maxDisplayedPaginationNumbers!, props.currentPage!, props.totalPaginationPages!);
    return {visiblePageRange};
  }
});
</script>

<template>
  <div class="flex content-center items-center justify-center md:justify-end">
    <!-- Previous page button -->
    <NuxtLink
        :class="[currentPage == 1 ? 'pointer-events-none cursor-not-allowed' : '']"
        :to="`${paginationBaseUrl}/${currentPage - 1}`"
        class="flex items-center justify-center border-l border-t border-b border-gray-600 w-12 h-9 rounded-l-lg hover:bg-gray-300">
      <ChevronLeftIcon class="h-5 w-5"/>
    </NuxtLink>

    <!-- Page buttons -->
    <NuxtLink
        v-for="pagination in visiblePageRange"
        :key="pagination"
        :class="[currentPage == pagination ? `bg-blue-600 text-white !ring-blue-600 hover:!bg-blue-500` : ``]"
        :to="`${paginationBaseUrl}/${pagination}`"
        class="flex items-center justify-center border-l border-t border-b border-gray-600 w-9 h-9 hover:bg-gray-300">{{ pagination }}
    </NuxtLink>

    <!-- Next page button -->
    <NuxtLink
        :class="[currentPage == totalPaginationPages ? 'pointer-events-none cursor-not-allowed' : '']"
        :to="`${paginationBaseUrl}/${currentPage + 1}`"
        class="flex items-center justify-center border border-gray-600 w-12 h-9 rounded-r-lg hover:bg-gray-300">
      <ChevronRightIcon class="h-5 w-5"/>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
