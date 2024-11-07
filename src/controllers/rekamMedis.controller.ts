import type { Response, Request } from 'express';
import {
   getRekamMedis,
    getRekamMedisById,
    createRekamMedisById
} from "../service/rekamMedis.service";
import { serverError } from '../utils/response';
import { RekamMedis } from '../models/rekamMedis.model';

export async function getRekamMedisController(req: Request, res: Response) {
    try {
        const result = await getRekamMedis();
        return res.status(result.status).send(result);
    } catch (error) {
        console.error('An error occurred while getting all rekam medis: ', error);
        return res.status(serverError.status).send(serverError);
    }
}

export async function getRekamMedisByIdController(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
        const result = await getRekamMedisById(id);
        return res.status(result.status).send(result);
    } catch (error) {
        console.error('An error occurred while getting rekam medis by id: ', error);
        return res.status(serverError.status).send(serverError);
    }
}

export async function createRekamMedisController(req: Request, res: Response) {
    const rekamMedis = req.body as RekamMedis;

    if (!rekamMedis.no_rekamMedis) {
        return res.status(400).send({
            status: 400,
            message: 'All fields are required',
        });
    }

    try {
        const result = await createRekamMedisById(rekamMedis);
        
        return res.status(200).send(result);
    } catch (error) {
        console.error('An error occurred while creating rekam medis: ', error);
        return res.status(serverError.status).send(serverError);
    }
}