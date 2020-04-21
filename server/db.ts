import { connect, connection, connections } from"mongoose";
import { DB_URL } from "./config";


export default function() {
    connect(DB_URL, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch((err: Error) => console.log(err));

    connection.on("open", (): void => {
        const info = connections[0];
        console.log(`Connected to:
     host: ${info.host},
     port: ${info.port},
     name: ${info.name}`
        )
    });
};
