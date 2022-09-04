import { Model, Table, Column, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
	modelName: 'auth_msg_log'
})

class AuthMsgLog extends Model<AuthMsgLog>{
	paranoid: true;

	@AutoIncrement
	@Column({
		primaryKey: true
	})
	id: number;

	@Column
	info_type: string;

	@Column
	appid: string;


	@Column
	params: string;

	@Column
	input: string;

	@Column
	result: string;

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

export default ()=> AuthMsgLog
