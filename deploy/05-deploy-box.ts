import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { ethers } from "hardhat"

const deployBoxContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    //deploy
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    })
    //transfer ownership to timelock
    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContractAt("Box", box.address)
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
    await transferOwnerTx.wait(1)
    console.log("Box Contract ownership has been transferred to TimeLock")
    console.log("----------------BOX DEPLOYED-------------------")
}

export default deployBoxContract
