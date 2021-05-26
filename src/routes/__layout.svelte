<script lang="ts">
  import '../service-worker-handler';
  import '../global.css';
  import Notifications from '$lib/components/notification/Notifications.svelte';
  import NoInstallPrompt from '$lib/components/NoInstallPrompt.svelte';
  import NewVersionNotification from '$lib/components/NewVersionNotification.svelte';
  // import Install from './components/Install.svelte';

  import {appName, appDescription, url as appUrl} from '../../application.json'

  const title = appName + " - " + appDescription;
  const description = appDescription;
  const urlToUse = import.meta.env.VITE_APPLICATION_URL as string || appUrl;
  const host = urlToUse.endsWith("/") ? urlToUse.slice(0, urlToUse.length -1) : urlToUse;
  const previewImage = host + "/preview.png";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title}>
  <meta name="description" content={description}>
  <meta property="og:type" content="website">
  <meta property="og:url" content="{host}/">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={previewImage}>
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{host}/">
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
  <meta property="twitter:image" content={previewImage}>
</svelte:head>

<NoInstallPrompt />
<NewVersionNotification />

<slot />
<Notifications />
