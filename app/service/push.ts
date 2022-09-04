require('module-alias/register');
import BaseService from '@base/baseService';
import { } from '@schema/service/push';
import axios from 'axios';
axios.defaults.timeout = 5000;

export default class PushService extends BaseService {

	public async savePushMsg(xml: any) {

		let result: any = null;

		result = await this.ctx.helper.parseString(xml);
		console.log(result)

		let decryptXML = await this.ctx.service.wxAES.decrypt(result.Encrypt);
		let decryptValue: any = await this.ctx.helper.parseString(decryptXML);


		if (decryptValue.InfoType === 'component_verify_ticket') {
			this.ctx.service.auth.updateThirdPlatformTicket(decryptValue);
			this.ctx.model.weixinThirdPlatformModel.AuthMsgLog.create({
				appid: decryptValue.AppId,
				info_type: decryptValue.InfoType,
				result: JSON.stringify(decryptValue),
				input: 'xml'
			})

		}

		if (decryptValue.InfoType.includes('authorized')) {
			console.log('取消授权')
			this.ctx.service.auth.updateAuthorizationState(decryptValue);
			this.ctx.model.weixinThirdPlatformModel.AuthMsgLog.create({
				appid: decryptValue.AuthorizerAppid,
				info_type: decryptValue.InfoType,
				result: JSON.stringify(decryptValue),
				input: 'xml'
			})
		}

		return result;
	}

	// 开启推送服务
	public async startPush() {

		const config = this.ctx.app.config;

		const { data } = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/api_start_push_ticket`, {
			component_appid: config.third.appid,
			component_secret: config.third.secret
		});

		console.log('/start')
		console.log(data);

		if (data.errcode != 0) throw data.errmsg;

		return {}
	}
}