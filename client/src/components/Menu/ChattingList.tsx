import styled from 'styled-components';
import { ChatListItem } from '../ChatListItem';
import { colors } from '../Color';
import { EmptyText } from './Common';

const ChattingListWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  max-height: calc(100vh - 107px);
  background-color: ${colors.white};
`;

const chatRooms = [
  {
    idx: 1,
    userName: 'UserE',
    message: '실제로 신어볼 수 있는건가요???sdfsfssssssfsdf',
    updatedAt: '1분 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 200,
  },
  {
    idx: 2,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 2,
  },
  {
    idx: 3,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 22,
  },
  {
    idx: 4,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 5,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 6,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 7,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 8,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 9,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 10,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 11,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 12,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 13,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 14,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
  {
    idx: 15,
    userName: 'UserD',
    message: '감사합니다! :)',
    updatedAt: '1시간 전',
    images:
      'https://i.picsum.photos/id/126/250/250.jpg?hmac=LREWNomCU5zCq58oNDwGUv6yUoPd9vOpAEJQUQiDWVM',
    unReadCount: 0,
  },
];

export const ChattingList = () => {
  return (
    <ChattingListWrapper>
      {chatRooms.map((item) => (
        <ChatListItem key={item.idx} {...item} />
      ))}
      {/* <EmptyText>채팅 기록이 없습니다.</EmptyText> */}
    </ChattingListWrapper>
  );
};
