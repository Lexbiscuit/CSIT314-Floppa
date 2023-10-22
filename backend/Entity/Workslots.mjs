export class InvalidWorkslotError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidWorkslotError";
    }
}

export default class Workslots {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async createWorkslot(date, baristas_required, cashiers_required, chefs_required, waiters_required) {
        const response = await this.prisma.Workslots.create({
            data: {
                date: date,
                baristas_required: baristas_required,
                cashiers_required: cashiers_required,
                chefs_required: chefs_required,
                waiters_required: waiters_required,
            },
        });

        return response;
    }

    async retrieveWorkslot() {
        const response = await this.prisma.Workslots.findMany({
            orderBy: [
                {
                    workslotId: "asc",
                },
            ],
        });
        return response;
    }

    async updateWorkslot(workslotId, date, baristas_required, cashiers_required, chefs_required, waiters_required) {
        const response = await this.prisma.Workslots.update({
            where: {
                workslotId: Number(workslotId),
            },
            data: {
                date: date,
                chefs_required: chefs_required,
                waiters_required: waiters_required,
                cashiers_required: cashiers_required,
                baristas_required: baristas_required,
            },
        });
        return response;
    }

    async deleteWorkslot(workslotId) {
        const response = await this.prisma.Workslots.delete({
            where: {
                workslotId: Number(workslotId),
            },
        });
        return response;
    }

    async searchWorkslot(workslotId) {
        const response = await this.prisma.Workslots.findUnique({
            where: {
                workslotId: Number(workslotId),
            },
        });
        return response;
    }
}