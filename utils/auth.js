if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const config = require('./config');
const { User } = require('../resources/user/user.model');
const jwt = require('jsonwebtoken');

exports.newToken = user => {
    return jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: config.jwtExp
    });
}

exports.verifyToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) { 
                return reject(err);
            }
            resolve(payload);
        })
    })
}

exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Email and Password require.' })
    }

    try {
        const user = await User.create(req.body);
        const token = this.newToken(user);
        return res.status(201).send({ token: token });
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

exports.signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Email and Password require.' })
    }

    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        return res.status(401).send({ message: 'Auth Fail' });
    }

    try {
        const match = await user.checkPassword(req.body.password);
        if (!match) {
            return res.status(401).send({ message: 'Auth Fail' });
        }
        const token = this.newToken(user);
        return res.status(200).send({ message: "Signin Successfully", token })
    } catch (err) {
        return res.status(401).send({ message: 'Auth Fail' });
    }
}

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Auth Fail" });
    }

    let token = req.headers.authorization.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: "Auth Fail" });
    }

    try {
        const payload = await this.verifyToken(token);
        const user = await User.findById(payload.id)
            .select('-password')
            .lean()
            .exec();
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({ message: "Auth Fail h" });
    }
}