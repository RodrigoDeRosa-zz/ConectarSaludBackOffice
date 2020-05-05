/* tslint:disable */
export interface Doctor {
  first_name: string;
  last_name: string;
  dni: string;
  email: string;
  licence: string;
  specialties: string[];
  centers: string[];
  availability_times: {day:string, from_time:string, to_time}[];
  available?: boolean;
}
