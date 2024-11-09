
const argon2 = require('argon2');

async function argonhash(password){
    h = await argon2.hash(password);
    return h
}

//argonhash("secret").then(console.log);



const argonhash2 = async (password) => {
    try{
    h = await argon2.hash(password);
    console.log(h)
    } catch (err) {
       console.log(err)
    }

}
argonhash2("secret");

//hash="$argon2id$v=19$m=4096,t=3,p=1$RrtzvESo4bkSXrWxbc530g$Lyyvcbaa3UNVymz+LMbLjN2hClM6NSRQiMJqGg4vtNY"
//argon2.verify(hash, "secret").then(console.log);