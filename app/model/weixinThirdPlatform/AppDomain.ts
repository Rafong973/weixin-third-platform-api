import { Model, Table, Column, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
modelName: 'app_domain',
paranoid: true
})
class Appdomain extends Model<Appdomain> {
  @Column({
    primaryKey: true
  })
  id: number;

  @Column
  appid: string;

  @Column
  requestDomain:string;

  @Column
  webviewDomain:string;

  @Column
  wsrequestDomain:string;

  @Column
  uploadDomain:string;

  @Column
  downloadDomain:string;

  @Column
  udpDomain:string;

  @Column
  tcpDomain:string;

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

  export default () => Appdomain;