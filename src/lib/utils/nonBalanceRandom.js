export const nonBalanceSplitArrayRandomly = (arr) => {
	const shuffled = [...arr].sort(() => 0.5 - Math.random())
	const mid = Math.floor(shuffled.length / 2) + Math.floor(Math.random() * 2) - 1

	if (mid === 0) {
		return splitArrayRandomly(arr)
	}

	return {
		leftArr: shuffled.slice(0, mid),
		rightArr: shuffled.slice(mid),
	}
}