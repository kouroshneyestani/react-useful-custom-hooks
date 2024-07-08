import { useState, useCallback } from "react";

/**
 * A custom hook for managing form state and validation.
 *
 * @param {object} initialValues - Initial values for the form fields.
 * @param {function} validate - A validation function that takes the form values and returns an errors object.
 *
 * @returns {object} - Contains form values, errors, change handler, and submit handler.
 */
export const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    /**
     * Function to validate the form values.
     * Calls the validation function passed to the hook.
     *
     * @param {object} fieldValues - Optional, to validate specific field values.
     * @returns {boolean} - True if there are no validation errors.
     */
    const validateForm = useCallback(
        (fieldValues = values) => {
            const validationErrors = validate(fieldValues) || {};
            setErrors(validationErrors);
            return Object.keys(validationErrors).length === 0;
        },
        [values, validate]
    );

    /**
     * Function to handle input changes and validate the updated field.
     *
     * @param {object} e - The change event object.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        validateForm({ ...values, [name]: value });
    };

    /**
     * Function to handle form submission, validate form values, and call the provided callback.
     *
     * @param {object} e - The submit event object.
     * @param {function} callback - The callback to be called if validation passes.
     */
    const handleSubmit = (e, callback) => {
        e.preventDefault();
        if (validateForm() && callback) {
            callback();
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};
