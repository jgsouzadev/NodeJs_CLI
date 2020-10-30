const {
    readFile,
    writeFile,
} = require('fs')

const {promisify} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

   async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now();
    
    const heroiComId = {
        id,
        ...heroi
    }

    
    const dadosFinal = [
        ...dados,
        heroiComId
    ]

    const resultado = await this.escreverArquivo(dadosFinal)
    
    return resultado, 'sucess?';
    
    }


    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true))
        return dadosFiltrados;
    }

    async remover(id) {
        if(!id) {
            return await this.escreverArquivo([]);
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        
        if(indice === -1) {{
            throw Error('Não existente.');
        }}

        dados.splice(indice, 1)
        if(await this.escreverArquivo(dados)) {
            console.log('Sucesso ao remover')
            return;
        }
        

    }

    async atualizar(id, modificacao) {
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if(indice === -1) {
            throw Error('Heroi inexistente :)');
        }
        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacao
        }
        dados.splice(indice, 1)
        
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }

}

module.exports = new Database();