describe('Homepage basic Ui animations and responsiveness', function () {

  it('Visits the entry point', function () {
    cy.visit('http://localhost:8080')
  })


  it('has a hidden mobile menu by default', function () {
    cy.viewport(768, 800)
    const mobileMenu = cy.get('nav #nav-menu')

    mobileMenu.then(($el) => {
      const result = Cypress.dom.isHidden($el)
      expect(result).to.equal(true)
    })

  })

  it('can show the mobile menu', function () {
    cy.viewport(768, 800)

    cy.get('nav button.open').click()
    cy.get('nav #nav-menu').then(($el) => {
      const result = Cypress.dom.isHidden($el)
      expect(result).to.equal(false)
    })

  })


  it('can hide the mobile menu', function () {
    cy.viewport(768, 800)

    cy.wait(500)
    cy.get('nav #nav-menu .close').click()
    cy.wait(500)
    cy.get('nav #nav-menu').then(($el) => {
      const result = Cypress.dom.isHidden($el)
      expect(result).to.equal(true)
    })


  })


  it('loads first 10 list items then 10 more when scrolling', function(){
    cy.get('#list-column ul').children().should('have.length', 10)
    cy.get('#list-column .card-body').scrollTo('bottom');
    cy.wait(1000)
    cy.get('#list-column ul').children().should('have.length', 20)    
  })


  it('slides cards open correctly', function(){
    cy.viewport(1023, 800)

    cy.get('#list-column ul li:first .item-click').click()

    cy.get('#detail-column').should('have.class', 'slide-in')

  })


  it('slides cards closed correctly', function(){
    cy.viewport(1023, 800)

  
    cy.get('#detail-column .slide-card-button').click()
    cy.wait(500)
    cy.get('#detail-column').should('not.have.class', 'slide-in')

  })


  it('Can have many more tests :)', function(){
    cy.viewport(1200, 800)


  })





})