const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previoushash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previoushash
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, '01/07/2017', 'Genesis block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }

    return true
  }
}

let savejeeCoin = new Blockchain()
savejeeCoin.addBlock(new Block(1, '10/07/2017', { amount: 4 }))
savejeeCoin.addBlock(new Block(2, '12/07/2017', { amount: 10 }))


console.log('isValid ' + savejeeCoin.isChainValid())

// savejeeCoin.chain[1].data = { amount:100 }
savejeeCoin.chain[1].hash = savejeeCoin.chain[1].calculateHash()

console.log('isValid ' + savejeeCoin.isChainValid())

// console.log(JSON.stringify(savejeeCoin, null, 4))