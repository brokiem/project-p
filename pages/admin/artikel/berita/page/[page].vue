<script lang="ts" setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/20/solid";

definePageMeta({
  middleware: ["verify-article-page", "auth"],
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
    await navigateTo(`/admin/artikel/berita/cari?q=${searchValue.value}`);
  }
};
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="py-8 px-4 mx-auto md:max-w-[1250px] lg:py-16 lg:px-6">
        <!-- Section title -->
        <div class="max-w-screen-xl mb-8 lg:mb-10">
          <div class="flex flex-row gap-x-4">
            <h2 class="mb-1.5 text-3xl tracking-tight font-medium text-gray-900 dark:text-white">
              Kelola Berita
            </h2>
            <!-- Create icon -->
            <NuxtLink to="/admin/artikel/berita/buat" class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-10 h-10 text-white rounded-full text-sm">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span class="sr-only">Create</span>
            </NuxtLink>
          </div>
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
        <AdminArticlesContainer
            :news-starting-index="startingArticleIndex"
            :display-news="true"
            :number-of-news-to-display="articlesPerPage"
            class="mb-8"
        />

        <Pagination
            :current-page="currentPage"
            :max-displayed-pagination-numbers="4"
            :total-pagination-pages="totalPaginationPages"
            pagination-base-url="/admin/artikel/berita/page"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
