import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};

    if (!values.first_name) {
        errors.first_name = 'Required';
    } else if (values.first_name.length > 25) {
        errors.first_name = 'Must be 15 characters or less';
    }

    if (!values.last_name) {
        errors.last_name = 'Required';
    } else if (values.last_name.length > 25) {
        errors.last_name = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const EditForm = ({localUser}) => {
    const formik = useFormik({
        initialValues: {
            first_name: localUser?.first_name,
            last_name: localUser?.last_name,
            email: localUser?.email,
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form className="d-flex flex-column w-50 m-auto" onSubmit={formik.handleSubmit}>

            <label htmlFor="firstName">First Name</label>
            <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
                <div className="text-danger">{formik.errors.first_name}</div>
            ) : null}

            <label htmlFor="last_name" className="mt-4">Last Name</label>
            <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
                <div className="text-danger">{formik.errors.last_name}</div>
            ) : null}

            <label htmlFor="email" className="mt-4">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
            ) : null}

            <button type="submit" className="mt-4">Submit</button>
        </form>
    );
};

export default EditForm;