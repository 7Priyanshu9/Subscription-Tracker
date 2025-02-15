import User from '../models/userModel.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error)
    }
}
export const getUser = async (req, res, next) => {
    try {
        // find users by there id like name and email and not password .select(-password) ignore the password feild
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error)
    }
}