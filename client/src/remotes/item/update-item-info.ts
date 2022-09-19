import { http } from '../_http';
import { UploadNewItemPayload, UploadNewItemResult } from './upload-new-item';

export interface UpdateItemPayload extends UploadNewItemPayload {}
export interface UpdateItemResult extends UploadNewItemResult {}

export function updateItemInfo(itemId: string, payload: UpdateItemPayload) {
  return http.patch<UpdateItemPayload, UpdateItemResult>(
    `/api/item/${itemId}`,
    payload,
  );
}
