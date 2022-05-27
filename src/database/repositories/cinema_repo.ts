// creating a custom type for any json object
import {Cinema, Show} from "../db_models/cinema";
import {Movie} from "../db_models/movie";

export type AnyJSON = {
    [key: string]: | string
        | number
        | boolean
        | { [key: string]: AnyJSON }
        | Array<AnyJSON>;
}

class CinemaRepo{

    async create_cinema(cinema_data: AnyJSON): Promise<Cinema>{
        try{
            return await Cinema.create({
                brand_name: cinema_data['brand_name'],
                country: cinema_data['country'],
                city: cinema_data['city']
            }, {fields: ['brand_name', 'country', 'city']});
        }catch (err: any) {
            throw new Error(err.toString());
        }
    }

    async get_cinemas_with_shows(limit: number, offset: number): Promise<Cinema[]> {
        try{
            return await Cinema.findAll({
                where: {
                    status: true
                },
                include: { all: true, nested: true },
                order: [
                    ['createdAt', 'DESC'],
                    [Show, Movie, 'createdAt', 'DESC'],
                ],
                offset: offset, limit: limit
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    async get_cinema_with_shows(cinema_id: number){
        try{
            return await Cinema.findOne({
                where: {
                    id: cinema_id,
                    status: true
                },
                include: { all: true, nested: true },
                order: [
                    ['createdAt', 'DESC'],
                    [Show, Movie, 'createdAt', 'DESC'],
                ],
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    async delete_cinema(cinema_id: number){
        try{
            return await Cinema.destroy({
                where: {
                    id: cinema_id
                }
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    async update_cinema(cinema_id: number, update_data: AnyJSON){
        try{
            return await Cinema.update(update_data,{
                where: {
                    id: cinema_id
                },
                fields: ["country", 'city', "brand_name"]
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    async rate_cinema(cinema_id: number, rate: number){
        try{
            return await Cinema.increment({votes: rate, voters: 1}, { where: { id: cinema_id } });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }
}

export const cinemaRepo = new CinemaRepo();