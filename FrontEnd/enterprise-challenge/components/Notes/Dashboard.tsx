"use client";
import { Note } from "./Note";
import { Chip } from "@nextui-org/chip";
import { Switch } from "@nextui-org/switch";
import { CreateCategory } from "../Modals/Category/CreateCategory";
import { DeleteCategory } from "../Modals/Category/DeleteCategory";
import { CreateNote } from "../Modals/Note/CreateNote";
import { useEffect, useState } from "react";
import { Category, NoteType } from "@/types";
import { fetchCategories } from "@/services/Category";
import {
  fetchActiveNotes,
  fetchAllNotes,
  fetchArchivedNotes,
  filterNotesByCategories,
} from "@/services/Note";
import { FilterCategories } from "../Modals/Category/FilterCategories";
import { Button } from "@nextui-org/button";

export const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingNotes, setLoadingNotes] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for filter selection
  const [filter, setFilter] = useState<"all" | "active" | "archived" | "clear">(
    "all"
  );

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError("Error al obtener categorías");
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadNotes = async () => {
    setLoadingNotes(true); // Start loading
    try {
      let data: NoteType[] = [];
      switch (filter) {
        case "active":
          data = await fetchActiveNotes();
          break;
        case "archived":
          data = await fetchArchivedNotes();
          break;
        case "clear":
          handleFilterChange("all");
          return; // Avoid setting notes if filter is cleared
        case "all":
        default:
          data = await fetchAllNotes();
          break;
      }
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoadingNotes(false); // End loading
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadNotes(); // Load notes whenever the filter changes
  }, [filter]);

  const handleFilterChange = (
    selectedFilter: "all" | "active" | "archived" | "clear"
  ) => {
    setFilter(selectedFilter);
  };

  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds.map((id) => {
      const category = categories.find(
        (cat) => cat.category_id.toString() === id
      );
      return category ? category.name : "Unknown";
    });
  };

  const handleLoadingStart = () => {
    setLoadingNotes(true);
  };

  const handleResetFilters = () => {
    setFilter("all");
  };

  const handleFilter = async (categoryIds: string[]) => {
    try {
      const filteredNotes = await filterNotesByCategories(categoryIds);
      setNotes(filteredNotes);
    } catch (error) {
      console.error("Error fetching filtered notes:", error);
    } finally {
      setLoadingNotes(false);
    }
  };

  const onCategoryCreated = () => {
    setLoadingCategories(true);
    loadCategories();
  };

  const onCategoryDeleted = () => {
    setLoadingCategories(true);
    loadCategories();
  };

  const handleNoteCreated = () => {
    loadNotes();
    handleResetFilters();
  };

  return (
    <div>
      <div className="bg-[#fff7f4] dark:bg-[#1d1d1d] rounded-t-lg p-4">
        <div className="flex flex-col md:flex-row gap-2 bg-[#faeeea] dark:bg-[#111111] rounded-md p-4">
          <h1 className="text-lg font-semibold">Categories:</h1>
          <div className="flex flex-row gap-2 overflow-x-auto scrollbar-hide">
            {loadingCategories ? (
              <div>Loading ...</div>
            ) : (
              categories.map((category) => (
                <Chip
                  key={category.category_id}
                  color="primary"
                  variant="flat"
                  size="md"
                  radius="sm"
                >
                  {category.name}
                </Chip>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
          <div className="flex flex-col md:flex-row gap-2">
            <CreateCategory onCategoryCreated={onCategoryCreated} />
            <DeleteCategory onCategoryDeleted={onCategoryDeleted} />
            <FilterCategories
              onFilter={handleFilter}
              onLoadingStart={handleLoadingStart}
              onResetFilters={handleResetFilters}
            />
            <Button
              onPress={() => handleFilterChange("clear")}
              color="primary"
              radius="md"
              size="sm"
              variant="bordered"
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <Switch
                isSelected={filter === "all"}
                color="primary"
                size="sm"
                onChange={() => handleFilterChange("all")}
              >
                All Notes
              </Switch>
              <Switch
                isSelected={filter === "active"}
                color="success"
                size="sm"
                onChange={() => handleFilterChange("active")}
              >
                Active Notes
              </Switch>
              <Switch
                isSelected={filter === "archived"}
                color="warning"
                size="sm"
                onChange={() => handleFilterChange("archived")}
              >
                Archived Notes
              </Switch>
            </div>
            <div className="flex justify-end">
              <CreateNote ReFetch={handleNoteCreated} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 overflow-y-auto max-h-[750px] scrollbar-hide bg-[#fff7f4] dark:bg-[#1d1d1d] rounded-b sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loadingNotes ? (
          <div>Loading ...</div>
        ) : (
          notes.map((note) => (
            <Note
              key={note.noteId}
              note={{ ...note, categories: getCategoryNames(note.categories) }}
              onNoteUpdated={handleNoteCreated}
            />
          ))
        )}
      </div>
    </div>
  );
};
