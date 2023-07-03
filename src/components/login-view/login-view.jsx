import { React, useState } from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const Backend_API = "https://guarded-peak-19726.herokuapp.com";

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch(`${Backend_API}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
        .then((data) => {
          console.log('Login response: ', data);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            onLoggedIn(data.user, data.token);
            alert('Logged in successfully, please proceed to the homepage')
          } else {
            alert('No such user');
          }
        })
            .catch((e) => {
                console.log("Error occurred: ", e);
                alert("Something went wrong");
            });
    }

//////////Form////////////
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
            </label> 
            <button type="submit">
                Login
            </button>
        </form>
    );
};