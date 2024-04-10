import {BaseEntity, Column,Entity,Index,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn} from "typeorm";
import {User} from './User'
import {OrderItem} from './OrderItem'


@Index("order_userid_foreign",["userId",],{  })
@Entity("Order" ,{schema:"han_shop" } )
export  class Order  extends BaseEntity {

@PrimaryGeneratedColumn({ type:"bigint", name:"id",unsigned:true })
id:string;

@Column("varchar",{ name:"orderNum",length:255 })
orderNum:string;

@Column("bigint",{ name:"userId",unsigned:true })
userId:string;

@Column("varchar",{ name:"shippingAddress",length:255 })
shippingAddress:string;

@Column("tinyint",{ name:"paymentStatus",nullable:true,default: () => "'0'", })
paymentStatus:number | null;

@Column("varchar",{ name:"paymentMethod",length:50 })
paymentMethod:string;

@Column("varchar",{ name:"currency",length:50 })
currency:string;

@Column("decimal",{ name:"totalPrice",precision:8,scale:2 })
totalPrice:string;

@Column("varchar",{ name:"deliverStatus",length:100 })
deliverStatus:string;

@Column("datetime",{ name:"deliveredAt" })
deliveredAt:Date;

@Column("datetime",{ name:"createAt" })
createAt:Date;

@ManyToOne(()=>User,user=>user.orders,{ onDelete:"NO ACTION",onUpdate:"NO ACTION" })
@JoinColumn([{ name: "userId", referencedColumnName: "id" },
])

user:User;

@OneToOne(()=>OrderItem,orderItem=>orderItem.order)


orderItem:OrderItem;

}
