<script setup lang="ts">
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/vue/20/solid";
import FacebookIcon from "~/components/icons/FacebookIcon.vue";
import InstagramIcon from "~/components/icons/InstagramIcon.vue";
import YouTubeIcon from "~/components/icons/YouTubeIcon.vue";
</script>

<template>
  <footer>
    <!-- Mega Footer -->
    <div class="bg-white py-7 px-4" style="background-color: #f5f5f5;">
      <div class="container mx-auto sm:px-4">
        <div class="md:flex md:flex-wrap md:justify-between">
          <div>
            <!-- Title -->
            <div class="relative text-gray-800 text-xl px-4 mt-4">Informasi Kontak</div>
            <!-- Contents -->
            <!-- Address -->
            <div class="flex flex-wrap">
              <!-- Map icon -->
              <div class="text-gray-700 ml-4 mt-4 md:mt-9">
                <MapPinIcon class="w-5 h-5 inline top-[-2px] mr-1"/>
                Jalan Wisnu-Belayu, Marga, Tabanan - Bali (82181)
              </div>
            </div>
            <!-- Telephone number -->
            <div class="flex flex-wrap">
              <!-- Telephone icon -->
              <div class="text-gray-700 ml-4 mt-2">
                <PhoneIcon class="w-5 h-5 inline top-[-2px] mr-1"/>
                0361-8945356
              </div>
            </div>
            <!-- Email -->
            <div class="flex flex-wrap">
              <!-- Email icon -->
              <NuxtLink href="mailto:smkn2tabanan@ymail.com" class="text-gray-700 ml-4 mt-2">
                <EnvelopeIcon class="w-5 h-5 inline top-[-2px] mr-1"/>
                smkn2tabanan@ymail.com
              </NuxtLink>
            </div>
          </div>
          <!-- Google Maps iframe -->
          <div class="pl-4 mt-9 md:mt-4">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.859999046224!2d115.16562741433472!3d-8.512971288557424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23b6a8b9b5e83%3A0x26d48e4fa61a6bd!2sSMK%20Negeri%202%20Tabanan!5e0!3m2!1sid!2sid!4v1622018812277!5m2!1sid!2sid"
                title="Google Maps"
                width="100%"
                height="185"
                style="border:1px;"
                allowfullscreen=""
                loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </div>
    <!-- Devider -->
    <hr class="border-gray-200 sm:mx-auto dark:border-gray-700"/>
    <!-- Small Footer -->
    <div class="p-4 bg-white sm:p-6 dark:bg-gray-900 bottom-0 w-full" style="background-color: #f5f5f5;">
      <div class="container mx-auto">
        <div class="sm:flex items-center sm:justify-between px-10 mx-auto md:max-w-screen-xl">
          <span class="text-sm text-gray-500 sm:text-center flex justify-center dark:text-gray-400">
            © {{ new Date().getFullYear() }} - TIK SMK DUTA | All Rights Reserved.
          </span>

          <div class="flex mt-4 space-x-6 justify-center sm:mt-0">
            <NuxtLink href="https://www.facebook.com/DutaSMK/"
               class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-200">
              <FacebookIcon class="w-5 h-5 inline top-[-2px] mr-1"/>
              <span class="sr-only">Facebook page</span>
            </NuxtLink>
            <NuxtLink href="https://www.instagram.com/osisdutasmk/"
               class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-200">
              <InstagramIcon class="w-5 h-5 inline top-[-2px] mr-1"/>
              <span class="sr-only">Instagram page</span>
            </NuxtLink>
            <NuxtLink href="https://www.youtube.com/channel/UCFGz3a0jUv7PxB1vHJ-Hkbg?sub_confirmation=1"
               class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-200">
              <YouTubeIcon class="w-5 h-5 inline top-[-2px] mr-1"/>
              <span class="sr-only">YouTube page</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
