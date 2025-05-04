/// <reference types="cypress" />

describe('User Login', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('localhost:4200/auth');
    cy.get('button[id="switch"]').click();
  });

  it('should display login form', () => {
    // Check if login form elements are visible
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible')

  });

  it('should show error for invalid credentials', () => {

    cy.get('input[type="email"]').type('ilay@ilay.com');
    cy.get('input[type="password"]').type('ilayilay1');
    cy.get('button[type="submit"]').click();

    cy.get('.alert-box').should('be.visible')
      .and('contain.text', 'Username Or Password is incorrect');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('ilay@ilay.com');
    cy.get('input[type="password"]').type('ilayilay');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/recipes');
    
  });
}); 