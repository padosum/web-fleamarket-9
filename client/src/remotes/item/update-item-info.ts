import API from '../../utils/api';
import { UploadNewItemPayload, UploadNewItemResult } from './upload-new-item';

export interface UpdateItemPayload extends UploadNewItemPayload {}
export interface UpdateItemResult extends UploadNewItemResult {}

export function updateItemInfo(itemId: string, payload: UpdateItemPayload) {
  return API.patch<UpdateItemResult>({
    url: `/api/item/${itemId}`,
    data: payload,
  });
}
