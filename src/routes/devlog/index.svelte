<script lang="ts" context="module">
  import type {Post} from "$lib/data/getPosts";
	export const prerender = true;
	export async function load({session} : { session: {posts: Post[]} }): Promise<{props: {posts: Post[]}}> {
		const posts = session.posts;
		return { props: { posts } };
	}

  import { url } from '$lib/utils/url';
</script>

<script lang="ts">
  import { base } from "$app/paths";
	export let posts: Post[];
  import {appName, url as appUrl} from '../../../application.json'
  import { page } from '$app/stores';

	const formatDate = (value) => {
		const date = new Date(value);
		return new Intl.DateTimeFormat([], {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}).format(date);
	};

  const title = appName + " - devlog";
  const description = "Get latest news on the development of conquest.eth";
  const host = appUrl.endsWith("/") ? appUrl.slice(0, appUrl.length -1) : appUrl;
  const pagePath = $page.path.endsWith("/") ? $page.path : $page.path + "/";
  const previewImage = host + "/preview.png";

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title}>
  <meta name="description" content={description}>
  <meta property="og:type" content="website">
  <meta property="og:url" content="{host}{pagePath}">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={previewImage}>
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{host}{pagePath}">
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
  <meta property="twitter:image" content={previewImage}>
</svelte:head>


<div class="text-white m-3"><a href={url('')} class="underline text-white m-2">Home</a> > <span class="text-gray-400">devlog</span></div>

<div class="text-gray-100 bg-gray-900 max-w-2xl mx-auto p-4 sm:p-8">
	<div>
		{#each posts as post}
			<a
				href={`${base}/devlog/${post.slug}`}
				class="post block mb-4 pb-4 border-b border-gray-100 last:border-none last:mb-0"
			>
        <!-- {#if post.image}<img class="w-8 h-8" src={`${base}/${post.image}`} alt={post.title}/>{/if} -->
				<div class="title font-medium text-xl">{post.title}</div>
				<div class="date text-gray-400 font-light">{formatDate(post.date)}</div>
			</a>
		{/each}
	</div>
</div>
