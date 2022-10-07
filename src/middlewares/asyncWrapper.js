const asyncWrapper = (routeHandler) => {
    return async (request, response, next) => {
        try {
            await routeHandler(request, response);
        } catch (exception) {
            return response.status(500).json({ message: exception });
        }
    }
}

module.exports = asyncWrapper;