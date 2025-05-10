import { SignedIn, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { HomeSidebar } from "./pages/home/components/HomeSidebar";
import { NotesProvider } from "./context/NotesContext";

function App() {
  const auth = useAuth();
  const { isSignedIn } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn === false) {
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  return (
    <div>
      <SidebarProvider>
        <NotesProvider>
          <HomeSidebar />
          <div className="flex-1">
            <header className="flex flex-row justify-between w-full bg-gray-50 px-4 py-2">
              <SidebarTrigger />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            <main className="p-4">
              <Outlet />
            </main>
          </div>
        </NotesProvider>
      </SidebarProvider>
    </div>
  );
}

export default App;
