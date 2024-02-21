class Apiresponse{
    constructor(status , data ,  message = "success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = this.statusCode <400
    }
}

export {Apiresponse}