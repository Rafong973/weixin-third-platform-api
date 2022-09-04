import { DefaultConfig, getSqlConfig, getRedisConfig } from './config.default';

export default () => {
	const config: DefaultConfig = {};

	config.jwtSecret = process.env.JWT_SECRET || 'kp134bu5ole';
	config.jwtAdminSecret = process.env.JWT_ADMIN_SECRET || 'a7s9dfafs8f';
	config.injectSecret = process.env.INJECT_SECRET || '24haowan@token&24haowan';
	config.setGameConfigSecret = 'meiwayGameConfig';
	config.scheduleEnable = true;


	config.sequelize = {
		datasources: [
			getSqlConfig({
				host: 'rm-wz9q8877yj8x884e7.mysql.rds.aliyuncs.com',
				username: 'super',
				password: 'jklkfs90KKfds_8899342rf',
				delegate: "model.weixinThirdPlatformModel",
				baseDir: "model/weixinThirdPlatform",
				database: "weixin_third_platform"
			})
		]
	};

	config.redis = {
		clients: {
			common: getRedisConfig({
				host: 'r-wz9zbsklbq60v5jyzi.redis.rds.aliyuncs.com',
				password: 'fs90348_Dkl98023lzx',
				db: 5
			}),
		}
	};

	config.logger = {
		dir: './logs',
		level: 'INFO'
	};

	config.third = {
		appid: 'wx4701d7043201ff21',
		secret: '07f419db818244a2d76c2442d0dcd520',
		homePage: 'https://wx.meiway.cc/auth/code'
	}

	return config;
};
