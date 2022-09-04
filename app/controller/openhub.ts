require('module-alias/register');
import BaseController from '@base/baseController';
import { GET, HwController, Params, POST, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
'').split('.')[0].toLowerCase();

import { appidParams, openhubParams } from '@schema/controller/openhub';

@HwController(__CURCONTROLLER)
export default class OpenhubController extends BaseController {
	@GET('/info')
	@Query({
		appid: [String]
	})
	public async getOpenhubInfo(){
		let openhubService = this.ctx.service.openhub;
		let query: appidParams = this.ctx.filterQuery;

		let result = await openhubService.getOpenhubInfo(query.appid);

		this.returnSuccess(result)
	}

	@POST('/create')
	@Params({
		appid: [String]
	})
	public async createOpenhub(){
		let openhubService = this.ctx.service.openhub;
		let params: appidParams = this.ctx.filterParams;

		let result = await openhubService.createOpenhub(params.appid);

		this.returnSuccess(result);

	}

	// 解绑开放平台
	@POST('/unbind')
	@Params({
		appid: [String],
		openAppid: [String]
	})
	public async unbindOpenhub(){
		let openhubService = this.ctx.service.openhub;
		let params: openhubParams = this.ctx.filterParams;

		const{ appid, openAppid} = params;
		let result = await openhubService.unbindOpenhub(appid, openAppid);

		this.returnSuccess(result);

	}
}