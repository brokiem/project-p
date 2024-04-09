<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import type {Ref} from "vue";

const token = useCookie("token");

const competency: Ref<{ title: string; description: string; }> = ref({title: "", description: ""})

function isDataValid() {
  return competency.value.title.trim() !== "" && competency.value.description.trim() !== "";
}

async function createCompetency() {
  const {$api, $swal} = useNuxtApp();

  if (!isDataValid()) {
    // @ts-ignore
    $swal.fire({
      title: "Data tidak valid",
      text: "Judul dan deskripsi kompetensi keahlian tidak boleh kosong",
      icon: "error",
      showConfirmButton: false,
    });
    return;
  }

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

  const {message} = await $api.competencies.add(competency.value.title, competency.value.description, token.value!);

  if (message) {
    // @ts-ignore
    $swal.fire({
      title: "Berhasil membuat kompetensi keahlian",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {

    });
  } else {
    // @ts-ignore
    $swal.fire({
      title: "Gagal membuat kompetensi keahlian",
      icon: "error",
      showConfirmButton: false,
    });
  }
}
</script>

<template>
  <Header title="Buat Kompetensi Keahlian"></Header>

  <div class="mt-12 mb-12 container mx-auto max-w-[770px] px-8 lg:px-0">
    <!-- Kompetensi title input -->
    <label class="mb-2 text-sm text-gray-900" for="kompetensi-title">
      Judul Kompetensi <span class="text-red-600">*</span>
    </label>
    <input id="kompetensi-title" v-model="competency.title"
           class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Judul"
           required type="text"
           maxlength="60"
    >

    <!-- Kompetensi description input -->
    <label class="mb-2 text-sm text-gray-900" for="kompetensi-description">
      Deskripsi Kompetensi <span class="text-red-600">*</span>
    </label>
    <textarea id="kompetensi-description" v-model="competency.description"
              class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deskripsi"
              required type="text"
    />

    <!-- Update Kompetensi button -->
    <button
        class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="createCompetency">
      Buat Kompetensi
    </button>
  </div>
</template>

<style scoped>

</style>
