require('module-alias/register');
import BaseController from '@base/baseController';
import { HwController, GET, POST } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller', '').split('.')[0].toLowerCase();

@HwController(__CURCONTROLLER)
export default class wxController extends BaseController {
	// 返回微信校验文件
	public async vaildateFile(){
		this.returnSuccess(this.config.third.ValidityText, true)
	}


	@POST('/bind/developer')
	public async bindDeveloper(){

	}
}
