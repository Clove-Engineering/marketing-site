import PlasmicLoader from "@plasmicapp/loader";
import React, {useState} from "react";
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import {addDoc} from "../../util/firestore";

/**
 * This component is a wrapper around the EmailForm Plasmic component
 * It handles the state of the form
 */
const ContactForm = (props) => {
    const [submitted, setSubmitted] = useState(false)

    const contactFormSchema = yup
        .object()
        .shape({
            name: yup.string().required().min(3),
            email: yup.string().email().required(),
            phone: yup.string(),
            message: yup.string().required()
        })
        .noUnknown()

    return (
        <Formik initialValues={{name: "", email: "", phone: "", message: ""}}
                validationSchema={contactFormSchema}
                onSubmit={async (values) => {
                    await addDoc(values, "contact_form", contactFormSchema);
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
                    component="ContactForm"
                    componentProps={{
                        ...props,
                        submitted: submitted,
                        submitButton: {
                            props: {
                                disabled: isSubmitting,
                                onClick: handleSubmit,
                                type: "button"
                            }
                        },
                        name: field("name"),
                        nameError: errorMessage("name"),
                        email: field("email", {type: "email"}),
                        emailError: errorMessage("email"),
                        phone: field("phone"),
                        phoneError: errorMessage("phone"),
                        message: field("message"),
                        messageError: errorMessage("message")
                    }}
                />;
            }}
        </Formik>
    )

}

export default ContactForm;