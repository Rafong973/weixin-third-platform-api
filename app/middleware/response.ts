import { Context } from 'egg';

export default function errorMiddlewre() {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      ctx.custom = {};
      await next();
      if (ctx.state.isdownloadCsv) {
        return;
      }
      if (ctx.customBody) {
        return;
      }
      if (ctx.status === 404) {
        throw ctx.customError.GENERAL.NOT_FOUND('接口不存在或methods错误');
      }
      if (ctx.state.html) {
        ctx.set('Content-Type', 'text/html; charset=utf8');
        ctx.status = ctx.status || 200;
        return;
      }
      ctx.status = ctx.status || 200;
      ctx.body = Object.assign({
        payload: ctx.body || {}
      }, {
        code: 0
      });
    } catch (err) {
      let error = err;
      if (typeof err === 'function') {
        const obj = err();
        // 是自定义错误，自定义错误可能是函数
        if (obj.statusCode && obj.data) {
          error = obj;
        }
      }

      if (error.type === 'business') { // 自定义的业务错误
        ctx.logger.error(error);
        ctx.body = Object.assign({
          payload: ctx.body || {}
        }, error.data);
      } else if (error.type === 'system') {// 自定义的系统错误
        ctx.logger.error(error);
        ctx.status = error.statusCode;
        ctx.body = Object.assign({
          payload: ctx.body || {}
        }, error.data);
      } else {// 非自定义错误
        // 在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', error, ctx);
        const SERVER_ERROR = ctx.customError.GENERAL.SERVER_ERROR;
        ctx.status = SERVER_ERROR.statusCode;
        ctx.body = Object.assign({
          payload: ctx.body || {}
        }, { code: 500, msg: error.message });
      }
    }
  };
}
