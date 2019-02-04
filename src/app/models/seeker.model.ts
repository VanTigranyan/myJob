export interface JobSeeker {
  birth_day: string | null;
  birth_month: string | null;
  birth_year: string | null;
  can_start_working: null | any;
  created_at: string | null;
  current_career_level: string | null;
  current_job_employer: string | null;
  current_job_endmonth: string | null;
  current_job_endyear: string | null;
  current_job_startmonth: string | null;
  current_job_startyear: string | null;
  current_job_title: string | null;
  current_salary: string | number | null;
  cv: {
    attachments: any[],
    id?: number;
  };
  education_degree: string | null;
  education_level: string | null;
  email_sending_errors: any;
  full_name: string;
  id: number;
  living_location: any;
  location: string | null;
  log_in_key: string;
  phone: string | null;
  previous_career_level: any;
  previous_job_employer: any;
  previous_job_endmonth: any;
  previous_job_endyear;
  previous_job_startmonth;
  previous_job_startyear;
  previous_job_title;
  region_id;
  subscribed_for_promotions: boolean;
  subscribed_for_upload_cv: boolean;
  successful_update_to_zoho: string | null;
  update_from_zoho_errors;
  update_to_zoho_errors;
  updated_at: string | null;
  user_id: number;
  worked_outside_myanmar;
  years_of_experience;
  years_of_experience_in_previous_job;
  zoho_id: string | null;
}
