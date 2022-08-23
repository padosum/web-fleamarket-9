import styled from 'styled-components';
import { colors } from './Color';

interface Category {
  idx: number;
  name: string;
}

interface Props {
  categories: Category[];
  children?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
`;

const RadioLabel = styled.span`
  width: 110px;
  height: 28px;
  color: ${colors.gray1};
  background-color: ${colors.white};
  border: 1px solid ${colors.gray3};
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  cursor: pointer;
`;

const RadioButton = styled.input`
  display: none;
  &:checked + ${RadioLabel} {
    background-color: ${colors.primary};
    color: ${colors.white};
    border: none;
  }
`;

export const CategoryButton = ({ categories, onChange }: Props) => {
  return (
    <CategoryButtonWrapper>
      {categories.map(({ idx, name }) => {
        return (
          <label key={`${name}${idx}`}>
            <RadioButton
              type="radio"
              id={`${idx}`}
              name="category"
              value={idx}
              onChange={onChange}
            />
            <RadioLabel>{name}</RadioLabel>
          </label>
        );
      })}
    </CategoryButtonWrapper>
  );
};
