# FUTURE_FS_01

A full stack portfolio website with dynamic projects, experience, and skills sections. All content can be edited via an admin interface, accessible only with a one-time password (OTP) sent to the designated admin email.

## Tech Stack

- **Frontend:** React, Tailwind CSS  
  [Demo Frontend](https://portfolio-flame-eta-10.vercel.app/)
- **Backend:** Node.js, Express, MongoDB  
  [Demo Backend](https://future-fs-01-backend-vd5s.onrender.com)

## Features

- Dynamic portfolio sections: projects, experience, skills
- Admin dashboard to edit all content
- Secure admin access via OTP emailed using Nodemailer

## Local Deployment

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

---

### 1. Clone the repository

```bash
git clone https://github.com/Setemil/FUTURE_FS_01.git
cd FUTURE_FS_01
```

---

### 2. Setup the Backend

```bash
cd backend
```

#### Install dependencies

```bash
npm install
# or
yarn install
```

#### Configure environment variables

Create a `.env` file in the `backend` directory with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email@example.com
EMAIL_USER=your_email_account_for_nodemailer
EMAIL_PASS=your_email_password_or_app_password
```

- `MONGO_URI`: Your MongoDB connection string
- `ADMIN_EMAIL`: The admin email address that receives OTPs
- `EMAIL_USER` and `EMAIL_PASS`: Credentials for the email account Nodemailer will use

#### Start the backend server

```bash
npm run dev
# or
yarn dev
```

---

### 3. Setup the Frontend

```bash
cd ../frontend
```

#### Install dependencies

```bash
npm install
# or
yarn install
```

#### Configure environment variables

Create a `.env` file in the `frontend` directory with:

```
VITE_BACKEND_URL=http://localhost:5000
```

#### Start the frontend development server

```bash
npm run dev
# or
yarn dev
```

---

### 4. Access the Application

- Open your browser at [http://localhost:5173](http://localhost:5173)
- Navigate to the admin panel. When prompted, an OTP will be sent to the configured admin email.

---

## Demo Links

- **Frontend:** [https://portfolio-flame-eta-10.vercel.app/](https://portfolio-flame-eta-10.vercel.app/)
- **Backend:** [https://future-fs-01-backend-vd5s.onrender.com](https://future-fs-01-backend-vd5s.onrender.com)