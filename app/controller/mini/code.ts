// 代码管理
require('module-alias/register');
import BaseController from '@base/baseController';
import { GET, HwController, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();

import { trialQrCodeParams, appIdParams } from '@schema/controller/mini';
import { Validate } from 'class-validator-helper';

@HwController(__CURCONTROLLER)
export default class CodeController extends BaseController {
	// 获取体验版二维码
	@GET('/trial/qrcode')
	@Query({
		path: [String],
		appid: [String]
	})
	public async getTrialQrCode() {
		let miniProgramService = this.ctx.service.miniprogram;
		let query: trialQrCodeParams = this.ctx.filterQuery;

		let { path, appid } = query;
		path = encodeURIComponent(path);

		let result = await miniProgramService.getTrialQrCode(appid, path);

		this.returnSuccess(result)
	}
	// 获取已上传的代码的页面列表
	@GET('/page')
	@Query({
		appid: [String]
	})
	public async getAppIdPage(){
		let miniProgramService = this.ctx.service.miniprogram;
		let query: appIdParams = this.ctx.filterQuery;

		const { appid } = query;

		let result = await miniProgramService.getAppPage(appid);

		this.returnSuccess(result)
	}
}