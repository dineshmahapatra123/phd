---
title: "Compound Engineering: How Every Codes With Agents"
source: https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents
author:
  - "[[By Dan Shipper                                          Chain of Thought]]"
  - "[[By Kieran Klaassen                                          Chain of Thought]]"
  - "[[Dan Shipper]]"
  - "[[Kieran Klaassen]]"
published: 2025-12-11
created: 2025-12-28
description: A four-step engineering process for software teams that don’t write code
---
Tags: 
Midjourney/Every illustration.

A four-step engineering process for software teams that don’t write code

December 11, 2025

[13](https://every.to/compound-engineering-how-every-codes-with-agents/compound-engineering-how-every-codes-with-agents/feedback?rating=amazing)

O *ur last coding camp of the year is [Codex Camp](https://0ab9ee3d.click.convertkit-mail2.com/lmulv69l7gimhnwokkkt6h8k52600bghd2pg2/z2hghnhewvk8m9ap/aHR0cHM6Ly9ldmVyeS50by9jb3Vyc2VzL2NvZGV4LWNhbXAvcHVyY2hhc2U=) —a live workshop about building with OpenAI’s coding agent, open to all Every subscribers on Friday, December 12 at 12 p.m. ET. [Learn more and reserve your spot](https://every.to/courses/codex-camp/purchase)***.**

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

What happens to software engineering when 100 percent of your code is written by agents? This is a question we’ve had to confront head-on at Every as [AI coding has become so powerful](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for). Nobody is writing code manually. It feels weird to be typing code into your computer or staring at a blinking cursor in a code editor.

So much of engineering until now assumed that coding is hard and engineers are scarce. Removing those bottlenecks makes traditional engineering practices—like manually writing tests, or laboriously typing human readable code with lots of documentation—feel slow and outdated. In order to deal with these new powers and changing constraints, we’ve created a [new style of engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) at Every that we call **compound engineering**.

In traditional engineering, you expect each feature to make the next feature harder to build—more code means more edge cases, more interdependencies, and more issues that are hard to anticipate. By contrast, in compound engineering, you expect each feature to make the next feature *easier* to build. This is because compound engineering creates a learning loop for your agents and members of your team, so that each bug, failed test, or *a-ha* problem-solving insight gets documented and used by future agents. The complexity of your codebase still grows, but now so does the AI’s knowledge of it, which makes future development work faster.

And it works. We run five software products in-house (and are incubating a few more), each of which is primarily built and run by a single person. These products are used by thousands of people every day for important work—they’re not just nice demos.

This shift has huge implications for how software is built at every company, and how ambitious and productive every developer can be: Today, if your AI is used right, a single developer can do the work of five developers a few years ago, based on our experience at Every. They just need a good system to harness its power.

The rest of this piece will give you a high-level sense of how we practice compound engineering inside of Every. By the time you’re done, you should be able to start doing the basics yourself—and you’ll be primed to go much deeper.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/930/optimized_9818743e-f61e-42d8-affc-9e4d23ae37b0.jpg)](https://www.optimizely.com/ai?utm_campaign=PS-GL-12-2025-Every-Newsletter&utm_medium=cpc&utm_source=every&utm_content=automate-busywork)

#### Automate the marketing busywork

Too much marketing busywork? Automate it with Optimizely Opal—personalizing content, compliance checks, reporting, and more, all done with the help of AI. Use pre-built agents or build your own, then chain them into workflows. Opal learns your brand, plugs into your existing tools, and turns hours of manual work into near-instant results. Leave more time for strategy and creativity.

[Learn more at optimizely.ai](https://www.optimizely.com/ai?utm_campaign=PS-GL-12-2025-Every-Newsletter&utm_medium=cpc&utm_source=every&utm_content=automate-busywork&source=post_button)

## Compound engineering loop

A compound engineer orchestrates agents running in parallel, who plan, write, and evaluate code. This process happens in a loop that looks like this:

1. **Plan:** Agents read issues, research approaches, and synthesize information into detailed implementation plans.
2. **Work:** Agents write code and create tests according to those plans.
3. **Review:** The engineer reviews the output itself and the lessons learned from the output.
4. **Compound:** The engineer feeds the results back into the system, where they make the next loop better by helping the whole system learn from successes and failures. This is where the magic happens.

We use Anthropic’s [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) primarily for compound engineering, but it is tool-agnostic—some members of our team also use startup Factory’s [Droid](https://every.to/vibe-check/vibe-check-i-canceled-two-ai-max-plans-for-factory-s-coding-agent-droid) and OpenAI’s [Codex CLI](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent). If you want to get more hands-on with how we do this, we’ve built a [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin) for Claude Code that lets you run the exact workflow we use internally yourself.

Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound.

Let’s dive in.

### 1\. Plan

In a world where agents are writing all of your code, *planning* is where most of a developer’s time is spent. A good plan starts with research: We ask the agent to look through the current codebase and [its commit history](https://chatgpt.com/share/693adca4-af24-8012-afc6-8ec5e9146be2) to understand the codebase’s structure, existing best practices, and how it was built. We also ask it to scour the internet for best practices relevant to the problem we’re trying to solve. That way when we begin to plan the agent is primed to do good work.

Once the research is complete, the agent writes a plan. Usually this is a text document that lives either as a file on your computer or an [issue on Github](https://chatgpt.com/share/693add1b-dd4c-8001-9e8f-db2fe9b12bab). The plan lays out everything: the objective of the feature, the proposed architecture, specific ideas for how the code might be written, a list of sources for its research, and success criteria.

[![A planning document for a Cora feature. (Image courtesy of Kieran Klaassen.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3866/optimized_93a220e5-8951-4739-89de-6ab0f27a87c4.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3866/optimized_93a220e5-8951-4739-89de-6ab0f27a87c4.jpg)

A planning document for a Cora feature. (Image courtesy of Kieran Klaassen.)

  

Planning helps build a shared mental model between you and the agent for exactly what you’re building, before you build it. Good planning is not pure delegation—it requires the developer to think hard and be creative in order to push the agent down the right paths.

As models get better, especially with small projects, you have to plan less and less—the agent just gets what you want, or maybe does something surprising but good. With complex production projects, though, a good plan is an essential part of building high-quality software that works as you expect.

Once you have a good plan, the hard part is almost over.

### 2\. Work

This is the easiest step because it’s so simple: You just tell the agent to start working. The agent will take your plan, turn it into a to-do list, and build step-by-step.

One of the most important tricks for this step is using a model context protocol like Playwright or XcodeBuildMCP. These are tools that allow the agent to use your web app or simulate use on a phone as it’s being built, as if it were one of your users. So it will write some code, walk through the app and notice issues, and then modify the code and repeat until it’s done. This is especially good for design tasks and workflows because it can iterate on a prototype until it looks like the design.

With the latest generation of agents like [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for), what comes out of the work phase is much more likely to be functional and error-free, and is often actually pretty close to what you envisioned, especially if your plan was well-written.

But even good output needs to be checked, and that’s what we do in the next step.

### 3\. Assess

In the assessment step, we ask the agent to review its own work, and we review the work too. This can take many forms: We use traditional developer tools like [linters and unit tests](https://chatgpt.com/share/693ad30e-71fc-8012-a859-4c9e00824b79) to find basic errors, and we test manually to sanity-check what was built. We also use automatic code review agents like Claude, Codex, Friday, and Charlie to spot-check the code for common issues.

The latest AI makes the assess step even more powerful. Our compound engineering plugin, for example, reviews code in parallel with 12 subagents that each check it from a different perspective. One looks for common security issues, another checks for common performance issues, another looks at it to see if anything was overbuilt, so software isn’t bloated or too complex. All of these different perspectives are synthesized and presented so that the developer can decide what needs to be fixed and what can be ignored.

The real power of compound engineering happens in the next step—where we make sure we never encounter the same problems again.

### 4\. Compound

This is the money step. We take what we learned in any of the previous steps—bugs, potential performance issues, new ways of solving particular problems—and record them so that the agent can use them next time. This is what makes compounding happen in compound engineering.

For example, in the codebase for Every’s AI email assistant **[Cora](https://cora.computer/)**, before building anything new, the agent has to ask itself: Where does this belong in the system? Should it be added to something that already exists, or does it need its own new thing? Have we solved a similar problem before that we can reuse? These questions come with specific technical examples from mistakes we’ve made in the past that prime the agent to find the right solution at the right place in the codebase.

These rules are built up in a mostly automated fashion. After we do a code review, for example, we’ll ask the agent to look at the comments, summarize them, and store them for later. The latest models are smart enough to do all of this with very little extra instruction—and they’re also smart enough to actually use it the next time.

The beauty of this is that these learnings are also automatically distributed to the team. Because they get written down as prompts that live inside of your codebase or in plugins like ours, every developer on your team gets them for free. Everyone becomes more productive: A new hire who’s never been in the codebase before is as well-armed to avoid common mistakes as someone who’s been on the team for a long time.

## Compound engineering: Looking and learning ahead

This is just a basic overview of compound engineering—each one of these steps can and often is its own article. We have also not addressed some of the constraints that still exist with this new way of producing software—namely, how fast a developer can decide what they want to build, process and improve a plan, and describe what good looks like.

We are still just scratching the surface of the possibilities of compound engineering and its broader implications. Manually writing tests or writing human-readable code with lots of documentation is now unnecessary. So is asking an engineering candidate to code without access to the internet, or expecting it to take weeks for new hires to commit code. And so is being locked into a particular platform or technology because the legacy code is too hard to understand, and replatforming would be too expensive. We’re excited to write more about what this new way of engineering unlocks.

If you’re interested in this topic, we highly recommend you read some of the other articles we’ve published about it:

1. [“Stop Coding and Start Planning”](https://every.to/source-code/stop-coding-and-start-planning)
2. [“Teach Your AI to Think Like a Senior Engineer”](https://every.to/source-code/teach-your-ai-to-think-like-a-senior-engineer)
3. [“My AI Had Already Fixed the Code Before I Saw It”](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)
4. [“How Every Is Harnessing the World-changing Shift of Opus 4.5”](https://every.to/source-code/how-every-is-harnessing-the-world-changing-shift-of-opus-4-5)

And make sure you come to our [Claude Code Camps](https://every.to/source-code/how-every-is-harnessing-the-world-changing-shift-of-opus-4-5) and other events and courses. We’ll have more writing over the coming days and weeks on each step of this process, and how it’s changed engineering at Every and beyond.

---

***[Dan Shipper](https://every.to/@danshipper)*** *is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

***[Kieran Klaassen](https://every.to/@kieran_1355)*** *is the general manager of* ***[Cora](https://cora.computer/)****, Every’s email product. Follow him on X at [@kieranklaassen](https://x.com/kieranklaassen) or on [LinkedIn](https://www.linkedin.com/in/kieran-klaassen/).*

*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://writewithspiral.com/)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with [Cora](https://cora.computer/). Dictate effortlessly with* ***[Monologue](https://monologue.to/)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*For sponsorship opportunities, reach out to sponsorships@every.to.*

[Subscribe](https://every.to/subscribe?source=post_button)

## The Only SubscriptionYou Need to Stay at the Edge of AI

The essential toolkit for those shaping the future

"This might be the best value you  
can get from an AI subscription."

\- Jay S.

Join 100,000+ leaders, builders, and innovators

![Community members](https://every.to/assets/paywall/faces-2b72f553c10b6f8c7042928513f8254f0b1056a695678d112a1159bae5c7b86a.png)

Email address

Already have an account? [Sign in](https://every.to/login)

### What is included in a subscription?

Daily insights from AI pioneers + early access to powerful AI tools

[![Sparkle](https://every.to/assets/paywall/banners/sprakle-3998fd9303b988003a5309954a7076dddfdb2733858794d392e28fbcca4c3c6b.png)](https://makeitsparkle.co/every?utm_source=every&utm_medium=banner&utm_campaign=post) [![Spiral](https://every.to/assets/paywall/banners/spiral-5b5204442aabd7442c4d35939af9566671caff13573610cadd497ed0ddab2047.png)](https://writewithspiral.com/?utm_source=every&utm_medium=banner&utm_campaign=post) [![AI&I Podcast](https://every.to/assets/paywall/banners/podcast-2a814c7a5b3ff56c28761faa62c742c32cb1520fa566b531df77ec50c8d53576.png)](https://every.to/podcast) [![Every](https://every.to/assets/paywall/banners/every-d9e451afd583c762e86e9bb995d51423dbc50c6b733350c4984ec0cd142e4e28.png)](https://every.to/?utm_source=every&utm_medium=banner&utm_campaign=post) [![Cora](https://every.to/assets/paywall/banners/cora-4b38f5cb1f7eaeb1883e423ed3b8e32c7281492ac6bc07ed844e7041d924fe57.png)](https://cora.computer/?utm_source=every&utm_medium=banner&utm_campaign=post) [![Monologue](https://every.to/assets/paywall/banners/monologue-9588a08453ba803da385656a0902f3dd08bdfc34118f07d4460208c9b0d1b1df.png)](https://monologue.to/?utm_source=every&utm_medium=banner&utm_campaign=post)

Front-row access to the future of AI

In-depth reviews of new models on release day

Playbooks and guides for putting AI to work

Prompts and use cases for builders

Bundle of AI software[**Sparkle:** Organize your Mac with AI](https://makeitsparkle.co/every?utm_source=every&utm_medium=banner&utm_campaign=post)[**Cora:** The most human way to do email](https://cora.computer/?utm_source=every&utm_medium=banner&utm_campaign=post)[**Spiral:** Repurpose your content endlessly](https://writewithspiral.com/?utm_source=every&utm_medium=banner&utm_campaign=post)[**Monologue:** Effortless voice dictation for your Mac](https://monologue.to/?utm_source=every&utm_medium=banner&utm_campaign=post)

## Related Essays

## The Only SubscriptionYou Need to Stay atthe Edge of AI

Everything you need to thrive in the new economy