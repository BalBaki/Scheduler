# Scheduler

![d1](https://github.com/user-attachments/assets/443ad81a-4ad9-40ff-82f2-e4a09b9e0c60)
![d2](https://github.com/user-attachments/assets/69b641e1-39c8-4a2f-a3de-bf0e6c2c3567)
![d3](https://github.com/user-attachments/assets/caf02f65-819f-44e6-b526-30aab06319a4)
![d4](https://github.com/user-attachments/assets/d326878d-2ad9-40db-a414-eb42df9cd80d)
![d5](https://github.com/user-attachments/assets/0e4979ac-dbde-4d4c-9994-00eac4ce15d4)
![d6](https://github.com/user-attachments/assets/1c90dd86-8c1f-4984-bce3-34297307abb9)
![d7](https://github.com/user-attachments/assets/23fce0f7-94aa-42a7-ac56-f9bcac923f84)
![m1](https://github.com/user-attachments/assets/efadc772-4055-44c3-8294-54e398656bb4)
![m2](https://github.com/user-attachments/assets/5ed43204-bc56-47fb-99a8-440b1451811c)
![m3](https://github.com/user-attachments/assets/28bf839e-4006-47e4-bb8d-72e93fe4c5ab)
![m4](https://github.com/user-attachments/assets/e5b9cbff-e2ba-4ea6-90ee-12d9bef4fdfa)
![m5](https://github.com/user-attachments/assets/7e3a5de9-865e-48c4-ac1e-13c3116ae81e)
![m6](https://github.com/user-attachments/assets/266bbb16-32a6-4ef6-86e1-8c1d5c0f197d)
![m7](https://github.com/user-attachments/assets/7635cbf3-174a-4d3e-ad3c-8acb0f6fc12f)

- [About The Project](#about-the-project)
    - [Built With](#built-with)
- [Getting Started](#getting-started)
    - [Installation](#installation)
- [Routes](#routes)
- [Admin Info](#admin-info)

## About The Project

- Users can register and their memberships are approved by an administrator.
- Approved users can log into the system in two different roles: patient and doctor.
- Doctors can add appointments to the system by specifying the dates and times they are available and can delete these appointments.
- Patients can view the appointment schedule added by doctors and select suitable appointments for themselves.

### Built With

- ![Next JS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
- ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7)
- Full Calendar

## Getting Started

- How to add Prisma Accelerate ?

    - https://www.prisma.io/docs/accelerate/getting-started

- Cloudinary
    - https://cloudinary.com/documentation/how_to_integrate_cloudinary

### Installation

Create a `.env` file in the root directory and add the following variables:

```
DATABASE_URL=prisma://accelerate.prisma-data.net/?api_key=......   # Prisma database URL
DIRECT_DATABASE_URL=mongodb+srv://......                           # Direct MongoDB connection
AUTH_SECRET=authsecretdev                                          # Auth secret (e.g. JWT)
PASSWORD_SECRET=password_secret                                    # Password or refresh token secret
DB_CONNECTION_STRING=passworddevsecret                             # Legacy or extra DB connection string
CLOUDINARY_API_KEY=cloudinaryapikey                                # Cloudinary API key
CLOUDINARY_API_SECRET=cloudinaryapisecret                          # Cloudinary API secret
SITE_URL=http://localhost:3001                                     # Procution Website Url

```

```bash
  npm install
  npx prisma db push
  npx prisma generate --no-engine

  # for development server
  npm run dev

  # for production server
  npm run build
  npm run start

# for db seeds
  npm run seed:user 100 # Default count = 50
  npm run seed:feedback 100  # Default count = 50
  npm run seed:admin
  npm run seed #Run all seeds except admin seed
```

## Routes

| Name               | Explanation                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /dashboard/approve | The administrator approves new members                                                                                                                     |
| /doctor            | List of doctors                                                                                                                                            |
| /doctor/[slug]     | Route where doctor appointments can be displayed and booked                                                                                                |
| /login             | Member Login                                                                                                                                               |
| /profile           | The member's personal information is seen, the member can add and delete appointments if member is a doctor, and cancel appointment if member is a patient |
| /register          | Member Register                                                                                                                                            |

## Admin Info

If you want to change admin's email or password, you can use prisma/seed/admin.seed.ts file.

    -email: admin@gmail.com
    -password: admin123
