---
source: "https://archive.ph/9JHxX"
author:
  - "[[archive.ph]]"
"original source":
---
APA Citation: 

Description:


Tags:


### Or How I Paid $200/Month for an AI Coding Agent. I’m Never Going Back.

![scott cunningham's avatar](https://substackcdn.com/image/fetch/$s_!OEaC!,w_36,h_36,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f4a358d-6ee9-492b-8c5d-92a11d68396a_768x1024.jpeg)

scott cunningham's avatar

[scott cunningham](https://archive.ph/o/9JHxX/https://substack.com/@causalinf)

Dec 13, 2025

*I think this will be a multi-part series about using Claude Code because there’s too much to cover in one post. So this is part 1.*

## Introduction

I’ve been an economist doing empirical work since around 2005, when I started my dissertation for graduate school. I started grad school in 2002, that is, but the actual empirical work was with the National Longitudinal Survey of Youth 1979 and 1997, which is a difficult survey to start with due to the amount of cleaning and skip patterns you contend with — particularly for the questions about sex. It was a huge headache. I remember thinking one time, “would Adam Smith have gotten a PhD in basically recoding a bunch of 99999s as missing and doing a bad job at it?”

Anyway, I graduated in 2007 and have spent my career as an “applied microeconomist” (a name which is what we used to call ourselves when we didn’t have a very clear field). I studied risky behaviors: sex, sex work, abortion, drug policy (methamphetamine, psychedelics, which was both coherent but also a bit weird, and more recently suicide and mental illness in corrections using administrative data.

Anyway, being personal for a moment, I am not a multilingual person. Despite traveling to Europe for years, and spending my entire summers there, I still struggle to pick up languages. For instance, I took Italian in college. I studied abroad in Italy. I now go to Italy for three to four weeks a year and have done so for years. And I still cannot speak a lick of Italian, and have developed a bit of an inferiority complex about it and rarely attempt to other than really basic things needed to navigate vendors and friendliness.

And that carries over to coding.

I know Stata very well, like many economists my age. I have been *very* resistant to investing in learning R or Python. I’ve had to pick them up for specific projects, but always on a project-by-project basis, and I find the whole process dissatisfying. My dad picked up languages left and right, but I really don’t like to learn new ones. I don’t know why. I have stories I tell myself like how I have a tremendous amount of “perfectly good human capital in Stata”, but it has to be more than that because I know plenty of people who are like my dad and move between languages effortlessly, even happily.

I think some of this is latent ADHD stuff - I hate doing things I don’t truly *love* doing, and I love doing things I love doing. That sounds tautological — don’t all of us only love to do the stuff we love? But no, it’s pretty different when you have ADHD. I have always been either the best in my classes or the dead last in my classes all based on whether I was borderline obsessed with the topic. And it can even change over time, to the point I often ask myself, “I need to get this done. How do I make myself fall in love with this so I can do a job at it?” If you have ADHD of the “primarily inattentive” variety, you know exactly what I mean.

I’ve also historically struggled with keeping organized directories. Every empirical researcher knows that a clear directory structure is the necessary (though not sufficient) condition for doing *any* empirical work. Twenty years ago, I adopted what I thought were iron-clad rules: clear directory structures, naming conventions, version control, and so forth. Rules designed to anticipate coding errors, increase my productivity, and work better with coauthors, dealing with problems well before they ever happen by simply having a conceptual model of what a structured workflow *should* look like every time.

But inevitably, I make compromises. Projects take years. I coordinate with coauthors who have their own habits and styles. So what happens is that my directories slowly creep back toward the bad habits I was trying to avoid. Files like overall\_design.do versus msa\_approach.do. Various temp variables scattered around. A writing.tex file that gets dated and then copied instead of updated. And once it starts, it’s hard to stop.

---

So in this post, I want to explain something that has fundamentally changed how I work. And as I said in the italics at the top, I think this is going to be “part 1” in a multi-part series about using Claude Code for applied empirical work.

Three weeks ago - before and throughout my Thanksgiving holiday - I signed up for Claude Code and upgraded it quickly to $200/month. I told myself I’d cancel after trying it, just to see what I was getting into for a specific project. But I upgraded it to the $200/month because even though Claude Code is available on the $20/month option, you time out really quickly on any reasonable project — or unreasonable project. And I couldn’t afford to time out once I realized how good it was, and how truly transformative in my workflow it was becoming.

As an aside, one of the things that I notice is that my first impressions of something are basically pretty unreliable if all I do is just say what I will or will not do about some new thing that I find. I don’t know how people write reviews based on seeing a show for the first time, or listening to an album for the first time. I found a Facebook post from November 2010 recently. It came up on memories. And I looked at it and was stunned because even without naming the album, it went something like this:

> “I’m listening Kanye’s new album. It’s pretty boring.”

I was talking about My Beautiful Dark Twisted Fantasy, one of the greatest hip hop albums of all time, and an album I would listen to so repetitively that it was basically imprinted into the deepest parts of the architecture of my brain and heart over several years. It was an album that completely changed me and my musical tastes. And yet my first impression was that it was *boring*.

So in economics, there is this distinction that is made when it comes to expressing *preferences.* It happens in the context of surveys that try to extract preferences from answers to questions. There are people’s *stated preferences* and there are people’s *revealed preferences*. And stated preferences for me are those initial reactions about what I like. But revealed preferences are whether I *do something*. And no matter what I say I think about Kanye’s album, I listened to it about a thousand times over my life. Same goes for many many Smiths albums, Hamilton and tons of others. I have watched Silver Linings Playbook repeatedly, and Ted Lasso season repeatedly. I have only seen Ted Lasso season 2 once, and I have only seen Ted Lasso season 3 once. But I have seen Ted Lasso season 1 maybe 50 times. I don’t think I’ve ever watched something as many times as I did during Covid when I repeatedly watched Ted Lasso season 1.

My point is that I notice I like something only when I *do it*, not when I *say it*. And with Claude Code, I immediately noticed I was *doing it*. In fact, I was switching to doing it, and immediately adopting workflows and practices that made me convinced I was *probably never going to go back* to the old way.

What I’m saying is that it’s not just that I don’t anticipate canceling the $200/month. What I mean is that I actually think I **cannot** cancel it. I don’t think I can go back. I have to cancel something else to keep the budget neutral because I will never return to the old way, not even the old way of using generative AI to code.

But I need to explain what Claude Code actually is, because it’s *not* what you might think. It wasn’t what I thought anyway. It’s not like GitHub Copilot. It’s not like chatting with ChatGPT or Claude and copying code snippets back and forth. It’s not like Cursor best I can tell.

Claude Code is what’s called an “AI agentic” approach. It is probably the second agent I have used intensively after “Deep Research” on ChatGPT (which I rarely use now). Claude Code **lives** inside my local directories. It reads all of my files in there once I invite it there. It writes my files. It reorganizes my directories. It moves things. It operates off the backbone of terminal, and the actual software itself, like R, python and yes — Stata — none of which require using the actual GUI. It runs my code. It sees the errors even as it is reading the entire project’s contents. It fixes them. It runs them again. It effortlessly takes my old code, spread over many files, and consolidates. It replicates the old findings, it finds ways of building in redundancies to ensure I’m not messing things up. If I tell it to keep a running log to help me study the changes, it does so.

This is sufficiently different from “traditional LLM approaches to coding” (i.e., vibe coding) that I think it requires its own explanation. That’s what this post is.

First, I’ll describe how generative AI coding worked for me *before* Claude Code. It was helpful. I was learning to use Python and R more expressively, and even Stata was getting faster. But then I’ll explain Claude Code, and why it represents something categorically different.

---

## Generative AI-Based Coding: The “Vibe Coding” Era (2023 to 2025)

For the past two years, I’ve been using ChatGPT and Claude interchangeably to help me code. It was helpful. It felt like constant collaboration. I’d describe what I wanted, get code back, paste it in, run it, hit an error, copy the error back, get a fix, paste that in, run again. People call this “vibe coding” - you’re kind of feeling your way through, with the AI as a conversational partner. The human was necessary in the loop, but I was definitely getting assistance and was going much, much faster.

And it worked. I was learning Python and R more expressively. Even my Stata was getting faster because I could ask for idioms I didn’t know.

But there were problems.

Since projects still take a long time - weeks, months - and I was chunking the work into conversational sessions, those chunks would start to become redundant. There would be repetition, unnecessary things to do but not easily things I could see myself doing. The AI might suggest something in week three that contradicted something from week one. Or it would add code that wasn’t necessary anymore. Fixing these issues was hard, because I often didn’t quite know how I got to where I was. The AI didn’t know either because each session started fresh.

The deeper issue, I think, is *attention*. I don’t mean the attention mechanism inside transformers as in “Attention is all you need”. I mean human attention. The kind of attention problems that someone with ADHD has, and the hyper-attention super power that a person with ADHD also has. It was breaking even the hyper-attention, which was like I said the mutant power of any person with ADHD.

Coding historically demanded my attention — my intent focus. I had to hold the structure of not just my program, but my entire project, almost like a web spread over mental pictures of directories and structures in my head. That alone was hard for me because I struggle with visualizing things in my mind. My mind is better at remembering *feelings*, *stories*, *words* and *descriptions.* But I struggle to *see images* in my mind because of this [aphanasia](https://archive.ph/o/9JHxX/https://www.newyorker.com/magazine/2025/11/03/some-people-cant-see-mental-images-the-consequences-are-profound) stuff I seem to have.

But you can come up with excuses, and it doesn’t matter, because if I’m going to do work, I have to come up with life hacks that work around these problems, play to my strengths, and downplay my weaknesses. I had to understand what each piece did and how it connected to the larger whole, even if that kind of web-based interlocking picture of spokes and wheels and so forth I literally cannot see in my mind. But I can do it — I know how to get there and it’s through *hyper attention*, and since I love causal inference, and I love econometrics, and I love working with data, I knew how to do it, and got good at it — it just relied on a lot of muscle memory.

Well, vibe coding uses almost no attention. You’re just prompting and pasting. It doesn’t matter what it *feels like* when you’re vibe coding, which it can feel like you’re flying. You’re really not flying if you have ADHD — it’s more like you’re in a VR helmet feeling like you’re flying, but take it off, and you won’t remember much of it. Which is a problem. Or can be if you don’t solve it. So a lot of my side gig with coding using gen AI has been coming up with hacks that can re-engage my hyper focus.

I’ve written about this before, but I think generative AI in general - since it reduces the time inputs needed to accomplish cognitive tasks - creates a problematic tradeoff. Time is essential to both learning and attention. When you compress the time because the isoquants for producing cognitive output have become linear between Machine Labor and Human labor, you easily lose both learning and attention *despite completing tasks*. What I noticed with vibe coding was that I could reach very high places of productivity and then just... have no idea where I was. How did I get here? What does this code actually do? Why is it throwing this error? The “attention problem” became a real issue.

And the other thing is: generative AI-based coding is still not *agentic* coding.

I still have to run the code. The AI sends me a telegram saying “do it this way,” but I’m the one who pastes it in and hits execute. And I can’t use it to reorganize anything locally. I can’t ask it to clean up my directories, consolidate redundant files, or trace dependencies across scripts. I could obviously screen shot things, but that’s not the same. The only exception is using the Python interface within ChatGPT to do stuff - but that’s always for trivial things. You can’t actually analyze real data. I mean, technically you can, but only an insane person would upload their research data to a chatbot.

So I was stuck. Vibe coding was better than no AI, but it still felt like I was doing most of the work, just with better autocomplete.

## Then I Found Claude Code (November 2025 -???)

For a project I was working on recently this semester, I kept seeing references to “Claude Code.” I didn’t know what it was. I assumed it was just “coding with Claude” - which is what I’d already been doing. I assumed it was the common belief that many have which was that Claude > ChatGPT when it comes to coding, by which someone means just that generative AI based coding practice that I been doing since March 2023.

But it wasn’t. It seemed like a distinct product. I couldn’t figure out what it actually was until I found where it lived: inside a toggle on the Claude interface, where you move from the generative AI chatbot conversation to something called “Claude Code.”

When I switched over, I realized this was something categorically different.

### What Makes Claude Code Different

This is the interface of Claude Code and this is where you find it on your desktop app. It’s in a toggle on what I call the “table of contents button” top left. You have to toggle the switch to go from gen AI chatbot to Claude Code.

![](https://substackcdn.com/image/fetch/$s_!fZWa!,w_1272,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F206d2032-5144-48c4-be38-b0c4a693f265_4300x2388.png)

The first thing Claude Code does when you start a session is select a folder (see that menu button beneath the little bug icon) which then causes it to start a new session where it is now living inside that local directory (or on GitHub) and **only** in that local directory. It then reads that local directory, if that is even the right word. It’s less reading than it is “speed reading” or “becoming”. It’s very unusual what happens once you pick that folder.

Like I don’t mean reading as in metaphorically. Literally. It scans all the files in the main directory and all its branches in the subdirectories. **All of them**. It sees your folder structure. It reads your scripts, your data dictionaries, your READMEs, your old code. It absorbs the *context* of your project before you’ve said a single word.

This is the start of the fundamental difference between “vibe coding” and Claude Code. In regular chatbot coding, the AI knows nothing about your project. You have to explain everything, paste in code snippets, describe your file structure. Every session starts from zero. Maybe something might seem close to this in Github Copilot, but I don’t think so. Because this is a robot becoming one with the folder, not just suggestive gen AI coding.

In Claude Code, the AI *already knows*. It’s sitting inside your project directory. When you ask “why is this script failing?”, it can go read the script. When you say “update the analysis to include 2024 data,” it knows where your analysis lives. It knows where the code is. It doesn’t matter what format it is stored in. It can read all the columns. You can say “is there *anything* in this dataset like what I am looking for? There are too many columns and I think I am missing something” and it answers that. It’s not an RA. It’s like an enlightened, extremely helpful, robot.

### The Tools

Claude Code isn’t just a chatbot with file access. It has a specific set of tools it can use:

- **Read**: Opens and reads any file in your directory - code, data, documentation, images, PDFs
- **Write**: Creates new files from scratch
- **Edit**: Makes targeted changes to existing files (find X, replace with Y)
- **Bash**: Executes terminal commands - run scripts, install packages, git operations, anything you’d type at a command line
- **Grep**: Searches for patterns across your codebase (”find every file that references this variable”)
- **Glob**: Finds files by pattern (”show me all.py files in the src folder”)
- **WebFetch**: Retrieves content from URLs
- **WebSearch**: Searches the web for documentation, error messages, solutions
- **Task**: Spawns sub-agents to handle complex multi-step operations in parallel

The key insight is that these tools *execute*. When Claude Code decides to run your Python script, it actually runs. It sees the output. If there’s an error, it sees the error. Then it can edit the file and run again. The iteration loop that used to require me to copy-paste back and forth now happens automatically.

### The Directory Is Everything

When I start a Claude Code session, the very first thing that happens is it reads a file called CLAUDE.md if one exists. This is a markdown file where you can put persistent instructions: “This is a research project on X. The main analysis is in code/main.R. Data lives in data/raw/. Here are the coding conventions we use.”

Then it scans the directory structure. It sees:

![](https://substackcdn.com/image/fetch/$s_!oZgz!,w_1272,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41c1d7e0-62e9-4ab9-a2f0-e139cf65a563_548x479.png)

And it *understands* this. When I say “the cleaning script has a bug,” it knows I mean code/cleaning.py. When I say “add a new figure to the paper,” it knows the figures come from code/figures.py and the paper is writing/paper.tex.

This sounds simple, but it changes everything. The AI isn’t just answering questions about code in the abstract. It’s working on *my actual project*, with full knowledge of how that project is organized.

## What’s Next: A Multi-Part Series

There’s too much to cover in a single post. What I’ve described so far is just the foundation - what Claude Code *is* and how it differs from the vibe coding I was doing before.

But the real story is in the use cases. Over the past three weeks, I’ve used Claude Code for tasks I never would have attempted before. Each one deserves its own treatment, so I’m making this a multi-part series.

Here’s what I have planned in this series and coming next:

- **Part 2: “The Attention Problem, Part 1: Group-Based Workflows”** - How Claude Code changes collaboration with coauthors. Using CLAUDE.md files and auto-generated summaries to keep distributed teams aligned. The AI as the “always available” team member who can bring anyone up to speed. Ways that me and my coauthors can work together, learn as we go, and not fall into the attention trap.
- **Part 3: “The Attention Problem, Part 2: Individual-Based Workflows”** - How Claude Code compensates for my own attention challenges. Session continuity, checkpoint summaries, todo tracking. The AI as extended working memory for people who struggle with context-switching. How I am trying to avoid the attention trap when working alone.
- **Part 4: “Case Study: Machine Learning and NLP in Python”** - Building a 4-way text classifier from scratch in a single session. From idea to 99% accuracy model in two hours. What I actually did vs. what Claude Code did.
- **Part 5: “Case Study: Scraping the Web”** - Building an async web scraper with rate limiting, checkpointing, and error handling. 289,000+ records collected while I did other work. The iteration loop that would have taken me a week, done in hours.
- **Part 6: “Case Study: Organizing Old Projects”** - Using Claude Code for code archaeology. Finding duplicates, tracing dependencies, consolidating years of accumulated mess. Cleaning up directories without fear.
- **Part 7: “Case Study: Building Presentation Decks”** - Writing a 69-slide Beamer presentation for a Fed talk. Claude Code handles LaTeX formatting while I focus on content. Adding slides mid-conversation based on questions that come up.
- **Part 8: “The Learning Curve and the $200 Question”** - Honest assessment of what’s hard, what takes getting used to, and whether the cost is worth it. Who should pay for this and who shouldn’t.

That’s at least seven more posts. I’ll be writing them as I continue using Claude Code on real projects - so the case studies will keep accumulating.

Stay tuned.

---

*This is Part 1 of a multi-part series on Claude Code. Subscribe to get the next installments.*

Scott's Mixtape Substack is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.