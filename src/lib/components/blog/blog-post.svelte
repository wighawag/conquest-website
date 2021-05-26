<!-- mdxdev layout do not support typescript -->
<script>
  import { base } from '$app/paths';
  import { url } from '$lib/utils/url';
	import './prism-theme.css';
  import { page } from '$app/stores';
  import {url as appUrl} from '../../../../application.json'
  const host = appUrl.endsWith("/") ? appUrl.slice(0, appUrl.length -1) : appUrl;
  const pagePath = $page.path.endsWith("/") ? $page.path : $page.path + "/";

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
  <meta name="title" content={title}>
  <meta name="description" content={title}>
  <meta property="og:url" content="{host}{pagePath}">
  <meta property="og:type" content="website">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={title}>
  {#if image}
  <meta property="og:image" content="{host}/{image}">
  {/if}
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{host}{pagePath}">
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={title}>
  {#if image}
  <meta property="twitter:image" content="{host}/{image}">
  {/if}
</svelte:head>

<div class="text-white m-3" ><a href={url('')} class="underline text-white m-2">Home</a> >
<a href={url('devlog/')} class="underline text-white m-2">devlog</a> > <span class="text-gray-400">{title}</span>
</div>
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
