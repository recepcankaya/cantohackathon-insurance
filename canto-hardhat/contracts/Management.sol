// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

contract Management {
    address public immutable insuranceContract;

    struct ClientClaimToken {
        address client;
        uint256 amount;
        bool isActive;
    }

    modifier onlyContract() {
        require(msg.sender == insuranceContract);
        _;
    }

    constructor() {
        insuranceContract = 0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3;
    }

    /// @notice Using this function, client can take the insurance
    /// @dev This function interact with insurance contract and take the client's info
    /// Then, checks whether the info is correct with whomever sending this message
    /// Finally, gives the client the amount of token s/he insures
    function claimToken(uint256 _amount) public payable {
        bytes4 selector = bytes4(keccak256(bytes("getClient(address)")));
        bytes memory data = abi.encodeWithSelector(selector, msg.sender);
        (bool success, bytes memory result) = insuranceContract.staticcall(
            data
        );
        require(success, "Calling failed");
        (address clientAddress, uint256 amount, , bool isActive) = abi.decode(
            result,
            (address, uint256, uint256, bool)
        );
        ClientClaimToken memory client = ClientClaimToken(
            clientAddress,
            amount,
            isActive
        );
        require(client.isActive == true, "You do not have insurance!");
        require(msg.sender == client.client, "You are not a client!");
        require(_amount == client.amount, "You claimed wrong!");
        require(getBalance() > msg.value, "Contract balance is insufficient");
        uint256 amountWithDecimals = _amount * 10 ** 18;
        (bool ok, ) = msg.sender.call{value: amountWithDecimals}("");
        require(ok, "Could not send!");
    }

    /// @notice Returns the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable onlyContract {}
}
