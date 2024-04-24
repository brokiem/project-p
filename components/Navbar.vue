<script setup lang="ts">
import {Bars3Icon, ChevronDownIcon} from "@heroicons/vue/20/solid";

const route = useRoute();
const closeButtonEl = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  closeButtonEl.value = document.getElementById("navbarMainMenuButton") as HTMLButtonElement;
});

watch(() => route.fullPath, () => {
  if (closeButtonEl.value !== null && closeButtonEl.value.ariaExpanded === "true") {
    closeButtonEl.value.click();
  }
});
</script>

<template>
  <!-- First navbar -->
  <nav class="px-2 sm:px-4 pb-2.5 pt-3 gradient-navbar">
    <div class="container flex flex-wrap items-center justify-center mx-auto">
      <NuxtImg preload src="/logo-smk2.png" format="webp" width="50" height="50" alt="Logo SMK"/>
    </div>
    <div class="container flex flex-wrap items-center justify-center mx-auto">
      <h6 class="text-xl font-bold mt-1 text-white">SMK NEGERI 2 TABANAN</h6>
    </div>
  </nav>

  <!-- Second Navbar -->
  <nav id="navbar"
       class="px-4 sm:px-4 dark:bg-gray-900 w-full z-20 sticky top-0 left-0 bg-white shadow-md transition duration-150">
    <div class="container-lg flex flex-wrap items-center justify-between mx-auto">
      <div class="flex items-center"></div>

      <!-- Navbar button for small screen devices -->
      <div class="flex md:order-2">
        <button id="navbarMainMenuButton" data-collapse-toggle="navbar-cta" type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 md:hover:text-blue-700 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-controls="navbar-cta" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="w-5 h-5 inline"/>
        </button>
      </div>

      <!-- Navbar items -->
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <!-- Item list -->
        <ul class="flex flex-col pb-4 md:p-4 mt-3 rounded-md md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NuxtLink to="/"
                      class="no-underline select-none block py-2 pl-3 pr-4 bg-gray-100 rounded md:bg-transparent md:hover:text-blue-700 text-gray-700 md:p-0 dark:text-white"
                      aria-current="page">
              Beranda
            </NuxtLink>
          </li>
          <li>
            <div data-dropdown-toggle="profile-dropdown"
                 class="cursor-pointer select-none block py-2 pl-3 pr-4 bg-gray-100 md:bg-transparent text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Profil
              <ChevronDownIcon class="w-5 h-5 inline"/>

              <!-- Profile dropdown -->
              <div id="profile-dropdown"
                   class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow border dark:bg-gray-700">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                  <li>
                    <NuxtLink to="/profil/sejarah"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sejarah Sekolah
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/profil/visi-misi"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Visi &amp; Misi
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/profil/fasilitas"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Fasilitas Sekolah
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/profil/logo"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Logo Sekolah
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/profil/struktur-organisasi"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Struktur Organisasi
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div data-dropdown-toggle="artikel-dropdown"
                 class="cursor-pointer select-none block py-2 pl-3 pr-4 bg-gray-100 md:bg-transparent text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Artikel
              <ChevronDownIcon class="w-5 h-5 inline"/>

              <!-- Article dropdown -->
              <div id="artikel-dropdown"
                   class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow border dark:bg-gray-700">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                  <li>
                    <NuxtLink to="/artikel/pengumuman"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Pengumuman
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/artikel/berita"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Berita
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <NuxtLink to="/#kompetensi-keahlian"
                      class="no-underline select-none block py-2 pl-3 pr-4 text-gray-700 bg-gray-100 md:bg-transparent rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Kompetensi Keahlian
            </NuxtLink>
          </li>
          <li>
            <div data-dropdown-toggle="kesiswaan-dropdown"
                 class="cursor-pointer select-none block py-2 pl-3 pr-4 bg-gray-100 md:bg-transparent text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Kesiswaan
              <ChevronDownIcon class="w-5 h-5 inline"/>

              <!-- Kesiswaan dropdown -->
              <div id="kesiswaan-dropdown"
                   class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow border dark:bg-gray-700">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                  <li>
                    <NuxtLink to="/kesiswaan/tatatertib"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Tata Tertib
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/kesiswaan/ekstrakurikuler"
                              class="no-underline text-gray-700 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Ekstrakurikuler
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!-- TODO: Check if user has permissions to do administrator things -->
          <li v-if="useCurrentUser().value !== null">
            <NuxtLink to="/admin"
                      class="no-underline select-none block py-2 pl-3 pr-4 text-gray-700 bg-gray-100 md:bg-transparent rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Admin
            </NuxtLink>
          </li>
          <li v-if="useCurrentUser().value == null">
            <NuxtLink to="/login"
                      class="no-underline select-none block py-2 pl-3 pr-4 text-gray-700 bg-gray-100 md:bg-transparent rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Login
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.gradient-navbar {
  background: rgb(29, 78, 216);
  background: -moz-linear-gradient(166deg, rgba(29, 78, 216, 1) 27%, rgb(69, 197, 252) 100%);
  background: -webkit-linear-gradient(166deg, rgba(29, 78, 216, 1) 27%, rgb(69, 182, 252) 100%);
  background: linear-gradient(166deg, rgba(29, 78, 216, 1) 27%, rgb(69, 182, 252) 100%);
  background-size: 180% 180%;
  animation: gradient 5s ease infinite;
}
</style>
