require('module-alias/register');
import BaseService from '@base/baseService';
import { GetTestQuery, PostTestParams } from '@schema/controller/test';
import axios from 'axios';

axios.defaults.timeout = 5000;

export default class wxMini extends BaseService {

	public async postTest({ id, users }: PostTestParams) {
		return {
			id,
			users
		};
	}

	public async getTest({ id }: GetTestQuery) {
		return {
			id
		};
	}


	public async updateInfo(appId: string, info){

	}

}
