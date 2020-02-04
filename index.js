const axios = require("axios");
const SHA1 = require("crypto-js/sha1");
const FormData = require("form-data");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.CODENATION_TOKEN;
const fileName = "./answer.json";

processChallenge(fileName, TOKEN);

async function processChallenge(fileName, TOKEN) {
  let json = await getChallengeContent(TOKEN);
  json = JSON.stringify(decryptJson(json), null, 2);

  saveFile(fileName, json);
  await sendAnswer(fileName, TOKEN);
}
async function getChallengeContent(token) {
  let response = await axios.get(
    `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`
  );

  return response.data;
}

function decryptJson(json) {
  const { cifrado, numero_casas } = json;

  const decrypted = decryptString(cifrado, numero_casas);
  // Gero resumo SHA1
  const resumo = SHA1(decrypted).toString();
  const newJson = {
    ...json,
    decifrado: decrypted,
    resumo_criptografico: resumo
  };
  return newJson;
}

function decryptString(string, step) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  return [...string.toLowerCase()]
    .map(char => {
      if (char === " " || char === "." || (char >= 0 && char <= 9)) return char;
      else {
        newCode = alphabet.indexOf(char) - step;

        // Caso o código esteja fora do range, gero rotação para obter o valor válido
        return alphabet[newCode < 0 ? newCode + 26 : newCode % 26];
      }
    })
    .join("");
}

function saveFile(fileName, data) {
  fs.writeFileSync(`./${fileName}`, data, "utf8");
}

async function sendAnswer(fileName, token) {
  const form = new FormData();
  const file = fs.readFileSync(fileName, "utf8");

  form.append("answer", file, (type = "file"));

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

  fs.unlinkSync(fileName);
  saveFile("output.json", JSON.stringify(resp.data, null, 2));
}
