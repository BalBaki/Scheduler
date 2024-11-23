const pages = {
    admin: ['/dashboard'],
    auth: ['/login', '/register'],
    get authRequired() {
        return [...this.admin, '/profile'];
    },
};

export const checkPageType = (type: keyof typeof pages, url: string) =>
    pages[type].some((page) => url.startsWith(page));
