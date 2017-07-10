const TestRPC = require("ethereumjs-testrpc");

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*",
            provider: TestRPC.provider(
              {"accounts": [
                {"balance": "0x999000000000000000000", "secretKey": "0xf9dd21761a199c71054e14f5b827213223971c676928d9a1808cbfa4b7505203"},
                {"balance": "0x999000000000000000000", "secretKey": "0xf9dd21761a199c71054e14f5b827213223971c676928d9a1808cbfa4b7505204"}
                ]}
              )
        }
    }
};
