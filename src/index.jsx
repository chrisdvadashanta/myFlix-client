import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
// import MainView from "./components/main-view/main-view";


import "./index.scss";
import { Container } from "react-bootstrap";

const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234','myflixmovie1234.netlify.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

const App = () => {
 return (
    <Container>
        <MainView />
    </Container>
 )
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);