# Dashbaord Project
A simple React-based dashboard application with authentication and data visualization. The project demonstrates reusable components, routing, and state management.

---

## 🚀 Features

* User authentication (Login & Register)
* Dashboard with summary cards and chart visualization
* Sidebar navigation
* Transaction details with filters and pagination
* Form handling using React
* Clean and responsive UI with Tailwind CSS

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Sidebar.jsx
 │    ├── TransactionDetails.jsx
 │    ├── Form.jsx
 │    ├── Register.jsx
 │    ├── Login.jsx
 ├── pages/
 │    └── Dashboard.jsx
 ├── App.js
 └── index.js
```

---

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sharthak1705/dashboard/
   ```

2. Navigate into the project folder:

   ```bash
   cd dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## 📦 Component Decisions

### 1. **Sidebar**

* Provides consistent navigation across the app.
* Keeps dashboard, transactions, and settings accessible.
* Improves usability by giving users a fixed menu.

### 2. **TransactionDetails**

* Displays detailed records of usage (date, GB, spend, status).
* Includes filters, pagination, and search functionality.
* Helps users track their activity clearly.

### 3. **Dashboard**

* Core page that shows summary cards (Active IPs, GB Used, Spend).
* Integrates charts for quick data visualization.
* Serves as the main entry point after login.

### 4. **Form**

* Handles input validation and submission for smaller sections.
* Reusable component for both Login and Register forms.
* Provides error/validation messages.

### 5. **Register**

* Validates input fields for better user experience.
* Connects seamlessly to the login system.

### 6. **Login**

* Entry point for authentication.
* Redirects users to the dashboard after login.
* Uses localStorage for trial

---

## 📊 Tech Stack

* **Frontend**: React, TailwindCSS
* **Routing**: React Router
* **State Management**: Redux Toolkit (for usage data & filters)
* **Charts**: Recharts

## 📄 License

This project is licensed under the MIT License.
