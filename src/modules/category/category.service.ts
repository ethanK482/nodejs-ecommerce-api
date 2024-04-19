import "express-async-error"
import { Category } from "../../databases/mysql/entities/Category";
class CategoryService {
    async createCategory(name: string, imageUrl: string) {
        const category = Category.create({ name, imageUrl });
        return await category.save();
    }
}
export default new CategoryService();