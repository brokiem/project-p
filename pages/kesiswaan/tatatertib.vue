<script setup lang="ts">
import { ArrowDownTrayIcon } from '@heroicons/vue/20/solid';

useHead({
  title: 'Kesiswaan - SMK Negeri 2 Tabanan',
  meta: [
    { name: 'description', content: 'Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global' }
  ],
});
</script>

<template>
  <div>
    <!-- Page title -->
    <Header title="Tata Tertib"></Header>

    <div class="container mx-auto px-4 md:max-w-default py-10">
      <div class="flex justify-center">
        <div class="block w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6">
            <p class="text-base font-normal text-gray-700 dark:text-gray-400">
              Tata tertib sekolah adalah aturan-aturan yang harus atau wajib ditaati di sekolah agar proses kegiatan belajar mengajar dapat berlangsung dengan baik. Tata tertib bertujuan untuk membantu siswa siswi memperoleh prestasi belajar yang maksimal.
              <br><br>
              Dalam tata tertib ada hal-hal yang wajib dikerjakan dan dilarang dalam lingkungan sekolah. Setiap pelanggar akan dikenakan sanksi, entah itu berupa hukuman lisan ataupun lainnya. Bukan hanya untuk siswa, di lingkungan sekolah tata tertib berlaku juga untuk kepala sekolah, guru atau perangkat sekolah lainnya.
              <br><br>
              Tata Tertib siswa SMK Negeri 2 Tabanan dapat diunduh pada link atau tombol berikut:
            </p>

            <div class="pt-3"></div>

            <a href="https://drive.google.com/file/d/1stDf4czNttoryUewpwreQOsUQ2Y1CbrL/view?usp=sharing">
              <button type="button" class="shadow font-base transition duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <ArrowDownTrayIcon class="mr-1 top-[-1px] inline w-5 h-5" />
                Untuh Dokumen
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
