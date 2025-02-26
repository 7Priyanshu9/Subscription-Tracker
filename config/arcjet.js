// import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";
// import { ARCJET_KEY } from "./env.js";
// const aj = arcjet({

//     key: ARCJET_KEY,
//     characteristics: ["ip.src"],
//     rules: [
//         shield({ mode: 'LIVE' }),
//         detectBot({
//             mode: "LIVE",
//             allow: [
//                 "CATEGORY:SEARCH_ENGINE",
//             ],
//         }),

//         tokenBucket({
//             mode: "LIVE",
//             refillRate: 5,
//             interval: 10,
//             capacity: 10,
//         }),
//     ],
// });

// export default aj;


import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
    key: ARCJET_KEY,
    log: console.log,  // Ensure logging is enabled
    characteristics: [
        (req) => req.headers["x-forwarded-for"] || req.connection.remoteAddress // ✅ Extract real IP
    ],
    rules: [
        shield({ mode: 'LIVE' }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
});

export default aj;
