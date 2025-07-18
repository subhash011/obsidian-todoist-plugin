import type React from "react";

import type { Task } from "@/data/task";
import { buildTaskTree, type TaskTree } from "@/data/transformations/relationships";
import { sortTasks } from "@/data/transformations/sorting";
import type { SortingVariant } from "@/query/query";
import { QueryContext } from "@/ui/context";
import { TaskList } from "@/ui/query/task/TaskList";

type Props = {
  tasks: Task[];
};

export const ListDisplay: React.FC<Props> = ({ tasks }) => {
  const query = QueryContext.use();
  const trees = getTaskTree(tasks, query.sorting);

  return <TaskList trees={trees} />;
};

const getTaskTree = (tasks: Task[], sorting: SortingVariant[]): TaskTree[] => {
  const copy = [...tasks];
  sortTasks(copy, sorting);
  return buildTaskTree(copy);
};
