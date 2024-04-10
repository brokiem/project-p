<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

function error404() {
  return createError({
    statusCode: 404,
    statusMessage: "Halaman tidak ditemukan",
  });
}

const route = useRoute();
const userUuid = route.params.uuid as string;
const token = useCookie("token");

const {$api} = useNuxtApp();
const res = await $api.users.getUser(userUuid, token.value!);

if (!res.success) {
  error404();
}

const user = ref(res.message.user);
const userPassword = ref("");
</script>

<template>
  <Header title="Edit Pengguna"></Header>

  <div class="mt-12 mb-12 container mx-auto max-w-[770px] px-8 lg:px-0">
    <!-- Pengguna title input -->
    <label class="mb-2 text-sm text-gray-900" for="user-username">
      Username <span class="text-red-600">*</span>
    </label>
    <input id="user-username" v-model="user.username"
           class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Username"
           required type="text"
           autocomplete="off"/>

    <!-- Pengguna email input -->
    <label class="mb-2 text-sm text-gray-900" for="user-email">
      Email <span class="text-red-600">*</span>
    </label>
    <input id="user-email" v-model="user.users.email"
           class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Email"
           required type="text"
           autocomplete="off"/>

    <!-- Pengguna password input -->
    <label class="mb-2 text-sm text-gray-900" for="user-pass">
      Password (biarkan kosong jika tidak diganti!) <span class="text-red-600">*</span>
    </label>
    <input id="user-pass" v-model="userPassword"
           class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Password"
           required type="password"
           autocomplete="off"/>

    <!-- Pengguna permissions input -->
    <label class="mb-2 text-sm text-gray-900" for="user-perms">
      Permissions <span class="text-red-600">*</span>
    </label>

    <!-- Pengguna roles input -->
    <label class="mb-2 text-sm text-gray-900" for="user-roles">
      Roles <span class="text-red-600">*</span>
    </label>

    <!-- Delete User button -->
    <button
        class="transition duration-150 mt-5 shadow-sm text-white bg-red-600 hover:bg-red-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="">
      Hapus Pengguna
    </button>
    <!-- Update User button -->
    <button
        class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="">
      Perbarui Pengguna
    </button>
  </div>
</template>

<style scoped>

</style>
