const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
    Commander
    .version('v1')
    // Options para parametros de manipulação
    .option('-n, --nome [value]', "Nome do heroi")
    .option('-p, --poder [value]', "Poder do heroi")
    .option('-i, --id [value]', 'Id do usuario')
    // Options para usuarios
    .option('-c, --cadastrar', "Cadastrar heroi")
    .option('-l, --listar', 'Listar usuarios por ID')
    .option('-lA, --listarAll', 'Listar todos usuarios')
    .option('-d, --delete', 'Deletar usuario por id')
    .option('-up, --update', 'Atualizar usuario por id')

    .parse(process.argv)

    const heroi = new Heroi(Commander)
    try {
        if(Commander.cadastrar) {
            console.log(heroi, 'herois')

                if(heroi.id == undefined || heroi.nome == undefined || heroi.poder == undefined) {
                    console.error('Faltam parametros')
                    return;
                }                        
                const resultado = await Database.cadastrar(heroi)
                console.log('Cadastrado com sucesso')
        }

        if(Commander.listar) {
            const expression = await Database.listar(heroi.id);
            const resultado = expression[0] != undefined ? expression : 'Esse heroi não existe';
            console.log( resultado )
        }

        if(Commander.listarAll) {
            const expressionAll = await Database.listar();
            console.log(expressionAll)
        }

        if(Commander.delete) {
            id = parseInt(heroi.id)
            const expression = await Database.remover(id);
        }

        if(Commander.update) {
            const [Last] = await Database.listar(heroi.id)
            if(!Last) return console.log('Não existe')
            const newData = {
                id: heroi.id,
                nome: heroi.nome || Last.nome,
                poder: heroi.poder || Last.poder
            } 
            const resultado = Database.atualizar(heroi.id, newData)
            if(!resultado) return console.error('Deu errado');
            return console.log('Atualizado com sucesso')            
        
        }

    }
    catch(error) {
        console.error('ERRO ENCONTRADO: ', error)
    }
}

main();