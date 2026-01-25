module.exports = {
  id: "increase-something",
  handler: async ({ collection, item_id, field, amount }, { database }) => {
    // 1. Validate Input
    if (!collection || !item_id || !field) {
      throw new Error("Missing required parameters: collection, item_id, or field");
    }

    const incrementValue = Number(amount || 0);

    // 2. Bắt đầu Transaction để đảm bảo tính nhất quán
    await database.transaction(async (trx) => {
      // 3. Query lấy giá trị hiện tại và lock dòng (forUpdate)
      const item = await trx(collection)
        .select("id", field)
        .where("id", item_id)
        .first()
        .forUpdate();

      if (!item) {
        throw new Error(`Item with ID "${item_id}" not found in collection "${collection}"`);
      }

      const currentValue = Number(item[field] || 0);
      const newValue = currentValue + incrementValue;

      // 4. Cập nhật giá trị mới
      await trx(collection)
        .where("id", item_id)
        .update({
          [field]: newValue,
        });
    });

    return {
      success: true,
      collection,
      item_id,
      field,
      increased_by: incrementValue,
    };
  },
};
