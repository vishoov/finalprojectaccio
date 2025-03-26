const User = require('../model/user.model');


exports.getUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

       if (!user) {

            return res.status(404).json({ message: 'User not found' });

        }


        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
}


