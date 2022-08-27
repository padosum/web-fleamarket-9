import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import { colors } from '../Color';
import { ImgBox } from '../ImgBox';

const imgMapper = {
  디지털기기:
    'https://user-images.githubusercontent.com/49009864/187027364-4624a7c5-d407-4648-9d3c-aad5d8d2ddf7.png',
  생활가전:
    'https://user-images.githubusercontent.com/49009864/187027355-37c2c3e7-8573-4a96-926a-f76172142c1c.png',
  '가구/인테리어':
    'https://user-images.githubusercontent.com/49009864/187027366-aca5de2c-0f85-4f1b-a3e2-b13b294e7777.png',
  '게임/취미':
    'https://user-images.githubusercontent.com/49009864/187027367-591f4ff3-97de-4d35-9dd0-896d274e08d1.png',
  '생활/가공식품':
    'https://user-images.githubusercontent.com/49009864/187027372-af5bd122-0b22-48a5-97f6-8502927ee9b9.png',
  '스포츠/레저':
    'https://user-images.githubusercontent.com/49009864/187027372-af5bd122-0b22-48a5-97f6-8502927ee9b9.png',
  '여성패션/잡화':
    'https://user-images.githubusercontent.com/49009864/187027365-417e9f3a-d13d-46ed-8fda-9fec4eed2950.png',
  '남성패션/잡화':
    'https://user-images.githubusercontent.com/49009864/187027370-ba5da8c0-6fb2-4188-a7c7-1a7ae186e027.png',
  유아동:
    'https://user-images.githubusercontent.com/49009864/187027358-e2e2d4a7-30df-462b-b2a3-0de9f79d3cd2.png',
  '뷰티/미용':
    'https://user-images.githubusercontent.com/49009864/187027361-2194a9ea-8a7f-42b7-a180-78a7fdb3d644.png',
  반려동물:
    'https://user-images.githubusercontent.com/49009864/187027371-3686b984-f816-4237-b450-1f59a7fd4edb.png',
  '도서/티켓/음반':
    'https://user-images.githubusercontent.com/49009864/187027363-3af3cb19-c3ba-44ef-864e-9564a273c4b9.png',
  식물: 'https://user-images.githubusercontent.com/49009864/187027366-aca5de2c-0f85-4f1b-a3e2-b13b294e7777.png',
  '기타 중고물품':
    'https://user-images.githubusercontent.com/49009864/187027368-88e0f045-9d51-45ba-98f3-9ebf7f0c77e2.png',
};

export const Category = ({
  toggleOpen,
}: {
  toggleOpen: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <CategoryContainer>
      {category.map(({ idx, name }) => {
        const link = `?category=${idx}`;
        return (
          <CategoryWrapper key={idx}>
            <CategoryLink
              onClick={(evt) => {
                searchParams.set('category', `${idx}`);
                setSearchParams(searchParams);
                toggleOpen(evt as unknown as React.MouseEvent<HTMLDivElement>);
              }}
            >
              <ImgBox.Small src={imgMapper[name]}></ImgBox.Small>
              <CategoryTitle>{name}</CategoryTitle>
            </CategoryLink>
          </CategoryWrapper>
        );
      })}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  row-gap: 24px;
  column-gap: 20px;

  padding: 24px;
  padding-top: 40px;

  box-shadow: inset 0px 1px 0px #d7d7d7;

  width: 100%;
  height: 100%;

  box-sizing: border-box;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  & a {
    color: ${colors.titleActive};
  }
`;

const CategoryTitle = styled.div`
  margin-top: 16px;
`;

const CategoryLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
