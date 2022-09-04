function compose(...key: Array<string | number>) {
	return ['weixin_third_platform', ...key].join(':');
}

function wx3app(...key: Array<string | number>) {
	return ['w3app', ...key].join(':');
}

/**
 * wx相关
 */
compose.wx = function (...key: Array<string | number>) {
	return this('wx', ...key);
};

export default {
	injectEntrance: (entrance: string) => compose('entrance', entrance), // 配置入口
	wx: {
		accessToken: (appid: string) => compose.wx('accessToken', appid), // 缓存微信accessToken,
		ticketKey: (appid: string) => compose.wx('ticketKey', appid),
		refreshUserToken: (appid: string, openId: string) => compose.wx('refreshUserToken', appid, openId), // 用于刷新用户accessToken
		userToken: (appid: string, openId: string) => compose.wx('userToken', appid, openId), // 用于获取用户信息的accessToken
	},
	wx3app: {
		accessToken: (appid: string) => wx3app('authorizer_access_token', appid), // 缓存微信accessToken,
		refreshToken: (appid: string) => wx3app('authorizer_refresh_token', appid), // 缓存微信accessToken,
		componentVerifyTicket: (appid: string) => wx3app('component_verify_ticket', appid),
		componentAccessToken: (appid: string) => wx3app('component_access_token', appid),
		preAuthCode: (appid: string) => wx3app('pre_auth_code', appid),
	},
	verificationCode: (phone: string) => compose('verificationCode', phone), // 验证码
	gameConfig: () => compose('gameConfig')
};
