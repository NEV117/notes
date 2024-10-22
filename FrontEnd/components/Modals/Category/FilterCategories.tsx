"use client";
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
import { useState, useEffect } from "react";
import { Category } from "@/types";
import { fetchCategories } from "@/services/Category";

interface FilterCategoriesProps {
  onFilter: (categoryIds: string[]) => void;
  onLoadingStart: () => void;
  onResetFilters: () => void;
}

export const FilterCategories = ({
  onFilter,
  onLoadingStart,
  onResetFilters,
}: FilterCategoriesProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<React.Key>>(
    new Set()
  );
  const [loading, setLoading] = useState(false);

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

  const handleFilter = () => {
    onLoadingStart();    
    setLoading(true);
    onResetFilters();
    setLoading(false);
    onClose();

    onFilter(Array.from(selectedCategories) as string[]);
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
        Filter Categories
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Filter by one or many Categories
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
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={loading}
                onPress={handleFilter}
              >
                Filter
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
