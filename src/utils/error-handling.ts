function throw_err (msg: string, code: number) {
    const err = new Error(msg)

    const errData = {
        message: err.message,
        statusCode: code
    }
    
    throw errData
}

export default throw_err