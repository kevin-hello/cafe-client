import React, { useState } from 'react';
import FormInput from "../form-input/form-input";

export default function RegistrationForm() {
  const [ values, setValues ] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthday: "",
  });

  const inputs = [
    {
      id:1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      pattern: "^[A-Za-z0-9]{4,16}$",
      errorMessage:"Username must be 4 to 16 characters",
      required: "true"
    },
        {
      id:2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: "^[A-Za-z0-9!@#$%^&*]{6,16}$",
      errorMessage:"Password must be 6 to 16 characters",
      required: "true"
    },
        {
      id:3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      pattern: values.password,
      errorMessage:"Passwords do not match",
      required: "true"
    },        {
      id:4,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage:"Please enter a valid email",
      required: "true"

    },
        {
      id:5,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday"
    },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {inputs.map((input => (
        <FormInput
        key={input.id}
        {...input}
        value={values[input.name]}
        onChange={onChange}
        />
      )))}

        <button> Submit</button>
      </form>
    </div>
  )
}
