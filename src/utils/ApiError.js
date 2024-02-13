class ApiError extends Error{
    constructor(
        StatusCode ,
        message = "Something went wrong",
        error = [],
        stack = ""
    ){
        super(message)
        this.StatusCode = StatusCode
        this.data = nullthis.message = message
        this.success = false;
        this.errors = this.errors

    }
}

export {ApiError}