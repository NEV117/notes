"use client";
import { DeleteIcon } from "@/components/icons";
import { deleteNote } from "@/services/Note";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useState } from "react";


interface DeleteNoteProps {
  noteId: number;
  onNoteDeleted: () => void; // Callback function to refresh the notes list
}

export const DeleteNote = ({ noteId, onNoteDeleted }: DeleteNoteProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteNote(noteId);
    if (result.success) {
      onNoteDeleted(); // Refresh the notes list or perform other actions
      onOpenChange(); // Close the modal
    } else {
      alert("Error deleting note: " + result.message);
    }
    setLoading(false);
  };

  return (
    <>        
      <Button onPress={onOpen} isIconOnly color="danger" aria-label="Delete" size="sm" variant="ghost">
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Note
              </ModalHeader>
              <ModalBody>
                <h1 className="text-[18px]">Are you sure you want to <strong>delete</strong> this note?</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" isLoading={loading} onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};