import styled from 'styled-components';
import { Category } from './Category';
import { BackHeader } from '../Header/BackHeader';
import { colors } from '../Color';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CategorySlide = ({ open }: { open: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  return (
    <CategoryWrapper open={open}>
      <BackHeader
        title={'카테고리'}
        color="offWhite"
        onClickBack={navigate.bind(null, -1)}
      ></BackHeader>
      <Category></Category>
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};

  overflow-y: auto;

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }

  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  transform: ${({ open }) =>
    open ? `translate3d(0vw, 0, 0);` : `translate3d(-100vw, 0, 0)`};
`;
