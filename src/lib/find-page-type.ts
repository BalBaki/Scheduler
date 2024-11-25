const pages = {
    admin: ['/dashboard'],
    auth: ['/login', '/register'],
    get authRequired() {
        return [...this.admin, '/profile'];
    },
};

type PageType = keyof typeof pages;

export const findPageType = (url: string | URL): PageType[] => {
    try {
        const { pathname } = url instanceof URL ? url : new URL(url);

        return Object.entries(pages).reduce(
            (result: PageType[], [type, paths]) => {
                if (paths.some((path) => pathname.startsWith(path)))
                    result.push(type as PageType);

                return result;
            },
            [],
        );
    } catch (error) {
        return [];
    }
};
