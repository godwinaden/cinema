import { Sequelize } from "sequelize";

class SqliteDB{
    isConnected: boolean = false;
    sequelize: any;

    constructor(){
        this.connect().then((_) => {
            console.log("Connection Status: ", this.isConnected)
        }).catch((err) => {
            console.log("Connection Status: ", this.isConnected, err)
        });
    }

    private connect = async () => {
        try {
            this.sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: './cinema.sqlite'
            });
            await this.sequelize.authenticate();
            this.isConnected = true;
        } catch(err){
            console.log("Connection Status: ", this.isConnected, err)
        }
    };

    create_tables = async () => {
        try {
            await this.sequelize.sync();
        }catch (err) {
            console.log("Connection Status: ", this.isConnected, err)
        }
    };

    drop_tables = async () => {
        try {
            await this.sequelize.drop();
            console.log("All tables dropped!");
        }catch (err) {
            console.log("Connection Status: ", this.isConnected, err)
        }
    };

    close = async () => {
        try{
            await this.sequelize.close();
            this.isConnected = false;
        }catch (err) {
            this.handle_error(err);
        }
    };

    private handle_error = (err: any) => console.log("Connection Status: ", this.isConnected, err);
}

export const db = new SqliteDB();
export const sequelize = db.sequelize;