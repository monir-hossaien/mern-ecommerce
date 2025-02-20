export const PORT=3000
export const DATABASE_URL='mongodb+srv://monirhdigital:kpePMoFPrpXe7Fle@cluster0.em65i.mongodb.net/mern_shop'
export const JWT_KEY='ABC12341241234'
export const JWT_EXPIRE_TIME= '24h' // Timestamp for 24h ahead


export const EMAIL_HOST = "smtp.gmass.co.";
export const EMAIL_PASS = "37766468-6f2b-4601-83bb-6f22ffb233cf";
export const EMAIL_USER = "gmass";
export const EMAIL_PORT = 587;
// export const MAIL_ENCRYPTION="ssl"

export const WEB_CACHE=false
export const MAX_JSON_SIZE="10MB"
export const URL_ENCODE=true

export const REQUEST_TIME=20*60*1000
export const REQUEST_NUMBER=2000

// generate otp
export const RANDOM_OTP = Math.floor(100000 + Math.random() * 900000);
export const OTP_EXPIRE_TIME = Date.now() + 5 * 60 * 1000; // Timestamp for 5 minutes ahead

//cookie expire time
export const COOKIE_EXPIRE_TIME =  '24h'; // Timestamp for  24h ahead
//user create password hashing
export const saltRounds = 10;
