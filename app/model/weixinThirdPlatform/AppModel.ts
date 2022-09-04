import { Model, Table, Column, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'app'
})

class Miniprogram extends Model<Miniprogram>{
	paranoid: true;

	@AutoIncrement
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	nickname: string;

	@Column
	appid: string;

	@Column
	type: number;

	@Column
	realname_status: number

	@Column
	principal: string;

	@Column
	wx_verify: string;

	@Column
	signature: string;

	@Column
	head_image: string;

	@Column
	registered_country: number;

	@Column
	credential: string;

	@CreatedAt
	@Column({
		field: 'created_at'
	})
	createdAt: Date;

	@UpdatedAt
	@Column({
		field: 'updated_at'
	})
	updatedAt: Date;

	@DeletedAt
	@Column({
		field: 'deleted_at'
	})
	deletedAt: Date;
}

export default ()=> Miniprogram;


