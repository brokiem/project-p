<script lang="ts" setup>
import type Delta from "quill-delta";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import {ArticleFlags} from "~/utils/articles";

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
const articleId = parseInt(route.params.id as string);

// Check if articleId is a number
if (isNaN(articleId)) {
  // Return nuxt 404 page
  throw error404();
}

// Fetch article data
const {$api, $swal} = useNuxtApp();
const token = useCookie("token");
const {message: articleResponse} = await $api.articles.getNewsById(articleId, token.value!);
const news = ref(articleResponse.news);

// Check if article exists
if (!news) {
  // Return nuxt 404 page
  throw error404();
}

const imageHeaderNeedsUpdate = ref(false);
const editorContentDelta = ref<Delta>();
const isDraft = ref(hasFlag(news.value.flags!, ArticleFlags.IS_DRAFT));

onMounted(async () => {
  // Only import these modules on client side
  if (process.client) {
    await import('quill-image-uploader/dist/quill.imageUploader.min.css');

    const Quill = (await import("quill")).default;
    // @ts-ignore
    const BlotFormatter = (await import('quill-blot-formatter-mobile/dist/BlotFormatter')).default;
    // @ts-ignore
    const ImageUploader = (await import('quill-image-uploader/src/quill.imageUploader')).default;
    const Delta = Quill.import('delta');

    Quill.register('modules/blotFormatter', BlotFormatter);
    Quill.register('modules/imageUploader', ImageUploader);

    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: "#toolbar-container",
        blotFormatter: {},
        imageUploader: {
          upload: (file: File) => {
            return uploadImage(file);
          }
        }
      }
    });
    quill.on('text-change', (_) => {
      editorContentDelta.value = quill.getContents();
    });
    quill.setContents(new Delta(news.value.content));
  }
});

async function publishArticle() {
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

  // Upload image if needed
  if (imageHeaderNeedsUpdate.value) {
    const file = (document.getElementById("file_input") as HTMLInputElement).files![0];
    try {
      news.value.image_url = await uploadImage(file);
    } catch (e) {
      // @ts-ignore
      $swal.fire({
        title: "Operasi gagal",
        text: e,
        icon: "error",
        showConfirmButton: true,
        didOpen: () => {
          // @ts-ignore
          $swal.hideLoading();
        },
      });
      return;
    }
  }

  // Check if input fields are filled and valid
  if (!news.value.image_url || !news.value.title || !news.value.summary || !editorContentDelta.value) {
    // @ts-ignore
    $swal.fire({
      title: "Operasi gagal",
      text: "Mohon isi semua kolom yang diperlukan. Kolom kosong: " + (news.value.image_url ? "" : "Gambar header, ") + (news.value.title ? "" : "Judul, ") + (news.value.summary ? "" : "Ringkasan, ") + (editorContentDelta.value ? "" : "Isi artikel"),
      icon: "error",
      showConfirmButton: true,
      didOpen: () => {
        // @ts-ignore
        $swal.hideLoading();
      },
    });
    return;
  }

  // Update article content
  // @ts-ignore
  news.value.content = editorContentDelta.value;

  const res = await $api.articles.updateNews(news.value.id, news.value.image_url, news.value.title, news.value.summary, news.value.content, news.value.flags, token.value!);
  if (!res.success) {
    // @ts-ignore
    $swal.fire({
      title: "Operasi gagal",
      text: res.error,
      icon: "error",
      showConfirmButton: true,
      didOpen: () => {
        // @ts-ignore
        $swal.hideLoading();
      },
    });
    return;
  }

  // @ts-ignore
  $swal.fire({
    title: "Artikel berhasil diperbarui",
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
}

async function draftArticle(value: boolean = true) {
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

  // Upload image if needed
  if (imageHeaderNeedsUpdate.value) {
    const file = (document.getElementById("file_input") as HTMLInputElement).files![0];
    try {
      news.value.image_url = await uploadImage(file);
    } catch (e) {
      // @ts-ignore
      $swal.fire({
        title: "Operasi gagal",
        text: e,
        icon: "error",
        showConfirmButton: true,
        didOpen: () => {
          // @ts-ignore
          $swal.hideLoading();
        },
      });
      return;
    }
  }

  // Check if input fields are filled and valid
  if (!news.value.image_url || !news.value.title || !news.value.summary || !editorContentDelta.value) {
    // @ts-ignore
    $swal.fire({
      title: "Operasi gagal",
      text: "Mohon isi semua kolom yang diperlukan. Kolom kosong: " + (news.value.image_url ? "" : "Gambar header, ") + (news.value.title ? "" : "Judul, ") + (news.value.summary ? "" : "Ringkasan, ") + (editorContentDelta.value ? "" : "Isi artikel"),
      icon: "error",
      showConfirmButton: true,
      didOpen: () => {
        // @ts-ignore
        $swal.hideLoading();
      },
    });
    return;
  }

  // Update article content
  // @ts-ignore
  news.value.content = editorContentDelta.value;

  const res = await $api.articles.updateNews(news.value.id, news.value.image_url, news.value.title, news.value.summary, news.value.content, news.value.flags, token.value!);
  if (!res.success) {
    // @ts-ignore
    $swal.fire({
      title: "Operasi gagal",
      text: res.error,
      icon: "error",
      showConfirmButton: true,
      didOpen: () => {
        // @ts-ignore
        $swal.hideLoading();
      },
    });
    return;
  }

  if (!value) {
    // Undraft article
    const draftRes = await $api.articles.undraftNews(news.value.id, token.value!);
    if (!draftRes.success) {
      // @ts-ignore
      $swal.fire({
        title: "Operasi gagal",
        text: draftRes.error,
        icon: "error",
        showConfirmButton: true,
        didOpen: () => {
          // @ts-ignore
          $swal.hideLoading();
        },
      });
      return;
    }

    // @ts-ignore
    $swal.fire({
      title: "Artikel berhasil diperbarui dan diundraf",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: true,
    }).then(() => {
      isDraft.value = false;
    })
    return;
  }

  // Draft article
  const draftRes = await $api.articles.draftNews(news.value.id, token.value!);
  if (!draftRes.success) {
    // @ts-ignore
    $swal.fire({
      title: "Operasi gagal",
      text: draftRes.error,
      icon: "error",
      showConfirmButton: true,
      didOpen: () => {
        // @ts-ignore
        $swal.hideLoading();
      },
    });
    return;
  }

  // @ts-ignore
  $swal.fire({
    title: "Artikel berhasil diperbarui dan didraf",
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
  }).then(() => {
    isDraft.value = true;
  })
}

function updatePreview() {
  imageHeaderNeedsUpdate.value = true;

  const file = (document.getElementById("file_input") as HTMLInputElement).files![0];
  const reader = new FileReader();

  reader.onloadend = function () {
    (document.getElementById("preview-img") as HTMLImageElement).src = reader.result as string;
  }

  reader.readAsDataURL(file);
}

function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64 = reader.result?.toString().split(",")[1];
        if (!base64) {
          return reject("Failed to read file");
        }

        const res = await $api.media.upload(base64, file.name, token.value!);
        if (!res.success) {
          return reject(res.error);
        }

        resolve(res.message.result.url);
      } catch (e) {
        reject(e);
      }
    }
  });
}

function deleteArticle() {
  // @ts-ignore
  $swal.fire({
    title: "Hapus artikel?",
    text: "Artikel yang dihapus tidak dapat dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    confirmButtonColor: "#EF4444",
    cancelButtonText: "Batal",
  }).then(async (result: { isConfirmed: any; }) => {
    if (result.isConfirmed) {
      // @ts-ignore
      $swal.fire({
        title: "Menghapus artikel...",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
          // @ts-ignore
          $swal.showLoading();
        },
      });

      const token = useCookie("token");
      const {success, error} = await $api.articles.deleteNews(news.value.id!, token.value!);

      if (success) {
        // @ts-ignore
        $swal.fire({
          title: "Berhasil",
          text: "Artikel berhasil dihapus.",
          icon: "success",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#3B82F6",
        }).then(async () => {
          await navigateTo('/admin/artikel/berita');
        });
      } else {
        // @ts-ignore
        $swal.fire({
          title: "Gagal",
          text: error,
          icon: "error",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#EF4444",
        });
      }
    }
  })
}
</script>

<template>
  <Header title="Edit Berita"></Header>

  <div class="mt-12 mb-12 container mx-auto max-w-[770px] px-8 lg:px-0">
    <!-- Article image header input -->
    <label class="block mb-2 text-sm text-gray-900 dark:text-white" for="file_input">
      Gambar header artikel <span class="text-red-600">*</span>
    </label>
    <input id="file_input" accept="image/*" class="mb-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" @change="updatePreview">

    <!-- Preview uploaded image -->
    <img v-if="news.image_url !== ''" id="preview-img" :src="news.image_url" class="mb-4 rounded-md aspect-video w-full object-contain bg-[#d0d1d3]"/>

    <!-- Article title input -->
    <label class="mb-2 text-sm text-gray-900" for="article-title">
      Judul artikel <span class="text-red-600">*</span>
    </label>
    <input id="article-title" v-model="news.title" class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Judul artikel"
           required type="text"
           maxlength="60"
    >

    <!-- Article summary input -->
    <label class="mb-2 text-sm text-gray-900" for="article-title">
      Ringkasan artikel (summary) <span class="text-red-600">*</span>
    </label>
    <input id="article-summary" v-model="news.summary" class="rounded-md transition duration-50 block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Ringkasan artikel"
           required type="text"
           maxlength="135"
    >

    <!-- Article contents input -->
    <label class="mb-2 text-sm text-gray-900">
      Isi artikel <span class="text-red-600">*</span>
    </label>
    <div id="toolbar-container" class="rounded-t-lg bg-gray-50">
      <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-blockquote"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </div>
    <ClientOnly>
      <div
          id="editor"
          class="!rounded-b-md"
      />
    </ClientOnly>

    <!-- Article type select input -->
    <label class="block mt-4 mb-1 text-sm text-gray-9yarn00 dark:text-white" for="article-type">
      Tipe Artikel <span class="text-red-600">*</span>
    </label>
    <select disabled id="article-type" v-model="news.type" class="rounded-md transition duration-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option disabled>Pilih tipe artikel</option>
      <option value="ANNOUNCEMENT">Pengumuman</option>
      <option value="NEWS">Berita</option>
    </select>

    <!-- Delete article button -->
    <button
        class="transition duration-150 mt-5 shadow-sm text-white bg-red-600 hover:bg-red-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="deleteArticle">
      Hapus Artikel
    </button>
    <!-- Draft article button -->
    <button
        v-if="!isDraft"
        class="transition duration-150 mt-5 shadow-sm text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="draftArticle">
      Draf Artikel
    </button>
    <!-- Undraft article button -->
    <button
        v-if="isDraft"
        class="transition duration-150 mt-5 shadow-sm text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="draftArticle(false)">
      Undraft Artikel
    </button>
    <!-- Publish article button -->
    <button
        class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="publishArticle">
      Perbarui Artikel
    </button>
  </div>
</template>

<style>
</style>
