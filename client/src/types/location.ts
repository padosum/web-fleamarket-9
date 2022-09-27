export type LocationType = {
  idx: number;
  name: string;
};

export interface UserLocationType {
  userId: number;
  locationId: number;
  locationName: string;
  locationCode: string;
}
