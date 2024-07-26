import db from '.';

export const addDummyUsers = async (count: number) => {
    try {
        await db.user.createMany({
            data: Array.from({ length: count }, (_, index) => {
                return {
                    name: 'dummyuser' + Date.now(),
                    surname: 'dummusurname' + Date.now(),
                    email: `dummyemail${Date.now() + index}@gmail.com`,
                    password:
                        '$2a$15$Tdqfw26jNlavCSA0qwXEAeyrFwA3VymmOyPENeLFDlkI5Nd.YF9yC',
                    phoneNumber: '12345678',
                };
            }),
        });

        console.log('Dummy users Added');
    } catch (error) {
        console.log('Error at Adding Dummy Users');
    }
};
