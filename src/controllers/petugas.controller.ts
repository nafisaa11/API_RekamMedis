import type { Response, Request } from 'express';
import { Petugas } from '../models/petugas.model';

import {
  createPetugas,
  loginPetugas,
  getPetugas,
  getPetugasById,
  // updatePetugas,
  // deletePetugas,
} from '../service/petugas.service';
import { serverError } from '../utils/response';

export async function loginPetugasController(req: Request, res: Response) {
  const petugas = req.body as Petugas;

  // ? : check if email and password are provided
  if (!petugas.email || !petugas.password) {
    return res.status(400).send({
      status: 400,
      message: 'Email and password are required',
    });
  }

  try {
    const result = await loginPetugas(petugas);

    // ! : set token in cookie if login is successful
    if (result.status === 200 && result.payload) {
      res.cookie('token', result.payload.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'none',
      });
    }

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while logging in petugas: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getPetugasController(req: Request, res: Response) {
  try {
    const result = await getPetugas();

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while fetching petugas: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getPetugasByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);

  // ? : check if id is provided
  if (!id) {
    return res.status(400).send({
      status: 400,
      message: 'ID is required',
    });
  }

  try {
    const result = await getPetugasById(id);

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while fetching petugas by id: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function createPetugasController(req: Request, res: Response) {
  const petugas = req.body as Petugas;

  // ? : check if nama_petugas, email, and password are provided
  if (!petugas.nama_petugas || !petugas.email || !petugas.password) {
    return res.status(400).send({
      status: 400,
      message: 'Nama, email, and password are required',
    });
  }

  try {
    const result = await createPetugas(petugas);

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while creating petugas: ', error);
    return res.status(serverError.status).send(serverError);
  }
}