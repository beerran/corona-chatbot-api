import express from 'express';

import { Converter } from '../models/source';
import { DataService } from '../services/data.service';
import { ServiceCall } from './route-functions';

const service = new DataService('sources', Converter);
export const sourcesRouter = express.Router();

sourcesRouter.get('/:id', async (req, res) => ServiceCall(() => service.getById(req.params.id), res));
sourcesRouter.get('/', async (_, res) => ServiceCall(() => service.getAll(), res));
sourcesRouter.post('/', async (req, res) => ServiceCall(() => service.create(req.body), res, 201));
sourcesRouter.put('/', async (req, res) => ServiceCall(() => service.update(req.body), res));
sourcesRouter.delete('/:id', async (req, res) => ServiceCall(() => service.remove(req.params.id), res));