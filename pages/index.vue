<script setup lang="ts">
useHead({
  title: "SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});

const { competencies } = await fetchCompetencies();
</script>

<template>
  <div>
    <!-- Header section -->
    <div class="relative">
      <!-- Front page image header -->
      <NuxtImg class="w-full h-[99vh] object-cover" src="/atas-blur-min.webp" alt="Atas SMK DUTA"/>

      <!-- Card header -->
      <div
          class="p-6 pt-10 pb-10 w-[95%] md:max-w-lg min-h-[250px] md:min-h-[230px] mx-auto bg-white rounded-md shadow-sm flex items-center space-x-4 absolute right-2 md:right-[8rem] top-[8rem] md:top-[12rem]">
        <div>
          <h2 class="text-3xl font-normal text-black pb-5">SMK Negeri 2 Tabanan</h2>
          <p class="text-slate-500">Terwujudnya Peserta Didik Yang Terdidik, Cerdas, Terampil, Mandiri dan Berdaya Saing
            Global</p>

          <div class="my-6"></div>

          <a href="https://www.smkn2tabanan.sch.id/ppdb">
            <button type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 font-normal rounded-md text-normal px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:ring-blue-800 transition duration-200">
              INFO PPDB
            </button>
          </a>
        </div>
      </div>
    </div>

    <!-- Kompetensi Keahlian section -->
    <div class="relative">
      <!-- Fake section to compensate section with navbar -->
      <section id="kompetensi-keahlian" class="absolute bottom-12"/>
    </div>
    <!-- Real section -->
    <div class="bg-white dark:bg-gray-900" style="background-color: #F8F9FC;">
      <div class="container mx-auto">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <!-- Section title -->
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-3xl tracking-tight font-medium text-gray-900 dark:text-white">Kompetensi Keahlian</h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">SMKN 2 Tabanan memiliki {{ competencies.length }} Kompetensi
              Keahlian yang tersedia, antara lain</p>
          </div>

          <!-- Kompetensi grid -->
          <div class="space-y-3 lg:grid lg:grid-cols-4 sm:gap-4 lg:gap-3 lg:space-y-0">
            <div
                v-for="competency in competencies"
                class="flex flex-col p-4 mx-auto md:max-w-3xl text-center text-gray-900 bg-white rounded-md border border-gray-200 shadow md:pt-8 transition duration-200">
              <h3 class="mb-4 text-2xl font-normal tracking-tight">{{ competency.title }}</h3>
              <p class="font-light text-gray-500 sm:text-lg text-justify">{{ competency.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
