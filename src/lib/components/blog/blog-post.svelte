<!-- mdxdev layout do not support typescript -->
<script>
  import {onMount} from 'svelte/internal'
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

  const metaNamesToDelete = ['title', 'description'];
  const metaPropertiesToDelete = ['og:title', 'og:description', 'og:image', 'twitter:title', 'twitter:image', 'twitter:description'];
  const metaPropertiesToDeleteWhenNoImage = ['og:title', 'og:description', 'twitter:title', 'twitter:description'];
  onMount(() => {
    const head = document.head;
    const tags = head.querySelectorAll('meta');
    for (const tag of tags) {
      const property = tag.attributes['property'];
      if (
        (tag.name && metaNamesToDelete.indexOf(tag.name) !== -1)
        || (image && property && metaPropertiesToDelete.indexOf(property))
        || (!image && property && metaPropertiesToDeleteWhenNoImage.indexOf(property))
        ) {
        tag.remove();
      }
    }

    function append(metaValue, content) {
      var meta = document.createElement('meta');
      if (metaValue.name) {
        meta.name = metaValue.name;
      } else if (metaValue.property) {
        meta.setAttribute('property', metaValue.property);
        meta.setAttribute('content', content);
      }
      head.appendChild(meta);
    }

    append({name: 'title'}, title);
    append({name: 'description'}, title);
    append({property: 'og:description'}, title);
    append({property: 'twitter:description'}, title);
    append({property: 'og:title'}, title);
    append({property: 'twitter:title'}, title);

    if (image) {
      append({property: 'og:image'}, `https://conquest.eth.link/${image}`);
      append({property: 'twitter:image'}, `https://conquest.eth.link/${image}`);
    }

  })
</script>

<svelte:head>
	<title>{title}</title>
  <meta name="title" content={title}>
  <meta name="description" content={title}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={title}>
  {#if image}
  <meta property="og:image" content="https://conquest.eth.link/{image}">
  {/if}
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={title}>
  {#if image}
  <meta property="twitter:image" content="https://conquest.eth.link/{image}">
  {/if}
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
