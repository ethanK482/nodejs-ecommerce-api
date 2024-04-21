import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User'
import { OrderItem } from './OrderItem'


@Index("order_userid_foreign", ["userId",], {})
@Entity("Order", { schema: "han_shop" })
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
    id: string;

    @Column("varchar", { name: "orderCode", length: 255 })
    orderCode: string;

    @Column("bigint", { name: "userId", unsigned: true })
    userId: string;

    @Column("varchar", { name: "shippingAddress", length: 255 })
    shippingAddress: string;

    @Column("tinyint", { name: "paymentStatus", nullable: true })
    paymentStatus: string;

    @Column("varchar", { name: "paymentMethod", length: 50 })
    paymentMethod: string;

    @Column("varchar", { name: "currency", length: 50 })
    currency: string;

    @Column("decimal", { name: "totalPrice", precision: 8, scale: 2 })
    totalPrice: number;

    @Column("varchar", { name: "deliverStatus", length: 50 })
    deliverStatus: string;

    @Column("varchar", { name: "paymentId", length: 100, nullable: true })
    paymentId: string;

    @Column("datetime", { name: "createdAt" })
    createdAt: Date;

    @ManyToOne(() => User, user => user.orders, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    @JoinColumn([{ name: "userId", referencedColumnName: "id" },
    ])
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}
