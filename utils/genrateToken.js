import jwt  from 'jsonwebtoken'

const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRE
});

    res.cookie('jwt',token,{
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict', // set to 'none' to allow cross-site cookies
        secure: process.env.NODE_ENV !== 'development', // set to true if using HTTPS
    });
    return token;
}

export default generateToken