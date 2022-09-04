// 设置
require('module-alias/register');
import BaseController from '@base/baseController';
import { GET, HwController, Params, POST, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();


import { appIdParams, doMainParams, appInfoParams } from '@schema/controller/mini';

@HwController(__CURCONTROLLER)
export default class SetupController extends BaseController {

	@GET('/info')
	@Query({
		appid: [String],
		state: [Number]
	})
	public async getAppInfo() {
		const miniprogramService = this.ctx.service.miniprogram;
		let query: appInfoParams = this.ctx.filterQuery;

		let result = await miniprogramService.getAppInfo(query.appid, query.state);

		this.returnSuccess(result);
	}

	// 获取域名列表
	@GET('/server/domain')
	@Query({
		appid: [String]
	})
	public async getServerDomain() {
		const miniprogramService = this.ctx.service.miniprogram;
		let query: appInfoParams = this.ctx.filterQuery;

		let result = await miniprogramService.getServerDomain(query.appid, query.state);

		this.returnSuccess(result)

	}
	// 添加域名
	@POST('/server/domain')
	@Params({
		appid: [String],
		domain: [Object]
	})
	public async postServerDomain() {
		const miniprogramService = this.ctx.service.miniprogram;

		const params: doMainParams = this.ctx.filterParams;
		const { appid, domain } = params;

		let result = await miniprogramService.setServerDomain(appid, domain);

		this.returnSuccess(result)
	}

	// 添加业务域名
}