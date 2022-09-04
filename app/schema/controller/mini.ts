import {
	IsNumber,
	IsNotEmpty,
	IsString,
	IsObject,
	IsArray,
	ArrayMaxSize,
	ArrayMinSize,
	ValidateNested,
} from 'class-validator';

export class GetTestQuery {
	@IsNumber()
	@IsNotEmpty()
	id: number;
}

export class PostTestParams {
	@IsNumber()
	@IsNotEmpty()
	id: number;
}

export class addToTemplateParams {
	@IsNumber()
	@IsNotEmpty()
	draftId: number;

	@IsNumber()
	@IsNotEmpty()
	type: number;
}

export class templateTypeParams {
	@IsNumber()
	type: number;
}

export class templateIdParams {
	@IsNumber()
	@IsNotEmpty()
	templateId: number;
}

export class trialQrCodeParams {
	@IsString()
	@IsNotEmpty()
	path: string;

	@IsString()
	@IsNotEmpty()
	appid: string;
}

export class appIdParams {
	@IsString()
	@IsNotEmpty()
	appid: string;
}

export class appInfoParams {
	@IsString()
	@IsNotEmpty()
	appid: string;

	@IsNumber()
	state: number
}


export class doMainParams {
	@IsString()
	@IsNotEmpty()
	appid: string;

	@IsObject()
	@IsNotEmpty()
	domain: object
}

export class bindAppMemberParams{
	@IsString()
	@IsNotEmpty()
	appid: string;

	@IsArray()
	@IsNotEmpty()
	wechatIds: object;

}