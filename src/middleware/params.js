const checkParams = async (req, res, next) => {
    const params = ['from', 'to', 'day'];
    let keys = Object.keys(req.query)

    const isValid = keys.every((update) => params.includes(update))
    
    if(keys.length !== 3 || !isValid)
        res.status(400).send({ error: 'Params issue!' })
    
    next()
} 

module.exports = checkParams