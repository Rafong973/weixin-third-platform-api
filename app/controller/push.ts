// 消息推送业务

require('module-alias/register');
import BaseController from '@base/baseController';
import { HwController, POST, PUT } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
'').split('.')[0].toLowerCase();


import {} from '@schema/controller/push';

@HwController(__CURCONTROLLER)
export default class PushController extends BaseController {

	@POST('/start')
	public async startPush(){
		const push = this.ctx.service.push;

		await push.startPush();

		this.returnSuccess({})
	}

	@POST('/msg')
	public async acceptMsg(){
		console.log('一般推送');
		const push = this.ctx.service.push;

		let xml = this.ctx.request.body;

		await push.savePushMsg(xml);

		this.returnSuccess('success', true);

	}

	// 授权更新推送
	@POST('/:appid/msg')
	public async getMsgByAppId(){
		console.log('app推送');
		let xml = this.ctx.request.body;

		let result: any = null;
		result = await this.ctx.helper.parseString(xml);

		let decryptXML = await this.ctx.service.wxAES.decrypt(result.Encrypt);
		let decryptValue: any = await this.ctx.helper.parseString(decryptXML);

		if(decryptValue){
			await this.ctx.service.auth.updateAuthorizationInfo(decryptValue)
		}

		this.returnSuccess('success', true);
	}
}