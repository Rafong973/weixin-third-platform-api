import { DefaultConfig, getSqlConfig, getRedisConfig } from './config.default';

export default () => {
	const config: DefaultConfig = {};
	config.jwtSecret = 'kp134bu5ole';
	config.jwtAdminSecret = 'a7s9dfafs8f';
	config.injectSecret = '24haowan@token&24haowan';
	config.setGameConfigSecret = 'meiwayGameConfig';
	config.scheduleEnable = true;

	config.sequelize = {
		datasources: [
			getSqlConfig({
				delegate: "model.weixinThirdPlatformModel",
				baseDir: "model/weixinThirdPlatform",
				database: "weixin_third_platform"
			})
		]
	};

	config.redis = {
		clients: {
			common: getRedisConfig({ db: 13 })
		}
	};

	config.logger = {
		dir: './logs',
		level: 'WARN'
	};

	config.third = {
		homePage: 'http://wxtest.meiway.cc/auth/code'
	}

	return config;
};
