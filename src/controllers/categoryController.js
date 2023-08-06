const { Category } = require('../../models')


class CategoriesController {
    static findCategories = async (req, res, next) => {
        try {
            const data = await Category.findAll();
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static findCategoriesById = async (req, res, next) => {
        try{
            const {id} = req.params;
            const data = await Category.findOne({where: {id: +id}})
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static createCategories = async (req, res, next) => {
        try {
            const { name } = req.body;
            const data = await Category.create({
                name
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static updateCategories = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name} = req.body;
            const categories = await Category.update(
                {
                    name
                },
                {
                    where: { id: +id },
                }
            );
            res.status(200).json({ message: "Title updated successfully" });
        } catch (err) {
            next(err);
        }
    };

    static deleteCategories = async (req, res, next) => {
        try {
            const { id } = req.params;
            const findCategories = await Category.findOne({ where: { id: +id } });

            if (findCategories) {
                const categories = await Category.destroy({
                    where: { id: +id }
                });
                if (categories) {
                    res.status(200).json({
                        message: "Category deleted successfully"
                    });
                }
            } else {
                next({ name: "ErrorNotFound" });
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = CategoriesController;
