---
title: A Blog Hosted On ENS+IPFS Powered By Svelte+Sapper
date: 2020-02-23
# mediumLink: https://medium.com/@wighawag/
# image: Sacred_Chao_2.jpg
# caption: Wikipedia
# captionlabel: Source:
# captionlink: https://en.wikipedia.org/wiki/File:Sacred_Chao_2.jpg
---

Just a quick post to inaugurate my new blog, mostly focused on web3 and [Ethereum](https://ethereum.org/).

I just decided to move my blog off [medium.com](https://medium.com/@wighawag) after maybe around 3 years with it. I'll probably continue to post copies there though.

The new blog is being hosted on [IPFS](https://ipfs.io/), a decentralized storage protocol while the domain name is hosted on [ENS](https://ens.domains/) a domain name system running on Ethereum. This is a killer combo that I have been using for quite a while for Hackathon and demos. It has never been easier to host a website.

While I could use my own node to ensure availability of the data I currently use [Pinata](https://pinata.cloud/). And while ENS is not supported by all browser by default, my website remains available to traditional browsers via https://ronan.eth.link. [eth.link](https://eth.link) is a service provided by ENS that uses [DNSLink](https://dnslink.io/) to link DNS to ipfs hashes.

My first blog, from 2011 was running on [appengine](https://cloud.google.com/appengine) and, fun fact: the blog engine I used back then was from [Nick Jonhson](https://twitter.com/nicksdjohnson). Yes the same person who created ENS :)

His blog system was quite clever, it was a dynamic static website generator (if that make sense). You can still find his series of posts on how to build it on appengine : http://blog.notdot.net/2009/10/Writing-a-blog-system-on-App-Engine. This might not work today as [google](https://www.google.com) kept changing the api.

That was actually one of the reason I decided to move off to [github pages](https://pages.github.com), in 2016 with a traditional static website generator: [Hugo](https://gohugo.io). It is still alive here at https://wighawag.com/blog. It focus mainly on my experiments in gaming and graphics programming with the wonderful but little known language: [Haxe](https://haxe.org) and the powerful cross platform low-level graphics library: [Kha](https://kha.tech).

Then, after discovering Ethereum in 2016, I had a go at medium.com which at the time seemed popular and convenient. I posted few articles over [there](https://medium.com/@wighawag) but never felt really comfortable with it. I even had the opportunity to have one of my article in one publication but rejected as I did not like how medium handled the process.

So today I am glad, my blog is hosted on decentralized platform with a domain name running on ENS. This combo is very powerful and it is starting to get traction with browser starting to support it as well as having a growing ecosystem. You can for example now search via [Almonit](https://almonit.eth.link).

To build the website, instead of using a traditional static website generator, I used the more powerful [svelte](https://svelte.dev) + [sapper](https://sapper.svelte.dev) combo. On its own, it might not be ideal for blog but since I use it for building stuff it was easier for me to use it.

One issue I had was that it assumed url where always coming from the same root folder. But With IPFS, the website can be served from the ipfs hash themselves which contain an /ipfs/&lt;hash&gt; path (like [this](https://cloudflare-ipfs.com/ipfs/QmbGNFs73GvZyjJiEbEciLnpoPt5iAmBkgZrGtrnn9RUgQ/)) or it can be served from a domain name that use the root path, like mine (ronan.eth/ or ronan.eth.link/).

I wanted my website to support both and made a fork of sapper with support for it. The [PR on sapper github](https://github.com/sveltejs/sapper/pull/866) is still open but in the mean time you can use my fork to have that. And feel free to add your thoughts there if you want to help get it merged.

Plus for web3 related stuff, I am building a library: [svelte-wallet](https://github.com/wighawag/svelte-wallet) that uses the store api of svelte allowing you to easily interact with Ethereum. It is still a work in progress, but I plan to make it a stable library soon. I use it for several projects, including [Ethernal](https://ethernal.world), a procedurally generated dungeon on the blockchain.

Contrary to what the name could imply, the library is actually not tied to svelte. It simply follow the svelte store api which in turn follows the Observable pattern, (see [here](https://svelte.dev/docs#Store_contract)).

I actually use it here to add a donation button to that page. See below.

Once the wallet store is setup it is easy as :

```
<button on:click="{() => wallet.tx({to:'ronan.eth', value: '10000000000000000'})}">Donate</button>
```

It will handle unlocking wallet, etc... for you.

What would be missing from my earlier blog websites will be a commenting system. For that I am planning to support [3box.io](https://3box.io). They offer a ready made component for react [here](https://docs.3box.io/build/plugins/comments). But for svelte, I would need to build it myself.

That's all

Thanks for reading and stay tuned for an article on Ethereum and the concept of gas. I'll explain how gas work on the EVM and the pitfalls it introduce so hopefully the next article will be helpful to you.

<!-- <button on:click="{() => wallet.tx({to:'ronan.eth', value: '10000000000000000'})}">Donate</button> -->
