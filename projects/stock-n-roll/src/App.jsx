import { useState } from "react";
import "./App.css";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function App() {
  return (
    <header>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>

      {/*<SignedOut>
        <SignIn> </SignIn>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>*/}
    </header>
  );
}

export default App;
