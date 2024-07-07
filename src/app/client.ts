import { Contrat } from "./contrat";

export interface Client {
    cpf: string;
    name: string;
    contrato: Contrat[] | string[];
    _id ?: string;
}
