CREATE TABLE `Review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `productId` BIGINT UNSIGNED NOT NULL,
    `message` TEXT NULL,
    `rating` INT NOT NULL,
    `createdAt` DATETIME NOT NULL
);
CREATE TABLE `User`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isVerifyEmail` TINYINT DEFAULT 0,
    `shippingAddress` VARCHAR(255) NULL
);
CREATE TABLE `OrderItem`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productId` BIGINT UNSIGNED NOT NULL,
    `quantity` INT NOT NULL,
    `orderId` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Order`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `orderNum` VARCHAR(255) NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `shippingAddress` VARCHAR(255) NOT NULL,
    `paymentStatus` TINYINT DEFAULT 0,
    `paymentMethod` VARCHAR(50) NOT NULL,
    `currency`  VARCHAR(50) NOT NULL,
    `totalPrice` DECIMAL(8, 2) NOT NULL,
    `deliverStatus`VARCHAR(100) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `paymentId`VARCHAR(100) NOT NULL
);
CREATE TABLE `Category`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `image-url` VARCHAR(255) NOT NULL
);
CREATE TABLE `Product`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `categoryId` BIGINT UNSIGNED,
    `price` DECIMAL(8, 2) NOT NULL,
    `totalSold` INT NOT NULL
);
CREATE TABLE `productImage`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productId` BIGINT UNSIGNED NOT NULL,
    `image-url` VARCHAR(255) NOT NULL,
    `priority` INT NOT NULL
);

CREATE TABLE `Coupon`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(255) NOT NULL,
    `startDate` DATETIME NOT NULL,
    `endDate` DATETIME NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `discount` INT NOT NULL
)


CREATE TABLE `ProductStock`(
    `productId` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `size`  VARCHAR(20) NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `quantity` INT NOT NULL,
      PRIMARY KEY (`productId`, `size`, `color`)
)
;
ALTER TABLE
    `ProductStock` ADD CONSTRAINT `product_stock_foreign` FOREIGN KEY(`productId`) REFERENCES `Product`(`id`);
ALTER TABLE
    `Product` ADD CONSTRAINT `product_categoryid_foreign` FOREIGN KEY(`categoryId`) REFERENCES `Category`(`id`);
ALTER TABLE
    `Coupon` ADD CONSTRAINT `coupon_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `User`(`id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `User`(`id`);
ALTER TABLE
    `Review` ADD CONSTRAINT `review_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `User`(`id`);
ALTER TABLE
    `OrderItem` ADD CONSTRAINT `orderitem_id_foreign` FOREIGN KEY(`orderId`) REFERENCES `Order`(`id`);
ALTER TABLE
    `Review` ADD CONSTRAINT `review_productid_foreign` FOREIGN KEY(`productId`) REFERENCES `Product`(`id`);


ALTER TABLE
    `productImage` ADD CONSTRAINT `product_image_foreign` FOREIGN KEY(`productId`) REFERENCES `Product`(`id`);