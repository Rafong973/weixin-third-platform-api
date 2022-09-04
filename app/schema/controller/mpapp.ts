import {
	IsNumber,
	IsNotEmpty,
	IsString,
	ArrayMaxSize,
	ArrayMinSize,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class PostTestParams {
	@IsNumber()
	@IsNotEmpty()
	id: number;
}

export class GetMiniQuery {
	@IsNumber()
	@IsNotEmpty()
	id: number;
}