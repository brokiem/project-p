<script lang="ts">
import {ArticleFlags, ArticleType} from "~/utils/articles";
import {ArchiveBoxIcon, CalendarIcon} from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "ArticleCard",
  components: {CalendarIcon, ArchiveBoxIcon},
  props: {
    id: Number,
    imageUrl: String,
    title: String,
    summary: String,
    content: Object,
    authorUuid: String,
    createdAt: String,
    updatedAt: String,
    articleType: String,
    flags: Number,
  },
  data() {
    return {
      titlePreviewMaxLength: 55,
      contentPreviewMaxLength: 135
    }
  },
  setup(props) {
    const createdDate = formatArticleDate(props.createdAt!);
    const isDraft = hasFlag(props.flags!, ArticleFlags.IS_DRAFT);
    const articleUrl = formatArticleUrl(props.articleType as ArticleType, props.title!, props.id!);

    return {createdDate, isDraft, articleUrl}
  },
})
</script>

<template>
  <div class="flex flex-col mx-auto w-full md:max-w-3xl text-gray-900 bg-white rounded-md border border-gray-200 shadow transition duration-200">
    <!-- Card article image -->
    <div class="relative">
      <NuxtImg class="rounded-t-md h-[189px] w-full object-cover" :src="imageUrl" alt="Article cover image"/>
      <!-- Card article date -->
      <span class="absolute top-2 right-2 bg-blue-50 text-blue-900 text-sm font-medium px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
        <CalendarIcon class="w-5 h-5 inline top-[-2px]"/> {{ createdDate }}
      </span>
      <!-- Card draft info -->
      <span v-if="isDraft" class="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-sm font-medium px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
        <ArchiveBoxIcon class="w-5 h-5 inline top-[-2px]"/> Draft
      </span>
    </div>
    <!-- Card contents -->
    <div class="px-4 pt-3 pb-2">
      <!-- Card article title -->
      <h3 class="mb-2 text-xl font-normal tracking-tight text-gray-800">
        {{ title.length > titlePreviewMaxLength ? title.substring(0, titlePreviewMaxLength) + "..." : title }}
      </h3>
      <!-- Card article description with limit of 135 chars -->
      <p class="font-normal text-gray-500 text-md overflow-hidden">
        {{ summary }}
      </p>
    </div>

    <!-- Card article buttons -->
    <div class="px-4 pb-4 pt-2 mt-auto">
      <NuxtLink v-if="!isDraft" :to="articleUrl">
        <button type="button" class="w-full text-white bg-blue-600 hover:bg-blue-800 font-normal rounded-md text-normal px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:ring-blue-800 transition duration-200">
          Baca Selengkapnya
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
