import { Dispatch } from 'react';
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { comma, getThumbnail } from '../../utils/util';
import { InfoTypes } from './useItemWriteDetail';
import { ITEM_UPLOAD } from '../../utils/constant';
import { uploadNewItem } from '../../remotes/item/upload-new-item';
import { updateItemInfo } from '../../remotes/item/update-item-info';
import { uploadItemImage } from '../../remotes/item/upload-image';
import { instance } from '../../utils/instance';

export const useItemWriteForm = (
  itemId: string | undefined,
  info: InfoTypes,
  setInfo: Dispatch<InfoTypes>,
  navigate: NavigateFunction,
  worker: SharedWorker,
) => {
  const onFileInputChange = async (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = evt.currentTarget.files;

    if (files?.length) {
      const img = files[0];
      evt.currentTarget.value = '';
      const { url } = await uploadItemImage({ file: img });

      setInfo({ ...info, imgUrls: [...info.imgUrls, url] });
    }
  };

  const onInputTextChange = (
    type: string,
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (type) {
      case 'title':
      case 'contents':
        setInfo({ ...info, [type]: evt.target.value });
        break;
      case 'price':
        setInfo({
          ...info,
          [type]: comma(evt.target.value),
        });
        break;
      case 'category':
        setInfo({ ...info, [type]: +evt.target.value });
    }
  };

  const onImageDeleteClick = (url: string) => {
    setInfo({
      ...info,
      imgUrls: info.imgUrls.filter((imgUrl) => imgUrl !== url),
    });
  };

  const checkValidation = () => {
    return !!(
      info.imgUrls.length > 0 &&
      info.title &&
      info.contents &&
      info.location &&
      info.category > 0
    );
  };

  const onSubmit = async (evt?: React.FormEvent) => {
    evt?.preventDefault();

    if (!checkValidation()) return;

    /** 썸네일 생성.. */
    const res = await instance.post('/api/image/convert', {
      url: info.imgUrls[0],
    });
    const base64 = 'data:image/jpeg;base64,' + res.data.base64;
    const thumbnail = await getThumbnail(base64, uploadItemImage);

    try {
      if (!itemId) {
        const confirm = window.confirm('물품을 등록하시겠습니까?');

        if (!confirm) return;

        await uploadNewItem({
          title: info.title,
          images: info.imgUrls,
          thumbnail,
          price: info.price ? +info.price.replace(/,/g, '') : 0,
          contents: info.contents,
          code: info.location,
          locationId: info.locationId,
          category: info.category,
        });

        worker.port.postMessage(
          JSON.stringify({
            event: ITEM_UPLOAD,
            data: {
              locationId: info.locationId,
              title: info.title,
              locationName: info.location,
            },
          }),
        );
        alert('물품을 등록했습니다.');
        navigate('/home?isMenuOpened=true', { replace: true });
      }

      if (itemId) {
        const confirm = window.confirm('물품을 수정하시겠습니까?');

        if (!confirm) return;

        await updateItemInfo(itemId, {
          title: info.title,
          images: info.imgUrls,
          thumbnail,
          price: +info.price.replace(/,/g, ''),
          contents: info.contents,
          code: info.location,
          locationId: info.locationId,
          category: info.category,
        });

        alert('물품을 수정했습니다.');
        navigate(`/item/${itemId}`, { replace: true });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err!.response!.data.message);
      }
    }
  };

  return {
    onSubmit,
    checkValidation,
    onFileInputChange,
    onImageDeleteClick,
    onInputTextChange,
  };
};
