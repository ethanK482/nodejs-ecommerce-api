import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("ProductStock", { schema: "han_shop" })
export class ProductStock extends BaseEntity  {
  @PrimaryGeneratedColumn({ type: "bigint", name: "productId", unsigned: true })
  productId: string;

  @Column("varchar", { primary: true, name: "size", length: 20 })
  size: string;

  @Column("varchar", { primary: true, name: "color", length: 20 })
  color: string;

  @Column("int", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productStocks, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
