
## How To Build Effective Onboarding Programs For Junior Developers?

I argue that hiring juniors is something you should only do if you
know that you have people who are able and willing to mentor them.

If you do have the right people, the next step is to create a roadmap
of work. I usually say that the first thing to do is to write down
a step by step guide on how to get the local development environment
up and running. The goal is for the reader to have the right accesses,
configs and anything else they need to start working in place after
completing the list.

The juniors first task is to complete this onboarding guide. It will
give you as the mentor a good feeling for how comfortable they are
with the tools you are using in the project. If they struggle with
installing tools or following directions from the guide, you gain
insight in to what you will need to help them with.

Once the guide has been completed and the junior can work with a local
setup, you should give them a intro task. Pick something arbitrary
that is as easy as you can make it or pick something from the backlog.
The goal of this task is just to give the junior a small task that
will help them understand how code goes from their workstation in to
production. By the end of that first task, they will have experienced
how the teams workflow looks.

Observe the juniors comfort levels during this phase so you can spot
any areas of discomfort for them and take measures to prepare work
that will help them improve their understanding of those areas.

Finally, device your roadmap as a onion model where the junior starts
on tasks that are on the outer layers and by mastering work that require
less in-depth knowledge about the system, they "earn" the option of
working on tasks that are more complex until the reach the center of
the onion.

I am a big fan of using a gateway system of evaluation. The idea being
that you prepare a roadmap of tasks that get increasingly more complex
as the junior proves that they can handle the work.

## How To Optimize Codebases For Easier Onboarding Of New Developers?

I have a saying that I refer to when I design source code architecture.

I want the developers to feel like they are visiting a fast food restaurant.
The idea behind this is that fast food restaurants feel the same regardless
of where you visit them. They may differ to some extent but overall
you know what their menu looks like and what their interiors will
look like.

I design source code and in fact entire company strategies the same
way. My goal is to make each project feel similar, not exactly the
same, just similar.

The code architecture I use is done with the same mindset. I want each
folder of source files to feel similar to popular conventions.
Naturally, you can't perfectly replicate patterns from other projects
but the closer you can stick to patterns developers are familiar with
the less confusion you will usually end up with.

I have found that using a modular style of organizing my files works
best. I avoid using many of the styles commonly seen in projects.
The reason being that I want to let developers learn the system
gradually instead of having to understand all of it to start working.
If I spread out the logic needed to work on a single endpoint or UI
component, I am making it harder for the developer to figure out the
scope of the logic. However, if I put all the files needed for the
specific endpoint or UI component in the same folder, thereby centralizing
the code that is relevant, I remove the guesswork. I have also found
that it calms the mind of the developers since they feel they can make
changes to the code without breaking some unknown project wide architecture
they have yet to understand.

The best way I can describe the style is to think about third party
libraries. Each of them is just a folder of files. You know how to
import the code to your project and each of them have some exposed
entrypoint you can use.
For a backend module the controller with the urls and request handler
methods is the most natural entrypoint. For UI modules it is,
at least these days, the UI component you want to put on a a page.
You know you are on the right track if you can delete all the logic
needed by deleting the folder where the code is.

## What Are The Challenges Of Onboarding Developers To Complex Projects?

Almost always, I find that the main issue is that complex systems or
just very poorly made systems require the developer to know half the
codebase before they feel confident to change a variable name.

Sometimes we refer to this state as spaghetti code but I argue that
this terms is a poor choice here because code that is "bad" and
a system that simply has been architected in an complex fashion
can be equally responsible for developers having a tough onboarding.

This is a state that is potentially one of the worst states for a company
to be in. It means that hiring new people and getting them productive
is costly and losing trained staff can be catastrophic. If you want
know how to avoid this, I will sell you a book later that is at least
three times as expensive as this one.

The onboarding is a good way to, in a very coarse manner, get a
sense of how your systems form is looking. If your developer struggle
to teach others the system and new people struggle to deliver, you
may want to take this as a sign to take action before it gets worse.
