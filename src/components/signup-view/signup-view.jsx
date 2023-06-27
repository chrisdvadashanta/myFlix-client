import { React, useState } from "react";

export const SignupView = () => {

    const handleSubmit = (event) => {};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <form onSubmit={handleSubmit}>
            <h1> Login </h1>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /> <br />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label> <br />
        <button type="submit">
            Login 
        </button>
      </form>
    );
  };