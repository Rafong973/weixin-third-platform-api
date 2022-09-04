require('module-alias/register');
import BaseService from '@base/baseService';
import { } from '@schema/service/openhub';
import redisKey from '@util/redisKey'
import axios from 'axios';

import helper from '../extend/helper';

export default class OpenhubService extends BaseService {
	// 绑定到开放平台
	public async createOpenhub(appid: string) {
		let token = await this.getAppAccessToken(appid);
		let result: any = null;

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/cgi-bin/open/create?access_token=${token}`, {
				appid
			})
			let openAppid = helper.returnWxAPIResult(result);
			if (openAppid && openAppid.open_appid) {
				await this.ctx.model.weixinThirdPlatformModel.Openhub.create({
					openAppid: openAppid.open_appid,
					appid: appid,
					createdAppid: appid
				})
			}
		}

		return helper.returnWxAPIResult(result);
	}
	// 解绑
	public async unbindOpenhub(appid: string, openAppid: string) {
		let token = await this.getAppAccessToken(appid);
		let result: any = null;

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/cgi-bin/open/unbind?access_token=${token}`, {
				appid,
				open_appid: openAppid
			})
			let unbindResult = helper.returnWxAPIResult(result);
			if (unbindResult) {
				await this.ctx.model.weixinThirdPlatformModel.Openhub.destroy({
					where: {
						appid,
						openAppid
					}
				})
			}
		}
		return helper.returnWxAPIResult(result);
	}

	public async getOpenhubInfo(appid: string){
		let token = await this.getAppAccessToken(appid);
		let result: any = null;

		if(token){
			result = await axios.post(`https://api.weixin.qq.com/cgi-bin/open/get?access_token=${token}`)
		}
		return helper.returnWxAPIResult(result);
	}

	// 获取公众号/小程序AccessToken
	private async getAppAccessToken(appid: string) {
		const commonRedis = this.ctx.app.commonRedis;
		let token = await commonRedis.get(redisKey.wx3app.accessToken(appid));
		return token;
	}

	// 获取ComponentAccessToken
	private async getComponentAccessToken() {
		const commonRedis = this.ctx.app.commonRedis;
		const third = this.app.config.third;

		let token = await commonRedis.get(redisKey.wx3app.componentAccessToken(third.appid));
		return token;
	}
}