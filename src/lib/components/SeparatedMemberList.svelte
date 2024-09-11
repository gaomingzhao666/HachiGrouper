<script>
	export let leftArr = []
	export let rightArr = []
</script>

<div class="flex justify-around items-center mt-5 space-x-5">
	<!-- red / left team -->
	<div class="card w-96 min-h-56 shadow-md bg-base-100 rounded-xl">
		<div class="card-body">
			<h3 class="card-title">红队成员列表</h3>

			{#each leftArr as item}
				<div class="flex justify-around items-center">
					<p>{item.memberName}</p>
					<button class="btn btn-sm w-32">{item.profession}</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- blue / right team -->
	<div class="card bg-base-100 w-96 shadow">
		<div class="card w-96 min-h-56 shadow-md bg-base-100 rounded-xl">
			<div class="card-body">
				<h3 class="card-title">蓝队成员列表</h3>

				{#each rightArr as item}
					<div class="flex justify-around items-center">
						<p>{item.memberName}</p>
						<button class="btn btn-sm w-32">{item.profession}</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
