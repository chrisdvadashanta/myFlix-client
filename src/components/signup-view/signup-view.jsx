import { React, useState } from "react";

export const SignupView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const Backend_API = "https://guarded-peak-19726.herokuapp.com";

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        username: username,
        password: password,
        email: email,
        birthdate: birthdate
      };
      
      fetch(`${Backend_API}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

// Perform login after successful registration

        fetch(`${Backend_API}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then((response) => response.json())
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
            .catch((error) => {
              console.log("Error occurred during login: ", error);
              alert("Something went wrong during login");
            });
    };
      

  return (
    <form onSubmit={handleSubmit}>
      <h1> Register </h1>
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
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </label> <br />
      <button type="submit">
        Register
      </button>
    </form>
  );
  };
