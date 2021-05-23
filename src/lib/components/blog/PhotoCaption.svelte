<script lang="ts">
	export let url: string;
	export let caption: string;
	export let wider = false;
</script>

<div class={`${wider ? 'wider' : ''} mb-4`}>
	<img class="!my-2" src={url} alt={caption} />
	<div class="text-sm text-center">{caption}</div>
</div>
