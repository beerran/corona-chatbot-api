import express from 'express';

import HttpException from '../common/http-exception';
import { Converter } from '../models/suggestion';
import { DataService } from '../services/data.service';
import e from 'express';

const service = new DataService('suggestions', Converter);

export const suggestionsRouter = express.Router();

suggestionsRouter.get('/:id', async (req, res) => Call(() => service.getById(req.params.id), res));
suggestionsRouter.get('/', async (_, res) => Call(() => service.getAll(), res));
suggestionsRouter.post('/', async (req, res) => Call(() => service.create(req.body), res, 201));
suggestionsRouter.put('/', async (req, res) => Call(() => service.update(req.body), res));
suggestionsRouter.delete('/:id', async (req, res) => Call(() => service.remove(req.params.id), res));

function Call(callback: () => Promise<any>, res: e.Response, statusCode = 200) {
    try {
        callback().then(success => res.status(statusCode).send(success), err => BadRequest(res, err));
    } catch (err) {
        InternalServerError(res, err);
    }
}
const BadRequest = (res: e.Response<any>, err: any) => res.status(400).send(new HttpException(400, err.message));
const InternalServerError = (res: e.Response<any>, err: any) => res.status(500).send(new HttpException(400, err.message));