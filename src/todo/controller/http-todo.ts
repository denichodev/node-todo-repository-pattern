import buildTodoEntity, { TodoBody, Todo } from "../entity";

interface HTTPReq {
  body: any;
}

interface TodoUCase {
  addTodo: (body: TodoBody) => Promise<Todo>;
  // getTodoById: () => void;
  // getAllTodo: () => void;
}

function buildHTTPTodoController({ todoUCase }: { todoUCase: TodoUCase }) {
  async function createTodo(httpReq: HTTPReq) {
    try {
      const text = httpReq.body.text;
      const data = await todoUCase.addTodo({
        text,
      });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { data },
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  }

  return {
    createTodo,
  };
}

export default buildHTTPTodoController;
