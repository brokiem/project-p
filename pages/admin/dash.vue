<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Admin - SMK Negeri 2 Tabanan",
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
    <Header title="Dashboard"></Header>

    <div class="container mx-auto px-4 md:max-w-default py-10">
      <div class="flex justify-center">
        <div
            class="block w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="px-6 pt-6 pb-4">
            <p class="text-center font-normal text-gray-700 dark:text-gray-400">
              Selamat datang di halaman admin. Anda dapat mengelola data-data sekolah di sini.
            </p>

            <div class="pt-3 flex justify-center">
              <NuxtLink to="/admin/artikel">
                <button type="button" class="shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kelola Artikel
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/ekstrakurikuler">
                <button type="button" class="shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kelola Ekstrakurikuler
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/kompetensi">
                <button type="button" class="shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kelola Kompetensi Keahlian
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/pengguna">
                <button type="button" class="shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Kelola Pengguna
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
