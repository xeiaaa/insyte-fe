import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, useAuth, UserButton } from "@clerk/clerk-react";
import { HomeSidebar } from "./components/HomeSidebar";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      if (isSignedIn) {
        const token = await getToken();
        axios.get("http://localhost:3000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    };

    init();
  }, [isSignedIn, getToken]);

  return (
    <div>
      <SidebarProvider>
        <HomeSidebar />
        <main className="flex-1 p-2">
          <header className="flex flex-row justify-between w-full">
            <SidebarTrigger />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default HomePage;
