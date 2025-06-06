<template>
    <Menubar :model="items">

        <!--LEFT SIDE-->
        <template #start>
            <router-link to="/" class="wraperLogo">
                <Logo />
            </router-link>
        </template>

        <!--ROUTES-->
        <template #item="{ item, props, hasSubmenu, root }">
            <router-link v-ripple :to="item.path">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </a>
            </router-link>
        </template>

        <!--RIGHT SIDE-->
        <template #end>
            <Profile />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Profile from './Profile.vue';
import Logo from './Logo.vue';
import { routes } from '@/router/routes';
import { navRouteFactory } from '@/factories/NavRouteFactory';

const items = navRouteFactory(routes)

console.log(items)
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

    background-color: black;

    .wraperLogo {
        height: 100%;
    }
}
</style>