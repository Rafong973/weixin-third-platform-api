// 授权业务逻辑，大部分用于测试
require('module-alias/register');
import BaseController from '@base/baseController';
import { GET, HwController, POST, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();

import { GetCodeQuery } from '@schema/controller/auth';

@HwController(__CURCONTROLLER)
export default class AuthController extends BaseController {

	@GET('/index')
	public async returnIndex() {

		let appid = this.ctx.app.config.third.appid;
		let info:any = await this.ctx.service.auth.getPreAuthCode();

		this.ctx.locals = {
			pre_auth_code: info.pre_auth_code, appid,
			url: this.config.third.homePage
		}

		let page = await this.ctx.renderView('auth/index.tpl', this.ctx.locals);

		this.returnSuccess(page, true)
	}

	@GET('/code')
	@Query({
		auth_code: [String],
		expires_in: [Number]
	})
	public async getAuthCode() {
		let auth = this.ctx.service.auth;

		const query: GetCodeQuery = this.ctx.filterQuery;

		let appInfo: any = await auth.getAuthCode(query);

		if(appInfo.access_token){
			// 创建app信息表
			appInfo = await this.ctx.service.mpapp.handleMpAppByAuthCode(appInfo)
		}
		console.log(appInfo)

		this.returnSuccess('授权成功',true);
	}

	@POST('/component')
	public async getComponentToken(){
		let result = await this.ctx.service.auth.getComponentToken();
		this.returnSuccess(result)
	}

	@POST('/preauthcode')
	public async getPreAuthCode(){
		let result = await this.ctx.service.auth.getPreAuthCode();
		this.returnSuccess(result)
	}

	@POST('/refresh')
	public async refreshToken() {

		await this.ctx.service.auth.refreshAuthorizationInfo();
		this.returnSuccess({});
	}

}