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
      <NuxtPicture :imgAttrs="{class:'rounded-t-md h-[189px] w-full object-cover z-10'}" format="webp" height="189" densities="x1 x2" loading="lazy" :src="imageUrl" alt="Article cover image"/>
      <!-- Card image placeholder -->
      <!-- Card image skeleton -->
      <div class="absolute top-0 left-0 rounded-t-md flex justify-center items-center w-full h-[189px] object-cover bg-gray-300 dark:bg-gray-700">
        <svg class="w-12 h-12 text-gray-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
          <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
        </svg>
      </div>
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
