<script setup lang="ts">
const {$swal, $api} = useNuxtApp();
const currentUser = useCurrentUser();
const token = useCookie("token");
const isLoggedIn = ref(currentUser.value != null);

function logout() {
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

  isLoggedIn.value = false;
  token.value = null;
  currentUser.value = null;

  setTimeout(() => {
    // @ts-ignore
    $swal.fire({
      title: "Berhasil keluar",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
      didOpen: () => {
        // @ts-ignore
        $swal.hideLoading();
      },
    });
  }, 300);
}

async function submit() {
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

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

  try {
    const {message} = await $api.auth.login(email, password);

    token.value = message.token;
    currentUser.value = message.user;
    isLoggedIn.value = true;

    // @ts-ignore
    $swal.fire({
      title: "Login berhasil",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  } catch (err) {
    console.error(err);

    // @ts-ignore
    $swal.fire({
      title: "Login gagal",
      text: "Email atau kata sandi salah",
      icon: "error",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  }
}
</script>

<template>
  <div class="mx-auto">
    <div class="bg-[#F8F9FC]">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow-md border border-gray-200 md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {{ isLoggedIn ? "Anda sudah masuk" : "Masuk" }}
            </h1>
            <div v-if="isLoggedIn" class="space-y-4 md:space-y-6">
              <button @click="logout" class="transition duration-150 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Keluar</button>
            </div>
            <div v-if="!isLoggedIn">
              <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" placeholder="Masukkan email"
                         class="transition duration-150 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kata Sandi</label>
                  <input type="password" name="password" id="password" placeholder="Masukkan kata sandi"
                         class="transition duration-150 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <button type="submit" class="transition duration-150 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center">Masuk</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
