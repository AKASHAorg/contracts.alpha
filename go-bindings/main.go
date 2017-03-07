package main

import (
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/accounts/abi/bind/backends"
	"github.com/ethereum/go-ethereum/core"
	"github.com/ethereum/go-ethereum/crypto"
)

func main() {
	// Generate a new random account and a funded simulator
	key, _ := crypto.GenerateKey()
	auth := bind.NewKeyedTransactor(key)

	sim := backends.NewSimulatedBackend(core.GenesisAccount{Address: auth.From, Balance: big.NewInt(10000000000)})

	// Deploy a base module
	address, transaction, baseModule, err := DeployBaseModule(auth, sim)
	fmt.Println("address:", address);
	fmt.Println("transaction:", transaction);
	fmt.Println("baseModule:", baseModule)
	if err != nil {
		log.Fatalf("Failed to deploy new contract: %v", err)
	}
	sim.Commit()
}