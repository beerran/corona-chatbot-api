import express from 'express';

import { Converter } from '../models/faq';
import { DataService } from '../services/data.service';
import { ServiceCall } from './route-functions';

const service = new DataService('faqs', Converter);
export const faqsRouter = express.Router();

faqsRouter.get('/:id', async (req, res) => ServiceCall(() => service.getById(req.params.id), res));
faqsRouter.get('/', async (_, res) => ServiceCall(() => service.getAll(), res));
faqsRouter.post('/', async (req, res) => ServiceCall(() => service.create(req.body), res, 201));
faqsRouter.put('/', async (req, res) => ServiceCall(() => service.update(req.body), res));
faqsRouter.delete('/:id', async (req, res) => ServiceCall(() => service.remove(req.params.id), res));