import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { EditNote } from "../Modals/Note/EditNote";
import { DeleteNote } from "../Modals/Note/DeleteNote";
import { NoteType } from "@/types";

interface NoteProps {
  note: NoteType;
  onNoteUpdated: () => void;
  
}

export const Note = ({ note, onNoteUpdated }: NoteProps) => {
  const { title, content, active, archive, categories } = note;

  return (
    <Card className="max-w-[400px] bg-[#fff7f4] dark:bg-[#1d1d1d]" shadow="sm" radius="sm">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <strong>
            <p className="text-md">{title}</p>
          </strong>

          <div className="flex flex-row pt-2 gap-1 max-w-[380px] overflow-x-auto scrollbar-hide">
            {categories.map((categoryName, index) => (
              <Chip
                key={index}
                color="primary"
                variant="flat"
                size="sm"
                radius="sm"
              >
                {categoryName}
              </Chip>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p>{content}</p>
      </CardBody>
      <CardFooter className="flex justify-between items-center gap-2">
        <div className="flex flex-row gap-1">
          {active && (
            <Chip color="success" variant="flat">
              Active
            </Chip>
          )}
          {archive && (
            <Chip color="warning" variant="flat">
              Archived
            </Chip>
          )}
        </div>
        <div className="flex flex-row gap-1">
        <EditNote note={note} onNoteUpdated={() => onNoteUpdated()} />
          <DeleteNote noteId={note.noteId} onNoteDeleted={() => onNoteUpdated()} />
        </div>
      </CardFooter>
    </Card>
  );
};