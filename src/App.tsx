import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./pages/home/Home.page";

function App() {
  const auth = useAuth();
  const { isSignedIn } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn === false) {
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  return <HomePage />;
}

export default App;
