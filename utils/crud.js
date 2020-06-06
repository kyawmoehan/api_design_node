exports.getMany = model => async (req, res) => {
    try {
        const docs = await model.find({ createdBy: req.user._id }).select('-__v');
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
        const doc = await model.findOne({ createdBy: req.user._id, _id: req.params.id }).select('-__v');
        if (!doc) {
            return res.status(404).json({ error: '404 Not Found!'});
        }
        res.status(200).json({ data: doc});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.createOne = model => async (req, res) => {
    const createdBy = req.user._id;

    try {
        const createDoc = await model.create({ ...req.body, createdBy });
        res.status(201).json({ message: 'Created Successfully!', data: createDoc });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.updateOne = model => async (req, res) => {
    try {
        const updateDoc = await model.findOneAndUpdate({
            createdBy: req.user._id,
            _id: req.params.id
        }, 
        req.body, 
        { 
            new: true 
        })
        .select('-__v');
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
        const removeDoc = await model.findOneAndRemove({
            createdBy: req.user._id,
            _id: req.params.id
          }).select('-__v');
        if (!removeDoc) {
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