import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { ProductStock } from "./ProductStock";
import { Review } from "./Review";
import { ProductImage } from "./ProductImage";

@Index("product_categoryid_foreign", ["categoryId"], {})
@Entity("Product", { schema: "han_shop" })
export class Product extends BaseEntity  {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("bigint", { name: "categoryId", nullable: true, unsigned: true })
  categoryId: string | null;

  @Column("decimal", { name: "price", precision: 8, scale: 2 })
  price: number;

  @Column("int", { name: "totalSold", default: 0})
  totalSold: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productStocks: ProductStock[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];
}
