exports.getMany = model => async (req, res) => {
    try {
        const docs = await model.find({});
        if (!docs) {
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
        if (!doc) {
            return res.status(404).json({ error: '404 Not Found!'});
        }
        res.status(200).json({ data: doc});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.createOne = model => async (req, res) => {
    try {
        const createDoc = await model.create(req.body);
        res.status(201).json({ message: 'Created Successfully!', data: createDoc });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.updateOne = model => async (req, res) => {
    try {
        const updateDoc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateDoc) {
            return res.status(404).json({ error: '404 Not Found!' });
        }
        res.status(200).json({ message: 'Updated Successfully!', data: updateDoc });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.removeOne = model => async (req, res) => {
    try {
        const removeDoc = await model.findByIdAndRemove(req.params.id);
        if (!doc) {
            return res.status(404).json({ error: '404 Not Found!' });
        }
        res.status(200).json({ message: 'Deleted Successfully!', data: removeDoc });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.crudControllers = (model) => ({
    removeOne: this.removeOne(model),
    updateOne: this.updateOne(model),
    getMany: this.getMany(model),
    getOne: this.getOne(model),
    createOne: this.createOne(model)
})