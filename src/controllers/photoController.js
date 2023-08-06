const { Photo, Category} = require('../../models')
const fs = require('fs')


class PhotoController {
    static findPhoto = async (req, res, next) => {
        try {
            let {  category_id } = req.query;
          
            const queryFilter = {
              include: [
                {
                  model: Category,
                  where: category_id ? { id: category_id } : {},
                  attributes: [] // To exclude category attributes from the result
                }
              ]
            };
            const  data = await Photo.findAll(queryFilter);
            res.status(200).json(data);
          } catch (err) {
            next(err);
          }
    };

    static findPhotoById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Photo.findOne({ where: { id: +id } })
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static createPhoto = async (req, res, next) => {
        try {
            const image = req.file.path;
            const { title, category_id } = req.body;
            const data = await Photo.create({
                title,
                image: `http://localhost:3001/${image}`,
                category_id,
                user_id: +req.loggedUser.id,
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static updatePhoto = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, category_id } = req.body;
            let fileName = "";

            if (req.file === undefined) {
                const updatedPhoto = await Photo.update(
                    {
                        title,
                        category_id,
                    },
                    {
                        where: { id: +id },
                    })
            } else {
                const image = req.file.path;
                fileName = `http://localhost:3001/${image}`;

                const post = await Photo.findByPk(+id);
                if (post.image) {
                    const filePath = post.image.replace("http://localhost:3001/", "");
                    fs.unlinkSync(filePath);
                }
                const updatedPhoto = await Photo.update(
                    {
                        title,
                        image: fileName,
                        category_id,
                    },
                    {
                        where: { id: +id },
                    })
            }
            res.status(200).json({ message: "Photo updated successfully" });
        } catch (err) {
            next(err);
        }
    }

    static deletePhoto = async (req, res, next) => {
        try {
            const { id } = req.params;
            const findtask = await Photo.findOne({ where: { id: +id } });

            if (findtask) {
                const task = await Photo.destroy({
                    where: { id: +id }
                });
                if (task) {
                    res.status(200).json({
                        message: "Photo deleted successfully"
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

module.exports = PhotoController;