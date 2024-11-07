import { Response, Request } from 'express';
import { Pemeriksaan } from '../models/pemeriksaan.model';

import {
  getPemeriksaan,
  getPemeriksaanById,
  createPemeriksaan,
} from '../service/pemeriksaan.service';
import { serverError } from '../utils/response';

export async function getPemeriksaanController(
  req: Request,
  res: Response
) {
  try {
    const result = await getPemeriksaan();

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
      'An error occurred while getting all pemeriksaan: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getPemeriksaanByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid pemeriksaan ID',
    });
  }

  try {
    const result = await getPemeriksaanById(id);

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
      'An error occurred while getting pemeriksaan by ID: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createPemeriksaanController(
  req: Request,
  res: Response
) {
  const bodyRequest: Pemeriksaan = req.body;

  try {
    const result = await createPemeriksaan(bodyRequest);

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
      'An error occurred while creating a pemeriksaan: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}