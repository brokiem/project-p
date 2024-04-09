<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

let BlotFormatter: any;
let ImageUploader: any;
let Delta: any;

// Only import these modules on client side
if (process.client) {
  const blotFormatterModule = await import('quill-blot-formatter');
  BlotFormatter = blotFormatterModule.default;

  const deltaModule = await import('quill-delta');
  Delta = deltaModule.default;

  // @ts-ignore
  const imageUploaderModule = await import('quill-image-uploader');
  ImageUploader = imageUploaderModule.default;

  await import('quill-image-uploader/dist/quill.imageUploader.min.css');
}

// Fetch article data
const {$api, $swal} = useNuxtApp();
const token = useCookie("token");

const news = ref({
  image_url: "",
  title: "",
  summary: "",
  content: null,
  flags: 0,
  type: ArticleType.NEWS,
});

const modules = [
  {
    name: 'blotFormatter',
    module: BlotFormatter,
    options: {}
  },
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: (file: File) => {
        return uploadImage(file);
      }
    }
  },
];

const imageHeaderNeedsUpdate = ref(false);
const editorContentDelta = ref(null);

function editorReady() {
  console.log("Editor ready!");
}

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
        text: "Gambar header gagal diunggah. Pastikan gambar yang diunggah valid",
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
  news.value.content = editorContentDelta.value;
  news.value.flags = ArticleFlags.IS_PUBLISHED;

  const res = await $api.articles.createNews(news.value.image_url, news.value.title, news.value.summary, news.value.content!, news.value.flags, token.value!);
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
    title: "Artikel berhasil dibuat!",
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
}

async function draftArticle() {
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
        text: "Gambar header gagal diunggah. Pastikan gambar yang diunggah valid.",
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
  news.value.content = editorContentDelta.value;
  news.value.flags = ArticleFlags.IS_DRAFT;

  const res = await $api.articles.createNews(news.value.image_url, news.value.title, news.value.summary, news.value.content!, news.value.flags, token.value!);
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
    title: "Artikel berhasil dibuat & draft!",
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
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
</script>

<template>
  <Header title="Buat Berita"></Header>

  <div class="mt-12 mb-12 container mx-auto max-w-[770px] px-8 lg:px-0">
    <!-- Article image header input -->
    <label class="block mb-2 text-sm text-gray-900 dark:text-white" for="file_input">
      Gambar header artikel <span class="text-red-600">*</span>
    </label>
    <input id="file_input" accept="image/*" class="mb-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" @change="updatePreview">

    <!-- Preview uploaded image -->
    <img id="preview-img" :src="news.image_url" alt="Article header image" class="mb-4 rounded-md aspect-video w-full object-contain" style="background-color: #d0d1d3;">

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
      <quill-editor
          v-model:content="editorContentDelta"
          :modules="modules"
          class="!rounded-b-md"
          content-type="delta"
          theme="snow"
          toolbar="#toolbar-container"
          @ready="editorReady"
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

    <!-- Draft article button -->
    <button
        class="transition duration-150 mt-5 shadow-sm text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        @click="draftArticle">
      Draf Artikel
    </button>
    <!-- Publish article button -->
    <button
        class="transition duration-150 mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="publishArticle">
      Publikasikan Artikel
    </button>
  </div>
</template>

<style>
</style>
