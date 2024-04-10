import { DataSource } from "typeorm";
import envConfig from "../utils/envConfig";
import { Category } from "./mysql/entities/Category";
import { Color } from "./mysql/entities/Color";
import { Coupon } from "./mysql/entities/Coupon";
import { Order } from "./mysql/entities/Order";
import { OrderItem } from "./mysql/entities/OrderItem";
import { Product } from "./mysql/entities/Product";
import { ProductImage } from "./mysql/entities/ProductImage";
import { Review } from "./mysql/entities/Review";
import { Size } from "./mysql/entities/Size";
import { User } from "./mysql/entities/User";


class MysqlDatabase {
  uiShopConnection = {
    nameSchema: envConfig.getDbName,
    dataSource: new DataSource({
      host: envConfig.getHost,
      port: Number(envConfig.getDbPort),
      username: envConfig.getDbUserName,
      password: envConfig.getDbPassword,
      database: envConfig.getDbName,
      type: 'mysql',
      entities: [Category, Color, Coupon, Order, OrderItem, Product,
        ProductImage, Review, Size, User
      ]//todo: import by path.
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
    } catch {
      console.log(`Connect to ${nameSchema} failed! `)
    }

  }
}

export default new MysqlDatabase();
