<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, watch } from "vue";
import axios from "axios";

import Header from "@/components/common/Header.vue";
import Deliveries from "@/components/common/Deliveries.vue";
import Takes from "@/components/common/Takes.vue";

import type { Delivery, Take } from "@/types/data";

const state = reactive<{
  deliveries: Delivery[][];
  takes: (Take & { jhbz: "0" | "1"; fphm: string; cflx: "1" | "2" | "3" })[];
  loading: boolean;
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[];
  speech: SpeechSynthesisUtterance;
  currentTake: (Take & { fphm: string; cflx: "1" | "2" | "3" }) | null;
  timer: ReturnType<typeof setInterval>;
  call: (Take & { fphm: string; cflx: "1" | "2" | "3" })[];
  callIndex: number;
}>({
  deliveries: [],
  takes: [],
  loading: true,
  synth: window.speechSynthesis,
  voices: [],
  speech: new window.SpeechSynthesisUtterance(),
  currentTake: null,
  timer: null!,
  call: [],
  callIndex: 0,
});

onMounted(() => {
  const timer = setInterval(() => {
    if (state.voices.length > 0) {
      clearInterval(timer);
    } else {
      state.voices = state.synth.getVoices();
    }
  }, 100);

  const fillArray: Delivery[] = [];

  for (let i = 0; i < 12; i++) fillArray.push({ qdxh: String(i), brxm: "" });

  state.deliveries = [...fillArray]
    .slice(0, 12)
    .reduce<{ qdxh: string; brxm: string }[][]>(
      (previousValue, currentValue, currentIndex) => {
        if (currentIndex % 2 === 0) {
          let newArray: { qdxh: string; brxm: string }[] = [];
          newArray.push(currentValue);
          previousValue.push(newArray);
          return previousValue;
        } else {
          previousValue[Math.floor(currentIndex / 2)].push(currentValue);
          return previousValue;
        }
      },
      []
    );
});

onMounted(() => {
  state.timer = setInterval(() => {
    request().then(res => {
      if (res.error_id !== "-1") {
        state.takes = res
          .filter(
            (e: { cflx: "1" | "2" | "3"; qdlx: "1" | "2" }) =>
              (e.cflx === "1" || e.cflx === "2") && e.qdlx === "2"
          )
          .map((e: any) => ({ ...e, window: 2 }));

        const deliveries = res.filter(
          (e: { cflx: "1" | "2" | "3"; qdlx: "1" | "2" }) =>
            (e.cflx === "1" || e.cflx === "2") && e.qdlx === "1"
        );

        const fillArray: Delivery[] = [];

        for (let i = 0; i < 12 - deliveries.length; i++)
          fillArray.push({ qdxh: String(i), brxm: "" });

        state.deliveries = [...deliveries, ...fillArray]
          .slice(0, 12)
          .reduce<{ qdxh: string; brxm: string }[][]>(
            (previousValue, currentValue, currentIndex) => {
              if (currentIndex % 2 === 0) {
                let newArray: { qdxh: string; brxm: string }[] = [];
                newArray.push(currentValue);
                previousValue.push(newArray);
                return previousValue;
              } else {
                previousValue[Math.floor(currentIndex / 2)].push(currentValue);
                return previousValue;
              }
            },
            []
          );
      }
    });
  }, 5000);
});

onUnmounted(() => clearInterval(state.timer));

const display = computed(() => {
  const name =
    state.currentTake!.brxm.length > 2
      ? state.currentTake!.brxm[0] +
        "*" +
        state.currentTake!.brxm[state.currentTake!.brxm.length - 1]
      : state.currentTake!.brxm[0] + "*";

  return `请${state.currentTake!.qdxh}号${name}至西药房${
    state.currentTake?.window ? state.currentTake?.window + "号窗口" : "2号窗口"
  }取药`;
});

watch(
  () => state.currentTake,
  value => {
    if (value) {
      setTimeout(async () => {
        try {
          await axios.post("/hai/HttpEntry/?service=JHZT_MZYF", {
            fphm: state.currentTake!.fphm,
            cflx: state.currentTake!.cflx,
          });
          state.takes.splice(
            state.takes.findIndex(e => e.fphm === state.currentTake!.fphm),
            1,
            { ...state.currentTake!, jhbz: "1" }
          );
          state.currentTake = null;
        } catch (e) {}
      }, 4000);
    }
  }
);

watch(
  () => state.takes,
  values => {
    if (values.length > 0) {
      state.call = state.takes.filter(
        (e: Take & { jhbz: "0" | "1" }) => e.jhbz === "0"
      );
    }
  }
);

watch(
  () => state.call,
  values => {
    if (values.length > 0) {
      state.currentTake = state.call[0];
      speak(state.call[0]);
    }
  }
);

function speak(currentTake: Take) {
  state.speech.text = `请${currentTake.qdxh}号${currentTake.brxm}至西药房${
    currentTake?.window ? currentTake?.window + "号窗口" : "2号窗口"
  }取药`;
  state.speech.voice =
    state.voices[
      state.voices.findIndex((el: { lang: string }) => el.lang === "zh-CN")
    ];
  state.speech.rate = 0.8;
  state.synth.speak(state.speech);
}

const request = async (): Promise<any> => {
  const { data } = await axios.post("/hai/HttpEntry/?service=PDJHDL_MZYF", {
    QDRQ: "2022-07-26",
  });

  return Promise.resolve(data.result);
};
</script>

<template>
  <div class="w-full h-full flex flex-col gap-y-4 bg-white shadow-2xl rounded">
    <Header title="西药房" />
    <main class="flex-auto flex justify-center gap-x-8">
      <Deliveries :deliveries="state.deliveries" />
      <Takes :takes="state.takes" />
    </main>
    <div
      v-if="state.currentTake"
      class="fixed text-8xl w-[1600px] h-[480px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 rounded shadow-2xl flex items-center justify-center transition-all duration-1000 ease-in-out"
    >
      <div class="text-green-500">{{ display }}</div>
    </div>
  </div>
</template>

<style scoped></style>
