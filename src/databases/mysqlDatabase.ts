import { DataSource } from "typeorm";
import envConfig from "../utils/envConfig";
import { Category } from "./mysql/entities/Category";
import { Coupon } from "./mysql/entities/Coupon";
import { Order } from "./mysql/entities/Order";
import { OrderItem } from "./mysql/entities/OrderItem";
import { Product } from "./mysql/entities/Product";
import { ProductImage } from "./mysql/entities/ProductImage";
import { Review } from "./mysql/entities/Review";
import { User } from "./mysql/entities/User";
import { ProductStock } from "./mysql/entities/ProductStock";
class MysqlDatabase {
  uiShopConnection = {
    nameSchema: envConfig.getDbName,
    dataSource: new DataSource({
      host: envConfig.getDbHost,
      port: Number(envConfig.getDbPort),
      username: envConfig.getDbUserName,
      password: envConfig.getDbPassword,
      database: envConfig.getDbName,
      type: 'mysql',
      entities: [Category, Coupon, Order, OrderItem, Product, ProductImage, Review, User, ProductStock],
    })

  }

  get getDataSource() {
    return this.uiShopConnection.dataSource;
  }

  async connect() {
    const { dataSource, nameSchema } = this.uiShopConnection;
    try {
      await dataSource.initialize();
      console.log(`Connect to ${nameSchema} successfully! `)
    } catch(error) {
      console.log(error)
      console.log(`Connect to ${nameSchema} failed! `)
    }

  }
}

export default new MysqlDatabase();
