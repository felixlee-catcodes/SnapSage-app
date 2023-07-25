const { syncAndSeed } = require("./db");

const init = async () => {
  try {
    console.log("app ready");
    await syncAndSeed();
  } catch (er) {
    console.log(er);
  }
};
init();
