'use strict'
const Fs = require('fs')
const express = require('express')
const webot = require('weixin-robot')
const uniqueRandomArray = require('unique-random-array')
const ruleNpmName = require('./rules/npm-name')
const ruleSaikou = require('./rules/saikou')
const ruleUploadImage = require('./rules/upload-image')

const app = express()

webot.set('hello', [
	'你也好啊',
	'你好哇'
])

webot.set('npm name', ruleNpmName)
webot.set('saikou', ruleSaikou)
webot.set('upload image', ruleUploadImage)

webot.set('wildcard', {
	pattern: null,
	handler() {
		return readHelp()
	}
})

webot.watch(app, {
	token: process.env.WECHAT_TOKEN,
	path: '/wechat'
})

function readHelp() {
	return 'Tip:\n\n' + uniqueRandomArray(Fs.readFileSync('./help.txt', 'utf8').split('---'))().trim()
}

app.listen(3099, () => {
	console.log('Listening at http://localhost:3099')
})