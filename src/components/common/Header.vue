<script setup lang="ts">
import { useRouter } from "vue-router";
import brand from "@/assets/brand.jpg";

const router = useRouter();

defineProps<{ title: string }>();
</script>

<template>
  <header class="px-8 py-5 grid grid-cols-3 items-center bg-white shadow">
    <div class="flex items-center">
      <img
        alt="brand"
        :src="brand"
        class="h-20 cursor-pointer"
        loading="lazy"
        @click="router.back()"
        title="返回主页"
      />
    </div>
    <div>
      <h2
        class="text-9xl text-slate-600 text-center font-bold tracking-widest whitespace-nowrap"
      >
        {{ title }}
      </h2>
    </div>
  </header>
</template>

<style scoped></style>
