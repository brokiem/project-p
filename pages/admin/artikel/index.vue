<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Admin - Artikel - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});
</script>

<template>
  <div>
    <!-- Page title -->
    <Header title="Kelola Artikel"></Header>

    <div class="container mx-auto px-4 md:max-w-default py-10">
      <div class="flex justify-center">
        <div
            class="block w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="px-6 pt-6 pb-4">
            <p class="text-center font-normal text-gray-700 dark:text-gray-400">
              Silahkan pilih jenis artikel yang ingin dikelola.
            </p>

            <div class="pt-3 flex flex-col md:flex-row justify-center">
              <NuxtLink to="/admin/dash">
                <button type="button"
                        class="w-full md:w-auto shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kembali ke Dashboard
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/artikel/berita/page/1">
                <button type="button"
                        class="w-full md:w-auto shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kelola Berita
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/artikel/pengumuman/page/1">
                <button type="button"
                        class="w-full md:w-auto shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kelola Pengumuman
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
