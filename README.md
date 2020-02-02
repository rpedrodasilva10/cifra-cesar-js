<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rpedrodasilva10/cifra-cesar-js?color=%2304D361">
   <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/rpedrodasilva10/cifra-cesar-js/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rpedrodasilva10/cifra-cesar-js?style=social">
  </a>
  </p>

<h1 align="center"> Criptografia de Júlio César</h1>

Segundo o <a href="https://pt.wikipedia.org/wiki/Criptografia">Wikipedia </a>, criptografia ou criptologia (em grego: kryptós, “escondido”, e gráphein, “escrita”) é o estudo e prática de princípios e técnicas para comunicação segura na presença de terceiros, chamados “adversários”. Mas geralmente, a criptografia refere-se à construção e análise de protocolos que impedem terceiros, ou o público, de lerem mensagens privadas. Muitos aspectos em segurança da informação, como confidencialidade, integridade de dados, autenticação e não-repúdio são centrais à criptografia moderna. Aplicações de criptografia incluem comércio eletrônico, cartões de pagamento baseados em chip, moedas digitais, senhas de computadores e comunicações militares. Das Criptografias mais curiosas na história da humanidade podemos citar a criptografia utilizada pelo grande líder militar romano Júlio César para comunicar com os seus generais. Essa criptografia se baseia na substituição da letra do alfabeto avançado um determinado número de casas. Por exemplo, considerando o número de casas = 3:

**Normal**: a ligeira raposa marrom saltou sobre o cachorro cansado

**Cifrado**: d oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr

## Regras

As mensagens serão convertidas para minúsculas tanto para a criptografia quanto para descriptografia.
No nosso caso os números e pontos serão mantidos, ou seja:

**Normal**: 1a.a

**Cifrado**: 1d.d

Escrever programa, em qualquer linguagem de programação, que faça uma requisição HTTP para a url abaixo:

```
https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=SEU_TOKEN
```

Para encontrar o seu token , acesse a plataforma Codenation, faça o login e a informação estará na tela, conforme no exemplo abaixo:

<img src="https://s3-us-west-1.amazonaws.com/codenation-cli/doc/images/token.png" teste>

O resultado da requisição vai ser um JSON conforme o exemplo:

```json
{
  "numero_casas": 10,
  "token": "token_do_usuario",
  "cifrado": "texto criptografado",
  "decifrado": "aqui vai o texto decifrado",
  "resumo_criptografico": "aqui vai o resumo"
}
```

O primeiro passo é você salvar o conteúdo do JSON em um arquivo com o nome answer.json, que irá usar no restante do desafio.

Você deve usar o número de casas para decifrar o texto e atualizar o arquivo JSON, no campo decifrado. O próximo passo é gerar um resumo criptográfico do texto decifrado usando o algoritmo sha1 e atualizar novamente o arquivo JSON. OBS: você pode usar qualquer biblioteca de criptografia da sua linguagem de programação favorita para gerar o resumo sha1 do texto decifrado.

Seu programa deve submeter o arquivo atualizado para correção via POST para a API:

```
https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=SEU_TOKEN
```

## OBS:

a API espera um arquivo sendo enviado como multipart/form-data, como se fosse enviado por um formulário HTML, com um campo do tipo file com o nome answer. Considere isso ao enviar o arquivo.

O resultado da submissão vai ser sua nota ou o erro correspondente. Você pode submeter quantas vezes achar necessário, mas a API não vai permitir mais de uma submissão por minuto.
