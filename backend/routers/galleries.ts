import express from 'express';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Gallery from '../models/Gallery';
import permit from '../middleware/permit';

const galleriesRouter = express.Router();

galleriesRouter.post('/', auth, permit('user', 'admin'), imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const image = new Gallery({
      user: req.user?._id,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
    });

    await image.save();
    return res.send(image);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

galleriesRouter.get('/', async (req, res, next) => {
  try {
    let imagesData;
    const authorId = req.query.author as string;

    if (authorId) {
      imagesData = await Gallery.find({user: authorId}).populate('user', 'displayName');
    } else {
      imagesData = await Gallery.find().populate('user', 'displayName');
    }

    return res.send(imagesData);
  } catch (error) {
    return next(error);
  }
});

galleriesRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.send({error: 'Неверный идентификатор!'});
    }

    const imageData = await Gallery.findOne({_id: id});
    return res.send(imageData);
  } catch (error) {
    return next(error);
  }
});

galleriesRouter.delete('/:id', auth, permit('user', 'admin'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id as string;
    const userId = req.user?._id;

    if (req.user) {
      if (req.user?.role === 'admin') {
        await Gallery.findByIdAndDelete(id);
        return res.send({message: 'Изображение удалено администратором!'});
      } else if (req.user?.role === 'user') {
        await Gallery.findOneAndDelete({_id: id, user: userId});
        return res.send({message: 'Изображение удалено пользователем!'});
      }
    } else {
      return res.status(403).send({error: 'Доступ запрещен! У вас нет прав на удаление!'});
    }

  } catch (error) {
    return next(error);
  }
});

export default galleriesRouter;