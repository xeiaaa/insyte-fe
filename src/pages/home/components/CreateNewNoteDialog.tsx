import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CreateNewNoteDialog = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<
    "manual" | "file" | "url" | undefined
  >();

  return (
    <DialogContent className="sm:max-w-[425px] bg-white/90 shadow-lg backdrop-blur-md">
      <DialogHeader>
        <DialogTitle>Create New Note</DialogTitle>
        <DialogDescription>
          {step === 1 && <span>How would you like to add your new note?</span>}
          <ul className="list-disc pl-4 mt-2 text-sm text-gray-600">
            {(step === 1 || (step === 2 && selectedType === "manual")) && (
              <li>
                📄 <strong>Manual Text Entry:</strong> Write or paste your own
                content.
              </li>
            )}
            {(step === 1 || (step === 2 && selectedType === "file")) && (
              <li>
                📂 <strong>Files:</strong> Upload a document, and we’ll process
                it for you.
              </li>
            )}
            {(step === 1 || (step === 2 && selectedType === "url")) && (
              <li>
                🔗 <strong>URL:</strong> Paste a link, and we’ll extract its
                content.
              </li>
            )}
          </ul>
        </DialogDescription>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-row justify-between">
          {step === 1 && (
            <>
              <Button
                onClick={() => {
                  setSelectedType("manual");
                  setStep(2);
                }}
              >
                Manual Text Entry
              </Button>
              <Button
                onClick={() => {
                  setSelectedType("file");
                  setStep(2);
                }}
              >
                Upload File
              </Button>
              <Button
                onClick={() => {
                  setSelectedType("url");
                  setStep(2);
                }}
              >
                URL
              </Button>
            </>
          )}
          {step === 2 && (
            <Button
              onClick={() => {
                setSelectedType(undefined);
                setStep(1);
              }}
            >
              Back
            </Button>
          )}
        </div>
      </DialogDescription>
      {/* <DialogFooter>
        <Button onClick={() => {}}>Create</Button>
      </DialogFooter> */}
    </DialogContent>
  );
};

export default CreateNewNoteDialog;
