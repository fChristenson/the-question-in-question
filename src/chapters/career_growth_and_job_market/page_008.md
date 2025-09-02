## What To Do When You Can’t Make Progress On A Project?

I suppose that depends on what the nature of the blockage is.
After all, if you find it hard to solve a bug your approach
will be different than if you have a problem figuring out
how to write the code you need. There are naturally more ways
than these to get blocked but for the sake of argument I will
try to focus on these two.

When I am stuck on a bug I find the simplest way to figure out
how to solve it is by trying to isolate the area where the issue
is. This often just means that I try to replicate the bug on
my workstation. Once I can replicate the issue I start by checking
what the state of the system is just before the problem occurs.
You can almost think about it as how you would handle a function.
There is some input of data and I just want to know what it is
before I look at the details of the logic.

Once I know what the state is I want to find where the unexpected
result happens. This usually means that I allow the program to run
until the error has happened. Now I have a area to investigate.

Once I have an area I start going either forward or backwards in
the logic until I can narrow down where the problem is.
The process is very similar to how you use a debugger to slowly
go through each step of the program but you don't need one to
do it. It does speed things up I find though but I am known to
be too lazy at times and just use simple log statements.

The general idea is applicable when I get stuck on a feature I need
to develop. I try to remove the things I am unsure about how to do
and focus on what I know the code has to do. So I start small.
This approach fits pretty well with Test driven development and
I use this approach at times to slow down the development process
for myself. It helps a bit to write tests in cases such as these
since the test almost become like a checklist of functionality.

Once I know what parts of the feature I can handle I start trying
to make a first version of the implementation. Once I am happy
that the part I know how to do works I start with the next
requirement on the list. I keep going until I hit something
I am unsure about. With a bit of luck and a fair bit of Googling
skills, I often find that when I have segmented out implementation
details from the feature so I can just focus on simple base cases,
I often find it easier to solve my problem.

True to the "Divide and conquer" methodology, I suggest
you try to simplify your problems and solve many small
problems in iteration rather than try to tackle them
all at the same time. When you get really good at it
this becomes almost like a superpower. You learn that
you can build almost an entire feature without having
all the details upfront because you have learned how
to use mocks, interfaces and other methods for isolating
parts you don't know from parts you do know how to do.
Your stakeholders will love the fact that you can work
and get almost done when specific details may be delayed
due to scheduling issues. Once you get the details you can
just plug them in to the working code and this has been a
massive help to me many times.  

## How Should Developers Handle Disagreements With Managers?

Usually I approach all my disagreements the same way regardless
of who I am disagreeing with. First I make sure that I am
emotionally detached from the topic or at least enough so I
can keep calm during the discussion. This is a key thing since
if you get too emotionally involved it gets harder to argue your
points well and it can become dangerous if you create friction
with people who have authority over you.

My personal favorite is to picture myself as a rock on a beach.
Just laying there year in and year out. There may be rain or
there may be sun, doesn't matter to me, I am just a rock.
Living my best life as all rocks should.

Next, I suggest you learn how to communicate using "I feel"
statements. This helps you formulate your thoughts in a manner
that comes off as calm and collected. At all points try to
converse in a non-hostile manner. Saying something like
"I feel that this approach may be less effective than if we
tried mine.", will usually go over better than, "No this
idea is shit. I have a better one."
By starting the argument with "I feel" you force yourself
to argue from your point of view and you remove an unintended
assumptions you may otherwise have. The assumptions I am referring
to is when you assume that what you believe is the correct
viewpoint. This is a way for you to make sure that the other
person understands that you are not assuming how they feel,
you are just stating how you feel about the subject.

Now that I know that I can calmly express how I view the subject,
it is time to present my arguments for my idea. I do this by adopting
my company persona "Donkey". Smile, polite tone and speak as if I am
helping a restaurant customer pick their dinner.

Once I have presented my view I almost always end with these words.
"This is of course just how I look at it and perhaps you feel differently."
This messages my peer in the argument that it is time for them to
step in and continue the conversation. What I want is a nice flow
to the conversation. A good flow builds comfort and reduces the chance
of unnecessary escalations. The last thing I want is to get in to a
shouting match over who is the most right with someone. What I think
in private, that is my business but at work I want to be "Donkey".

This process goes back and forth until both sides have presented their
views to the satisfaction or boredom of the group, now comes the time
to move forward. Usually you will find some common ground and the best
case is if you get the benefit of doubt from your peers so they are
fine with trying your approach. I usually say that if it is too hard
to sell a big idea, sell a small one to try out so we can see if we
like it. This is easier to argue for and gets the same results.

My last tip, pick your battles. There is no point in winning an
argument if you end up losing your job over it. Stand up for
yourself and be who you are but don't let pride get in the way.
You may be right about everything you say but sadly you live in
a world where people a lot less intelligent, good looking and
above all else humble get their way even though they are wrong
about everything.

---

### Navigation

[Next Page](career_growth_and_job_market/page_009.md)
