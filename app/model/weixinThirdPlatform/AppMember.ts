import { Model, Table, Column, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'app_member'
})

class AppMember extends Model<AppMember>{
	paranoid: true;

	@AutoIncrement
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	appid: string;

	@Column
	userStr: string;

	@Column
	wechatId: string;

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
}

export default () => AppMember;