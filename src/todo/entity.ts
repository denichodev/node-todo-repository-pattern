interface Id {
  generate: () => string;
  isValid: (id: string) => boolean;
}

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export interface TodoBody {
  text: string;
  done?: boolean;
}

function buildTodoEntity({ Id }: { Id: Id }) {
  function create({ text, done = false }: TodoBody): Todo {
    if (!text || text.length < 1) {
      throw new Error("Todo must have text");
    }

    return Object.freeze({
      id: Id.generate(),
      text,
      done,
    });
  }

  return Object.freeze({
    create,
  });
}

export default buildTodoEntity;
