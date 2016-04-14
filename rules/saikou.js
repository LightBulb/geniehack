'use strict'
const saikou = require('saikou')

module.exports = {
	pattern: /^\/saikou$/,
	handler(info, next) {
		const chance = Math.round(Math.random(0,1))
		if (chance === 0) {
			next(null, saikou())
		} else if (chance === 1) {
			saikou.h()
				.then(meme => {
					const append = meme.source ? ` ——${meme.source}` : ''
					next(null, `${meme.hitokoto}${append}`)
				})
				.catch(e => {
					next(null, e.message)
				})
		} else {
			return chance
		}
	}
}