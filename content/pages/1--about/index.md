---
title: About Paysera from developer's perspective
menuTitle: About Paysera
---

# TL;DR; – short summary

We, Paysera developers:
- work only on long-term product development;
- work on large and complex systems, split the code into separate services;
- mainly use PHP 7 and Symfony framework for backend, ReactJS for frontend;
- have 11 international teams which integrate various roles: backend, frontend, mobile apps, QA, product owners, devops, secops;
- work by agile principles;
- put effort for automation and infrastructure, like CI/CD, containerisation with kubernetes;
- focus on code quality: perform code reviews, ensure using best practices and our conventions;
- embrace constant learning and personal growth for all developers.

If you're interested, read below for more detailed explanations.

# Product

We work only on our internal, long-term products – whether it's the core of the system, some sub-product needed for the system to function or some related functionality. We never "bake" projects by templates – all features and integrations are custom and unique.

# System architecture and technical stack

As we work on large and complex product, we split it into separate services. They are developed and deployed separately.

This helps to divide the responsibilities of the system and get some benefits from it:
- we can deploy and rollback some parts separately. This makes it more manageable and faster;
- as each team is responsible for some part of functionality, this helps to make responsibilities clearer - if some service is not performing well, we know right away which team should look into it;
- in case of any failures, we don't have complete outage;
- we can update frameworks, libraries, rewrite some core logic in systems more reliably.

We believe in code reusability and thus we use frameworks and open-source libraries.
We also think that libraries must perform well and more often than not we have some custom requirements.
Due to this, we also have lots (which means hundreds) of internal libraries that we use in our projects.

We base our projects on Symfony framework, which allows easy code reusability,
does not make too many assumptions and allows to configure the functionality to work
with different and changing requirements.

# Used tools, technologies and frameworks

- PHP 7 with Symfony (LTS or the newest version, depending on the project) for backend;
- JavaScript (ECMAScript 2018+) with ReactJS for frontend, served by Webpack;
- Kubernetes, VMWare, Linux, Docker, Ansible, Terraform for server infrastructure;
- REST style for APIs, RAML for API definitions;
- PhpStorm for developing;
- Git, GitLab, Harbor, Toran, Verdaccio as development tools;
- PHPUnit, Mockery, Codeception, Jest for testing;
- JIRA, RocketChat, Confluence for internal communication.

# Teams

- 8 wide profile teams (PHP, JavaScript, other roles);
- 1 devops team, responsible for infrastructure;
- 2 application development teams: for Android and iOS.

Team usually consists of 4 to 8 devs (including Team Lead), a product owner and a QA/test automation specialist (for functional, browser-based tests only).

Developers have different roles - backend only, frontend only, full-stack or other variations.
We also have some other roles for devs, like devops or secops.

We are an international company – our teams work from different locations:
- 10 teams work from Lithuania (9 mainly from Vilnius, one – from Kaunas);
- one team from Bulgaria (Sofia), also looking for developers in Plovdiv;
- we're gathering teams in Manila and Dhaka, also looking to expand in several other countries.

We always communicate with each other when needed, but try to keep the whole team in one place for as effective work as possible.

We're actively looking for more developers in all of current locations (and possibly new ones).

# Development process

We work by agile principles, each team chooses it's process which fits them the best. Most of the teams work by Scrum.

Usual meetings:
- daily standups to update on the progress and to spot the problems early;
- sprint plannings to estimate the tasks and agree on sprint scope;
- groomings to discuss the tasks that are not so clear on possible implementation;
- sprint reviews, which are common for all the teams, to update other parties on progress and accomplishents;
- retrospectives with each team to review the process itself and how we could optimize it.

# Automation and infrastructure

We put a lot of effort in work automation and bringing up the infrastructure needed for
fast development cycles:
- we have continuous integration and automated deployments. This allows us to deploy many times each day;
- we have infrastructure that allows to set-up development environment in several hours with all the needed projects ready for development and testing;
- we use code generation in some places which allows to kick-start projects and easily update some libraries in different languages (like REST clients).

# Focus on code quality

As we maintain and extend the same system for many years now (and many years to come),
we put lots of focus into code quality.

This allows even for senior devs to learn quite a few new things even in first the
months after joining our team.

Some of the things to note:
- no line of code reaches production without code review;
- we write unit and functional tests for the functionality to be sure that it works and to notice when it doesn't;
- we have some conventions and best practices to follow shared among all of the developers. Some of them are open sourced: [PHP](https://github.com/paysera/php-style-guide), [JS](https://github.com/paysera/js-style-guide). This helps us to avoid making the same mistakes and to easily carry on the practices that have worked earlier. For some of those rules, we have [integrated tools](https://github.com/paysera/lib-php-cs-fixer-config) to help us to follow them.

# Constant learning

We try to embrace and support the learning culture in the company:
- new developers receive introduction tasks with dedicated mentor which takes about a month to complete. This allows to learn processes, tools and conventions before jumping to concrete problems with their own business requirements;
- we actively participate in community meetups, share our knowledge, organize some workshops ourselves;
- developers periodicaly go to dev conferences of their choosing, like PHP International conference, SymfonyCon, BuildStuff, DevOps Pro, TestCon, Devoxx, Codemotion, phpCE and similar.
