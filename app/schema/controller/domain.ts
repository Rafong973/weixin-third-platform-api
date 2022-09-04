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

export class setDomainParams {
	@IsObject()
	@IsNotEmpty()
	domain: object;

	@IsNumber()
	@IsNotEmpty()
	published: number;

	@IsString()
	appid: string
}