<script>
	import { memberStore } from '$lib/utils/localstorage'
	import { invalidate } from '$app/navigation'

	let memberName = ''
	let profession = ''

	const addMember = (memberName, profession) => {
		if (memberName === '') showNotification('error', '成员姓名不能为空')
		memberStore.update((data) =>
			profession
				? [...data, { memberName, profession }]
				: [...data, { memberName, profession: '未指定' }]
		)

		invalidate('/')
	}
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="addModal" class="modal">
	<div class="modal-box">
		<h1 class="text-xl mb-3">添加成员</h1>

		<!-- input name-->
		<label class="form-control w-full mb-3">
			<div class="label">
				<span class="label-text">成员姓名</span>
			</div>
			<input
				type="text"
				placeholder="小八猫"
				class="input input-info input-bordered w-full"
				bind:value={memberName}
			/>
		</label>

		<!-- input profession -->
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">成员职业</span>
				<span class="label-text-alt">可选</span>
			</div>
			<input
				type="text"
				placeholder="破烂剑魂"
				class="input input-info input-bordered w-full"
				bind:value={profession}
			/>
		</label>

		<!-- modal button -->
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">取消</button>
				<button
					class="btn btn-info"
					on:click={() => addMember(memberName, profession)}>添加</button
				>
			</form>
		</div>
	</div>
</dialog>
