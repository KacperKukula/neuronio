<template>
    <h1 class="mb-4">{{ $t('hello') }}</h1>

    <div class="flex gap-3">
        <Select v-model="selectedLang" :options="appLocales" optionLabel="label" placeholder="Select lang" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
        <Button type="submit" @click="submit">Wyślij</Button>
    </div>
</template>

<script setup lang="ts">
import { appLocales, Locale } from '@/locales/locales';
import { userService } from '@/services/userService';
import { UpdateUserPreferencesDto } from 'shared';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { locale } = useI18n();

const selectedLang = ref<Locale>()

const submit = async () => {

    let updateUserPrefsDto = new UpdateUserPreferencesDto();

    if(!selectedLang.value)
        throw new Error('Language select is empty');

    updateUserPrefsDto.locale = selectedLang.value.locale;
    await userService.sentUserPreferences(updateUserPrefsDto)

    locale.value = selectedLang.value.locale;
}
</script>

<style lang="scss" scoped>
</style>