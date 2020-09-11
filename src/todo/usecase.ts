import Id from "../utils/Id";
import buildTodoEntity, { TodoBody, Todo } from "./entity";

const TodoEntity = buildTodoEntity({
  Id,
});

export interface TodoRepo {
  insert: (todo: Todo) => Promise<Todo>;
  findAll: () => void;
  findById: () => void;
}

function buildTodoUCase({ todoRepo }: { todoRepo: TodoRepo }) {
  async function addTodo(body: TodoBody) {
    const todo = TodoEntity.create(body);

    return todoRepo.insert(todo);
  }

  // async function getTodoById(id: string) {
  //   return todoRepo.findById(id);
  // }

  // async function getAllTodo() {
  //   return todoRepo.findAll();
  // }

  return Object.freeze({
    addTodo,
    // getTodoById,
    // getAllTodo,
  });
}

export default buildTodoUCase;
