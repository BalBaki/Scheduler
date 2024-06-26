# Schedular

-   [About The Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
-   [Routes](#routes)
-   [Admin Info](#admin-info)

## About The Project

-   Users can register and their memberships are approved by an administrator.
-   Approved users can log into the system in two different roles: patient and doctor.
-   Doctors can add appointments to the system by specifying the dates and times they are available and can delete these appointments.
-   Patients can view the appointment schedule added by doctors and select suitable appointments for themselves.

### Built With

-   ![Next JS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
-   ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
-   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
-   ![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
-   ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
-   ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
-   ![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7)
-   Full Calendar

## Getting Started

-   How to add Prisma Accelerate ?

    -   https://www.prisma.io/docs/accelerate/getting-started

-   Cloudinary
    -   https://cloudinary.com/documentation/how_to_integrate_cloudinary

### Installation

-   You need to add the following variables to environment file(.env).

    | Name                  | Type   | Example                                             |
    | --------------------- | ------ | --------------------------------------------------- |
    | DATABASE_URL          | string | prisma://accelerate.prisma-data.net/?api_key=...... |
    | DIRECT_DATABASE_URL   | string | mongodb+srv://......                                |
    | AUTH_SECRET           | string | authsecretdev                                       |
    | PASSWORD_SECRET       | string | jwtRefreshTokenSecretKey                            |
    | DB_CONNECTION_STRING  | string | passworddevsecret                                   |
    | CLOUDINARY_API_KEY    | string | cloudinaryapikey                                    |
    | CLOUDINARY_API_SECRET | string | cloudinaryapisecret                                 |

```bash
  npm install
  npx prisma db push
  npx prisma generate --no-engine

  # for development server
  npm run dev

  # for production server
  npm run build
  npm run start
```

## Routes

| Name               | Explanation                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /dashboard/approve | The administrator approves new members                                                                                                                     |
| /doctor            | List of doctors                                                                                                                                            |
| /doctor/[id]       | Route where doctor appointments can be displayed and booked                                                                                                |
| /login             | Member Login                                                                                                                                               |
| /profile           | The member's personal information is seen, the member can add and delete appointments if member is a doctor, and cancel appointment if member is a patient |
| /register          | Member Register                                                                                                                                            |

## Admin Info

    -email: admin@gmail.com
    -password: admin123
