<script>
	import { memberStore } from '$lib/utils/localstorage'
	let members = JSON.parse(localStorage.getItem('members') || '[]')
	let isMembers = members.length > 0
</script>

<div class="card bg-base-100 w-96 min-h-72 shadow-md">
	<div class="card-body">
		<h3 class="card-title">全部成员列表</h3>
		{#if !isMembers}
			<p>没有成员</p>

			<div></div>
		{:else}
			{#each $memberStore as item}
				<div class="flex justify-around items-center">
					<p>{item.memberName}</p>
					<button class="btn btn-sm w-32">{item.profession}</button>
				</div>
			{/each}
		{/if}
	</div>
</div>
