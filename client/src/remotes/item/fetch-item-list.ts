import { AxiosRequestHeaders } from 'axios';
import API from '../../utils/api';

export interface ListItemTypes {
  idx: number;
  /** 이미지 url을 ,로 구분하여 받습니다. (e.g. "https://amazonaws.com/16633, https://amazonaws.com/16632") */
  images: string;
  thumbnail: string;
  category: number;
  updatedAt: string;
  createdAt: string;
  title: string;
  contents: string;
  likeCount: number;
  price: string;
  seller: number;
  location: string;
  viewCount: number;
  status: number;
  locationId: number;
  isLike: number;
  chatRoomCount: number;
}

interface ParamTypes {
  categoryId?: string;
  locationId?: string;
  page: number;
}

export async function fetchItemList(
  params: ParamTypes,
  axiosHeader?: AxiosRequestHeaders,
) {
  return API.get<ListItemTypes[]>({
    url: `/api/item`,
    params,
    headers: axiosHeader,
  });
}
