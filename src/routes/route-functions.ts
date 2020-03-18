import express from 'express';
import HttpException from '../common/http-exception';

export const ServiceCall = (callback: () => Promise<any>, res: express.Response, statusCode = 200) => {
    try {
        callback().then(success => res.status(statusCode).send(success), err => BadRequest(res, err));
    } catch (err) {
        InternalServerError(res, err);
    }
}
const BadRequest = (res: express.Response<any>, err: any) => res.status(400).send(new HttpException(400, err.message));
const InternalServerError = (res: express.Response<any>, err: any) => res.status(500).send(new HttpException(400, err.message));