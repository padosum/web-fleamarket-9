import styled from 'styled-components';

const TypoGraphyText = styled.h1`
  color: #222;
  font-size: 18px;
  padding: 0;
  margin: 0;
`;

const TypoGraphyMediumText = styled.h1`
  color: #222;
  font-size: 16px;
  padding: 0;
  margin: 0;
`;

export const TypoGraphy = ({ children }: { children: string }) => {
  return <TypoGraphyText>{children}</TypoGraphyText>;
};

TypoGraphy.Large = TypoGraphy;

TypoGraphy.Medium = ({ children }: { children: string }) => {
  return <TypoGraphyMediumText>{children}</TypoGraphyMediumText>;
};
