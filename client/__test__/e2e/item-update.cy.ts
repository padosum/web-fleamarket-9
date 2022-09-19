/// <reference types="cypress" />
/// <reference types="cypress-file-upload" />

describe('아이템 업데이트 테스트', () => {
  before(() => {
    cy.setupBasicInterceptor();
  });

  describe('변경 없이 업데이트', () => {
    before(() => {
      cy.visit('http://localhost:3000');
      cy.get('button').contains('구경하러 가기').click();
      cy.get('[name=iconMenu]').click();
      cy.get('[name=iconMore]').click();
      cy.get('div').contains('수정하기').click();
    });
    after(() => {
      cy.visit('http://localhost:3000');
      cy.get('button').contains('구경하러 가기').click();
      cy.get('[name=iconMenu]').click();
      cy.get('[name=iconMore]').click();
      cy.get('div').contains('수정하기').click();
    });

    it('업데이트버튼 클릭', () => {
      cy.intercept({ method: 'PATCH', url: '/api/item/*' }, (req) => {
        expect(req.body).to.deep.equal({
          title: '도쿄리벤저스 인형 양도2',
          images: [
            'https://web-fleamarket-09.s3.ap-northeast-2.amazonaws.com/1663319657454áá©áá­ááµáá¦á«áá¥áá³ áá©ááµáá¦á« áá¡ááµ áá¦ááµáá³áá¦ ááµáá¢áá©á¼ áá¡á¬áá³á« áá®ááµ ááµá«áá§á¼ áá£á¼áá©.jpeg',
          ],
          price: 17000,
          contents: '도쿄리벤저스 인형 양도',
          code: '서울특별시 송파구 잠실동',
          locationId: 469,
          category: 4,
        });

        req.reply({ id: 661 });
      }).as('update');

      cy.get('[name=iconCheck]').click();
      cy.wait('@update');

      cy.window().then((win) => {
        expect(win.location.pathname).to.equal('/item/661');
      });
    });
  });

  describe('내용 변경 후 업데이트', () => {
    it('이미지 추가', () => {
      cy.setupImageUploadInterceptor();
      cy.get('input[type=file]').attachFile('hood-zipup.jpeg');
      cy.wait('@uploadImage');
    });

    it('제목 변경', () => {
      cy.get('[data-cy=title]').clear().type('후드티 팝니다');
      cy.get('input[value="후드티 팝니다"]').should('be.visible');
    });

    it('카테고리 변경', () => {
      cy.get('span').contains('남성패션/잡화').click();
    });

    it('가격 변경', () => {
      cy.get('[data-cy=price]').clear().type('120000');
      cy.get('input[value="₩ 120,000"]').should('be.visible');
    });

    it('내용 변경', () => {
      cy.get('[data-cy=contents]').clear().type('검정색 후드티 싸게 팝니다.');

      cy.get('textarea')
        .contains('검정색 후드티 싸게 팝니다.')
        .should('be.visible');
    });

    it('수정 및 내 아이템 상세 페이지 이동', () => {
      cy.intercept({ method: 'PATCH', url: '/api/item/*' }, (req) => {
        expect(req.body).to.deep.equal({
          title: '후드티 팝니다',
          images: [
            'https://web-fleamarket-09.s3.ap-northeast-2.amazonaws.com/1663319657454áá©áá­ááµáá¦á«áá¥áá³ áá©ááµáá¦á« áá¡ááµ áá¦ááµáá³áá¦ ááµáá¢áá©á¼ áá¡á¬áá³á« áá®ááµ ááµá«áá§á¼ áá£á¼áá©.jpeg',
            'https://media.bunjang.co.kr/product/199664302_1_1663559233_w856.jpg',
          ],
          price: 120000,
          contents: '검정색 후드티 싸게 팝니다.',
          code: '서울특별시 송파구 잠실동',
          locationId: 469,
          category: 8,
        });

        req.reply({ id: 661 });
      }).as('update');

      cy.get('[name=iconCheck]').click();

      cy.wait('@update');
    });
  });
});
