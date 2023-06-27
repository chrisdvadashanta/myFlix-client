import { React, useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const herokuRegister = "https://guarded-peak-19726.herokuapp.com/users";
    const openLibraryLogin = "https://openlibrary.org/account/login.json";

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(herokuRegister, {
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
                alert("Something went wrong");
            });
    }

//////////Form//////////////
    return (
        <form onSubmit={handleSubmit}>
            <h1> Registration </h1>
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
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label> <br />
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </label> <br />
            <button type="submit">
                Register
            </button>
        </form>
    );
};