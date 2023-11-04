export const checksum = (cardNumber: string | undefined): boolean => {
    return !!cardNumber && cardNumber.length === 19 && Array.from(cardNumber.replaceAll(' ', ''))
        .reverse()
        .map((digit, index) => (index + 1) % 2 === 0 ? squash(+digit * 2) : +digit)
        .reduce((accum, current) => accum + current) % 10 === 0;
}

const squash = (number: number): number => {
    let res = number + '';
    while (res.length > 1) {
        res = '' + Array.from(res).reduce((accum, current) => accum + +current, 0);
    }

    return +res;
}

export const validateEmail = (email: string): boolean => {
    return !!email && /\w+@\w+\.\w+/.test(email);
}

export const validateExpirationDate = (date: string): boolean => {
    return !!date && date.length === 5 && /(0[1-9]|1[1-2])\/[0-9][0-9]/.test(date) &&
        (new Date(+`20${date.split('\/')[1]}`, +date.split('\/')[0])).getTime() > Date.now();
}