<script setup lang="ts">
import type { Delivery } from "@/types/data";

const { deliveries } = defineProps<{
  deliveries: Delivery[][];
}>();
</script>

<template>
  <section class="shadow-xl self-start">
    <table>
      <thead>
        <tr class="h-28 bg-purple-400">
          <th
            colSpan="4"
            class="text-[64px] font-bold text-white border-2 border-slate-300 whitespace-nowrap"
          >
            等待配药
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(delivery, index) in deliveries" :key="index" class="h-28">
          <template v-for="(el, idx) in delivery" :key="idx">
            <td
              class="w-52 text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
            >
              {{ el.brxm ? el.qdxh : "" }}
            </td>
            <td
              class="w-72 text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
            >
              {{
                el.brxm
                  ? el.brxm.length > 2
                    ? el.brxm[0] + "*" + el.brxm[el.brxm.length - 1]
                    : el.brxm[0] + "*"
                  : ""
              }}
            </td>
          </template>
        </tr>
        <tr class="h-24">
          <td
            colSpan="4"
            class="text-4xl text-white text-center border-2 border-slate-300 bg-amber-500 whitespace-nowrap"
          >
            请耐心等待
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
