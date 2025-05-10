import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateNewNoteDialog from "./CreateNewNoteDialog";
import { Link, useNavigate } from "react-router-dom";
import { useNotes } from "@/context/NotesContext";

export function HomeSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { notes } = useNotes();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <h1>
            <Link to="/">Insyte.ai</Link>
          </h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Notes</SidebarGroupLabel>
            <SidebarGroupAction
              title="New Folder"
              onClick={() => navigate("/notes/new")}
            >
              <Plus /> <span className="sr-only">New Folder</span>
            </SidebarGroupAction>

            <SidebarGroupContent>
              <SidebarMenu>
                {Array.isArray(notes) &&
                  notes.map((note) => (
                    <SidebarMenuItem key={note.title}>
                      <SidebarMenuButton asChild>
                        <Link to={`/notes/${note._id}`}>
                          <span>{note.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction>
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem>
                            <span>Create new subfolder</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>Move To</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Dialog Component for New Folder */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CreateNewNoteDialog />
      </Dialog>
    </>
  );
}
