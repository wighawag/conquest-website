---
title: The first alpha was a blast!
date: 2021-05-25
image: images/devlog/screenshot_alpha_1.png
---

After our succesful alpha, we decided to setup a devlog to keep you updated of our progress building conquest.eth, an open ended game of war and diplomacy running on [ethereum](https://ethereum.org).

Thanks to all we participated on the first alpha. Many of you provided invaluable feedback! We would also like to thanks our friend at [Xaya](https://xaya.io) for sponsoring the alpha with 3000 WHCI. This was distributed on random planets and provided an interesting gameplay element too.

The first alpha was a blast! We had over 150 players competing over more than 2000 planets. Secret and not so secret alliances formed. It was interesting to watch. We were permanently tempted to get some coins for ourselves to join the fun :)

After 3 weeks of intense war between the players, the alpha is now over and we could not be more excited to continue building conquest.eth.

## What did we learn ?

The alpha was great to test our assumptions and we are glad to say that the core of the game is working as intended. Conquest has a core social element that make it unique among the current decentralised blockchain games. While the UX was pretty bare bone and lacked various utility, players could self organise and it proved our main assumptions.

As mentioned, the alpha was lacking terribly in term of UX. on top of that the goerli network which was losing many tx revealed the lack of robustness on the frontend. Our code was not intended to be full proof as we assumed we did not need that for our 3 weeks long alpha. We were unfortunately wrong and this caused lots of frustration to our players. We also discovered other issues related to the agent system (that should normally allow player to sleep well while their fleet travel across space).

On top of that one of our goal with the alpha was to test how far we could go with decentralisation. The core loop was relying on **zero backend**. Everything was fetched from the player's wallet node. This worked but limited the potential of the user experience. We had to add 2 new pages not possible using ethereum's node api alone: the highscore and logs page. These 2 pages were crucial for the experience of the game. We used [thegraph.com](https://thegraph.com) backend for this and a lot more will be added in future version to offer a much nicer experience. With such backend, decentralisation would still be preserved by letting users run their own subgraph node.

## What we will focus next ?

The current focus is the next alpha. We do not have timeline for it yet, but the goal is have a far more robust experience. As such our main work for the coming weeks will be to refactor the core of the system to handle all the transaction edge case that can happen on a blockchain network with variable gas price.

We will also improve the UX and offer a more visible experience when possible. As mentioned above, the plan is to make more use of subgraph to fetch data more efficiently.

In term of gameplay, while the game is very simple, we are happy with the current design. Having said that, we will be looking at adding extra social feature to the core game like public alliances. We might also investigate the addition of extra features. But this will come later,

We will keep you posted!

Thanks for reading!
