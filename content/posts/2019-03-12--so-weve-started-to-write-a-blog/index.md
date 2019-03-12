---
title: So, we've started to write a blog
cover: cover.png
author: m.balcytis
---

We've had this idea to start a blog for quite some time now.
Procrastination was our friend for a long period, but here we are!

With this intro post, I'll provide some background info about future contents of this blog, but will also go deeper into the
technical decisions we've made here.

Basically it could help you to get started with your own blog if you'd be up for that.

<!-- end -->

## So, what we're up to?

Paysera provides payment-related services – we offer multi-currency banking accounts to our clients for
various transfers, we have a payment gateway, solutions for retailers, various API integrations, mobile applications.

When working on a product (especially long-term one with complex business logics) much effort is invested in
infrastructure, reusable components, effective development processes, constant improvement in technical and personal
spaces. It also requires custom or tailored solutions quite often.

That's exactly why we think we can share some of our experience! 

## Idea for the blog

Before getting into technical things, we've set some basic needs for our case:
- we want to post (or cross-post) to [Medium](https://medium.com/) as it's getting de-facto place to read technical
articles for many developers. The alternative would be LinkedIn articles or some other place in cloud services;
- we also want to have all of our blog posts in a single place – this is for those who want to get to know us a little
better for whatever reason. In the same place, we'd like to have our publicly shared view on the processes, conventions
and other development-related things. For this type of information, blog posts are usually not the best idea.

If you don't have those needs, Medium or similar platform could be the best option – it's ready to go whenever you are,
you get exposure for free and don't get obligated to write posts very frequently. It's perfectly ok to just write
a single post and then decide that it's not for you at all. :wink:

## Choosing a technical base for the blog

Basically, there was a few options to consider:
- to go with the classical approach – WordPress;
- to go with something similar to WordPress – with web UI and database;
- to build something of our own. No, we don't like to invent the bicycle, but let's be honest – we,
developers, always think this option through, even with the most standard decisions;
- use static site generator :tada:

The last option bought us in real quickly without even giving second thoughts:
- all of the content is in repository, with version control integration, reviews, clear understanding what goes where;
- content editing is via markdown, not some online editor;
- it allows to extend everything in a controllable manner – installing extensions, configuring etc. inside our IDE, not
browser.

In other words, this might not be the best option for everyone, but it seemed to be a perfect option for the developers.

## Choosing static site generator

There were also a few alternatives to consider:
- [Jekyll](https://github.com/jekyll/jekyll) - made with Ruby, still the most popular (by :star:), older than the others on this list;
- [Hugo](https://github.com/gohugoio/hugo) - made with Go, really fast site generation;
- [Gatsby](https://github.com/gatsbyjs/gatsby) - made with JavaScript to be used with React. 
Allows to use React components besides just the static content.

As we use React internally and have the most experience with JavaScript, we went with Gatsby.

Otherwise, if you haven't tried React, learning curve could be quite steep if you'd like to modify anything in your
templates or site generation logic.

## Bootstrapping and customizing

This blog was based on [HeroBlog](https://github.com/greglobinski/gatsby-starter-hero-blog) Gatsby starter.

It provides nice design, quite a few features, including our needed features –  a blog with several static pages in the menu.

We've also made some customization and added several small features on top of it – you can read more about it in the next
blog post.
