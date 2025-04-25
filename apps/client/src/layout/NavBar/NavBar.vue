<template>
    <nav>
        <router-link to="/" class="wraperLogo"><Logo /></router-link>

        <router-link to="/register">Register</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/courses/create">Courses</router-link>

        <Profile />
    </nav>
</template>

<script setup lang="ts">
import Profile from './Profile.vue';
import Logo from './Logo.vue';
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
    height: $navBarHeight;

    .wraperLogo {
        height: 100%;
    }
}
</style>