import { Review } from "../../databases/mysql/entities/Review";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
import { ReviewDTO, ReviewEditInfo } from "./type";

class ReviewService {
    async createReview(reviewInfo: ReviewDTO) {
        const { productId, userId } = reviewInfo;
        const reviewExist = await Review.findOne({ where: { userId, productId } });
        if (reviewExist) {
            throw new BadRequestErr({ errorCode: ErrorCode.EXIST, errorMessage: "You can only rate this product once" })
        }
        const review = Review.create({ ...reviewInfo, createdAt: new Date() });
        return await review.save();
    };

    async editReview({ reviewId, message, rating }: ReviewEditInfo) {
        const reviewExist = await Review.findOne({ where: { id: reviewId } })
        if (!reviewExist) {
            throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Review not found" })
        }
        reviewExist.message = message;
        reviewExist.rating = Number(rating);
        return await reviewExist.save();
    }

    deleteReview(reviewId: string) {
        Review.createQueryBuilder().delete().where("id = :reviewId", { reviewId }).execute();
    }

    async findReviewById( id: string){
        return await Review.findOne( { where: { id }  } )
    }

    async finAllReview(){
        return await Review.find({order: { createdAt: "DESC"}})
    }
}
export default new ReviewService();