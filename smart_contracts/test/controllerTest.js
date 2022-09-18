const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const trade_data = require("../test/api_calls/bull13.json"); //this is the part where you pass the opensea api result
const seaport_abi = require("../test/abis/seaport.json");
const { ethers } = require("hardhat");

describe("Buy listing", function () {
  describe("Deployment", async function () {
    it("Should send encoded data to seaport via controller", async function () {
      // we have the owner of the contract and a non-owner, retail entity.
      const [owner, nonDeployer,recipient] = await ethers.getSigners();
      const Controller = await ethers.getContractFactory("Controller");
      // the `router` contract. 
      //const controller = await Controller.deploy();
      const controller = await Controller.attach(process.env.ROUTER_ADDRESS);

      // let tx = await controller.deposit({value:ethers.utils.parseEther("0.05")});
      // await tx.wait();
      console.log("Contract at: ", controller.address, "with funds: ", await ethers.provider.getBalance(controller.address));

      console.log("Deployer:", owner.address);
      console.log("Buyer:", nonDeployer.address);
      console.log("Recipient:", recipient.address);

      await controller.connect(nonDeployer)

      // interface we pack for
      const seaportInterface = new ethers.utils.Interface(seaport_abi)
      const additionalRecipients = trade_data["orders"][0]["protocol_data"]["parameters"]["consideration"].slice(1);

      // extracting the tuple part
      const parsedAdditionalRecipents = [additionalRecipients[0]["startAmount"],additionalRecipients[0]["recipient"]]

      // entire data packing
      const data = [
        trade_data["orders"][0]["protocol_data"]["parameters"][
          "consideration"
        ][0]["token"],
        trade_data["orders"][0]["protocol_data"]["parameters"][
          "consideration"
        ][0]["identifierOrCriteria"],
        trade_data["orders"][0]["protocol_data"]["parameters"][
          "consideration"
        ][0]["startAmount"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["offerer"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["zone"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["offer"][0][
          "token"
        ],
        trade_data["orders"][0]["protocol_data"]["parameters"]["offer"][0][
          "identifierOrCriteria"
        ],
        trade_data["orders"][0]["protocol_data"]["parameters"]["offer"][0][
          "startAmount"
        ],
        trade_data["orders"][0]["protocol_data"]["parameters"]["orderType"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["startTime"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["endTime"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["zoneHash"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["salt"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["conduitKey"],
        trade_data["orders"][0]["protocol_data"]["parameters"]["conduitKey"],
        trade_data["orders"][0]["protocol_data"]["parameters"][
          "totalOriginalConsiderationItems"
        ] - 1,
        [parsedAdditionalRecipents],
        trade_data["orders"][0]["protocol_data"]["signature"],
      ];
      // encoding the data for call prep
      const encodedOrderData = seaportInterface.encodeFunctionData(
        "fulfillBasicOrder",
        [ data ]
      );
      console.log(encodedOrderData);
      // padding for address 
      const pad = "000000000000000000000000";
      const to = recipient.address.toString().slice(2);
      const padded = "0x" + pad + to;

      // filling order via controller contract
      const fuji_domain = 43113;
      let orderResult = await controller.handle(fuji_domain, padded, encodedOrderData, {gasLimit: 500000});
      let receipt = await orderResult.wait();

    });
  });
});
