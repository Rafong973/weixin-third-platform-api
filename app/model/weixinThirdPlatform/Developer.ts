import { Model, Table, Column, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'developer'
})

class Developer extends Model<Developer>{
	paranoid: true;

	@AutoIncrement
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	wechat: string;

	@Column
	name: string;

	@Column
	tel: number;

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

export default () => Developer;