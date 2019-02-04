import { Job } from './job.model';

export interface JobsResponse {
  jobs: Job[];
  total: number;
}
