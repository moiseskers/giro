// hello.js
module.exports = (req, res, next) => {
    if (req.method === 'POST'  || req.method === 'PATCH' || req.method === 'PUT') {

        setTimeout(() => {
            res.status(200).send({ message: 'POST requests are not allowed to modify the database' });
        }, 1000);

        // Return early to prevent further processing
        return;
    }
    next(); // Pass through to JSON Server for other methods
}
