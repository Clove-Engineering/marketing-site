import PlasmicLoader from "@plasmicapp/loader";
import React, {useState} from "react";
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import {addDoc} from "../../util/firestore";

/**
 * This component is a wrapper around the EmailForm Plasmic component
 * It handles the state of the form
 */
const EmailForm = (props) => {
    const [submitted, setSubmitted] = useState(false)

    const emailSignUpFormSchema = yup
        .object()
        .shape({
            firstName: yup.string().required().min(3),
            email: yup.string().email().required(),
        })
        .noUnknown()

    return (
        <Formik initialValues={{firstName: "", email: ""}}
                validationSchema={emailSignUpFormSchema}
                onSubmit={async (values) => {
                    await addDoc(values, "email_collection", emailSignUpFormSchema);
                    setSubmitted(true);
                }}
        >{
            ({
                 errors,
                 values,
                 handleChange,
                 handleBlur,
                 isSubmitting,
                 handleSubmit,
                 touched
             }) => {
                const errorMessage = (name) => ({
                    children: (errors[name] && touched[name] && errors[name])
                })
                const field = (name, options = {}) => ({
                    props: {
                        ...options,
                        name: name,
                        onChange: handleChange,
                        value: values[name],
                        onBlur: handleBlur,
                        error: errors[name]
                    }
                })
                return <PlasmicLoader
                    component="EmailForm"
                    componentProps={{
                        ...props,
                        submitted: submitted,
                        submitButton: {
                            props: {
                                onClick: handleSubmit,
                                disabled: isSubmitting
                            }
                        },
                        firstName: field("firstName"),
                        firstNameError: errorMessage("firstName"),
                        email: field("email", {type: "email"}),
                        emailError: errorMessage("email")
                    }}/>;
            }}
        </Formik>
    )

}

export default EmailForm;