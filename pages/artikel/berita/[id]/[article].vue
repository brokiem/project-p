<script lang="ts" setup>
import {CalendarIcon, NewspaperIcon} from "@heroicons/vue/20/solid";

let BlotFormatter: any;
let Delta: any;

// Only import these modules on client side
if (process.client) {
  import('quill-blot-formatter').then(module => {
    BlotFormatter = module.default;
  });

  import('quill-delta').then(module => {
    Delta = module.default;
  });

  import('quill-image-uploader/dist/quill.imageUploader.min.css');
}

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
const {message: articleResponse} = await $api.articles.getNewsById(articleId, token.value!);
const news = articleResponse.news;

// Check if article exists
if (!news) {
  // Return nuxt 404 page
  throw error404();
}

// Change url to include article title
const router = useRouter();
const encodedArticleTitle = encodeArticleTitle(news.title);
if (article !== encodedArticleTitle) {
  router.replace(formatArticleUrl(news.type, news.title, news.id));
}

useHead({
  title: `${news.title} - SMK Negeri 2 Tabanan`,
  meta: [
    {
      name: "description",
      content: news.summary,
    },
  ],
});

const modules = [
  {
    name: 'blotFormatter',
    module: BlotFormatter,
    options: {}
  },
];

const articleCreatedDate = formatArticleDate(news.created_at);
const editorContentDelta = ref(null);

function editorReady() {
  console.log("Editor ready!");

  const toolbar = document.querySelector(".ql-toolbar");
  if (toolbar) {
    toolbar.remove();
  }

  // @ts-ignore
  editorContentDelta.value = new Delta(news.content);
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-[770px] my-16 px-5 md:px-0">
      <div>
        <!-- Article title -->
        <h2 class="mb-4 text-4xl font-medium text-black dark:text-white">
          {{ news.title }}
        </h2>

        <!-- Article date posted -->
        <div class="flex flex-row items-center gap-x-2">
          <CalendarIcon class="w-5 h-5 top-[-1px]"/>
          {{ articleCreatedDate }}
          <p>&#8212;</p>
          <NewspaperIcon class="w-5 h-5 top-[-1px]"/>
          Berita
        </div>
      </div>

      <div class="mt-8">
        <p class="text-lg leading-8 text-gray-900 dark:text-gray-400">
          <ClientOnly>
            <quill-editor
                v-model:content="editorContentDelta"
                :modules="modules"
                class="!rounded-b-md !border-none"
                content-type="delta"
                theme="snow"
                :toolbar="[]"
                @ready="editorReady"
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
