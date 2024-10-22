"use client";
import { createCategory } from "@/services/Category";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";

interface CreateCategoryProps {
  onCategoryCreated: () => void;
}

export const CreateCategory: React.FC<CreateCategoryProps> = ({
  onCategoryCreated,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (onClose: { (): void; (): void }) => {
    setLoading(true);
    if (!categoryName) return;

    const newCategory = await createCategory(categoryName);

    if (newCategory) {
      onCategoryCreated();
      setLoading(false);
      onClose();
    } else {
      console.error("Error al crear la categoría");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="ghost"
        radius="md"
        size="sm"
      >
        Category +
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Category
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Category"
                  placeholder="Category name"
                  variant="bordered"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={loading}
                  onPress={() => handleSave(onClose)}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
