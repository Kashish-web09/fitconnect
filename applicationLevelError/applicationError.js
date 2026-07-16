
export default class applicationError extends Error{
    constructor(errMessage,errStatuscode) {
        super(errMessage);
        this.errStatuscode=errStatuscode
    }
}