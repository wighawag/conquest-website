<script lang="ts">
  import NavButton from '../components/navigation/NavButton.svelte';
  import Feature from '../components/Feature.svelte';
  const name = 'conquest.eth';

  type Outcome = {
    type: 'Error' | 'Success',
    message: string
  };
  let outcome: Outcome | undefined;

  async function subscribeToNewsletter() {
    const form = document.getElementById('subscribeForm') as HTMLFormElement;
    const formData: string[][] = new FormData(form) as unknown as string[][];
    const data = new URLSearchParams([...formData]);
    console.log({data: data.toString()})
    try {
      const result = await fetch(form.action, {
        method: form.method,
        body: data
      })
      const json = await result.json();
      console.log(json);
      if (json.error) {
        throw new Error(json.error);
      }
      outcome = { type: 'Success', message: 'Subscribed"'};
      setTimeout(() => acknowledge(), 3000);
    } catch (e) {
      outcome = {type: 'Error', message: e.message || '' + e};
    }
  }

  function acknowledge() {
    outcome = undefined;
  }
</script>


<div class="mx-auto max-w-7xl mt-2 border-b pb-2 border-gray-700">
  <a href="https://etherplay.io" class="mx-2"><img alt="Etherplay" src="logo_presents_on_black.png" class="inline h-10" /></a>
</div>
<!-- <div class="mt-2 w-full h-1 bg-gray-700 max-w-7xl mx-auto"></div> -->

<div class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
  {#if outcome}
  <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <!-- Heroicon name: outline/check-circle -->
          {#if outcome.type === 'Success'}
          <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {:else}
          <svg class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {/if}
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900">
            {outcome.message}
          </p>
          <!-- <p class="mt-1 text-sm text-gray-500">
            Anyone with a link can now view this file.
          </p> -->
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button on:click={() => acknowledge()} class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">Close</span>
            <!-- Heroicon name: solid/x -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  {/if}
</div>

<section class="bg-black pb-8 px-4 text-center">
  <div class="max-w-auto md:max-w-xl mx-auto">
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
      Get updates by registering to our <a href="https://etherplay.io" class="text-green-400 underline">Etherplay</a>'s newsletter:
     </p>
     <div class="max-w-md mx-auto mt-5 space-y-3 md:mt-8 md:space-y-5">
      <form id="subscribeForm" action="https://etherplay-newsletter-subscription.rim.workers.dev/" method="POST" class="sm:max-w-xl sm:mx-auto lg:mx-0">
        <div class="sm:flex">
          <div class="min-w-0 flex-1">
            <label for="email" class="sr-only">Email address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email" class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <NavButton
            on:click={(e) => subscribeToNewsletter()}
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

        <a href="https://twitter.com/etherplay" target="_blank" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Twitter</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>

        <a href="https://github.com/etherplay"  target="_blank" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">GitHub</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>

        <a href="https://discord.gg/Qb4gr2ekfr" target="_blank" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Discord</span>
          <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240" fill="currentColor"><path class="st0" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path class="st0" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/></svg>
        </a>

        <a href="mailto:contact@etherplay.io">
          <span class="sr-only">Email</span>
          <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
      <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
        &copy; 2020 Etherplay Entertainment Limited All rights reserved.
      </p>
    </div>
  </div>
</footer>
