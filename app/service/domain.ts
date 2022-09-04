require('module-alias/register');
import BaseService from '@base/baseService';
import { } from '@schema/service/domain';
import axios from 'axios';
import redisKey from '@util/redisKey'
import helper from '../extend/helper';

export default class DomainService extends BaseService {
	// 获取域名列表
	public async getServiceDomain(appid: string, state: number) {
		let result: any = null;
		let value:any = null;
		if (state === 0) {
			result = await this.ctx.model.weixinThirdPlatformModel.ThirdDomain.findOne({
				where: {
					appid: appid
				}
			})
			value = this.filterDomainReturn(result);
		} else {
			let token = await this.ctx.getComponentAccessToken(appid);
			if (token) {
				result = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/modify_wxa_server_domain?access_token=${token}`, {
					action: 'get'
				})
				console.log(result.data)
			}
			if (result && result.data) {
				let record = await this.ctx.model.weixinThirdPlatformModel.ThirdDomain.findOne({
					where: {
						appid
					}
				})
				if (record) {
					await this.ctx.model.weixinThirdPlatformModel.ThirdDomain.update(this.filterDomainKey(result.data), {
						where: {
							appid
						}
					})
				} else {
					await this.ctx.model.weixinThirdPlatformModel.ThirdDomain.create({
						appid,
						...this.filterDomainKey(result.data)
					})
				}
			}
			value = this.filterDomainAPIReturn(result.data);
		}
		return value;
	}
	// 设置/删除域名
	public async setServiceDomain(appid: string, action: string, domain: Array<string>, published: number) {
		let token = await this.ctx.getComponentAccessToken(appid);
		let result: any = null;
		let value: any = null;
		if (token) {
			let wxa_server_domain = domain.join(';')
			wxa_server_domain = wxa_server_domain.slice(0, wxa_server_domain.length);
			result = await axios.post(`https://api.weixin.qq.com/cgi-bin/component/modify_wxa_server_domain?access_token=${token}`, {
				action,
				wxa_server_domain,
				is_modify_published_together: published === 1 ? true : false
			})
			value = await this.getServiceDomain(appid, 1);
		}
		return value;
	}

	private filterDomainKey(result: any) {
		const { published_wxa_server_domain, testing_wxa_server_domain } = result;
		let push_domain = published_wxa_server_domain.split(';')
		let test_domain = testing_wxa_server_domain.split(';')
		return {
			pushDomain: JSON.stringify(push_domain),
			testDomain: JSON.stringify(test_domain)
		}
	}
	private filterDomainReturn(result: any){
		const { pushDomain, testDomain, } = result;
		return {
			published_wxa_server_domain: pushDomain,
			testing_wxa_server_domain: testDomain
		}
	}
	private filterDomainAPIReturn(result:any){
		const { published_wxa_server_domain, testing_wxa_server_domain } = result;
		let push_domain = published_wxa_server_domain.split(';')
		let test_domain = testing_wxa_server_domain.split(';')
		return {
			published_wxa_server_domain: push_domain,
			testing_wxa_server_domain: test_domain
		}
	}
}