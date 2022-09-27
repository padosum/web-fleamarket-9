import API from '../../utils/api';

export interface UploadImagePayload {
  file: File;
}

export interface UploadImageResult {
  url: string;
}

export async function uploadItemImage(payload: UploadImagePayload) {
  const formData = new FormData();
  formData.append('file', payload.file);

  return API.post<UploadImageResult>({
    url: '/api/image',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
