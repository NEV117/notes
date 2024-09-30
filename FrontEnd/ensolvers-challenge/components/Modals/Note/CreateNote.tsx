import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
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
import { fetchCategories } from "@/services/Category";
import { Category } from "@/types";
import { createNote } from "@/services/Note";

interface CreateNoteProps {
  ReFetch: () => void;
}

export const CreateNote = ({ ReFetch }: CreateNoteProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<React.Key>>(
    new Set()
  );
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateNote = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    if (selectedCategories.size === 0) newErrors.categories = "At least one category must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateNote()) {
      setLoading(true);
      const categoriesArray = Array.from(selectedCategories).map((id) =>
        id.toString()
      );

      const noteData = {
        title: title,
        content: content,
        categories: categoriesArray,
        archive: false,
        active: true,
      };

      try {
        const result = await createNote(noteData);
        if (result) {
        } else {
          console.error("Error on creating");
        }
      } catch (error) {
        console.error("Error during note creation:", error);
      } finally {
        setLoading(false);
        ReFetch();
        onClose();
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" radius="md">
        <strong>Note +</strong>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Note
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Note title"
                  variant="bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title}
                />
                <Textarea
                  label="Content"
                  placeholder="Note content must be below 2000 characters"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  isInvalid={!!errors.content}
                  errorMessage={errors.content}
                />
                <Select
                  label="Categories"
                  placeholder="Select categories"
                  selectionMode="multiple"
                  className="max-w-xs"
                  onSelectionChange={(keys) =>
                    setSelectedCategories(new Set(keys))
                  }
                  isInvalid={!!errors.categories}
                  errorMessage={errors.categories}
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
                  onPress={handleSave}
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

