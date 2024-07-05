export type RawPackage = {
  id: string;
  width: number;
  height: number;
  price: number;
  minAmount?: number;
  photosPerItem?: number;
};

export type PhotoPackage = {
  id: string;
  width: number;
  height: number;
  price: number;
  minAmount: number;
  photosPerItem: number;
  free?: boolean;
};
