export interface Region {
  id: number;
  jobRegions: {
    job_id: number,
    order_index: number,
    region_id: number,
  };
  name: string;
  sortorder: number;
}
