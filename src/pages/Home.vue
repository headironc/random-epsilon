<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()

const navigate = (path: string) =>
    router.push(path)
</script>

<template>
  <div class="w-full h-full flex items-center justify-center" v-if="route.path==='/'">
    <div class="flex flex-col gap-y-8">
      <button @click="navigate('/pharmacy')"
              class="bg-blue-400 text-white px-8 py-4 rounded shadow-md">西药房排队页面
      </button>
      <button @click="navigate('/tcm-pharmacy')"
              class="bg-blue-400 text-white px-8 py-4 rounded shadow-md">中药房排队页面
      </button>
    </div>
  </div>
  <router-view/>
</template>

<style scoped>
</style>