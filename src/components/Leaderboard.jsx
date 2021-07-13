import { useEffect, useState } from 'react'

const mergeAndSortArray = arr => {
	const mergedEntriesIntoObject = arr.reduce((acc, val) => {
		const key = val.name.toLowerCase()
		if (key in acc) {
			acc[key] = { ...acc[key], score: acc[key].score + val.score }
		} else {
			acc[key] = val
		}
		return acc
	}, {})
	const sortedArrayByHighScore = Object.values(mergedEntriesIntoObject).sort(
		(a, b) => a.score < b.score
	)
	return sortedArrayByHighScore
}

function Leaderboard({ lsKey }) {
	const [leaderboard, setLeaderboard] = useState(null)

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem(lsKey)) || null
		if (!localStorageData) return
		setLeaderboard(mergeAndSortArray(localStorageData))
	}, [lsKey])

	return (
		<div className='leaderboard'>
			<h1>Leaderboard 🏆</h1>
			<ul>
				{leaderboard ? (
					leaderboard.map((player, idx) => (
						<li key={player.id}>
							{idx === 0 && '🥇 '}
							{idx === 1 && '🥈 '}
							{idx === 2 && '🥉 '}
							{player.name} - {player.score}
						</li>
					))
				) : (
					<li>No scores yet!</li>
				)}
			</ul>
		</div>
	)
}

export default Leaderboard
