'use strict'
const Path = require('path')
const userhome = require('user-home')
const child = require('child_process')
const $ = require('shelljs')
const unix = module.exports = {}

const home = (openId, more) => {
  return Path.join(userhome, `dev/geniehack-static/user-${openId}`)
}

unix.ls = {
  pattern: /^ls$/,
  handler(info, next) {
    try {
      const ret = $.ls('-R', home(info.uid))
      if (Array.isArray(ret)) {
        next(null, ret.join('\n') || '空目录')
      } else {
        next(null, ret)
      }
    } catch (e) {
      next(null, e.stack)
    }
  }
}

unix.whoami = {
  pattern: /^whoami$/,
  handler(info, next) {
    child.exec('whoami', (error, stdout) => {
      next(null, stdout)
    })
  }
}
