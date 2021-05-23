import preprocess from 'svelte-preprocess';
import adapter_ipfs from 'sveltejs-adapter-ipfs';
import {mdsvex} from 'mdsvex';
import footnotes from 'remark-footnotes';
import headings from 'remark-autolink-headings';
import unwrapImages from 'remark-unwrap-images';
import slug from 'remark-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: ['.md'],
      layout: './src/lib/components/blog/blog-post.svelte',
      remarkPlugins: [footnotes, slug, headings, unwrapImages],
    }),
  ],

  kit: {
    adapter: adapter_ipfs({
      pages: 'docs',
      removeBuiltInServiceWorkerRegistration: true,
      injectPagesInServiceWorker: true,
      injectDebugConsole: true,
    }),
    target: '#svelte',
    trailingSlash: 'ignore',
  },
};

export default config;
