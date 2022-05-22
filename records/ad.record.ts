import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

//Tworzymy lokalnie typ który otypuje zwracany przez nas pojedynczy rekord z bazy danych
type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;
    constructor(obj: NewAdEntity) {
        //walidacja
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków.')
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.');
        }

        //@TODO: Check if URL is valid

        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number'){
            throw new ValidationError('Nie można zlokalizować ogłoszenia.')
        }

        //jeżeli się wszystko zgadza to przypisujemy
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }
    //Funkcja zwracająca pojedynczy rekord

    static async getOne(id: string): Promise<AdRecord | null> {
        const [result] = await pool.execute("SELECT * FROM `ads` WHERE id=:id", {
            id: id,
        }) as AdRecordResults;

        return result.length === 0 ? null : new AdRecord(result[0]);
    }
    //Funkcja ta zwraca wszystkie ogłoszenia ale w okrojonej wersji dając tylko id oraz położenie (WZGLĘDY BEZPIECZEŃSTWA). Do tego korzystamy z przygotowanego innego interfejsu oraz mapujemy i zwracamy tylko to co chcemy zwrócić użytkownikowi.

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [result] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return result.map(result => {
            const {
                id, lat, lon,
            } = result;
            return {
                id, lat, lon,
            }
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }

        await pool.execute("INSERT INTO `ads` (`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)", this);
    }
}
