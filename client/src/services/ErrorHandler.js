export const handleError = (err) => {
    const ERROR_NAME = {
        TECHNICAL_ERROR: `Oh Snap!`,
        UNAUTHORIZED_ERROR: "Unauthorized Error",
    }

    if (err.response && err.response.status) {
        if (err.response.status === 401) {
            err.response.name = ERROR_NAME.UNAUTHORIZED_ERROR
            err.message = 'Session expired, please login again.'
            return err
        } else {
            console.log(err);
            console.log(err.response);
            err.response.name = ERROR_NAME.TECHNICAL_ERROR
            err.message = `Unknown technical error occured.`
            return err
        }

    } else {
        err.response = {
            status: 500,
            name: ERROR_NAME.TECHNICAL_ERROR,
        };
        return err;
    }
}