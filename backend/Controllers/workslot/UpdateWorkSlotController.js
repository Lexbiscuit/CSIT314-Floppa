import { Prisma } from "@prisma/client";

export default class UpdateWorkslotController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async update(workslotId, date, time, rolesAvalible) {
        try {
            const updateWorkslot = await this.prisma.Workslots.update({
                where: {
                    workslotId: Number(workslotId),
                },
                data: {
                    date: date,
                    time: time,
                    //rolesAvalible: rolesAvalible,     *Need to check on this
                },
            });

            // 200 OK
            this.res.status(200).send("Workslot updated successfuly.");
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025")
                    this.res.status(500).send("Record to update not found.");
            } else {
                // 500 INTERNAL SERVER ERROR
                this.res.status(500).send("Internal Server Error.");
            }
        }
    }
}
