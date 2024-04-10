import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coupon } from "./Coupon";
import { Order } from "./Order";
import { Review } from "./Review";

@Entity("User", { schema: "han_shop" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "firstName", length: 50 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 50 })
  lastName: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "role", length: 20 })
  role: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("tinyint", {
    name: "isVerifyEmail",
    nullable: true,
    default: () => "'0'",
  })
  isVerifyEmail: number | null;

  @Column("varchar", { name: "shippingAddress", nullable: true, length: 255 })
  shippingAddress: string | null;

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons: Coupon[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
