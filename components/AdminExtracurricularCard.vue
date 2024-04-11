<template>
  <!-- Card contents -->
  <div
      class="flex flex-col mx-auto md:max-w-3xl text-gray-900 bg-white rounded-md border border-gray-300 shadow transition duration-200 p-5">
    <!-- Card ekstra title -->
    <h3 class="mb-4 text-xl font-normal tracking-tight">{{ title }}</h3>

    <!-- Card ekstra description -->
    <p class="text-base font-normal text-gray-500 text-md text-">{{ description }}</p>

    <!-- Card ekstra button -->
    <div class="flex flex-row gap-x-2 mt-auto">
      <button @click="showModal" type="button"
              class="w-full mt-3 shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Guru Pembimbing
      </button>
      <NuxtLink :to="'/admin/ekstrakurikuler/' + id + '/edit'">
        <button
            class="mt-3 shadow font-base transition duration-200 text-white bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </NuxtLink>
      <!-- Delete Article button -->
      <button @click="deleteExtracurricular(id)"
              class="mt-3 shadow font-base transition duration-200 text-white bg-red-600 border border-gray-300 focus:outline-none hover:bg-red-800 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              stroke-linecap="round"
              stroke-linejoin="round"/>
        </svg>
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
                  class="w-full font-medium shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XMarkIcon} from "@heroicons/vue/20/solid";

export default {
  name: "EkstrakulikulerCard",
  components: {XMarkIcon},
  props: {
    id: {
      type: Number,
      required: true,
    },
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
  setup() {
    const token = useCookie("token");

    return {token};
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
    async deleteExtracurricular(id) {
      const {$api, $swal} = useNuxtApp();

      // @ts-ignore
      $swal.fire({
        title: "Hapus artikel?",
        text: "Artikel yang dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#EF4444",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // @ts-ignore
          $swal.fire({
            title: "Memproses...",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              // @ts-ignore
              $swal.showLoading();
            },
          });

          const {message} = await $api.extracurriculars.delete(id, this.token);

          if (message) {
            // @ts-ignore
            $swal.fire({
              title: "Success!",
              text: "Ekstrakurikuler berhasil dihapus",
              icon: "success",
              confirmButtonText: "Tutup",
            }).then(() => {
              window.location.reload();
            });
          } else {
            // @ts-ignore
            $swal.fire({
              title: "Failed!",
              text: "Gagal menghapus ekstrakurikuler",
              icon: "error",
              confirmButtonText: "Tutup",
            });
          }
        }
      });
    }
  },
};
</script>
