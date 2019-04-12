// If the request has an authToken, assign it to the response headers, 
// then assign all headers in the provided headerObj to the response.
module.exports = (req, res, headerObj) => {
    const requestToken = req.headers["x-auth-token"];
    if (requestToken) headerObj["x-auth-token"] = requestToken;

    for (let key in headerObj) {
        res.set(key, headerObj[key]);
    }
};