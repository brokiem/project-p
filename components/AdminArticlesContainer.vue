<script lang="ts">
import ArticleCardSkeleton from "~/components/skeletons/ArticleCardSkeleton.vue";

export default defineComponent({
  name: "AdminArticlesContainer",
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
    searchValue: {
      type: String,
      default: null,
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
    async searchAnnouncements(query: string) {
      const {$api} = useNuxtApp();
      const token = useCookie("token");
      const {message} = await $api.articles.searchAnnouncements(query, token.value!);
      const {announcements} = message;

      // @ts-ignore
      this.announcements = announcements;
    },
    async searchNews(query: string) {
      const {$api} = useNuxtApp();
      const token = useCookie("token");
      const {message} = await $api.articles.searchNews(query, token.value!);
      const {news} = message;

      // @ts-ignore
      this.news = news;
    },
  },
  async created() {
    const loadArticlePromises = [];

    if (this.displayAnnouncements && this.numberOfAnnouncementsToDisplay > 0) {
      if (!!this.searchValue) {
        loadArticlePromises.push(this.searchAnnouncements(this.searchValue));
      } else {
        loadArticlePromises.push(this.loadAnnouncements());
      }
    }

    if (this.displayNews && this.numberOfNewsToDisplay > 0) {
      if (!!this.searchValue) {
        loadArticlePromises.push(this.searchNews(this.searchValue));
      } else {
        loadArticlePromises.push(this.loadNews());
      }
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
  watch: {
    searchValue(newSearch) {
      this.isLoading = true;

      const loadArticlePromises = [];

      if (this.displayAnnouncements && this.numberOfAnnouncementsToDisplay > 0) {
        if (!!this.searchValue) {
          loadArticlePromises.push(this.searchAnnouncements(newSearch));
        }
      }

      if (this.displayNews && this.numberOfNewsToDisplay > 0) {
        if (!!this.searchValue) {
          loadArticlePromises.push(this.searchNews(newSearch));
        }
      }

      // Load articles in pararell
      Promise.all(loadArticlePromises).then(() => {
        this.isLoading = false;
      }).catch((e) => {
        console.log(e);
      });
    },
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
      <AdminArticleCard
          v-for="article in announcements"
          v-if="displayAnnouncements && !isLoading"

          :id="article.id"
          :key="article.id"
          :article-type="article.type"
          :author-uuid="article.author_uuid"
          :content="article.content"
          :created-at="article.created_at"
          :flags="article.flags"
          :image-url="article.image_url"
          :summary="article.summary"
          :title="article.title"
          :updated-at="article.updated_at"
      />

      <!-- News -->
      <AdminArticleCard
          v-for="article in news"
          v-if="displayNews && !isLoading"

          :id="article.id"
          :key="article.id"
          :article-type="article.type"
          :author-uuid="article.author_uuid"
          :content="article.content"
          :created-at="article.created_at"
          :flags="article.flags"
          :image-url="article.image_url"
          :summary="article.summary"
          :title="article.title"
          :updated-at="article.updated_at"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
