import { Kind, GraphQLScalarType } from 'graphql';

const parseDate = (value: mixed): ?Date => {
  const date = new Date(value);

  if (!date.toJSON()) {
    throw new TypeError(`Date cannot represent non value: ${value}`);
  }

  return date;
};

export default new GraphQLScalarType({
  name: 'Date',
  serialize: (value) => parseDate(value).toJSON(),
  parseValue: (value) => parseDate(value),
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.INT && ast.kind !== Kind.STRING) return null;

    const date = new Date(ast.value);

    return date.toJSON() ? date : null;
  },
});
