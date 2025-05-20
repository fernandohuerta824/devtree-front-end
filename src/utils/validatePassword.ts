export const validatePassword = (password: string) => {

    return (
        password.length >= 7 &&
        password.length <= 40 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        !password.includes(" ")
    ) 
}