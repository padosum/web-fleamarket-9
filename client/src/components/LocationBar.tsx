import styled from 'styled-components';
import { colors } from './Color';
import { Icon } from './Icon';

const LocationBarWrapper = styled.div`
  width: 100%;
  background-color: ${colors.white};
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 18px;
  overflow: hidden;
`;

const LocationBarText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.titleActive};
  margin-left: 4px;
`;

export const LocationBar = ({ location }: { location: string }) => {
  return (
    <LocationBarWrapper>
      <div>
        <Icon name="iconMap" width={15} height={17} />
      </div>
      <LocationBarText>{location}</LocationBarText>
    </LocationBarWrapper>
  );
};
