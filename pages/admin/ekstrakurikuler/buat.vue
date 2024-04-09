<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import type {User} from "~/utils/user";
import type {Ref} from "vue";
import {initFlowbite} from "flowbite";

onMounted(() => {
  initFlowbite();
});

const token = useCookie("token");

// @ts-ignore
const extracurricular: Ref<{ title: string; description: string; }> = ref([]);

async function loadExtracurriculars() {
  extracurricular.value.title = "";
  extracurricular.value.description = "";
}

let allUsers: Ref<User[]> = ref([]);
let allUsersFiltered: Ref<User[]> = ref([]);
let selectedMentors: Ref<User[]> = ref([]);

// Watch allUsers and update allUsersFiltered
watch(allUsers, () => {
  allUsersFiltered.value = allUsers.value;
});

async function loadAllUsers() {
  const {$api} = useNuxtApp();
  const {message} = await $api.users.getUsers(token.value!);

  allUsers.value = message.users;
}

try {
  await loadExtracurriculars();
  await loadAllUsers();
} catch (err) {
  console.error(err);
}

function addMentor(mentorUuid: string) {
  const mentor = allUsers.value.find((user) => user.user_uuid === mentorUuid);
  if (mentor) {
    selectedMentors.value.push(mentor);
  }
}

function removeMentor(mentorUuid: string) {
  selectedMentors.value = selectedMentors.value.filter((mentor) => mentor.user_uuid !== mentorUuid);
}

let searchMentor: Ref<string> = ref("");
// Watch searchMentor and update allUsersFiltered based on the search term
watch(searchMentor, (newSearchTerm) => {
  allUsersFiltered.value = allUsers.value.filter((user) =>
      user.username.toLowerCase().includes(newSearchTerm.toLowerCase())
  );
});

function isDataValid() {
  return extracurricular.value.title.length > 0 && extracurricular.value.description.length > 0 && selectedMentors.value.length > 0;
}

async function editExtracurricular() {
  const {$api, $swal} = useNuxtApp();

  if (!isDataValid()) {
    // @ts-ignore
    $swal.fire({
      title: "Gagal!",
      text: "Pastikan semua kolom terisi",
      icon: "error",
      confirmButtonText: "Tutup",
    });
    return;
  }

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

  let selectedMentorsUuids: string = selectedMentors.value.map(mentor => mentor.user_uuid).join(',');
  const {message} = await $api.extracurriculars.add(extracurricular.value.title, extracurricular.value.description, selectedMentorsUuids, token.value!);

  if (message) {
    // @ts-ignore
    $swal.fire({
      title: "Success!",
      text: "Ekstrakurikuler berhasil dibuat",
      icon: "success",
      confirmButtonText: "Tutup",
    });
  } else {
    // @ts-ignore
    $swal.fire({
      title: "Failed!",
      text: "Gagal membuat ekstrakurikuler",
      icon: "error",
      confirmButtonText: "Tutup",
    });
  }
}
</script>

<template>
  <Header title="Buat Ekstrakurikuler"></Header>

  <div class="mt-12 mb-12 container mx-auto max-w-[770px] px-8 lg:px-0">
    <!-- Ekstrakurikuler title input -->
    <label class="mb-2 text-sm text-gray-900" for="ekstrakurikuler-title">
      Judul Ekstrakurikuler <span class="text-red-600">*</span>
    </label>
    <input id="ekstrakurikuler-title" v-model="extracurricular.title"
           class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Judul"
           required type="text"
           maxlength="60"
    >

    <!-- Ekstrakurikuler description input -->
    <label class="mb-2 text-sm text-gray-900" for="ekstrakurikuler-description">
      Deskripsi Ekstrakurikuler <span class="text-red-600">*</span>
    </label>
    <textarea id="ekstrakurikuler-description" v-model="extracurricular.description"
              class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deskripsi"
              required type="text"
    />

    <div>
      <!-- All available users -->
      <span class="mb-2 text-sm text-gray-900">
        Pembimbing Ekstrakurikuler <span class="text-red-600">*</span>
      </span>
      <div class="flex flex-wrap gap-2 border border-gray-300 p-1 rounded-md min-h-[42.5px]">
        <div v-for="mentor in selectedMentors" :key="mentor.user_uuid" class="flex items-center justify-between py-1 px-4 border rounded-lg dark:border-gray-600">
          <div>
            <p class="text-gray-900 dark:text-white overflow-ellipsis overflow-hidden max-w-[200px]">{{ mentor.username }}</p>
          </div>
        </div>
      </div>
      <button data-modal-target="add-mentor-modal" data-modal-toggle="add-mentor-modal"
              class="transition duration-150 mt-2 text-gray-900 border-gray-300 bg-white hover:bg-gray-200 border focus:ring-2 focus:ring-gray-600 font-medium rounded-md text-sm px-5 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button">
        Pilih Guru Pembimbing
      </button>
    </div>

    <!-- Update Ekstrakurikuler button -->
    <button
        class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="editExtracurricular">
      Buat Ekstrakurikuler
    </button>
  </div>

  <!-- Modals -->
  <div id="add-mentor-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-5xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Tambah Guru Pembimbing
            </h3>

            <div class="relative mt-2">
              <input type="text" v-model="searchMentor" class="w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Cari guru pembimbing"/>
              <div class="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-gray-400 bg-transparent  rounded-lg text-sm">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2M10 18c-5 0-9-4-9-9s4-9 9-9s9 4 9 9s-4 9-9 9z"/>
                </svg>
                <span class="sr-only">Search</span>
              </div>
            </div>
          </div>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-mentor-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-15rem)]">
          <!-- List of mentors card with button to add or remove from the selected mentors -->
          <div v-for="mentor in allUsersFiltered" :key="mentor.user_uuid" class="flex items-center justify-between p-4 border rounded-lg dark:border-gray-600">
            <div>
              <p class="text-gray-900 dark:text-white overflow-ellipsis overflow-hidden max-w-[200px]">{{ mentor.username }}</p>
            </div>
            <button v-if="!selectedMentors.some(m => m.user_uuid === mentor.user_uuid)" @click="addMentor(mentor.user_uuid)"
                    class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Tambah
            </button>
            <button v-if="selectedMentors.some(m => m.user_uuid === mentor.user_uuid)" @click="removeMentor(mentor.user_uuid)"
                    class="transition duration-150 mt-5 shadow-sm text-white bg-red-600 hover:bg-red-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
