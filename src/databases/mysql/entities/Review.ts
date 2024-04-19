import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("review_productid_foreign", ["productId"], {})
@Index("review_userid_foreign", ["userId"], {})
@Entity("Review", { schema: "han_shop" })
export class Review extends BaseEntity  {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("bigint", { name: "userId", unsigned: true })
  userId: string;

  @Column("bigint", { name: "productId", unsigned: true })
  productId: string;

  @Column("text", { name: "message", nullable: true })
  message: string | null;

  @Column("int", { name: "rating" })
  rating: number;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
