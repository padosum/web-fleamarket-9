import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TypoGraphy = ({ children }: { children: string }) => {
  return <TypoGraphyText>{children}</TypoGraphyText>;
};

TypoGraphy.Large = TypoGraphy;

TypoGraphy.Medium = ({ children }: { children: string }) => {
  return <TypoGraphyMediumText>{children}</TypoGraphyMediumText>;
};

TypoGraphy.Small = ({ children }: { children: string }) => {
  return <TypoGraphySmallText>{children}</TypoGraphySmallText>;
};

TypoGraphy.XSmall = ({ children }: { children: string }) => {
  return <TypoGraphyXSmallText>{children}</TypoGraphyXSmallText>;
};

TypoGraphy.MediumLink = ({
  children,
  to,
}: {
  children: string;
  to: string;
}) => {
  return (
    <Link to={to}>
      <TypoGraphyMediumText bold>{children}</TypoGraphyMediumText>
    </Link>
  );
};

TypoGraphy.SmallLink = ({ children, to }: { children: string; to: string }) => {
  return (
    <Link to={to}>
      <TypoGraphySmallText bold>{children}</TypoGraphySmallText>
    </Link>
  );
};

TypoGraphy.XSmallLink = ({
  children,
  to,
}: {
  children: string;
  to: string;
}) => {
  return (
    <Link to={to}>
      <TypoGraphyXSmallText bold>{children}</TypoGraphyXSmallText>
    </Link>
  );
};

const TypoGraphyCommon = styled.h1<{ bold?: boolean }>`
  color: #222;
  padding: 0;
  margin: 0;
  font-weight: 400;
  ${(props) => (props.bold ? 'font-weight: bold;' : '')}
`;

const TypoGraphyText = styled(TypoGraphyCommon)`
  font-size: 18px;
`;

const TypoGraphyMediumText = styled(TypoGraphyCommon)`
  font-size: 16px;
`;

const TypoGraphySmallText = styled(TypoGraphyCommon)`
  font-size: 14px;
`;

const TypoGraphyXSmallText = styled(TypoGraphyCommon)`
  font-size: 12px;
`;
