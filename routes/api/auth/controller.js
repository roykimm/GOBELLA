const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

/*
    POST /api/auth 
    {
        username,
        password
    }
*/


exports.register = (req, res) => {
    const { username , password } = req.body;
    let newUser = null;

    // Create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exists');
        } else {
            return User.create(username, password);
        }
    }

    // count the number of the user 
    const count = (user) => {
        newUser = user;
        return User.count({}).exec();
    }

    // assign admin if count is 1 
    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin();
        } else {
            // if not , return a promise that returns false 
            return Promise.resolve(false);
        }
    }

    // Respond to the client 
    const respond = (isAdmin) => {
        res.json({
            message : 'register successfully',
            admin : isAdmin ? true : false
        })
    }

    // Run then there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message : error.message
        })
    }

    // Check username duplication
    User.findOneByUsername(username)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)

    //res.send('this router is working');
}

exports.login = (req,res) => {
    const { username , password } = req.body;
    const secret = req.app.get('jwt-secret');

    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)){
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id : user._id,
                            username : user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn : '7d',
                            issuer : 'gobella.kr',
                            subject : 'userInfo'
                        }, (err, token) => {
                            if(err) reject(err);
                            resolve(token)
                        }
                    )
                })
                return p;
            } else {
                throw new Error('login failed');
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            message : 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message : error.message
        })
    }

    // find the user
    User.findOneByUsername(username)
        .then(check)
        .then(respond)
        .catch(onError)
}

/*
    GET /api/auth/check
*/
exports.check = (req,res) => {
    res.json({
        success : true,
        info: req.decoded
    })
}

/*
    GET /api/user/list
*/

exports.list = (req,res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message : 'you are not an admin'
        })
    }

    User.find({})
        .then(
            users => {
                res.json({users})
            }
        )
}

/*
    POST /api/user/assign-admin/:username
*/
exports.assignAdmin = (req,res) => {
    //refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message : 'you are not an admin'
        })
    }

    User.findOneByUsername(req.params.username)
        .then(
            user => assignAdmin
        )
        .then(
            res.json({
                success : true
            })
        )
}