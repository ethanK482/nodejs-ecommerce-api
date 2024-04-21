export interface ReviewDTO{
    userId: string,
    productId: string,
    message: string,
    rating: number
}
export interface ReviewEditInfo{
    reviewId: string;
    message: string;
    rating: string;
}