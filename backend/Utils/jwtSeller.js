const sendTokenSeller = (seller, statusCode, res) => {
    // creating jwt token
    const token = seller.getJwtToken();

    // setting cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode)
       .cookie('token', token, options)
       .json({
           success: true,
           token,
           seller
       });
};

export default sendTokenSeller;
