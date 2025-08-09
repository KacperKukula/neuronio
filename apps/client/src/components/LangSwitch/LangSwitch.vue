<template>
    <!-- <Select v-model="selectedLocale" :options="appLocales" optionLabel="iconName" class="w-full md:w-56" /> -->
</template>

<script lang="ts" setup>
import { appLocales, Locale } from "@/locales/locales";
import { ref } from "vue";

const selectedLocale = ref<Locale | null>(null);

</script>