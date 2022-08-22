import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 0;
  max-width: 100%;
  width: 100%;
  height: auto;
`;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
