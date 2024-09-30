"use client";
import { deleteCategory, fetchCategories } from "@/services/Category";
import { Category } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";

interface DelteCategoryProps {
  onCategoryDeleted: () => void;
}

export const DeleteCategory: React.FC<DelteCategoryProps> = ({ onCategoryDeleted }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<React.Key>>(
    new Set()
  );
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const loadCategories = async () => {
        try {
          const data = await fetchCategories();
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      loadCategories();
    }
  }, [isOpen]); 

  const handleDelete = async () => {
    const categoryIdsArray = Array.from(selectedCategories);
    setDeleteLoader(true);
    for (let categoryId of categoryIdsArray) {
      await deleteCategory(Number(categoryId));
    }
    setDeleteLoader(false)
    onCategoryDeleted();
    onClose(); 
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="ghost" radius="md" size="sm">
        Category -
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete one or many Categories
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Categories"
                  placeholder="Select categories"
                  selectionMode="multiple"
                  className="max-w-xs"
                  onSelectionChange={(keys) =>
                    setSelectedCategories(new Set(keys))
                  }
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category.category_id.toString()}
                      value={category.category_id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" isLoading={deleteLoader} onPress={() => handleDelete()}>
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
