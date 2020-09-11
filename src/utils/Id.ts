import shortid from "shortid";

const Id = Object.freeze({
  generate: shortid.generate,
  isValid: shortid.isValid,
});

export default Id;
