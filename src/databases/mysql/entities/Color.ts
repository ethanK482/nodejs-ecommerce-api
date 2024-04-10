import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("Color", { schema: "han_shop" })
export class Color extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "color", length: 50 })
  color: string;

  @ManyToMany(() => Product, (product) => product.colors)
  @JoinTable({
    name: "ProductColor",
    joinColumns: [{ name: "ColorId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "ProductId", referencedColumnName: "id" }],
    schema: "han_shop",
  })
  products: Product[];
}
