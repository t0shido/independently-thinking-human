-- Clean existing data first
TRUNCATE public.articles_tag_articles CASCADE;
TRUNCATE public.articles_tag CASCADE;
TRUNCATE public.articles_article CASCADE;
TRUNCATE public.articles_section CASCADE;

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: articles_section; Type: TABLE DATA; Schema: public; Owner: toshi
--

INSERT INTO public.articles_section VALUES (1, 'Technology', 'technology');
INSERT INTO public.articles_section VALUES (2, 'Health', 'health');
INSERT INTO public.articles_section VALUES (3, 'Politics', 'politics');
INSERT INTO public.articles_section VALUES (4, 'Mindset', 'mindset');
INSERT INTO public.articles_section VALUES (5, 'Stories', 'stories');
INSERT INTO public.articles_section VALUES (6, 'Economics', 'economics');


--
-- Data for Name: articles_article; Type: TABLE DATA; Schema: public; Owner: toshi
--

INSERT INTO public.articles_article VALUES (6, 'Through the Eyes of Story', 'through-the-eyes-of-story', 'Toshi', '2025-06-16', 'Stories act as bridges connecting us to ancient wisdom, helping us navigate both facts and meaning in our complex world.', '



Let''s start with something simple. A tree. Scientifically speaking, a tree is a structure made of atoms—carbon, hydrogen, oxygen. Its roots dig into the earth, pulling up water and nutrients. Its leaves stretch toward the sun, turning light into energy through photosynthesis. Its bark protects, its branches stretch out, and its rings quietly count the years.

That''s what a tree is.

But that''s not all it is. A tree can be a giver of fruit, a place to rest, a roof in the rain. Its fruits feed us. Its wood shelters us. It shades us when we''re tired. That''s what a tree means.

We''re constantly living in two overlapping realities. One is the world of facts—the world of what things are. The other is the world of meaning—what things mean to us. Science is how we understand the first. Stories are how we make sense of the second. One gives us knowledge. The other gives us wisdom, purpose, and guidance—how to live, what to care about, how to act.

Together, these two layers form our frame of reference—the invisible lens through which we see everything. You didn''t create this lens from scratch. You inherited it—in ways both seen and unseen. Some parts come from biology—your body, your instincts, your nervous system, the way it reacts to fear, love, or safety. Others come from religion, tradition, language, and culture—beliefs and values.

And the vehicle through which beliefs, values, and wisdom have been passed down for generations is stories—both told and written. Long ago, before books existed, people gathered around campfires, sharing stories aloud. These spoken tales were woven into the fabric of community life, teaching lessons, preserving history, and passing on guidance from one generation to the next.

Today, many of those stories have been captured in writing—preserved in books, scrolls, and digital pages—so they can reach even more people across time and space. Stories carry the weight of ancient knowledge, acting as living bridges that connect us to the insights and experiences of those who came before. Passed down through generations, they carry the truths our ancestors discovered—not just about the world, but about our place in it.

Even in a world of constant change, some things remain: the need for bravery, the bond of friendship, the quiet guidance tucked into old stories. And among all the stories we''ve ever shared, one stands out—appearing again and again: The Hero''s Journey.

It''s a story told for thousands of years, and yet it still feels personal—like it''s about us. The timeless journey of someone stepping beyond the familiar, facing trials, encountering mentors and monsters, being transformed through struggle, and eventually returning home changed.

We see it in sacred stories: Jesus stepping away from his old life, enduring hardship and crucifixion, and rising again—bringing hope and new wisdom to the world. Similarly, Buddha walking out from his sheltered palace, witnessing suffering, meditating beneath the Bodhi tree, awakening, and returning to guide others toward peace.

We find it in the stories we grew up with—Cinderella stepping beyond the safety of home, facing hardship and magic, and ultimately discovering her true worth; and Simba, beginning as a frightened cub, growing through loss and adversity into a brave king who embraces his destiny. And we find it in the stories that move us today—Harry Potter, The Lord of the Rings, Star Wars—where the Hero''s Journey plays out again and again: a young hero leaving home, facing darkness, finding friends and mentors, and returning transformed, ready to share newfound strength.

We''re drawn to them because, in some way, they''re our story. We all leave the comfort of what we know. We all confront challenges we never asked for. And if we''re fortunate, we come out stronger. This story echoes through every chapter of our lives—our lifetime a vast journey, made up of countless smaller ones, each filled with its own challenges, companions, and turning points.

Every time we return, we do so changed—wiser, stronger, more whole. And when we do, we bring something back with us: a story to add to the world.', 'stories/stories_one.png', 5);
INSERT INTO public.articles_article VALUES (8, 'Caught in a Vicious Loop', 'caught-in-a-vicious-loop', 'Toshi', '2025-06-07', 'Exploring how our modern monetary system creates an endless cycle of debt and why the current structure may be unsustainable.', '# Caught in a Vicious Loop

Picture yourself in a bustling market in Marrakech, where goods are exchanged with a simple gesture of trust, using tokens that hold value only because everyone agrees they do. Now, envision those tokens as invisible—mere numbers in a computer, created by someone far away, with nothing tangible backing them. Strange? Yes, but this is the reality of money today.

  

For much of history, money was something tangible: coins, precious metals, or banknotes backed by gold. This physical connection instilled confidence. However, in the early 1970s, everything changed. The gold anchor was cut loose, and money became "fiat"—a term meaning it holds value because a government asserts it. The weight of gold was replaced by the weight of trust. But how much can we really trust this system?

  

Now, imagine a central bank: a quiet room, fluorescent lights humming, and a keyboard. A few taps, and billions come into being—not mined, not earned, just… written. No smoke, no mirrors, just code. Yet these keystrokes ripple across the world, shaping economies, funding wars, and fueling empires.  It feels surreal-money created with no labor, no trade, no production. Just numbers appearing on a screen, yet somehow shaping the real world.

  
But there''s a catch. The money isn''t gifted—it''s lent, every unit born as a liability. Since each dollar must be paid back with interest, but only the original amount is issued, the system is always short. There will always be more debt that money in the system. And the debt is growing with every time money is borrowed. It''s like running a race where the finish line keeps moving—just out of reach, no matter how fast you go.
  


More borrowing is needed just to repay what''s already owed and to keep the system running—because when debts are repaid, that money vanishes from circulation. In other words, paying back loans doesn''t just settle debts—it actually removes money from the economy. So to keep money flowing, new loans must be taken out constantly, or else the system runs dry. The system constantly needs new fuel. It''s like pedaling a bike uphill with no brakes: stop, and everything rolls backward.To keep momentum, governments borrow more, spend more, and justify it through crises, interventions, or grand initiatives—anything to keep the wheels turning. They don''t want you to understand how the system truly works, because if you did, the entire scheme would unravel.

This is why crises and conflicts seem endless—they''re not just unfortunate events, but necessary features of the system. War, disaster, and emergency spending become the rationale for more money creation. But each round of printing fuels inflation, which erodes purchasing power, breeds inequality, and eventually stirs unrest. And when unrest grows, it often leads—once again—to war.
  

We are, perhaps, passengers in a car speeding toward a cliff. The engine? Inflation, driven by relentless printing. The road? A narrowing track of trust and hope. To stop printing is to stall the vehicle entirely—no more money, no more movement. But this isn''t a gentle stop; the car doesn''t just slow down—it explodes. Without new borrowing, the system collapses under its own weight. To continue is to accelerate, hoping we somehow take flight before the edge.

The question now is: How have we let it go this far? Who is actually gaining from this system? And is there a way out?

  

The first step in solving any problem is recognizing there is one. Maybe that''s a good place to start.', 'economics/economics_two.png', 6);
INSERT INTO public.articles_article VALUES (1, 'Into Uncharted Territory', 'the-invisible-revolution', 'Toshi', '2025-03-17', 'How the tiny transistor transformed humanity and accelerated us into an uncertain technological future.', '# Into Uncharted Territory

Take a moment and look around you. Your phone, your laptop, the Wi-Fi router in the corner. The traffic lights outside, the plane flying overhead, the smart fridge humming in the kitchen. All of it—every single piece of modern technology—exists because of something so small you can''t even see it.

The transistor.

It''s the unsung hero of the digital world, the tiny switch that turned us from an analog civilization into a hyper-connected, information-driven species. And yet, most of us have never even thought about it.

But what does it do?

You''ve probably already heard that computers use a binary system of just zeros and ones. This is where transistors come in. Since a transistor can switch on and off, it can represent a one when it''s on and a zero when it''s off—the basic building blocks of all digital information. But a single transistor isn''t enough to do much. When you connect many transistors together, they form logic gates, which are tiny circuits that follow simple rules to make decisions.

A logic gate is like a tiny decision-maker inside your computer. It takes two inputs—zeros or ones—and decides the output. Some gates only turn on if both inputs are on, like a door that opens only when two people press a button. Others open if at least one input is on. Some simply flip whatever they get, turning a one into a zero and vice versa, like a switch that always does the opposite.

Now, imagine millions of these tiny gates working together in perfect harmony. They can add numbers, store information, and even make decisions. This is how computers "think"—not in words or images, but in patterns of ones and zeros flowing through billions of transistors every second. From this simple switching system, the digital world—our phones, the internet, artificial intelligence—has been built. It all starts with something so small, yet so powerful.

Since the invention of the transistor, something extraordinary has happened—technological evolution hasn''t just progressed, it has accelerated. What once took centuries to change now happens in a matter of decades, even years. The first computers were massive, sluggish machines that could barely process basic calculations. Today, the smartphone in your pocket has more power than the supercomputers of the past. But we''re not just advancing—we''re advancing exponentially.

Every new breakthrough builds upon the last, pushing us forward at an unimaginable pace. Artificial intelligence is no longer a distant vision—it''s here, learning, adapting, and reshaping industries in real-time. Blockchain is challenging the way we think about money, contracts, and trust, creating decentralized systems that could upend traditional institutions. And quantum computing, still in its infancy, promises to shatter the limits of what classical computers can do, solving problems that would take today''s most powerful machines millennia to compute.

We are no longer in an age of slow, predictable change. We are in the middle of a technological explosion, a moment in history where everything—from how we work to how we think—is being rewritten at lightning speed.

Technology is neither good nor bad—it''s just a tool, and its impact depends on how we use it. It has helped us solve some of humanity''s greatest challenges, but it has also brought new risks, uncertainties, and problems.

With rapid progress comes disruption. The world already feels unstable, and while many factors contribute to this, the speed of technological change is undoubtedly one of them. We''re venturing into uncharted territory, reshaping how we live, work, and connect. But instead of slowing down, the pace of innovation is only accelerating.

If history has proven anything, it''s that humans are the ultimate adaptation machine. We haven''t just survived—we''ve thrived—because of our ability to embrace change. Think of those who have endured the harshest conditions: the Arctic cold, the blazing desert, the dense rainforest. No matter how extreme the environment, we''ve always found a way to live, innovate, and make it home.

We''ve overcome every challenge nature has thrown at us—ice ages, droughts, famine, wars—always finding a way to survive. But this time, the challenge is different. It''s no longer just about endurance; it''s about keeping up with a future that is shifting faster than ever. Will we figure it out, or will the speed of our own inventions leave us struggling to catch up?', 'technology/technology_one.png', 1);
INSERT INTO public.articles_article VALUES (5, 'Finding Direction', 'finding-direction', 'Toshi', '2025-03-14', 'How our connections to others and to something greater than ourselves help us find meaning and direction in life.', '# Finding Direction

Look at a single carbon atom. Small, invisible, unremarkable. On its own, it drifts without purpose. But when it bonds—when it connects with others in a structured, unbreakable network—it becomes something extraordinary. A diamond.

Diamonds are among the hardest natural substances on Earth. Not because of what they are made of, but because of how they hold on to one another. Each carbon atom reaches out in four directions, reinforcing its neighbors, forming a lattice so strong it can withstand immense pressure without breaking. Compare that to graphite, where the same atoms are loosely layered, fragile, ready to crumble with a touch. Here, strength and fragility are not about the pieces themselves, but how they come together.

Isn''t humanity the same? Each of us is a single node in a vast, intricate network. Alone, we are vulnerable—easily shaken, easily lost. But together? We build cities, cure diseases, explore the universe. We push forward, not as isolated beings, but as a species. We are bound to one another, whether we choose to see it or not.

This connection isn''t just between people—it stretches across all of nature.

Every living thing is part of something bigger. Trees share nutrients through hidden underground networks. Oceans shape the air we breathe. Even the tiniest creatures help keep the world in balance. Nothing exists on its own.

The more we see this, the more we understand our place in it. Finding meaning starts with recognizing that we are all connected.

When we look at people who seem to live with deep purpose, a pattern emerges. First, they dedicate themselves to mastering a skill—sharpening their craft, expanding their knowledge, pushing their limits. Then, they use what they''ve built to serve something greater. Some heal diseases, bringing hope to families who once had none. Others stand up for nature, protecting forests, oceans, and creatures that cannot fight for themselves. Artists and storytellers move us in ways words alone never could. Teachers spark curiosity. Engineers build bridges—both physical and metaphorical—connecting people and ideas. Activists risk everything to stand against injustice. Everywhere, in ways big and small, people choose to contribute—to strengthen the world rather than simply move through it.

When we witness this—someone fully immersed in meaningful work—it strikes something deep within us. We don''t just observe it; we feel it. It stirs something raw, something powerful. It moves us. It inspires us. It reminds us of what''s possible when a person chooses to grow, to contribute, to lift others up.

And this isn''t just their path—it''s a call to all of us. It''s a responsibility. The stronger we become, the more we can offer. The more we learn, the more we can give. Our growth isn''t just for us—it ripples outward, shaping the world in ways we may never fully see.

But how do we find our own path? How do we specify our purpose?
And once we do—what gives us the fuel to persist?

One way is through struggle. Hardship has a way of revealing what truly matters to us. The things that break us, that leave scars, often point toward the work we feel called to do. Those who have suffered deeply sometimes find purpose in easing that same suffering for others.

But no matter where your purpose comes from, what keeps you going isn''t just discipline or willpower—it''s a deep connection to something meaningful. When you truly care about what you''re building, who you''re helping, or what you''re fighting for, that passion becomes fuel. Even in moments of doubt or exhaustion, that connection pulls you forward.

Once you begin to understand your purpose—whether it emerges from your struggles, your passions, or the impact you want to have—it becomes more than just an idea. It becomes a direction.

And direction changes everything.

Purpose gives you an aim, and having an aim is what makes positive emotion possible.

Think of it like walking toward a distant light in the dark. As long as you can see where you''re going and you''re moving forward, you feel a sense of progress, of meaning. But without a destination, you''re just wandering—every step feels uncertain, and the world starts to feel empty. That''s why being lost is so painful. It''s not just confusion; it''s the feeling of standing still while everything else moves around you.

When you have something to aim for, even the smallest step in the right direction feels good. And when you drift away from it, you feel it too—like an internal compass pulling you back. Without an aim, there''s no direction. And without direction, positive emotion has nowhere to grow.', 'mindset/purpose.png', 4);
INSERT INTO public.articles_article VALUES (7, 'Dawn of a New Order', 'the-rise-and-fall-of-empires', 'Toshi', '2025-03-04', 'How economic power shifts throughout history, and what the current warning signs tell us about the future of the global economy.', '# The Rise and Fall of Empires: Economic Cycles That Shape History

Imagine waking up one day to find that the money in your wallet is worthless. The same dollars that once ruled the world are now just pieces of paper, no more valuable than a child''s drawing. It sounds like a nightmare, but it has happened before. The Spanish Empire flooded Europe with silver, causing massive inflation that drained its wealth. The Dutch guilder lost its dominance as Britain rose to power. The British pound, once the world''s reserve currency, fell after WWII, replaced by the U.S. dollar. No empire stays on top forever. Every great power has its time in the sun before it fades into history. And right now, it seems, we''re living through one of those turning points.

Long ago, before money existed, people traded what they had—grain for cloth, livestock for tools. But trading like this was messy. What if you needed shoes, but the shoemaker didn''t want your apples? So, we created money—a universal language of trade. Gold and silver became the chosen standard, something everyone agreed had value. Carrying gold was dangerous, though. You could be robbed, and who wants to carry around heavy coins everywhere? That''s when banks stepped in, giving people paper receipts for their gold—an early form of money. Over time, every country built its own banking system, and the most powerful nation''s currency became the world''s standard. Today, the U.S. dollar is the world''s most powerful currency. But history shows that no currency, no empire, stays on top forever.


Great nations rise and fall in a predictable cycle. It begins with struggle—people work hard, innovate, and build strength. Prosperity follows, bringing wealth, power, and comfort. But "Hard times create strong men. Strong men create good times. Good times create weak men. And weak men create hard times."

  

Comfort breeds complacency. Hard work fades, entitlement grows, and debt piles up. To sustain the illusion of wealth, governments print money, weakening the currency. The rich get richer, the poor struggle, and divisions deepen. Meanwhile, rising rivals grow stronger. As economic cracks widen, unrest spreads, and faith in the system crumbles. Eventually, the empire collapses, and a new power rises. 
  
So, where are we now? The United States still leads the world. The U.S. dollar remains the most powerful currency, holding everything together. But beneath the surface, warning signs flash like red lights on a dashboard. Debt is at an all-time high. Inequality is growing. The government prints money at an unsustainable rate. And rising powers, like China, are gaining strength—just as America did before it overtook Britain, just as Britain once grew to surpass the Dutch, and just as the Dutch had risen to challenge the Spanish.

  

History moves in cycles. Every empire believes it will last forever, yet none ever do. The warning signs are always there, but those in power refuse to act. The same story has played out again and again: a nation rises, reaches its peak, and then slowly crumbles under the weight of its own success. And with it, the global economy collapses and the world is forced to adapt to a new order. 
But what will this new order look like this time? And how long will the transition take? Or will the U.S. find a way to innovate and stay on top?', 'economics/economics_one.png', 6);
INSERT INTO public.articles_article VALUES (2, 'The Cornerstone of Politics', 'the-cornerstone-of-politics', 'Toshi', '2025-02-22', 'An exploration of how the dynamic tension between liberal and conservative mindsets creates the essential balance that keeps society moving forward sustainably.', '# The Cornerstone of Politics

Imagine you''re walking across a frozen lake. The ice beneath your feet is cracking, slowly breaking apart. Behind you, the ice is melting, vanishing into the past.

In front of you, the lake stretches on—but the ice looks thin. Unstable.

You have no choice but to keep moving forward, carefully shifting your weight, hoping the next step will hold. Move too fast, and you might misstep. Freeze in place, and you''ll sink with the ice beneath you.

This is what life feels like. This is what society feels like. We are constantly caught between what we know and what comes next—between order and chaos, tradition and progress, stability and change. And the only way to move forward without falling through is to find balance.

People approach this balancing act differently. Some move carefully, testing each step before they commit. Others take bold strides, willing to risk a fall for the chance to leap ahead. Some of us value discipline, structure, and careful planning. We make sure what we build is strong, that traditions are preserved, and that progress is measured, not reckless. Others are drawn to new ideas, innovation, and change. We see possibilities where others see risk. We push boundaries, challenge old ways, and imagine futures that don''t yet exist. These instincts don''t just shape individuals—they shape entire societies.

The same fundamental difference exists in politics. Those who move carefully, valuing structure and stability, tend to be more conservative. They keep one foot firmly planted on solid ground, ensuring we don''t move too fast or break away from structures that have held us together. Those who reach forward, eager to explore and experiment, tend to be more liberal. They are the ones who search for new ground, pushing into the unknown, willing to take risks in the hope of finding a better path. And just like walking across a frozen lake, we need both feet.

If we only planted our feet firmly in what we know—never reaching for something new—we''d be stuck, frozen in place, eventually sinking with the ice beneath us. If we only reached forward—never grounding ourselves in what is stable—we''d take reckless steps, risking collapse with every move. Both mindsets exist for a reason, and the tension between them is what keeps a society from either collapsing in chaos or rotting in stagnation.

But there is no universal answer. The best way forward depends on the political landscape beneath us. If society is unstable, divided, or chaotic, conservative policies that reinforce structure and order might be necessary to prevent collapse. If society is stagnating, oppressive, or outdated, liberal policies that push for change and innovation may be essential to move forward. Sometimes, the ice is strong, and we can afford to step boldly. Other times, it''s fragile, and caution is the wiser path.

The greatest danger is not that one side is wrong—it''s that both sides stop listening. If the foot that holds steady refuses to acknowledge the need for movement, progress stalls. If the foot that reaches forward ignores the risk of collapse, we fall. This is why mutual communication and respect between these perspectives is not just important—it''s essential. A nation that silences one side limps. A nation that demonizes the other falls.

True progress happens when both sides recognize their role. When the conservative foot respects the need for movement, even if it prefers caution. When the liberal foot values the foundation it pushes against, even as it seeks new ground. And when both work together, adjusting in real time, moving as one.

Because progress is neither standing still nor running blindly forward. It is the delicate art of moving wisely across uncertain ground.

Look around. What does the ice beneath us look like? Is it stable? Or is it cracking? Are we standing firm? Or are we falling through? If we want to move forward without breaking apart, we have to listen to each other. We have to respect the foot that holds steady—and the one that reaches forward.

Because in the end, no one walks this path alone.

And whether we stand, stumble, or move forward—

Depends on how we walk together.', 'politics/cornerstone.png', 3);
INSERT INTO public.articles_article VALUES (4, 'The Mirror of the Mind', 'the-mirror-of-the-mind', 'Toshi', '2025-02-11', 'How our perception shapes our reality and why mindset matters more than circumstances.', '# The Mirror of the Mind

Ever wonder why two people can experience the same situation completely differently?

One person hits a traffic jam and spirals into frustration, convinced the world is conspiring against them. Another takes a deep breath, turns up their favorite song, and enjoys the pause. Same traffic. Same delay. But two entirely different experiences.

Why?

Because mindset is the lens through which we experience life. It''s not just about what happens to us—it''s about how we interpret it. The world doesn''t come to us as a fixed reality; it bends and shifts based on the beliefs we hold, the thoughts we nurture, and the ideas we allow ourselves to explore. Every experience passes through this internal filter before it ever reaches us, shaping whether we see obstacles or opportunities, failures or lessons, burdens or blessings.

We don''t see the world as it is—we see it as we are. Our beliefs color our reality, defining what we think is possible, what we expect from others, and even how we perceive ourselves. That''s why one person sees rejection as proof of their inadequacy, while another sees it as redirection. It''s why one person views struggle as unfair, while another views it as part of the process. The mind isn''t just receiving reality—it''s creating it.

And that''s why the most important decision you''ll ever make is how you choose to see the world. Albert Einstein is often credited with asking: _Do you believe you live in a friendly or a hostile universe?_ It''s not about what the universe actually is. It''s about what you choose to believe. If you see life as hostile, you''ll always be bracing for the next hit, taking every setback as proof that the odds are stacked against you. But if you see life as friendly, even the challenges will take on meaning. Struggles won''t feel like punishment—they''ll feel like growth. Failures won''t be the end—they''ll be steps forward. The circumstances won''t change, but the way you experience them will.

Reality is unpredictable, often messy, and sometimes difficult. But your mindset determines whether you meet it with resistance or resilience, fear or curiosity, frustration or possibility. The lens you choose shapes the world you see.', 'mindset/mirror.png', 4);
INSERT INTO public.articles_article VALUES (3, 'The Wave and the Ocean', 'the-wave-and-the-ocean', 'Toshi', '2025-05-30', 'Exploring the nature of consciousness and our deep connection to the universe as expressions of a greater whole.', '# The Wave and the Ocean

Look at a wave in the ocean. It rises, rolls forward, then disappears into the sea. On its own, it seems like a fleeting, separate thing. But step back, and you see it for what it truly is: not a thing apart, but a momentary expression of something vast, deep, and whole.

You are like that wave.

You feel solid, continuous, separate. But you''re not a fixed thing — you''re a process. A flow.

Every cell in your body is replaced. Your bones, your skin, your blood — all swapped out over time. Ten years from now, the body you''re standing in today won''t even exist. And yet you still say "me," even though the "you" you''re referring to is always changing.

So where exactly is the boundary? Where does the "self" end and the "world" begin?

You breathe in what a tree exhales. The tree breathes in what you exhale. Your body is made from food grown in soil that used to be stars, that used to be oceans, that used to be other living things.

Nothing about you is separate. Nothing about you is static. You are continuous with everything around you.

Trees don''t breathe without the sun. You don''t breathe without the trees. Your thoughts don''t form without air, food, history, and language — all born from the world you live in.

You are not on Earth. You are of Earth. You are not in the universe. You are an instance of the universe — made of its dust, powered by its laws, and shaped by its story.

And so, the universe is not just "out there." It''s here. In your lungs. Behind your eyes. Inside your thoughts.

And you know that you are.

Right now, in this moment, you are aware. You feel. You reflect. You wonder.

That''s consciousness. That simple, mysterious knowing: "I exist."

We talk about it like it''s normal, but it''s not. It''s astonishing. Out of all the matter in the universe — stars, rocks, oceans — you are a piece of it that somehow knows it exists.

That raises a question most people never dare ask: If I''m part of the universe, and I''m conscious… Then isn''t the universe, in some small way… already conscious?

Because if you are conscious — and you are not separate from the universe — then what does that really mean?

If a wave belongs to the ocean, and the wave is moving, would you ever say the ocean is motionless?

If a branch belongs to the tree, and the branch is alive, would you ever say the tree is lifeless?

So if you are conscious, and you are a part of the whole, then how could the whole be unconscious?

Why would a single fragment of reality have something the entire reality does not? Why would the part have awareness, yet the source of that part — the universe — be empty of it?

It makes no sense.

A fractal never contains a pattern that isn''t already present in the whole form. The small reflects the large. The detail reflects the structure. The spark reflects the fire.

So if consciousness appears in you, and you arise from the universe, then consciousness must be a potential of the universe itself — not an accident, not an exception, but an expression of what the whole is capable of.

The part cannot possess what the whole entirely lacks.

For thousands of years, people have searched for God — some powerful being above us or beyond us, watching, judging, loving, creating.

But maybe we''ve been looking in the wrong direction.

What if God isn''t elsewhere, but everywhere? What if God isn''t separate from creation, but is creation itself — not as a person, but as a presence — an awareness woven into the fabric of reality?

What if you are not just a creature created by God, but God, seeing itself from a single point of view?

And if we know that we are conscious, truly know it — then how could we believe we''re the only ones? How could something so real, so undeniable, arise just once in a single form and nowhere else?

Maybe consciousness is not rare. Maybe it''s a pattern. A rhythm. A universal potential playing out again and again.

Your awareness is not an isolated flame. You are the cosmos — thinking, feeling, dreaming. You are the universe, waking up to itself.', 'mindset/wave.png', 4);
INSERT INTO public.articles_article VALUES (11, 'The Moment You Stop Running', 'the-moment-you-stop-running', 'Toshi', '2025-12-08', 'Every human searches for happiness, yet most of us are taught to look for it in the wrong place. The real foundation of happiness is much simpler - it''s gratitude.', '# The Moment You Stop Running

Every human searches for happiness, yet most of us are taught to look for it in the wrong place. From childhood, we learn to believe that happiness will finally arrive _after_ the next achievement - after we get the degree, land the job, upgrade the car, or move to a better apartment. So we run from goal to goal, always reaching for something just out of sight. Maybe you know that feeling: you check one achievement off your list, and instead of feeling fulfilled, your mind instantly replaces it with another target. "What''s next?" becomes the soundtrack of your life.

There''s nothing wrong with ambition. But when you chase your goals from a place of emptiness - hoping success will fill the gap - you create a quiet, persistent sense of lack. Suddenly your happiness depends on the next promotion, the next purchase, the next relationship. Your mind keeps whispering, "I''ll be happy when..." And with that mindset, happiness always stays in the future - never here, never now.


One of the real foundations of happiness is much simpler - it''s gratitude. Not the polite "thanks" you offer out of habit, but the kind of gratitude that sinks into your chest and reminds you that your life is happening _right now_.

Gratitude doesn''t shrink your dreams; it just stops you from abandoning the present while you chase the future. It brings happiness out of the "someday" and plants it into "today." And when you feel full instead of lacking, working toward your goals becomes much easier.


And like going to the gym, it''s a practice. You have to train it - especially on the days when nothing goes as planned: your inbox explodes, your patience runs thin, your bills pile up, or you''re running on four hours of sleep. Gratitude on those days is hard, but that''s exactly when the real growth happens. It''s the repetition, the consistency, the choice to practice even when life feels messy that makes gratitude start paying off.


What makes gratitude so powerful is that it doesn''t just shift your outlook - it literally shifts your biology. Scientists can measure what happens in the body when you practice it regularly. Gratitude increases dopamine and serotonin, your mind''s natural "feel-good" chemicals. It lowers cortisol, the stress hormone that keeps you stuck in fight-or-flight mode. Brain scans even show that consistent gratitude strengthens the neural pathways responsible for emotional balance and resilience. In other words: the benefits aren''t just philosophical - they''re physical. That''s why people who practice gratitude sleep better, feel calmer, and recover faster from stress.


These physical changes don''t stay hidden in the background - they begin to shape how you experience your everyday life. When you practice gratitude long enough, something subtle but profound shifts. Happiness stops being a finish line. It becomes a lens. You still dream big, but now you''re rooted instead of restless. You want more, but you''re no longer starving for it. You move through life with a softer heart, clearer perspective, and a deeper appreciation for the ordinary moments.


If happiness feels far away, the answer isn''t to chase harder. It''s to pause. Breathe. Notice one small thing you''re grateful for - your warm cup of coffee, the morning sunlight on your floor, a message from a friend, or simply your own breath. Not because your life is perfect, but because there is always something here worth appreciating.

Happiness doesn''t live in the future. It grows in the moments when you slow down long enough to see what''s already in front of you - and that simple shift can quietly change everything.', 'mindset/gratitude.png', 4);
INSERT INTO public.articles_article VALUES (10, 'Spiraling Towards Truth', 'spiraling-towards-truth', 'Toshi', '2025-08-18', 'The scientific method guides us through observation, testing, and reflection—a spiral that keeps us moving closer to truth.', '# Spiraling Towards Truth

In a world where people cling to their beliefs like anchors, science offers a way to navigate uncertainty with curiosity and humility. The scientific method is a simple, powerful tool that guides us through observation, testing, and reflection—a spiral that keeps us moving closer to truth. But we mustn''t confuse this method with what often passes for "science" today. In today''s polarized world, where ideologies and even scientific claims can come across as dogmatic — that is, treated as absolute truths — returning to the logical, reflective core of the scientific method could help bring us together in the search for clearer understanding.

The scientific method is like a trusty guide for exploring the world. You notice something—like your plants thriving in sunlight but wilting in shade. You ask, Why does sunlight help plants grow? Then you make a guess, a hypothesis: maybe sunlight fuels their food-making process. To test it, you run an experiment: grow some plants in the sun, others in the dark, and measure their growth. Next, you check the results—did the sunny plants grow taller? Finally, you decide if your guess holds up or needs rethinking, and you share your findings with the world so others can discuss, question, and build on them. This process shines because it''s built on evidence—facts you can measure, not just hunches. It''s repeatable, so anyone can try the experiment and get similar results. And it''s falsifiable, meaning your idea must be testable and open to being proven wrong. That''s not a flaw—it''s the heart of progress. You also share your claim with others so they can test it too, challenge it, or confirm it—because knowledge grows stronger when many minds probe it from different angles. The magic lies in reflection: pausing to ask, What do these results mean? Did I miss something? Reflection turns raw data into insight, pushing us to question assumptions and embrace new possibilities. It''s the step that keeps us honest and curious.

At the heart of this method lies logic, the foundation that holds science together. Logic is the art of clear, consistent thinking—using rules to connect ideas and ensure conclusions follow from evidence. It''s what lets us spot patterns in observations, craft testable hypotheses, design fair experiments, and draw reliable conclusions. Without logic, our ideas would be scattered guesses, not systematic inquiries. Logic ensures we don''t jump to conclusions or mistake correlation for causation—like assuming rain alone makes plants grow without considering sunlight. It helps us avoid circular reasoning, where we assume what we''re trying to prove. And it guards against confirmation bias, our tendency to notice only evidence that supports our existing beliefs.

But in today''s world, logic isn''t valued the way it used to be, and open discussion often takes a back seat. Many people are led more by emotions than by thoughtful questioning or critical reflection, especially in places like social media where outrage, fear, and quick reactions spread faster than calm reasoning. At the same time, we''ve become less willing to engage in reflective conversations with people who hold different opinions. It would be good if we approached conversations the way the scientific method teaches us to think—slowing down, examining ideas carefully, and staying open to dialogue. That willingness to think for ourselves—and to discuss respectfully—keeps our understanding grounded, honest, and alive.', 'mindset/spiraling_towards_truth.png', 1);
INSERT INTO public.articles_article VALUES (12, 'The Hidden Game', 'the-hidden-game', 'Toshi', '2025-12-10', 'Inflation is not just rising prices—it''s a devaluation of money that affects everyone differently, widening inequality and forcing you into a game you never agreed to play.', '# The Hidden Game

You surely have noticed it—that creeping feeling that your paycheck doesn''t stretch as far as it used to. The coffee you grab on the way to work, the loaf of bread at the supermarket, even a night out with friends—suddenly, everything costs more. You''ve heard the word inflation, but most of us think it simply means "things are getting expensive." The truth is far more shocking—and far more unsettling.

At its core, inflation is a devaluation of money. When money becomes less valuable, you need more of it to buy the same products. But how does money actually lose its value?

Imagine a small, peaceful tribe living in a lush valley. They don''t use coins or paper bills—they use marbles. Each marble is carefully crafted by hand, polished until it shines. It takes days, sometimes weeks, to make one. Life in the village runs smoothly because everyone knows the value of a marble. Trade is fair, people are happy, and the world feels balanced.

Now, imagine outsiders discover the tribe''s marbles. They are clever and skilled, and they have a way to produce marbles quickly and in large quantities—much faster than the villagers can. Overnight, a flood of new marbles appears, spilling into every home and every market.

At first, it seems exciting—everyone has more to trade, more to enjoy. But the excitement doesn''t last. The new marbles make the old ones less special. One marble no longer buys as much as it used to. The villagers who spent weeks crafting each marble feel frustrated and powerless. Their carefully balanced system begins to wobble under the sudden flood of new currency.

This is exactly how modern money works. Central banks—the institutions that control the supply of money—can create it out of thin air. When too much new money enters the economy, the value of each dollar drops. Prices rise. Your money buys less, and your paycheck rarely keeps pace.

And just like in the village, this new money doesn''t affect everyone equally. Some of it is handed out through subsidies, benefits, or "free" government programs—but even that money isn''t truly free, because it contributes to the overall inflation that everyone later pays for. Meanwhile, the largest share still flows first to those already in power—institutions, corporations, and wealthy individuals who can use it to buy assets and grow their wealth. Ordinary people, on the other hand, are left dealing with rising prices, shrinking purchasing power, and the slow erosion of their savings.

On top of that, much of the newly created money is issued as debt. That means the government eventually has to repay it—with interest—and it does so using tax money, which ultimately comes from you.

As a result, the system widens inequality at an accelerating pace. People who already own assets—like houses, stocks, or companies—see their wealth grow because inflation pushes those asset prices higher. In the end, money always flows into things. When people realize their cash is losing value, they try to protect it by buying assets—homes, shares, businesses, anything that might hold or increase in value. This rush to escape devaluing money drives asset prices up even further. Companies, investors, and property owners receive most of this incoming money, which is why wealth keeps concentrating at the top. But people who depend on their salaries or savings experience the opposite: their income loses value, their savings buy less and less, and life becomes more expensive. Over time, the wealthy pull further ahead while everyone else struggles to keep up.

This widening gap doesn''t just affect wallets—it affects society itself. As the rich grow richer and the poor fall further behind, frustration and tension rise. If it continues long enough, this imbalance can lead to deep social instability within a country.

And this is where the personal impact becomes impossible to ignore. Understanding how inflation truly works reveals why simply holding onto money is no longer a safe way to protect your wealth. When money constantly loses value, you''re pushed into a difficult position: you have to "gamble" your savings by putting them into assets just to keep pace. Inflation turns everyone into an unwilling participant in a game they never agreed to play.', 'economics/the-hidden-game.png', 6);
INSERT INTO public.articles_article VALUES (13, 'From Hardship to Awakening', 'from-hardship-to-awakening', 'Toshi', '2025-12-11', 'Life is a school where we grow through challenges. We learn through insight or pain—both are teachers guiding us toward conscious evolution.', '# From Hardship to Awakening

Life is a school, whether we choose to acknowledge it or not. We don''t sit in a classroom, and no one hands us a schedule or a list of subjects, yet the lessons come anyway—quietly, constantly, and sometimes overwhelmingly. Every day, every situation, and every person we interact with becomes part of a learning journey designed to help us grow. Life teaches through experience and repetition, through moments that lift us up and moments that break us open. Some lessons arrive softly, like a gentle reminder that nudges us forward. Others come crashing in without warning, shaking us awake and demanding our attention.

What makes life feel so much like a school is the simple truth that we are always being shaped. We grow through every challenge, heartbreak, success, disappointment, unexpected turn, and every relationship that leaves a mark on us. One day we''re learning patience. Another day courage. Then humility, boundaries, forgiveness, resilience, or the strength to begin again. And just like in any real school, we don''t get to skip the classes we don''t like. Life keeps sending us the same lesson in new forms until we finally understand it. If we ignore the message, it returns—sometimes softer, sometimes louder, but always with purpose.

Challenges are like the exams of this school—not tests meant to judge us, but opportunities to see where we can grow. Each challenge is life''s way of asking, _"Have you learned this yet? Are you ready for what''s next?"_ When we ignore the lesson or try to run from it, the challenge usually returns in another form. It''s not about punishment. It''s about helping us evolve—individually and together.

Along our path, these challenges tend to show up in two ways. Some we choose voluntarily—when we step into discomfort, try something new, take a risk, or intentionally grow. These experiences stretch us and expand what we believe is possible. And then there are the challenges that arrive uninvited, unexpected, and often unwanted. They show up whether we feel ready or not. Yet both kinds are essential. Whether chosen or imposed, each challenge shapes us in profound ways and becomes part of our ongoing evolution.

In the end, all of them funnel into the same truth — that growth usually comes from two forces, insight or pain.

Pain is the strict teacher.

It appears when something in our life is out of alignment. At first, it whispers—a small feeling that something isn''t right. Maybe you feel drained every time you talk to a certain person. Maybe your job leaves you anxious on Sunday nights. Maybe you''ve been avoiding an honest conversation. If we ignore these early signals, the whisper becomes a nudge—arguments, burnout, dissatisfaction, or a growing sense of restlessness. And when we still don''t listen, pain becomes impossible to ignore: a breakup, a breakdown, a crisis, a moment that forces us to confront what we''ve been avoiding.

Pain cracks open denial. It pushes us because we can no longer stay where we are. As harsh as it feels, pain often initiates the transformation we''ve been resisting. Many people only change careers, leave toxic relationships, or take their mental health seriously after something finally hurts enough to demand it.

Insight, however, is the gentle teacher.

It''s the quiet clarity that comes through reflection, honesty, and awareness. Insight is when you notice your own patterns—like realizing you always say yes even when you mean no, or recognizing that you keep repeating the same relationship dynamic, or seeing that you''re sabotaging your goals with procrastination or fear. Insight lets you adjust before life forces the change.

For example, you might notice early signs of burnout and choose to slow down before breaking down. You might realize a relationship isn''t healthy and choose to step away before it explodes. You might catch yourself slipping into old habits and correct your course before consequences arrive.

While pain pushes us out of necessity, insight pulls us through choice.

Both are teachers. Both are catalysts.

One is loud. The other is quiet.

One forces change. The other invites it.

Together, they form the two currents that carry us forward—guiding us, shaping us, and preparing us for the next chapter of our evolution.

It''s surprising how often pain and insight arrive hand in hand. Often, pain builds quietly in the background until we finally notice the truth it has been trying to reveal. The moment we recognize that truth, pain turns into insight. In that instant, suffering becomes understanding. Pain opens the door, insight steps through, and together they guide us from unconscious patterns into conscious growth.

And this process isn''t limited to individuals. Humanity as a whole moves through the same cycle. Collective pain builds until it becomes impossible to ignore, and only then do we gain the insight needed to change. Think of times when society finally confronted injustice or inequality—moments where widespread suffering sparked movements for human rights, environmental protection, or social reform. The collective discomfort exposed what was out of alignment, and the insight that followed showed us a better path forward.

Just as people grow through the interplay of pain and clarity, the world grows the same way—slowly at first, then suddenly, when the truth becomes undeniable.

Which is why the point of life is not to avoid challenges—we can''t. They are woven into the very structure of human development. The real opportunity is to become active participants in our evolution, both personal and collective. To choose reflection over resistance. To choose insight before pain becomes necessary. To choose growth before life forces change upon us. Most of us want to suffer less, and the way to suffer less is through awareness. When we reflect earlier, when we listen more deeply, when we learn willingly instead of waiting for pain, everything becomes lighter.', 'mindset/from-hardship-to-awakening.png', 4);
INSERT INTO public.articles_article VALUES (14, 'Two Systems, One Flaw', 'two-systems-one-flaw', 'Toshi', '2025-12-20', 'Capitalism promises freedom, socialism promises equality. Both systems fail when they allow either markets or the state to overstep their role and limit human freedom.', '# Two Systems, One Flaw

Modern governments usually organize their economies using two main systems, capitalism and socialism. People often see them as opposites, freedom versus equality, markets versus the state. After years of experience, neither system has worked perfectly. When used in their pure forms, both have serious weaknesses that go beyond money. They affect education, justice, culture, and even decide who gets opportunities and whose lives are undervalued.

Capitalism promises freedom and socialism promises equality. Both say they can create a fair and prosperous society. In reality, neither is perfect. Their problems are not just theoretical, they affect daily life, shaping who is heard, who is protected, and who can succeed.

Capitalism is built on economic freedom. People and businesses can start projects, compete, take risks, and earn based on success. The idea is simple. Competition encourages innovation, rewards talent, and pushes society forward.

In theory, this works well. Imagine a young entrepreneur with a great idea for a new app. She works hard, takes risks, and succeeds. Capitalism celebrates her success. Effort leads to opportunity, which can improve life for her and society.

But that freedom can also cause problems. When limits are weak, rich companies and people can gain too much power. Some use money to influence politics, shape laws, or get unfair advantages. While companies get huge tax breaks, schools, hospitals, and roads may not get enough funding. Over time, wealth turns into power, and equality under the law starts to disappear.

These problems affect more than politics. They shape culture and education too. Schools focus on creating workers instead of thinkers. Media and advertising make people believe that success is all about money and possessions. Inequality starts to feel normal and even deserved. The promise that anyone can succeed becomes less real. Once wealth gives power, it is hard to fix the system from inside.

Socialism on the other hand focuses on fairness. The state organizes and distributes resources so everyone has enough and basic needs are met. Equality is the main goal, not competition.

On paper, this sounds good. It imagines a society where no one goes hungry, education and healthcare are free, and dignity does not depend on income. But it can also create problems. Decision-making becomes centralized, and individuals lose freedom to choose their own path. Governments, like markets, are run by people, and people make mistakes. When authority is concentrated, inefficiency, corruption, and abuse of power can quietly grow.

Society needs people to work hard, take risks, and create new ideas. Innovation keeps society strong. People have different talents, ambitions, and interests. If a system ignores these differences and gives everyone the same rewards, it discourages hard work and creativity. Without motivation, innovation slows, society loses progress, and can even decline. Systems like socialism, which separate rewards from contribution, can reduce people''s drive to perform at their best.

History shows this clearly. Many centrally planned economies struggled to adapt. Technology advanced elsewhere while rigid systems stayed behind. In extreme cases, the push for enforced equality led to control and obedience instead of fairness and initiative.

Both capitalism and socialism fail because, in the end, they allow either the economy or the state to interfere too much with human freedom. In capitalism, economic power can grow so strong that it limits opportunity, influences law, and shapes life for everyone. In socialism, centralized authority can control choices and restrict individual initiative. Both systems can become harmful when they overstep their role and start dictating how people live, work, and think. Markets and governments are tools meant to serve society, but neither should replace personal freedom or decide what people can and cannot do.

The real mistake is thinking one system can control every part of society. Life is complex, and people''s needs are not the same in economics, politics, or culture. Each area requires its own rules and ways of organizing.

A healthy society understands these differences and balances them carefully. The economy should meet real human needs and encourage responsibility, not greed or rigid control. Politics should guarantee equality, giving everyone the same rights and voice. Culture, including education, science, and values, needs freedom, protected from both economic pressure and political control.

These areas should remain separate but cooperative. The economy should not dictate cultural values, and politics should not limit creativity. Instead, culture should provide ethical guidance to both, shaping society through principles rather than power.

No system is perfect. By respecting the different principles that govern work, rights, and meaning, society can move closer to one that serves people, without limiting freedom, defining worth by wealth, or silencing individuality.', 'politics/two_systems_one_flaw.png', 3);


--
-- Data for Name: articles_tag; Type: TABLE DATA; Schema: public; Owner: toshi
--

INSERT INTO public.articles_tag VALUES (1, 'technology');
INSERT INTO public.articles_tag VALUES (2, 'transistors');
INSERT INTO public.articles_tag VALUES (3, 'digital revolution');
INSERT INTO public.articles_tag VALUES (4, 'computing');
INSERT INTO public.articles_tag VALUES (5, 'future');
INSERT INTO public.articles_tag VALUES (6, 'politics');
INSERT INTO public.articles_tag VALUES (7, 'society');
INSERT INTO public.articles_tag VALUES (8, 'balance');
INSERT INTO public.articles_tag VALUES (9, 'democracy');
INSERT INTO public.articles_tag VALUES (10, 'unity');
INSERT INTO public.articles_tag VALUES (11, 'mindset');
INSERT INTO public.articles_tag VALUES (12, 'consciousness');
INSERT INTO public.articles_tag VALUES (13, 'philosophy');
INSERT INTO public.articles_tag VALUES (14, 'connection');
INSERT INTO public.articles_tag VALUES (15, 'psychology');
INSERT INTO public.articles_tag VALUES (16, 'perspective');
INSERT INTO public.articles_tag VALUES (17, 'purpose');
INSERT INTO public.articles_tag VALUES (18, 'direction');
INSERT INTO public.articles_tag VALUES (19, 'meaning');
INSERT INTO public.articles_tag VALUES (20, 'stories');
INSERT INTO public.articles_tag VALUES (21, 'wisdom');
INSERT INTO public.articles_tag VALUES (22, 'hero''s journey');
INSERT INTO public.articles_tag VALUES (23, 'economics');
INSERT INTO public.articles_tag VALUES (24, 'history');
INSERT INTO public.articles_tag VALUES (25, 'currency');
INSERT INTO public.articles_tag VALUES (26, 'empires');
INSERT INTO public.articles_tag VALUES (27, 'cycles');
INSERT INTO public.articles_tag VALUES (28, 'money');
INSERT INTO public.articles_tag VALUES (29, 'debt');
INSERT INTO public.articles_tag VALUES (30, 'central banking');
INSERT INTO public.articles_tag VALUES (31, 'inflation');
INSERT INTO public.articles_tag VALUES (32, 'science');
INSERT INTO public.articles_tag VALUES (33, 'reflection');
INSERT INTO public.articles_tag VALUES (34, 'logic');
INSERT INTO public.articles_tag VALUES (35, 'gratitude');
INSERT INTO public.articles_tag VALUES (36, 'happiness');
INSERT INTO public.articles_tag VALUES (37, 'self-improvement');
INSERT INTO public.articles_tag VALUES (38, 'wealth');
INSERT INTO public.articles_tag VALUES (39, 'growth');
INSERT INTO public.articles_tag VALUES (40, 'awareness');
INSERT INTO public.articles_tag VALUES (41, 'resilience');
INSERT INTO public.articles_tag VALUES (42, 'capitalism');
INSERT INTO public.articles_tag VALUES (43, 'socialism');
INSERT INTO public.articles_tag VALUES (44, 'freedom');
INSERT INTO public.articles_tag VALUES (45, 'equality');


--
-- Data for Name: articles_tag_articles; Type: TABLE DATA; Schema: public; Owner: toshi
--

INSERT INTO public.articles_tag_articles VALUES (1, 1, 1);
INSERT INTO public.articles_tag_articles VALUES (2, 2, 1);
INSERT INTO public.articles_tag_articles VALUES (3, 3, 1);
INSERT INTO public.articles_tag_articles VALUES (4, 4, 1);
INSERT INTO public.articles_tag_articles VALUES (5, 5, 1);
INSERT INTO public.articles_tag_articles VALUES (6, 6, 2);
INSERT INTO public.articles_tag_articles VALUES (7, 7, 2);
INSERT INTO public.articles_tag_articles VALUES (8, 8, 2);
INSERT INTO public.articles_tag_articles VALUES (9, 9, 2);
INSERT INTO public.articles_tag_articles VALUES (10, 10, 2);
INSERT INTO public.articles_tag_articles VALUES (11, 11, 3);
INSERT INTO public.articles_tag_articles VALUES (12, 12, 3);
INSERT INTO public.articles_tag_articles VALUES (13, 13, 3);
INSERT INTO public.articles_tag_articles VALUES (14, 14, 3);
INSERT INTO public.articles_tag_articles VALUES (15, 11, 4);
INSERT INTO public.articles_tag_articles VALUES (16, 15, 4);
INSERT INTO public.articles_tag_articles VALUES (17, 16, 4);
INSERT INTO public.articles_tag_articles VALUES (18, 11, 5);
INSERT INTO public.articles_tag_articles VALUES (19, 17, 5);
INSERT INTO public.articles_tag_articles VALUES (20, 18, 5);
INSERT INTO public.articles_tag_articles VALUES (21, 19, 5);
INSERT INTO public.articles_tag_articles VALUES (22, 14, 5);
INSERT INTO public.articles_tag_articles VALUES (23, 20, 6);
INSERT INTO public.articles_tag_articles VALUES (24, 13, 6);
INSERT INTO public.articles_tag_articles VALUES (25, 21, 6);
INSERT INTO public.articles_tag_articles VALUES (26, 22, 6);
INSERT INTO public.articles_tag_articles VALUES (27, 23, 7);
INSERT INTO public.articles_tag_articles VALUES (28, 24, 7);
INSERT INTO public.articles_tag_articles VALUES (29, 25, 7);
INSERT INTO public.articles_tag_articles VALUES (30, 26, 7);
INSERT INTO public.articles_tag_articles VALUES (31, 27, 7);
INSERT INTO public.articles_tag_articles VALUES (32, 23, 8);
INSERT INTO public.articles_tag_articles VALUES (33, 28, 8);
INSERT INTO public.articles_tag_articles VALUES (34, 29, 8);
INSERT INTO public.articles_tag_articles VALUES (35, 30, 8);
INSERT INTO public.articles_tag_articles VALUES (36, 31, 8);
INSERT INTO public.articles_tag_articles VALUES (37, 32, 10);
INSERT INTO public.articles_tag_articles VALUES (38, 33, 10);
INSERT INTO public.articles_tag_articles VALUES (39, 34, 10);
INSERT INTO public.articles_tag_articles VALUES (40, 35, 11);
INSERT INTO public.articles_tag_articles VALUES (41, 36, 11);
INSERT INTO public.articles_tag_articles VALUES (42, 11, 11);
INSERT INTO public.articles_tag_articles VALUES (43, 37, 11);
INSERT INTO public.articles_tag_articles VALUES (44, 31, 12);
INSERT INTO public.articles_tag_articles VALUES (45, 23, 12);
INSERT INTO public.articles_tag_articles VALUES (46, 28, 12);
INSERT INTO public.articles_tag_articles VALUES (47, 38, 12);
INSERT INTO public.articles_tag_articles VALUES (48, 39, 13);
INSERT INTO public.articles_tag_articles VALUES (49, 11, 13);
INSERT INTO public.articles_tag_articles VALUES (50, 40, 13);
INSERT INTO public.articles_tag_articles VALUES (51, 41, 13);
INSERT INTO public.articles_tag_articles VALUES (52, 42, 14);
INSERT INTO public.articles_tag_articles VALUES (53, 43, 14);
INSERT INTO public.articles_tag_articles VALUES (54, 6, 14);
INSERT INTO public.articles_tag_articles VALUES (55, 44, 14);
INSERT INTO public.articles_tag_articles VALUES (56, 45, 14);


--
-- Name: articles_article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toshi
--

SELECT pg_catalog.setval('public.articles_article_id_seq', 14, true);


--
-- Name: articles_section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toshi
--

SELECT pg_catalog.setval('public.articles_section_id_seq', 8, true);


--
-- Name: articles_tag_articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toshi
--

SELECT pg_catalog.setval('public.articles_tag_articles_id_seq', 56, true);


--
-- Name: articles_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: toshi
--

SELECT pg_catalog.setval('public.articles_tag_id_seq', 45, true);


--
-- PostgreSQL database dump complete
--

