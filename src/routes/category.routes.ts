import express from 'express';

import { Converter } from '../models/category';
import { DataService } from '../services/data.service';
import { ServiceCall } from './route-functions';

const service = new DataService('categories', Converter);
export const categoriesRouter = express.Router();

categoriesRouter.get('/:id', async (req, res) => ServiceCall(() => service.getById(req.params.id), res));
categoriesRouter.get('/', async (_, res) => ServiceCall(() => service.getAll(), res));
categoriesRouter.post('/', async (req, res) => ServiceCall(() => service.create(req.body), res, 201));
categoriesRouter.put('/', async (req, res) => ServiceCall(() => service.update(req.body), res));
categoriesRouter.delete('/:id', async (req, res) => ServiceCall(() => service.remove(req.params.id), res));