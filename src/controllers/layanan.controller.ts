import { Response, Request } from 'express';
import { Layanan } from '../models/layanan.model';

import {
  getLayanan,
  getLayananById,
  createLayanan,
} from '../service/layanan.service';
import { serverError } from '../utils/response';

export async function getLayananController(
  req: Request,
  res: Response
) {
  try {
    const result = await getLayanan();

    // ? : check if result is doesn't have status or invalid status
    if (
      result &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting all layanan: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getLayananByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid layanan ID',
    });
  }

  try {
    const result = await getLayananById(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting layanan by ID: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createLayananController(
  req: Request,
  res: Response
) {
  const bodyRequest: Layanan = req.body;

  try {
    const result = await createLayanan(bodyRequest);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while creating layanan: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}