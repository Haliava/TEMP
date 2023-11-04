import React from 'react';
import styles from './styles.module.scss';
import {cardTypeToIcons, getCardType} from "./helpers";

type Props = {
    cardIIN: string,
}

const View = ({cardIIN}: Props) => {
    const cardIconUrl = cardTypeToIcons.get(getCardType(cardIIN));

    return (
        <div className={styles.root}>
            {cardIconUrl && <img className={styles.icon} src={cardIconUrl} />}
        </div>
    );
};

export default View;