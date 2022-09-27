import { UserLocationType } from './location';

export interface UserType {
  idx: number;
  id: string;
  name: string;
  location: UserLocationType[];
}
