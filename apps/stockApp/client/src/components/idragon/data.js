const getPortfolio = async () => {
		const res = await fetch('/api/idragon/portfolio')
		const json = await res.json()
		return json
}

export {
	getPortfolio
}