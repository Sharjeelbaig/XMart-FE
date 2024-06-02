export function isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
}