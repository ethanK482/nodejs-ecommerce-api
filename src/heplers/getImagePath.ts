const getImageDeletePath = (paths: string[]) => {
    const deletePaths = paths.map(path => {
        const pathElement = path.split("/");
        const folder = pathElement[7];
        const id = pathElement[8].split(".")[0];
        return `${folder}/${id}`
    })
    return deletePaths;
}
export default getImageDeletePath;