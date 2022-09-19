/// <reference types="cypress" />
/// <reference types="cypress-file-upload" />
import { expect } from 'chai';

describe('아이템 업로드 테스트', () => {
  before(() => {
    cy.setupBasicInterceptor();
    cy.visit('http://localhost:3000');
  });

  it('아이템 업로드 페이지 이동', () => {
    cy.get('button').contains('구경하러 가기').click();
    cy.get('button[role=item-add-button]').click();

    cy.get('div').contains('글쓰기').should('be.visible');
  });

  it('이미지 파일 업로드', () => {
    cy.setupImageUploadInterceptor();

    cy.get('input[type=file]').attachFile('hood-zipup.jpeg');
    cy.wait('@uploadImage');

    cy.get(
      'img[src="https://media.bunjang.co.kr/product/199664302_1_1663559233_w856.jpg"]',
    ).should('be.visible');
  });

  it('제목 입력', () => {
    cy.get('[data-cy=title]').type('후드티 팝니다');
    cy.get('input[value="후드티 팝니다"]').should('be.visible');
  });

  it('카테고리 선택', () => {
    // 카테고리 존재
    cy.get('input[name=category]').should(($el) => {
      expect($el.length).greaterThan(0);
    });

    cy.get('span').contains('남성패션/잡화').click();
  });

  it('가격 입력', () => {
    cy.get('[data-cy=price]').type('120000');
    cy.get('input[value="₩ 120,000"]').should('be.visible');
  });

  it('내용 입력', () => {
    cy.get('[data-cy=contents]').type('검정색 후드티 싸게 팝니다.');

    cy.get('textarea')
      .contains('검정색 후드티 싸게 팝니다.')
      .should('be.visible');
  });

  it('등록 및 내 아이템 페이지 이동', () => {
    cy.intercept({ method: 'POST', url: '/api/item' }, (req) => {
      expect(req.body).to.deep.equal({
        title: '후드티 팝니다',
        images: [
          'https://media.bunjang.co.kr/product/199664302_1_1663559233_w856.jpg',
        ],
        price: 120000,
        contents: '검정색 후드티 싸게 팝니다.',
        code: '서울특별시 송파구 잠실동',
        locationId: 469,
        category: 8,
      });

      req.reply({ id: 124 });
    });

    cy.get('[name=iconCheck]').click();

    cy.window().then((win) => {
      expect(win.location.pathname).to.equal('/home');
    });
  });
});
