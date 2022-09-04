// 管理小程序业务
require('module-alias/register');
import BaseController from '@base/baseController';
import { GET,POST, HwController, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
'').split('.')[0].toLowerCase();

import {} from '@schema/controller/mpapp';

@HwController(__CURCONTROLLER)
export default class MpappController extends BaseController {


	@GET('/info')
	@Query({
		id: [ Number ]
	})
	public async getInfo(){

		const query = this.ctx.filterQuery;
		let mpapp = this.ctx.service.mpapp;
		let result = await mpapp.findOneById(query.id);

		this.returnSuccess(result);
	}

	@POST('/info')
	@Query({
		id: [ Number ]
	})
	public async updateInfo(){

		const query = this.ctx.filterQuery;
		let mpapp = this.ctx.service.mpapp;
		// let result = await mpapp.updateMiniProgramInfo(query);
		// this.returnSuccess(result);
	}
}