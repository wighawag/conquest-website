---
title: Ethereum, The Concept of Gas and its Dangers
date: 2020-02-28
mediumLink: https://medium.com/@wighawag/ethereum-the-concept-of-gas-and-its-dangers-28d0eb809bb2
# image: Sacred_Chao_2.jpg
# caption: Wikipedia
# captionlabel: Source:
# captionlink: https://en.wikipedia.org/wiki/File:Sacred_Chao_2.jpg
---

<script lang="ts">
  import {base} from '$app/paths';
</script>
<div class="mb-3">
  <figure class="text-center mx-auto mb-4">
    <img alt="Photo by Jules D. on Unsplash" class="mx-auto" style="width: 100%;max-width: 600px;" src={`${base}/images/blog/gas-1000.jpg`} />
    <figcaption style="margin-top: -1; font-size:0.7em;">Photo by Jules D. on Unsplash</figcaption>
  </figure>
</div>
Hi, I am back with an article on Ethereum. We'll explore the concept of gas and explain how it behaves and show what its sometimes, subtle behaviour actually implies.

It turns out that almost every Smart Contract Accounts and Meta Transaction implementations so far fail to consider the specific rules of gas when calling other contracts and are thus **vulnerable to malicious relayers**.

To make matter worse, with the addition of "try/catch" in solidity 0.6, it is now even easier to expose contracts to a type of attack that share similarity to the infamous **Call Depth Attack** and seems to have never been discussed before nor been listed in attack vector listing like [the Smart Contract Weakness Registry](https://swcregistry.io).

Indeed, the Ethereum community is yet to be fully aware of some of the pitfalls associated with Ethereum's gas behaviour.

I hope this article will help shade some light on a core aspect of Ethereum smart contract development and hopefully help improve the situation.

If you are short on time, the crux of the article is that the current ethereum gas behaviour, including how gas is given to other contract via the various CALL\* opcodes is not intuitive and can cause security issues in some situation, like meta-transactions. Plus contracts calling other contracts cannot be sure that the contracts they call reverted because of a lack of gas or simply because they intentionally reverted, not unlike the infamous "call depth attack".

Let's start with the basics. If you are already familiar with gas on ethereum you can skip to <a href="javascript:;" onclick="document.location.hash='2-gas-and-contracts-calls';">2. Gas And Contracts Calls</a>.

## 1. What Is Gas?

In a nutshell, gas is the measure of the computational resources used by the operations performed on the Ethereum network (including storage of data, temporary memory manipulation and operation like multiplication, hashing, etc...).

When a user submit a transaction on the Ethereum network, it needs to pay for the sum of all the operations its transaction performs so that it rewards the miner/validator that performs the operation and makes it prohibitively expensive to make a denial of service attack on the network. For a basic Ethereum transfer it costs for example 21,000 gas, but more complex operations can cost millions of gas.

Since Ethereum is [Turing complete](https://en.wikipedia.org/wiki/Turing_completeness) (it can perform any kind of computation given infinite resources but exhibit the [halting problem](https://en.wikipedia.org/wiki/Halting_problem)), the miners/validators (those that decide what transactions are included on the Ethereum network) can't know the total cost of operations of the transaction without executing it first (in which case they would need to be rewarded for it, else the abuse would be trivial). The user (transaction's signer) need to set a gas value representing the maximum gas they expect their transaction to use, this is usually called the transaction's `gasLimit` (though it is sometime called `startGas` or simply `gas`).

If it turns out that the transaction being executed actually consumes more gas than specified by the `gasLimit`, the transaction's operations are nullified (we usually refers to it as a `revert` or `throw` (when all gas of `gasLimit` is consumed, like here) and the node has to revert the state's changes to ensure the transaction has no effects. If that happen, the transaction is still recorded and rewards the miner that included it, reducing the balance of the transaction's sender accordingly.

### Gas Has A Price

Now, the miners/validators do not get rewarded in gas unit, but in Ether (ETH), Ethereum native currency. Indeed, the gas value is only an abstract measure of the cost. It can only be paid directly in ETH. As such when users submit transactions, they also set a `gasPrice` they are willing to pay (per gas unit used) to get their transactions included. And so users, cannot emit transactions on the Ethereum network without owning some ETH, unless the `gasPrice` they set is zero (in which case miners would not be incentivised to include the transaction).

It is worth noting that there are various efforts going on to solve this and allow users without ETH to interact with Ethereum through what is called "Meta Transactions". It turns out, as we shall see later, that such solutions have potential issues with the behaviour of gas.

When transactions are included on the network, they are included in batches, called blocks. And to ensure that most modern computer can handle the network (so that the network remain decentralised and not just in the trust of powerful computers), there is a limit of the amount of gas that can be used in a block. This, in turn, limits the number of transactions in a block.

As such, users compete for the inclusion of their transaction and so the average price of the gas on Ethereum is set by the market: users compete for transaction inclusion and miners/validators pick the one that give more reward first (higher `gasPrice`).

### Gas Refund

While the cost in ETH of a transaction is computed as follow

```
transaction cost = gasUsed * gasPrice
```

It is slightly more complicated than you might think.

Indeed, certain operations actually give a refund and that refund is only deduced **after** the transaction is done. This means that the `gasUsed` can actually be smaller than the `gasLimit` required to be given for the transaction to succeed. A more accurate equation is thus as follow:

```
transaction cost = (gasRequired - gasRefund) * gasPrice
```

where `gasRequired` is the minimum gas value that was required to be provided via `gasLimit` in order for the transaction to succeed (and not run out of gas) and `gasRefund` is the total amount of refund given as part of the execution of that transaction. An example of operation that gives a refund is operation that reset storage to zero values. This is to encourage contract developer to reduce storage space as this can reduce the overall cost of their operations.

### Gas Cost VS Real Cost

We have thus seen that every operation performed on the Ethereum network costs an amount of computational resources and this is accounted for with a gas cost (which itself have an average price in ETH (currently around 0.000000001 ETH (or ~ $0.0000001) per gas unit)). The goal of such system it to try to be as accurate as possible with the actual resource cost of performing that operation on a computer so that no abuse of the network is possible without paying the true cost of it.

The gas cost is obviously not completely accurate for few reasons: implementation differences between nodes, differences in hardware and the intrinsic differences in operation cost based on their inputs. Furthermore, as the gas measure is a one dimensional value, differences between storage of value for long term, reading from memory and an operation like addition use the same metric which is not how a computer would normally perform.

Plus, as highlighted by the change in opcode pricing over time, the cost of each operation can change. It is also dependent on the state of Ethereum. Most notably, the latest opcode pricing changes like [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) that make reading from storage 4 x more expensive was due to the realisation that as the Ethereum state size grew, it became more expensive to retrieve data from storage. The opcode gas pricing had to reflect that in order for the Ethereum network to remain protected from denial of service (DOS) attacks.

It is also worth noting that the gas pricing model currently used by Ethereum might be vulnerable to specially crafted smart contract that exploit the limited accuracy of the pricing. See for example the research done on ["Resource Exhaustion Attack"](https://arxiv.org/pdf/1909.07220.pdf) by Daniel Perez and Benjamin Livshits with genetic algorithms to craft smart contracts whose execution is relatively cheap on gas compared to how expensive they are for the network to compute.

Nevertheless, the current gas opcode pricing provide a good ballpark representation of the cost of the operation your smart contract will perform and even if the gas cost can and will change the order of magnitude should remain the same.

As a smart contract developer you should never assume specific opcode pricing in your smart contract and your code should thus remain independent of it. Unfortunately it is still not too uncommon to see smart contract developers hard-coding gas value in their contract, please do not emulate them.

### Gas Estimation

While smart contract developers can sometime have a good idea of how much gas is required to perform their contract operations, it is in many cases dependent on the inputs and the current state. As such Ethereum nodes provide a mechanism for users to estimate the gas required for a particular transaction. The applications' front-end can thus perform these estimate to ensure enough (and not too much) gas is provided as `gasLimit` for the actual transaction. (Note that it is important to ensure `gasLimit` is not too high as this can delay the inclusion of the transaction, since it is easier to pack smaller transactions in and miner wants to maximise the use of a block. It is also nice for the user to let them know as accurately as possible the cost of the transaction).

The front-end would thus basically make a call to the users's node or wallet with the exact parameters it will use for the real transaction. The node will execute the code without broadcasting anything to other node and return the `gasRequired` for the transaction to succeed.

Unfortunately as of today, the nodes have no better way than using a binary search to find the proper estimation. This means the node will sometime need to execute the code 20 times or more to find the minimum required gas. And even then, it could miss if the contract had for some reason, branching logic dependent on the gas available (unlikely but technically possible).

We should actually be able to improve the situation by giving node the ability to record max gas needed as they perform the operation. We could for example replace the gas opcode (which is normally used to be compared to some value) with a `requireGas` opcode that would register such gas need. Backward compatibility will limit the effectiveness of this strategy though. I have started to write a [proposal](https://github.com/ethereum/EIPs/pull/2075) on this solution but need to continue working on it.

Note though that whatever estimate is given, it might not be enough as for some contract operations, the gas cost can depend on other users changing the state. If these changes happen between the time of the estimation and the time at which the transaction is included in a block, the estimation will be incorrect. Similarly, an operation could be time/block dependent and the estimation could be off. As such front-end will usually add some extra gas to cover these cases.
There are alternative mechanisms being researched too like [GasFuzz](https://arxiv.org/pdf/1910.02945.pdf).

Smart contract developers can also help by designing contracts so that state changes can only decrease the gas cost for future user. This is not always possible or even desired though.

### The 2300 Gas Stipend

Another particular behaviour that relates to gas is the gas stipend, that is extra gas given to recipient of ETH. So when a user's transaction or a contract make a call to another address with an amount of ETH greater than zero, 2300 gas is added by the EVM to the gas passed to the destination. As such contracts receiving ETH, have the guarantee to have at least 2300 gas and can for example emit an event, but would have no guarantee to be able to write to storage and thus change state.

In solidity, the `<address>.send` and `<address>.transfer` functions will not pass any more gas and as such these call only receive 2300 gas. This for example ensure they cannot call back in the caller contract and change state. They are thus safe from [re-entrency attacks](https://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy). Plus as you shall see, they are safe from issues mentioned further down.

## 2. Gas And Contracts Calls

We have so far, described what gas is on Ethereum and seen that every operation has a gas cost. One type of operation, the ones that call other contracts, is more complex in that it has special rules on how gas is given to called contracts and how "out of gas" or other failures are handled. As you should see, this has some important consequences.

In Ethereum, a contract (referred here as the _caller_) can call other contracts (referred here as _callees_) via special opcodes (CALL, STATIC*CALL, DELEGATE_CALL,...). When that happen, \_callees* also receive an amount of gas as if they were called directly via a transaction. The gas provided is partially specified by the _caller_ as part of the opcode parameters. See DELEGATE_CALL spec [here](https://eips.ethereum.org/EIPS/eip-7) for example.

If the amount received is not enough (the total gas cost of all operations executed by the _callee_ exceeds the gas received), the _callee_'s operations get reverted and execution goes back to the _caller_ as the result of an "out of gas" exception. While in most cases, (when developers use normal function calls in solidity), the _caller_ automatically reverts when receiving such failure, the EVM and solidity actually allow the _caller_ to continue (this is now becoming easier with [try/catch](https://blog.ethereum.org/2020/01/29/solidity-0.6-try-catch/) functionality in solidity 0.6). The _caller_ has then at its disposition, whatever gas is left (including what was not spent by the _callee_).

The _callee_ can also decide on its own to revert (revert its operations but return the unused gas) or throw (revert its operations and consume all gas given). This can be as a result of a specific error in which case the _callee_ can specify an error message, or because it performed an invalid operation (like division by zero).

**Note that Ethereum has no established convention on error message yet and as such _caller_ have usually no clue of the reason why _callee_ fails**, unless both contracts were build for each other. In particular it cannot know whether the error was actually caused by not being given enough gas or for another reason.

### The 1/64 Rule

While I mentioned that it is the _caller_ who specify how much gas is given to _callee_, this is a bit more complex.

In the current Ethereum version (post "Tangerine Whistle" hard fork that introduced [EIP-150](https://eips.ethereum.org/EIPS/eip-150)), a _caller_ can actually only give to a _callee_, an amount of gas no greater than:

```
gas available - (1/64* gas available)
```

This is because EIP-150 ensure the caller is left with at least 1/64 of the gas available, regardless of what happens to the call.

The reasoning behind the introduction of this 1/64 rule was to avoid the issue that previous implementation had:
It used to be that _caller_ could send all the gas currently available to them to the _callee_. But this implied that there could be contracts calling contracts, almost ad-infinitum (since the gas cost of a call is low). To ensure this did not cause "stack too deep" issue in Ethereum node's implementation, the maximum depth was caped to 1024 (and still is). Upon reaching that depth, the last call would throw.

The consequence was that transaction signers could ensure that a specific call would throw by first making the transaction go through a series of calls and make it reach the depth of 1023 before calling a particular smart contract. This is known as the **Call Depth Attack**, see [here](https://blog.ethereum.org/2016/06/10/smart-contract-security/) for an introduction.

In practice it meant that in most cases you could not trust your _caller_ contract to continue processing its logic after receiving a revert from a _callee_. And note that such issue also affected simple `<address>.send` call (that would normally get the guaranteed gas stipend).

The solution to prevent this from happening, proposed first in [EIP-114](https://github.com/ethereum/EIPs/issues/114) and finally accepted in [EIP-150](https://eips.ethereum.org/EIPS/eip-150) is to always keep an amount of gas in the _caller_, specifically 1/64 of the available gas. Since at each extra depth level, the gas would diminish rapidly, the recursive depth would get limited naturally and while the 1024 limit still exist today in node implementation, it is for practical purpose unreachable.

This was not the only change in EIP-150 though. The gas provided as part of the CALL\* opcodes has changed from a strict value to **a maximum value**, that is, if `~ 63/64` of the available gas is less than the value given to the opcode, the call will still proceed but with less gas than specified, as opposed to reverting, like in previous implementations. One of the reasoning behind such change (proposed first in [EIP-90](https://github.com/ethereum/EIPs/issues/90) ) was that it was redundant for the contract to calculate the gas required by a call and that it was important to protect the _caller_ by preventing the _callees_ from using all the gas (actually ~63/64 of it). There were propositions to have "give all available gas" as an option but in the end, the idea of having the gas value simply being a maximum was decided. See [this issue](https://github.com/ethereum/EIPs/issues/90) for some of the discussion.

The possibility of _proceed without enough gas_ is something we do not naturally expect as developers and as you will see in the next section, it can lead to safety issues.

Many projects out there are actually affected, including [Gnosis Safe](https://safe.gnosis.io) and other smart contract wallet that support meta-transaction. This is also true of the [Gas Station Network (GSN)](https://gasstation.network) by [OpenZeppelin](https://openzeppelin.com).

## 3. Insufficient Gas Griefing Attack

As we should see, this was a mistake. Indeed, in some cases, _caller_ contracts need to ensure that the _callee_ receive a specific amount of gas. A feat, not perfectly achievable with current opcodes unless you let your contract be **dependent on specific opcode pricing**.

Let's look at an example of solidity code :

```solidity
contract Executor {
    function execute(address to, bytes calldata data, uint256 gas) external {
        (bool success, bytes memory returnData) = to.call.gas(gas)(data);
        // do something
    }
}
```

If you were new to solidity, I am pretty sure you would expect that the _callee_ (here `to`) should be certain to receive an amount of gas equal to `gas`. However, in the current EVM implementation, this only means that the _caller_ is ensured to spend a maximum amount of gas equal to `gas`. In other words, the gas specified as parameter of the CALL\* opcodes acts as a protection for the _caller_ to not spend more than `gas` in the call. **The _callee_, on the other hand, is not guaranteed to get any.**

Note that such behaviour is obviously different from the transaction's `gasLimit` as in that latter case, the transaction is at least sure it will get that amount of gas.

You might be thinking that if the _callee_ run out of gas, then surely the _caller_ will throw because no more gas would be left for it neither.

That's where the 1/64 rule, described above, kicks in. Since `gas/ 64` is left anyway in the _caller_, this could well be enough for it to carry its execution to the end. As such, even if the _callee_ fails because it did not receive the expected `gas`, the _caller_ would carry on potentially assuming that the _callee_ failed for another reason than a lack of gas.

By the way, 1/64 is not that small. If an inner call require 6,400,000 gas, the _caller_ would still have 100,000 gas to carry on after the _callee_'s call fails.

As far as I know this vulnerability is not explained properly anywhere. Interestingly enough as I mentioned, it affects several projects already, including almost every smart contract wallet and meta-transaction implementation out there. It also affects EIP-165 (but to a less extent, because for practical purpose it might never matter) whose example implementation exemplify the issue, see [here](https://github.com/ethereum/EIPs/pull/881#issuecomment-491677748).

It was first reported as part of a Gnosis Safe bug bounty on [Solidified.io](https://solidified.io) back in March 2019, see [bug report](https://web.solidified.io/contract/5b4769b1e6c0d80014f3ea4e/bug/5c83d86ac2dd6600116381f9). Solidified agreed on the importance of the bug. Unfortunately Gnosis Safe team did not officially announce the issue that affects their users. The issue, later posted on github [here](https://github.com/gnosis/safe-contracts/issues/100) remains unanswered. It is also worth noting that the [formal verification](https://github.com/gnosis/safe-contracts/blob/78494bcdbc61b3db52308a25f0556c42cf656ab1/docs/Gnosis_Safe_Formal_Verification_Report_1_0_0.pdf) performed by [Runtime Verification](https://runtimeverification.com) for Gnosis, did not found the issue even though the contract code explicitly attempts to perform the check that enough gas is given to the transaction, see line 101 [here](https://github.com/gnosis/safe-contracts/blob/5a8b07326faf30c644361c9d690d57dbeb838698/contracts/GnosisSafe.sol#L101).

The community would have benefited from a disclosure from Gnosis when it published [the result of the formal verification](https://blog.gnosis.pm/formal-verification-a-journey-deep-into-the-gnosis-safe-smart-contracts-b00daf354a9c) as this highlights the limitation of such verification, when the expected behaviour is not fully transcribed.

While it is true that the issue facing such smart contract wallet, can be circumvented by making sure users sign a metatx gasLimit (called `safeTxGas` in Gnosis case) higher than normally necessary, this is not ideal and we should aim to move the security of the wallet in the smart contract code as much as possible.

Indeed, with current Gnosis Safe implementation, the User Interface need to do extra work (increase the amount of gas to be signed by the user) to ensure users are safe against malicious relayers.

You can imagine building such interface on IPFS (so that users can trust it does not change) that ensure extra gas is given but then if opcode pricing change, the interface might become vulnerable.

Note that Consensys Dilligence actually mentions the issue [here](https://consensys.github.io/smart-contract-best-practices/known_attacks/#insufficient-gas-griefing) and [here as SWC-126](https://swcregistry.io/docs/SWC-126) but they actually fail to propose a correct solution, showing what seems a misunderstanding of the issue.

Indeed the following code (similar to the one shown on Consensys documentation linked above and to Gnosis Safe code) is not sufficient to prevent the problem from happening

```solidity
contract Executor {
    function execute(address to, bytes calldata data, uint256 gas) external {
        require(gasleft() >= gas);
        (bool success, bytes memory returnData) = to.call.gas(gas)(data);
        // extra operation including the logic to reward relayer for submitting the tx
    }
}
```

The `require` call will not ensure that `to.call` actually receives the gas specified via parameter `gas`
This is for 2 reasons actually:

- The gas required for the call itself (opcode and memory) would further reduce the gas available to be lower than what reported by `gasleft()` when the call is actually made.
- Most importantly though, it is that even if at the point of the call, the gas available was still sufficient, the 1/64 rule would reduce it even more. **And because 1/64 of the gas required can be high enough for the rest of the tx to succeed, the call can continue.**

For Meta transaction (like in Gnosis Safe case) this means that a relayer could sign the transaction (maliciously or by ignorance) with low enough gas so that the inner call fails but high enough so that transaction itself succeed. This would **result in the relayer getting rewarded for the execution, while the user would see its meta transaction failing even if signed with a high enough `safeTxGas`**

Furthermore as it is possible that a user could generate a series of meta-transaction messages. If a relayer was able to make the first one fail, it could impact the whole series.

This is why we need a way for smart contract to ensure that _callees_ receive the exact amount of gas specified.

### Workaround Against "Insuficient Gas Griefing attack"

As mentioned above, the solution proposed by Consensys Dilligence is insufficient. In order to properly guard against the issue, we need to ensure there is enough gas at the point of the call being made.

It turns out that with current EVM there are 2 ways to do it

1. Check before the call

```
uint256 gasAvailable = gasleft() - E;
require(gasAvailable - gasAvailable / 64  >= `txGas`, "not enough gas provided")
to.call.gas(txGas)(data); // CALL

```

where E is the gas required for the operation between the call to `gasleft()` and the actual call PLUS the gas cost of the call itself. This is unfortunately opcode pricing dependent. As gas pricing continue to evolve, it is important to have a mechanism to ensure a specific amount of gas is passed to the call so such mechanism can be used without having to rely on a specific gas pricing.

While it is possible to simply over estimate `E` by a large amount, it could still theoretically be insufficient as there are no guarantee opcode pricing will not change dramatically. Plus it would simply be better to have the EVM do the precise work itself.

2. Check after the call:

```
to.call.gas(txGas)(data); // CALL
assert(gasleft() > txGas / 63); // "not enough gas left"

```

This workaround does not require to compute a `E` value as mentioned in the previous one and thus does not rely on a specific gas pricing (except for the behaviour of EIP-150). If the call is not given enough gas and fails for that reason, the condition above will always fail, ensuring the current call will revert.

Note that this check still pass if the gas given was less AND the external call reverted or succeeded EARLY (so that the gas left after the call > txGas / 63). This can be an issue if the code executed as part of the CALL is reverting as a result of a check against the gas provided. Like a meta transaction in a meta transaction. That is why we use an assert here, so that all gas is used, emulating an out of gas exception.

This workaround is actually used in several places today.

- It was first implemented as part of my work on [Sandbox](https://www.sandbox.game) for a Meta Transaction standard (see [EIP-1776](https://github.com/ethereum/EIPs/issues/1776)).
- It is used by the winning entry I [submited](https://metatx.eth.link) for [gitcoin Metamask hackathon](https://gitcoin.co/issue/MetaMask/Hackathons/2/3865). See the code [here](https://github.com/wighawag/singleton-1776-meta-transaction/blob/master/contracts/src/GenericMetaTxProcessor.sol#L180-L187) that checks for gas left after the call.
- PISA research also include it on their solution, see [here](https://github.com/PISAresearch/contracts.any.sender/blob/da3d14b321974f2079ec598108fdd9426117418a/versions/0.1.8/contracts/Relay.sol#L54)

While these workarounds can indeed be used now, they are limited and a proper solution will involve a change in the EVM.

### Proper Solution Against "Insuficient Gas Griefing attack"

In order to properly guard against the issue, we need to ensure there is enough gas at the point of the call being made. While the workarounds in the previous section will help developer build safe smart contracts with the EVM today, they are limited and I have thus proposed an EVM improvement, namely [EIP-1930](https://eips.ethereum.org/EIPS/eip-1930).

In a nutshell, EIP-1930 would allow contracts to call other contracts with a strict gas semantic, that is, if the gas available (including the reduction done by the 1/64 rule) is not enough for the call to forward the amount of gas specified as part of the opcode, the caller get an out of gas exception.

It can be implemented either as 3 new CALL\* opcodes or by reserving specific gas value range (if we can ensure they have never been used before). See the proposal for details.

This would allow smart contract wallet and meta-transaction in general to ensure that the user's meta- transaction is given the exact amount of gas specified by the users' signed message without any extra work or opcode pricing dependent logic. As such relayers would only get a reward if they give the right amount of gas for the transaction to succeed.

## 3. Inner Call Out Of Gas Attack

It turns out that the behavior of gas is responsible for yet another issue. Indeed, a gas based attack is also possible on contracts that call other contracts with all gas available (that is 63/64 of all gas available). In other words, while the issue facing meta-transaction mentionned above, is that they cannot ensure easily that the inner call get a specific amount of gas, the attack described below affects any inner call whose failure do not cause the _caller_ to revert.

The result is somehow similar to a **Call Depth Attack** but different as for example calls like `<address>.send` won't fail as these are still given the gas stipend. Indeed, as mentioned above the gas stipend is extra gas and is not affected by the 1/64 rules. As a result such calls are always guaranteed to have 2300 and cannot revert for a lack of gas (assuming of course that the recipient do not use more than 2300, or revert intentionally).

But the issue has some similar semantic to the **call depth attack** when it is invoked on low level call that catch inner call failure. And these will probably become even more popular with the introduction of "try/catch" in solidity 0.6.

To illustrate the issue, here is a solidity snippet, with the new try/catch feature of solidity 0.6 but the same applies to lower level calls that check for success.

```solidity
contract Test {
    function test() external {
	    try target.callNeeding6400000Gas() returns (string message) {
			// do something in case of success
		} catch {
			// do something else in case of failure
		}
    }
}
```

A user calling `test` can basically make a transaction with a specific amount of gas that result in `callNeeding6400000Gas` not getting enough gas (smaller than 6,400,000), while the rest of `test` can continue.

Let say "do something else in case of failure" consume 50,000 gas. If the user make a transaction with a gasLimit of 6,400,000 gas, when it reaches the inner call, it would not have enough anymore to give that same amount "callNeeding6400000Gas() ". Assuming such inner call was needing that amount, it would fails with an "out of gas exception". This would result in the `catch` block being executed, which as we said need 50,000 gas. Since we know that we had around 100,000 gas available (6,400,000 / 64), the transaction will complete sucessfully. The caller, here the Test contract would be unable to know wether the failure was due to a lack of gas or if the inner call simply reverted intentionally.

As such the widlcard catch should be used with caution. A recent article on Ethereum foundation [blog post](https://blog.ethereum.org/2020/01/29/solidity-0.6-try-catch/), while illustrating nicely the feature, fails to warn user about the potential danger. I hope this blog post will help spread the words and ensure developer carry on with caution.

A note in that regard has actually already been added to [solidity documentation](https://github.com/ethereum/solidity/commit/a3b7c73e3f864da288f3da8bacb778c69a03bce0) after I mentioned the issue to Chris.

To be clear the issue only arise if there is logic in the try/catch that should not be executed if the _callee_ was expected to revert intentionally. For example if the _caller_ expects a revert in the _callee_ for a specific reason, like rejecting token transfer and perform some different logic when the call revert than when it does not.

Let illustrates the issue with an example :

```solidity
contract Auction {
    ...
    ERC20Token token;
    address highestBidder;
    uint256 highestBid;
    function bid(uint256 amount) external {
        require(amount < highestBid, "higher bid required");
        address oldBidder = highestBidder;
        uint256 oldBid = highestBid;
        highestBidder = msg.sender;
        highestBid = amount;
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
        if (oldBidder != address(0)) {
            try token.transferFrom(address(this), oldBidder, oldBid) {
            } catch {}
        }
    }
}
```

We assume here that the ERC20 token used is safe in that its functions cannot call back in the contract nor allow the recipient to reject the transfer. Under this conditions, the code above look at first sight completely safe. The try catch would technically be unecessary, but let's go with it for the sake of the example.

The reason why it is actually not safe, is, as described above, because the new bidder can provide a specific amount of gas so that there is not enough gas to give to the 2nd transfer call to succeed but enough for the rest. Since there is nothing happening after the try catch the rest will demand not much gas. maybe a few hundreds.

So if the transferFrom demand something like 20,000 gas (possible with an ERC20 token) it will throw while 20,000 / 64 > 300 gas will be left in the bid call, which might be just enough to complete.

The astute reader might have noticed that this code is the analogue of the one described [here](https://blog.ethereum.org/2016/06/10/smart-contract-security/) except it applies to ERC20 tokens and not ethers.

This is to illustrate how similar the **Inner Call Out Of Gas Attack** is to the **Call Depth Attack** that we aimed to destroy with EIP-150.

Obviously the example is made in purpose and might not have any real life equivalent. As for one, as described in the article describing the **Call Depth Attack** it is recommended to favour pull over push transfers.

But the recommendation normally stems from the fact that there are possibilities in the token for the recipient to reject a transfer. Here in the example above, that was not the issue.

While there might currently be no practical scenario where the attack mention here have any importance, we should remain aware of it. And this is another reason to favor pull over push transfer as mentioned by consensys [here](https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert) and [there](https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert).

By the way you can easily try it out in [remix IDE](http://remix.ethereum.org/)

1. Add the following file:

```solidity
pragma solidity 0.6.0;

contract ERC20Token {
    event Transfer(address indexed from, address indexed to, uint256 amount);
    mapping (address => uint256) balances;
    function transferFrom(address from, address to, uint256 amount) external returns(bool) {
        uint256 fromBalance = balances[from];
        require(fromBalance >= amount, "not enough balance");
        balances[from] -= amount;
        balances[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
    function mint(address to, uint256 amount) external {
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function balanceOf(address who) external view returns(uint256) {
        return balances[who];
    }
}

contract Auction {

    constructor(ERC20Token _token) public {
        token = _token;
    }

    ERC20Token token;
    address public highestBidder;
    uint256 public highestBid;
    function bid(uint256 amount) external {
        require(amount > highestBid, "higher bid required");
        address oldBidder = highestBidder;
        uint256 oldBid = highestBid;
        highestBidder = msg.sender;
        highestBid = amount;
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
        if (oldBidder != address(0)) {
            try token.transferFrom(address(this), oldBidder, oldBid) {
            } catch {}
        }
    }
}
```

2. compile both
3. deploy ERC20Token
4. deploy Auction (passing the address of the ERC20Token contract as parameter)
5. select one account and execute `mint` with that address and `amount` = `1000`
6. execute `bid` with that exact same amount (`1000`) (so zero is left in the balance afterward)
7. select another account and execute `mint` for that address with `amount` = `2000`
8. execute `bid` with an `amount` = `1001` and SPECIFY gasLimit = `60000`
9. check the balance of the first account and you will see it is still zero. That account did not receive its refund from its previous bid.

You can then repeat the operartions without limiting the gas to 60000 for step 9. and you will see that the first account will get back the amount as intended.

This clearly shows that the transaction signer is able to influence the result of a contract call, simply by changing the gasLimit.

## Conclusion

I hope the post was informative and helped elucidate the issue Ethereum developers are facing with the current gas behaviour. In particular how CALL\* opcodes behave.

Help me put forward [EIP-1930](https://eips.ethereum.org/EIPS/eip-1930) in the next hardfork as this would solve at least the gas issues faced by all smart contract wallet and meta transaction processor out there.

Special thanks to [Belsy](https://twitter.com/whalelephantK), [Fabio Hildebrand](https://medium.com/@fabiohildebrand) and [Roland Kofler](https://twitter.com/rolandk) for reviewing the article.

Thanks for reading.
