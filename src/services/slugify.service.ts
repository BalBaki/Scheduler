import 'server-only';
import slugify from 'slugify';
import db from './db.service';

export class SlugifyService {
    static readonly replacement = '-';

    static async getDoctorSlugCount(
        name: string,
        surname: string,
    ): Promise<number> {
        return db.user.count({
            where: {
                name,
                surname,
                NOT: {
                    slug: null,
                },
            },
        });
    }

    static async createDoctorSlug(
        name: string,
        surname: string,
    ): Promise<string> {
        const baseSlug = slugify(`${name} ${surname}`, {
            replacement: this.replacement,
            lower: true,
            locale: 'en',
        });

        const slugCount = await this.getDoctorSlugCount(name, surname);

        if (slugCount === 0) {
            return baseSlug;
        }

        return `${baseSlug}${this.replacement}${slugCount}`;
    }

    static async generatePendingDoctorSlugs() {
        const approveWaitingDoctors = await db.user.findMany({
            where: { status: 'WAITING', role: 'DOCTOR' },
        });

        await db.$transaction(async () => {
            for (const doctor of approveWaitingDoctors) {
                const slug = await this.createDoctorSlug(
                    doctor.name,
                    doctor.surname,
                );

                await db.user.update({
                    data: { slug },
                    where: { id: doctor.id },
                });
            }
        });
    }
}
