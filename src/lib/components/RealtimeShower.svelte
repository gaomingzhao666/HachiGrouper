<script>
	import { getRealtime } from '$lib/utils/getRealtime'

	let realtime = getRealtime()

	setInterval(() => {
		realtime = getRealtime()
	}, 1000)
</script>

<div class="text-center">
	<h1>实时时间</h1>
	<h2>{realtime}</h2>
</div>
