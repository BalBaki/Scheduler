import type { UserWithoutPassword } from '@/types';
import type { Appointment } from '@prisma/client';

export type GetAppointments =
    | {
          search: true;
          appointments: (Appointment & {
              patient?: UserWithoutPassword;
              doctor?: UserWithoutPassword;
          })[];
      }
    | {
          search: false;
          error: string;
      };
