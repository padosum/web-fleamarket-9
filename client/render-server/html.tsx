import React from 'react';
import fs from 'fs-extra';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Home, Main } from '../src/pages';
import { ItemTypes } from '../src/hooks/useHomeItem';
import { UserType } from '../src/types/user';
import { ServerGlobalProvider } from './ServerGlobalProvider';
import { Detail } from '../src/pages/Detail.server';
import { ItemDetailTypes } from '../src/remotes/item/fetch-item-detail';

export const html = ({
  routePath,
  initialItems = [],
  initialUser = null,
  initialLoggedIn = false,
  initialItemInfo,
}: {
  routePath: string;
  initialItems?: ItemTypes[];
  initialUser?: UserType | null;
  initialLoggedIn?: boolean;
  initialItemInfo?: ItemDetailTypes;
}) => {
  const sheet = new ServerStyleSheet();
  const htmlPath = path.join(process.cwd(), 'build', 'index.html');
  const htmlContents = fs.readFileSync(htmlPath, { encoding: 'utf-8' });

  const HTML = renderToString(
    sheet.collectStyles(
      <ServerGlobalProvider
        initialItems={initialItems}
        initialLoggedIn={initialLoggedIn}
        initialUser={initialUser}
      >
        <StaticRouter location={routePath}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/item/:id"
              element={<Detail item={initialItemInfo} />}
            />
          </Routes>
        </StaticRouter>
      </ServerGlobalProvider>,
    ),
  );

  const styleTag = sheet.getStyleTags();

  return htmlContents
    .toString()
    .replace(
      '<div id="root"></div>',
      `${styleTag}<div id="root">${HTML}</div>`,
    );
};
