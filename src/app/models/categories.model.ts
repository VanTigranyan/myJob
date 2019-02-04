export interface Category {
  created_at: string;
  hidden: boolean;
  id: number;
  is_main: boolean;
  jobCategories: {
    category_id: number,
    job_id: number,
    order_index: number,
  };
  name: string;
  updated_at: string;
}
