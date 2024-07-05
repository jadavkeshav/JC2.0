import { RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Home() {
  
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
      <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default Home;
