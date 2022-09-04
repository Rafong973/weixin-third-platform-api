// 成员管理
require('module-alias/register');
import BaseController from '@base/baseController';
import { DEL, GET, HwController, Params, POST, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();

import { bindAppMemberParams, appIdParams } from '@schema/controller/mini';

@HwController(__CURCONTROLLER)
export default class MemberController extends BaseController {
	// 绑定成员
	@POST('/bind')
	@Params({
		appid: [String],
		wechatIds: [Object]
	})
	public async bindMember() {
		let miniprogramService = this.ctx.service.miniprogram;
		let params: bindAppMemberParams = this.ctx.filterParams;

		const { appid, wechatIds } = params;
		let count = 0;

		for (let index in wechatIds) {
			const wechatid = wechatIds[index]
			let result: any = await miniprogramService.bindAppMember(appid, wechatid)
			if (result) count += 1;
		}
		this.returnSuccess(count);
	}
	// 成员列表
	@GET('/')
	@Query({
		appid: [String]
	})
	public async getMember() {
		let miniprogramService = this.ctx.service.miniprogram;

		let query: appIdParams = this.ctx.filterQuery;

		let result = await miniprogramService.getMemberList(query.appid);

		this.returnSuccess(result);
	}
	// 删除成员
	@DEL('/del')
	@Params({
		appid: [String],
		wechatIds: [Object]
	})
	public async delMemberList() {
		let miniprogramService = this.ctx.service.miniprogram;
		let params: bindAppMemberParams = this.ctx.filterParams;
		const { appid, wechatIds } = params;
		let count = 0;
		for (let index in wechatIds) {
			const wechatid = wechatIds[index]
			let result: any = await miniprogramService.delMember(appid, wechatid)
			if (result) count += 1;
		}
		this.returnSuccess(count);
	}

}