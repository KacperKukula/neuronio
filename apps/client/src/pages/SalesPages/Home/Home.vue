<template>
    <section :id="'hero'" class="h-svh flex items-center justify-center">
        <div :class="'content'" class="flex flex-col items-center text-center">
            <h1 class="mb-4">
                {{ $t('salesPages.home.hero_header') }}
            </h1>
            <p class="w-4/5">{{ $t('salesPages.home.hero_text') }}</p>
        </div>
    </section>

    <section :id="'about'" class="h-svh">
        <h2>Poczuj moc uczenia się</h2>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
#hero {
    .content {
        width: min(80%, 100rem);
    }
}

#about {
    background: $darker;
}
</style>