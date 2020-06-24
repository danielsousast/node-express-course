import Product from '../models/Product';
import Category from '../models/Category';

class ProductController {
    async index(req, res) {
        const products = await Product.find();

        return res.json(products);
    }

    async show(req, res) {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product) {
            return res.status(400).json({error:'Product does not found'});
        }

        return res.json(product);
    }

    async store(req, res) {
        const {name, description, price, category} = req.body;

        const productExists = await Product.findOne({name});

        if(productExists) {
            return res.status(400).json({error:'Product already not exists'})
        }

        const product = await Product.create({
            name, description, price, category
        });

        return res.json(product);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name, description, price, category} = req.body;

        const product = await Product.findById(id);

        if(!product) {
            return res.status(400).json({error:'Product does not found'});
        }

        if(name) {
            const productExists = await Product.findOne({name});

            if(productExists) {
                return res.status(400).json({error:'Product already not exists'})
            }
        }

        if(category) {
            const categoryExists = await Category.findById(category);

            if(!categoryExists) {
                return res.status(400).json({error:'Category does not exists'})
            }
        }

        await product.updateOne({
            name, description, price,category
        })

        return res.json(product);
    }

    async delete(req, res) {
        const {id} = req.params;

        const product = await Product.findById(id);

        if(!product) {
            return res.status(400).json({error:'Product does not found'});
        }

        await product.remove()

        return res.status(204).send();
    }
}

export default new ProductController();