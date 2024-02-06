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
import ControlsList from './ControlsList.vue';
import ControlsToggleList from './ControlsToggleList.vue';
import SearchBar from './SearchBar.vue';

</script>
