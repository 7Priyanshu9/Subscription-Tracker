// syntax of middleware is 
// const middleware = {what happens before calling middleware,req,res,what happens after calling middleware}=>{}

    const errorMiddleware = (err, req, res, next) => {
        try{
        // Create a copy of the error object
        let error = { ...err };
        error.message = err.message;
    
        // Log the error to the console for debugging purposes
        console.error(err);
    
        // If the error is a MongoDB validation error
        if (err.name === 'ValidationError') {
            // This can help in showing which fields failed the validation
            error.message = Object.values(err.errors).map(val => val.message).join(', ');
            error.statusCode = 400;  // Bad request
        }
    
        // Handle duplicate key errors (e.g., MongoDB)
        if (err.code === 11000) {
            error.message = 'Duplicate key error, resource already exists.';
            error.statusCode = 400;  // Bad request
        }
    
        // Handle incorrect ObjectId format errors (MongoDB)
        if (err.name === 'CastError') {
            error.message = `Invalid ${err.path}: ${err.value}`;
            error.statusCode = 400;  // Bad request
        }
    
        // Set default status code if not already set
        error.statusCode = error.statusCode || 500;
    
        // Check the environment: provide more details in development
        if (process.env.NODE_ENV === 'development') {
            // Send detailed error in development
            return res.status(error.statusCode).json({
                success: false,
                error: error.message,
                stack: err.stack
            });
        }
    
        // In production, do not expose error details to the client
        return res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Server Error'
        });
    } catch(error){
        next(error);
    }
};
  export default errorMiddleware;