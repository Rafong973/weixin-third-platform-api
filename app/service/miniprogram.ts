require('module-alias/register');
import BaseService from '@base/baseService';
import redisKey from '@util/redisKey'
import helper from '../extend/helper';

import axios from 'axios';
const fs = require('fs');
const path = require('path');

export default class MiniprogramService extends BaseService {
	// 获取基本信息
	public async getAppInfo(appid: string, state?: number) {
		let value: any = null;
		if (!state) state = 0;
		if (state === 0) {
			value = await this.ctx.model.weixinThirdPlatformModel.AppModel.findOne({
				where: {
					appid
				}
			})
		} else {
			let result: any = null;
			let token = await this.ctx.getAppAccessToken(appid)
			let mpappService = this.ctx.service.mpapp;

			if (token) {
				result = await axios.get(`https://api.weixin.qq.com/cgi-bin/account/getaccountbasicinfo?access_token=${token}`)
				value = helper.returnWxAPIResult(result);
			}
			if (value && value.appid) {
				let record = await this.ctx.model.weixinThirdPlatformModel.AppModel.findOne({
					where: { appid }
				})
				if (record) {
					await this.ctx.model.weixinThirdPlatformModel.AppModel.update(mpappService.filterModel(value), {
						where: {
							id: record.id
						}
					})
				} else {
					await this.ctx.model.weixinThirdPlatformModel.AppModel.create(mpappService.filterModel(value));
				}
			}
		}

		return value;
	}
	// 获取草稿列表
	public async getDraftList() {

		let token = await this.ctx.getComponentAccessToken();

		let result: any = null;

		if (token) {
			result = await axios.get(`https://api.weixin.qq.com/wxa/gettemplatedraftlist?access_token=${token}`)
		}

		return result ? result.data : null;
	}

	public async addToTemplateMethod(draftId: number, type: number) {
		let token = await this.ctx.getComponentAccessToken();

		let result: any = null;

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/wxa/addtotemplate?access_token=${token}`, {
				draft_id: draftId,
				template_type: type
			})
		}

		return result ? result.data : null;
	}
	// 获取模板列表
	public async getTemplateList(type?: number) {
		let token = await this.ctx.getComponentAccessToken();

		let result: any = null;

		if (token) {
			let url = `https://api.weixin.qq.com/wxa/gettemplatelist?access_token=${token}`;
			if (type || type == 0) {
				url += `&template_type=${type}`
			}
			result = await axios.get(`${url}`)
		}

		return result ? result.data : null;
	}

	// 删除模板
	public async deleteTemplateById(templateId: number) {
		let token = await this.ctx.getComponentAccessToken();
		let result: any = null;

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/wxa/deletetemplate?access_token=${token}`, {
				template_id: templateId
			})
		}

		return result ? result.data : null;
	}

	// 获取体验版二维码
	public async getTrialQrCode(appid, path) {

		let token = await this.ctx.getAppAccessToken(appid)
		let result: any = null;
		let fileUrl: any = '';

		if (token) {
			result = await axios({ url: `https://api.weixin.qq.com/wxa/get_qrcode?access_token=${token}&path=${path}`, method: 'GET', responseType: 'stream' });
			let file: any = await this.saveQrcode(result, appid);
			const { name: fileName, path: filePath } = file;
			fileUrl = await this.ctx.service.lib.oss.ossUpload(`/${this.config.projectName}/${appid}/trial/code/${fileName}`, filePath);
		}
		return fileUrl;

	}
	// 获取已上传的代码的页面列表
	public async getAppPage(appid: string) {
		let token = await this.ctx.getAppAccessToken(appid)
		let result: any = null;

		if (token) {
			result = await axios.get(`https://api.weixin.qq.com/wxa/get_page?access_token=${token}`)
		}

		return result ? result.data : null;
	}
	// 获取域名列表
	public async getServerDomain(appid: string, state: number) {

		let result: any = null;
		let value: any = null;
		if (state === 0) {
			value = await this.ctx.model.weixinThirdPlatformModel.AppDomain.findOne({
				where: {
					appid
				}
			})
		} else {
			let token = await this.ctx.getAppAccessToken(appid);
			if (token) {
				result = await axios.post(`https://api.weixin.qq.com/wxa/modify_domain?access_token=${token}`, {
					action: 'get',
				});
			}
			value = helper.returnWxAPIResult(result);
			if (value) {
				let record = await this.ctx.model.weixinThirdPlatformModel.AppDomain.findOne({
					where: {
						appid
					}
				})
				if (record) {
					await this.ctx.model.weixinThirdPlatformModel.AppDomain.update(this.filterDomainModel(value), {
						where: {
							appid
						}
					})
				} else {
					await this.ctx.model.weixinThirdPlatformModel.AppDomain.create({
						appid,
						...this.filterDomainModel(value)
					})
				}
			}
		}


		return value;
	}

	// 服务器域名
	public async setServerDomain(appid: string, domain?: object) {

		let token = await this.ctx.getAppAccessToken(appid);
		let result: any = null;
		let value = {};

		if (domain) {
			value = await this.filterDomainObject(domain);
		}

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/wxa/modify_domain?access_token=${token}`, {
				action: 'add',
				...value
			});

			value = await this.getServerDomain(appid, 1);
		}
		return value;

	}

	// 过滤域名列表
	private async filterDomainObject(domain: object) {
		let value = {};
		Object.keys(domain).forEach(key => {
			if (domain[key]) {
				value[key] = domain[key];
			}
		})
		return value;
	}
	// 映射服务器域名
	private filterDomainModel(domain: object) {
		let value = {};
		Object.keys(domain).forEach(key => {
			if (domain[key]) {
				let name = key.replace('domain', 'Domain')
				value[name] = JSON.stringify(domain[key]);
			}
		})
		return value;
	}

	// 绑定体验者微信号
	public async bindAppMember(appid: string, wechatid: string) {
		let token = await this.ctx.getAppAccessToken(appid);
		let result: any = null;

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/wxa/bind_tester?access_token=${token}`, {
				wechatid
			})
			if (helper.returnWxAPIResult(result)) {
				await this.updateAppMember(appid, wechatid, result.data.userstr);
			}
		}

		return helper.returnWxAPIResult(result);
	}
	// 体验者列表
	public async getMemberList(appid: string) {
		let token = await this.ctx.getAppAccessToken(appid);
		let result: any = null;
		let list: any = [];

		if (token) {
			result = await axios.post(`https://api.weixin.qq.com/wxa/memberauth?access_token=${token}`, {
				action: 'get_experiencer'
			});
			let members = helper.returnWxAPIResult(result);
			if (members && members.members) {
				for (let item of members.members) {
					let record: any = await this.ctx.model.weixinThirdPlatformModel.AppMember.findOne({
						where: {
							userStr: item.userstr
						}
					})
					if (record) {
						list.push(record.wechatId);
					}
				}
			}
		}
		return list;
	}
	// 删除体验者
	public async delMember(appid: string, wechatid: string) {
		let token = await this.ctx.getAppAccessToken(appid);
		let result: any = null;

		if (token) {
			let record = await this.ctx.model.weixinThirdPlatformModel.AppMember.findOne({
				where: {
					wechatId: wechatid
				}
			})
			if (record) {
				result = await axios.post(`https://api.weixin.qq.com/wxa/unbind_tester?access_token=${token}`, {
					userstr: record.userStr
				});
				if (helper.returnWxAPIResult(result)) {
					await this.delAppMember(appid, wechatid);
				}
			}
		}

		return helper.returnWxAPIResult(result)
	}
	// 增加体验者
	private async updateAppMember(appid: string, wechatid: string, user_str: string) {
		await this.ctx.model.weixinThirdPlatformModel.AppMember.create({
			appid,
			wechatId: wechatid,
			userStr: user_str
		})
		return;
	}
	// 删除体验者
	private async delAppMember(appid: string, wechatid: string) {
		await this.ctx.model.weixinThirdPlatformModel.AppMember.destroy({
			where: {
				appid,
				wechatId: wechatid
			}
		})
		return;
	}

	// 保存二维码
	private async saveQrcode(result: any, appid: string) {
		let fileDir = path.join(__dirname, '../../qrcode');
		let fileName = `${new Date().getTime()}.jpg`;
		let sourcePath = `${fileDir}/${fileName}`;
		if (!fs.existsSync(sourcePath)) {
			fs.writeFileSync(sourcePath, '');
		}
		return new Promise(resolve => {
			const stream = result.data.pipe(fs.createWriteStream(sourcePath));
			stream.on('finish', async (e) => {
				resolve({ name: fileName, path: sourcePath });
			});
		})
	}
}