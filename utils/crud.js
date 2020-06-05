exports.getMany = model => async (req, res) => {
    try {
        const docs = await model.find({});
        if (docs) {
            return res.status(404).json({ error: '404 Not Foud!'});
        } 
        res.status(200).json({ data: docs });
    } catch (error) {
        res.status(500).send({ error: error});
    }
}

exports.getOne = model => async (req, res) => {
    const id = req.params.id;
    
    try {
        const doc = await model.findById(id);
        console.log(doc);
        if (!doc) {
            return res.status(404).json({ error: '404 Not Found!'});
        }
        res.status(200).json({ data: doc});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.createOne = model => async (req, res) => {
    res.send({ Message: "createOne!" });
}

exports.updateOne = model => async (req, res) => {
    res.send({ Message: "updateOne!" });
}

exports.removeOne = model => async (req, res) => {
    res.send({ Message: "removeOne!"});
}

exports.crudControllers = (model) => ({
    removeOne: this.removeOne(model),
    updateOne: this.updateOne(model),
    getMany: this.getMany(model),
    getOne: this.getOne(model),
    createOne: this.createOne(model)
})