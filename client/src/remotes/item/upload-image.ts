import { http } from '../_http';

export interface UploadImagePayload {
  file: File;
}

export interface UploadImageResult {
  url: string;
}

export async function uploadItemImage(payload: UploadImagePayload) {
  const formData = new FormData();
  formData.append('file', payload.file);
  return http.post<FormData, UploadImageResult>('/api/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
