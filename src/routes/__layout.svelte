<script lang="ts">
  import '../service-worker-handler';
  import '../global.css';
  import Notifications from '$lib/components/notification/Notifications.svelte';
  import NoInstallPrompt from '$lib/components/NoInstallPrompt.svelte';
  import NewVersionNotification from '$lib/components/NewVersionNotification.svelte';
  // import Install from './components/Install.svelte';
</script>

<svelte:head>
  <title>conquest.eth - An unstoppable game of open-ended war and diplomacy running on Ethereum</title>
</svelte:head>

<NoInstallPrompt />
<NewVersionNotification />

<slot />
<Notifications />
