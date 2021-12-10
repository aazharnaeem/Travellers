const { user } = require('../model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;


const register = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password, ConfirmPassword } = req.body;

        const profilePicture = req.file.path

        const exUser = await user.findOne({ username });

        if (exUser) {
            res.status(400).send({ message: 'user already exist' });
            return;
        };

        if (password !== ConfirmPassword) {
            res.status(400).send({ message: 'Password confirmation failed' })
            return;
        };

        const newUser = new user({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profilePicture: profilePicture,
        });

        newUser.save();
        res.status(200).send({ message: 'account created sucessfullly', sucessful: true });

    }
    catch (error) {
        res.status(400).send({ message: 'server Error', sucessful: false })

    }
};

const login = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        let exUser;

        if (username === undefined) {
            exUser = await user.findOne({ email });
        }
        else {
            exUser = await user.findOne({ username });
        }


        const validatePassword = await bcrypt.compare(password, exUser.password);


        const token = jwt.sign(
            {
                username: exUser.username,
                email: exUser.email,
                id: exUser._id
            },
            TOKEN_SECRET
        );


        if (exUser && validatePassword) {
            res.status(200).send({
                token: token,
            });
        }
        else {
            res.status(400).send({ message: 'invalid username/ password', sucessful: true })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'somthing went wrong', sucessful: false })
    }
}


module.exports = {
    register,
    login
}