const response = {
    errorResponse: (res, status, message) => {
        res.status(status).json({ error: message });
    },
    successResponse: (res, data) => {
        res.status(200).json(data);
    }
}

module.exports = response;