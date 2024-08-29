const bcrypt = require('bcrypt');
const saltRounds = 10;



export const hasPasswordHelper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch(error) {
        console.log(error);
    }
}

export const comparePasswordHelper = async (plainPassword: string, hasPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hasPassword);
    } catch(error) {
        console.log(error);
    }
}