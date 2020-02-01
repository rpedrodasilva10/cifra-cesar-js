const axios = require("axios");
const SHA1 = require("crypto-js/sha1");
const FormData = require("form-data");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.CODENATION_TOKEN;
const fileName = "./answer.json";

processChallenge(fileName, TOKEN);

//readFileAndDecrypt(fileName);
async function processChallenge(fileName, TOKEN) {
  await getAndSaveContent(TOKEN, fileName);
  readFileAndDecrypt(fileName);
  sendAnswer(fileName, TOKEN);
}
async function getAndSaveContent(token, fileName) {
  const response = await axios.get(
    `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`
  );

  saveFile(fileName, JSON.stringify(response.data));
}

function saveFile(fileName, data) {
  fs.writeFile(`./${fileName}`, data, err => {
    if (err) {
      return console.log(err);
    }
    console.log("File saved");
  });
}

function readFileAndDecrypt(fileName) {
  fs.readFile(fileName, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    const json = JSON.parse(jsonString);
    const { cifrado, numero_casas } = json;
    const decrypted = decryptString(cifrado, numero_casas);
    // Gero resumo SHA1
    const resumo = SHA1(decrypted).toString();
    const newJson = {
      ...json,
      decifrado: decrypted,
      resumo_criptografico: resumo
    };

    saveFile(fileName, JSON.stringify(newJson, null, 2));
  });
}

function decryptString(string, step) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  return [...string.toLowerCase()]
    .map(char => {
      if (char === " " || char === "." || (char >= 0 && char <= 9)) return char;
      else {
        newCode = alphabet.indexOf(char) - step;
        // Caso ultrapasse para menos, somo as possibilidades
        return alphabet[newCode < 0 ? newCode + 26 : newCode % 26];
      }
    })
    .join("");
}

async function sendAnswer(fileName, token) {
  const form = new FormData();
  const file = fs.createReadStream(fileName);

  form.append("answer", file);

  const resp = await axios.post(
    `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`,
    form,
    {
      headers: {
        ...form.getHeaders()
      }
    },
    err => console.log(err)
  );
  console.log(resp.data);
  saveFile("output.json", JSON.stringify(resp.data, null, 2));
}
