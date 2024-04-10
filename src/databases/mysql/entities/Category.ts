import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("Category", { schema: "han_shop" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "image-url", length: 255 })
  imageUrl: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
