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
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

//otp expire
export const generateOTPExpireTime = () => new Date(Date.now() + 5 * 60 * 1000);


//cookie expire time
export const COOKIE_EXPIRE_TIME =  24 * 60 * 60 * 1000 // Cookie expires in 24 hours

//cloudinary setup
export const cloud_name = "dw0ojh7h8"
export const api_key = "245476432579572"
export const api_secret = "O9y9N826Y4QMofcNCjrlYvyPrv4"
