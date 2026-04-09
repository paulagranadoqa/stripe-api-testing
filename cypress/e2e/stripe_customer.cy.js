describe('Stripe API - Customer & Payment Lifecycle (Full Assertions)', () => {
  
  const apiKey = Cypress.env('stripe_key');
  let customerId;
  let paymentIntentId;

  // --- CUSTOMER TESTS ---

  it('STRP-01 - Should create a new customer successfully', () => { //Happy Path
    cy.request({
      method: 'POST',
      url: 'https://api.stripe.com/v1/customers',
      headers: { Authorization: apiKey },
      form: true,
      body: { 
        name: 'John Doe QA', 
        email: 'johndoe@example.com',
        description: 'Customer for Portfolio'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id'); // Ensures Stripe generated an ID
      expect(res.body.name).to.eq('John Doe QA'); // Ensures the recorded name is correct
      expect(res.body.object).to.eq('customer'); // Ensures the created object is of type customer
      customerId = res.body.id;
    });
  });

  it('STRP-03 - Should return 401 Unauthorized when API Key is missing', () => { //Negative test
    cy.request({
      method: 'POST',
      url: 'https://api.stripe.com/v1/customers',
      failOnStatusCode: false,
      headers: { Authorization: 'Bearer ' },
      form: true
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.error.type).to.eq('invalid_request_error');
      expect(res.body.error.message).to.contain('Invalid API Key'); // Validates the error message
    });
  });

  // --- PAYMENT TESTS ---

  it('STRP-08 - Should create a Payment Intent successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.stripe.com/v1/payment_intents',
      headers: { Authorization: apiKey },
      form: true,
      body: {
        amount: 2000, 
        currency: 'usd',
        description: 'Portfolio Test Payment'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.amount).to.eq(2000);
      expect(res.body.currency).to.eq('usd');
      expect(res.body.status).to.eq('requires_payment_method'); // Expected initial status
      paymentIntentId = res.body.id;
    });
  });

  it('STRP-09 - Should retrieve the payment intent details', () => {
    cy.request({
      method: 'GET',
      url: `https://api.stripe.com/v1/payment_intents/${paymentIntentId}`,
      headers: { Authorization: apiKey }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(paymentIntentId);
      expect(res.body.object).to.eq('payment_intent'); // Validates if the correct object was retrieved
    });
  });

  // --- CLEANUP ---

  it('STRP-12 - Should delete the customer (Cleanup)', () => {
    cy.request({
      method: 'DELETE',
      url: `https://api.stripe.com/v1/customers/${customerId}`,
      headers: { Authorization: apiKey }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.deleted).to.be.true; // Validates if the deletion confirmation is true
      expect(res.body.id).to.eq(customerId); // Validates if the correct ID was deleted
    });
  });

});