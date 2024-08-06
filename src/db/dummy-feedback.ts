import db from '.';

export const addDummyFeedback = async (count: number) => {
    try {
        await db.feedback.createMany({
            data: Array.from({ length: count }, (_, index) => {
                return {
                    email: `dummyemail${Date.now() + index}@gmail.com`,
                    message: `dummyemail${Date.now() + index}@gmail.com Magna consequat anim cupidatat deserunt ea consectetur ullamco sint qui pariatur sunt sit.`,
                };
            }),
        });

        console.log('Dummy feedbacks Added');
    } catch (error) {
        console.log('Error at Adding Dummy Feedbacks');
    }
};
