import 'express-async-errors';
import { Category } from "../../databases/mysql/entities/Category";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
import deleteImages from "../../heplers/deleteImage";
import getImageDeletePath from "../../heplers/getImagePath";
class CategoryService {
    async createCategory(name: string, imageUrl: string) {
        const category = Category.create({ name, imageUrl });
        return await category.save();
    }

    async editCategory(id: string, name: string, file: Express.Multer.File) {
        const categoryExist = await Category.findOne({ where: { id } })
        if (!categoryExist) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Category not found" });
        if (file) {
            deleteImages(getImageDeletePath([categoryExist.imageUrl]))
            categoryExist.imageUrl = file.path;
        }
        categoryExist.name = name;
        return await categoryExist.save();
    }

}
export default new CategoryService();