import { Db } from "mongodb";
import { Todo } from "../entity";
import { TodoRepo } from "../usecase";

function buildTodoRepo({ db }: { db: Db }): TodoRepo {
  async function insert(todo: Todo) {
    const result = await db.collection("todo").insertOne({
      _id: todo.id,
      text: todo.text,
      done: todo.done,
    });
    const created = result.ops[0];

    return {
      id: created._id,
      text: created.text,
      done: created.done,
    } as Todo;
  }

  return Object.freeze({
    insert,
    findAll: () => {},
    findById: () => {},
  });
}

export default buildTodoRepo;
