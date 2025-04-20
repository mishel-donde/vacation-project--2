import {
  AllowNull,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
} from "sequelize-typescript";
import { Follow } from "./follow";
import { User } from "./user";

@Table({
  underscored: true,
})
export class Vacation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  vacationId: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  destination: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  vacationDestination: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  startingDate: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  endingDate: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  imageUrl: string;

  @BelongsToMany(() => User, () => Follow, "vacationId", "userId")
  followers: User[];
}
