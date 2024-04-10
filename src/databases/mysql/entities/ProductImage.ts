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

@Index("product_image_foreign", ["productId"], {})
@Entity("productImage", { schema: "han_shop" })
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("bigint", { name: "productId", unsigned: true })
  productId: string;

  @Column("varchar", { name: "image-url", length: 255 })
  imageUrl: string;

  @Column("int", { name: "priority" })
  priority: number;

  @ManyToOne(() => Product, (product) => product.productImages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
