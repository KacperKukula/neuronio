<template>
    <div class="simpleTile">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SimpleTile',
})
</script>

<style lang="scss" scoped>
@use "@/variables" as vars;
@use "sass:color";

.simpleTile {
    padding: 2.2rem 1.8rem 2.6rem;
    border-radius: 0.5em;
    background-color: vars.$primaryDark;
    border: 1.8px solid color.adjust(vars.$primaryDark, $lightness: 8%);
}
</style>