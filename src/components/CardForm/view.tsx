import React, {useEffect, useState} from 'react';
import {Button, FormControl, TextField} from "@mui/material";
import styles from './styles.module.scss';
import CardIcon from '../CardIcon';
import {checksum, validateEmail, validateExpirationDate} from "./helpers";

type InputField = {
    fieldName: string,
    onChange?: (e: any) => void,
    onKeyPress?: (e: any) => void,
    onBlur?: (e: any) => void,
    placeholder?: string,
}
type FieldName = 'cardNumber' | 'email' | 'expirationDate' | 'cvv';
type InputFields = Record<FieldName, InputField>;

const View = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const inputFields: InputFields = {
        cardNumber: {
            fieldName: 'Card Number',
            onChange: (e) => {
                if (!e.data && e.target.value[e.target.value.length - 1] === " ") {
                    e.target.value = e.target.value.slice(0, -1);
                }
                setValues(prev =>
                    structuredClone(prev).set(inputFields.cardNumber.fieldName as FieldName, e.target.value));
            },
            onKeyPress: (e) => {
                const data = +e.key;
                let currentData = e.target.value;
                let spaceCount = currentData.split(" ").length;

                if ((!data && e.key !== '0') || currentData.length >= 19) {
                    e.preventDefault();
                    return;
                }

                if (currentData.length > 1 && (currentData.length === 4 || (currentData.length - spaceCount + 1) % 4 === 0)) {
                    e.target.value += " ";
                }
                setValues(prev =>
                    structuredClone(prev).set(inputFields.cardNumber.fieldName as FieldName, e.target.value));
            },
            onBlur: (e) => {
                setErrors((prev) =>
                    structuredClone(prev).set(inputFields.cardNumber.fieldName,
                        !checksum(values.get(inputFields.cardNumber.fieldName as FieldName))));
            },
        },
        email: {
            fieldName: 'Email',
            onKeyPress: (e) => {
                setValues(prev =>
                    structuredClone(prev).set(inputFields.email.fieldName as FieldName, e.target.value));
            },
            onBlur: (e) => {
                setErrors(prev =>
                    structuredClone(prev).set(inputFields.email.fieldName, !validateEmail(e.target.value)));
            }
        },
        expirationDate: {
            fieldName: 'Expiration Date',
            placeholder: 'MM/YY',
            onChange: (e) => {
                if (!e.data && e.target.value[e.target.value.length - 1] === "/") {
                    e.target.value = e.target.value.slice(0, -1);
                    setValues(prev =>
                        structuredClone(prev).set(inputFields.expirationDate.fieldName as FieldName, e.target.value));
                }
            },
            onKeyPress: (e) => {
                const data = +e.key;
                let currentData = e.target.value;

                if (!data || currentData.length > 4) {
                    e.preventDefault();
                    return;
                }
                if (currentData.length === 2) {
                    e.target.value += "/";
                }
                setValues(prev =>
                    structuredClone(prev).set(inputFields.expirationDate.fieldName as FieldName, e.target.value));
            },
            onBlur: (e) => {
                setErrors(prev =>
                    structuredClone(prev).set(inputFields.expirationDate.fieldName, !validateExpirationDate(e.target.value)));
            }
        },
        cvv: {
            fieldName: 'CVV/CVC',
            onChange: (e) => {
                setValues(prev =>
                    structuredClone(prev).set(inputFields.cvv.fieldName as FieldName, e.target.value));
            },
            onKeyPress: (e) => {
                if (e.target.value.length >= 3) {
                    e.preventDefault();
                    return;
                }
                setValues(prev =>
                    structuredClone(prev).set(inputFields.cvv.fieldName as FieldName, e.target.value));
            },
            onBlur: (e) => {
                setErrors(prev =>
                    structuredClone(prev).set(inputFields.cvv.fieldName,
                        (values.get(inputFields.cvv.fieldName as FieldName) || '').length <= 0));
            },
        }
    };
    const [values, setValues] = useState<Map<FieldName, string>>(
        new Map<FieldName, string>([
            [inputFields.cardNumber.fieldName as FieldName, ''],
            [inputFields.email.fieldName as FieldName, ''],
            [inputFields.expirationDate.fieldName as FieldName, ''],
            [inputFields.cvv.fieldName as FieldName, ''],
        ])
    )
    const [errors, setErrors] = useState(
        new Map([
            [inputFields.cardNumber.fieldName, false],
            [inputFields.email.fieldName, false],
            [inputFields.expirationDate.fieldName, false],
            [inputFields.cvv.fieldName, false],
        ])
    );

    useEffect(() => {
        setIsButtonDisabled(Array.from(values.values()).some(elem => !elem || elem.length <= 0)
            || Array.from(errors.values()).some(elem => elem));
    }, [errors, values]);

    return (
        <div className={styles.root}>
            <FormControl defaultValue="" className={styles.form} required>
                {[inputFields.cardNumber, inputFields.email]
                    .map(({fieldName, onKeyPress, onChange, onBlur}) => (
                            <div className={styles.inputFieldWrapper} key={fieldName}>
                                {errors.get(fieldName) &&
                                <div className={styles.errorText}>
                                    {`${fieldName} is not valid`}
                                </div>}
                                <TextField
                                    onKeyPress={onKeyPress}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    onFocus={(e) =>
                                        setErrors(prev => structuredClone(prev).set(fieldName, false))}
                                    className={styles.formInput}
                                    label={fieldName}
                                    defaultValue=""
                                    variant="outlined"
                                >
                                </TextField>
                                {fieldName === inputFields.cardNumber.fieldName &&
                                <CardIcon
                                    cardIIN={values.get(inputFields.cardNumber.fieldName as FieldName) || ''}
                                />}
                            </div>
                        ))}

                <div className={styles.formInputGroup}>
                    {[inputFields.expirationDate, inputFields.cvv]
                        .map(({fieldName, onKeyPress, onChange, onBlur, placeholder}) => (
                            <div className={styles.inputFieldWrapper} key={fieldName}>
                                {errors.get(fieldName) &&
                                <div className={styles.errorText}>
                                    {`${fieldName} is not valid`}
                                </div>}
                                <TextField
                                    onKeyPress={onKeyPress}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    onFocus={(e) =>
                                        setErrors(prev => structuredClone(prev).set(fieldName, false))}
                                    label={fieldName}
                                    placeholder={placeholder}
                                    variant="outlined"
                                />
                            </div>
                        ))}
                </div>
                <Button variant="contained" disabled={isButtonDisabled}>Submit</Button>
            </FormControl>
        </div>
    );
};

export default View;