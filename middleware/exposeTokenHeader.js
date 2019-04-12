module.exports = (res) => {
    res.set('Access-Control-Expose-Headers', 'x-auth-token');
};