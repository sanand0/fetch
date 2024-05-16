const { unstable_dev } = require("wrangler");

describe("Worker", () => {
  let worker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.js", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("/lta/BicycleParkingv2 returns valid JSON", async () => {
    const response = await worker.fetch("/lta/BicycleParkingv2?Lat=1.3&Long=103.8");
    if (response) {
      const r = await response.json();
      expect(r["odata.metadata"]).toBe("http://datamall2.mytransport.sg/ltaodataservice/$metadata#BicycleParkingv2");
      expect(r.value).toBeInstanceOf(Array);
    }
  });
});
