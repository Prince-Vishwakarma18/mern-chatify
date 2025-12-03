import jwt from 'jsonwebtoken'
export const generateToken=(userId,res)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    });

res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // httpOnly prevents JavaScript from accessing the cookie (protects JWT from XSS attacks)
    sameSite: "strict", //// sameSite: "strict" blocks the cookie from being sent on cross-site requests (strong CSRF protection)
    secure:process.env.NODE_ENV !== "development"
});

}