/// <reference types="cypress" />
import { expect } from 'chai';

describe('홈 아이템 페이지 스크롤 관련 이벤트 테스트', () => {
  let homeItem: any[] = [];

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.fixture('homeItem.json').then((_homeItem) => {
      homeItem = _homeItem;
    });
    cy.intercept({ method: 'GET', url: '/api/item*' }, (req) => {
      const page = +req.query.page as number;
      const size = 100;
      const start = (page - 1) * size;
      const end = page * size;
      req.reply(JSON.stringify(homeItem.slice(start, end)));
    }).as('getItems');
    cy.get('button').contains('구경하러 가기').click();
  });

  describe('가상 스크롤 테스트', () => {
    it('초기렌더링 아이템 개수 25개 미만이여야함.', () => {
      cy.wait('@getItems');

      cy.get('[data-testid="homeitem"]').should(($el) => {
        expect($el).to.have.length.within(0, 25);
      });
    });

    it('스크롤 이동하여도 개수가 25개 미만을 유지해야함.', () => {
      cy.wait('@getItems');

      cy.scrollTo(0, 5000, { duration: 3000 });

      cy.get('[data-testid="homeitem"]').should(($el) => {
        expect($el).to.have.length.within(0, 25);
      });
    });
  });

  describe('스크롤을 통한 페이징 테스트', () => {
    it('페이지 하단에 닿으면 새로운 item 요청을 보내야 한다.', () => {
      cy.wait('@getItems');

      // 하단으로 이동
      cy.scrollTo(0, Number.MAX_SAFE_INTEGER, { duration: 3000 });

      // 새로운 API 호출
      cy.wait('@getItems');
    });
  });

  describe('이미지 레이지 로딩 테스트', () => {
    it('초기에 화면 밖 이미지도 요청하여야 함.', () => {
      cy.wait('@getItems');

      cy.wait(3000);

      cy.get('[data-testid="homeitem"]').then((items) => {
        cy.get('[data-cy=lazy-img]').then((lazyImages) => {
          const loadedImages = Array.from(lazyImages).filter((img) => {
            return (img as unknown as HTMLImageElement).src;
          });
          expect(items.length).to.equal(loadedImages.length);
        });
      });
    });

    it('스크롤 빠르게 지난 이미지는 호출되지 않아야함.', () => {
      cy.wait('@getItems');

      // 하단으로 이동
      cy.scrollTo(0, Number.MAX_SAFE_INTEGER);

      cy.wait(1500);
      // 상단으로 이동
      cy.scrollTo(0, 0);
      cy.wait(1500);

      cy.get('[data-cy=loaded-count]').then((images) => {
        const loadedCount = +(images[0].dataset.totalLoadedCount ?? '0');

        expect(loadedCount).lessThan(50);
      });
    });
  });
});

export {};
