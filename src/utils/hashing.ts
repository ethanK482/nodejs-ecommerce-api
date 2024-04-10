

import bcrypt from 'bcrypt'
class Hashing {
    async hashPassword(plainTextPassword: string) {
        return await bcrypt.hash(plainTextPassword, 10);
    }

    async comparePassword(plainTextPassword: string, hashPassword: string) {
        return await bcrypt.compare(plainTextPassword, hashPassword)
    }
}
export default new Hashing();