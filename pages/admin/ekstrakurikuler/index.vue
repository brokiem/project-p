<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import type {User} from "~/utils/user";
import type {Ref} from "vue";

useHead({
  title: "Kelola Ekstrakurikuler - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});

const extracurriculars: Ref<{ id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; }[]> = ref([]);

async function loadExtracurriculars() {
  const {$api} = useNuxtApp();
  const {message} = await $api.extracurriculars.get();

  extracurriculars.value = message.extracurriculars;
}

try {
  await loadExtracurriculars();
} catch (err) {
  console.error(err);
}
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="py-8 px-4 mx-auto md:max-w-[1250px] lg:py-16 lg:px-6">
        <!-- Section title -->
        <div class="max-w-screen-xl mb-8 lg:mb-10">
          <div class="flex flex-row gap-x-4">
            <h2 class="mb-1.5 text-3xl tracking-tight font-medium text-gray-900 dark:text-white">
              Kelola Ekstrakurikuler
            </h2>
            <!-- Create icon -->
            <NuxtLink to="/admin/ekstrakurikuler/buat" class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-10 h-10 text-white rounded-full text-sm">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span class="sr-only">Create</span>
            </NuxtLink>
          </div>
          <h3 class="mb-3">Menampilkan total {{ extracurriculars.length }} ekstrakurikuler</h3>
        </div>

        <!-- Search input -->

        <!-- News cards -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AdminExtracurricularCard
              v-for="{ id, title, description, extracurricular_mentors } in extracurriculars"

              :id="id"
              :title="title"
              :description="description"
              :mentors="extracurricular_mentors"
          ></AdminExtracurricularCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
