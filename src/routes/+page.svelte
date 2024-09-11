<script>
	import TotalMemberList from '$lib/components/TotalMemberList.svelte'
	import ModalAdd from '$lib/components/ModalAdd.svelte'
	import ModalDel from '$lib/components/ModalDel.svelte'
	import RealtimeShower from '$lib/components/RealtimeShower.svelte'
	import SeparatedMemberList from '$lib/components/SeparatedMemberList.svelte'
	import Count from '$lib/components/Count.svelte'
	import { splitArrayRandomly } from '$lib/utils/random'
	import { nonBalanceSplitArrayRandomly } from '$lib/utils/nonBalanceRandom'
	import { memberStore } from '$lib/utils/localstorage'
	import { invalidate } from '$app/navigation'
	import { getThemes } from '$lib/utils/getThemes'
	import { onMount } from 'svelte'

	let isFirstEntry = localStorage.getItem('isFirstEntry') || '1'

	const firstEntry = async () => {
		if (isFirstEntry) {
			await new Promise((resolve) => setTimeout(resolve, 500))
			window.location.reload()
		} else {
			isFirstEntry = false
			localStorage.setItem('isFirstEntry', '')
		}
	}

	onMount(firstEntry)

	let themes = getThemes
	let counts = parseInt(sessionStorage.getItem('count')) || 0

	const setTheme = (theme) => {
		const HTML = document.querySelector('[data-theme]') // Select the element
		HTML.dataset.theme = theme // Set the data-theme attribute to 'light'
	}

	const clearMembers = () => {
		$memberStore = []
		invalidate()
	}

	let myLeftArr = []
	let myRightArr = []

	const separateMemberList = (arr) => {
		const { leftArr, rightArr } = splitArrayRandomly(arr)

		myLeftArr = leftArr
		myRightArr = rightArr

		// count handle
		counts++
		sessionStorage.setItem('count', counts)

		invalidate()

		// history handle
		let historyTime = sessionStorage.getItem('history') || []
		sessionStorage.setItem(
			'historyTime',
			JSON.stringify([...historyTime, { time: getRealtime(), count: count }])
		)
	}

	const nonBalanceSeparateMemberList = (arr) => {
		const { leftArr, rightArr } = nonBalanceSplitArrayRandomly(arr)

		myLeftArr = leftArr
		myRightArr = rightArr

		// count handle
		counts++
		sessionStorage.setItem('count', counts)

		invalidate()

		// history handle
		let historyTime = sessionStorage.getItem('history') || []
		sessionStorage.setItem(
			'historyTime',
			JSON.stringify([...historyTime, { time: getRealtime(), count: count }])
		)
	}
</script>

<svelte:head>
	<title>小八分组器</title>
</svelte:head>

<div>
	<!-- member list and function buttons -->
	<div class="flex justify-around items-center">
		<TotalMemberList />

		<!-- crud functionalities buttons group -->
		<div>
			<div class="space-x-1">
				<button class="btn btn-info" onclick="addModal.showModal()"
					>添加成员</button
				>
				<button class="btn btn-error" onclick="delModal.showModal()"
					>删除成员</button
				>
				<button class="btn btn-error" on:click={() => clearMembers()}
					>清空成员</button
				>
			</div>

			<!-- group button -->
			<button
				class="btn btn-info btn-block my-1"
				on:click={() => separateMemberList($memberStore)}>红蓝队分组</button
			>

			<!-- non-balance group button -->
			<button
				class="btn btn-info btn-block mb-1"
				on:click={() => nonBalanceSeparateMemberList($memberStore)}
				>非对称分组</button
			>

			<!-- theme button -->
			<details class="dropdown w-full">
				<summary class="btn btn-info btn-block"> 主题 </summary>
				<ul
					class="overflow-auto menu dropdown-content bg-base-100 rounded-box h-72 flex-wrap z-[1] p-3 shadow"
				>
					{#each themes as item}
						<li>
							<button on:click={() => setTheme(item)}>{item}</button>
						</li>
					{/each}
				</ul>
			</details>

			<!-- refresh button -->
			<button
				class="btn btn-info btn-block my-1"
				on:click={() => window.location.reload()}>刷新</button
			>
		</div>
	</div>

	<!-- separated member list -->
	<SeparatedMemberList leftArr={myLeftArr} rightArr={myRightArr} />

	<!-- bottom section -->
	<div class="flex justify-center items-center space-x-24 mt-4 text-sm">
		<RealtimeShower />
		<Count count={counts} />
	</div>
</div>

<ModalAdd />
<ModalDel />
