import {ApiKey} from "../db_models/apikey";
import {AnyJSON} from "./cinema_repo";
import crypto from "crypto"
import {Op} from "sequelize";

class ApiKeyRepo{

    async create_key(domain_data: AnyJSON): Promise<ApiKey>{
        try{
            return await ApiKey.create({
                domain: domain_data['domain'],
                secret: this.generateKey(25),
                public: this.generateKey(20),
            }, {fields: ['domain',"public", "secret"]});
        }catch (err: any) {
            throw new Error(err.toString());
        }
    }

    async checkIfKeyExist(domain: string, token: string): Promise<boolean>{
        try{
            const api = await ApiKey.findOne({
                where: {
                    domain: {
                        [Op.iLike]: `%${domain}%`
                    },
                    public: token,
                },
            });
            return api !== null;
        }catch(err: any) {
            throw new Error(err.toString());
        }
    }

    async get_credentials(domain: string): Promise<ApiKey | null> {
        try{
            return await ApiKey.findOne({
                where: {
                    domain: domain
                },
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    async get_credentials_id(id: number): Promise<ApiKey | null> {
        try{
            return await ApiKey.findByPk(id);
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    generateKey(limit: number): string {
        return crypto.randomBytes(limit).toString('hex');
    }

    async delete_key(key_id: number){
        try{
            return await ApiKey.destroy({
                where: {
                    id: key_id
                }
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

    async update_key(key_id: number, update_data: AnyJSON){
        try{
            return await ApiKey.update(update_data,{
                where: {
                    id: key_id
                },
                fields: ["domain", 'secret', "public"]
            });
        } catch(err: any){
            throw new Error(err.toString());
        }
    }

}

export const apiKeyRepo = new ApiKeyRepo();