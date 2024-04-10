import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("size", { schema: "han_shop" })
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "size", length: 50 })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}
