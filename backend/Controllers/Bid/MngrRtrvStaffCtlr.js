import { Prisma } from "@prisma/client";

export default class MngrRtrvStaffCtlr {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async retrieveStaff() {
        try {
            const accountId = parseInt(this.req.params.accountId); 

            const accountCount = await this.prisma.Accounts.count()
            
            const staff = await this.prisma.Bids.findMany({
                where: {
                    accountId: accountId,
                },
                include: {
                    account: true,
                },
            });

            // 200 OK.
            this.res.status(200).json({
                message: `there are currently ${accountCount} accounts present`,
                staff: staff,
            });
        } catch (err) {
            console.error(err);

            // 500 INTERNAL SERVER ERROR
            this.res.status(500).send({ message: "Internal Server Error." });
        }
    }
}
