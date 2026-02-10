const bcrypt = require("bcrypt");

const HashPassword = async(password)=>{
    const salt = 10;
    return bcrypt.hash(password,salt);
    
}
const confirmHash = async(a,b)=>{
    const ismatch =await bcrypt.compare(a,b);
    return ismatch;
    
}



module.exports = {HashPassword,confirmHash};