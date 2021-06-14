import PlasmicLoader from "@plasmicapp/loader";
import React from "react";
import {addDoc, collection} from "firebase/firestore"
import getFirestore from "../../util/getFirestore.jsx"


class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.state = {
            submitted: false,
            disabled: true,
            firstName: "",
            email: ""
        }
    }

    async handleSubmit(event) {
        try {
            const {firstName, email} = this.state;

            const docRef = await addDoc(collection(getFirestore(), "email_collection"), {
                first_name: firstName,
                email: email,
                new: true
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        event.preventDefault();
        this.setState({submitted: true})
    }

    onChangeName(e) {
        const firstName = e.target.value;
        const {email} = this.state;
        const disabled = this.isDisabled(firstName, email);
        this.setState({disabled: disabled, firstName: firstName});
    }

    onChangeEmail(e) {
        const email = e.target.value;
        const {firstName} = this.state;
        const disabled = this.isDisabled(firstName, email);
        this.setState({disabled: disabled, email: email});
    }

    isDisabled(firstName, email) {
        return firstName.length < 3 || !this.validateEmail(email)
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        return (
            <PlasmicLoader
                component="EmailForm"
                componentProps={{
                    ...this.props,
                    submitted: this.state.submitted,
                    submitButton: {
                        props: {
                            onClick: this.handleSubmit,
                            disabled: this.state.disabled
                        }
                    }, firstname: {
                        props: {
                            onChange: this.onChangeName,
                            value: this.state.firstName
                        }
                    }, email: {
                        props: {
                            onChange: this.onChangeEmail,
                            value: this.state.email
                        }
                    }
                }}
            />
        )
    }
}

export default EmailForm;