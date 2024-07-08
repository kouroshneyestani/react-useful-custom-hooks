import React from "react";
import { useForm } from "../hooks/useForm";

// Validation function
const validate = (values) => {
    let errors = {};
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    return errors;
};

const LoginForm = () => {
    const { values, errors, handleChange, handleSubmit } = useForm(
        { email: "", password: "" },
        validate
    );

    const submitForm = () => {
        console.log("Form submitted successfully", values);
    };

    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={(e) => handleSubmit(e, submitForm)}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;
