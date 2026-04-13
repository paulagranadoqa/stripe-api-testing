# 💳 Stripe API Automation Testing - Cypress

This project features a comprehensive suite of automated tests for the **Stripe API**, covering the full lifecycle of customers and payment intents.

---

## 🚀 Test Scenarios

* **STRP-01**: Successfully create a new customer.
* **STRP-03**: Security validation (Expects **401 Unauthorized** when the API Key is missing/invalid).
* **STRP-08**: Successfully create a **Payment Intent**.
* **STRP-09**: Retrieve specific details of an existing payment.
* **STRP-12**: Data Cleanup (Successfully delete the customer created during the tests).

---

## 🛠️ Tech Stack

* **Cypress** (Automation Framework)
* **JavaScript** (Programming Language)
* **Stripe API** (Payment Service Provider)
* **Mocha/Chai** (Assertions and Test Structure)

---

## 🔧 Setup & Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    * Create a `cypress.env.json` file in the root directory.
    * Copy the structure from `cypress.env.example.json`.
    * Insert your Stripe Secret Key (`sk_test_...`).

---


## 📸 Execution Evidence

#### 1. Full Test Suite (Summary)
![Full Suite](./screenshots/automation/full-test-suite.png)

#### 2. Detailed Results by Scenario
* **Customer & Security (STRP-01, STRP-03):** [View Screenshot](./screenshots/automation/customer-and-security.png)
* **Payment Intents (STRP-08, STRP-09):** [View Screenshot](./screenshots/automation/payment-intent-details.png)
* **Data Cleanup (STRP-12):** [View Screenshot](./screenshots/automation/data-cleanup-delete.png)


### 🚀 How to Run the Tests

To run the tests in headless mode (terminal), execute:

` ```bash `

`npx cypress run --spec cypress/e2e/stripe_tests.cy.js`
` ``` `


## 🔐 Security Note

This project follows API security best practices by using a .gitignore file to ensure that sensitive keys (such as Stripe Secret Keys) are never pushed to the repository.
