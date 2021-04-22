require("./index");
const axios = require("axios");

async function go() {
  try {
    await axios("https://google.com")
  
    await axios({
      url: "https://example.com?yes=true",
      method: "post",
      data: "hello",
    });
  
    await axios({
      url: "https://example.com",
      method: "delete",
      data: "hello",
    });
  
    await axios({
      url: "https://example.com",
      method: "put",
      data: "hello",
    });
  
  } catch (error) {
    throw error;
  }
  
}

go()