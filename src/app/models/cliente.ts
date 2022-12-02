export interface Cliente {
    id: Number
    nome: String | undefined
    telefone: String  | undefined
    email: String | undefined
    cpf: String | undefined
    cep: String | undefined
    logradouro: String | undefined
    numero: Number | undefined
    bairro: String | undefined
    cidade: String | undefined
    estado: String | undefined
    complemento: String | undefined
    admin: boolean
}