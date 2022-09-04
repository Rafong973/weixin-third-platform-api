// 草稿箱管理
require('module-alias/register');
import BaseController from '@base/baseController';
import { HwController, GET, POST ,Params } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();

import { addToTemplateParams } from '@schema/controller/mini'

@HwController(__CURCONTROLLER)
export default class DraftController extends BaseController {
	// 获取草稿箱
	@GET('/list')
	public async getTemplate() {
		const MiniprogramService = this.ctx.service.miniprogram;

		let result = await MiniprogramService.getDraftList();

		this.returnSuccess(result);
	}
	// 提交草稿箱进行审核
	@POST('/addtotemplate')
	@Params({
		draftId: [Number],
		type: [Number]
	})
	public async addToTemplate() {
		const MiniprogramService = this.ctx.service.miniprogram;

		const params: addToTemplateParams = this.ctx.filterParams;
		const { draftId, type } = params;

		let result = await MiniprogramService.addToTemplateMethod(draftId, type);

		this.returnSuccess(result)
	}
}