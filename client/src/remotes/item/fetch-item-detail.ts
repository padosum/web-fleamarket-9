import { http } from '../_http';

export interface ItemDetailTypes {
  category: number;
  chatRoomCount: number;
  contents: string;
  /** 이미지 url을 ,로 구분하여 받습니다. (e.g. "https://amazonaws.com/16633, https://amazonaws.com/16632") */
  images: string;
  isLike: number;
  /** 아이템이 등록된 동네 정보 (e.g. "서울특별시 송파구 잠실동") */
  location: string;
  likeCount: number;
  price: string;
  seller: number;
  sellerName: string;
  status: number;
  title: string;
  updatedAt: string;
  viewCount: number;
  categoryName: string;
}

export async function fetchItemDetail(itemId: string) {
  return http.get<ItemDetailTypes>(`/api/item/${itemId}`);
}
