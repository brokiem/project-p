<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import {Permissions, Roles} from "#imports";

function error404() {
  return createError({
    statusCode: 404,
    statusMessage: "Halaman tidak ditemukan",
  });
}

const route = useRoute();
const userUuid = route.params.uuid as string;
const token = useCookie("token");

const {$api, $swal} = useNuxtApp();
const res = await $api.users.getUser(userUuid, token.value!);

if (!res.success) {
  error404();
}

const user = ref<{
  user_uuid: string;
  username: string;
  users: {
    email: string;
  };
  permissions: number;
  roles: number;
}>(res.message.user as any);
const userPassword = ref("");

// Function to convert enum to display name
function enumToDisplayName(enumObject: any) {
  let map: { [key: string]: string } = {};
  for (let key of Object.keys(enumObject)) {
    if (isNaN(Number(key))) {
      let displayName = key.toLowerCase().replace(/_/g, ' ');
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      map[key] = displayName;
    }
  }
  return map;
}

// Function to convert bit value to enum keys
function bitValueToEnumKeys(bitValue: number, enumObject: any) {
  let keys: string[] = [];
  for (let key in enumObject) {
    let bit = Number(key);
    if (!isNaN(bit) && (bitValue & bit) !== 0) {
      keys.push(enumObject[bit]);
    }
  }
  return keys;
}

const permsDisplay = ref(enumToDisplayName(Permissions));
const rolesDisplay = ref(enumToDisplayName(Roles));

const userPerms = ref(bitValueToEnumKeys(user.value.permissions, Permissions));
const userRoles = ref(bitValueToEnumKeys(user.value.roles, Roles));

watch([userPerms, userRoles], () => {
  let perms = 0;
  for (let key of userPerms.value) {
    perms |= Permissions[key as keyof typeof Permissions];
  }
  user.value.permissions = perms;

  let roles = 0;
  for (let key of userRoles.value) {
    roles |= Roles[key as keyof typeof Roles];
  }
  user.value.roles = roles;
});

async function updateUser() {
  // @ts-ignore
  $swal.fire({
    title: "Memperbarui pengguna?",
    text: "Perubahan yang dilakukan tidak dapat dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Perbarui",
    confirmButtonColor: "#2563EB",
    cancelButtonText: "Batal",
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      // @ts-ignore
      $swal.fire({
        title: "Memproses...",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          // @ts-ignore
          $swal.showLoading();
        },
      });

      // @ts-ignore
      const res = await $api.users.updateUser(user.value.user_uuid, user.value.username, user.value.users.email, user.value.permissions, user.value.roles, token.value!, userPassword.value.length > 0 ? userPassword.value : null);

      if (!res.success) {
        // @ts-ignore
        $swal.fire({
          title: "Gagal",
          text: res.error,
          icon: "error",
        });
      } else {
        // @ts-ignore
        $swal.fire({
          title: "Berhasil",
          text: "Pengguna berhasil diperbarui",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  });
}

async function deleteUser() {
  // @ts-ignore
  $swal.fire({
    title: "Menghapus pengguna?",
    text: "Pengguna yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    confirmButtonColor: "#EF4444",
    cancelButtonText: "Batal",
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      // @ts-ignore
      $swal.fire({
        title: "Memproses...",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          // @ts-ignore
          $swal.showLoading();
        },
      });

      // @ts-ignore
      const res = await $api.users.deleteUser(user.value.user_uuid, token.value!);

      if (!res.success) {
        // @ts-ignore
        $swal.fire({
          title: "Gagal",
          text: res.error,
          icon: "error",
        });
      } else {
        // @ts-ignore
        $swal.fire({
          title: "Berhasil",
          text: "Pengguna berhasil dihapus",
          icon: "success",
        }).then(async () => {
          await navigateTo("/admin/pengguna");
        });
      }
    }
  });
}
</script>

<template>
  <Header title="Edit Pengguna"></Header>

  <div class="mt-12 mb-12 container mx-auto max-w-[770px] px-8 lg:px-0">
    <form autocomplete="off" @submit.prevent>
      <!-- Pengguna title input -->
      <label class="mb-2 text-sm text-gray-900" for="user-username">
        Username <span class="text-red-600">*</span>
      </label>
      <input id="user-username" v-model="user.username"
             class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Username"
             required type="text"
             autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" spellcheck="false"/>

      <!-- Pengguna email input -->
      <label class="mb-2 text-sm text-gray-900" for="user-email">
        Email <span class="text-red-600">*</span>
      </label>
      <input id="user-email" v-model="user.users.email"
             class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Email"
             required type="text"
             autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" spellcheck="false"/>

      <!-- Pengguna password input -->
      <label class="mb-2 text-sm text-gray-900" for="user-pass">
        Password (biarkan kosong jika tidak diganti!) <span class="text-red-600">*</span>
      </label>
      <input id="user-pass" v-model="userPassword"
             class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Password"
             required type="password"
             autocapitalize="off" autocomplete="new-password" autocorrect="off" autofocus="" spellcheck="false"/>

      <!-- Pengguna permissions input -->
      <p class="mb-2 text-sm text-gray-900">
        User Permissions <span class="text-red-600">*</span>
      </p>
      <div class="border border-gray-300 p-3 rounded-md">
        <div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(displayName, key) in permsDisplay">
              <input
                  v-model="userPerms"
                  class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
                  type="checkbox"
                  :value="key"
                  :id="'perm-' + displayName"/>
              <label
                  class="inline-block ps-[0.15rem] hover:cursor-pointer select-none"
                  :for="'perm-' + displayName">
                {{ displayName }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Pengguna roles input -->
      <p class="mb-2 text-sm text-gray-900 mt-5">
        User Roles <span class="text-red-600">*</span>
      </p>
      <div class="border border-gray-300 p-3 rounded-md">
        <div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(displayName, key) in rolesDisplay">
              <input
                  v-model="userRoles"
                  class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
                  type="checkbox"
                  :value="key"
                  :id="'role-' + displayName"/>
              <label
                  class="inline-block ps-[0.15rem] hover:cursor-pointer select-none"
                  :for="'role-' + displayName">
                {{ displayName }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- Delete User button -->
    <button
        class="transition duration-150 mt-5 shadow-sm text-white bg-red-600 hover:bg-red-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="deleteUser">
      Hapus Pengguna
    </button>
    <!-- Update User button -->
    <button
        class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="updateUser">
      Perbarui Pengguna
    </button>
  </div>
</template>

<style scoped>

</style>
