<script lang="ts" setup>
import {CalendarIcon, MegaphoneIcon} from "@heroicons/vue/20/solid";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

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
const isArticleLoaded = ref(false);

// Check if article exists
if (!announcement) {
  // Return nuxt 404 page
  throw error404();
}

// Change url to include article title
const encodedArticleTitle = encodeArticleTitle(announcement.title);
if (article !== encodedArticleTitle) {
  await navigateTo(formatArticleUrl(announcement.type, announcement.title, announcement.id));
}

useHead({
  title: `${announcement.title} - SMK Negeri 2 Tabanan`,
  meta: [
    {
      name: "description",
      content: announcement.summary,
    },
  ],
});

onMounted(async () => {
  // Only import these modules on client side
  if (process.client) {
    await import('quill-image-uploader/dist/quill.imageUploader.min.css');

    const Quill = (await import("quill")).default;
    // @ts-ignore
    const BlotFormatter = (await import('quill-blot-formatter-mobile/dist/BlotFormatter')).default;
    const Delta = Quill.import('delta');

    Quill.register('modules/blotFormatter', BlotFormatter);

    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: false,
        blotFormatter: {},
      }
    });
    quill.setContents(new Delta(announcement.content));

    isArticleLoaded.value = true;
  }
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

      <div class="mt-8">
        <div v-if="!isArticleLoaded" class="pt-1">
          <div class="space-y-4">
            <div class="animate-shine animate-shine h-4 bg-gray-300 rounded w-2/3"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded w-1/2"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded w-3/4"></div>
          </div>

          <div class="space-y-4 mt-12">
            <div class="animate-shine h-4 bg-gray-300 rounded w-2/3"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded w-1/2"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
          </div>

          <div class="space-y-4 mt-12">
            <div class="animate-shine h-4 bg-gray-300 rounded w-2/3"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded"></div>
            <div class="animate-shine h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <p class="text-lg leading-8 text-gray-900 dark:text-gray-400">
          <ClientOnly>
            <div
                id="editor"
                class="!rounded-b-md !border-none"
            />
          </ClientOnly>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.ql-editor {
  padding: 0 !important;
  border: 0 !important;
}
</style>
