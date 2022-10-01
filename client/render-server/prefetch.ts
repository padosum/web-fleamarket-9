import Express from 'express';
import hash from 'object-hash';
import { html } from './html';
import {
  fetchItemDetail,
  ItemDetailTypes,
} from '../src/remotes/item/fetch-item-detail';
import { fetchItemList } from '../src/remotes/item/fetch-item-list';
import {
  CATEGORY_ID_QUERY_STRING,
  LOCATION_ID_QUERY_STRING,
} from '../src/hooks/useHomeMenuOpenStates';
import { ItemTypes } from '../src/hooks/useHomeItem';

export const router = Express.Router();

/** 메인 페이지 (e.g. "http://localhost:3000" ) */
router.get('/', (req, res) => {
  res.contentType('html').send(html({ routePath: req.url }));
});

/** 아이템 리스트 페이지 (e.g. "http://localhost:3000/home" ) */
router.get('/home', async (req, res) => {
  let itemList: ItemTypes[] = [];
  try {
    const categoryId = req.query[CATEGORY_ID_QUERY_STRING] as string;
    const locationId = req.query[LOCATION_ID_QUERY_STRING] as string;

    const results = await fetchItemList({ page: 1, categoryId, locationId });

    itemList = results.map((item) => {
      return {
        chatRoomCount: item.chatRoomCount,
        idx: item.idx,
        image: item.images.split(',')[0],
        thumbnail: item.thumbnail,
        isLike: !!item.isLike,
        likeCount: item.likeCount,
        location: item.location,
        price: +item.price,
        title: item.title,
        updatedAt: item.updatedAt,
      };
    });
  } catch (err) {
    console.log(err);
  } finally {
    res.setHeader('Cache-Control', 'max-age=0');

    res
      .contentType('html')
      .send(html({ routePath: req.url, initialItems: itemList }));
  }
});

/** 아이템 상세 페이지 (e.g. "http://localhost:3000/item/661") */
router.get('/item/:id', async (req, res) => {
  let itemDetail: ItemDetailTypes;
  try {
    const itemId = req.params.id;
    itemDetail = await fetchItemDetail(itemId);
  } catch (err) {
    console.log(err);
  } finally {
    const HTML = html({ routePath: req.url, initialItemInfo: itemDetail! });

    const hashed = hash({
      title: itemDetail!.title,
      contents: itemDetail!.contents,
      location: itemDetail!.location,
      sellerName: itemDetail!.sellerName,
    });

    res
      .setHeader('ETag', `W/"${hashed}"`)
      .setHeader('Cache-Control', 'max-age=0');

    res.contentType('html').send(HTML);
  }
});

/** 이외 페이지는 SSR 처리안함. */
router.get('*', (req, res) => {
  res.contentType('html').send(html({ routePath: req.url }));
});
