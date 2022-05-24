import Sequelize from "sequelize";

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

    connect = async () => {
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

    close = async () => {
        try{
            await this.sequelize.close();
            this.isConnected = false;
        }catch (err) {
            console.log("Connection Status: ", this.isConnected, err)
        }
    };
}