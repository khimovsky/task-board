export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  closedBy?: string;
  status: TaskStatuses;
}

export type TaskStatuses = 'new' | 'in-progress' | 'completed';
