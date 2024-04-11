<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import type {Ref} from "vue";

useHead({
  title: "Kelola Kompetensi Keahlian - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});

const competencies: Ref<{ id: number; title: string; description: string; }[]> = ref([]);

async function loadCompetencies() {
  const {$api} = useNuxtApp();
  const {message} = await $api.competencies.getAll();

  competencies.value = message.competencies;
}

try {
  await loadCompetencies();
} catch (err) {
  console.error(err);
}

async function deleteCompetency(id: number) {
  const {$api, $swal} = useNuxtApp();
  const token = useCookie("token");

  // @ts-ignore
  $swal.fire({
    title: "Hapus kompetensi keahlian?",
    text: "Kompetensi keahlian yang dihapus tidak dapat dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    confirmButtonColor: "#EF4444",
    cancelButtonText: "Batal",
  }).then(async (result: any) => {
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

      try {
        await $api.competencies.delete(id, token.value!);

        // @ts-ignore
        $swal.fire({
          title: "Berhasil",
          text: "Kompetensi keahlian berhasil dihapus",
          icon: "success",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#2563EB",
        }).then(() => {
          loadCompetencies();
        });
      } catch (err) {
        console.error(err);

        // @ts-ignore
        $swal.fire({
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus kompetensi keahlian",
          icon: "error",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#2563EB",
        });
      }
    }
  });
}
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="py-8 px-4 mx-auto md:max-w-[1250px] lg:py-16 lg:px-6">
        <!-- Section title -->
        <div class="max-w-screen-xl mb-8 lg:mb-10">
          <div class="flex flex-row gap-x-4">
            <h2 class="mb-1.5 text-3xl tracking-tight font-medium text-gray-900 dark:text-white">
              Kelola Kompetensi Keahlian
            </h2>
            <!-- Create icon -->
            <NuxtLink to="/admin/kompetensi-keahlian/buat" class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-10 h-10 text-white rounded-full text-sm">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span class="sr-only">Create</span>
            </NuxtLink>
          </div>
          <h3 class="mb-3">Menampilkan total {{ competencies.length }} kompetensi keahlian</h3>
        </div>

        <!-- Kompetensi grid -->
        <div class="space-y-3 lg:grid lg:grid-cols-4 sm:gap-4 lg:gap-3 lg:space-y-0">
          <div v-for="competency in competencies" class="flex flex-col p-4 mx-auto md:max-w-3xl text-center text-gray-900 bg-white rounded-md border border-gray-200 shadow md:pt-8 transition duration-200">
            <h3 class="mb-4 text-2xl font-normal tracking-tight">{{ competency.title }}</h3>
            <p class="font-light text-gray-500 sm:text-lg text-justify">{{ competency.description }}</p>

            <div class="grow"></div>
            <div class="flex flex-row mt-3 gap-x-2">
              <div class="grow"></div>
              <NuxtLink :to="'/admin/kompetensi-keahlian/' + competency.id + '/edit'">
                <button type="button"
                        class="w-full shadow font-base transition duration-200 text-white bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-700 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </NuxtLink>
              <button type="button"
                      class="bg-red-600 hover:bg-red-700 shadow font-base transition duration-200 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      @click="deleteCompetency(competency.id)">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
