import mongoose from 'mongoose';
import config from "../../config/default";
import log from '../logger';

function connect(){
    const dbUrl = config.dbUrl as string;

    return mongoose
        .connect(dbUrl)
        .then(() => {
            log.info("Database connected.");
        })
        .catch((error) => {
            log.error("Database error", error);
            process.exit(1);
        });
}

export default connect;

