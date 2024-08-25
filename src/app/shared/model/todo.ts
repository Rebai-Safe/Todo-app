export interface Todo {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  state: "Todo" | "InProgress" | "Done" | "Cancelled";
}


export interface TodoState {
  todos: Todo[];

}

export const initialState: TodoState = {
  todos: [],
};

function loadStateFromLocalStorage(): Todo[] {
  const savedState = localStorage.getItem("tasks");
  if (savedState != null) {
    return JSON.parse(savedState);
  }
  return [];
}
