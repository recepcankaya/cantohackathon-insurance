// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

contract Management {
    address public immutable insuranceContract;

    struct ClientClaimToken {
        address client;
        uint256 amount;
        bool isActive;
    }
    
    modifier onlyContract {
        require(msg.sender == insuranceContract);
        _;
    }

    constructor() {
        insuranceContract = 0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005;
    }

    function claimToken(uint256 _amount) public payable {
        bytes4 selector = bytes4(keccak256(bytes("getClient(address)")));
        bytes memory data = abi.encodeWithSelector(selector, msg.sender);
        (bool success, bytes memory result) = insuranceContract.staticcall(data);
        require(success, "Calling failed");
        (address clientAddress, uint256 amount,, bool isActive) = abi.decode(result, (address, uint256, uint256,bool));
        ClientClaimToken memory client = ClientClaimToken(clientAddress, amount, isActive);
        require(client.isActive == true, "You do not have insurance!");
        require(msg.sender == client.client, "You do not have any insurance");
        require(_amount == client.amount, "You claimed too much.");
        require(getBalance() > msg.value, "Contract balance is insufficient");
        (bool ok, ) = msg.sender.call{value: _amount}("");
        require(ok);
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable onlyContract {}
}