<script setup lang="ts">
import { fetchExtracurriculars } from "~/utils/api-wrapper";

useHead({
  title: "Kesiswaan - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});

const { extracurriculars } = await fetchExtracurriculars();
</script>

<template>
  <div>
    <!-- Page title -->
    <Header title="Ekstrakurikuler"></Header>

    <div class="container mx-auto py-10">
      <div class="px-4 mx-auto md:max-w-screen-xl lg:px-6">
        <div class="space-y-3 lg:grid lg:grid-cols-3 gap-4 lg:gap-5 lg:space-y-0">
          <ExtracurricularCard
              v-for="{ title, description, extracurricular_mentors } in extracurriculars"

              :title="title"
              :description="description"
              :mentors="extracurricular_mentors"
          ></ExtracurricularCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
