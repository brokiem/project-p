<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

import {MagnifyingGlassIcon} from "@heroicons/vue/20/solid";

const router = useRouter();
const route = useRoute();
const searchQuery = route.query.q as string;

// Redirect to home if no search query
if (!searchQuery) {
  router.replace("/");
}

useHead({
  title: `Mencari hasil untuk "${searchQuery}" - Pencarian SMK Negeri 2 Tabanan`,
  meta: [
    {
      name: "description",
      content: "Temukan berita dan pengumuman terbaru di SMK Negeri 2 Tabanan",
    },
  ],
});

const {$api} = useNuxtApp();
const token = useCookie("token");

const searchValue = ref(searchQuery);
const finalSearchValue = ref(searchQuery);

const searchArticle = async () => {
  if (searchValue.value) {
    await router.push(`/admin/artikel/berita/cari?q=${encodeURIComponent(searchValue.value)}`);
    finalSearchValue.value = searchValue.value;
  }
};
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="py-8 px-4 mx-auto md:max-w-[1250px] lg:py-16 lg:px-6">
        <!-- Section title -->
        <div class="max-w-screen-xl mb-8 lg:mb-10">
          <h2 class="mb-1.5 text-3xl tracking-tight font-medium text-gray-900 dark:text-white">
            Berita
          </h2>
          <h3 class="mb-3">Menampilkan 20 hasil pencarian teratas untuk kaca kunci "{{ finalSearchValue }}"</h3>
        </div>

        <!-- Search input -->
        <form class="flex items-center mb-4" @submit.prevent="searchArticle">
          <label class="sr-only" for="searchInput">Cari</label>
          <div class="relative w-full">
            <input id="searchInput" v-model="searchValue"
                   class="transition duration-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Pencarian" required type="text">
          </div>
          <button class="transition duration-200 p-2 px-5 text-sm font-medium text-white bg-blue-700 rounded-r-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
            <MagnifyingGlassIcon class="w-5 h-5"/>
            <span class="sr-only">Search</span>
          </button>
        </form>

        <!-- Berita cards -->
        <AdminArticlesContainer
            :display-news="true"
            :number-of-news-to-display="20"
            :search-value="finalSearchValue"
            class="mb-8"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
