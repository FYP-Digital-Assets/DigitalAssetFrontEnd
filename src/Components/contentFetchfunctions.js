import Web3 from "web3";
/**
 * get all content addresses of user 
 * @param address it is ethereum address of user 
 * @returns array of content addresses
 */
async function getContentFromContracts(address) {
    const web3 = new Web3(window.ethereum);
    const dAsset = JSON.parse(localStorage.getItem("Digital_Asset"))
    const contract = new web3.eth.Contract(dAsset.abi, dAsset.address);
    const result = await contract.methods.getContents(address).call()
    return result;
}
/**
 * read details of content from smart contract
 * @param contentAddress it is address of content contract
 * @param senderAddress it is address of user ethereum account
 * @returns object of details where cid is content ref, price is array [sp, lp, vf] and, licensors and owners is array
 */
async function getContentDetailsFromContracts(contentAddress, senderAddress) {
    const web3 = new Web3(window.ethereum);
    const asset = JSON.parse(localStorage.getItem("Asset"))
    const contract = new web3.eth.Contract(asset.abi, contentAddress);
    const cid = await contract.methods.getContent().call({ from: senderAddress })
    const prices = await contract.methods.getPrices().call()
    const licensors = await contract.methods.getLicensorHistory().call()
    const owners = await contract.methods.getOwnerHistory().call()
    return { cid, prices, licensors, owners }
}
/**
 * search content from db
 * @param searchTerm is any string
 */
const search = async (searchTerm) => {
    const condition = { title: { $regex: new RegExp(searchTerm, 'i') } }
    const result = await fetch("http://localhost:4000/content",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ condition })
        }
    )
    return result;
}