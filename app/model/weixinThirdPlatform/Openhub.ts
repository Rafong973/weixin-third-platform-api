import { Model, Table, Column, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'openhub',
	paranoid: true
})
class Openhub extends Model<Openhub> {
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	openAppid: string;

	@Column
	createdAppid: string;

	@Column
	appid: string;

	@CreatedAt
	@Column
	createdAt: Date;

	@UpdatedAt
	@Column
	updatedAt: Date;

	@DeletedAt
	@Column({
		field: 'deleted_at'
	})
	deletedAt: Date;
}

export default () => Openhub;