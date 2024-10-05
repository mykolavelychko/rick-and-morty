import { ApolloProvider } from "@apollo/client";
import "./App.css";
import AppRouter from "./AppRouter";
import client from "../apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
