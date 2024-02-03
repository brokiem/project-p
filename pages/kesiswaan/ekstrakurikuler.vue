<script setup lang="ts">
import EkstrakulikulerCard from "~/components/EkstrakurikulerCard.vue";
import ekstrakurikuler from "~/assets/ekstrakulikuler.json";

useHead({
  title: "Kesiswaan - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});
</script>

<template>
  <div>
    <!-- Page title -->
    <Header title="Ekstrakurikuler"></Header>

    <div class="container mx-auto py-10">
      <div class="px-4 mx-auto md:max-w-screen-xl lg:px-6">
        <div class="space-y-3 lg:grid lg:grid-cols-3 gap-4 lg:gap-5 lg:space-y-0">
          <EkstrakulikulerCard
              v-for="{ title, description, pembimbing } in ekstrakurikuler"

              :title="title"
              :description="description"
              :pembimbing="pembimbing"
          ></EkstrakulikulerCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
