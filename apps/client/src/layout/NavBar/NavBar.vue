<template>
    <nav>
        <router-link to="/">
            <div class="logo">Logo</div>
        </router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/courses/create">Courses</router-link>

        <Profile />
    </nav>
</template>

<script setup lang="ts">
import Profile from './Profile.vue';
</script>

<style lang="scss" scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em .25rem;
    height: $navBarHeight;

    .logo {
        aspect-ratio: 1/1;
        border-radius: 6rem;
        border: 2px solid #42b883;
        will-change: filter;
        transition: filter 300ms;
    }
}
</style>