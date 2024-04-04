<script lang="ts">
import {ArticleFlags, ArticleType} from "~/utils/articles";
import {ArchiveBoxIcon, CalendarIcon} from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "AdminArticleCard",
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
    const editArticleUrl = formatArticleEditUrl(props.articleType as ArticleType, props.id!);
    const {$api, $swal} = useNuxtApp();

    return {createdDate, isDraft, articleUrl, editArticleUrl, $api, $swal};
  },
  methods: {
    deleteArticle() {
      // @ts-ignore
      this.$swal.fire({
        title: "Hapus artikel?",
        text: "Artikel yang dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#EF4444",
        cancelButtonText: "Batal",
      }).then(async (result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          // @ts-ignore
          this.$swal.fire({
            title: "Menghapus artikel...",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
              // @ts-ignore
              this.$swal.showLoading();
            },
          });

          const token = useCookie("token");
          let message;

          if (this.articleType === ArticleType.ANNOUNCEMENT) {
            message = await this.$api.articles.deleteAnnouncement(this.id!, token.value!);
          } else {
            message = await this.$api.articles.deleteNews(this.id!, token.value!);
          }

          const {success, error} = message;

          if (success) {
            // @ts-ignore
            this.$swal.fire({
              title: "Berhasil",
              text: "Artikel berhasil dihapus.",
              icon: "success",
              confirmButtonText: "Tutup",
              confirmButtonColor: "#3B82F6",
            });
          } else {
            // @ts-ignore
            this.$swal.fire({
              title: "Gagal",
              text: error,
              icon: "error",
              confirmButtonText: "Tutup",
              confirmButtonColor: "#EF4444",
            });
          }
        }
      })
    }
  }
});
</script>

<template>
  <div class="flex flex-col mx-auto w-full md:max-w-3xl text-gray-900 bg-white rounded-md border border-gray-200 shadow transition duration-200">
    <!-- Card article image -->
    <div class="relative">
      <NuxtImg :src="imageUrl" alt="Article cover image" class="rounded-t-md h-[189px] w-full object-cover"/>
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
        {{ title.length > titlePreviewMaxLength ? title.substring(0, titlePreviewMaxLength) + "..." : title }} {{ id }}
      </h3>
      <!-- Card article description with limit of 135 chars -->
      <p class="font-normal text-gray-500 text-md overflow-hidden">
        {{ summary }}
      </p>
    </div>

    <!-- Card article buttons -->
    <div class="flex flex-row gap-x-2 px-4 pb-4 pt-2 mt-auto w-full">
      <NuxtLink :to="articleUrl" class="grow">
        <button class="w-full text-white bg-blue-600 hover:bg-blue-800 font-normal rounded-md text-normal px-4 py-1.5 text-center transition duration-200" type="button">
          Baca
        </button>
      </NuxtLink>
      <NuxtLink :to="editArticleUrl">
        <button class="text-white bg-yellow-600 hover:bg-yellow-800 font-normal rounded-md text-normal px-4 py-1.5 text-center transition duration-200" type="button">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </NuxtLink>
      <!-- Delete Article button -->
      <button @click="deleteArticle" class="text-white bg-red-600 hover:bg-red-800 font-normal rounded-md text-normal px-4 py-1.5 text-center transition duration-200" type="button">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              stroke-linecap="round"
              stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
