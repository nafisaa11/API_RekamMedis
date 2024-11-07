import type { Response, Request } from 'express';
import { Pasien } from '../models/pasien.model';

import {
  createPasien,
  // loginPasien,
  getPasiens,
  getPasienById,
} from "../service/pasien.service";
import { serverError } from '../utils/response';

// export async function loginPasienController(req: Request, res: Response) {
//   const pasien = req.body as Pasien;

//   // ? : check if email and password are provided
//   if (!pasien.email || !pasien.password) {
//     return res.status(400).send({
//       status: 400,
//       message: 'Email and password are required',
//     });
//   }

//   try {
//     const result = await loginPasien(pasien);

//     // ! : set token in cookie if login is successful
//     if (result.status === 200 && result.payload) {
//       res.cookie('token', result.payload.token, {
//         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//         httpOnly: false,
//         secure: process.env.NODE_ENV === 'production',
//         // sameSite: 'none',
//       });
//     }

//     return res.status(result.status).send(result);
//   } catch (error) {
//     console.error('An error occurred while logging in pasien: ', error);
//     return res.status(serverError.status).send(serverError);
//   }
// }

export async function createPasienController(req: Request, res: Response) {
  const pasien = req.body as Pasien;

  // ? : check if those field are provided
  if (
    !pasien.nama_lengkap
  ) {
    return res.status(400).send({
      status: 400,
      message: 'All fields are required',
    });
  }

  try {
    const result = await createPasien(pasien);

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while creating pasien: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getPasiensController(req: Request, res: Response) {
  try {
    const result = await getPasiens();

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while fetching pasiens: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getPasienByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid id',
    });
  }

  try {
    const result = await getPasienById(id);

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while fetching pasien by id: ', error);
    return res.status(serverError.status).send(serverError);
  }
}