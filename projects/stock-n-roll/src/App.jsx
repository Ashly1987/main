import { useState } from "react";
import "./App.css";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/react";
//import { getDailyStockData } from "./services/alphaVantageService";
import StockList from "./components/StockList";

function App() {
  const { user } = useUser();
  return (
    <div className="app-container">
      <header>
        <h1>Stock N Roll</h1>
        <h3>Check your stock's daily performance with Stock N Roll!</h3>
      </header>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        {user ? (
          <>
            <div className="user-header">
              <UserButton />
              <h2>Welcome, {user.firstName}!</h2>
            </div>
            <StockList userId={user.id} />
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </Show>

      {/*<SignedOut>
        <SignIn> </SignIn>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>*/}
    </div>
  );
}

export default App;
