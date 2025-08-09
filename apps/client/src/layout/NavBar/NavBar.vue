<template>
    <Menubar id="navbar" :model="items" class="fixed t-0 w-full">

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
                    <span v-if="item.icon" :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </a>
            </router-link>
        </template>

        <!--RIGHT SIDE-->
        <template #end>
            <ProfileMenu />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { routes } from '@/router/routes';
import { navRouteFactory } from '@/factories/NavRouteFactory';
import { useUserStore } from '@/stores/userStore/UserStore';
import { EnumUserRole, mapRoleKeyToVal } from '@/common/enums/EnumUserRolels';
import ProfileMenu from './ProfileMenu.vue';
import Logo from '@/components/Logo/Logo.vue';

const userStore = useUserStore();

const items = computed(() => {
    const result = userStore.isLoggedIn
        ? navRouteFactory(routes, mapRoleKeyToVal[userStore.user?.role])
        : navRouteFactory(routes, EnumUserRole.GUEST);
    return result;
})
</script>

<style lang="scss" scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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