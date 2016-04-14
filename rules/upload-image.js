'use strict'

module.exports = {
	pattern(info) {
		return !!info.param.picUrl
	},
	handler(info) {
		return info.param.picUrl
	}
}