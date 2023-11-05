import Workslots from "../../Entity/Workslots.mjs";

export default class SearchWorkSlotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchWorkslot(workslotFilter) {
    try {
      const workslots = new Workslots(this.prisma);
      const response = workslots.searchWorkslot(workslotFilter);

      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
