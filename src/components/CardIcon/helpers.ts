type CardType = 'visa' | 'mastercard' | 'mir' | 'none';

export const cardTypeToIcons: Map<CardType, string> = new Map([
   ['mastercard', '../../../assets/mastercard.svg'],
   ['visa', '../../../assets/visa.svg'],
   ['mir', '../../../assets/mir.svg'],
   ['none', ''],
]);
export const getCardType = (cardIIN: string): CardType => {
    if (!cardIIN)
        return 'none';

    // 2221 - 2720 || 51 - 55
    if (/^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)/.test(cardIIN)
        || cardIIN.length === 2 && /5[1-5]/.test(cardIIN)) {
        return 'mastercard';
    }
    if (cardIIN[0] === '4') {
        return 'visa';
    }
    if (/^(220[0-4])/.test(cardIIN)) {
        return 'mir';
    }

    return 'none';
}