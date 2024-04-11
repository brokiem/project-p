<script setup lang="ts">
useHead({
  title: "Profil - SMK Negeri 2 Tabanan",
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
    <Header title="Visi &amp; Misi"></Header>

    <div class="container mx-auto px-4 md:max-w-default py-10 space-y-4">
      <div
          class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <!-- Visi -->
        <h5 class="mb-2 text-xl font-medium tracking-tight text-black dark:text-white">
          Visi
        </h5>
        <!-- Visi contents -->
        <p class="mt-1 text-base font-normal text-gray-700 dark:text-gray-400">
          Terwujudnya Peserta Didik Yang Terdidik, Cerdas, Terampil, Mandiri dan Berdaya Saing Global
        </p>
      </div>

      <div
          class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <!-- Misi -->
        <h5 class="mb-2 text-xl font-medium tracking-tight text-black dark:text-white">
          Misi
        </h5>
        <!-- Misi contents -->
        <div class="pl-5">
          <div class="mt-1 text-base font-normal text-gray-700 dark:text-gray-400">
            <ol class="list-disc list-outside text-justify hover:list-decimal">
              <li>Menanamkan keimanan dan ketakwaan melalui pengamalan ajaran agama</li>
              <li>Melaksanakan pendidikan melalui proses pembelajaran, pelatihan dan bimbingan yang maksimal</li>
              <li>Mengembangkan bidang ilmu pengetahuan, teknologi, keterampilan hidup berdasarkan minat, bakat dan
                potensi peserta didik
              </li>
              <li>Membina kemandirian peserta didik melalui kegiatan pembiasan, kewirausahaan dan pengembangan diri yang
                terencana serta berkesinambungan
              </li>
              <li>Menjalin kerjasama yang harmonis antar warga sekolah, lingkungan dan lembaga lain yang terkait, baik
                nasional maupun internasional
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
