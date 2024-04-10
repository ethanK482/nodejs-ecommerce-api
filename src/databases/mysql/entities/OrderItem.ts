import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './Order'


@Entity("OrderItem", { schema: "han_shop" })
export class OrderItem extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
    id: string;

    @Column("bigint", { name: "productId", unsigned: true })
    productId: string;

    @Column("int", { name: "quantity" })
    quantity: number;
    @ManyToOne(() => Order, (order) => order.orderItem, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id", referencedColumnName: "id" },
    ])
    order: Order
}
