import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import Bids from "../../Entity/Bids.mjs";
import jwt from "jsonwebtoken";



export default class StffRtrvBidsRsltCtlr {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async retrieveResults() {
        try {
            const bids = new Bids(this.prisma);
            const token = this.req.headers["x-access-token"];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //For testing purpose:(change 'name' value as per your db data)
            // const token = jwt.sign({name: "Constantin Hacaud", password: "password"}, "Floppa-Secret");
            // const decoded = jwt.verify(token, "Floppa-Secret");
            
            const response = await bids.retrieveResults(decoded);

            // 200 OK.
            this.res.status(200).json({
                bids: response,
            });
        } catch (message) {
            // 500 INTERNAL SERVER ERROR
            console.log(message);
            this.res.status(500).send({ message });
        }
    }
}
