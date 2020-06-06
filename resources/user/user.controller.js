const { User } = require('./user.model');

exports.me = (req, res) => {
    res.status(200).json({ data: req.user })
}

exports.updateMe = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
          })
          .lean()
          .exec();
        res.status(200).json({ data: user });
    } catch (err) {
        res.status(400).end();
    }
}