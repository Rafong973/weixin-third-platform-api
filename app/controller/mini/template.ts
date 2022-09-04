// 模板
require('module-alias/register');
import BaseController from '@base/baseController';
import { HwController, GET, Query, Params, DEL } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();

import { templateTypeParams, templateIdParams } from '@schema/controller/mini'

@HwController(__CURCONTROLLER)
export default class TemplateController extends BaseController {
	// 获取代码模板列表
	@GET('/list')
	@Query({
		type: [Number]
	})
	public async getTemplateList() {
		const MiniprogramService = this.ctx.service.miniprogram;
		const query: templateTypeParams = this.ctx.filterQuery;

		let result = await MiniprogramService.getTemplateList(query.type);

		this.returnSuccess(result)
	}

	// 删除代码模板
	@DEL('/')
	@Params({
		templateId: [Number],
	})
	public async deleteTemplate() {
		const MiniprogramService = this.ctx.service.miniprogram;
		const params: templateIdParams = this.ctx.filterParams;

		let result = await MiniprogramService.deleteTemplateById(params.templateId);

		this.returnSuccess(result)
	}

}