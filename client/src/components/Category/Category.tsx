import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import { colors } from '../Color';
import { ImgBox } from '../ImgBox';

export const Category = ({
  toggleOpen,
}: {
  toggleOpen: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { category } = useCategory();

  return (
    <CategoryContainer>
      {category.map(({ idx, name }) => {
        const link = `?category=${idx}`;
        return (
          <CategoryWrapper key={idx}>
            <CategoryLink
              to={link}
              onClick={(evt) =>
                toggleOpen(evt as unknown as React.MouseEvent<HTMLDivElement>)
              }
            >
              <ImgBox.Small></ImgBox.Small>
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

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
