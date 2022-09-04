require('module-alias/register');
import BaseController from '@base/baseController';
import { DEL, GET, HwController, Params, POST, Query } from '@lib/hwRouter';
const __CURCONTROLLER = __filename.substr(__filename.indexOf('/app/controller')).replace('/app/controller',
	'').split('.')[0].toLowerCase();

import {
	IsNotEmpty,
} from 'class-validator';

import { setDomainParams } from '@schema/controller/domain';

@HwController(__CURCONTROLLER)
export default class DomainController extends BaseController {
	@GET('/service')
	@Query({
		state: [Number],
		appid: [String]
	})
	public async getServiceDomain() {
		let DomainService = this.ctx.service.domain;
		let query = this.ctx.filterQuery;
		const third = this.app.config.third;
		const appid = IsNotEmpty(query.appid) ? third.appid : query.appid;
		let result = await DomainService.getServiceDomain(appid, query.state);

		this.returnSuccess(result);
	}

	@POST('/set')
	@Params({
		domain: [Object],
		published: [Number],
		appid: [String]
	})
	public async setServiceDomain() {
		let DomainService = this.ctx.service.domain;
		const params: setDomainParams = this.ctx.filterParams;
		const third = this.app.config.third;
		let { published } = params;
		let domain: any = params.domain;
		let paramsAppid: any = params.appid;
		const appid = IsNotEmpty(paramsAppid) ? third.appid : params.appid;
		let action = 'add';
		let result = await DomainService.setServiceDomain(appid, action, domain, published);

		this.returnSuccess(result);
	}

	@DEL('/del')
	@Params({
		domain: [Object],
		published: [Number],
		appid: [String]
	})
	public async delServiceDomain() {
		let DomainService = this.ctx.service.domain;
		const params: setDomainParams = this.ctx.filterParams;
		const third = this.app.config.third;
		let { published } = params;
		let domain: any = params.domain;
		let paramsAppid: any = params.appid;
		const appid = IsNotEmpty(paramsAppid) ? third.appid : params.appid;
		let action = 'delete';
		let result = await DomainService.setServiceDomain(appid, action, domain, published);

		this.returnSuccess(result);
	}

}