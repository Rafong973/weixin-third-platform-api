import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { Options } from 'sequelize/types/lib/sequelize'
import { EggRedisOptions, ClusterOptions } from 'egg-redis'
import { Secret } from 'jsonwebtoken'
import { Op } from 'sequelize'
const path = require('path')

export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

export type sequelizeOptions = Options & { delegate: string; baseDir: string }

export interface BizConfig {
  sequelize:
    | {
        datasources: sequelizeOptions[]
      }
    | sequelizeOptions
  redis: EggRedisOptions
  logrotator: any
  jwtSecret: Secret
  jwtAdminSecret: Secret
  injectSecret: Secret
  setGameConfigSecret: Secret
  monk: {
    database: string | string[]
  }
}

export function getSqlConfig(options: sequelizeOptions) {
  const baseConfig = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || '47.115.48.3',
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123abcRoot',
    port: 3306,
    timezone: '+08:00',
    define: {
      // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      underscored: true,
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true
    },
    dialectOptions: new Object({
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast(field: any, next: any) {
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    }),
    pool: {
      max: 320,
      min: 0,
      acquire: 1000 * 1000
    },
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col
    }
  }
  return Object.assign(baseConfig, options)
}

export function getRedisConfig(options: ClusterOptions) {
  const baseConfig = {
    port: 6379,
    host: process.env.REDIS_HOST || 'mwtest29.redis.rds.aliyuncs.com',
    password: process.env.REDIS_PASSWORD || '123abcRoot',
    db: 13
  }
  return Object.assign(baseConfig, options)
}

export default (appInfo: EggAppInfo) => {
  const config: DefaultConfig = {}

  config.view = {
    root: [path.join(appInfo.baseDir, 'app/view')].join(','),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
      '.nj': 'nunjucks'
    }
  }

  config.projectName = 'weixin-third-platform'

  config.security = {
    csrf: {
      enable: false
    }
  }

  // 覆盖框架，插件的配置
  config.keys = appInfo.name + '_egg_ts_base_api'

  // 统一使用中间件处理返回值以及异常错误包装
  config.middleware = ['response']

  // 按小时切割日志信息
  config.logrotator = {
    filesRotateByHour: [
      path.join(appInfo.root, 'logs', appInfo.name, `${appInfo.name}-web.log`),
      path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log')
    ]
  }

  config.multipart = {
    mode: 'file',
    fileExtensions: [''],
    fileSize: '100mb'
  }

  config.cors = {
    credentials: true,
    origin: (ctx) => ctx.get('origin'),
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  config.aliyunOSS = {
    accessKeyId: '',
    secretAccessKey: '',
    endpoint: 'http://oss-cn-shenzhen.aliyuncs.com',
    apiVersion: '2013-10-15',
    host: 'https://static.meiway.cc',
    bucket: 'mw-statics',
    region: 'oss-cn-shenzhen'
  }

  config.third = {
    appid: 'wx31a3738e0e2da751',
    secret: '12ecf397ce4a9a427b6696643bc08a70',
    token: 'meiwaycustom',
    key: 'Z8BSSrP9PVQJdQpZVvIqtHhdYH8699kuscRxpGwRzIp',
    ValidityText: 'b7cb50fcac6c0a09a3164039b1cd1877',
    ValidityFile: '3239337313.txt'
  }
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml']
    }
  }

  return {
    ...config
  }
}
