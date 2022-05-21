//Tworzymy sobie taki sam interfejs z jedną zmianą id bo nie będzie ono wymagane przy tworzeniu (stworzymy sami automatycznie)
export interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export interface AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;
}