import aj from '../config/arcjet.js';

const arcJrtMiddleware = async (req, res, next) => {

    try {
        const decision = await aj.protect(req, {requested:1} );
        // will take i token from bucket at a time  
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit())
                return res.status(429).json({
                    error: 'Rate limit exceeded '
                });

            if (decision.reason.isBot())
                return res.status(403).json({ error: "Bot detected" });

            return res.status(403).json({ error: 'Access denied' });

        }

        next();

    } catch (error) {
        console.log(`Arcjet Middleware error : ${error}`);
        next(error);
    }
}

export default arcJrtMiddleware;