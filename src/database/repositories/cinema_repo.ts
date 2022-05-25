

// creating a custom type for any json object
import {Cinema} from "../db_models/cinema";

export type AnyJSON = {
    [key: string]: | string
        | number
        | boolean
        | { [key: string]: AnyJSON }
        | Array<AnyJSON>;
}

class CinemaRepo{

    async create_cinema(cinema_data: AnyJSON): Promise<Cinema | Error>{
        try{
            return await Cinema.create({
                brand_name: cinema_data['brand_name'],
                country: cinema_data['country'],
                city: cinema_data['city']
            }, {fields: ['brand_name', 'country', 'city']});
        }catch (err: any) {
            return err;
        }
    }

    get_cinemas_with_shows(){

    }

    get_cinema_with_shows(cinema_id: string){}
}