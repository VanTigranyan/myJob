import { Category } from './categories.model';
import { Application } from './application.model';
import { Company } from './company.model';
import { Region } from './region.model';

export interface Job {
  allApplications: number;
  applications: Application[];
  categories: Category[];
  categoriesText: string;
  company: Company;
  company_id: number;
  confirmed: boolean;
  conversion: string;
  conversion_code: string;
  created_at: string;
  cvApplications: number;
  firstInterviewApplications: number;
  id: number;
  is_active: boolean;
  newApplications: number;
  nextApplications: number;
  offerApplications: number;
  refreshText: string;
  refresh_date: string;
  refreshedBeforeDays: number;
  regions: Region[];
  rejectedApplications: number;
  secondInterviewApplications: number;
  shortListApplications: number;
  title: string;
  views: number;
}
