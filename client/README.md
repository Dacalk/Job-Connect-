# React + Vite

# 📘 Employer Dashboard (Job-Connect)

## 🚀 Project Setup & Run Instructions

### 1. Clone the Repository

``` bash
git clone https://github.com/<your-username>/Job-Connect-.git
cd Job-Connect-
```

### 2. Go into the Client Folder

``` bash
cd client
```

### 3. Install Dependencies

Make sure you have **Node.js (\>=16)** installed. Then run:

``` bash
npm install
```

### 4. Run the Development Server

``` bash
npm run dev
```

The app will start at: 👉 <http://localhost:5173>

------------------------------------------------------------------------

## 📂 Project Structure (Important for `EmployerDashboard`)

    client/
     ├─ src/
     │   ├─ pages/
     │   │   └─ employee/
     │   │       └─ EmployerDashboard.jsx   # Employer dashboard component
     │   ├─ assets/                         # images, logos etc.
     │   ├─ components/                     # reusable components
     │   ├─ App.jsx                         # entry app file
     │   └─ main.js                         # Vite entry point
     ├─ package.json
     └─ vite.config.js

------------------------------------------------------------------------

## 🖥 How to Open Employer Dashboard

-   Inside `src/pages/employee/EmployerDashboard.jsx` you have the main
    dashboard UI.\
-   To display it, import the component into `App.jsx`:

``` jsx
import EmployerDashboard from "./pages/employee/EmployerDashboard";

function App() {
  return (
    <div className="App">
      <EmployerDashboard />
    </div>
  );
}

export default App;
```

------------------------------------------------------------------------

## 🎨 Styling

-   TailwindCSS classes are already included in the JSX.\
-   Ensure your `index.css` has Tailwind setup:

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

------------------------------------------------------------------------

## ✅ Features

-   **Top navigation bar** with Overview, Jobs, Applications, and
    Profile tabs.\
-   **Overview tab**: Quick stats about jobs, applications, and hires.\
-   **Jobs tab**: Create, edit, delete, search, and filter jobs.\
-   **Applications tab**: View, shortlist, reject, and hire candidates.\
-   **Profile tab**: Update company profile information.\
-   **Modals**: Create/Edit job and view applicant details.

------------------------------------------------------------------------

## 🛠 Build for Production

``` bash
npm run build
```

------------------------------------------------------------------------

💡 Now you can open `http://localhost:5173` and see the **Employer
Dashboard** in action.
