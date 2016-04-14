'use strict'
const npmName = require('is-taken')

module.exports = {
  pattern: /^\/npm\/([a-z\-]+)$/,
  handler(info, next) {
    npmName(info.param[1])
      .then(pkg => {
        if (pkg) {
          const author = (pkg.author && pkg.author.name) ?
            ` ${pkg.author.name} ` :
            ''
          const email = (pkg.author && pkg.author.email) ?
            `，联系 ${pkg.author.email} 看能不能要过来XD` :
            ''
          return next(null, `<a href="https://www.npmjs.com/package/${pkg.name}">${pkg.name}</a> 已经被${author}注册了${email}`)
        } else {
          return next(null, `颤抖吧！没被注册！`)
        }
      })
  }
}