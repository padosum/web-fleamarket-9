import styled from 'styled-components';
import { colors } from '../Color';
import { ImgBox } from '../ImgBox';

const CategoryListItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  cursor: pointer;

  &:hover {
    span {
      color: ${colors.primary};
    }
  }
`;

const CategoryListItemText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.titleActive};
  margin-top: 16px;
`;

export const CategoryListItem = ({
  text,
  onClick,
}: {
  text: string;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <CategoryListItemWrap onClick={onClick}>
      <ImgBox.Small />
      <CategoryListItemText>{text}</CategoryListItemText>
    </CategoryListItemWrap>
  );
};
