//Tworzymy sobie taki sam interfejs z jedną zmianą id bo nie będzie ono wymagane przy tworzeniu (stworzymy sami automatycznie)
export interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

//Tworzymy interfejs który będzie definiował jakie dane odsyłamy do użytkownika żeby nie wysyłać za dużo danych!!!!
export interface SimpleAdEntity{
    id: string;
    lat: number;
    lon: number;
}

//To pełny interfejs który czerpie właściwości z SimpleAdEntity i dodaje dodatkowe
export interface AdEntity extends SimpleAdEntity{
    name: string;
    description: string;
    price: number;
    url: string;
}