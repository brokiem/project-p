<script lang="ts">
import ArticleCardSkeleton from "~/components/skeletons/ArticleCardSkeleton.vue";

export default defineComponent({
  name: "ArticlesContainer",
  components: {ArticleCardSkeleton},
  props: {
    displayNews: {
      type: Boolean,
      default: false,
    },
    newsStartingIndex: {
      type: Number,
      default: 0,
    },
    numberOfNewsToDisplay: {
      type: Number,
      default: 3,
    },
    displayAnnouncements: {
      type: Boolean,
      default: false,
    },
    announcementsStartingIndex: {
      type: Number,
      default: 0,
    },
    numberOfAnnouncementsToDisplay: {
      type: Number,
      default: 3
    },
  },
  data() {
    return {
      isLoading: true,
      announcements: [],
      news: [],
    }
  },
  methods: {
    async loadAnnouncements() {
      const {$api} = useNuxtApp();
      const token = useCookie("token");
      return $api.articles.getAnnouncements(this.announcementsStartingIndex, this.numberOfAnnouncementsToDisplay, token.value!);
    },
    async loadNews() {
      const {$api} = useNuxtApp();
      const token = useCookie("token");
      return $api.articles.getNews(this.newsStartingIndex, this.numberOfNewsToDisplay, token.value!);
    },
  },
  async created() {
    const loadArticlePromises = [];

    if (this.displayAnnouncements && this.numberOfAnnouncementsToDisplay > 0) {
      loadArticlePromises.push(this.loadAnnouncements());
    }

    if (this.displayNews && this.numberOfNewsToDisplay > 0) {
      loadArticlePromises.push(this.loadNews());
    }

    try {
      // Load articles in parallel
      const results = await Promise.all(loadArticlePromises);

      if (results.length === 1) {
        if (this.displayAnnouncements && this.numberOfAnnouncementsToDisplay > 0) {
          // @ts-ignore
          this.announcements = results[0].message.announcements;
        } else if (this.displayNews && this.numberOfNewsToDisplay > 0) {
          // @ts-ignore
          this.news = results[0].message.news;
        }
      } else if (results.length === 2) {
        // @ts-ignore
        this.announcements = results[0].message.announcements;
        // @ts-ignore
        this.news = results[1].message.news;
      }

      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  },
})
</script>

<template>
  <div>
    <!-- No articles found -->
    <div v-if="!isLoading && !announcements.length && !news.length" class="mt-16 text-lg text-center text-gray-700 dark:text-gray-200">
      Tidak ada artikel yang cocok dengan pencarian Anda.
    </div>

    <div class="space-y-3 lg:grid lg:grid-cols-3 sm:gap-4 lg:gap-3 lg:space-y-0">
      <ArticleCardSkeleton v-for="i in numberOfAnnouncementsToDisplay" v-if="displayAnnouncements && isLoading" :key="i"/>
      <ArticleCardSkeleton v-for="i in numberOfNewsToDisplay" v-if="displayNews && isLoading" :key="i"/>

      <!-- Announcements -->
      <ArticleCard
          v-for="article in announcements"
          v-if="displayAnnouncements && !isLoading"

          :id="article.id"
          :key="article.id"
          :article-type="article.type"
          :author-uuid="article.author_uuid"
          :summary="article.summary"
          :content="article.content"
          :created-at="article.created_at"
          :flags="article.flags"
          :image-url="article.image_url"
          :title="article.title"
          :updated-at="article.updated_at"
      />

      <!-- News -->
      <ArticleCard
          v-for="article in news"
          v-if="displayNews && !isLoading"

          :id="article.id"
          :key="article.id"
          :article-type="article.type"
          :author-uuid="article.author_uuid"
          :summary="article.summary"
          :content="article.content"
          :created-at="article.created_at"
          :flags="article.flags"
          :image-url="article.image_url"
          :title="article.title"
          :updated-at="article.updated_at"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
