import Workslots from "../../Entity/Workslots.mjs";

export default class SearchWorkSlotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchWorkslot(workslotFilter) {
    try {
      const workslot = new Workslots();
      const response = workslot.searchWorkslot(workslotFilter);

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: err });
    }
  }
}
