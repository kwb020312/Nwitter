import React, { useState } from "react";
import { authService } from "../fbase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Email"
          required
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          required
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "LogIn"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
}
