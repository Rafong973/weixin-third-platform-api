import { Model, Table, Column, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'third_domain',
	paranoid: true
})
class Thirddomain extends Model<Thirddomain> {
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	appid: string;

	@Column
	pushDomain: string;

	@Column
	testDomain: string;

	@CreatedAt
	@Column
	createdAt: Date;

	@UpdatedAt
	@Column
	updatedAt: Date;

	@DeletedAt
	@Column
	deletedAt: Date;
}

export default () => Thirddomain;