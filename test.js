const {
    deepEqUAL,
    ok,
    deepStrictEqual
    } = require('assert');

    const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id:1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Lanterna Verde",
    poder: "Energia do Anel",
    id: 1
}

describe('Suite de manipulação de Herois', async () => {
    // before(async () => {
    //     if(!await database.listar(DEFAULT_ITEM_CADASTRAR.id) !== '') {
    //         await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    //         await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
        
    //     }
    // })


    it('Deve pesquisar um heroi usando arquivos',async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        
        deepStrictEqual(resultado, expected)
    })
        it('Deve cadastar um heroi, usando arquivos', async () => {
        const expected = {
            ...DEFAULT_ITEM_CADASTRAR,
            id: 2,
            nome: "Batman"
        }
        
        const resultado = await database.cadastrar(expected)
        const [actual] = await database.listar(expected.id)
        console.log(expected)
            deepStrictEqual(actual, expected)
        })

        it.only('Deve remover um heroi por id', async () => {
            const expected = true;
            const resultado = await database.remover("1")

            deepStrictEqual(resultado, expected)

        })

        it('Deve atualizar um heroi pelo id', async () => {
            const expected = {
                ...DEFAULT_ITEM_ATUALIZAR,
            }
            const novoDado = {
                nome: 'Batman',
                poder: 'Ser foda'
            }
            await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
            const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
            deepStrictEqual(resultado, expected)
        })
    })