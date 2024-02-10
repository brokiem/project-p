<template>
  <!-- Card contents -->
  <div
      class="flex flex-col mx-auto md:max-w-3xl text-gray-900 bg-white rounded-md border border-gray-300 shadow transition duration-200 p-5">
    <!-- Card ekstra title -->
    <h3 class="mb-4 text-xl font-normal tracking-tight">{{ title }}</h3>

    <!-- Card ekstra description -->
    <p class="text-base font-normal text-gray-500 text-md text-">{{ description }}</p>

    <!-- Card ekstra button -->
    <div class="flex flex-wrap mt-auto">
      <button @click="showModal" type="button"
              class="w-full mt-3 shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Guru Pembimbing
      </button>
    </div>
  </div>

  <!-- Guru pembimbing modal -->
  <div v-if="isModalShown"
       class="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-screen flex items-center justify-center"
       style="background: rgba(0, 0, 0, 0.5);">
    <div class="relative w-full max-w-2xl h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-md shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Guru Pembimbing - {{ title }}
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <!-- Using <whitespace-pre> here because it preserve whitespace like newline characters (\n) -->
          <p class="whitespace-pre text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">{{
              mentors.map((mentor) => `${mentor.users.username}`).join("\n")
            }}</p>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button @click="hideModal" type="button"
                  class="w-full font-medium shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/20/solid";

export default {
  name: "EkstrakulikulerCard",
  components: { XMarkIcon },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mentors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isModalShown: false,
    };
  },
  methods: {
    showModal() {
      this.isModalShown = true;
    },
    hideModal() {
      this.isModalShown = false;
    },
  },
};
</script>
