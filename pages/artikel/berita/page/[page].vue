<script lang="ts" setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/20/solid";

useHead({
  title: "Berita - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});

definePageMeta({
  middleware: ["verify-article-page"],
});

const {$api} = useNuxtApp();
const route = useRoute();
const token = useCookie("token");
const {message: articleCountResponse} = await $api.articles.getNewsCount(token.value!);

const currentPage = parseInt(route.params.page as string);
const articlesPerPage = 6;
const totalArticleCount = parseInt(articleCountResponse.count);
const {totalPaginationPages, startingArticleIndex} = await calculatePaginationData(articlesPerPage, currentPage, totalArticleCount);

if (currentPage > totalPaginationPages) {
  throw createError({
    statusCode: 404,
    statusMessage: "Halaman tidak ditemukan",
  });
}

const searchValue = ref("");

const searchArticle = async () => {
  if (searchValue.value) {
    await navigateTo(`/artikel/berita/cari?q=${searchValue.value}`);
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
          <h3 class="mb-3">Halaman {{ currentPage }} dari {{ totalPaginationPages }} ({{ articlesPerPage }} hasil per halaman)</h3>
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

        <!-- News cards -->
        <ArticlesContainer
            :news-starting-index="startingArticleIndex"
            :display-news="true"
            :number-of-news-to-display="articlesPerPage"
            class="mb-8"
        />

        <Pagination
            :current-page="currentPage"
            :max-displayed-pagination-numbers="4"
            :total-pagination-pages="totalPaginationPages"
            pagination-base-url="/artikel/berita/page"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
