import crypto from 'crypto';
const generateOrderCode = () => {
    return crypto.randomBytes(16).toString("hex");
}
export default generateOrderCode;