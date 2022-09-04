require('module-alias/register')
import BaseService from '@base/baseService'

const Core = require('@alicloud/pop-core')

const client = new Core({
  accessKeyId: '',
  accessKeySecret: '',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

const params = {
  RegionId: 'cn-hangzhou',
  SignName: '古茗茶饮',
  TemplateCode: 'SMS_189480374'
}

const requestOption = {
  method: 'POST'
}

export default class SmsService extends BaseService {
  public async sendSms(phone: string): Promise<boolean> {
    try {
      const code = (Math.floor(Math.random() * 1000000) + '').padStart(6, '100000')
      const data = Object.assign(params, {
        PhoneNumbers: phone,
        TemplateParam: `{"code":"${code}"}`
      })
      const result = await client.request('SendSms', data, requestOption)
      const rKey = this.ctx.redisKey.verificationCode(phone)
      if (result.Code === 'OK') await this.ctx.app.commonRedis.setex(rKey, 300, code)
      JSON.stringify(result)
      return true
    } catch (error) {
      throw this.ctx.customError.USER.SEND_VERIFICATION_CODE_FAIL
    }
  }
  public async verifyCode(phone: string, code: string): Promise<boolean> {
    const rKey = this.ctx.redisKey.verificationCode(phone)
    const redisCode = await this.ctx.app.commonRedis.get(rKey)
    if (code === redisCode) {
      return true
    }
    return false
  }
}
