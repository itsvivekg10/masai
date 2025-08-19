const cron = require("node-cron");
const { redisClient } = require("./redis");
const { getBooks, setBooks, nextId } = require("../models/db");
const { keyBooksCache, keyBulkList, BULK_USERS_SET } = require("../utils/keys");

function initCron() {
  cron.schedule("*/2 * * * *", async () => {
    console.log("⏲️  Cron: processing bulk books...");
    const userIds = await redisClient.sMembers(BULK_USERS_SET);
    for (const uid of userIds) {
      const userId = Number(uid);
      const listKey = keyBulkList(userId);
      let processed = false;

      while (true) {
        const payload = await redisClient.lPop(listKey);
        if (!payload) break;

        processed = true;
        let booksArr = [];
        try {
          booksArr = JSON.parse(payload);
        } catch {
          continue;
        }

        const current = getBooks(userId);
        for (const b of booksArr) {
          current.push({ id: nextId(userId), ...b });
        }
        setBooks(userId, current);
      }

      if (processed) {
        await redisClient.del(keyBooksCache(userId));
      }

      const remaining = await redisClient.lLen(listKey);
      if (remaining === 0) await redisClient.sRem(BULK_USERS_SET, uid);
    }
    console.log("⏲️  Cron finished");
  });
}

module.exports = { initCron };
