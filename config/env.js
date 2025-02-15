import { config } from 'dotenv';
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

export const { PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
}= process.env;


// TOKEN -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IwMmNmZDE3MjIwN2Q2NzI4Njc4ZTciLCJpYXQiOjE3Mzk1OTkxMDEsImV4cCI6MTczOTY4NTUwMX0.6N0acmnIK0PuG-byCoTm1CGR2iz_aJUXAWaSSUgCGVQ
// ID-> 67b02cfd172207d6728678e7