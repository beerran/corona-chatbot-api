import express from 'express';

import { Converter } from '../models/question-variant';
import { DataService } from '../services/data.service';
import { ServiceCall } from './route-functions';

const service = new DataService('question-variants', Converter);
export const questionVariantsRouter = express.Router();

questionVariantsRouter.get('/:id', async (req, res) => ServiceCall(() => service.getById(req.params.id), res));
questionVariantsRouter.get('/', async (_, res) => ServiceCall(() => service.getAll(), res));
questionVariantsRouter.post('/', async (req, res) => ServiceCall(() => service.create(req.body), res, 201));
questionVariantsRouter.put('/', async (req, res) => ServiceCall(() => service.update(req.body), res));
questionVariantsRouter.delete('/:id', async (req, res) => ServiceCall(() => service.remove(req.params.id), res));