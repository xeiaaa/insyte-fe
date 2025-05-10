import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const HomePage = () => {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      if (isSignedIn) {
        // const token = await getToken();
        // axios.get("http://localhost:3000", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
      }
    };

    init();
  }, [isSignedIn, getToken]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default HomePage;
