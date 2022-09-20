<script setup lang="ts">
import type { Take } from "@/types/data";

const { takes } = defineProps<{
  takes: Take[];
}>();
</script>

<template>
  <section class="shadow-xl self-start">
    <table>
      <thead class="table-auto border-collapse border-2 border-slate-300">
        <tr class="h-28 bg-green-500">
          <th
            class="w-52 text-[64px] font-bold text-white text-center border-2 border-slate-300 whitespace-nowrap"
          >
            序号
          </th>
          <th
            class="w-64 text-[64px] font-bold text-white text-center border-2 border-slate-300 whitespace-nowrap"
          >
            姓名
          </th>
          <th
            class="w-52 text-[64px] font-bold text-white text-center border-2 border-slate-300 whitespace-nowrap"
          >
            窗口
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(take, index) in takes" :key="index" class="h-28">
          <td
            class="text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
          >
            {{ take.brxm ? take.qdxh : "" }}
          </td>
          <td
            class="text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
          >
            {{
              take.brxm.length > 2
                ? take.brxm[0] + "*" + take.brxm[take.brxm.length - 1]
                : take.brxm[0] + "*"
            }}
          </td>
          <td
            class="text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
          >
            {{ take.brxm ? take.window : "" }}
          </td>
        </tr>
        <tr v-for="index in 6 - takes.length" :key="index" class="h-28">
          <td
            class="text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
          ></td>
          <td
            class="text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
          ></td>
          <td
            class="text-[64px] font-bold text-slate-600 text-center border-2 border-slate-300 whitespace-nowrap"
          ></td>
        </tr>
        <tr class="h-24">
          <td
            class="text-4xl text-white text-center border-2 border-slate-300 bg-amber-500 whitespace-nowrap"
            colSpan="3"
          >
            请以上患者取药
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
