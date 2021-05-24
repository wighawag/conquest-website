<!-- mdxdev layout do not support typescript -->
<script>
import { base } from '$app/paths';

import { url } from '$lib/utils/url';

	import './prism-theme.css';

	export let title;
	export let date;
	export let image;

	let dateDisplay = new Date(Date.parse(date)).toLocaleDateString({
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<span class="text-white" ><a href={url('')} class="underline text-white m-2">Home</a> >
<a href={url('devlog/')} class="underline text-white m-2">devlog</a> > <span class="text-gray-400">{title}</span>
</span>
<div class="text-gray-100 bg-gray-900 prose prose-sm sm:max-w-xl md:max-w-2xl p-3 mx-auto">
  <div class="prose-dark">
    <div class="py-8 sm:py-10 sm:text-center">
      <div class="font-bold text-4xl mb-4">{title}</div>
      <div class="text-sm">{dateDisplay}</div>
    </div>
    {#if image}
      <img src={`${base}/${image}`} class="full-bleed" alt="Banner" />
    {/if}
    <!-- <div class="text-black"> -->
      <slot />
    <!-- </div> -->
  </div>
</div>
