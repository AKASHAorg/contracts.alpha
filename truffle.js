const TestRPC = require("ethereumjs-testrpc");

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*",
            provider: TestRPC.provider(
              {"accounts": [{"balance": "0x1000000000000000000", "secretKey": "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200"}]}
              )
        }
    }
};
