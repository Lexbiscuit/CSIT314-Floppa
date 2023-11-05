import Workslots from "../../Entity/Workslots.mjs";

export default class RetrieveWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveWorkslots() {
    try {
      const workslot = new Workslots(this.prisma);
      const response = await workslot.retrieveWorkslots();

      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
