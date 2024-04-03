<script lang="ts" setup>
import {CalendarIcon, MegaphoneIcon} from "@heroicons/vue/20/solid";

function error404() {
  return createError({
    statusCode: 404,
    statusMessage: "Halaman tidak ditemukan",
  });
}

const route = useRoute();
const article = route.params.article as string;
const articleId = parseInt(route.params.id as string);

// Check if articleId is a number
if (isNaN(articleId)) {
  // Return nuxt 404 page
  throw error404();
}

// Fetch article data
const {$api} = useNuxtApp();
const token = useCookie("token");
const {message: articleResponse} = await $api.articles.getAnnouncementById(articleId, token.value!);
const announcement = articleResponse.announcement;

// Check if article exists
if (!announcement) {
  // Return nuxt 404 page
  throw error404();
}

// Change url to include article title
const router = useRouter();
const encodedArticleTitle = encodeArticleTitle(announcement.title);
if (article !== encodedArticleTitle) {
  router.replace(formatArticleUrl(announcement.type, announcement.title, announcement.id));
}

useHead({
  title: `${announcement.title} - SMK Negeri 2 Tabanan`,
  meta: [
    {
      name: "description",
      content: announcement.content.length > 160 ? `${announcement.content.slice(0, 160)}...` : announcement.content,
    },
  ],
});

const articleCreatedDate = formatArticleDate(announcement.created_at);
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-[770px] my-16 px-5 md:px-0">
      <div>
        <!-- Article title -->
        <h2 class="mb-4 text-4xl font-medium text-black dark:text-white">
          {{ announcement.title }}
        </h2>

        <!-- Article date posted -->
        <div class="flex flex-row items-center gap-x-2">
          <CalendarIcon class="w-5 h-5 top-[-1px]"/>
          {{ articleCreatedDate }}
          <p>&#8212;</p>
          <MegaphoneIcon class="w-5 h-5 top-[-1px]"/>
          Pengumuman
        </div>
      </div>

      <div class="mt-10">
        <p class="text-lg leading-8 text-gray-900 dark:text-gray-400">
          {{ announcement.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
