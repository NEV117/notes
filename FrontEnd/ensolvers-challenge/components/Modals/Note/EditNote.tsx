"use client";
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
import { EditIcon } from "@/components/icons";
import { Checkbox } from "@nextui-org/checkbox";
import { useEffect, useState } from "react";
import { Category, NoteType } from "@/types";
import { fetchCategories } from "@/services/Category";
import { updateNote } from "@/services/Note";

interface EditNoteProps {
  note: NoteType;
  onNoteUpdated: () => void;
}

export const EditNote = ({ note, onNoteUpdated }: EditNoteProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [archive, setArchive] = useState(note.archive);
  const [active, setActive] = useState(note.active);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadCategories = async () => {
        try {
          const data = await fetchCategories();
          setCategories(data);
          const categoryIds = new Set(
            data
              .filter((cat) => note.categories.includes(cat.name))
              .map((cat) => cat.category_id.toString())
          );
          setSelectedCategories(categoryIds);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      loadCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (categories.length > 0) {
      const categoryIds = new Set(
        categories
          .filter((cat) => note.categories.includes(cat.name))
          .map((cat) => cat.category_id.toString())
      );
      setSelectedCategories(categoryIds);
    }
  }, [categories, note.categories]);

  const handleSave = async () => {
    setLoading(true);
    const noteData = {
      title,
      content,
      categories: Array.from(selectedCategories),
      archive,
      active,
    };

    const result = await updateNote(note.noteId, noteData);
    if (result) {
      setLoading(false);
      onNoteUpdated();
      onOpenChange();
    } else {
      console.error("Error updating note");
    }
  };

  const handleSelectionChange = (
    keys: Set<React.Key> | { anchorKey?: string; currentKey?: string }
  ) => {
    const selectedKeys = new Set<string>();
    if (keys instanceof Set) {
      keys.forEach((key) => selectedKeys.add(String(key)));
    } else if (Array.isArray(keys)) {
      keys.forEach((key) => selectedKeys.add(String(key)));
    }
    setSelectedCategories(selectedKeys);
  };

  // Handle checkbox changes
  const handleActiveChange = () => {
    if (archive) {
      // If archive is true, disable archive and set active to true
      setActive(true);
      setArchive(false);
    } else {
      // Toggle active state
      setActive(!active);
    }
  };

  const handleArchiveChange = () => {
    if (active) {
      // If active is true, disable active and set archive to true
      setArchive(true);
      setActive(false);
    } else {
      // Toggle archive state
      setArchive(!archive);
    }
  };

  useEffect(() => {
    // Ensure that at least one is selected
    if (!active && !archive) {
      setActive(true); // Default to active if neither is selected
    }
  }, [active, archive]);

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="primary"
        aria-label="Edit"
        size="sm"
        variant="ghost"
      >
        <EditIcon />
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
                Edit Note
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Note title"
                  variant="bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  label="Content"
                  placeholder="Note content must be below 2000 characters"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Select
                  label="Categories"
                  placeholder="Select categories"
                  selectionMode="multiple"
                  className="max-w-xs"
                  selectedKeys={Array.from(selectedCategories)}
                  onSelectionChange={handleSelectionChange}
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
                <div className="flex flex-col py-2 px-1 gap-2">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isSelected={active}
                    onChange={handleActiveChange}
                  >
                    Active
                  </Checkbox>
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isSelected={archive}
                    onChange={handleArchiveChange}
                  >
                    Archive
                  </Checkbox>
                </div>
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