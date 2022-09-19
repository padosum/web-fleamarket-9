import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useRef,
} from 'react';
import { Navigate, NavigateFunction } from 'react-router-dom';
import { User } from '../../context/AuthContext';
import { ImgButton, LocationBar, Spacing, TextInput } from '../Base';
import { CategoryButton } from '../Category/CategoryButton';
import { WriteHeader } from '../Header/WriteHeader';
import { InfoTypes } from '../../hooks/Write';
import * as Styled from './WriteView.styled';

interface WriteViewProps {
  onSubmit: FormEventHandler;
  isLoggedIn: boolean;
  user: User | null;
  checkValidation: () => boolean;
  navigate: NavigateFunction;
  onFileInputChange: ChangeEventHandler;
  info: InfoTypes;
  onImageDeleteClick: (imgUrl: string) => void;
  onInputTextChange: (
    type: string,
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  categories: any[];
}

export const WriteView = ({
  onSubmit,
  isLoggedIn,
  user,
  checkValidation,
  navigate,
  onFileInputChange,
  info,
  onImageDeleteClick,
  onInputTextChange,
  categories,
}: WriteViewProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const { title, contents, price } = info;

  const onImageAddClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={onSubmit}>
      {!isLoggedIn && <Navigate to="/home" replace />}
      {isLoggedIn && user?.location.length === 0 && (
        <Navigate to="/location" replace />
      )}
      <Styled.WriteWrapper>
        <Styled.HeaderWrapper>
          <WriteHeader
            title={'글쓰기'}
            color={'white'}
            active={checkValidation()}
            onClickBack={() => navigate(-1)}
            onClickCheck={onSubmit}
          />
        </Styled.HeaderWrapper>

        <input
          type="file"
          onChange={onFileInputChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
        />

        <Styled.ImgWrap>
          <Styled.HorizontalSpacing width={16} />
          <ImgButton.Add
            onClick={onImageAddClick}
            text={`${info.imgUrls.length}/10`}
          />
          {info.imgUrls.map((imgUrl) => {
            return [
              <Styled.HorizontalSpacing key={'space' + imgUrl} width={16} />,
              <ImgButton.Delete
                onClick={onImageDeleteClick.bind(null, imgUrl)}
                key={'img' + imgUrl}
                src={imgUrl}
              />,
            ];
          })}
          <Styled.HorizontalSpacing width={16} />
        </Styled.ImgWrap>

        <Styled.BodyWrapper>
          <Styled.HorizontalBar />
          <Spacing height={24} />
          <TextInput.NoBorder
            onChange={onInputTextChange.bind(null, 'title')}
            placeholder="글 제목"
            data-cy="title"
            value={title}
            maxLength={30}
          />
          {title && (
            <>
              <Spacing height={5} />
              <Styled.CategoryWrapper className="no-scroll">
                <CategoryButton
                  initialCategory={info.category}
                  categories={categories}
                  onChange={onInputTextChange.bind(null, 'category')}
                />
              </Styled.CategoryWrapper>
            </>
          )}

          <Spacing height={24} />
          <Styled.HorizontalBar />
          <Spacing height={24} />
          <TextInput.NoBorder
            onChange={onInputTextChange.bind(null, 'price')}
            value={price ? '₩ ' + price : ''}
            placeholder="₩ 가격(선택사항)"
            data-cy="price"
            maxLength={15}
          />
          <Spacing height={24} />
          <Styled.HorizontalBar />
          <Spacing height={24} />
          <TextInput.TextArea
            onChange={onInputTextChange.bind(null, 'contents')}
            value={contents}
            placeholder="게시글 내용을 작성해주세요."
            data-cy="contents"
            height={150}
            maxLength={500}
          />
          <Spacing height={48} />
        </Styled.BodyWrapper>
        <Styled.HorizontalBar />
        <Styled.LocationWrapper>
          <LocationBar location={info.location} />
        </Styled.LocationWrapper>
      </Styled.WriteWrapper>
    </form>
  );
};
