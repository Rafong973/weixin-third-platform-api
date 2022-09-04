import {
	IsNumber,
	IsNotEmpty,
	IsString,
	ArrayMaxSize,
	ArrayMinSize,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetCodeQuery {
	@IsString()
	@IsNotEmpty()
	auth_code: string;

	@IsNumber()
	@IsNotEmpty()
	expires_in: number
}