"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/models/task.model";
import { updateTask } from "@/services/task.service";
import { useState } from "react";

type Props = {
  task: Task;
  onTaskUpdated: (updated: Task) => void; // on renvoie juste la task mise à jour
};

export default function MarkAsDoneDialog({ task, onTaskUpdated }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const updated = await updateTask(task.id, {
        done: !task.done,
        title: task.title,
        note: task.note,
        date: task.date,
        hour: task.hour,
        client: {
          id: task.client.id,
        },
      });
      console.log("Clique sur oui: ", updated);

      onTaskUpdated(updated);
    } catch (error) {
      alert("Erreur : " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <Checkbox checked={task.done} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {task.done ? "Revenir à cette tâche ?" : "Marquer comme achevée ?"}
          </DialogTitle>
        </DialogHeader>

        <p>
          {task.done
            ? `Voulez-vous réactiver la tâche « ${task.title} » du client ${task.client?.name} ?`
            : `Voulez-vous achever la tâche « ${task.title} » du client ${task.client?.name} ?`}
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Non</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleConfirm} disabled={loading}>
              Oui
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
