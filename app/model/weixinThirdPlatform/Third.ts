import { Model, Table, Column, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'third'
})

class Third extends Model<Third>{
	paranoid: true;

	@AutoIncrement
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	appid: string

	@Column
	component_access_token: string

	@Column
	component_verify_ticket: string

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

export default () => Third