import {
  IsNumber,
  IsNotEmpty,
  IsString,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class appidParams {
	@IsString()
	@IsNotEmpty()
	appid: string;
}

export class openhubParams {
	@IsString()
	@IsNotEmpty()
	appid: string;

	@IsString()
	@IsNotEmpty()
	openAppid: string;
}