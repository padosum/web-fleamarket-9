import styled from 'styled-components';
import { ChatBadge } from './ChatBadge';
import { colors } from './Color';
import { ImgBox } from './ImgBox';

interface Props {
  idx: number;
  userName: string;
  message: string;
  updatedAt: string;
  image: string;
  unReadCount: number;
}

export const ChatListItem = ({
  idx,
  userName,
  message,
  updatedAt,
  image,
  unReadCount,
}: Props) => {
  return (
    <ItemContainer>
      <ItemWrapper>
        <LeftWrapper>
          <UserNameWrapper>{userName}</UserNameWrapper>
          <MessageWrapper>{message}</MessageWrapper>
        </LeftWrapper>
        <RightWrapper>
          <MessageDescription>
            <div>{updatedAt}</div>
            <ChatBadge count={unReadCount} top={20} right={1}></ChatBadge>
          </MessageDescription>
          <ImgBox.Small src={image} />
        </RightWrapper>
      </ItemWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 16px 16px 0 16px;
  justify-content: space-between;
  align-items: center;
  background: ${colors.white};
  box-sizing: border-box;
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${colors.gray3};

  display: flex;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  max-width: 200px;
`;

const UserNameWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.titleActive};
`;

const MessageWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.gray1};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageDescription = styled.div`
  display: flex;
  font-size: 12px;
  color: ${colors.gray1};
  margin-right: 10px;
  position: relative;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: flex-end;
`;