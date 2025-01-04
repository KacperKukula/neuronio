<template>
    <section id="login">
        <SimpleTile>
            <h1>Login</h1>
            <input type="text" placeholder="Username">
            <input type="password" placeholder="Password">
        </SimpleTile>
    </section>
</template>

<script lang="ts">
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Login',
    components: {
        SimpleTile
    }
})
</script>

<style lang="scss" scoped>
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100svh;

    input {
        padding: 0.5em;
    }
}
</style>