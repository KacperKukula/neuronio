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
.simpleTile {
    background-color: #a0a0a0;
    padding: 1em;
    border-radius: 0.5em;
}
</style>