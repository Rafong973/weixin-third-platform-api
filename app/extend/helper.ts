import { SignOptions, Secret } from 'jsonwebtoken';
const crypto = require('crypto');
const qs = require('qs');

import * as XMLJS from 'xml2js';

const dayjs = require('dayjs');
const uuid = require('uuid');
const jsonwebtoken = require('jsonwebtoken');
import { Context, Singleton, Application } from 'egg';

export default {
	formatTime(time: any = new Date(), format: string = 'YYYY-MM-DD HH:mm:ss') {
		return dayjs(time).format(format);
	},
	isSameOrBefore(referenceTime: string, time: string = dayjs()) {
		return dayjs(time).isSameOrBefore(referenceTime);
	},
	isSameOrAfter(referenceTime: string, time: string = dayjs()) {
		return dayjs(time).isSameOrAfter(referenceTime);
	},
	uuid() {
		return uuid();
	},
	jwtSign(payload: string | Buffer | object, secretOrPrivateKey: Secret = '', options: SignOptions) {
		return jsonwebtoken.sign(payload, secretOrPrivateKey, options);
	},
	jwtVerify(token: string, secretOrPrivateKey: Secret = '', error: any) {
		try {
			return jsonwebtoken.verify(token, secretOrPrivateKey);
		} catch (err) {
			throw error;
		}
	},
	wait(duration: number) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(duration);
			}, duration);
		});
	},
	deleteQsSymbol(objQs: string) {
		return objQs.replace(/&|=/g, '');
	},
	// 对象排序
	sortObject(obj: any) {
		const tempObj: any = {};
		Object.keys(obj).sort().forEach(key => {
			tempObj[key] = obj[key];
		});
		return tempObj;
	},
	// sha1加密
	sha1(input: string) {
		return crypto.createHash('sha1').update(input, 'utf8').digest('hex');
	},
	// 字符串参数排序
	sortParamStr(paramStr: string) {
		const arr = paramStr.split('&');
		arr.sort((a, b) => {
			if (a > b) {
				return 1;
			}
			if (a < b) {
				return -1;
			}
			return 0;
		});
		return arr.join('&');
	},
	qs(obj: any) {
		return qs.stringify(obj);
	},
	getFileExt(fileName: string) {
		const splitArr = fileName.split('.');
		if (splitArr.length > 1) {
			return splitArr[splitArr.length - 1];
		} else {
			return '';
		}
	},
	toHump(name) {
		return name.replace(/\_(\w)/g, function (all, letter) {
			return letter.toUpperCase();
		});
	},
	filterPushObject(data: object) {
		const { xml }: any = data;
		let result: any = {};
		Object.keys(xml).forEach(key => {
			let value = xml[key];
			result[key] = this.replaceCDATA(value[0])
		})
		return result;
	},
	parseString(xml: any) {
		const parseString = XMLJS.parseString;
		let result = '';
		parseString(xml, async (err, res) => {
			result = this.filterPushObject(res);
		});
		return result;
	},
	replaceCDATA(text: string) {
		return text.replace("<![CDATA[", "").replace("]]>", "");
	},
	returnWxAPIResult(result: any) {
		if (result && result.data) {
			if (result.data.errcode === 0) {
				return result.data;
			} else {
				throw new Error(result.data.errmsg);
			}
		} else {
			return null;
		}
	}

};
