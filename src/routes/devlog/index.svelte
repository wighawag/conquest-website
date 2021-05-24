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

	const formatDate = (value) => {
		const date = new Date(value);
		return new Intl.DateTimeFormat([], {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}).format(date);
	};
</script>

<span class="text-white"><a href={url('')} class="underline text-white m-2">Home</a> > <span class="text-gray-400">devlog</span></span>

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
