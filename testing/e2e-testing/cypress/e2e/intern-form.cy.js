describe("To check Intern Management Form running or not", () => {

    beforeEach('Global Initialization', () => {
        cy.visit('https://zhapix-coe.github.io/mern-crud-app/')
    })
    it('To check whether Intern Management in Header', () => {
        cy.get('h1.intern-title').should('have.text', 'Intern Management')
    })

    it('To check whether Add Form heading visible', () => {
        cy.get('.intern-form-section >h2').should('have.text', 'Add Intern')
    })

    it('To check "Name" label visible', () => {
        cy.get('section.intern-form-section>form>label:nth-child(1)').should('contain', 'Name:')
    })

    it('To check Name textbox is visible', () => {
        cy.get('section.intern-form-section>form>label:nth-child(1)').should('be.visible')
    })
    it('To check "Email" label visible', () => {
        cy.get('section.intern-form-section>form>label:nth-child(2)').should('contain', 'Email')
    })
    it('To check "Email" textfield is visible', () => {
        cy.get('section.intern-form-section>form>label:nth-child(2)').should('be.visible')
    })
    it('To check rejection of invalid Email acceptanceformat -> name@domain.com', () => {
        cy.get('input[type="email"]').type('hello.com')
        cy.get('input[type="email"]').invoke('val').should('match', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/);
        cy.get('input[type="email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        });
        // cy.contains('Invalid email format').should('not.exist');
    })
    it('To check "Phone" label visible', () => {
        cy.get('section.intern-form-section>form>label:nth-child(3)').should('contain', 'Phone')
    })
    it('To check Phone textbox is visible', () => {
        cy.get('section.intern-form-section>form>label:nth-child(3)').should('be.visible')
    })
    it('To check rejection of invalid number acceptanceformat -> numeric and length of numbers : 10', () => {
        cy.get('section.intern-form-section>form>label:nth-child(3)').type('123456789011')
        cy.get('section.intern-form-section>form>label:nth-child(3) input').invoke('val').should('match', /^\d{10}$/);
        cy.get('section.intern-form-section>form>label:nth-child(3) input').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
        })
    })
    it('To check "Stream" label visible and can select option from dropdown box', () => {
        cy.get('select[required]').should('be.visible').select('Frontend')
    })
    it('To check Graduate label is visible', () => {
        cy.get('label.radio-title').should('be.visible').should('contain', 'Graduate')
    })
    it('To check Graduate status yes can be selected', () => {
        cy.get('input[type=radio]').eq(0).click()
    })
    it('To check status label is visible', () => {
        cy.get('label.radio-title').should('be.visible')
    })
    it('To check Status active can be selected', () => {
        cy.get('input[type="radio"][value="Active"]').click()
    })
    it('To check Place label is visible',()=>{
        cy.contains('label','Place')   //cy.get('.intern-form-section').should('contain','Place')
    })
    it('To check Place textbox is visible',()=>{
        cy.contains('label','Place').find('input').should('be.visible')  //cy.get('input[type="text"]').should('be.visible')    type('Chennai') 
    })
    it('To verify Save button is visible',()=>{
        cy.get('.save-btn').should('have.text','Save').should('be.visible')
    })
    /*it.only('To verify Save button doesnt works while the required fields are empty',()=>{
        cy.get('input[type="text"]').should('have.value','Name')
        cy.get('section.intern-form-section>form>label:nth-child(2)')
        cy.get('section.intern-form-section>form>label:nth-child(3)')
        cy.get('select[required]').should('be.visible').select('Select Stream')
        cy.get('input[type=radio]').eq(0)
        cy.get('input[type="radio"][value="Active"]')
        cy.contains('label','Place').find('input').clear()
        cy.get('.save-btn').click().should('be.disabled')
    })*/
   it.only('To verify Save button works',()=>{
        cy.get('section.intern-form-section>form>label:nth-child(1)').should('be.visible').type('user')
        cy.get('section.intern-form-section>form>label:nth-child(2)').type('user@gmail.com')
        cy.get('section.intern-form-section>form>label:nth-child(3)').type('1234567890')
        cy.get('select[required]').should('be.visible').select('Fullstack')
        cy.get('input[type=radio]').eq(0).click()
        cy.get('input[type="radio"][value="Active"]').click()
        cy.contains('label','Place').find('input').type('Chennai')
        cy.get('.save-btn').click()

    })
    it('To verify Cancel button is visible',()=>{
        cy.get('.cancel-btn').should('have.text','Cancel').should('be.visible')
    })
    it('To verify Cancel button works',()=>{
        cy.get('section.intern-form-section>form>label:nth-child(1)').type('user1')
        cy.get('section.intern-form-section>form>label:nth-child(2)').type('user@gmail.com')
        cy.get('section.intern-form-section>form>label:nth-child(3)').type('1234567890')
        cy.get('select[required]').should('be.visible').select('Fullstack')
        cy.get('input[type=radio]').eq(0).click()
        cy.get('input[type="radio"][value="Active"]').click()
        cy.contains('label','Place').find('input').type('Chennai')
        cy.get('.cancel-btn').should('have.text','Cancel').click()
        cy.get('input[type="text"]').eq(0).should('have.text','')
        cy.get('input[type="text"]').eq(1).should('have.text','')
        cy.get('input[type="text"]').eq(2).should('have.text','')
        cy.get('select[required]').should('be.visible')
        cy.get('input[type=radio]').eq(0)
        cy.get('input[type="radio"][value="Active"]')
        cy.contains('label','Place').find('input')
    })
})
