import { Task } from "@/models/task.model";
import { DataTable } from "../client/data-table";
import { columns } from "./columns";

type Props = {
  tasks: Task[];
  onTasksChange: () => void;
};

export default function TaskTable({ tasks, onTasksChange }: Props) {
  return (
    <div className="px-2">
      <DataTable columns={columns(onTasksChange)} data={tasks} />
    </div>
  );
}
