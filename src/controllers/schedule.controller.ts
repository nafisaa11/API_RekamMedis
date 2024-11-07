import { Response, Request } from 'express';
import { Schedule } from '../models/schedule.model';

import {
  getSchedules,
  createSchedule,
} from '../service/schedule.service';
import { serverError } from '../utils/response';

export async function getScheduleController(
  req: Request,
  res: Response
) {
  try {
    const result = await getSchedules();

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
      'An error occurred while getting all schedule: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createScheduleController(
  req: Request,
  res: Response
) {
  const bodyRequest: Schedule = req.body;

  try {
    const result = await createSchedule(bodyRequest);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status === 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while creating a schedule: ', error);
    return res.status(500).send({
      status: 500,
      message: 'Failed to create schedule',
    });
  }
}