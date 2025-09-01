<template>
    <Section id="preferences" :type="SectionTypes.CONSTRAINED">
        <h2 class="mb-4 pt-6">{{ $t('user.preferences.changeLang') }}</h2>
    
        <div class="flex gap-3">
            <Select v-model="selectedLang" :options="appLocales" optionLabel="label" placeholder="Select lang" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
            <Button type="submit" @click="submit">Wyślij</Button>
        </div>

        <h2 class="mb-4 pt-6">{{ $t('user.preferences.selectBackground') }}</h2>

        <div class="flex gap-3">
            <BackgroundTile v-for="background in renderedBckgMap" :bckg="background" />
        </div>
    </Section>
</template>

<script setup lang="ts">
import { appLocales, Locale } from '@/locales/locales';
import { userService } from '@/services/userService';
import { UpdateUserPreferencesDto } from 'shared';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import Section from '@/components/Section/Section.vue';
import { SectionTypes } from '@/components/Section/enums/SectionTypes';
import BackgroundTile from '@/components/Backgrounds/BackgroundTile.vue';
import { renderedBckgMap } from '@/common/RenderedBckgMap';

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