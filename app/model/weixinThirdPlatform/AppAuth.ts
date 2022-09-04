import { Model, Table, Column, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'app_auth'
})

class AppAuth extends Model<AppAuth>{
	paranoid: true;

	@AutoIncrement
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	appid: string

	@Column
	status: number

	@Column
	access_token: string

	@Column
	expires_in: number

	@Column
	refresh_token: string

	@Column
	func_info: string

	@Column
	authorization_code: string

	@CreatedAt
	@Column({
		field: 'created_at'
	})
	createdAt: Date

	@UpdatedAt
	@Column({
		field: 'updated_at'
	})
	updatedAt: Date

}

export default ()=> AppAuth