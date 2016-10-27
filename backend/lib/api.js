const KoaRouter = require('koa-router');
const apiRouter = new KoaRouter({ prefix: '/api' });
const glob = require('glob');
const path = require('path');
// const config = require('../config');
const database = require('./database');

glob.sync(path.join(__dirname, '../controllers/*.js')).forEach(dep => {
  let controller = require(dep);
  for (let method of [ 'options', 'get', 'post', 'delete', 'put', 'patch' ]) {
    if (method in controller) {
      apiRouter[method](controller.url, database, async (ctx, next) => {
        return controller[method](ctx).then(next);
      });
    }
  }
});

module.exports = apiRouter.routes();
