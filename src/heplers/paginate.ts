const paginate = (page: string, limit: string) =>{
    const skip = (Number(page) - 1) * Number(limit);
    return { skip, take: Number(limit) }
}
export default paginate;