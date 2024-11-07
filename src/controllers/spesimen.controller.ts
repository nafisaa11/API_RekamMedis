import { Response, Request } from 'express';
import { Spesimen } from '../models/spesimen.model';

import {
  getSpesimen,
  getSpesimenById,
  createSpesimen,
} from '../service/spesimen.service';
import { serverError } from '../utils/response';

export async function getSpesimenController(
  req: Request,
  res: Response
) {
  try {
    const result = await getSpesimen();

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
      'An error occurred while getting all spesimen: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getSpesimenByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid spesimen ID',
    });
  }

  try {
    const result = await getSpesimenById(id);

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
      `An error occurred while getting spesimen with id ${id}: `,
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createSpesimenController(
  req: Request,
  res: Response
) {
  const spesimen: Spesimen = req.body;

  try {
    const result = await createSpesimen(spesimen);

    // ?
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
  }
  catch (error) {
    console.error('An error occurred while creating spesimen: ', error);
    return res.status(serverError.status).send(serverError);
  }
}