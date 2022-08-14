exports.searchTag = async (searchQuery) => {
  const formattedExpression = `^${searchQuery}`;
  const tag = await Tag.findOne({
    name: { $regex: formattedExpression, $options: "i" },
  });

  return tag;
};
