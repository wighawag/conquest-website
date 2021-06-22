---
title: June 2021's update
date: 2021-06-22
image: images/conquest-alpha.png
---

Hey all, a quick update to share our progress. The image here is the screenshot of our first alpha, with the new renderer, showing more than 2000 planets and 150 players.

## New Renderer

We have been working on a major refactor of our code. While our initial focus was to revamp the way we handle blockchain state, we started to look how we could make the renderer more efficient and went down a rabbit hole :) We decided to experiment with pure html and css instead of canvas.

To our surprise it works very well. Every planets are now `<div>` and it turns out to be more efficient. There are still some "zooming out" limitation but we can go further than before. The renderring is also a lot smoother for circles and the blockies. The other benefit is that we now have a paralax background which is great!

Because we use [svelte](https://svelte.dev) for updating the UI instead of a rendering frame based loop, we now have all planet's div reactive to their respective planet changes, like we do for every other UI. This make the code more elegant and make it easy to add effects, etc... plus this scales well.

## Blockchain State Handling

Our initial motivation for the refactor was actually blockchain handling. Our first alpha was build in relative short burst of work during spare time and we made some shorcuts. Most importantly we had several files that grew in complexity, especially in relation to pending transactions handling and syncing. The system was also lacking consistency resulting in alpha's player getting confused about the number of spaceship a planet could actually send (pending tx were not considered...).

In the new version, we separated more cleanly each responsabilities and we now have a system were pending transaction status is in sync with the blockchain state the game receives. This means that whenever a pending transaction is included we can discard the temporary modification that we applied to make our UI optimistic.

For the players this means they have the number of spaceship currently available to send always accurate. Once the blockchain state is applied to the planet, the pending transactions that are resolved do not get applied anymore.

The refactor is not finished yet though and we are not yet on parity with the first alpha. We are getting there though :)

## Patnership with Outplay Games

<img style="width: 15%; float: left; margin: 1em;" src="../../images/devlog/conquest-near.gif">

We partnered with [Outplay Games](https://outplay.games/) for a NFT drop they organised with [Paras](https://paras.id/) on the [Near network](https://near.org/) to promote and fund innovative games. We are thrilled to see these kind of initiative! There was 2 other games promoted this way too. Check it out [here](https://paras.id/opgames.near/collection)!

The NFT itself has no role in our game, nor do we plan to add any functionality to it. We see it as representing a piece of history. We have 160 of these token in reserve to be given to all players that participated in the first alpha. If you are one of them, better request them as soon as you can on our [discord](https://discord.gg/Qb4gr2ekfr), because while we intend to keep it, we do not guarantee it.

## Summer Break

This summer, we will not be fully available but we intend to continue working on the refactor. We will also take the oportunity to revisit some of the game design and explore alliances mechanism at a high level. Hopefully, we'll have time to give you updates too.

Also, we are coming to [ETHCC](https://ethcc.io/) to present the game and how we plan to handle it on ethereum L2.

By end of August, we will be back working full time on conquest.eth with the goal to release the next alpha! Can't wait :)
