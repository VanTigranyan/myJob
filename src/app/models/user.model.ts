import { RoleTypes } from '../constants/role.types';

export interface User {
  company: {
    id: number,
    priority: number,
    expired: boolean,
  };
  distributor_type: RoleTypes;
  id: number;
  username: string;
  companies?: any[];
  created_at?: string;
  email?: string;
  jobSeeker?: any;
  password?: string;
  updated_at?: string;
}
