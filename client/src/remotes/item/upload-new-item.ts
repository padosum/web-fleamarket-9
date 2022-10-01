import API from '../../utils/api';

export interface UploadNewItemPayload {
  title: string;
  images: string[];
  thumbnail: string;
  price: number;
  contents: string;
  code: string;
  locationId: number;
  category: number;
}

export interface UploadNewItemResult {
  /** 등록된 상품의 고유번호 (e.g. 16) */
  id: number;
}

export async function uploadNewItem(
  payload: UploadNewItemPayload,
): Promise<UploadNewItemResult> {
  return API.post<UploadNewItemResult>({ url: '/api/item', data: payload });
}
