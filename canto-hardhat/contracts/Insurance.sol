// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

/// @title Insurance contract for crypto users who want to protect their assets against in any case of thief, hack, etc...
/// @author Recep Çankaya

contract Insurance {
    mapping(address => bool) feer;
    address immutable owner;
    uint256 public numberOfClients;

    struct Client {
        address client;
        uint256 amount;
        uint256 endTime;
        bool isActive;
    }

    mapping(address => Client) public clients;
    address[] public clientArray;

    /// @notice Emitted when client pays the fee
    /// @param client The person who is willing to get insurance
    event FeePaid(address indexed client, uint256 indexed amount);

    /// @notice Emitted when client pays the price
    /// @param client The person who is willing to get insurance
    /// @param amount The amount of token that will be insured
    event InsurancePaid(address indexed client, uint256 indexed amount);

    /// @notice Emitted when client' s insurance ends
    /// @param client The person whose insurance has ended
    event InsuranceEnded(address indexed client);

    modifier amountCheck(uint256 amount) {
        require(amount > 0, "Amount have to be grater than zero");
        _;
    }

    modifier zeroAddressCheck() {
        require(msg.sender != address(0), "Address cannot be zero");
        _;
    }

    modifier onlyOwner {
        require(owner == msg.sender, "You are not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice To get insurance, client have to pay a small base fee
    /// @param amount The amount of token that will be insured
    /// @return fee The base fee will be paid
    function baseFee(uint256 amount) public view amountCheck(amount) returns (uint256 fee) {
        fee = (amount * 1) / 100;
        return fee;
    }

    /// @notice Client pays its base fee just one time
    /// @dev After client pays its fee, another base fee is not taken from this client
    /// @param amount The number of token that will be ensured   
    function getBaseFee(uint256 amount) public payable amountCheck(amount)
    zeroAddressCheck {
        require(feer[msg.sender] == false, "You paid your base fee.");
        uint256 fee = baseFee(amount);
        require(msg.value == fee, "You must pay whatever the fee is");
        feer[msg.sender] = true;
        emit FeePaid(msg.sender, amount);
    }

    /// @notice Calculates the amount of token that will be taken from client regularly
    /// @param amount The amount of token that will be insured
    /// @return insurance The insurance that will be taken from the client regularly
    function calculateInsurance(uint256 amount) public view amountCheck(amount) returns 
    (uint256 insurance) {
        insurance = (amount * 5) / 100;
        return insurance;
    }

    /// @notice Take the money from the client and start the time
    /// @param _amount The number of token that will be ensured
    function getInsurance(uint256 _amount) public payable amountCheck(_amount) zeroAddressCheck {
        require(feer[msg.sender] == true, "You have to pay fee first");
        uint256 insurance = calculateInsurance(_amount);
        require(insurance == msg.value, "You have to pay whatever the insurance is");
        Client memory newClient = Client(msg.sender, _amount, 0, true);
        clients[msg.sender] = newClient;
        newClient.endTime = block.timestamp + 30 seconds;
        clientArray.push(msg.sender);
        numberOfClients++;
        emit InsurancePaid(msg.sender, _amount);
    }

    /// @notice End the insurance for the client
    function endInsurance() public onlyOwner {
        uint256 i;
        while(i < numberOfClients) {
            address clientAddress = clientArray[i];
            Client storage client = clients[clientAddress];
            if(client.endTime > block.timestamp) {
                delete clients[clientAddress];
                emit InsuranceEnded(clientAddress);
            }
            i++;
        }
    }

    function getClient(address client) external view returns (Client memory) {
        return clients[client];
    }

    /// @notice Moves the funds to another contract to manage it
    /// @dev The reason why there is a need for another contract is that I do not want to take any arbitrarily token to the system.
    /// To prevent it, I did not add any receive or fallback functions. If the token is not moved to another contract, tokens are locked
    /// in this contract resulting an undesirable behavior. 
    /// See: https://github.com/crytic/slither/wiki/Detector-Documentation#contracts-that-lock-ether
    /// @param managementContract the contract adress that manages the payment transactions
    function withdrawTokensToContract(address managementContract) public payable onlyOwner {
        require(managementContract != address(0), "Address is zero");
        (bool success, ) = managementContract.call{value: address(this).balance}("");
        require(success);
    }
}
