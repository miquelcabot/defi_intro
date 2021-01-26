// Configure Web3
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/YOUR_API_KEY')
const account = 'YOUR_ACCOUNT'
web3.eth.accounts.wallet.add('YOUR_PRIVATE_KEY') // Never use your real wallet here!

const daiABI = require('./daiABI')

// Dai Token
const daiAddress = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735'
const daiContract = new web3.eth.Contract(daiABI, daiAddress)

run = async () => {
  let result

  // Check Ether balance
  result = await web3.eth.getBalance(account)
  result = web3.utils.fromWei(result, 'Ether')
  console.log("Ether Balance:", result.toString())

  // Check Dai balance
  result = await daiContract.methods.balanceOf(account).call()
  result = web3.utils.fromWei(result, 'Ether')
  console.log("Dai Balance:", result)

  // Trasnfer DAI
  let to = '0xe16E1456F3172fa5B3a2D7f49321601767d36DCA'
  let amount = web3.utils.toWei('1', 'Ether') // 1 DAI
  result = await daiContract.methods.transfer(to, amount).send({
    from: account,
    gasLimit: 6000000,
    gasPrice: web3.utils.toWei('50', 'Gwei')
  })
  console.log(`Successful tx: https://rinkeby.etherscan.io/tx/${result.transactionHash}`)

  // Check Ether balance
  result = await web3.eth.getBalance(account)
  result = web3.utils.fromWei(result, 'Ether')
  console.log("Ether Balance:", result.toString())

  // Check Dai balance
  result = await daiContract.methods.balanceOf(account).call()
  result = web3.utils.fromWei(result, 'Ether')
  console.log("Dai Balance:", result)

}
run()
