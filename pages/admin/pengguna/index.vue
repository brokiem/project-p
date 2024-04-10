<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import type {User} from "~/utils/user";

useHead({
  title: "Kelola Pengguna - SMK Negeri 2 Tabanan",
  meta: [
    {
      name: "description",
      content: "Terwujudnya peserta didik yang terdidik, cerdas, terampil, mandiri dan berdaya saing global",
    },
  ],
});

const {$api} = useNuxtApp();
const token = useCookie("token");

const searchInput = ref("");
const users = ref<User[]>([]);

async function searchUser() {
  const {message} = await $api.users.searchUsers(searchInput.value!, token.value!);
  users.value = message.users;
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
              Kelola Pengguna
            </h2>
            <!-- Create icon -->
            <NuxtLink to="/admin/pengguna/buat" class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-10 h-10 text-white rounded-full text-sm">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span class="sr-only">Create</span>
            </NuxtLink>
          </div>
        </div>

        <div>
          <!-- Search input -->
          <div class="mb-4">
            <p class="mb-1">Silahkan cari nama pengguna untuk memulai.</p>
            <form @submit.prevent="searchUser">
              <input v-model="searchInput" class="border-2 border-gray-300 bg-white h-10 px-3 w-80 rounded-md text-sm focus:outline-none"
                     type="search" name="search" placeholder="Cari pengguna" required>
            </form>

            <!-- Users list -->
            <div class="mt-7">
              <ul>
                <li v-for="user in users" :key="user.user_uuid" class="mb-2">
                  <div class="flex justify-between items-center border px-3 py-2 rounded-md">
                    <div>
                      <p class="font-medium">{{ user.username }}</p>
                      <p>{{ user.users.email }}</p>
                    </div>
                    <NuxtLink :to="`/admin/pengguna/${user.user_uuid}/edit`" class="transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </NuxtLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
