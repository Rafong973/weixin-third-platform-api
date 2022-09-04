require('module-alias/register');
import BaseService from '@base/baseService';
import { } from '@schema/service/mpapp';
import axios from 'axios';
import { GetMiniQuery, PostTestParams } from '@schema/controller/mpapp';

axios.defaults.timeout = 5000;

export default class MpappService extends BaseService {

	// 从授权码中处理app，新的app就新增，旧的就更新
	public async handleMpAppByAuthCode(info: any) {
		let { appid, access_token }: any = info;

		let result = await this.getMpAPPInfo(access_token);

		console.log(result);

		let has = await this.findOneByAppid(appid);

		if (has) {
			this.updateItem(appid, result);
		} else {
			this.createItem(result);
		}
		return result;
	}

	// 从接口获取app信息
	public async getMpAPPInfo(token: string) {
		const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/account/getaccountbasicinfo?access_token=${token}`);
		if (data.errcode != 0) throw data.errmsg;

		let info: any = await this.filterModel(data);

		return info;
	}

	public async createItem(info: any) {
		await this.ctx.model.weixinThirdPlatformModel.AppModel.create(info);
	}

	public async updateItem(appid: string, info: any) {
		await this.ctx.model.weixinThirdPlatformModel.AppModel.update(info, {
			where: {
				appid
			}
		})
	}

	public async findOneByAppid(appid: string) {
		return await this.ctx.model.weixinThirdPlatformModel.AppModel.findOne({
			where: {
				appid
			}
		})
	}

	public async findOneById(id: number) {
		return await this.ctx.model.weixinThirdPlatformModel.AppModel.findOne({
			where: {
				id
			}
		})
	}

	async getToken(wxappid: string) {
		let token = await this.ctx.app.commonRedis.get(this.ctx.redisKey.wx3app.accessToken(wxappid));
		return token;
	}

	// mpapp 信息映射表
	public async filterModel(info: any) {
		return {
			appid: info.appid,
			nickname: JSON.stringify(info.nickname_info),
			type: info.account_type,
			principal: JSON.stringify({
				type: info.principal_type,
				name: info.principal_name
			}),
			realname_status: info.realname_status,
			wx_verify: JSON.stringify(info.wx_verify_info),
			signature: JSON.stringify(info.signature_info),
			head_image: JSON.stringify(info.head_image_info),
			registered_country: info.registered_country,
			credential: info.credential
		}

	}
}