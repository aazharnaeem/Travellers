const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            TOKEN_SECRET
        ); req.user = {
            username: decodedToken.username,
            email: decodedToken.email,
            userId: decodedToken.id
        }; next();

    }
    catch (error) {
        res.status(401).send({ message: "Auth failed!" });
    }
};

module.exports = {
    authenticateJWT
}