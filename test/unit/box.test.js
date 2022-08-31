const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

//development chains
//get acccounts
//deploy contract
//get contract
//test each function
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Box Unit Tests", function () {
          let box, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["box"])
              box = await ethers.getContract("Box", deployer)
          })

          describe("Construtor", () => {
              it("Does nothing yet", async () => {
                  console.log(`Box Contract Addr ${box.address}`)
              })
          })
      })
