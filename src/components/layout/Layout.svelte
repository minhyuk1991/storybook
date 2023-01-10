<script>
</script>

<div class="flex flex-col h-full min-h-[100vh] w-full">
  <header class="bg-red-200 h-[200px]">header</header>
  <main class="min-h-[calc(100vh-200px-200px)] flex">
    <slot />
  </main>
  <footer class="bg-gray-800 h-[200px]">footer</footer>
</div>
