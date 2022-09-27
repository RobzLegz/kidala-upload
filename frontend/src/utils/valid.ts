export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const invalidUsername = (username: string) => {
    if (!username) {
        return 'Enter your username';
    }

    if (username.length < 3) {
        return 'Username must be at least 3 characters long';
    }

    if (username.length > 30) {
        return "Username can't be that long";
    }

    return '';
};
