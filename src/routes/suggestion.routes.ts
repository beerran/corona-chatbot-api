import express from 'express';

import { Converter } from '../models/suggestion';
import { DataService } from '../services/data.service';
import { ServiceCall } from './route-functions';

const service = new DataService('suggestions', Converter);
export const suggestionsRouter = express.Router();

suggestionsRouter.get('/:id', async (req, res) => ServiceCall(() => service.getById(req.params.id), res));
suggestionsRouter.get('/', async (_, res) => ServiceCall(() => service.getAll(), res));
suggestionsRouter.post('/', async (req, res) => ServiceCall(() => service.create(req.body), res, 201));
suggestionsRouter.put('/', async (req, res) => ServiceCall(() => service.update(req.body), res));
suggestionsRouter.delete('/:id', async (req, res) => ServiceCall(() => service.remove(req.params.id), res));