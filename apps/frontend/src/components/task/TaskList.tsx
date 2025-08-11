"use client";

import { Task } from "@/models/task.model";
import { getAllTasks } from "@/services/task.service";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskTable from "./TaskTable";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  // Chargement tâches
  const fetchTasks = () => {
    setLoadingTasks(true);
    getAllTasks()
      .then(setTasks)
      .catch(() => setTasks([]))
      .finally(() => setLoadingTasks(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="space-y-4">
      <div className="w-full border-b border-gray-400 flex justify-center gap-2 m-0">
        <button
          onClick={() => setSearchActive(!searchActive)}
          className={`flex flex-col items-center px-4 py-2 text-sm font-medium transition cursor-pointer hover:text-[#dfca70] ${
            searchActive ? "text-[#dfca70]" : ""
          }`}
        >
          <Search />
          <span>Rechercher</span>
        </button>

        <CreateTaskDialog onTaskCreated={fetchTasks} />
      </div>

      {searchActive && (
        <div className="bg-gray-200 border-b border-gray-300 m-0 p-2">
          <div className="flex">
            <div className="relative bg-white">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 h-10 pl-3 pr-3 border border-gray-400 border-r-0 text-sm focus:outline-none focus:ring-1 focus:ring-[#006680] focus:border-[#006680]"
              />
            </div>
            <button
              className="h-10 px-3 bg-[#006680] text-white hover:bg-[#008099] transition-colors border border-[#006680]"
              title="Rechercher"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center m-0 p-2">
        <div>
          <span>Tous les {tasks.length} tâches</span>
        </div>
      </div>

      {loadingTasks ? (
        <p>Chargement des tâches...</p>
      ) : (
        <TaskTable tasks={tasks} onTasksChange={fetchTasks} />
      )}
    </div>
  );
}
