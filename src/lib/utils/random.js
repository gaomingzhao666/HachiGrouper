export const splitArrayRandomly = (arr) => {
	if (arr.length < 2) {
		throw new Error('At least two members in the array')
	}

	const shuffled = [...arr].sort(() => 0.5 - Math.random())
	const mid = Math.floor(shuffled.length / 2)

	return {
		leftArr: shuffled.slice(0, mid),
		rightArr: shuffled.slice(mid),
	}
}

