import styled from 'styled-components';
import { colors } from '../Color';

export const InfoSaler = ({
  username,
  location,
}: {
  username: string;
  location: string;
}) => {
  return (
    <InfoSalerWrapper>
      <BoldText>판매자 정보</BoldText>

      <BoldText style={{ marginLeft: 'auto' }}>{username}</BoldText>
      <NormalText style={{ marginLeft: 8 }}>{location}</NormalText>
    </InfoSalerWrapper>
  );
};

const InfoSalerWrapper = styled.div`
  background-color: ${colors.offWhite};
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const BoldText = styled.span`
  font-weight: 500;
  color: ${colors.titleActive};
  font-size: 14px;
`;

const NormalText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.gray4};
`;
