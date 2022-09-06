// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MoviesToken is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint => bool) mintRecord;
    uint256 totalSupply;

    // struct Movies {
    //     string movie_title;
    //     string movie_uri; //
    // }

    constructor() ERC721("MoviesToken", "MTK") {}

    function mint(
        address to,
        string memory tokenURI,
        uint256 id
    ) public maxSupply returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        mintRecord[id] = true;
        return newItemId;
    }

    modifier maxSupply() {
        require(totalSupply <= 100, "total supply is 100");
        _;
        totalSupply += 1;
    }

    function getMintRecord(uint256 id) public view returns (bool) {
        return mintRecord[id];
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
}
