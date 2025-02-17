<script setup lang="ts">
import {useUserStore} from "@/store/user";

const userStore = useUserStore();

userStore.storeRefreshUserInfo();
</script>

<template>
<div>login</div>
</template>

<style scoped lang="less">

</style>
