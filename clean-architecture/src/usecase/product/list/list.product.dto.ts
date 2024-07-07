export interface InputListProductDto {
}

interface OutputProductDto {
    id: string;
    name: string;
    price: number;
}

export type OutputListProductDto = OutputProductDto[];
