import { Injectable, Scope } from '@nestjs/common';
import { ConteudoModel } from '../conteudo.model';

export interface ConteudoState {
    get(id: number): ConteudoModel | null;
    list(): ConteudoModel[];
    insert(element: ConteudoModel): void;
    delete(element: ConteudoModel): void;
}

@Injectable({ scope: Scope.DEFAULT })
export class StateService implements ConteudoState {
    private readonly elements: ConteudoModel[] = [];

    get(id: number): ConteudoModel | null {
        const result = this.elements.filter(e => e.id == id)[0];

        if (result != null) {
            result.watched = true;
        }

        return result;
    }

    list(): ConteudoModel[] {
        return this.elements;
    }

    insert(element: ConteudoModel): void {
        if (element == null) {
            throw "O element não pode ser null";
        }

        if (this.elements.filter(e => e.id == element.id).length > 0) {
            throw "O elemento já está cadastrado";
        }

        this.elements.push(element);
    }

    delete(element: ConteudoModel): void {
        if (element == null) {
            throw "O element não pode ser null";
        }

        const elementIndex = this.findIndex(element);
        if (elementIndex >= 0) {
            this.elements.splice(elementIndex);
        }
    }

    private findIndex(element: ConteudoModel): number {
        return this.elements.findIndex(e => e == element);
    }

}
