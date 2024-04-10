import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("coupon_userid_foreign", ["userId"], {})
@Entity("Coupon", { schema: "han_shop" })
export class Coupon extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("datetime", { name: "startDate" })
  startDate: Date;

  @Column("datetime", { name: "endDate" })
  endDate: Date;

  @Column("bigint", { name: "userId", unsigned: true })
  userId: string;

  @Column("int", { name: "discount" })
  discount: number;

  @ManyToOne(() => User, (user) => user.coupons, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
