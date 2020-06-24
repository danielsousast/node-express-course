import Category from '../models/Category';

class CategoryController {
    async index(req, res) {
        const categories = await Category.find();

        return res.json(categories);
    }

    async show(req, res) {
        const category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(400).json({error:'Category does not found'});
        }

        return res.json(category);
    }

    async store(req, res) {
        const {name} = req.body;

        const categoryExists = await Category.findOne({name});

        if(categoryExists) {
            return res.status(400).json({error:'Category already exists'})
        }

        const category = await Category.create({
            name
        })

        return res.json(category);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name} = req.body;

        const category = await Category.findById(id);

        if(!category) {
            return res.status(400).json({error:'Category does not found'});
        }

        if(name && category.name !== name) {
            const categoryExists = await Category.findOne({name});

            if(categoryExists) {
                return res.status(400).json({error:'Category already exists'})
            }
        }

        await category.updateOne({name})

        return res.json(category);
    }

    async delete(req, res) {
        const {id} = req.params;

        const category = await Category.findById(id);

        if(!category) {
            return res.status(400).json({error:'Category does not found'});
        }

        await category.remove();

        return res.status(204).send();
    }
}

export default new CategoryController();