<template>
  <div class="flex flex-col w-screen h-screen justify-center items-center">
    <h1>Ooops...!</h1>
    <h2>The page you were trying to access does not exist</h2>
    <br />
    <router-link class="underline" :to="{ name: 'ShowsView' }"
      >Go back to discovering shows</router-link
    >
  </div>
</template>
