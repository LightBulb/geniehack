'use strict'
const Fs = require('fs')
const Path = require('path')
const home = require('user-home')
const express = require('express')
const webot = require('weixin-robot')
const uniqueRandomArray = require('unique-random-array')
const mkdirp = require('mkdirp')
const unixRules = require('./rules/unix')
const ruleNpmName = require('./rules/npm-name')
const ruleSaikou = require('./rules/saikou')
const ruleUploadImage = require('./rules/upload-image')

const app = express()

webot.set('hello', [
	'你也好啊',
	'你好哇',
	'你全家都好哇'
])

webot.set('npm name', ruleNpmName)
webot.set('saikou', ruleSaikou)
webot.set('upload image', ruleUploadImage)
webot.set('ls', unixRules.ls)
webot.set('whoami', unixRules.whoami)

webot.set('subscribe', {
  pattern(info) {
    return info.is('event') && info.param.event === 'subscribe'
  },
  handler(info) {
		mkdirp.sync(Path.join(home, `dev/geniehack-static/user-${info.uid}`))
    return '欢迎订阅阵列猫的微信机器人，我们不草粉。乱输内容就可以随机获取 Tip!'
  }
})

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
