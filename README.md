# FDrive Backend

## Descrição

Este repositório contém o código fonte da parte do backend de uma aplicação de armazenamento de arquivos em nuvem, apelidada de "FDrive". As tecnologias utilizadas nesta aplicação incluem:

- [NestJS](https://github.com/nestjs/nest)
- [TypeORM](https://typeorm.io/#/)
- [SQLite](https://www.sqlite.org/index.html)
- [sqlite3](https://www.npmjs.com/package/sqlite3)

Apesar de ter utilizado o SQLite como banco de dados, o TypeORM facilita bastante o uso desta aplicação com outros bancos de dados. Neste caso, basta verificar a lista de suporte e ajustar o arquivo `src/db/config/ormconfig.ts` com as configurações necessárias para o banco de dados desejado e instalar o pacote do mesmo.

## Modelo do Banco de Dados

O banco de dados possui basicamente duas tabelas: uma de usuários e uma de arquivos. O relacionamento entre elas configura um "um para muitos", pois cada usuário pode ter vários arquivos, mas cada arquivo pertence somente a apenas um usuário.

<img src=".github/database_model.png" width="500" />

## Instalando os pacotes

```bash
$ npm install
```

## Executando a aplicação

```bash
# Modo desenvolvimento
$ npm run start

# Modo desenvolvimento com monitoramento
$ npm run start:dev

# Modo produção
$ npm run start:prod
```

A aplicação está configurada para rodar na porta 3000. Caso deseje utilizar uma porta diferente, basta alterar o valor da variável `PORT` no arquivo `main.ts`.
