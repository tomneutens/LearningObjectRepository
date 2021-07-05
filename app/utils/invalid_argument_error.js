class InvalidArgumentError extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidArgumentError";
    }
}

export default InvalidArgumentError;