module.exports = (req, res) => {
    const requestToken = req.headers["x-auth-token"];
    if (requestToken) res.set("x-auth-token", requestToken);
};