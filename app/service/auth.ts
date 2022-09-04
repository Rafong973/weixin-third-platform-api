// 小程序/公众号授权给第三方平台业务

require('module-alias/register');
import BaseService from '@base/baseService';
import { GetCodeQuery } from '@schema/service/auth';

import axios from 'axios';
axios.defaults.timeout = 5000;

export default class AuthService extends BaseService {

	// 获取授权码 - 将app存入数据库
	public async getAuthCode({ auth_code }: GetCodeQuery) {

		let config = this.ctx.app.config;

		const component_access_token = await this.ctx.app.commonRedis.get(this.ctx.redisKey.wx3app.componentAccessToken(config.third.appid));

		let data: any = {};

		try {
			let result = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token=${component_access_token}`, {
				component_appid: config.third.appid,
				authorization_code: auth_code,
			});
			data = result.data;
		} catch (error) {
			console.log(error);
		}

		console.log('/getAuthCode');
		console.log(data);

		if (data.authorization_info) {
			let info: any = this.filterAuthorizationModel(data.authorization_info);
			info.authorization_code = auth_code;
			data = await this.handleAuthorizationInfo(info);
		}

		return data;

	}

	// 获取令牌
	public async getComponentToken() {
		const config = this.ctx.app.config;

		// 拿到票据
		let ticket = await this.ctx.app.commonRedis.get(this.ctx.redisKey.wx3app.componentVerifyTicket(config.third.appid));
		let data: any = {};

		// 获取令牌
		try {
			let result = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/api_component_token`, {
				component_appid: config.third.appid,
				component_appsecret: config.third.secret,
				component_verify_ticket: ticket
			});
			data = result.data;
		} catch (error) {
			console.log(error);
		}
		console.log('/getComponentToken');
		console.log(data);

		// 保存到redis和数据库，异步处理
		if (data.component_access_token) {
			try {

				this.ctx.app.commonRedis.set(this.ctx.redisKey.wx3app.componentAccessToken(config.third.appid), data.component_access_token);
				this.ctx.model.weixinThirdPlatformModel.Third.update({
					component_access_token: data.component_access_token,
				}, {
					where: {
						appid: config.third.appid
					}
				})
			}
			catch (error) {
				console.log(error);
			}
		}
		return data;
	}

	// 刷新授权令牌
	public async refreshAuthorizationInfo() {

		console.log('/refreshAuthorizationInfo');

		let config = this.ctx.app.config;

		const component_access_token = await this.ctx.app.commonRedis.get(this.ctx.redisKey.wx3app.componentAccessToken(config.third.appid));

		// 获取授权状态正常的app列表
		let appList = await this.ctx.model.weixinThirdPlatformModel.AppAuth.findAll({
			where: {
				status: 1
			}
		});
		// 遍历刷新
		for (let app of appList) {
			let data: any = {};
			try {
				let result = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=${component_access_token}`, {
					component_appid: config.third.appid,
					authorizer_appid: app.appid,
					authorizer_refresh_token: app.refresh_token
				});
				data = result.data;
				console.log(data);
				if (data.authorizer_access_token) {
					this.ctx.app.commonRedis.set(this.ctx.redisKey.wx3app.accessToken(app.appid), data.authorizer_access_token);
					this.ctx.app.commonRedis.set(this.ctx.redisKey.wx3app.refreshToken(app.appid), data.authorizer_refresh_token);
					await this.ctx.model.weixinThirdPlatformModel.AppAuth.update({
						access_token: data.authorizer_access_token,
						expires_in: data.expires_in,
						refresh_token: data.authorizer_refresh_token
					}, {
						where: {
							appid: app.appid
						}
					})
				}
			} catch (error) {
				console.log(error);
			}
		}

		return {};
	}

	// 获取预授权码
	public async getPreAuthCode() {
		const config = this.ctx.app.config;

		const component_access_token = await this.ctx.app.commonRedis.get(this.ctx.redisKey.wx3app.componentAccessToken(config.third.appid));

		let data: any = {};

		// 获取预授权码
		try {
			let result = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token=${component_access_token}`, {
				component_appid: config.third.appid,
			});
			data = result.data;
		} catch (error) {
			console.log(data);
		}

		console.log('/getPreAuthCode');
		console.log(data);
		return data;
	}

	// 更新第三方平台票据
	public async updateThirdPlatformTicket(info: any){
		console.log('更新第三方平台票据')
		this.ctx.app.commonRedis.setex(this.ctx.redisKey.wx3app.componentVerifyTicket(info.AppId), 12 * 60 * 60 * 1000, info.ComponentVerifyTicket);
		console.log(info)
		let has = await this.ctx.model.weixinThirdPlatformModel.Third.findOne({ where : { appid: info.Appid }});
		console.log(has);
		if(has){
			console.log('更新第三方平台')
			this.ctx.model.weixinThirdPlatformModel.Third.update({
				component_verify_ticket: info.ComponentVerifyTicket
			},{
				where:{
					appid: info.AppId
				}
			})
		}else{
			console.log('创建第三方平台')
			this.ctx.model.weixinThirdPlatformModel.Third.create( {component_verify_ticket: info.ComponentVerifyTicket,appid: info.AppId })
			// 这里要顺便获取下令牌
			await this.getComponentToken();
		}
	}

	// 更新第三方平台和小程序公众号授权信息
	updateAuthorizationInfo(info: any) {

		// 保存推送日志
		let pushInfo: any = this.filterPushModel(info);
		this.ctx.model.weixinThirdPlatformModel.AuthMsgLog.create(pushInfo);

		let authorizationInfo: any = this.filterThirdPushModel(info);
		// 更新第三方平台的预授权码 —— 伪需求
		// this.ctx.model.weixinThirdPlatformModel.Third.update({ pre_auth_code: authorizationInfo.pre_auth_code }, {
		// 	where: {
		// 		appid: authorizationInfo.thirdAppId
		// 	}
		// });

		// 更新小程序或者公众号的授权码和状态
		this.handleAuthorizationInfo(authorizationInfo);

		return pushInfo;
	}

	// 更新小程序/公众号的授权状态
	async updateAuthorizationState(info: any){
		const { AuthorizerAppid, InfoType, func_info }: any = info;

		let newState: any = {
			status: InfoType == 'unauthorized' ? 0 : 1,
		}
		if(func_info){
			newState.func_info = JSON.stringify(func_info);
		}
		console.log('newState', newState)
		await this.ctx.model.weixinThirdPlatformModel.AppAuth.update(newState, {
			where: {
				appid: AuthorizerAppid
			}
		})
		return {};
	}


	// 处理授权，更新sql和redis
	public async handleAuthorizationInfo(info: any) {

		if (info.access_token) {
			this.ctx.app.commonRedis.setex(this.ctx.redisKey.wx3app.accessToken(info.appid), -1, info.access_token);
			this.ctx.app.commonRedis.setex(this.ctx.redisKey.wx3app.refreshToken(info.appid), -1, info.refresh_token);
		}

		let has = await this.ctx.model.weixinThirdPlatformModel.AppAuth.findOne({
			where: {
				appid: info.appid
			}
		})

		console.log(info);

		if (has) {
			try {
				this.ctx.model.weixinThirdPlatformModel.AppAuth.update(info, {
					where: {
						appid: info.appid
					}
				})
			} catch (error) {
				console.log(error)
				console.log('更新失败')
			}

		} else {
			if(info.appid !== undefined && info.appid !== 'undefined'){
				this.ctx.model.weixinThirdPlatformModel.AppAuth.create(info);
			}

		}

		return info;
	}

	// 授权信息映射表
	private filterAuthorizationModel(info: any) {
		return {
			appid: info.authorizer_appid,
			access_token: info.authorizer_access_token,
			expires_in: info.expires_in,
			refresh_token: info.authorizer_refresh_token,
			func_info: JSON.stringify(info.func_info)
		}
	}
	// 推送信息映射表
	private filterPushModel(info: any) {
		return {
			appid: info.AuthorizerAppid || info.ToUserName,
			info_type: info.InfoType || info.MsgType,
			result: JSON.stringify(info),
			input: 'xml'
		}
	}
	// 推送给第三方授权信息更新映射表
	private filterThirdPushModel(info: any) {
		let value: any = {
			thirdAppId: info.AppId,
			appid: info.AuthorizerAppid,
			authorization_code: info.AuthorizationCode,
			pre_auth_code: info.PreAuthCode,
			expires_in: info.AuthorizationCodeExpiredTime,
			status: info.InfoType == 'unauthorized' ? 1 : 0
		}
		return value;
	}
}