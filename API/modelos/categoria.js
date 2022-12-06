module.exports = class Categoria {
    constructor(categoria){
        this.id = categoria?.id
        this.nome = categoria?.nome
    }


    // metodos staticos
    static async apagarPorId(id){
        const listaCategorias = await this.lista()
        const listaNova = []
        for(let i=0; i<listaCategorias.length; i++){
            const categoriaDb = listaCategorias[i]
            if(categoriaDb.id.toString() !== id.toString()){
                listaNova.push(categoriaDb)
            }
        }

        Categoria.salvarJsonDisco(listaNova)
    }
    
    static async buscaPorId(id){
        const listaCategorias = await this.lista()
        for(let i=0; i<listaCategorias.length; i++){
            const categoriaDb = listaCategorias[i]
            if(categoriaDb.id.toString() === id.toString()){
                return categoriaDb
            }
        }

        return null
    }

    static async salvar(categoria){
        const listaCategorias = await this.lista()
        let exist = false
        for(let i=0; i<listaCategorias.length; i++){
            const categoriaDb = listaCategorias[i]
            if(categoriaDb.id.toString() === categoria.id.toString()){
                categoriaDb.nome = categoria?.nome
                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...categoria}
            listaCategorias.push(objectLiteral)
        }

        Categoria.salvarJsonDisco(listaCategorias)
    }

    static async salvarJsonDisco(categorias){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/categorias.json', JSON.stringify(categorias), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }

    static async lista(){
        let categorias = []
        const fs = require('fs');

        try {
            const jsonCategorias = await fs.readFileSync('db/categorias.json', 'utf8');
            categorias = JSON.parse(jsonCategorias)
        } catch (err) {
            console.error(err);
        }
        
        return categorias
    }

    static async getLast(){
        let categorias = []
        const fs = require('fs');

        try {
            const jsonCategorias = await fs.readFileSync('db/categorias.json', 'utf8');
            categorias = JSON.parse(jsonCategorias)
        } catch (err) {
            console.error(err);
        }
        
        return categorias.pop();
    }
}