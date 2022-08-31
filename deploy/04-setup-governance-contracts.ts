import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { ADDRESS_ZERO } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const governor = await ethers.getContract("GovernorContract", deployer)
    const timeLock = await ethers.getContract("TimeLock", deployer)
    console.log("Setting up roles...")
    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()
    //assign roles
    const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
    await proposerTx.wait(1)
    const execxutorTx = await timeLock.grantRole(proposerRole, ADDRESS_ZERO)
    await execxutorTx.wait(1)
    //revoke admin role from deployer
    const revokeTx = await timeLock.grantRole(adminRole, deployer)
    await revokeTx.wait(1)
    console.log("----------------GOVERNANCE/ACCESS SET-------------------")
}

export default setupContracts
