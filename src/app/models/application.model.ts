import { StatusTypes } from '../constants/status.types';
import { JobSeeker } from './seeker.model';

export interface Application {
  app_status: StatusTypes;
  attachments: any[];
  id: number;
  jobSeeker: JobSeeker;
}
