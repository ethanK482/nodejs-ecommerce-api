import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Color } from "./Color";
import { Size } from "./Size";
import { Review } from "./Review";
import { ProductImage } from "./ProductImage";

@Index("product_categoryid_foreign", ["categoryId"], {})
@Entity("Product", { schema: "han_shop" })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("bigint", { name: "categoryId", nullable: true, unsigned: true })
  categoryId: string | null;

  @Column("decimal", { name: "price", precision: 8, scale: 2 })
  price: string;

  @Column("int", { name: "totalQty" })
  totalQty: number;

  @Column("int", { name: "totalSold" })
  totalSold: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @ManyToMany(() => Color, (color) => color.products)
  colors: Color[];

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable({
    name: "ProductSize",
    joinColumns: [{ name: "productId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "sizeId", referencedColumnName: "id" }],
    schema: "han_shop",
  })
  sizes: Size[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];
}
