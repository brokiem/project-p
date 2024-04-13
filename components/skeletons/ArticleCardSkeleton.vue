<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ArticleCardSkeleton"
})
</script>

<template>
  <div class="flex flex-col md:max-w-3xl text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm transition duration-200">
    <!-- Card image skeleton -->
    <div class="relative">
      <div class="animate-shine rounded-t-md flex justify-center items-center w-full h-[189px] object-cover bg-gray-300 rounded dark:bg-gray-700">
        <svg class="w-12 h-12 text-gray-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
          <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
        </svg>
      </div>
    </div>
    <!-- Card contents skeleton -->
    <div class="p-5">
      <!-- Card title skeleton -->
      <div class="animate-shine mt-1 mb-5 h-5 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[400px]"></div>
      <!-- Card description skeleton -->
      <div class="animate-shine h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full lg:max-w-[380px] mb-2.5"></div>
      <div class="animate-shine h-2 lg:h-0 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full lg:max-w-[380px] mb-2.5"></div>
      <div class="animate-shine h-0 lg:h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[320px] mb-2.5"></div>
      <div class="animate-shine h-0 lg:h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[240px] mb-2.5"></div>
      <!-- Card button skeleton -->
      <div class="animate-shine mt-6 h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
    </div>
  </div>
</template>

<style>

</style>
