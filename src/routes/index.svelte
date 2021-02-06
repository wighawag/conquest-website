<script lang="ts">
  import NavButton from '../components/navigation/NavButton.svelte';
  import Feature from '../components/Feature.svelte';
  const name = 'conquest.eth';
</script>
<!-- <div class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
  <div class="relative h-full max-w-7xl mx-auto">
    <svg class="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
      <defs>
        <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
    </svg>
    <svg class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
      <defs>
        <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
    </svg>
  </div>
</div> -->

<!-- <div class="relative pt-6 pb-16 sm:pb-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
      <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
        <div class="flex items-center justify-between w-full md:w-auto">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-20 w-auto sm:h-20" src="etherplay_logo_text_under.png" alt="">
          </a>
        </div>
      </div>
    </nav>
  </div>
</div> -->

<section class="bg-black py-8 px-4 text-center">
  <div class="max-w-auto md:max-w-lg mx-auto">
    <img
      class="mt-12 mb-8 mx-auto"
      src="logo.png"
      alt={name}
      style="width:512px;"
      width="512px"/>
    <p class="m-6 text-gray-400 text-xl">
     An unstoppable and open-ended game of strategy and diplomacy running on <a href="https://ethereum.org">ethereum</a>.
    </p>
    <p class="m-6 text-gray-400 text-xl">
      Comming soon...
     </p>
     <p class="m-6 text-gray-400 text-xl">
      Get updates by registering to <a href="https://etherplay.io" class="text-green-400 underline">Etherplay</a> newsletter
     </p>
     <div class="max-w-md mx-auto mt-5 space-y-3 md:mt-8 md:space-y-5">
      <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
        <div class="sm:flex">
          <div class="min-w-0 flex-1">
            <label for="email" class="sr-only">Email address</label>
            <input id="email" type="email" placeholder="Enter your email" class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <NavButton
              customPadding='py-3 px-4'
              class="big block w-full rounded-md shadow font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
              label="Subscribe to Etherplay newsletter">
              Subscribe
            </NavButton>
          </div>
        </div>
      </form>
     </div>
    <!-- <div class="max-w-md mx-auto mt-5 space-y-3 md:mt-8 md:space-y-5">
      <div
        class="space-y-5 sm:flex sm:justify-center sm:space-y-0 sm:space-x-3">
        <NavButton
          class="big secondary"
          href="demo"
          label="Try ethereum integration">
          Demo
        </NavButton>
        <NavButton
          class="big secondary"
          href="wallet"
          label="Check wallet status">
          Wallet
        </NavButton>
        <NavButton
          blank={true}
          class="big secondary"
          href="https://github.com/wighawag/conquest-eth"
          label="get it from github!">
          Github
        </NavButton>
      </div>
    </div> -->
  </div>
</section>
<footer class="bg-black" aria-labelledby="footerHeading">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
      <div class="flex space-x-6 md:order-2">

        <a href="#" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Twitter</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>

        <a href="#" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">GitHub</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>

        <a href="#" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Discord</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
      <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
        &copy; 2020 Etherplay Entertainment Limited All rights reserved.
      </p>
    </div>
  </div>
</footer>
