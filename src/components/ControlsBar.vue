<template>
  <section class="flex flex-col w-full">
    <SearchBar />
    <div class="flex flex-col w-full">
      <ControlsList />
      <ControlsToggleList />
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchBar from '@components/SearchBar.vue'
import ControlsList from '@components/ControlsList.vue'
import ControlsToggleList from '@components/ControlsToggleList.vue'
</script>
