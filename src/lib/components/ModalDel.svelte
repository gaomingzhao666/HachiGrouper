<script>
	import { memberStore } from '$lib/utils/localstorage'
	import { invalidate } from '$app/navigation'

	let message = ''
	let memberName = ''

	const delMember = (memberName) => {
		if (
			JSON.parse(localStorage.getItem('members')).find(
				(member) => member.memberName === memberName
			) === undefined
		) {
			addToast('成员不存在')
			return
		}

		if (memberName) {
			memberStore.update((data) =>
				data.filter((member) => member.memberName !== memberName)
			)
			addToast(memberName + '成员删除成功')
		} else addToast('成员姓名不能为空')

		invalidate()
	}

	const addToast = (givenMessage) => {
		const toast = document.querySelector('#toast')
		toast.classList.add('block')
		toast.classList.remove('hidden')
		message = givenMessage

		setTimeout(() => {
			toast.classList.add('hidden')
			toast.classList.remove('block')
		}, 3000)
	}
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="delModal" class="modal">
	<div class="modal-box">
		<h1 class="text-xl mb-3">删除成员</h1>

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

		<!-- modal button -->
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">取消</button>
				<button class="btn btn-info" on:click={() => delMember(memberName)}
					>添加</button
				>
			</form>
		</div>
	</div>
</dialog>

<div class="toast toast-end toast-bottom hidden" id="toast">
	<div class="alert alert-error">
		<span>{message}</span>
	</div>
</div>
