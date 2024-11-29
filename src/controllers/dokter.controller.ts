import type { Response, Request } from 'express';
import { Dokter } from '../models/dokter.model';
import {
  createDokter,
  getDokters,
  deleteDokter,
  updateDokter, // Pastikan ini diimpor
} from "../service/dokter.service";
import { serverError } from '../utils/response';

export async function createDokterController(req: Request, res: Response) {
  const dokter = req.body as Dokter;

  // Check if all required fields are provided
  if (
    !dokter.nama ||
    !dokter.npi ||
    !dokter.jenis_kelamin ||
    !dokter.tanggal_lahir ||
    !dokter.no_hp ||
    !dokter.email ||
    !dokter.spesialisasi ||
    !dokter.tanggal_lisensi ||
    !dokter.password
  ) {
    return res.status(400).send({
      status: 400,
      message: 'All fields must be filled',
    });
  }

  try {
    const result = await createDokter(dokter);
    return res.status(result.status).send(result); // Gunakan status yang sesuai
  } catch (error) {
    console.error('An error occurred while creating dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getDoktersController(req: Request, res: Response) {
  try {
    const result = await getDokters();

    if (result && result.status >= 200 && result.status < 300) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while getting all dokters: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteDokterController(req: Request, res: Response) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid dokter ID',
    });
  }

  try {
    const result = await deleteDokter(id);

    if (result && result.status >= 200 && result.status < 300) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while deleting dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateDokterController(req: Request, res: Response) {
  const id = req.params.id;
  const dokterUpdates = req.body as Dokter;

  if (!id) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid dokter ID',
    });
  }

  // Check if all required fields are provided (optional, adjust as necessary)
  if (
    !dokterUpdates.nama ||
    !dokterUpdates.npi ||
    !dokterUpdates.jenis_kelamin ||
    !dokterUpdates.tanggal_lahir ||
    !dokterUpdates.no_hp ||
    !dokterUpdates.email ||
    !dokterUpdates.spesialisasi ||
    !dokterUpdates.tanggal_lisensi
  ) {
    return res.status(400).send({
      status: 400,
      message: 'All fields must be filled',
    });
  }

  try {
    const result = await updateDokter(id, dokterUpdates);

    // Cek status dari hasil yang dikembalikan
    if (result.status >= 200 && result.status < 300) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while updating dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}