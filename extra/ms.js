// Practice questions written for Study Deck (not the professor's), per lecture.
window.EXTRA = window.EXTRA || {};
EXTRA.ms = {
 "1": [
  {
   "q": "<b>Applied.</b> Customers arrive randomly at an average rate of 50/hour and each server serves at a mean rate of 10/hour. What should the analyst do to find the minimum number of servers?",
   "o": [
    [
     "Build a discrete-event simulation",
     "Not needed: the answer comes by common sense, which is a reason simulation is NOT appropriate (L1, When is simulation appropriate, and when not?)."
    ],
    [
     "Compute 50/10 = 5 servers; no simulation is required",
     "Correct. Common-sense example from the lecture notes: 50/10 = 5."
    ],
    [
     "Compute 10/50 = 0.2 servers",
     "The ratio is upside down: you divide the arrival rate by the service rate per server, 50/10 = 5."
    ],
    [
     "Run a Monte Carlo simulation",
     "Not needed: common sense gives 50/10 = 5 servers."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Scenario.</b> A gift shop is modelled with entity = customer. Which item is an <b>event</b>?",
   "o": [
    [
     "The number of customers waiting",
     "That is a state variable (L1, Components of a system)."
    ],
    [
     "Serving a customer for 4 minutes",
     "That is an activity: a time period of specified length."
    ],
    [
     "A customer's arrival",
     "Correct. An arrival is an instantaneous occurrence that might change the state."
    ],
    [
     "The customer's amount of purchase",
     "That is an attribute, a property of the entity."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> A web server's time between errors is 30 minutes and its server-down event lasts 1 hour, once per day. In seconds these are:",
   "o": [
    [
     "1800, 3600 and 86400",
     "Correct. 30 × 60 = 1800; 60 × 60 = 3600; 24 × 3600 = 86400 (slide 54)."
    ],
    [
     "1800, 360 and 8640",
     "1 hour = 3600 sec and 1 day = 86400 sec (slide 54) (L1, Performance metrics)."
    ],
    [
     "180, 3600 and 86400",
     "30 min = 30 × 60 = 1800 sec, not 180."
    ],
    [
     "3000, 3600 and 24000",
     "30 min = 1800 sec and 1 day = 86400 sec (slide 54)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Using the mobility model d = v · t, a car with a constant velocity of 20 m/s travels for 30 s. What distance does the model give, and what is its main weakness?",
   "o": [
    [
     "600 m; constant velocity is seldom valid for a whole travel",
     "Correct. d = 20 × 30 = 600 m; the slide 38 disadvantage is that constant velocity is seldom valid for a whole travel."
    ],
    [
     "1.5 m; it needs line of sight",
     "d = v · t = 20 × 30 = 600 m (not 30/20); line of sight is an assumption of the radio free-space model (L1, Examples of system models)."
    ],
    [
     "600 m; it is not useful indoors",
     "The distance is right, but \"not useful for indoor and city environments\" is the free-space radio model's disadvantage (slide 39)."
    ],
    [
     "50 m; it is too complex",
     "d = 20 × 30 = 600 m; the model's advantage is that it is simple and intuitive (slide 38)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Scenario.</b> A user finishes typing a request at t = 2 s. The system starts execution at t = 3 s, starts its response at t = 5 s and completes it at t = 7 s. The user starts the next request at t = 12 s. What are the reaction time and the think time?",
   "o": [
    [
     "Reaction 1 s, think 5 s",
     "Correct. Reaction = 3 − 2 = 1 s (finish request → start execution). Think = 12 − 7 = 5 s (complete response → next request)."
    ],
    [
     "Reaction 3 s, think 7 s",
     "Reaction = 3 − 2 = 1 s (user finishes request → system starts execution) and think = 12 − 7 = 5 s (L1, Performance metrics)."
    ],
    [
     "Reaction 1 s, think 7 s",
     "Think time starts when the system completes its response: 12 − 7 = 5 s, not 12 − 5 = 7 s."
    ],
    [
     "Reaction 3 s, think 5 s",
     "Reaction time = 3 − 2 = 1 s; 3 s is the first response time (5 − 2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Scenario.</b> In the timeline of the previous question (finish request 2 s, start response 5 s, complete response 7 s), the two response-time definitions give:",
   "o": [
    [
     "3 s and 5 s",
     "Correct. 5 − 2 = 3 s (to system starts response) and 7 − 2 = 5 s (to system completes response), slide 56."
    ],
    [
     "2 s and 4 s",
     "Both definitions start when the user finishes the request (t = 2 s): 5 − 2 = 3 s and 7 − 2 = 5 s (L1, Performance metrics)."
    ],
    [
     "1 s and 5 s",
     "1 s is the reaction time (start of execution at 3 s)."
    ],
    [
     "3 s and 10 s",
     "The second definition ends at system completes response (7 s): 7 − 2 = 5 s."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Scenario.</b> A model's computer program correctly does what the conceptual model describes, but its output does not match the measured behavior of the real system. Which step failed and where does the flowchart send you?",
   "o": [
    [
     "Verification failed; go back to model translation",
     "The program does what the model says, so verification passed (L1, Steps in a simulation study)."
    ],
    [
     "Validation failed; go back to model conceptualization and data collection",
     "Correct. Validated? = do results match reality? \"No\" loops back to steps 3 and 4 (slide 59)."
    ],
    [
     "Experimental design failed; go back to production runs",
     "The problem is that the model does not match reality: a validation failure."
    ],
    [
     "Implementation failed; go back to documentation",
     "Implementation is the last step; a mismatch with reality is found at validation."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Scenario.</b> A bank model lets customers arrive at random times and the number of customers changes only at arrivals and departures; we follow it over a whole day. How is this simulation model classified?",
   "o": [
    [
     "Static, deterministic, continuous",
     "It is followed over time (dynamic), has random arrivals (stochastic) and changes at discrete points (L1, Simulation models and discrete-event simulation)."
    ],
    [
     "Dynamic, stochastic, discrete (discrete-event simulation)",
     "Correct. Over a time interval = dynamic; random arrivals = stochastic; changes only at events = discrete."
    ],
    [
     "Static, stochastic (Monte Carlo)",
     "Monte Carlo represents a system at one point in time; this model runs over a day (dynamic)."
    ],
    [
     "Dynamic, deterministic, continuous",
     "Random arrivals make it stochastic, and the state changes at discrete points."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> The web-server throughput is 8420 queries/min. About how many queries per second is that?",
   "o": [
    [
     "About 140.3 queries/sec",
     "Correct. 8420 / 60 ≈ 140.33 queries per second."
    ],
    [
     "About 505200 queries/sec",
     "That multiplies by 60 instead of dividing (8420 × 60) (L1, Performance metrics)."
    ],
    [
     "12.5 queries/sec",
     "12.5 is the throughput in MB/sec on slide 54, not queries per second."
    ],
    [
     "About 14.0 queries/sec",
     "8420 / 60 ≈ 140.3, not 14.0."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Scenario.</b> A small company wants a quick model of its manufacturing line, has money but no programmers, and accepts that the tool may not fit every special need. Which tool alternative fits best?",
   "o": [
    [
     "A general purpose language such as FORTRAN",
     "This needs programming, each model starts from scratch and development is long (L1, Simulation tools)."
    ],
    [
     "A special purpose simulation package such as SIMFACTORY",
     "Correct. Very quick development, short learning cycle, no programming; costs are high and flexibility limited, which the company accepts. SIMFACTORY is a simulator for manufacturing operations."
    ],
    [
     "A general simulation language such as SIMSCRIPT II.5",
     "This still needs programming and additional training (tools slide 5)."
    ],
    [
     "OPNET",
     "OPNET is a special package for communication networks, not manufacturing (tools slide 10)."
    ]
   ],
   "a": 1
  }
 ],
 "2": [
  {
   "q": "<b>Applied.</b> Slide 11's six customers have arrivals 0, 2, 6, 7, 9, 15 and service times 2, 1, 3, 2, 1, 4. What is the average waiting time in queue?",
   "o": [
    [
     "0.67 min",
     "Correct. Waits 0, 0, 0, 2, 2, 0 → 4/6 = 0.67."
    ],
    [
     "2 min",
     "That is the waiting time of customer 4 alone (or 5), not the average (L2, Building a simulation run: 6 customers)."
    ],
    [
     "2.83 min",
     "That is the average time in system 17/6 (L2, Building a simulation run: 6 customers)."
    ],
    [
     "1.33 min",
     "Divide total wait 4 by all 6 customers, not by 3 (L2, Building a simulation run: 6 customers)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> For the same six customers (run ends at 19), what fraction of the time is the server idle?",
   "o": [
    [
     "3/19 = 0.16",
     "There are two idle periods, 3–6 and 12–15 (L2, Chronological ordering of events)."
    ],
    [
     "6/19 = 0.32",
     "Correct. Idle 3 + 3 = 6 minutes out of 19."
    ],
    [
     "6/13 = 0.46",
     "Divide by the run time 19, not the busy time 13 (L2, Example 1: A Grocery, statistics)."
    ],
    [
     "13/19 = 0.68",
     "That is the busy fraction (L2, Chronological ordering of events)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In the grocery run, total waiting time is 174 minutes and <b>46</b> customers waited. The average waiting time of those who wait is:",
   "o": [
    [
     "1.74 min",
     "That divides by all 100 customers (L2, Example 1: A Grocery, statistics)."
    ],
    [
     "3.22 min",
     "That is 174/54, the slide's figure, which uses a different count of waiters (L2, Example 1: A Grocery, statistics)."
    ],
    [
     "3.78 min",
     "Correct. 174 / 46 = 3.78."
    ],
    [
     "4.91 min",
     "That is the average time in system (L2, Example 1: A Grocery, statistics)."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Using Table 2.1 (three-digit assignment), random digits 359 give a time between arrivals of:",
   "o": [
    [
     "2 min",
     "2 covers 126–250 (L2, Example 2.2: grocery with 20 customers, distributions and random digits)."
    ],
    [
     "3 min",
     "Correct. 359 lies in 251–375."
    ],
    [
     "4 min",
     "4 covers 376–500 (L2, Example 2.2: grocery with 20 customers, distributions and random digits)."
    ],
    [
     "5 min",
     "5 covers 501–625 (L2, Example 2.2: grocery with 20 customers, distributions and random digits)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> The seller buys 70 papers; it is a poor day with demand 40. Daily profit is:",
   "o": [
    [
     "−$1.60",
     "Correct. 40 × 0.50 = 20.00; cost 23.10; scrap 30 × 0.05 = 1.50; 20.00 − 23.10 + 1.50 = −1.60."
    ],
    [
     "−$3.10",
     "You forgot the salvage of 30 scrap papers ($1.50) (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "$2.90",
     "That is the profit at demand 50 (L2, Example 2.4: simulation table for 70 newspapers (Table 2.13))."
    ],
    [
     "$20.00",
     "That is only the revenue (L2, Example 2.4: the newspaper seller's problem)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> If the seller buys 60 papers and demand is 80, the daily profit is:",
   "o": [
    [
     "$10.20",
     "That ignores the lost profit: 30.00 − 19.80 = 10.20, but 20 × 0.17 = 3.40 must be subtracted (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "$6.80",
     "Correct. Revenue 60 × 0.50 = 30.00; cost 60 × 0.33 = 19.80; lost 20 × 0.17 = 3.40; 30.00 − 19.80 − 3.40 = 6.80."
    ],
    [
     "$13.60",
     "That adds the lost profit instead of subtracting it: 30.00 − 19.80 + 3.40 = 13.60 (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "$3.40",
     "That is only the lost profit (L2, Example 2.4: the newspaper seller's problem)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In Example 2.5 (M = 11), at the review the ending inventory is 4 with no backorders. The order quantity is:",
   "o": [
    [
     "4",
     "That is the ending inventory (L2, Example 2.5: (M, N) inventory simulation, inputs)."
    ],
    [
     "11",
     "That is M itself (L2, Example 2.5: (M, N) inventory simulation, inputs)."
    ],
    [
     "7",
     "Correct. Q = M − ending inventory = 11 − 4 = 7 (cycle 3 in Table 2.16)."
    ],
    [
     "15",
     "Q fills up to M, it is not M + I (L2, Example 2.5: (M, N) inventory simulation, inputs)."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Inventory slides model (r = 3, $50 per unit short, $20 per order, $0.10 holding). A day begins with 2 units, no order outstanding, and demand is 3. The total cost for that day is:",
   "o": [
    [
     "$50.00",
     "An order must also be placed because I = 0 ≤ r and none is outstanding (L2, Inventory: model components and daily process)."
    ],
    [
     "$70.00",
     "Correct. Shortage 1 × 50 = 50; I = 0 ≤ 3 and no order outstanding → order 20; holding 0.10 × 0 = 0; total 70."
    ],
    [
     "$70.30",
     "Holding is on the end-of-day inventory, which is 0 (L2, Inventory: model components and daily process)."
    ],
    [
     "$150.00",
     "Only 1 unit is short, 3 − 2 = 1 (L2, Inventory: model components and daily process)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In the Able-Baker run (62 minutes), Able served for 56 minutes and Baker for 43. Which is correct?",
   "o": [
    [
     "Able 0.90, Baker 0.69",
     "Correct. 56/62 = 0.90 and 43/62 = 0.69."
    ],
    [
     "Able 0.93, Baker 0.72",
     "Those divide by 60 instead of the 62-minute run (L2, Example 2.3: Able-Baker analysis)."
    ],
    [
     "Able 0.57, Baker 0.43",
     "Those are shares of total service time 99, not utilizations (L2, Example 2.3: Able-Baker analysis)."
    ],
    [
     "Able 0.69, Baker 0.90",
     "Reversed; Able, the faster carhop, is busier (L2, Example 2.3: Able-Baker analysis)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Customer 15 in the carhop example arrives at clock 33; Able and Baker are both busy until 35. What happens?",
   "o": [
    [
     "Baker serves at 35, waiting 2",
     "With a tie Able has seniority (L2, Example 2.3: the Able-Baker carhop problem, distributions)."
    ],
    [
     "Able serves at 35, waiting 2 minutes",
     "Correct. Both free at 35; Able takes the car; wait 35 − 33 = 2."
    ],
    [
     "Able serves at 33, no wait",
     "Able is busy until 35 (L2, Example 2.3: Able-Baker simulation table (Table 2.9))."
    ],
    [
     "The car leaves (balks)",
     "No balking is assumed in the example (L2, Example 2.3: Able-Baker simulation table (Table 2.9))."
    ]
   ],
   "a": 1
  }
 ],
 "3": [
  {
   "q": "Beeps per hour ~ Poisson(α = 2). What is the probability of no beeps in the next hour?",
   "o": [
    [
     "0.135",
     "Correct. p(0) = e⁻² = 0.135."
    ],
    [
     "0.271",
     "That is p(1) = 2e⁻² (L3, Poisson distribution)."
    ],
    [
     "0.406",
     "That is F(1) = p(0) + p(1) (L3, Example: repair person beeps (Poisson))."
    ],
    [
     "0.594",
     "That is P(X ≥ 2) = 1 − F(1) (L3, Example: repair person beeps (Poisson))."
    ]
   ],
   "a": 0
  },
  {
   "q": "A lamp's life (thousands of hours) is exponential with λ = 1/3. What is P(lamp lasts more than 3000 hours)?",
   "o": [
    [
     "0.632",
     "That is F(3) = 1 − e⁻¹, the probability it fails before 3000 hours (L3, Example 3.9)."
    ],
    [
     "0.368",
     "Correct. P(X > 3) = 1 − F(3) = e^(−3/3) = e⁻¹ = 0.368."
    ],
    [
     "0.145",
     "That is P(2 ≤ X ≤ 3) = e^(−2/3) − e⁻¹ (L3, Example 3.9)."
    ],
    [
     "0.513",
     "That is e^(−2/3) = P(X > 2) (L3, Example 3.9)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the bus example (buses at 7:00, 7:20, 7:40; passenger uniform between 7:00 and 7:30), what is the probability the passenger waits 5 minutes or less?",
   "o": [
    [
     "5/6",
     "That is the probability of waiting more than 5 minutes (L3, Example 3.8)."
    ],
    [
     "1/6",
     "Correct. Waiting ≤ 5 minutes needs arrival in (15, 20] minutes after 7:00: 5/30 = 1/6 = 1 − 5/6."
    ],
    [
     "1/2",
     "Arrivals in (0, 15) and (20, 30) wait more than 5 minutes; only [15, 20] gives a wait of 5 minutes or less (L3, Example 3.8: waiting for a bus)."
    ],
    [
     "1/3",
     "Only a 5-minute window out of 30 gives a short wait: 1/6 (L3, Example 3.8)."
    ]
   ],
   "a": 1
  },
  {
   "q": "X ~ N(50, 9). Find P(X > 56).",
   "o": [
    [
     "0.9772",
     "That is F(56) = Φ(2) (L3, Normal examples)."
    ],
    [
     "0.0228",
     "Correct. P(X > 56) = 1 − Φ((56 − 50)/3) = 1 − Φ(2) = 1 − 0.9772 = 0.0228."
    ],
    [
     "0.1587",
     "That is Φ(−1), used in the vessel example (L3, Normal examples)."
    ],
    [
     "0.2525",
     "z = (56 − 50)/3 = 2 since σ = √9 = 3, not 9 (L3, Normal examples)."
    ]
   ],
   "a": 1
  },
  {
   "q": "X takes 2, 5, 7, 9, 10 with probabilities 0.2, 0.2, 0.2, 0.3, 0.1. What is V(X)?",
   "o": [
    [
     "6.5",
     "That is the mean E(X) (L3, Worked example: discrete distribution, CDF and random numbers)."
    ],
    [
     "49.9",
     "That is E(X²); subtract (E(X))² = 42.25 (L3, Worked example: discrete distribution, CDF and random numbers)."
    ],
    [
     "7.65",
     "Correct. V(X) = E(X²) − (E(X))² = 49.9 − 6.5² = 49.9 − 42.25 = 7.65."
    ],
    [
     "2.77",
     "That is the standard deviation √7.65 (L3, Worked example: discrete distribution, CDF and random numbers)."
    ]
   ],
   "a": 2
  },
  {
   "q": "Using the group-size empirical CDF (0.10, 0.47, 0.62, 0.86, 0.90, 0.94, 0.96, 1.00 for sizes 1 to 8), which group size does the random number R = 0.50 give?",
   "o": [
    [
     "2",
     "Size 2 covers 0.10 < R ≤ 0.47; 0.50 is above it (L3, Empirical example: group sizes (discrete))."
    ],
    [
     "3",
     "Correct. 0.47 < 0.50 ≤ 0.62, so the group size is 3."
    ],
    [
     "4",
     "Size 4 covers 0.62 < R ≤ 0.86 (L3, Empirical example: group sizes (discrete))."
    ],
    [
     "5",
     "Size 5 covers 0.86 < R ≤ 0.90 (L3, Empirical example: group sizes (discrete))."
    ]
   ],
   "a": 1
  },
  {
   "q": "40% of printers are rejected. What are the mean and variance of the number of printers inspected until the first acceptable one?",
   "o": [
    [
     "E = 1.667, V = 1.111",
     "Correct. Geometric with p = 0.6, q = 0.4: E = 1/p = 1/0.6 = 1.667, V = q/p² = 0.4/0.36 = 1.111."
    ],
    [
     "E = 2.5, V = 3.75",
     "These use p = 0.4 (the rejection probability) as the success probability (L3, Geometric distribution)."
    ],
    [
     "E = 0.6, V = 0.24",
     "These are the Bernoulli mean p and variance pq (L3, Discrete distributions: Bernoulli)."
    ],
    [
     "E = 0.096, V = 0.4",
     "0.096 is p(3), not the mean (L3, Example 3.6)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Calls arrive as a Poisson process with λ = 2 per hour. What are the mean and variance of the number of calls in 3 hours?",
   "o": [
    [
     "Mean 2, variance 2",
     "That is for 1 hour; for t = 3 the parameter is λt (L3, Poisson process)."
    ],
    [
     "Mean 6, variance 6",
     "Correct. E[N(t)] = V[N(t)] = λt = 2 × 3 = 6."
    ],
    [
     "Mean 6, variance 36",
     "For a Poisson process the variance equals the mean λt, not its square (L3, Poisson process)."
    ],
    [
     "Mean 1.5, variance 2.25",
     "3/2 is t/λ, which is not a Poisson process quantity (L3, Poisson process)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Calls arrive as a Poisson process with λ = 2 per hour. What is the probability that the first call comes after more than 1 hour?",
   "o": [
    [
     "0.865",
     "That is P(A₁ ≤ 1) = 1 − e⁻² (L3, Poisson process: interarrival times)."
    ],
    [
     "0.135",
     "Correct. P(A₁ > t) = P(N(t) = 0) = e^(−λt) = e⁻² = 0.135."
    ],
    [
     "0.5",
     "0.5 hours is the mean interarrival time 1/λ, not a probability (L3, Poisson process: interarrival times)."
    ],
    [
     "0.271",
     "That is P(N(1) = 1) = 2e⁻² (L3, Poisson distribution)."
    ]
   ],
   "a": 1
  },
  {
   "q": "CPU time is triangular with a = 0.05 s, b = 1.1 s, c = 6.5 s. What is the mean CPU time?",
   "o": [
    [
     "1.1 s",
     "1.1 is the mode b, not the mean (L3, Weibull, triangular and lognormal distributions)."
    ],
    [
     "2.55 s",
     "Correct. E(X) = (a + b + c)/3 = (0.05 + 1.1 + 6.5)/3 = 7.65/3 = 2.55 s."
    ],
    [
     "3.275 s",
     "(a + c)/2 ignores the mode; the triangular mean is (a + b + c)/3 (L3, Weibull, triangular and lognormal distributions)."
    ],
    [
     "0.541 s",
     "0.541 is the probability F(2.5) from Example 3.14, not a time (L3, Weibull, triangular and lognormal distributions)."
    ]
   ],
   "a": 1
  }
 ],
 "4": [
  {
   "q": "<b>Applied.</b> LCG with a = 9, c = 3, m = 32 and X₀ = 7. What are X₁ to X₄ and the maximum period?",
   "o": [
    [
     "2, 21, 0, 3; period 32",
     "Correct. (9·7 + 3) = 66 mod 32 = 2; (9·2 + 3) = 21; (9·21 + 3) = 192 mod 32 = 0; (9·0 + 3) = 3. m = 2⁵, c = 3 is relatively prime to 32 and a = 9 = 1 + 4(2), so P = m = 32."
    ],
    [
     "2, 21, 0, 3; period 8",
     "m/4 = 8 is the c = 0 case (L4, LCM: proper choice of parameters)."
    ],
    [
     "66, 21, 192, 3; period 32",
     "66 and 192 must be reduced mod 32, to 2 and 0 (L4, Linear Congruential Method)."
    ],
    [
     "2, 21, 0, 3; period 31",
     "m − 1 is the case of a prime modulus with c = 0; 32 is not prime (L4, LCM: proper choice of parameters)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Multiplicative LCG with a = 11, c = 0, m = 32. What is the period for X₀ = 5 and for X₀ = 2?",
   "o": [
    [
     "32 and 32",
     "c = 0, so the period cannot exceed m/4 = 8 (L4, LCM: proper choice of parameters)."
    ],
    [
     "8 and 4",
     "Correct. a = 11 = 3 + 8(1) and X₀ = 5 is odd, so P = m/4 = 8: 23, 29, 31, 21, 7, 13, 15, 5. X₀ = 2 is even: 22, 18, 6, 2, period 4."
    ],
    [
     "8 and 8",
     "The maximum m/4 needs an odd seed; X₀ = 2 gives 22, 18, 6, 2 (period 4) (L4, LCM example 2)."
    ],
    [
     "31 and 31",
     "m − 1 is the prime-modulus case; 32 is not prime (L4, LCM: proper choice of parameters)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Multiplicative LCG with prime modulus m = 7, c = 0, a = 3 and X₀ = 1. What sequence and period do you get?",
   "o": [
    [
     "3, 2, 6, 4, 5, 1; period 6",
     "Correct. 3, 9 mod 7 = 2, 6, 18 mod 7 = 4, 12 mod 7 = 5, 15 mod 7 = 1. The smallest k with 3ᵏ − 1 divisible by 7 is k = 6 = m − 1, so the longest possible period P = m − 1 = 6 is reached."
    ],
    [
     "3, 2, 6, 4, 5, 1; period 7",
     "For m prime and c = 0 the longest possible period is m − 1 = 6, not m; the seed returns after 6 steps (L4, LCM: proper choice of parameters)."
    ],
    [
     "2, 4, 1; period 3",
     "That is the sequence for a = 2 (2³ − 1 = 7 is divisible by 7 already at k = 3, so the period is only 3); for a = 3 the period is 6 (L4, LCM: proper choice of parameters)."
    ],
    [
     "3, 9, 27, 81, 243, 729; period 6",
     "Each product must be reduced mod 7 (9 mod 7 = 2, 27 mod 7 = 6, …) (L4, Linear Congruential Method)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> The 60 numbers of the lecture notes' Example 4.9 (0.30 0.48 0.36 … 0.73 0.44) have a = 40 runs up and down. Test independence using the number of runs (α = 0.05).",
   "o": [
    [
     "μ<sub>a</sub> = 39.67, σ<sub>a</sub>² = 10.34, Z₀ = 0.10, not rejected",
     "Correct. μ<sub>a</sub> = (2·60 − 1)/3 = 39.67; σ<sub>a</sub>² = (16·60 − 29)/90 = 931/90 = 10.34, σ<sub>a</sub> = 3.22; Z₀ = (40 − 39.67)/3.22 = 0.10, and −1.96 ≤ 0.10 ≤ 1.96."
    ],
    [
     "μ<sub>a</sub> = 39.67, σ<sub>a</sub>² = 10.34, Z₀ = 0.03, not rejected",
     "0.03 divides by the variance 10.34 instead of the standard deviation σ<sub>a</sub> = 3.22 (L4, Runs test: runs up and down)."
    ],
    [
     "μ<sub>a</sub> = 40, Z₀ = 0, not rejected",
     "μ<sub>a</sub> = (2N − 1)/3 = 119/3 = 39.67, not 2N/3 = 40 (L4, Runs test: runs up and down)."
    ],
    [
     "Z₀ = 0.10, rejected because Z₀ > 0",
     "H₀ is rejected only if Z₀ falls outside −z<sub>0.025</sub> ≤ Z₀ ≤ z<sub>0.025</sub> = 1.96 (L4, Runs test: runs up and down)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> The 40 numbers on slide 53 (each row increasing from about 0.1 to 0.9) give the signs + + + + + + + + + − (repeated 4 times, ending without the last −), i.e. a = 7 runs. What does the runs up and down test conclude at α = 0.05?",
   "o": [
    [
     "Z₀ = −0.13, not rejected",
     "−0.13 is the slide 58 example with a = 26 (L4, Runs up and down example)."
    ],
    [
     "Z₀ = −7.42, independence rejected",
     "Correct. μ<sub>a</sub> = 26.33, σ<sub>a</sub> = √6.79 = 2.61, Z₀ = (7 − 26.33)/2.61 = −7.42 < −1.96. This is why the slide says KS and chi-square would accept uniformity \"but, not so\"."
    ],
    [
     "The test cannot be used because N < 50",
     "The normal approximation needs N > 20, and N = 40 (L4, Runs test: runs up and down)."
    ],
    [
     "Z₀ = 7.42, independence not rejected",
     "Too few runs gives a negative Z₀, and |Z₀| > 1.96 means rejection (L4, Runs test: runs up and down)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In the 30-number autocorrelation sequence, test the 5th, 10th, 15th, … numbers (i = 5, m = 5) at α = 0.05.",
   "o": [
    [
     "M = 4, ρ̂ = −0.1945, Z₀ = −1.52, not rejected",
     "That is the i = 3 case (L4, Autocorrelation example)."
    ],
    [
     "M = 5, ρ̂ = 0.58, Z₀ = 4.51, rejected",
     "M must satisfy 5 + (M+1)5 ≤ 30, so M = 4 (L4, Autocorrelation test)."
    ],
    [
     "M = 4, ρ̂ = 0.577, Z₀ = 4.51, independence rejected (positive autocorrelation)",
     "Correct. Numbers 0.89, 0.93, 0.91, 0.88, 0.95, 0.87; sum of products = 4.1373; ρ̂ = 4.1373/5 − 0.25 = 0.577; σ̂ = √59/60 = 0.128; Z₀ = 4.51 > 1.96. High numbers follow high numbers."
    ],
    [
     "M = 4, ρ̂ = 0.827, Z₀ = 6.46, rejected",
     "0.827 forgets to subtract 0.25 (L4, Autocorrelation test)."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> In the 30-number autocorrelation sequence (0.12 0.01 0.23 … 0.69 0.87), test the 2nd, 7th, 12th, … numbers (i = 2, m = 5) at α = 0.05.",
   "o": [
    [
     "M = 4, ρ̂ = −0.134, Z₀ = −1.05, not rejected",
     "Correct. 2 + (M+1)5 ≤ 30 gives M = 4; numbers 0.01, 0.64, 0.15, 0.60, 0.49, 0.19; sum of products = 0.0064 + 0.0960 + 0.0900 + 0.2940 + 0.0931 = 0.5795; ρ̂ = 0.5795/5 − 0.25 = −0.1341; σ̂ = √59/60 = 0.128; Z₀ = −1.05, inside ±1.96."
    ],
    [
     "M = 5, seven numbers used, not rejected",
     "M must satisfy 2 + (M+1)5 ≤ 30, i.e. M ≤ 4.6, so M = 4 and six numbers are used (L4, Autocorrelation test)."
    ],
    [
     "M = 4, ρ̂ = 0.116, Z₀ = 0.91, not rejected",
     "0.116 = 0.5795/5 forgets to subtract 0.25 (L4, Autocorrelation test)."
    ],
    [
     "M = 4, ρ̂ = −0.134, Z₀ = −1.05, rejected (negative autocorrelation)",
     "|Z₀| = 1.05 < z<sub>0.025</sub> = 1.96, so H₀ is not rejected; the sign of ρ̂ alone does not decide (L4, Autocorrelation test)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> The lecture spreadsheet's LCM with a = 13, c = 0, m = 32, X₀ = 6 gives R = 0.4375, 0.6875, 0.9375, 0.1875. KS test at α = 0.05?",
   "o": [
    [
     "D = 0.1875 < D<sub>0.05</sub> = 0.624, not rejected",
     "Correct. Sorted: 0.1875, 0.4375, 0.6875, 0.9375. Every i/N − R<sub>(i)</sub> = 0.0625 (D⁺) and every R<sub>(i)</sub> − (i−1)/N = 0.1875 (D⁻); D = 0.1875; N = 4 gives D<sub>0.05</sub> = 0.624."
    ],
    [
     "D = 0.0625 < 0.624, not rejected",
     "D is the maximum of D⁺ and D⁻, and D⁻ = 0.1875 is larger (L4, Frequency test 1: Kolmogorov-Smirnov test)."
    ],
    [
     "D = 0.8125 > 0.624, rejected",
     "0.8125 comes from applying the formulas without sorting the data first (L4, KS example)."
    ],
    [
     "D = 0.1875 > D<sub>0.05</sub> = 0.136, rejected",
     "1.36/√N is only for N over 35 (L4, Frequency test 1: Kolmogorov-Smirnov test)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Poker test: 1000 three-digit numbers, 700 all different, 280 exactly one pair, 20 three like digits, α = 0.05. χ₀² and decision?",
   "o": [
    [
     "χ₀² = 0.93, not rejected",
     "0.93 ignores the three-alike class, whose term (20 − 10)²/10 = 10 dominates (L4, Poker test)."
    ],
    [
     "χ₀² = 10.93, independence rejected",
     "Correct. (700−720)²/720 = 0.56, (280−270)²/270 = 0.37, (20−10)²/10 = 10; total 10.93 > χ²<sub>0.05,2</sub> = 5.99."
    ],
    [
     "χ₀² = 10.93, not rejected because χ²<sub>0.05,9</sub> = 16.9",
     "There are 3 classes, so df = 2, not 9 (L4, Poker test)."
    ],
    [
     "χ₀² = 47.65, rejected",
     "47.65 is the slide example with 680/289/31 (L4, Poker test)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Midsquare method with Z₀ = 1234. What are Z₁, Z₂ and Z₃?",
   "o": [
    [
     "5227, 3215, 3362",
     "Correct. 1234² = 01522756 → 5227; 5227² = 27321529 → 3215; 3215² = 10336225 → 3362."
    ],
    [
     "1522, 3215, 1033",
     "Take the middle four digits of the 8-digit square, not the first four (L4, Midsquare method)."
    ],
    [
     "5227, 2732, 1033",
     "2732 is the first four digits of 27321529; the middle four are 3215 (L4, Midsquare method)."
    ],
    [
     "2275, 3215, 3362",
     "The square must be padded to 8 digits (01522756) before taking the middle four (L4, Midsquare method)."
    ]
   ],
   "a": 0
  }
 ],
 "5": [
  {
   "q": "An exponential distribution has λ = 0.5. Using X = −(1/λ) ln(1 − R) with R = 0.75, X is:",
   "o": [
    [
     "2.773",
     "Correct. X = −2 ln(0.25) = 2 × 1.3863 = 2.773."
    ],
    [
     "0.575",
     "Wrong: that is −2 ln(0.75), using ln R instead of ln(1 − R) in (5.1) (L5, Procedure for the inverse transform (exponential))."
    ],
    [
     "0.693",
     "Wrong: that is −0.5 ln(0.25); the factor is 1/λ = 2, not λ (L5, Procedure for the inverse transform (exponential))."
    ],
    [
     "1.386",
     "Wrong: that is −ln(0.25) without the factor 1/λ = 2 (L5, Procedure for the inverse transform (exponential))."
    ]
   ],
   "a": 0
  },
  {
   "q": "For λ = 2 and R = 0.4, the two exponential generators give: (5.1) X = −(1/λ) ln(1 − R) and (5.2) X = −(1/λ) ln R. Which pair is right?",
   "o": [
    [
     "(5.1) 0.255, (5.2) 0.458",
     "Correct. −0.5 ln 0.6 = 0.255 and −0.5 ln 0.4 = 0.458. Different values, same distribution."
    ],
    [
     "Both give 0.255",
     "Wrong: the same R gives different values; only the distribution is the same (L5, Procedure for the inverse transform (exponential))."
    ],
    [
     "(5.1) 0.458, (5.2) 0.255",
     "Wrong: these are swapped; ln(1 − R) = ln 0.6 is used in (5.1) (L5, Procedure for the inverse transform (exponential))."
    ],
    [
     "(5.1) 1.022, (5.2) 1.833",
     "Wrong: these multiply by λ = 2 instead of 1/λ (L5, Procedure for the inverse transform (exponential))."
    ]
   ],
   "a": 0
  },
  {
   "q": "For the triangular distribution (0, 2), mode 1, R = 0.32 gives X =",
   "o": [
    [
     "0.8",
     "Correct. R ≤ 1/2, so X = √(2 × 0.32) = √0.64 = 0.8."
    ],
    [
     "0.566",
     "Wrong: that is √0.32; the formula is √(2R) (L5, 5.1.3 Triangular distribution)."
    ],
    [
     "0.834",
     "Wrong: that is 2 − √(2 × 0.68), the branch for R > 1/2 (L5, 5.1.3 Triangular distribution)."
    ],
    [
     "0.64",
     "Wrong: 0.64 = 2R; X is its square root (L5, 5.1.3 Triangular distribution)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Using the distribution of Example 5.2 (F = 0.50, 0.80, 1.00 at x = 0, 1, 2), the random numbers 0.12, 0.91, 0.50, 0.66 generate:",
   "o": [
    [
     "0, 2, 0, 1",
     "Correct. 0.12 ≤ 0.5 → 0; 0.91 > 0.8 → 2; 0.50 ≤ 0.5 → 0; 0.5 < 0.66 ≤ 0.8 → 1."
    ],
    [
     "0, 2, 1, 1",
     "Wrong: R = 0.50 satisfies R ≤ 0.5, so X = 0 (L5, Example 5.2: empirical discrete distribution (shipments))."
    ],
    [
     "1, 2, 0, 1",
     "Wrong: 0.12 ≤ 0.5 gives X = 0 (L5, Example 5.2: empirical discrete distribution (shipments))."
    ],
    [
     "0, 1, 0, 1",
     "Wrong: 0.91 > 0.8 gives X = 2 (L5, Example 5.2: empirical discrete distribution (shipments))."
    ]
   ],
   "a": 0
  },
  {
   "q": "For Example 5.4 with k = 10 (p(x) = 2x/110), R = 0.73 generates X =",
   "o": [
    [
     "8",
     "Wrong: the positive root is x = 9.475, so x − 1 = 8.475, which must be rounded up, not down (L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))."
    ],
    [
     "9",
     "Correct. (1 + √(1 + 440 × 0.73))/2 − 1 = (1 + √322.2)/2 − 1 = 8.475, rounded up to 9. Check: F(8) = 72/110 = 0.655 < 0.73 ≤ F(9) = 90/110 = 0.818."
    ],
    [
     "10",
     "Wrong: F(9) = 0.818 ≥ 0.73 already, so X = 9 (L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))."
    ],
    [
     "7",
     "Wrong: F(7) = 56/110 = 0.509 < 0.73 (L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))."
    ]
   ],
   "a": 1
  },
  {
   "q": "A geometric distribution on {1, 2, …} has p = 0.25. With R = 0.6, X = 1 + ⌈ln(1 − R)/ln(1 − p) − 1⌉ equals:",
   "o": [
    [
     "3",
     "Wrong: ln 0.4/ln 0.75 = 3.185; 1 + ⌈2.185⌉ = 4 (L5, Example 5.5: geometric distribution)."
    ],
    [
     "4",
     "Correct. ln 0.4/ln 0.75 = 3.185, ⌈2.185⌉ = 3, X = 1 + 3 = 4."
    ],
    [
     "5",
     "Wrong: ⌈2.185⌉ = 3, not 4 (L5, Example 5.5: geometric distribution)."
    ],
    [
     "2",
     "Wrong: with q = 1, F(x) = 1 − 0.75^x, and F(2) = 0.4375 < 0.6, so X = 2 is too small; X = 4 satisfies F(3) = 0.578 < 0.6 ≤ F(4) = 0.684 (L5, Example 5.5: geometric distribution)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In Example 5.6, why is X2 = 1 for R2 = 0.105?",
   "o": [
    [
     "ln(0.895)/ln(0.5) − 1 is about −0.84, whose round-up is 0, so X2 = 1 + 0 = 1",
     "Correct. ln 0.895/ln 0.5 = 0.160, minus 1 gives −0.840, ⌈−0.840⌉ = 0."
    ],
    [
     "ln(0.105)/ln(0.5) − 1 is about 2.25, which rounds to give X2 = 1",
     "Wrong: the formula uses ln(1 − R) = ln(0.895), not ln R; and ln(0.105)/ln(0.5) − 1 = 2.25 would give 1 + ⌈2.25⌉ = 4, not 1 (L5, Example 5.6: three geometric variates with mean 2)."
    ],
    [
     "Because ⌈0.105 × 2⌉ = 1",
     "Wrong: that is the discrete uniform formula ⌈Rk⌉ (L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})."
    ],
    [
     "Because the geometric variate is always at least q + 1 = 2, then reduced by 1",
     "Wrong: the minimum value is q = 1; X = q + ⌈…⌉ (L5, Example 5.5: geometric distribution)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Poisson with α = 1 (e^(−1) = 0.3679), random numbers 0.9, 0.6, 0.5. The generated N is:",
   "o": [
    [
     "0",
     "Wrong: P = 0.9 ≥ 0.3679, so n = 0 is rejected (L5, Procedure for generating a Poisson variate N)."
    ],
    [
     "1",
     "Wrong: P = 0.9 × 0.6 = 0.54 ≥ 0.3679, so n = 1 is rejected (L5, Procedure for generating a Poisson variate N)."
    ],
    [
     "2",
     "Correct. P = 0.9, then 0.54, then 0.27 < 0.3679, accept N = 2."
    ],
    [
     "3",
     "Wrong: P = 0.27 < e^(−1) already at n = 2 (L5, Procedure for generating a Poisson variate N)."
    ]
   ],
   "a": 2
  },
  {
   "q": "About how many random numbers are needed to generate 500 Poisson variates with mean α = 0.6?",
   "o": [
    [
     "300",
     "Wrong: that is 500α; each variate N = n uses n + 1 numbers, so the average is α + 1 (L5, Procedure for generating a Poisson variate N)."
    ],
    [
     "500",
     "Wrong: rejections mean more than one number per variate on average (L5, Procedure for generating a Poisson variate N)."
    ],
    [
     "800",
     "Correct. 500(α + 1) = 500 × 1.6 = 800."
    ],
    [
     "1100",
     "Wrong: the factor is α + 1 = 1.6, not 2.2 (L5, Procedure for generating a Poisson variate N)."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the acceptance-rejection method for X uniform on [1/4, 1], what fraction of generated random numbers is accepted on average?",
   "o": [
    [
     "1/4",
     "Wrong: 1/4 is the probability of rejection (R < 1/4) (L5, 5.2 Acceptance-rejection technique)."
    ],
    [
     "3/4",
     "Correct. Acceptance needs R ≥ 1/4, and P(1/4 ≤ R ≤ 1) = 3/4, the denominator in the correctness proof."
    ],
    [
     "1",
     "Wrong: values R < 1/4 are rejected (L5, 5.2 Acceptance-rejection technique)."
    ],
    [
     "1/2",
     "Wrong: P(R ≥ 1/4) = 1 − 1/4 = 3/4 (L5, 5.2 Acceptance-rejection technique)."
    ]
   ],
   "a": 1
  }
 ],
 "6": [
  {
   "q": "<b>Applied.</b> A discrete sample of n = 20 has values 0, 1, 2, 3 with frequencies 5, 10, 3, 2. What are X̄ and S²?",
   "o": [
    [
     "X̄ = 1.1, S² = 0.83",
     "Correct. Σ fX = 0 + 10 + 6 + 6 = 22 → X̄ = 1.1; Σ fX² = 0 + 10 + 12 + 18 = 40 → S² = (40 − 20 × 1.21)/19 = 15.8/19 = 0.83."
    ],
    [
     "X̄ = 1.1, S² = 0.79",
     "That divides by n = 20 instead of n − 1 = 19 (L6, Parameter estimation)."
    ],
    [
     "X̄ = 1.5, S² = 1.67",
     "That is the plain average of the values 0 to 3, ignoring the frequencies (L6, Parameter estimation)."
    ],
    [
     "X̄ = 1.1, S² = 2.0",
     "That is Σ fX²/n = 40/20 without subtracting nX̄² (L6, Parameter estimation)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Raw data are lost; only class intervals are known: [0, 2) f = 4, [2, 4) f = 6, [4, 6) f = 10. What is the approximate sample mean?",
   "o": [
    [
     "3.0",
     "That is the midpoint of the whole range, ignoring the frequencies (L6, Parameter estimation)."
    ],
    [
     "3.6",
     "Correct. Midpoints 1, 3, 5: Σ fm = 4 + 18 + 50 = 72, X̄ = 72/20 = 3.6 (and S² = (308 − 20 × 12.96)/19 = 2.57)."
    ],
    [
     "2.6",
     "That uses the lower endpoints 0, 2, 4: (0 + 12 + 40)/20; the rule uses the midpoints mⱼ (L6, Parameter estimation)."
    ],
    [
     "24",
     "That is Σ fm divided by the number of intervals c = 3; divide by n = 20 (L6, Parameter estimation)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> A Poisson chi-square test ends with 6 cells after combining (α estimated from data) and χ₀² = 10.2. At α = 0.05 (χ²0.05,4 = 9.49, χ²0.05,5 = 11.07), the decision is:",
   "o": [
    [
     "Reject H₀, since 10.2 > 9.49",
     "Correct. df = k − s − 1 = 6 − 1 − 1 = 4 → critical value 9.49, and 10.2 > 9.49, so H₀ is rejected."
    ],
    [
     "Accept H₀, since 10.2 < 11.07",
     "That uses df = 5 = k − 1, forgetting the estimated parameter (L6, Chi-square test)."
    ],
    [
     "Accept H₀, since χ₀² must exceed 2 × critical value",
     "No such rule; reject when χ₀² > χ²α,k−s−1 (L6, Chi-square test)."
    ],
    [
     "The test cannot be used with 6 cells",
     "Any k is allowed as long as each Eᵢ ≥ 5 (L6, Chi-square test)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Equal-probability chi-square test of an exponential with λ = 0.084 and k = 8 cells. What is the endpoint a₃?",
   "o": [
    [
     "1.590",
     "That is a₁ = −(1/0.084) ln(0.875) (L6, Chi-square test with equal probabilities)."
    ],
    [
     "3.425",
     "That is a₂ = −(1/0.084) ln(0.75) (L6, Chi-square test with equal probabilities)."
    ],
    [
     "5.595",
     "Correct. a₃ = −(1/0.084) ln(1 − 3 × 0.125) = −(1/0.084) ln(0.625) = 0.4700/0.084 = 5.595."
    ],
    [
     "8.252",
     "That is a₄ = −(1/0.084) ln(0.5) (L6, Chi-square test with equal probabilities)."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> In an equal-probability chi-square test with n = 50 observations, what is the largest number of cells k allowed, and what is each Eᵢ if k = 8?",
   "o": [
    [
     "k ≤ 10; Eᵢ = 6.25",
     "Correct. Eᵢ = n/k ≥ 5 → k ≤ n/5 = 10; with k = 8, Eᵢ = 50/8 = 6.25."
    ],
    [
     "k ≤ 7; Eᵢ = 6.25",
     "√50 ≈ 7 is the lower end of the n > 100 rule, not the equal-probability limit (L6, Chi-square test with equal probabilities)."
    ],
    [
     "k ≤ 10; Eᵢ = 5",
     "Eᵢ = 5 only when k = 10 (L6, Chi-square test with equal probabilities)."
    ],
    [
     "k ≤ 25; Eᵢ = 0.125",
     "0.125 is pᵢ, not Eᵢ = n pᵢ (L6, Chi-square test with equal probabilities)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> K-S test with N = 50 points: D⁺ = 0.1054, D⁻ = 0.0080. With D0.05 = 1.36/√N, the conclusion is:",
   "o": [
    [
     "Reject H₀ since D = 0.1054 > 0.0080",
     "D is compared with the critical value, not with D⁻ (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "Do not reject H₀ since D = 0.1054 < 0.1923",
     "Correct. D = max(D⁺, D⁻) = 0.1054; D0.05 = 1.36/√50 = 0.1923 (Example 6.7)."
    ],
    [
     "Reject H₀ since D = 0.1134 > 0.1054",
     "D is the maximum of D⁺ and D⁻, not their sum (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "Do not reject H₀ since D = 0.0080 < 0.1923",
     "D is the larger of D⁺ and D⁻ = 0.1054 (L6, Kolmogorov-Smirnov test)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Using Table A.8, the K-S critical value at α = 0.05 for N = 10 observations is:",
   "o": [
    [
     "0.410",
     "Correct. Table A.8: N = 10, D0.05 = 0.410."
    ],
    [
     "0.368",
     "That is D0.10 for N = 10 (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "0.430",
     "1.36/√10 = 0.430; the √N formula is only for N over 35 (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "0.490",
     "That is D0.01 for N = 10 (L6, Kolmogorov-Smirnov test)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> A chi-square test is planned for n = 400 observations of a continuous variable. Using the recommended table, how many class intervals k should be used?",
   "o": [
    [
     "20 to 80",
     "Correct. For n > 100 the table gives √n to n/5 = √400 to 400/5 = 20 to 80 (slide 29)."
    ],
    [
     "10 to 20",
     "That is the row for n = 100, not n > 100 (L6, Chi-square test)."
    ],
    [
     "5 to 10",
     "That is the row for n = 50 (L6, Chi-square test)."
    ],
    [
     "Do not use the chi-square test",
     "That is the row for n = 20; with n = 400 the chi-square test is fine (L6, Chi-square test)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Scenario.</b> An expert says sales are between 1000 and 5000 units, with a 90% chance of more than 2000, 25% of more than 3500 and 1% of more than 4500. What is P(2000 < x ≤ 3500)?",
   "o": [
    [
     "0.25",
     "That is P(x > 3500) (L6, Selecting input models without data)."
    ],
    [
     "0.65",
     "Correct. P(x > 2000) − P(x > 3500) = 0.90 − 0.25 = 0.65 (Example 6.8)."
    ],
    [
     "0.24",
     "That is P(3500 < x ≤ 4500) = 0.25 − 0.01 (L6, Selecting input models without data)."
    ],
    [
     "0.75",
     "That is the cumulative P(x ≤ 3500) (L6, Selecting input models without data)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> 20 order gaps give X̄ = 5.2, σ̂² = 26.7 and lag-1 covariance 21.6. For an EAR(1) model, what are φ̂ and λ̂?",
   "o": [
    [
     "φ̂ = 0.8, λ̂ = 0.192",
     "Correct. φ̂ = ρ̂ = 21.6/26.7 = 0.81 ≈ 0.8; λ̂ = 1/X̄ = 1/5.2 = 0.192 (Example 6.10)."
    ],
    [
     "φ̂ = 1.24, λ̂ = 5.2",
     "That inverts the ratio (26.7/21.6) and uses X̄ instead of 1/X̄ (L6, Time-series input models)."
    ],
    [
     "φ̂ = 0.8, λ̂ = 5.2",
     "λ̂ = 1/X̄, not X̄ (L6, Time-series input models)."
    ],
    [
     "φ̂ = −0.8, λ̂ = 0.192",
     "EAR(1) can only represent positive autocorrelation, 0 ≤ φ < 1 (L6, Time-series input models)."
    ]
   ],
   "a": 0
  }
 ],
 "7": [
  {
   "q": "<b>Applied.</b> Using the trace of Example 7.1 (intervals 0–3, 3–5, 5–11, 11–12, 12–16 with NCUST 0, 1, 0, 1, 2 and STATUS 0, 0, 0, 0, 1), what L̂Q does the program report?",
   "o": [
    [
     "0.25",
     "That would be the value if STATUS were correct (only 12–16 has someone waiting): 4/16."
    ],
    [
     "0.4375",
     "Correct. [(0)3 + (1)2 + (0)6 + (1)1 + (1)4]/16 = 7/16 = 0.4375."
    ],
    [
     "0.6875",
     "That is the time-average number in the system, Σ NCUST·Δt/16 = 11/16, not in the queue."
    ],
    [
     "7",
     "7 is the numerator (area under the queue-length curve); it must be divided by T = 16."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In Example 7.1, if STATUS had the correct value (1 whenever NCUST ≥ 1), what would L̂Q be?",
   "o": [
    [
     "0.4375",
     "That is the reported (wrong) value based on the incorrect STATUS."
    ],
    [
     "0.25",
     "Correct. Queue length is 0 except 12–16 where it is 1, so L̂Q = 4/16 = 0.25."
    ],
    [
     "0",
     "At 12–16 there are 2 customers and one server, so one customer waits for 4 time units."
    ],
    [
     "0.125",
     "That would need only 2 time units of waiting; the waiting lasts 4 units (12–16)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In Example 7.1, besides CLOCK = 3, at which other trace row does the same logic error appear?",
   "o": [
    [
     "CLOCK = 5",
     "At 5 NCUST = 0 and STATUS = 0, which is consistent."
    ],
    [
     "CLOCK = 11",
     "Correct. NCUST = 1 but STATUS = 0 again: a customer is present while the server is idle."
    ],
    [
     "CLOCK = 12",
     "At 12 NCUST = 2, STATUS = 1, which is consistent."
    ],
    [
     "CLOCK = 16",
     "At 16 NCUST = 1, STATUS = 1, which is consistent."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Scenario.</b> At the end of a run the program prints the arrival rate as 4.0 per hour, although it was entered as 5.0. Which verification consideration caught this?",
   "o": [
    [
     "Printing the input parameters at the end of the simulation",
     "Correct. This confirms the parameter values were not changed or modified."
    ],
    [
     "Turing test",
     "The Turing test compares model and real reports by an expert (L7, 7.3.5)."
    ],
    [
     "Sensitivity analysis",
     "Sensitivity analysis checks face validity by changing inputs (L7, 7.3.1)."
    ],
    [
     "Homogeneity test",
     "Homogeneity tests are used when combining data sets (L7, 7.3.2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Scenario.</b> A model output shows the queue in front of one machine growing larger and larger. Which statistic signals this and what does it suggest?",
   "o": [
    [
     "Total count = 0; no items entered",
     "A total count of 0 means nothing entered; here items are piling up."
    ],
    [
     "High current contents; many entities are delayed and the queue is unstable",
     "Correct."
    ],
    [
     "Current count = total count = 1; resource never freed",
     "That shows a single entity holding a resource."
    ],
    [
     "Low current contents; the model is valid",
     "The contents are high, and these are verification, not validation, checks."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Scenario.</b> A model was calibrated on one data set and fits it very well. What do the notes recommend before accepting it?",
   "o": [
    [
     "Nothing, a good fit proves validity",
     "This is exactly the criticism of calibration: the model may only fit one data set (L7, 7.3)."
    ],
    [
     "Collect a new data set and use it for the final validation",
     "Correct. If there is a discrepancy, return to calibration."
    ],
    [
     "Run a longer trace",
     "A trace verifies the program logic; it does not test fit to new data (L7, Three verification techniques)."
    ],
    [
     "Lower the accuracy level",
     "Lowering accuracy is the choice when accuracy cannot be reached within budget (L7, 7.3)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Scenario.</b> A bank model is changed from FCFS to a priority queue discipline. How is this change classified?",
   "o": [
    [
     "Minor change of a single numerical parameter",
     "Examples of that are machine speed or arrival rate (L7, 7.3.3)."
    ],
    [
     "Minor change of a statistical distribution",
     "Example: distribution of service time (L7, 7.3.3)."
    ],
    [
     "Major change in the logical structure of a subsystem",
     "Correct. The notes' example is a change in queue discipline for a waiting-line model."
    ],
    [
     "Major change of design in a new system",
     "Example: a computerized inventory control system (L7, 7.3.3)."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Scenario.</b> To validate with historical data, inputs are recorded in March and average delays in June. What is the problem?",
   "o": [
    [
     "None, any time period is fine",
     "Inputs and responses must be from the same period (L7, 7.3.4)."
    ],
    [
     "The comparison could be misleading because the data were not collected during the same time period",
     "Correct. Responses depend on the inputs, so both must come from the same period."
    ],
    [
     "A Turing test must always be used instead",
     "The Turing test is for when no statistical test applies (L7, 7.3.5)."
    ],
    [
     "Historical data can only validate structural assumptions",
     "Historical data is used for input-output validation (L7, 7.3.4)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In the Turing test example, how many reports does the engineer receive, and how many are produced by the model?",
   "o": [
    [
     "5 reports, all from the model",
     "There are also 5 real reports (L7, 7.3.5)."
    ],
    [
     "10 reports, 5 from the model",
     "Correct. 5 real reports over 5 days and 5 fake reports from simulation output, shuffled."
    ],
    [
     "10 reports, all real",
     "Half are fake reports produced from model output (L7, 7.3.5)."
    ],
    [
     "2 reports, 1 from the model",
     "The example uses 5 days, giving 10 reports (L7, 7.3.5)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Scenario.</b> A user asks: “If I double the arrival rate, does the waiting time go up as I would expect?” This checks:",
   "o": [
    [
     "Face validity, using sensitivity analysis",
     "Correct. Sensitivity analysis checks whether the model behaves as expected when inputs change."
    ],
    [
     "Verification by trace",
     "A trace prints variable changes to check program logic (L7, Three verification techniques)."
    ],
    [
     "Validation using historical input data",
     "That compares outputs with real responses from the same period (L7, 7.3.4)."
    ],
    [
     "Data assumptions by goodness-of-fit",
     "Goodness-of-fit checks the input distributions (L7, 7.3.2)."
    ]
   ],
   "a": 0
  }
 ],
 "8": [
  {
   "q": "<b>Applied.</b> Gift Shop with (delay, service) = (0,3), (2,4), (6,2), (1,3), (5,2). What are the average waiting time and the clerk idle percentage?",
   "o": [
    [
     "3.2 min and 12.5%",
     "Correct. Arrivals 0, 2, 8, 9, 14; ends 3, 7, 10, 13, 16; WT 3, 5, 2, 4, 2 = 16 → 3.2; idle 1 + 1 = 2 over 16 min = 12.5%."
    ],
    [
     "2.8 min and 12.5%",
     "2.8 is the average service time (14/5); WT includes queueing (L8, Gift Shop model)."
    ],
    [
     "3.2 min and 25%",
     "Idle is only 2 min (customers 3 and 5 each find the clerk free 1 min); 2/16 = 12.5% (L8, Gift Shop model)."
    ],
    [
     "4.0 min and 0%",
     "Sum WT = 16, so 16/5 = 3.2; and the clerk is idle 2 min (L8, Gift Shop model)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Using the lab's RandInt(Low, High) = Low + int(d × (High − Low)) with d = rand()/(RAND_MAX + 1), which values can RandInt(1, 6) return?",
   "o": [
    [
     "1 to 6",
     "d &lt; 1, so int(d × 5) ≤ 4 and 6 is never returned (L8, Generating random numbers ‡)."
    ],
    [
     "1 to 5",
     "Correct. int(d × 5) ∈ {0..4}, so the result is 1..5 (the lab output shows service times only up to 5)."
    ],
    [
     "0 to 5",
     "Low = 1 is added, so the minimum is 1 (L8, Generating random numbers)."
    ],
    [
     "2 to 6",
     "The minimum is Low + 0 = 1 (L8, Generating random numbers)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In the Monte Carlo area example (b = 0, c = 1, h = 1), how many of the 3000 points fell under the curve if the printed area is 0.78399998?",
   "o": [
    [
     "2352",
     "Correct. A = K/N, so K = 0.784 × 3000 = 2352."
    ],
    [
     "2356",
     "That would be π/4 × 3000 ≈ 2356, the expected count, not the simulated one (L8, area output)."
    ],
    [
     "784",
     "784 hits out of 1000; here N = 3000 (L8, area output)."
    ],
    [
     "648",
     "648 is the number of points above the curve (3000 − 2352) (L8, area output)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Pursuit problem, t = 1: XF(1) = 17, YF(1) = 39.4, bomber at (90, −2), VF = 20. Using sin θ = −0.49 and cos θ = 0.87 as in the lab, where is the fighter at t = 2?",
   "o": [
    [
     "(34.4, 29.6)",
     "Correct. XF(2) = 17 + 20(0.87) = 34.4; YF(2) = 39.4 + 20(−0.49) = 29.6."
    ],
    [
     "(29.6, 34.4)",
     "Coordinates swapped (L8, Pursuit worked example)."
    ],
    [
     "(34.4, 49.2)",
     "sin θ is negative, so YF decreases (L8, Pursuit model)."
    ],
    [
     "(90, −2)",
     "That is the bomber's position at t = 1 (L8, Pursuit data)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> A drunk draws RN 12, 67, 88, 30, 45, 05, 91, 77, 52, 20 for 10 blocks. Where does he end and is the trial a success?",
   "o": [
    [
     "(1, −1), success",
     "Correct. Moves: E, N, S, W, W, E, S, S, N, E → (1, −1); |1| + |−1| = 2 ≤ 2."
    ],
    [
     "(0, 0), success",
     "That is the position after 6 blocks; four more moves follow (L8, 8-4)."
    ],
    [
     "(1, −1), failure",
     "Success means |X| + |Y| ≤ 2, and 2 ≤ 2 (L8, 8-4)."
    ],
    [
     "(−1, 1), success",
     "Signs reversed: 00-24 is east (+X), 75-99 south (−Y) (L8, 8-4)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> In Quiz 2's list, game 1 uses 0.34, 0.90, 0.25, 0.89, 0.87, 0.44, 0.12, 0.21, 0.46 (rn &lt; 0.5 = tail). How many flips and what net gain?",
   "o": [
    [
     "9 flips, net −1",
     "Correct. diff: −1, 0, −1, 0, +1, 0, −1, −2, −3 → stops at 9 flips; 8 − 9 = −1."
    ],
    [
     "5 flips, net +3",
     "|H − T| reaches 3 only after the 9th number (L8, Quiz 2 worked example)."
    ],
    [
     "9 flips, net +1",
     "Net gain is 8 − flips = −1 (L8, Flipping coin assumptions)."
    ],
    [
     "7 flips, net +1",
     "After 7 numbers diff is −1, not ±3 (L8, Quiz 2 worked example)."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Newspaper seller (Quiz 5 prices): Q = 70 and the demand is 90 papers. What is the day's profit?",
   "o": [
    [
     "$11.90",
     "That ignores the lost profit of 20 × 0.17 = 3.40 (L8, Newspaper seller formulas)."
    ],
    [
     "$8.50",
     "Correct. 35.00 − 23.10 − 3.40 + 0 = 8.50."
    ],
    [
     "$21.90",
     "Revenue is limited to 70 papers sold: $35, not $45 (L8, Newspaper seller formulas)."
    ],
    [
     "$15.30",
     "Lost profit is subtracted, not added (L8, Newspaper seller formulas)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Cake shop (P = 4.50, C = 2.00, S = 1.50), demands 5, 1, 6, 3, 4, 4, 8, 0, 5, 6. What is the ten-day profit for x = 5?",
   "o": [
    [
     "$90",
     "That is x = 6 (L8, Table 8-4)."
    ],
    [
     "$86",
     "Correct. 12.5, 0.5, 12.5, 6.5, 9.5, 9.5, 12.5, −2.5, 12.5, 12.5 = 86."
    ],
    [
     "$76",
     "That is x = 4 (L8, Table 8-4)."
    ],
    [
     "$125",
     "That would be 2.5 × 5 every day, ignoring days with d &lt; 5 (L8, Cake shop model)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Cake shop with a goodwill cost of $2 per unsatisfied cake: what is the profit on a day with x = 6 and d = 8?",
   "o": [
    [
     "$15",
     "That ignores the goodwill cost of 2 unsatisfied cakes (L8, 8-8 Questions, goodwill model)."
    ],
    [
     "$11",
     "Correct. z = 2.5(6) − 2(8 − 6) = 15 − 4 = 11 (= 4.5x − 2d)."
    ],
    [
     "$19",
     "Goodwill is a cost, subtracted (L8, goodwill model)."
    ],
    [
     "$21",
     "3d − 0.5x applies only when x &gt; d (L8, Cake shop model)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> In the cake shop problem, why does the book say the ten-day result (best x = 6) is not enough, and what confirms it?",
   "o": [
    [
     "Ten days is too short (demands 2 and 7 never appeared); a 500-day computer run also gives x = 6",
     "Correct. Longer runs make simulated demand follow Table 8-2; the 500-day run's best is x = 6 ($4467)."
    ],
    [
     "The model is wrong; an analytic solution gives x = 5",
     "The book confirms x = 6 by a 500-day simulation, not by an analytic solution (L8, Cake shop conclusion)."
    ],
    [
     "Ten days is too short; a 500-day run gives x = 7",
     "x = 7 gives $4397, below x = 6's $4467 (L8, Table 8-5)."
    ],
    [
     "The demand distribution is unknown, so no conclusion is possible",
     "The 20-day historical distribution (Table 8-2) is used (L8, Cake shop demand generation)."
    ]
   ],
   "a": 0
  }
 ]
};

// Final revision practice questions (2026-11-21), appended per lecture
EXTRA.ms["1"] = (EXTRA.ms["1"] || []).concat([
 {
  "q": "What is the main problem of evaluating a system by <b>analysis</b> (slide 5)?",
  "o": [
   [
    "Changes are very expensive or time consuming",
    "That is a problem of measurements on a real system (slide 5)."
   ],
   [
    "It is only feasible for simple systems",
    "Correct. Analysis gives good solutions, but real-world systems such as a factory, a computer or a network are too complex (slide 5)."
   ],
   [
    "The system may not exist in reality",
    "That is the problem of measurements, which need an existing instance of the system (L1, How do you evaluate a system's performance?)."
   ],
   [
    "Garbage-In Garbage-Out",
    "GIGO is listed as the problem of simulation, not analysis (slide 5)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>True or False:</b> In a MANET, nodes communicate through access points or base stations.",
  "o": [
   [
    "True",
    "A MANET has no infrastructure: no access points or base stations; nodes talk inside their mutual communication range and forward data for each other (slide 12)."
   ],
   [
    "False",
    "Correct. MANET means no infrastructure; source and destination are several hops apart, so all nodes forward data (slide 12)."
   ]
  ],
  "a": 1
 },
 {
  "q": "A node moves between random points on a 1000 × 1000 area (slide 13). What does the simulated position density f(x, y) show?",
  "o": [
   [
    "It has a simple closed-form formula",
    "The slide says it is hard to get a closed-form f(x, y), which is why we simulate (slide 13)."
   ],
   [
    "It is uniform over the whole area",
    "The 3-D surface is a hill, not flat: x and y being chosen uniformly does not make the position uniform (slide 13)."
   ],
   [
    "It is highest in the centre and near 0 at the edges",
    "Correct. The density is a hill peaking in the middle (about 2E-6), so the centre is preferred; with no closed form, we simulate (slide 13)."
   ],
   [
    "It is highest at the edges",
    "The edges are near 0 on the slide's surface; the peak is in the middle (slide 13)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>True or False:</b> A closed system is a system for which there is exogenous activity.",
  "o": [
   [
    "True",
    "That is an open system; a closed system has no exogenous activity (L1, Components of a system, lecture notes)."
   ],
   [
    "False",
    "Correct. Open system: there is exogenous activity; closed system: there is none (lecture notes)."
   ]
  ],
  "a": 1
 },
 {
  "q": "By the slide 37 tree, a <b>mathematical model</b> of a system is studied by:",
  "o": [
   [
    "A physical model or simulation",
    "Physical and mathematical are the two kinds of model, at the same level; a physical model is not a way to study a mathematical one (slide 37)."
   ],
   [
    "Experiment with the actual system",
    "That is the other branch at the top of the tree, before any model is built (slide 37)."
   ],
   [
    "Measurements only",
    "Measurements use an existing system; the tree splits a mathematical model into analytical or simulation (slides 4, 37)."
   ],
   [
    "An analytical model or simulation",
    "Correct. System → model of the system → mathematical model → analytical model or simulation (slide 37)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> The free-space radio propagation model is very useful for indoor and city environments.",
  "o": [
   [
    "True",
    "Its disadvantage is exactly that it is not really useful indoors or in cities, because it assumes line of sight and no obstacles (slide 39)."
   ],
   [
    "False",
    "Correct. It assumes direct line of sight and no obstacles; it gives simple formulae for open space but is not really useful indoors or in cities (slide 39)."
   ]
  ],
  "a": 1
 },
 {
  "q": "In the six-level computer model (slide 42), which level is translated or interpreted by the <b>operating system</b>?",
  "o": [
   [
    "Level 3, operating system machine level (partial interpretation)",
    "Correct. Level 3 is the operating system machine level, with partial interpretation by the operating system (slide 42)."
   ],
   [
    "Level 4, assembly language level",
    "Level 4 is translated by the assembler (slide 42)."
   ],
   [
    "Level 5, problem-oriented language level",
    "Level 5 is translated by the compiler (slide 42)."
   ],
   [
    "Level 2, ISA level",
    "Level 2 is interpreted by the microprogram or executed directly (slide 42)."
   ]
  ],
  "a": 0
 },
 {
  "q": "In the utility classification of performance metrics (slide 57), <b>utilization</b> is an example of:",
  "o": [
   [
    "Higher is better",
    "Higher is better fits throughput; very high utilization causes delays (slide 57)."
   ],
   [
    "Nominal is best",
    "Correct. The utility is a hill, highest at a middle value: too low wastes resources, too high causes delays (slide 57)."
   ],
   [
    "Time between errors",
    "That is a metric of a request done incorrectly, not a utility class (slide 53)."
   ],
   [
    "Lower is better",
    "Lower is better fits response time; very low utilization wastes resources (slide 57)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Scenario.</b> The computer program does not do what the conceptual model describes. In the slide 59 flowchart, where do you go back to?",
  "o": [
   [
    "Step 8, experimental design",
    "Step 8 comes after the model is verified and validated; More runs? = Yes can go back to 9 or 8 (slide 59)."
   ],
   [
    "Step 1, problem formulation",
    "The flowchart has no loop from verification back to step 1 (slide 59)."
   ],
   [
    "Step 5, model translation",
    "Correct. Verified? = No sends you back to model translation, to fix the program (slide 59)."
   ],
   [
    "Steps 3 and 4, model conceptualization and data collection",
    "That is where Validated? = No sends you, when the results do not match reality (slide 59)."
   ]
  ],
  "a": 2
 },
 {
  "q": "Steps 8 (experimental design), 9 (production runs and analysis) and 10 (more runs?) form which phase (slide 60)?",
  "o": [
   [
    "Phase 4: Implementation",
    "Phase 4 is steps 11-12, documentation and reporting plus implementation (slide 60)."
   ],
   [
    "Phase 1: Discovery and Orientation",
    "Phase 1 is steps 1-2 (slide 60)."
   ],
   [
    "Phase 2: Model building and data collection",
    "Phase 2 is steps 3-7 (slide 60)."
   ],
   [
    "Phase 3: Run the model",
    "Correct. Phase 3, run the model, is steps 8-10 (slide 60)."
   ]
  ],
  "a": 3
 },
 {
  "q": "According to the principles of modeling (slide 46), the secret to being a good modeler is:",
  "o": [
   [
    "Recognizing the need and having the ability to remodel",
    "Correct. Principle 2: the secret is recognizing the need and having the ability to remodel (slide 46)."
   ],
   [
    "Building the most detailed model possible",
    "Granularity of details is a problem of models; an excessively complex model adds cost and time without better output (slide 34, lecture notes)."
   ],
   [
    "Always modeling top-down",
    "Principle 8 says know when to model top-down and when bottom-up (slide 46)."
   ],
   [
    "Considering the discrete aspects first",
    "Principle 5 says in combined systems the continuous aspects come first (slide 46)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>True or False:</b> From an absolute perspective, every model is either good or bad.",
  "o": [
   [
    "True",
    "Principle 6: from an absolute perspective a model is neither good nor bad, nor is it neutral; it is evaluated by its usefulness (slide 46)."
   ],
   [
    "False",
    "Correct. A model should be evaluated according to its usefulness; absolutely it is neither good nor bad, nor neutral (slide 46)."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which of the following is <b>not</b> one of the ways the disadvantages of simulation are offset (slide 20)?",
  "o": [
   [
    "Simulation packages contain output-analysis capabilities",
    "This is one of the offsets on slide 20."
   ],
   [
    "Simulation outputs are exact, not random",
    "Correct. The opposite is true: most outputs are random variables, which is why results are hard to interpret (slide 20)."
   ],
   [
    "Most real-world problems have no closed-form solutions",
    "This is one of the offsets on slide 20: simulation is needed anyway."
   ],
   [
    "Simulation packages contain models that only need input data",
    "This is one of the offsets on slide 20."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which is a disadvantage of building the model in a <b>general simulation language</b> (tools slide 5)?",
  "o": [
   [
    "Limited scope of applicability",
    "That is a disadvantage of special purpose packages (tools slide 9)."
   ],
   [
    "Every model starts from scratch",
    "That is a disadvantage of general purpose languages (tools slide 3)."
   ],
   [
    "Limited portability",
    "Correct. General simulation languages have higher software cost, need additional training, and have limited portability (tools slide 5)."
   ],
   [
    "Difficult verification phase",
    "General simulation languages give much assistance in verification; difficult verification belongs to general purpose languages (tools slides 3, 5)."
   ]
  ],
  "a": 2
 },
 {
  "q": "What is the world-view of <b>GPSS</b> (tools slides 6-8)?",
  "o": [
   [
    "Network/event/continuous",
    "That is SLAM's world-view (tools slides 6-8)."
   ],
   [
    "Processes/Resources/Continuous",
    "That is SIMSCRIPT II.5's world-view (tools slides 6-8)."
   ],
   [
    "Processes",
    "Processes is the world-view of MODSIM III, SIMULA and CSIM (tools slides 6-8)."
   ],
   [
    "Transactions/Facilities",
    "Correct. GPSS is block-structured, interpretive, FORTRAN-based, with a transactions/facilities world-view (tools slides 6-8)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> OPNET is a special purpose simulation package for communication networks, including wireless networks.",
  "o": [
   [
    "True",
    "Correct. Tools slide 10: OPNET is a simulator for communication networks, including wireless networks."
   ],
   [
    "False",
    "It is on the special purpose package list (tools slide 10); SIMFACTORY is the manufacturing one, NETWORK II.5 the computer-systems one."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>True or False:</b> A system has exactly one correct model, so models are unique.",
  "o": [
   [
    "True",
    "Slide 34 lists \"models are not unique\" as a problem of modeling, together with the granularity of details."
   ],
   [
    "False",
    "Correct. Models are not unique; you keep only the aspects that affect the problem under investigation (slide 34)."
   ]
  ],
  "a": 1
 },
 {
  "q": "In the TCP/IP reference model (slide 41), the ISO/OSI <b>Network</b> layer corresponds to the:",
  "o": [
   [
    "Internet layer",
    "Correct. Network ↔ Internet layer (slide 41)."
   ],
   [
    "Host-to-Network layer",
    "Host-to-Network covers Data Link + Physical (slide 41)."
   ],
   [
    "Session layer",
    "Session (and Presentation) do not exist in TCP/IP (slide 41)."
   ],
   [
    "Transport layer",
    "Transport corresponds to Transport; Network maps to the Internet layer (slide 41)."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which of the following is a <b>physical model</b>?",
  "o": [
   [
    "The differential equations of an electrical machine",
    "Symbolic notation and equations make a mathematical model (slide 36)."
   ],
   [
    "An architectural model of a building",
    "Correct. A physical model is a prototype or physical copy of an object, such as a molecular model or an architectural model (slide 35, lecture notes)."
   ],
   [
    "The free-space path-loss formula",
    "A formula is a mathematical model (slide 39)."
   ],
   [
    "The mobility model d = v · t",
    "It uses an equation, so it is a mathematical model (slides 36, 38)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>True or False:</b> A simulation of customers arriving at random times to a bank is a deterministic simulation model.",
  "o": [
   [
    "True",
    "Random arrivals mean random inputs, so the model is stochastic; deterministic models have no random variables (slide 48, lecture notes)."
   ],
   [
    "False",
    "Correct. The lecture notes give customer arrivals at a bank as the stochastic example and a college class timetable as the deterministic one."
   ]
  ],
  "a": 1
 }
]);
EXTRA.ms["2"] = (EXTRA.ms["2"] || []).concat([
 {
  "q": "<b>Applied.</b> Slide 11's six customers arrive at 0, 2, 6, 7, 9, 15 with service times 2, 1, 3, 2, 1, 4. What is the average time a customer spends in the system?",
  "o": [
   [
    "2.17 min",
    "13/6 = 2.17 is the average service time; time in system also includes the wait (customers 4 and 5 wait 2 each)."
   ],
   [
    "0.67 min",
    "4/6 = 0.67 is the average waiting time in queue only (L2, Building a simulation run)."
   ],
   [
    "2.83 min",
    "Correct. Time in system = end − arrival: 2, 1, 3, 4, 3, 4 = 17, and 17/6 = 2.83 (= 0.67 + 2.17)."
   ],
   [
    "3.17 min",
    "3.17 is the grocery's average service time for 100 customers, not this run (slide 16)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> In the same six-customer run, what is the probability that a customer has to wait?",
  "o": [
   [
    "4/6 = 0.67",
    "4 is the total waiting time in minutes, not the number who waited."
   ],
   [
    "3/6 = 0.50",
    "Customer 2 arrives at 2 exactly when customer 1 leaves, so it does not wait; only 2 customers wait."
   ],
   [
    "1/6 = 0.17",
    "Both customers 4 and 5 wait 2 minutes, not only one."
   ],
   [
    "2/6 = 0.33",
    "Correct. Only customers 4 (arrives 7, starts 9) and 5 (arrives 9, starts 11) wait, so 2/6 = 0.33."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Four customers arrive at 0, 3, 4, 6 with service times 4, 3, 2, 1 (single server, FIFO). When does customer 4's service end, and how long did it wait?",
  "o": [
   [
    "Ends at 10, waits 3",
    "Correct. Ends 4, 7, 9, 10: customer 2 begins at 4, customer 3 at 7, customer 4 at max(6, 9) = 9, ends 10; wait = 9 − 6 = 3."
   ],
   [
    "Ends at 10, waits 4",
    "4 is the time in system (10 − 6); the wait is begin − arrival = 9 − 6 = 3."
   ],
   [
    "Ends at 9, waits 3",
    "Service begins at 9 and takes 1 minute, so it ends at 10."
   ],
   [
    "Ends at 7, waits 0",
    "6 + 1 = 7 ignores the queue: customer 3 is served until 9, so customer 4 begins at max(6, 9) = 9."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> In Example 2.2 (20 customers) the server was idle 18 minutes and the run ended at 86. What is the probability that the server is <b>busy</b>?",
  "o": [
   [
    "0.21",
    "18/86 = 0.21 is the probability of an idle server; busy = 1 − 0.21."
   ],
   [
    "0.79",
    "Correct. P(idle) = 18/86 = 0.21, so P(busy) = 1 − 0.21 = 0.79 (lecture notes, Example 2.2)."
   ],
   [
    "0.65",
    "0.65 = 13/20 is the probability that a customer waits."
   ],
   [
    "0.90",
    "0.90 is Able's utilization in the carhop example, not Example 2.2."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> In Example 2.2, the last of the 20 customers arrives at clock 82. What is the average time between arrivals?",
  "o": [
   [
    "68/20 = 3.4 min",
    "68/20 = 3.4 is the average service time."
   ],
   [
    "82/20 = 4.1 min",
    "Divide by the number of arrivals − 1: the first customer arrives at 0, so there are only 19 interarrival times."
   ],
   [
    "82/19 = 4.3 min",
    "Correct. 82/19 = 4.3 min, slightly below E(A) = (1 + 8)/2 = 4.5 (lecture notes)."
   ],
   [
    "4.5 min",
    "4.5 is the expected value of the uniform 1-8 distribution, not the simulated average."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> In Example 2.2 the average waiting time is 2.8 min and the average service time 3.4 min. The average time a customer spends in the system is:",
  "o": [
   [
    "9.5 min",
    "124/13 = 9.5 divides by the 13 customers who waited; time in system is averaged over all 20."
   ],
   [
    "4.3 min",
    "4.3 = 56/13 is the average wait of those who wait."
   ],
   [
    "2.8 min",
    "That is only the waiting time; time in system = waiting + service."
   ],
   [
    "6.2 min",
    "Correct. 2.8 + 3.4 = 6.2, the same as 124/20 = 6.2 (lecture notes)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Using Table 2.2 (service times), what service times do the random digits <b>85</b> and <b>86</b> give?",
  "o": [
   [
    "4 and 5 min",
    "Correct. 61–85 → 4 minutes and 86–95 → 5 minutes (cumulative 0.85 and 0.95)."
   ],
   [
    "5 and 5 min",
    "85 is the upper end of 61–85 and still gives 4 minutes."
   ],
   [
    "4 and 4 min",
    "86 starts the next range 86–95, which gives 5 minutes."
   ],
   [
    "3 and 4 min",
    "3 minutes is 31–60; 85 is in 61–85 (4) and 86 in 86–95 (5)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Able-Baker: a car arrives while Able is busy and Baker is idle. Its service random digits are <b>61</b>. Who serves it and for how long?",
  "o": [
   [
    "Baker, 4 minutes",
    "Read the digits in Baker's table: 61 lies in 61–80, which gives 5 minutes (36–60 gives 4)."
   ],
   [
    "Baker, 5 minutes",
    "Correct. If only one carhop is idle it serves; in Baker's Table 2.8, 61–80 → 5 minutes."
   ],
   [
    "It waits for Able, 4 minutes",
    "Able's seniority only decides when both are idle; an idle Baker serves at once."
   ],
   [
    "Able, 4 minutes",
    "Able is busy, so the idle Baker serves; 4 minutes is what 61 gives in Able's table (59–83)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>True or False:</b> In the Able-Baker carhop problem, if both carhops are idle, Baker gets the customer.",
  "o": [
   [
    "True",
    "The simplifying rule gives the customer to Able, who has seniority, when both are idle (lecture notes)."
   ],
   [
    "False",
    "Correct. Able gets the customer if both are idle (seniority); if only one is idle, that one serves (lecture notes)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>True or False:</b> In the 100-customer grocery run, the average service time 3.17 min differs from E(s) = 3.2 min, which shows the model is wrong.",
  "o": [
   [
    "True",
    "A small difference is expected from a finite run; the longer the simulation, the closer the average gets to E(s) (lecture notes, Example 2.2 statistics)."
   ],
   [
    "False",
    "Correct. s̄ = 317/100 = 3.17 is a sample average; it approaches E(s) = 3.2 as the run gets longer."
   ]
  ],
  "a": 1
 },
 {
  "q": "Five tire-curing machines are served by one worker (finite calling population). All five are open: one being served and four waiting. What is the arrival rate?",
  "o": [
   [
    "Unchanged, as in an infinite population",
    "Only an infinite population keeps the arrival rate unaffected by how many joined."
   ],
   [
    "It doubles",
    "There are no pending machines left, so arrivals stop."
   ],
   [
    "Zero",
    "Correct. With a finite population the arrival rate depends on how many are pending; with all five open nobody can arrive (lecture notes)."
   ],
   [
    "Five per unit time",
    "Five is the population size K, not the arrival rate."
   ]
  ],
  "a": 2
 },
 {
  "q": "In the queueing system <b>M/D/2/10/∞</b>, what are the service-time distribution and the number of servers?",
  "o": [
   [
    "Constant, 10 servers",
    "10 is N, the system capacity; c = 2."
   ],
   [
    "Erlang, 2 servers",
    "Erlang is written E<sub>k</sub>; D means constant."
   ],
   [
    "Exponential, 2 servers",
    "M (exponential) is the interarrival distribution in position A; the service distribution is position B, D."
   ],
   [
    "Constant (deterministic), 2 servers",
    "Correct. A/B/c/N/K: B = D (constant or deterministic), c = 2."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> A customer who leaves on seeing that the line is too long is said to balk.",
  "o": [
   [
    "True",
    "Correct. Balk: leave on seeing the line is too long; renege: leave after waiting; jockey: switch lines (lecture notes)."
   ],
   [
    "False",
    "Leaving after being in line is reneging; leaving on seeing the long line is balking (lecture notes)."
   ]
  ],
  "a": 0
 },
 {
  "q": "By Fig 2.7 (unit actions upon arrival), which combination is <b>impossible</b>?",
  "o": [
   [
    "Server idle, queue not empty",
    "Correct. An idle server with units waiting cannot happen: a waiting unit would be served (Fig 2.7)."
   ],
   [
    "Server idle, queue empty",
    "The arriving unit enters service; this is possible."
   ],
   [
    "Server busy, queue not empty",
    "The arriving unit enters the queue; this is possible."
   ],
   [
    "Server busy, queue empty",
    "The arriving unit enters the queue; this is possible."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> The newspaper seller buys <b>60</b> papers (33¢ each, sells at 50¢, scrap 5¢). It is a poor day with demand 50. What is the daily profit?",
  "o": [
   [
    "$5.20",
    "25.00 − 19.80 = 5.20 forgets the salvage of the 10 unsold papers (10 × $0.05 = $0.50)."
   ],
   [
    "$5.70",
    "Correct. Revenue 50 × 0.50 = $25.00, cost 60 × 0.33 = $19.80, salvage 10 × 0.05 = $0.50: 25.00 − 19.80 + 0.50 = $5.70."
   ],
   [
    "$10.20",
    "30.00 − 19.80 = 10.20 is the profit when all 60 are sold; only 50 were demanded."
   ],
   [
    "$3.50",
    "Lost profit applies only when demand exceeds the papers bought; here there is excess supply, so add salvage instead."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Newspaper seller (Tables 2.11, 2.12): the type digits are <b>81</b> and the demand digits are <b>70</b>. What is the day's demand?",
  "o": [
   [
    "Good day, demand 70",
    "Good is 01–35; 81 is a poor day."
   ],
   [
    "Fair day, demand 70",
    "Fair is 36–80, so 81 is a poor day; in the fair column 70 would give 70, but this is the poor column."
   ],
   [
    "Poor day, demand 60",
    "Correct. 81–00 → poor; in the poor column 67–82 → 60."
   ],
   [
    "Poor day, demand 70",
    "Poor 70 is 83–94; digits 70 fall in 67–82, which gives 60."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Example 2.5 (M = 11): at the end of cycle 5 the ending inventory is 1 with no shortage, and the lead-time digit is 8. What are the order quantity and lead time?",
  "o": [
   [
    "11 units, 2 days",
    "The order fills up to M, so subtract the ending inventory: 11 − 1 = 10."
   ],
   [
    "10 units, 8 days",
    "The digit is mapped by Table 2.15, not used as a number of days: 8 → 2 days."
   ],
   [
    "10 units, 1 day",
    "1 day is digits 1–6; 8 is in 7–9."
   ],
   [
    "10 units, 2 days",
    "Correct. Order = M − ending = 11 − 1 = 10; Table 2.15: digits 7–9 → 2 days."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> In the inventory slides, the lead-time random number is <b>R = 0.70</b>. What is the lead time?",
  "o": [
   [
    "4 days",
    "Correct. 0.70 to 0.89999 → 4 days (cumulative 0.7 and 0.9, lower end included)."
   ],
   [
    "5 days",
    "5 days is 0.90 to 0.99999 (e.g. 0.939)."
   ],
   [
    "2 days",
    "2 days is 0.20 to 0.29999."
   ],
   [
    "3 days",
    "3 days is 0.30 to 0.69999; the interval includes its lower end, so 0.70 starts the next class."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Inventory slides model (r = 3, x = 5, $0.10 holding, $20 per order, $50 per unit short). A day begins with 3 units, the outstanding order of 5 units arrives that morning, and demand is 4. What is the day's total cost?",
  "o": [
   [
    "$0.80",
    "Holding cost is on the end-of-day inventory (4), not the 8 after the arrival."
   ],
   [
    "$0.40",
    "Correct. I = 3 + 5 = 8, minus 4 → 4 > r = 3, so no order; holding 0.10 × 4 = $0.40, no shortage."
   ],
   [
    "$20.40",
    "No order is placed: the ending inventory 4 is above the reorder point 3."
   ],
   [
    "$50.00",
    "This forgets the arriving 5 units: 3 on hand with demand 4 would give 1 short ($50), but the order arrives first (\"Any arrivals?\")."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>True or False:</b> In the refined 1000-day table (21 ≤ x ≤ 30), the cell the slide highlights, r = 6 and x = 22 (2.33), is the smallest value in the table.",
  "o": [
   [
    "True",
    "The same table shows 2.32 at r = 7, x = 29, slightly lower; the difference is within simulation noise (L2, Inventory: refined results)."
   ],
   [
    "False",
    "Correct. r = 7, x = 29 shows 2.32, below the highlighted 2.33; the overall best of the coarse table is r = 6, x = 20 with 2.10."
   ]
  ],
  "a": 1
 }
]);
EXTRA.ms["3"] = (EXTRA.ms["3"] || []).concat([
 {
  "q": "<b>Applied.</b> For the loaded die of Example 3.1 (p(x) = x/21, x = 1, …, 6), what is P(X ≥ 5)?",
  "o": [
   [
    "6/21 = 0.286",
    "That is P(X = 6) only; X ≥ 5 also includes 5."
   ],
   [
    "2/6 = 0.333",
    "That is a fair die; the loaded die has p(x) = x/21."
   ],
   [
    "10/21 = 0.476",
    "10/21 = P(X ≤ 4), the complement."
   ],
   [
    "11/21 = 0.524",
    "Correct. P(5) + P(6) = 5/21 + 6/21 = 11/21 = 0.524."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> A geometric random variable (number of trials to the first success) can take the value 0.",
  "o": [
   [
    "True",
    "At least one trial is needed for a success, so x = 1, 2, …; the slide's range \"x = 0, 1, 2, …\" is a slip (L3, Geometric distribution)."
   ],
   [
    "False",
    "Correct. p(x) = q<sup>x−1</sup>p for x = 1, 2, …; the first success needs at least one trial (lecture notes)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> The inspection device's life has CDF F(x) = 1 − e^(−x/2) (years). What is its <b>median</b> life?",
  "o": [
   [
    "2 ln 2 ≈ 1.39 years",
    "Correct. The median is the 0.5-quantile: 1 − e^(−x/2) = 0.5 → x = 2 ln 2 = 1.386."
   ],
   [
    "0.632 years",
    "0.632 = F(2), a probability, not a time."
   ],
   [
    "1 year",
    "F(1) = 1 − e^(−0.5) = 0.39, not 0.5."
   ],
   [
    "2 years",
    "2 is the mean E(X); for this skewed (exponential) distribution the median is lower."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Example 3.5 (n = 50 chips, p = 0.02 non-conforming). What is the probability that the sample has <b>no</b> non-conforming chip?",
  "o": [
   [
    "0.02",
    "0.02 is the probability for one chip; for none of 50 you need (0.98)<sup>50</sup>."
   ],
   [
    "0.364",
    "Correct. P(X = 0) = (0.98)<sup>50</sup> = 0.364, the first term of P(X ≤ 2)."
   ],
   [
    "0.372",
    "0.372 = 50(0.02)(0.98)<sup>49</sup> = P(X = 1)."
   ],
   [
    "0.92",
    "0.92 = P(X ≤ 2), the sum of the first three terms."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> What is the <b>variance</b> of Binomial(10, 1/2)?",
  "o": [
   [
    "0.25",
    "0.25 = pq is the variance of one Bernoulli trial; multiply by n = 10."
   ],
   [
    "5",
    "5 = np is the mean."
   ],
   [
    "2.5",
    "Correct. V = npq = 10 × 0.5 × 0.5 = 2.5."
   ],
   [
    "1.58",
    "1.58 = √2.5 is the standard deviation."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> 40% of printers are rejected (Example 3.6). What is the probability that the first acceptable printer is found within the first <b>two</b> inspections?",
  "o": [
   [
    "0.24",
    "0.24 = P(X = 2) only; X = 1 must be added."
   ],
   [
    "0.096",
    "0.096 = (0.4)²(0.6) = P(X = 3), the notes' answer for the third printer."
   ],
   [
    "0.16",
    "0.16 = (0.4)² is two rejects in a row, the opposite event."
   ],
   [
    "0.84",
    "Correct. P(1) + P(2) = 0.6 + (0.4)(0.6) = 0.6 + 0.24 = 0.84."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Beeps per hour ~ Poisson(α = 2). What is the probability of <b>at most two</b> beeps in the next hour?",
  "o": [
   [
    "0.677",
    "Correct. F(2) = 0.135 + 0.271 + 0.271 = 0.677 (Table A.4)."
   ],
   [
    "0.323",
    "0.323 = 1 − F(2), three or more beeps."
   ],
   [
    "0.271",
    "0.271 = p(2) only; at most two is p(0) + p(1) + p(2)."
   ],
   [
    "0.406",
    "0.406 = F(1), at most one beep."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Calls form a Poisson process with λ = 2 per hour. What is the probability of exactly 2 calls in 1.5 hours?",
  "o": [
   [
    "0.271",
    "That uses α = 2 (one hour); for t = 1.5 h, α = λt = 3."
   ],
   [
    "0.224",
    "Correct. N(1.5) ~ Poisson(λt = 3): P = e<sup>−3</sup>3²/2! = 0.0498 × 4.5 = 0.224."
   ],
   [
    "0.423",
    "0.423 = F(2) for α = 3, at most 2 calls."
   ],
   [
    "0.149",
    "0.149 = 3e<sup>−3</sup> = P(exactly 1 call) in 1.5 hours."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> X ~ U(1, 6). What is P(2 &lt; X &lt; 4)?",
  "o": [
   [
    "0.2",
    "0.2 = 1/(b − a) is the height of the PDF, not a probability over an interval of length 2."
   ],
   [
    "0.5",
    "2/4 divides by the upper bound instead of the length b − a = 5."
   ],
   [
    "0.4",
    "Correct. (x₂ − x₁)/(b − a) = (4 − 2)/(6 − 1) = 2/5 = 0.4."
   ],
   [
    "0.6",
    "0.6 = F(4) = (4 − 1)/5, which also counts 1 to 2."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>True or False:</b> The exponential distribution is memoryless.",
  "o": [
   [
    "True",
    "Correct. The lecture notes state that the exponential distribution is memoryless; the interarrival times of a Poisson process are exponential and memoryless (slide 44)."
   ],
   [
    "False",
    "The notes and the slide 44 diagram both call the exponential (interarrival time) memoryless."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Arrivals are completely random at a rate of 4 per hour, so interarrival times are exponential. What are the mean and standard deviation of the interarrival time?",
  "o": [
   [
    "Mean 15 min, SD 225 min",
    "225 (min²) is the variance 1/λ²; the SD is its square root, 15 min."
   ],
   [
    "Mean 4, SD 4",
    "4 is the rate λ; the mean is 1/λ."
   ],
   [
    "Mean 15 min, SD 3.87 min",
    "3.87 = √15 takes the root of the mean; the exponential's SD equals its mean."
   ],
   [
    "Mean 15 min, SD 15 min",
    "Correct. E = 1/λ = 1/4 h = 15 min and σ = √(1/λ²) = 1/λ = 15 min: for the exponential, mean = standard deviation."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Vessel loading time X ~ N(12, 4). What is P(10 &lt; X &lt; 14)?",
  "o": [
   [
    "0.6826",
    "Correct. σ = 2: Φ((14 − 12)/2) − Φ((10 − 12)/2) = Φ(1) − Φ(−1) = 0.8413 − 0.1587 = 0.6826."
   ],
   [
    "0.3174",
    "0.3174 = 2 × 0.1587 is the probability outside the interval."
   ],
   [
    "0.1587",
    "0.1587 = Φ(−1) = P(X &lt; 10), one tail only."
   ],
   [
    "0.8413",
    "0.8413 = Φ(1) = P(X &lt; 14); subtract P(X &lt; 10)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> X ~ N(50, 9) as in Example 3.10. What is P(47 ≤ X ≤ 56)? (Φ(1) = 0.8413, Φ(2) = 0.9772)",
  "o": [
   [
    "0.3780",
    "0.3780 is Example 3.12's answer for N(15, 9), 14 to 17."
   ],
   [
    "0.8185",
    "Correct. σ = 3: Φ((56 − 50)/3) − Φ((47 − 50)/3) = Φ(2) − Φ(−1) = 0.9772 − (1 − 0.8413) = 0.8185."
   ],
   [
    "0.1359",
    "0.9772 − 0.8413 uses Φ(1) where Φ(−1) = 1 − Φ(1) is needed."
   ],
   [
    "0.9772",
    "That is F(56) = P(X ≤ 56); the part below 47 must be removed."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> X and Y are independent with Var(X) = 4 and Var(Y) = 1. What is Var(2X − 3Y)?",
  "o": [
   [
    "11",
    "2(4) + 3(1) = 11 forgets to square the constants."
   ],
   [
    "7",
    "16 − 9 subtracts the variances; constants are squared, so (−3)² = 9 is added."
   ],
   [
    "25",
    "Correct. Var = 2²(4) + (−3)²(1) = 16 + 9 = 25 (slide 16, independent variables)."
   ],
   [
    "5",
    "2(4) − 3(1) = 5 applies the mean rule to variances without squaring the constants."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> For the loaded die, E(X) = 4.33 and σ = 1.49 (Example 3.4). What is its coefficient of variation?",
  "o": [
   [
    "2.91",
    "4.33/1.49 = 2.91 is μ/σ, upside down."
   ],
   [
    "0.513",
    "2.22/4.33 = 0.513 uses the variance instead of the standard deviation."
   ],
   [
    "1",
    "A C.O.V. of 1 belongs to the exponential, where σ = μ."
   ],
   [
    "0.344",
    "Correct. C.O.V. = σ/μ = 1.49/4.33 = 0.344 (dimensionless)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> The correlation coefficient of two random variables can be 1.5.",
  "o": [
   [
    "True",
    "The correlation is the normalized covariance and always lies between −1 and +1 (slide 19)."
   ],
   [
    "False",
    "Correct. ρ = σ²<sub>xy</sub>/(σ<sub>x</sub>σ<sub>y</sub>) and −1 ≤ ρ ≤ +1 (slide 19)."
   ]
  ],
  "a": 1
 },
 {
  "q": "In the group-size data (slide 47: frequencies 30, 110, 45, 71, 12, 13, 7, 12 for sizes 1 to 8), what is the <b>mode</b>?",
  "o": [
   [
    "Size 2",
    "Correct. The mode is the most likely value: size 2 has the highest frequency, 110 (relative 0.37)."
   ],
   [
    "Size 3",
    "Size 3 is the median (the cumulative passes 0.5 there: 0.47 at 2, 0.62 at 3), not the mode."
   ],
   [
    "Size 4",
    "Size 4 has the second-highest frequency, 71."
   ],
   [
    "Size 8",
    "8 is the largest value, not the most frequent one."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Using the empirical CDF of the conveyor repair times (points (1.0, 0.33) and (1.5, 0.62), joined by a straight line), what is F(1.25)?",
  "o": [
   [
    "0.33",
    "0.33 = F(1.0); the continuous empirical CDF rises linearly inside the interval."
   ],
   [
    "0.475",
    "Correct. Halfway from 1.0 to 1.5: 0.33 + 0.5 × (0.62 − 0.33) = 0.33 + 0.145 = 0.475."
   ],
   [
    "0.62",
    "0.62 = F(1.5), the end of the interval."
   ],
   [
    "0.29",
    "0.29 is the relative frequency of the class 1.0 to 1.5, not the CDF."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> X takes 2, 5, 7, 9, 10 with CDF 0.2, 0.4, 0.6, 0.9, 1.0 (slide 52). Which value does the random number R = 0.40 give?",
  "o": [
   [
    "2",
    "2 needs 0 ≤ R ≤ 0.2."
   ],
   [
    "9",
    "9 needs 0.6 &lt; R ≤ 0.9 (e.g. 0.78)."
   ],
   [
    "5",
    "Correct. The rule is 0.2 &lt; R ≤ 0.4 → x = 5, so R = 0.40 gives 5 (slide 52)."
   ],
   [
    "7",
    "7 needs 0.4 &lt; R ≤ 0.6; 0.40 is the upper end of the 5 class."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Arrivals form a Poisson process with λ = 10 per hour; each arrival is independently type I with probability 0.3. What are the rates of the type I and type II streams?",
  "o": [
   [
    "10 and 10 per hour",
    "Splitting divides the rate; the two streams add back to 10 (pooling)."
   ],
   [
    "0.3 and 0.7 per hour",
    "0.3 and 0.7 are the probabilities; multiply by λ = 10."
   ],
   [
    "3 and 3 per hour",
    "Type II has probability 1 − 0.3 = 0.7, giving 7 per hour."
   ],
   [
    "3 and 7 per hour",
    "Correct. Random splitting gives Poisson processes with rates λp = 10(0.3) = 3 and λ(1 − p) = 10(0.7) = 7 (lecture notes)."
   ]
  ],
  "a": 3
 }
]);
EXTRA.ms["4"] = (EXTRA.ms["4"] || []).concat([
 {
  "q": "What is the variance of a random number R ~ U[0, 1]?",
  "o": [
   [
    "1/12",
    "Correct. V(R) = ∫₀¹ x² dx − [E(R)]² = 1/3 − 1/4 = 1/12 (lecture notes)."
   ],
   [
    "1/4",
    "1/4 is [E(R)]², the term that is subtracted."
   ],
   [
    "1/2",
    "1/2 is E(R), the mean."
   ],
   [
    "1/3",
    "1/3 = E(R²); subtract [E(R)]² = 1/4."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> LCG with a = 5, c = 3, m = 16 and X₀ = 7. What are X₁ to X₄, and what is the period?",
  "o": [
   [
    "6, 1, 8, 11; period 15",
    "m − 1 is the best period for a prime modulus with c = 0; here m = 16 and c ≠ 0."
   ],
   [
    "6, 1, 8, 11; period 16",
    "Correct. 38 mod 16 = 6, 33 mod 16 = 1, 8, 43 mod 16 = 11; m = 2⁴, c = 3 is relatively prime to 16 and a = 5 = 1 + 4(1), so P = m = 16."
   ],
   [
    "6, 1, 8, 11; period 4",
    "m/4 is the best period only when c = 0; with c ≠ 0 and the rules met, P = m = 16."
   ],
   [
    "38, 33, 8, 43; period 16",
    "These are a·X + c before taking mod 16; X must be in 0 to m − 1."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Multiplicative LCG with prime modulus m = 11, c = 0, a = 2, X₀ = 1. What is the period?",
  "o": [
   [
    "5",
    "The sequence does not return to 1 after 5 steps (X₅ = 10)."
   ],
   [
    "2.75",
    "m/4 applies to m = 2<sup>b</sup> with c = 0, not to a prime modulus."
   ],
   [
    "10",
    "Correct. 2, 4, 8, 5, 10, 9, 7, 3, 6, 1: the seed returns after 10 = m − 1 steps, the maximum for a prime m with c = 0 (slide 21)."
   ],
   [
    "11",
    "With c = 0, X = 0 can never appear (0 stays 0), so at most m − 1 = 10 values."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Multiplicative LCG with a = 3, c = 0, m = 16 and X₀ = 1. What is the period, and is it the maximum possible?",
  "o": [
   [
    "4; no, the maximum is 16",
    "P = m needs c ≠ 0; with c = 0 the longest possible period is m/4 = 4."
   ],
   [
    "16; yes",
    "The seed 1 returns after only 4 steps."
   ],
   [
    "2; no",
    "X₂ = 9, not 1; the seed returns at X₄."
   ],
   [
    "4; yes, the maximum m/4",
    "Correct. 3, 9, 27 mod 16 = 11, 33 mod 16 = 1: period 4 = 16/4, the maximum for c = 0, an odd seed and a = 3 + 8(0) (slide 21)."
   ]
  ],
  "a": 3
 },
 {
  "q": "Which LCG with m = 64 achieves the full period P = 64 for every seed?",
  "o": [
   [
    "a = 5, c = 13",
    "Correct. m = 2⁶, c = 13 is odd (relatively prime to 64) and a = 5 = 1 + 4k, so P = m = 64 (Final 2024/25 Q2-a)."
   ],
   [
    "a = 5, c = 12",
    "c = 12 is even, so it is not relatively prime to 64 and the full period fails (seed 1 repeats after 4)."
   ],
   [
    "a = 7, c = 13",
    "a = 7 is not of the form 1 + 4k (7 = 3 + 4), so the period is shorter (16 from seed 1)."
   ],
   [
    "a = 13, c = 0",
    "With c = 0 the best possible period is m/4 = 16, and only for odd seeds."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Midsquare method with Z₀ = 5197. What are Z₁ and Z₂?",
  "o": [
   [
    "0088 and 7744",
    "Z₂ must also be padded: 88² = 00007744, middle digits 0077."
   ],
   [
    "0088 and 0077",
    "Correct. 5197² = 27008809, middle four digits 0088 (U₁ = 0.0088); 88² = 7744 → 00007744, middle 0077 (U₂ = 0.0077): the numbers are already sliding toward 0."
   ],
   [
    "2700 and 0729",
    "These take the first four digits (27008809 → 2700, 07290000 → 0729); the method takes the middle four (digits 3 to 6)."
   ],
   [
    "0880 and 7744",
    "0880 shifts the middle window; and 7744 is the square itself, not its middle digits after padding to 8."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> KS test at α = 0.05 on R = 0.15, 0.62, 0.38, 0.90 (N = 4, D<sub>0.05</sub> = 0.624). What are D and the decision?",
  "o": [
   [
    "D = 0.37, not rejected",
    "Using the unsorted order (e.g. 0.75 − 0.38 = 0.37) is wrong: Step 1 is to rank the data."
   ],
   [
    "D = 0.15, rejected",
    "Reject only if D &gt; D<sub>α</sub>; 0.15 &lt; 0.624."
   ],
   [
    "D = 0.15, not rejected",
    "Correct. Sorted 0.15, 0.38, 0.62, 0.90; D⁺ = max(0.10, 0.12, 0.13, 0.10) = 0.13; D⁻ = max(0.15, 0.13, 0.12, 0.15) = 0.15; D = 0.15 ≤ 0.624."
   ],
   [
    "D = 0.13, not rejected",
    "0.13 is D⁺ only; D = max(D⁺, D⁻) = 0.15."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Chi-square uniformity test: 50 numbers in 5 equal classes give counts 15, 6, 9, 12, 8 (α = 0.05, χ²<sub>0.05,4</sub> = 9.49). What are χ₀² and the decision?",
  "o": [
   [
    "χ₀² = 50, rejected",
    "50 is Σ(O − E)² before dividing by E<sub>i</sub> = 10."
   ],
   [
    "χ₀² = 5.0, rejected because 5.0 &gt; 3.84",
    "3.84 is χ²<sub>0.05,1</sub>; df = n − 1 = 4, so compare with 9.49."
   ],
   [
    "χ₀² = 0, not rejected",
    "The deviations sum to 0 (15 + 6 + 9 + 12 + 8 = 50), but the statistic squares them first."
   ],
   [
    "χ₀² = 5.0, not rejected",
    "Correct. E<sub>i</sub> = 50/5 = 10; χ₀² = (25 + 16 + 1 + 4 + 4)/10 = 5.0 &lt; 9.49 with df = 5 − 1 = 4."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> The chi-square frequency test is the better choice for a very small sample such as N = 5.",
  "o": [
   [
    "True",
    "Chi-square is valid only for large samples (say N ≥ 50); KS can be applied to small samples (slide 39, lecture notes)."
   ],
   [
    "False",
    "Correct. Chi-square needs N ≥ 50 and each E<sub>i</sub> ≥ 5; the KS test is more powerful for small samples, as in the N = 5 slide example."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> In the gap test for random digits, what is the probability that a gap has length <b>at most 1</b>?",
  "o": [
   [
    "0.19",
    "Correct. F(x) = 1 − 0.9<sup>x+1</sup>, so F(1) = 1 − 0.81 = 0.19 (= 0.1 + 0.09)."
   ],
   [
    "0.09",
    "0.09 = 0.9 × 0.1 = P(gap = 1) only; add P(gap = 0) = 0.1."
   ],
   [
    "0.10",
    "0.10 = P(gap = 0), the same digit right away."
   ],
   [
    "0.81",
    "0.81 = 0.9², the probability that the gap is longer than 1."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> A list of 60 random digits contains every digit 0 to 9 at least once. How many gaps does the gap test count in total?",
  "o": [
   [
    "59",
    "59 is the number of runs-test signs for 60 numbers; gaps are counted per digit."
   ],
   [
    "50",
    "Correct. Each digit contributes (occurrences − 1) gaps, so the total is N − 10 = 60 − 10 = 50 (slide 42)."
   ],
   [
    "60",
    "Each digit's first occurrence starts no gap, so subtract 10."
   ],
   [
    "6",
    "60/10 = 6 is the average number of occurrences per digit, not the number of gaps."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Poker test on <b>500</b> three-digit numbers. What are the expected counts for three different digits, exactly one pair, and three like digits?",
  "o": [
   [
    "450, 45, 5",
    "0.9 alone ignores that the third digit must differ from both (0.9 × 0.8 = 0.72)."
   ],
   [
    "360, 140, 0",
    "Three like digits have probability 0.1 × 0.1 = 0.01, so 5 are expected, and pairs 1 − 0.72 − 0.01 = 0.27."
   ],
   [
    "360, 135, 5",
    "Correct. 500 × 0.72 = 360, 500 × 0.27 = 135, 500 × 0.01 = 5 (slide 61)."
   ],
   [
    "720, 270, 10",
    "These are the expected counts for 1000 numbers (slide 63)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> How many runs up and down are in 0.41 0.68 0.89 0.94 0.74 0.91 0.55 0.62 0.36 0.27?",
  "o": [
   [
    "9",
    "9 is the number of signs (N − 1), which is the maximum possible number of runs, not this count."
   ],
   [
    "5",
    "5 is the number of sign changes; the number of runs is one more, 5 + 1 = 6."
   ],
   [
    "4",
    "Each change of sign starts a new run: + + + / − / + / − / + / − − gives 6, not 4."
   ],
   [
    "6",
    "Correct. Signs + + + − + − + − − (9 signs for 10 numbers) group as +++ | − | + | − | + | −−, so a = 6."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> For runs up and down with N = 25 numbers, what are μ<sub>a</sub> and σ<sub>a</sub>²?",
  "o": [
   [
    "16.33 and 4.12",
    "Correct. μ<sub>a</sub> = (2(25) − 1)/3 = 49/3 = 16.33; σ<sub>a</sub>² = (16(25) − 29)/90 = 371/90 = 4.12."
   ],
   [
    "16.33 and 2.03",
    "2.03 = √4.12 is σ<sub>a</sub>, not the variance."
   ],
   [
    "17 and 4.12",
    "(2N + 1)/3 = 17 uses the wrong sign; μ<sub>a</sub> = (2N − 1)/3."
   ],
   [
    "24 and 4.12",
    "24 = N − 1 is the maximum number of runs, not the mean."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Runs above and below the mean: n₁ = 25, n₂ = 25 (N = 50) and b = 20 runs, α = 0.05. What are Z₀ and the decision?",
  "o": [
   [
    "Z₀ = −1.43, not rejected",
    "(20 − 25)/3.50 = −1.43 uses μ<sub>b</sub> = 25 and forgets the + 1/2 term."
   ],
   [
    "Z₀ = −1.57, not rejected",
    "Correct. μ<sub>b</sub> = 2(25)(25)/50 + 1/2 = 25.5; σ<sub>b</sub>² = 1250(1250 − 50)/[2500(49)] = 12.24; Z₀ = (20 − 25.5)/3.50 = −1.57, inside ±1.96."
   ],
   [
    "Z₀ = −0.45, not rejected",
    "−5.5/12.24 divides by the variance; divide by σ<sub>b</sub> = √12.24 = 3.50."
   ],
   [
    "Z₀ = −1.57, rejected",
    "Reject only outside −1.96 ≤ Z₀ ≤ 1.96; −1.57 is inside."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Autocorrelation test on the 30 numbers of slide 48, starting at i = 2 with lag m = 4. What is M?",
  "o": [
   [
    "7.5",
    "M must be an integer: the largest one with i + (M + 1)m ≤ N."
   ],
   [
    "7",
    "M + 1 = 7 is the number of products; M itself is 6."
   ],
   [
    "6",
    "Correct. 2 + (M + 1)4 ≤ 30 → M + 1 ≤ 7 → M = 6 (numbers R₂, R₆, …, R₃₀)."
   ],
   [
    "5",
    "With M = 6 the last number used is R₂₊₇·₄ = R₃₀ ≤ 30, so M = 6 still fits."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>True or False:</b> A significant negative autocorrelation (ρ<sub>im</sub> &lt; 0) means low random numbers tend to be followed by high ones, and vice versa.",
  "o": [
   [
    "True",
    "Correct. ρ &lt; 0: negative autocorrelation, low followed by high and vice versa; ρ &gt; 0: high followed by high (slide 50)."
   ],
   [
    "False",
    "Slide 50 says exactly this for ρ &lt; 0; high followed by high is the positive case."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>True or False:</b> The gap test checks the uniformity of the generated numbers.",
  "o": [
   [
    "True",
    "Only the frequency test (KS or chi-square) checks uniformity; the gap test is one of the independence tests (slides 32-33, lecture notes)."
   ],
   [
    "False",
    "Correct. The gap test counts digits between repetitions of a digit and tests independence, using KS on the gap distribution."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> A combined generator joins k = 2 multiplicative generators with prime moduli m₁ = 7 and m₂ = 11. What is its maximum possible period?",
  "o": [
   [
    "60",
    "60 forgets the division by 2<sup>k−1</sup> = 2."
   ],
   [
    "77",
    "77 = m₁m₂; each generator contributes m<sub>j</sub> − 1, and the product is halved."
   ],
   [
    "16",
    "16 = (6 + 10) adds the periods instead of multiplying them."
   ],
   [
    "30",
    "Correct. P = (m₁ − 1)(m₂ − 1)/2<sup>k−1</sup> = (6)(10)/2 = 30 (slide 27)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>True or False:</b> java.util.Random is a linear congruential generator with increment 11 and modulus 2<sup>48</sup>.",
  "o": [
   [
    "True",
    "Correct. Slide 24: multiplier 0x5DEECE66D = 25214903917, addend 0xB = 11, mask 2<sup>48</sup> − 1, i.e. X<sub>i+1</sub> = (25214903917·X<sub>i</sub> + 11) mod 2<sup>48</sup>."
   ],
   [
    "False",
    "Slide 24 shows java.util.Random as exactly this LCG; the Excel generator is the one that combines three multiplicative generators."
   ]
  ],
  "a": 0
 }
]);
EXTRA.ms["5"] = (EXTRA.ms["5"] || []).concat([
 {
  "q": "<b>Applied.</b> Interarrival times are exponential with a <b>mean</b> of 5 minutes. Using (5.1) X = −(1/λ) ln(1 − R) with R = 0.6, X is:",
  "o": [
   [
    "2.554 min",
    "Wrong: that is −5 ln(0.6), the generator (5.2) with ln R; the question asks for (5.1) with ln(1 − R) (L5, Procedure for the inverse transform (exponential))."
   ],
   [
    "3.000 min",
    "Wrong: that is mean × R = 5 × 0.6; the generator takes a logarithm, it is not linear in R (L5, Procedure for the inverse transform (exponential))."
   ],
   [
    "4.581 min",
    "Correct. λ = 1/mean = 0.2, so X = −5 ln(0.4) = 5 × 0.9163 = 4.581."
   ],
   [
    "0.183 min",
    "Wrong: that uses the mean 5 as λ, so 1/λ = 0.2: −0.2 ln 0.4. λ is the rate, 1/λ the mean interarrival time (L5, 5.1.1 Exponential distribution)."
   ]
  ],
  "a": 2
 },
 {
  "q": "In the exponential distribution of Lecture 5, λ is the mean interarrival time.",
  "o": [
   [
    "True",
    "Wrong: λ is the mean number of occurrences (arrivals) per unit time; the mean interarrival time is E(X) = 1/λ (L5, 5.1.1 Exponential distribution)."
   ],
   [
    "False",
    "Correct. Example 5.1: λ is the mean number of arrivals per unit time and E(Xi) = 1/λ is the mean interarrival time."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> For the triangular distribution on (0, 2) with mode 1, R = 0.5 generates X =",
  "o": [
   [
    "1",
    "Correct. R = 1/2 is the boundary: √(2 × 0.5) = 1 and 2 − √(2 × 0.5) = 1; both pieces give the mode."
   ],
   [
    "0.707",
    "Wrong: that is √0.5; the generator is √(2R), not √R (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "0.5",
    "Wrong: X = R is the acceptance-rejection idea, not the triangular inverse transform (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "1.293",
    "Wrong: that is 2 − √(1 − R) = 2 − √0.5; the factor 2 under the root was dropped (X = 2 − √(2(1 − R))) (L5, 5.1.3 Triangular distribution)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> For the triangular distribution (0, 2), mode 1, what is the cdf value F(1.5)?",
  "o": [
   [
    "1.125",
    "Wrong: that is 1.5²/2, the piece for 0 < x ≤ 1; a cdf can never exceed 1 (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "0.125",
    "Wrong: that is (2 − 1.5)²/2 alone; the cdf is 1 minus it (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "0.75",
    "Wrong: that is 1 − (0.5)², forgetting to divide by 2 (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "0.875",
    "Correct. 1 < 1.5 ≤ 2, so F = 1 − (2 − 1.5)²/2 = 1 − 0.125 = 0.875."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> A lead time is 1, 2 or 3 days with probabilities 0.3, 0.5 and 0.2. With the table-lookup rule F(x(i−1)) &lt; R ≤ F(xi), the random numbers 0.25, 0.65, 0.85 generate:",
  "o": [
   [
    "3, 2, 1",
    "Wrong: that reads the cdf from the top; small R values belong to the smallest x (L5, Example 5.2: empirical discrete distribution (shipments))."
   ],
   [
    "1, 2, 3",
    "Correct. F = 0.3, 0.8, 1.0: 0.25 ≤ 0.3 → 1; 0.3 < 0.65 ≤ 0.8 → 2; 0.8 < 0.85 ≤ 1 → 3."
   ],
   [
    "1, 3, 3",
    "Wrong: that compares R with the pmf 0.3, 0.5 instead of the cumulative values rk = p(x1) + … + p(xk) (L5, Example 5.2: empirical discrete distribution (shipments))."
   ],
   [
    "0, 1, 2",
    "Wrong: these are the values of Example 5.2 (shipments 0, 1, 2); here the possible values are 1, 2, 3 (L5, Example 5.2: empirical discrete distribution (shipments))."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Discrete uniform on {1, 2, …, 8}. Using (i − 1)/k &lt; R ≤ i/k, the random number R = 0.5 generates X =",
  "o": [
   [
    "3",
    "Wrong: that is ⌈Rk − 1⌉, mixing in the −1 of the geometric generator (L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})."
   ],
   [
    "4",
    "Correct. Rk = 4 exactly, and 3/8 < 0.5 ≤ 4/8, so X = ⌈Rk⌉ = ⌈4⌉ = 4."
   ],
   [
    "5",
    "Wrong: that is ⌊Rk⌋ + 1, which differs from ⌈Rk⌉ when Rk is a whole number; R = 4/8 is the top of interval i = 4 (L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> In Example 5.4 with k = 4, p(x) = 2x/(k(k + 1)) = x/10. What is the cdf value F(2) used in the table lookup?",
  "o": [
   [
    "0.2",
    "Wrong: that is p(2) = 2/10, the pmf; the cdf adds p(1) = 0.1 (L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))."
   ],
   [
    "0.6",
    "Wrong: that is F(3) = (3 × 4)/20 (L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))."
   ],
   [
    "0.1",
    "Wrong: that is F(1) = p(1) = (1 × 2)/20 (L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))."
   ],
   [
    "0.3",
    "Correct. F(x) = x(x + 1)/(k(k + 1)) = (2 × 3)/(4 × 5) = 6/20 = 0.3 (= 0.1 + 0.2)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> A geometric variate on {0, 1, 2, …} has p = 0.4. Using X = ⌈ln(1 − R)/ln(1 − p) − 1⌉ with R = 0.7, X is:",
  "o": [
   [
    "2",
    "Correct. ln 0.3/ln 0.6 = 2.357; 2.357 − 1 = 1.357; ⌈1.357⌉ = 2."
   ],
   [
    "3",
    "Wrong: that adds q = 1, but these values start at 0 (q = 0) (L5, Example 5.5: geometric distribution)."
   ],
   [
    "1",
    "Wrong: that rounds 1.357 down; the generator rounds up (L5, Example 5.5: geometric distribution)."
   ],
   [
    "0",
    "Wrong: that uses ln R: ln 0.7/ln 0.6 − 1 = −0.302 → 0; the formula uses ln(1 − R) (L5, Example 5.5: geometric distribution)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> In Example 5.6 (geometric on {X ≥ 1}, mean 2), what is X1 for R1 = 0.932?",
  "o": [
   [
    "5",
    "Wrong: that is 1 + ⌈3.878⌉, forgetting the −1 inside the round-up (L5, Example 5.6: three geometric variates with mean 2)."
   ],
   [
    "1",
    "Wrong: that uses ln R: ln 0.932/ln 0.5 = 0.102, then 1 + ⌈−0.898⌉ = 1 (L5, Example 5.6: three geometric variates with mean 2)."
   ],
   [
    "4",
    "Correct. p = 1/2, q = 1: ln 0.068/ln 0.5 = 3.878; X1 = 1 + ⌈3.878 − 1⌉ = 1 + 3 = 4."
   ],
   [
    "3",
    "Wrong: that is ⌈2.878⌉ without adding q = 1 (L5, Example 5.6: three geometric variates with mean 2)."
   ]
  ],
  "a": 2
 },
 {
  "q": "When deriving the geometric generator, dividing (x + 1) ln(1 − p) ≤ ln(1 − R) &lt; x ln(1 − p) by ln(1 − p) reverses the inequality signs, because ln(1 − p) &lt; 0.",
  "o": [
   [
    "True",
    "Correct. 1 − p < 1, so ln(1 − p) < 0, and dividing by a negative number reverses the inequalities: ln(1 − R)/ln(1 − p) − 1 ≤ x < ln(1 − R)/ln(1 − p)."
   ],
   [
    "False",
    "Wrong: the notes state that 1 − p < 1 implies ln(1 − p) < 0, which is why the signs reverse (L5, Example 5.5: geometric distribution)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> In the acceptance-rejection method for X uniform on [1/4, 1], what is P(0.5 &lt; X ≤ 0.8) for an accepted value?",
  "o": [
   [
    "0.225",
    "Wrong: that multiplies by 3/4 instead of dividing (L5, 5.2 Acceptance-rejection technique)."
   ],
   [
    "0.733",
    "Wrong: that is (0.8 − 0.25)/0.75 = P(X ≤ 0.8), not the probability of the interval (0.5, 0.8] (L5, 5.2 Acceptance-rejection technique)."
   ],
   [
    "0.4",
    "Correct. P(a < R ≤ b | 1/4 ≤ R ≤ 1) = (b − a)/(3/4) = 0.3/0.75 = 0.4."
   ],
   [
    "0.3",
    "Wrong: that is the unconditional P(0.5 < R ≤ 0.8); accepted values are conditioned on R ≥ 1/4, so divide by 3/4 (L5, 5.2 Acceptance-rejection technique)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Acceptance-rejection for X uniform on [1/4, 1] receives the random numbers 0.10, 0.22, 0.61, 0.05, 0.93. Two variates are needed. What are they?",
  "o": [
   [
    "0.61 and 0.93, using 5 random numbers",
    "Correct. 0.10 and 0.22 are below 1/4 (rejected), 0.61 accepted, 0.05 rejected, 0.93 accepted: all 5 numbers were generated."
   ],
   [
    "0.10 and 0.22",
    "Wrong: these are below 1/4; Step 2b rejects any R < 1/4 (L5, 5.2 Acceptance-rejection technique)."
   ],
   [
    "0.61 and 0.93, using 2 random numbers",
    "Wrong: the values are right, but every rejected R was also generated; Step 1 makes a new R each time it runs (L5, 5.2 Acceptance-rejection technique)."
   ],
   [
    "0.35 and 0.47",
    "Wrong: that adds 1/4 to 0.10 and 0.22; accepted values are used as X = R with no shift, and small ones are rejected (L5, 5.2 Acceptance-rejection technique)."
   ]
  ],
  "a": 0
 },
 {
  "q": "In the Poisson generator, N = n exactly when A1 + … + An ≤ 1 &lt; A1 + … + A(n+1), where the Ai are exponential interarrival times with rate α.",
  "o": [
   [
    "True",
    "Correct. This is (5.7): the nth arrival comes before time 1 and the (n + 1)st after it, i.e. exactly n arrivals in one unit of time."
   ],
   [
    "False",
    "Wrong: the notes state this equivalence as (5.7) (L5, 5.2.1 Poisson distribution)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Generate a Poisson variate with α = 0.5 (e^(−0.5) = 0.6065) from the random numbers 0.9, 0.6, 0.4. What is N, and how many random numbers are used?",
  "o": [
   [
    "N = 2, 3 random numbers",
    "Wrong: that compares P with α = 0.5 (0.54 ≥ 0.5, then 0.216 < 0.5); the test is P < e^(−α) (L5, Procedure for generating a Poisson variate N)."
   ],
   [
    "N = 0, 1 random number",
    "Wrong: that accepts when P ≥ e^(−α); P = 0.9 ≥ 0.6065 means reject n = 0 (L5, Procedure for generating a Poisson variate N)."
   ],
   [
    "N = 2, 2 random numbers",
    "Wrong: N is not the count of random numbers used; N = n needs n + 1 of them (L5, Procedure for generating a Poisson variate N)."
   ],
   [
    "N = 1, 2 random numbers",
    "Correct. n = 0: P = 0.9 ≥ 0.6065, reject; n = 1: P = 0.9 × 0.6 = 0.54 < 0.6065, accept N = 1. N = n uses n + 1 = 2 numbers."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> In Example 5.7 (α = 0.2, e^(−0.2) = 0.8187), which first random numbers R1 give N = 0 immediately?",
  "o": [
   [
    "R1 &gt; 0.1813",
    "Wrong: 0.1813 = 1 − e^(−0.2); the test uses e^(−α) itself and the sign is <, not > (L5, Procedure for generating a Poisson variate N)."
   ],
   [
    "R1 &lt; 0.8187",
    "Correct. With n = 0, P = R1, and N = 0 is accepted when P < e^(−α) = 0.8187 (as for 0.4357 and 0.4146)."
   ],
   [
    "R1 ≥ 0.8187",
    "Wrong: P ≥ e^(−α) means reject n and continue (R1 = 0.8353 was rejected) (L5, Procedure for generating a Poisson variate N)."
   ],
   [
    "R1 &lt; 0.2",
    "Wrong: that compares R1 with α instead of e^(−α) (L5, Procedure for generating a Poisson variate N)."
   ]
  ],
  "a": 1
 },
 {
  "q": "The pdf of a uniform (0, 1) random number R is f_R(x) = x for 0 ≤ x ≤ 1.",
  "o": [
   [
    "True",
    "Wrong: f_R(x) = 1 on [0, 1]; F_R(x) = x is the cdf (L5, Chapter overview)."
   ],
   [
    "False",
    "Correct. The pdf is f_R(x) = 1 for 0 ≤ x ≤ 1 (0 otherwise); x is the value of the cdf F_R(x) on [0, 1]."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> The inverse-transform generator X = 2 + 6R produces a uniform distribution on which interval?",
  "o": [
   [
    "[6, 8]",
    "Wrong: at R = 0 the generator gives 2, so the interval starts at 2 (L5, 5.1.2 Uniform distribution on [a, b])."
   ],
   [
    "[2, 8]",
    "Correct. X = a + (b − a)R with a = 2 and b − a = 6, so b = 8 (R = 0 → 2, R = 1 → 8)."
   ],
   [
    "[2, 6]",
    "Wrong: 6 is b − a, not b (L5, 5.1.2 Uniform distribution on [a, b])."
   ],
   [
    "[0, 6]",
    "Wrong: that ignores a = 2, the value at R = 0 (L5, 5.1.2 Uniform distribution on [a, b])."
   ]
  ],
  "a": 1
 },
 {
  "q": "In Example 5.2, the graphical method locates R on the vertical axis, draws a horizontal line until it hits a jump in the cdf, then drops a perpendicular to the horizontal axis to read X.",
  "o": [
   [
    "True",
    "Correct. This is how R1 = 0.73 gives X1 = 1 in Figure 5.2."
   ],
   [
    "False",
    "Wrong: the notes describe exactly these three moves for R1 = 0.73 (L5, Example 5.2: empirical discrete distribution (shipments))."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Scenario.</b> An analyst has a table of past relative frequencies of daily demand (0, 1, 2, 3 units) and wants to generate demands. Which Lecture 5 method fits?",
  "o": [
   [
    "Acceptance-rejection with R ≥ 1/4",
    "Wrong: that example generates a continuous uniform on [1/4, 1], not a discrete demand (L5, 5.2 Acceptance-rejection technique)."
   ],
   [
    "X = −(1/λ) ln R",
    "Wrong: that is the exponential generator, for a continuous variable (L5, Procedure for the inverse transform (exponential))."
   ],
   [
    "The quadratic formula of Example 5.4",
    "Wrong: that is for the specific pmf 2x/(k(k + 1)); a frequency table is handled by table lookup (L5, 5.1.4 Discrete distributions)."
   ],
   [
    "The inverse transform by table lookup (an empirical discrete distribution)",
    "Correct. Discrete distributions are generated numerically by table lookup, as in Example 5.2."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> For the triangular distribution (0, 2), mode 1, which random number R generates X = 0.5?",
  "o": [
   [
    "0.125",
    "Correct. X = 0.5 ≤ 1, so R = X²/2 = 0.25/2 = 0.125 (check: √(2 × 0.125) = 0.5)."
   ],
   [
    "0.25",
    "Wrong: that is X² without dividing by 2 (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "0.5",
    "Wrong: R = X only for the uniform (0, 1); here R = X²/2 (L5, 5.1.3 Triangular distribution)."
   ],
   [
    "0.875",
    "Wrong: that is 1 − 0.125, the cdf piece for 1 < x ≤ 2 (it gives X = 1.5) (L5, 5.1.3 Triangular distribution)."
   ]
  ],
  "a": 0
 }
]);
EXTRA.ms["6"] = (EXTRA.ms["6"] || []).concat([
 {
  "q": "<b>Scenario.</b> An analyst records service times only for services that finish before the shift ends, leaving out services still running at closing time. Which data-collection suggestion warns about this?",
  "o": [
   [
    "Combine homogeneous data sets",
    "Wrong: that is about merging similar periods (e.g. the same time on successive days), not about cut-off observations (L6, Data collection)."
   ],
   [
    "Collect input data, not performance data",
    "Wrong: service times are input data; the problem is that the long ones are cut off (L6, Data collection)."
   ],
   [
    "Be aware of data censoring",
    "Correct. Censoring means the quantity is not observed in its entirety, with the danger of leaving out long process times."
   ],
   [
    "Check for autocorrelation",
    "Wrong: autocorrelation is about one customer's time affecting a later customer's, not about values that were never fully observed (L6, Data collection)."
   ]
  ],
  "a": 2
 },
 {
  "q": "Customer delays in the queue are input data that should be collected to build the input model.",
  "o": [
   [
    "True",
    "Wrong: delays are performance data (outputs); input data, such as arrival times, are beyond the system's control and are not altered by improvements (L6, Data collection)."
   ],
   [
    "False",
    "Correct. Suggestion 7: collect input data, not performance data; delays are an output of the system."
   ]
  ],
  "a": 1
 },
 {
  "q": "If the class intervals of a histogram are too wide, the histogram looks ragged.",
  "o": [
   [
    "True",
    "Wrong: too wide gives a coarse (blocky) histogram; too narrow gives a ragged one (L6, Histograms)."
   ],
   [
    "False",
    "Correct. Wide intervals make it coarse or blocky (Fig 6.1 b); narrow ones make it ragged (Fig 6.1 a)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> In a Q-Q plot of n = 20 observations, the smallest ordered value y1 is plotted against which quantile of the fitted distribution?",
  "o": [
   [
    "The 0 quantile",
    "Wrong: that is (j − 1)/n; the q-quantile is defined for 0 < q < 1 (L6, Quantile-quantile (Q-Q) plots)."
   ],
   [
    "The 0.5 quantile",
    "Wrong: that is j − 1/2 without dividing by n (L6, Quantile-quantile (Q-Q) plots)."
   ],
   [
    "The 0.025 quantile, F⁻¹(0.025)",
    "Correct. yj ≈ F⁻¹[(j − 1/2)/n] = F⁻¹[(1 − 0.5)/20] = F⁻¹(0.025)."
   ],
   [
    "The 0.05 quantile",
    "Wrong: that is j/n = 1/20; the notes use (j − 1/2)/n (L6, Quantile-quantile (Q-Q) plots)."
   ]
  ],
  "a": 2
 },
 {
  "q": "In a Q-Q plot, if the chosen distribution is from an appropriate family and also has appropriate parameter values, the points lie approximately on a straight line with slope 1.",
  "o": [
   [
    "True",
    "Correct. Appropriate family → approximately a straight line; appropriate parameters too → slope 1."
   ],
   [
    "False",
    "Wrong: this is how the notes read a Q-Q plot (L6, Quantile-quantile (Q-Q) plots)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Scenario.</b> A normal Q-Q plot is close to a straight line in the middle but the few points at the two extremes stray from it. What do the notes say?",
  "o": [
   [
    "The fit can still be acceptable: extremes have higher variance, and linearity in the middle matters more",
    "Correct. Greater discrepancies are acceptable at the extremes; the points never fall exactly on a line anyway."
   ],
   [
    "Reject the normal at once, since every point must be on the line",
    "Wrong: the notes say the points will never fall exactly on a straight line (L6, Quantile-quantile (Q-Q) plots)."
   ],
   [
    "Use a histogram instead, which is preferred for judging fit",
    "Wrong: a histogram is not preferred for evaluating the fit of a chosen distribution; the Q-Q plot is (L6, Quantile-quantile (Q-Q) plots)."
   ],
   [
    "The parameters are wrong, because the slope is not 1 at the extremes",
    "Wrong: the slope is judged from the overall line, mainly in the middle; scatter at the extremes is expected (L6, Quantile-quantile (Q-Q) plots)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Raw data 2, 4, 4, 5, 10 are fitted to a normal distribution. What are the suggested estimates μ̂ and σ̂²?",
  "o": [
   [
    "μ̂ = 5, σ̂² = 7.2",
    "Wrong: that divides by n = 5; S² divides by n − 1 = 4 (L6, Parameter estimation: sample mean and variance)."
   ],
   [
    "μ̂ = 5, σ̂² = 3",
    "Wrong: 3 is the standard deviation √9; the normal's σ̂² = S² is the variance (L6, Suggested (maximum-likelihood) estimators)."
   ],
   [
    "μ̂ = 0.2, σ̂² = 9",
    "Wrong: 0.2 = 1/X̄ is the exponential's λ̂; for the normal μ̂ = X̄ (L6, Suggested (maximum-likelihood) estimators)."
   ],
   [
    "μ̂ = 5, σ̂² = 9",
    "Correct. X̄ = 25/5 = 5; ΣX² = 161; S² = (161 − 5 × 25)/4 = 36/4 = 9."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Grouped discrete data: n = 50, Σ fjXj = 150, Σ fjXj² = 600. A Poisson model is considered. Which statement is right?",
  "o": [
   [
    "X̄ = 3, S² = 3.06; reject the Poisson since they are not exactly equal",
    "Wrong: the estimates never match exactly because each estimator is a random variable; a goodness-of-fit test decides, not exact equality (L6, Parameter estimation example: vehicle arrivals)."
   ],
   [
    "X̄ = 3, S² = 3.06; close, as a Poisson needs μ = σ² = λ",
    "Correct. X̄ = 150/50 = 3; S² = (600 − 50 × 9)/49 = 150/49 = 3.06; mean and variance are nearly equal."
   ],
   [
    "X̄ = 3, S² = 3.0",
    "Wrong: that divides by n = 50; S² divides by n − 1 = 49 (L6, Parameter estimation: sample mean and variance)."
   ],
   [
    "X̄ = 3, S² = 12",
    "Wrong: 12 = Σ fjXj²/n, forgetting to subtract nX̄² (L6, Parameter estimation: sample mean and variance)."
   ]
  ],
  "a": 1
 },
 {
  "q": "A parameter is an unknown constant, but an estimator is a statistic.",
  "o": [
   [
    "True",
    "Correct. This is stated on slide 21."
   ],
   [
    "False",
    "Wrong: the slide states exactly this distinction (L6, Parameter estimation: sample mean and variance)."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which suggested (maximum-likelihood) estimator is written correctly?",
  "o": [
   [
    "Lognormal: μ̂ = X̄ of the raw data",
    "Wrong: for the lognormal, X̄ and S² are computed after taking ln of the data (L6, Suggested (maximum-likelihood) estimators)."
   ],
   [
    "Poisson: α̂ = X̄",
    "Correct. The Poisson parameter α is estimated by the sample mean (α̂ = X̄ = 3.64 for the vehicle data)."
   ],
   [
    "Exponential: λ̂ = X̄",
    "Wrong: λ̂ = 1/X̄ (λ is a rate, the mean is 1/λ) (L6, Suggested (maximum-likelihood) estimators)."
   ],
   [
    "Normal: σ̂² = X̄",
    "Wrong: σ̂² = S²; μ̂ = X̄ (L6, Suggested (maximum-likelihood) estimators)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Three rates of return are 1.0, 7.4 and 20.1 (their natural logs are about 0, 2.00 and 3.00). What are the lognormal estimates?",
  "o": [
   [
    "μ̂ ≈ 1.67, σ̂² ≈ 1.56",
    "Wrong: that divides by n = 3 instead of n − 1 = 2 (L6, Parameter estimation: sample mean and variance)."
   ],
   [
    "μ̂ = 9.5, σ̂² ≈ 94.5",
    "Wrong: those are the mean and variance of the raw data; the lognormal estimates use ln of the data (L6, Suggested (maximum-likelihood) estimators)."
   ],
   [
    "μ̂ ≈ 2.25 (ln 9.5), σ̂² ≈ 2.33",
    "Wrong: ln of the mean is not the mean of the ln values; take ln of each value first, then average (L6, Suggested (maximum-likelihood) estimators)."
   ],
   [
    "μ̂ ≈ 1.67, σ̂² ≈ 2.33",
    "Correct. Mean of the logs = 5/3 = 1.67; S² = (0 + 4 + 9 − 3 × 1.667²)/2 = (13 − 8.33)/2 = 2.33."
   ]
  ],
  "a": 3
 },
 {
  "q": "A Type II error is rejecting H₀ when it is true.",
  "o": [
   [
    "True",
    "Wrong: that is a Type I error (false positive); a Type II error is retaining H₀ when it is false (false negative) (L6, Goodness-of-fit tests and decision errors)."
   ],
   [
    "False",
    "Correct. Rejecting a true H₀ is Type I (α); Type II (β) is accepting a false H₀."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> A chi-square test of a Poisson with α = 2 uses n = 100 observations. What is the expected frequency E for the cell x = 0?",
  "o": [
   [
    "13.53",
    "Correct. E = n·p(0) = 100 × e^(−2) × 2⁰/0! = 100 × 0.1353 = 13.53."
   ],
   [
    "0.1353",
    "Wrong: that is p(0) alone; Eᵢ = n·pᵢ (L6, Chi-square test)."
   ],
   [
    "27.07",
    "Wrong: that is E for x = 1: 100 × 2e^(−2) (L6, Chi-square example: vehicle arrivals)."
   ],
   [
    "2",
    "Wrong: 2 is α, the mean of the distribution, not an expected cell count (L6, Chi-square example: vehicle arrivals)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> A Poisson chi-square test starts with 12 cells (x = 0 to ≥ 11). Because Eᵢ &lt; 5, x = 0, 1 are combined into one cell and x = 7 to ≥ 11 into one cell; α is estimated from the data. The degrees of freedom are:",
  "o": [
   [
    "6",
    "Wrong: that is k − 1 = 6, forgetting s = 1 for the estimated α (L6, Chi-square test)."
   ],
   [
    "4",
    "Wrong: that counts s = 2; a Poisson has one parameter, α (L6, Chi-square test)."
   ],
   [
    "5",
    "Correct. Cells: 12 − 1 − 4 = 7 (k is reduced by one for each cell combined); df = k − s − 1 = 7 − 1 − 1 = 5, as in the vehicle example."
   ],
   [
    "10",
    "Wrong: that is 12 − 1 − 1, using k before combining; k is the number of cells left after combining (L6, Chi-square test)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> A chi-square cell has Oᵢ = 12 and Eᵢ = 8. Its contribution to χ₀² is:",
  "o": [
   [
    "1.333",
    "Wrong: that divides by Oᵢ = 12; the formula divides by the expected Eᵢ (L6, Chi-square test)."
   ],
   [
    "0.5",
    "Wrong: that is (Oᵢ − Eᵢ)/Eᵢ, without squaring (L6, Chi-square test)."
   ],
   [
    "2",
    "Correct. (Oᵢ − Eᵢ)²/Eᵢ = (12 − 8)²/8 = 16/8 = 2."
   ],
   [
    "16",
    "Wrong: that is (Oᵢ − Eᵢ)² without dividing by Eᵢ (L6, Chi-square test)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Testing an exponential with λ = 0.5, what is the theoretical probability pᵢ of the class interval [1, 3)?",
  "o": [
   [
    "0.3834",
    "Correct. pᵢ = F(3) − F(1) = (1 − e^(−1.5)) − (1 − e^(−0.5)) = 0.6065 − 0.2231 = 0.3834."
   ],
   [
    "0.7769",
    "Wrong: that is F(3) alone; pᵢ = F(aᵢ) − F(aᵢ₋₁) (L6, Chi-square test)."
   ],
   [
    "0.2231",
    "Wrong: that is e^(−1.5) = 1 − F(3), the probability beyond 3 (L6, Chi-square test)."
   ],
   [
    "19.17",
    "Wrong: that is the expected frequency for n = 50 (50 × 0.3834), not the probability (L6, Chi-square test)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> K-S test for uniformity of the sorted numbers 0.10, 0.35, 0.60, 0.95 (N = 4). What is D?",
  "o": [
   [
    "0.15",
    "Wrong: that is D⁺ only; D = max(D⁺, D⁻) (L6, Kolmogorov-Smirnov test)."
   ],
   [
    "0.05",
    "Wrong: that is the smallest difference; K-S uses the maximum difference (L6, Kolmogorov-Smirnov test)."
   ],
   [
    "0.35",
    "Wrong: that is D⁺ + D⁻; D is the larger of the two, not their sum (L6, Kolmogorov-Smirnov test)."
   ],
   [
    "0.20",
    "Correct. D⁺ = max(0.25 − 0.10, 0.50 − 0.35, 0.75 − 0.60, 1 − 0.95) = 0.15; D⁻ = max(0.10, 0.10, 0.10, 0.20) = 0.20; D = max = 0.20."
   ]
  ],
  "a": 3
 },
 {
  "q": "When parameters have been estimated from the data, the K-S critical values are biased (too large), so the test is more conservative.",
  "o": [
   [
    "True",
    "Correct. Slide 31: critical values are biased, too large, giving a smaller Type I error than specified."
   ],
   [
    "False",
    "Wrong: the slide says exactly this for the case with parameter estimates (L6, Kolmogorov-Smirnov test)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Two inputs have cov(X₁, X₂) = 6, σ₁ = 2 and σ₂ = 5. What is the correlation ρ?",
  "o": [
   [
    "6",
    "Wrong: 6 is the covariance; correlation standardizes it to between −1 and 1 (L6, Multivariate input models: covariance and correlation)."
   ],
   [
    "0.6",
    "Correct. ρ = cov/(σ₁σ₂) = 6/(2 × 5) = 0.6, a positive linear dependence."
   ],
   [
    "0.06",
    "Wrong: that divides by σ₁²σ₂² = 100; ρ divides by σ₁σ₂ (L6, Multivariate input models: covariance and correlation)."
   ],
   [
    "3",
    "Wrong: that divides by σ₁ only; also a correlation must lie between −1 and 1 (L6, Multivariate input models: covariance and correlation)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> An AR(1) model has φ = 0.5 and σε² = 3. What are Var(Xₜ) and the lag-2 autocorrelation ρ₂?",
  "o": [
   [
    "Var = 3, ρ₂ = 0.5",
    "Wrong: σε² is the variance of εₜ, not of Xₜ, and ρ₂ = φ² not φ (L6, Time-series input models: AR(1) and EAR(1))."
   ],
   [
    "Var = 4, ρ₂ = 0.25",
    "Correct. Var(Xₜ) = σε²/(1 − φ²) = 3/0.75 = 4; ρₕ = φʰ = 0.5² = 0.25."
   ],
   [
    "Var = 6, ρ₂ = 0.25",
    "Wrong: that divides by 1 − φ = 0.5; the variance uses 1 − φ² (L6, Time-series input models: AR(1) and EAR(1))."
   ],
   [
    "Var = 4, ρ₂ = 1.0",
    "Wrong: that is 2φ; the lag-h autocorrelation is φ to the power h (L6, Time-series input models: AR(1) and EAR(1))."
   ]
  ],
  "a": 1
 }
]);
EXTRA.ms["7"] = (EXTRA.ms["7"] || []).concat([
 {
  "q": "<b>Applied.</b> A single-server trace runs to T = 15: CLOCK 0 start (NCUST 0, STATUS 0); 2 arrival (1, 1); 4 arrival (2, 1); 7 departure (1, 1); 9 arrival (2, 1); 10 departure (1, 1); 12 departure (0, 0). Each row is the state just after the event. What is L̂Q?",
  "o": [
   [
    "14/15 = 0.933",
    "Wrong: that averages NCUST (customers in the system), counting the one in service; the queue length is NCUST − STATUS (L7, Example 7.1: finding an error with a trace)."
   ],
   [
    "4/12 = 0.333",
    "Wrong: that divides by the last event time 12; T is the run length, 15 (L7, Example 7.1: finding an error with a trace)."
   ],
   [
    "2/15 = 0.133",
    "Wrong: that counts the 2 intervals with a waiting customer instead of weighting each by its length (3 and 1) (L7, Example 7.1: finding an error with a trace)."
   ],
   [
    "4/15 = 0.267",
    "Correct. Queue length = NCUST − STATUS: 0 (0–2), 0 (2–4), 1 (4–7, 3 units), 0 (7–9), 1 (9–10, 1 unit), 0 (10–12), 0 (12–15); L̂Q = (3 + 1)/15 = 0.267."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Which row of this single-server trace shows incorrect logic? CLOCK 5 arrival (NCUST 1, STATUS 1); CLOCK 8 departure (NCUST 0, STATUS 1); CLOCK 10 arrival (NCUST 1, STATUS 1); CLOCK 13 arrival (NCUST 2, STATUS 1).",
  "o": [
   [
    "CLOCK = 8",
    "Correct. After the departure nobody is in the system (NCUST = 0), yet STATUS = 1 says the server is busy: the mirror image of the error at CLOCK = 3 in Example 7.1. ‡ (the notes' example shows the opposite case)"
   ],
   [
    "CLOCK = 10",
    "Wrong: the new arrival finds an idle server and starts service: NCUST 1, STATUS 1 is consistent (L7, Example 7.1: finding an error with a trace)."
   ],
   [
    "CLOCK = 13",
    "Wrong: two customers, one in service and one waiting, with a busy server is consistent (L7, Example 7.1: finding an error with a trace)."
   ],
   [
    "CLOCK = 5",
    "Wrong: one customer in the system and a busy server is consistent (L7, Example 7.1: finding an error with a trace)."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which is one of the two goals of validation?",
  "o": [
   [
    "To print the input parameters at the end of the run",
    "Wrong: that is one of the verification considerations (L7, 7.2 Verification: purpose and considerations)."
   ],
   [
    "To forecast a range of output values before running",
    "Wrong: that is the common sense verification technique (L7, Three verification techniques: common sense, documentation, trace)."
   ],
   [
    "To increase the acceptance and credibility of the model, so managers and decision makers use it",
    "Correct. Goal 2; goal 1 is a model that represents true system behavior, usable as a substitute for the actual system."
   ],
   [
    "To check that the program matches the conceptual model",
    "Wrong: that is verification (building the model right) (L7, Why verification and validation matter)."
   ]
  ],
  "a": 2
 },
 {
  "q": "In the 3 steps of model building, what does Step 2 produce?",
  "o": [
   [
    "Observations of the real system and data on its behavior",
    "Wrong: that is Step 1 (L7, 7.1 Model building, verification and validation (3 steps))."
   ],
   [
    "A calibrated and validated model",
    "Wrong: calibration and validation are the loop around the steps, not Step 2 (L7, 7.1 Model building, verification and validation (3 steps))."
   ],
   [
    "A conceptual model: assumptions on the components and structure of the system, and hypotheses on the input parameter values",
    "Correct. Step 2 is the construction of the conceptual model."
   ],
   [
    "The computerized model",
    "Wrong: translation into a computer-recognizable form is Step 3 (L7, 7.1 Model building, verification and validation (3 steps))."
   ]
  ],
  "a": 2
 },
 {
  "q": "Model building is a linear process: each of the three steps is carried out once, in order.",
  "o": [
   [
    "True",
    "Wrong: model building is not a linear process; the builder returns to the steps many times while building, verifying and validating (L7, 7.1 Model building, verification and validation (3 steps))."
   ],
   [
    "False",
    "Correct. The notes say model building is not linear; as development proceeds new questions arise and the builder returns to Step 1."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Scenario.</b> At the end of a run, the total count of the inspection subsystem is 0. What does this reveal?",
  "o": [
   [
    "No items entered that subsystem",
    "Correct. Total count = items that have entered a component by a given time; 0 means nothing entered."
   ],
   [
    "The queue is unstable",
    "Wrong: that is signalled by high current contents (L7, Statistics that show model reasonableness)."
   ],
   [
    "An entity captured a resource but never freed it",
    "Wrong: that is signalled by current count and total count both equal to one (L7, Statistics that show model reasonableness)."
   ],
   [
    "The model is validated",
    "Wrong: these statistics check reasonableness during verification; they do not validate the model (L7, Statistics that show model reasonableness)."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which is <b>not</b> one of the ways the interactive run controller (IRC) or debugger helps?",
  "o": [
   [
    "Monitoring the simulation by advancing it to a desired time and displaying model information",
    "Wrong: this is use (a) of the IRC (L7, 7.2 Verification: purpose and considerations)."
   ],
   [
    "Pausing every time a specified entity becomes active",
    "Wrong: this is use (b), focusing on a particular entity or lines of logic (L7, 7.2 Verification: purpose and considerations)."
   ],
   [
    "Temporarily suspending the run to reassign values or redirect entities",
    "Wrong: this is use (d) (L7, 7.2 Verification: purpose and considerations)."
   ],
   [
    "Automatically comparing the model output with real system data",
    "Correct. That is an objective validation test, which needs system data; the IRC is a verification tool for the program's logic."
   ]
  ],
  "a": 3
 },
 {
  "q": "A trace run usually covers the whole simulation, because the printout is produced automatically.",
  "o": [
   [
    "True",
    "Wrong: because of the time it takes, a trace run is usually restricted (short), and a selective trace can be set for specific locations (L7, Three verification techniques: common sense, documentation, trace)."
   ],
   [
    "False",
    "Correct. A trace is usually restricted to a short run, or made selective for specific locations in the model."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which verification technique consists of brief comments, definitions of all variables and parameters, and a description of each major section of the model?",
  "o": [
   [
    "Turing test",
    "Wrong: that is a validation test with real and fake reports (L7, 7.3.5 Input-output validation using a Turing test)."
   ],
   [
    "Documentation",
    "Correct. Documentation clarifies the logic of the model."
   ],
   [
    "Trace",
    "Wrong: a trace prints the value of each variable every time one changes (L7, Three verification techniques: common sense, documentation, trace)."
   ],
   [
    "Common sense technique",
    "Wrong: that forecasts a reasonable range of outputs before running (L7, Three verification techniques: common sense, documentation, trace)."
   ]
  ],
  "a": 1
 },
 {
  "q": "The computerized model should be checked by someone other than its developer.",
  "o": [
   [
    "True",
    "Correct. This is the first verification consideration."
   ],
   [
    "False",
    "Wrong: it is consideration (1) in the notes (L7, 7.2 Verification: purpose and considerations)."
   ]
  ],
  "a": 0
 },
 {
  "q": "What do objective tests for comparing the model to reality require?",
  "o": [
   [
    "A flow diagram of the system operations",
    "Wrong: a flow diagram is a verification consideration (L7, 7.2 Verification: purpose and considerations)."
   ],
   [
    "Data on system behavior and the corresponding data produced by the model",
    "Correct. That is the definition of objective tests."
   ],
   [
    "People knowledgeable about the system judging the model and its output",
    "Wrong: that is a subjective test (L7, 7.3 Calibration and validation)."
   ],
   [
    "A detailed trace with manual calculations",
    "Wrong: a trace is a verification technique for the program (L7, Three verification techniques: common sense, documentation, trace)."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Scenario.</b> After several costly revisions the model still does not reach the required accuracy within the budget. What do the notes say to do?",
  "o": [
   [
    "Keep calibrating until the accuracy is reached, whatever the cost",
    "Wrong: each revision costs time, cost and effort, which must be weighed (L7, 7.3 Calibration and validation)."
   ],
   [
    "Accept the model as it is, since calibration has been done",
    "Wrong: the model must be judged accurate before it is accepted (L7, 7.3 Calibration and validation)."
   ],
   [
    "Skip validation and rely on verification",
    "Wrong: verification checks the program, not whether the model matches the real system (L7, Why verification and validation matter)."
   ],
   [
    "Lower the accuracy level or reject the model",
    "Correct. The modeler weighs the gain in accuracy against the cost; if it is not reached within budget, lower the accuracy or reject the model."
   ]
  ],
  "a": 3
 },
 {
  "q": "To build a model with high face validity, potential users should be involved:",
  "o": [
   [
    "From conceptualization to implementation",
    "Correct. So that reality is built into the model through assumptions about system structure and reliable data."
   ],
   [
    "Only at the final validation",
    "Wrong: they must be involved throughout, from conceptualization (L7, 7.3.1 Face validity)."
   ],
   [
    "Only during data collection",
    "Wrong: they also evaluate output for reasonableness and take part in calibration (L7, 7.3.1 Face validity)."
   ],
   [
    "Only when a Turing test is run",
    "Wrong: the Turing test uses an engineer to judge reports; face validity needs users all along (L7, 7.3.1 Face validity)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Scenario.</b> A large model has dozens of input variables, and running sensitivity tests on all of them is too expensive. What should the builder do?",
  "o": [
   [
    "Test every variable regardless of cost",
    "Wrong: the notes allow choosing the critical variables when testing is too expensive (L7, 7.3.1 Face validity)."
   ],
   [
    "Replace sensitivity analysis with a trace",
    "Wrong: a trace verifies program logic; it does not test how the model responds to changed inputs (L7, Three verification techniques: common sense, documentation, trace)."
   ],
   [
    "Choose the most critical input variables for sensitivity testing",
    "Correct. If testing is too expensive or time consuming, the builder tests the most critical input variables."
   ],
   [
    "Skip sensitivity analysis completely",
    "Wrong: sensitivity analysis still checks face validity; it is narrowed, not dropped (L7, 7.3.1 Face validity)."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Scenario.</b> In the bank model, \"customers may shift to a line that moves faster\" is a structural assumption. How is it verified?",
  "o": [
   [
    "By a trace of the computer program",
    "Wrong: a trace verifies the program, not whether an assumption matches the real bank (L7, Three verification techniques: common sense, documentation, trace)."
   ],
   [
    "By a Turing test",
    "Wrong: the Turing test compares model and system output reports (L7, 7.3.5 Input-output validation using a Turing test)."
   ],
   [
    "By observation at regular intervals and discussions with managers and tellers",
    "Correct. Structural assumptions are verified this way."
   ],
   [
    "By a chi-square goodness-of-fit test",
    "Wrong: goodness-of-fit tests validate data assumptions (distributions), not how the system operates (L7, 7.3.2 Validation of model assumptions)."
   ]
  ],
  "a": 2
 },
 {
  "q": "In what order are the three steps of the statistical analysis of data assumptions done?",
  "o": [
   [
    "Identify the distribution → estimate its parameters → validate by goodness-of-fit tests",
    "Correct. (1) identify the appropriate distribution, (2) estimate the parameters, (3) validate with chi-square or K-S and graphs."
   ],
   [
    "Estimate the parameters → identify the distribution → validate",
    "Wrong: the family must be identified before its parameters can be estimated (L7, 7.3.2 Validation of model assumptions)."
   ],
   [
    "Validate → identify the distribution → estimate the parameters",
    "Wrong: goodness of fit tests a chosen distribution with its estimated parameters, so it comes last (L7, 7.3.2 Validation of model assumptions)."
   ],
   [
    "Identify the distribution → validate → estimate the parameters",
    "Wrong: parameters must be estimated before the fit can be tested (L7, 7.3.2 Validation of model assumptions)."
   ]
  ],
  "a": 0
 },
 {
  "q": "When two or more data sets are combined, an objective statistical test for homogeneity is done.",
  "o": [
   [
    "True",
    "Correct. The bank example states this; extra tests may also check for correlation in the data."
   ],
   [
    "False",
    "Wrong: the notes require a homogeneity test when data sets are combined (L7, 7.3.2 Validation of model assumptions)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Scenario.</b> A validated model of a factory is changed only in the arrival rate of jobs, to study a proposed system. What do the notes say?",
  "o": [
   [
    "Complete input-output validation is impossible, so the model must be rejected",
    "Wrong: for a minor modification the new model's output can be accepted with confidence (L7, 7.3.3 Validating input-output transformations)."
   ],
   [
    "Validate a similar subsystem elsewhere and integrate it (partial validation)",
    "Wrong: partial validation is for major changes (L7, 7.3.3 Validating input-output transformations)."
   ],
   [
    "A Turing test is required before any use",
    "Wrong: the notes do not require a Turing test here; careful verification of the minor change is enough (L7, 7.3.3 Validating input-output transformations)."
   ],
   [
    "It is a minor change: verify the change carefully, and confidence in the old model can be transferred",
    "Correct. A single numerical parameter is a minor change; confidence transfers when the new model is a minor modification."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Scenario.</b> In the simulation-study flowchart, the answer to step 7 \"Validated?\" is No. Where does the study go back to?",
  "o": [
   [
    "Step 1 (problem formulation)",
    "Wrong: the flowchart sends a failed validation back to steps 3 and 4 (L7, Link to Lecture 1: verification and validation in the simulation study)."
   ],
   [
    "Steps 3 (model conceptualization) and 4 (data collection)",
    "Correct. If not validated, return to steps 3 and 4; if yes, continue to step 8 (experimental design)."
   ],
   [
    "Step 5 (model translation)",
    "Wrong: that is the return for step 6 \"Verified?\" = No (L7, Link to Lecture 1: verification and validation in the simulation study)."
   ],
   [
    "Step 8 (experimental design)",
    "Wrong: step 8 follows a Yes to \"Validated?\" (L7, Link to Lecture 1: verification and validation in the simulation study)."
   ]
  ],
  "a": 1
 },
 {
  "q": "Input-output validation using historical input data is difficult for large systems because of the need for simultaneous data collection.",
  "o": [
   [
    "True",
    "Correct. All inputs and responses must be collected in the same time period; electronic counters and devices make it easier."
   ],
   [
    "False",
    "Wrong: the notes state this difficulty for large systems (L7, 7.3.4 Input-output validation using historical input data)."
   ]
  ],
  "a": 0
 }
]);
EXTRA.ms["8"] = (EXTRA.ms["8"] || []).concat([
 {
  "q": "<b>Applied.</b> Using the lab's standard algorithm, an integer random number in [5, 15] is generated with R1 = 0.37. What is R?",
  "o": [
   [
    "3",
    "Wrong: that forgets the translation step R = R2 + Low (L8, Generating random numbers in C++ (Lab 1))."
   ],
   [
    "8",
    "Correct. R2 = 0.37 × (15 − 5) = 3.7; truncate → 3; translate: R = 3 + 5 = 8."
   ],
   [
    "8.7",
    "Wrong: that skips the truncation step; 8.7 is the real-number (RandReal) version (L8, Generating random numbers in C++ (Lab 1))."
   ],
   [
    "9",
    "Wrong: that rounds 3.7 to 4; the algorithm truncates (L8, Generating random numbers in C++ (Lab 1))."
   ]
  ],
  "a": 1
 },
 {
  "q": "In the lab's normalization step R1 = R0/(RAND_MAX + 1), R1 can never equal 1.",
  "o": [
   [
    "True",
    "Correct. R0 ≤ RAND_MAX < RAND_MAX + 1, so R1 lies in [0, 1). ‡ The lab itself writes [0, 1]."
   ],
   [
    "False",
    "Wrong: rand() returns at most RAND_MAX, which is less than the divisor RAND_MAX + 1 (L8, Generating random numbers in C++ (Lab 1))."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> In the Excel version of the unbiased coin, column B holds =IF(A2&lt;0.5,\"H\",\"T\"). If A2 = 0.5, what does B2 show?",
  "o": [
   [
    "H",
    "Wrong: the test is strictly less than 0.5; equal goes to the else part (L8, Unbiased coin (Lab 2))."
   ],
   [
    "An error",
    "Wrong: A2 holds a number from RAND(), so the comparison is valid (L8, Unbiased coin (Lab 2))."
   ],
   [
    "0.5",
    "Wrong: the IF returns one of the two labels, not the random number (L8, Unbiased coin (Lab 2))."
   ],
   [
    "T",
    "Correct. 0.5 < 0.5 is false, so the IF returns \"T\". (The C++ code counts res <= 0.5 as a head; both give probability 0.5.)"
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Gift Shop: customer i arrives at Ar_Clk = 12, the previous customer's service ends at 15, and customer i's service time is 4. What are WT[i] and Idle[i]?",
  "o": [
   [
    "WT = 7, Idle = 0",
    "Correct. Serv_begin = Max(12, 15) = 15; Serv_end = 19; WT = 19 − 12 = 7; the clerk is busy at 12, so Idle = 0."
   ],
   [
    "WT = 4, Idle = 0",
    "Wrong: that is the service time only; WT[i] = Serv_end[i] − Ar_Clk[i] includes the 3 minutes of waiting (L8, Gift Shop: model and flowchart)."
   ],
   [
    "WT = 3, Idle = 0",
    "Wrong: that is the waiting in the queue only; WT in the lab is the time in the system (waiting + service) (L8, Gift Shop: model and flowchart)."
   ],
   [
    "WT = 7, Idle = 3",
    "Wrong: idle time counts only when the customer arrives after the clerk is free (Ar_Clk[i] > Serv_end[i−1]); here 12 < 15 (L8, Gift Shop: model and flowchart)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Monte Carlo area: the rectangle has b = 1, c = 3 and h = 2. Of N = 1000 random points, K = 400 fall under the curve. The estimated area is:",
  "o": [
   [
    "0.8",
    "Wrong: that multiplies K/N by only one of h or (c − b) (L8, 8-2. Area under a curve (Monte Carlo integration))."
   ],
   [
    "0.1",
    "Wrong: that is K/(h(c − b)N), dividing by the rectangle instead of multiplying (L8, 8-2. Area under a curve (Monte Carlo integration))."
   ],
   [
    "1.6",
    "Correct. A = K h (c − b)/N = 400 × 2 × 2/1000 = 1.6."
   ],
   [
    "0.4",
    "Wrong: that is K/N, which equals A only when h(c − b) = 1, as in the book's example (L8, 8-2. Area under a curve (Monte Carlo integration))."
   ]
  ],
  "a": 2
 },
 {
  "q": "Simulation results are likely to be more accurate than analytic solutions.",
  "o": [
   [
    "True",
    "Wrong: simulation results are likely to be less accurate than analytic solutions; the 3000-point area 0.784 differs from π/4 (L8, Area under a curve: flowchart, program output and analytic check)."
   ],
   [
    "False",
    "Correct. The book says simulation is likely to be less accurate; it is attractive only when the problem is difficult, expensive, hazardous or impossible to solve otherwise."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which is <b>not</b> one of the simplifying assumptions of the pure pursuit problem?",
  "o": [
   [
    "The fighter's speed VF is constant at 20 km/minute",
    "Wrong: this is assumption (2) (L8, Pure pursuit problem: definition and assumptions (8-3, Lab 4))."
   ],
   [
    "The target's path is specified as a function of time",
    "Wrong: this is assumption (3) (L8, Pure pursuit problem: definition and assumptions (8-3, Lab 4))."
   ],
   [
    "The bomber changes its course to escape the fighter",
    "Correct. The bomber's path is fixed in advance (the XB, YB table); it does not react to the fighter."
   ],
   [
    "Both aircraft fly in the same horizontal plane, so the model is two-dimensional",
    "Wrong: this is assumption (1) (L8, Pure pursuit problem: definition and assumptions (8-3, Lab 4))."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> With the pursuit equations, the fighter is at (10, 20), the bomber at (40, 60), and VF = 20. Where is the fighter one minute later?",
  "o": [
   [
    "(22, 36)",
    "Correct. DIST = √(30² + 40²) = 50; cos θ = 30/50 = 0.6, sin θ = 40/50 = 0.8; XF = 10 + 20(0.6) = 22, YF = 20 + 20(0.8) = 36."
   ],
   [
    "(26, 32)",
    "Wrong: that swaps sin and cos; XF uses cos θ = (XB − XF)/DIST (L8, Pursuit problem: model and flowchart)."
   ],
   [
    "(40, 60)",
    "Wrong: the fighter moves only VF = 20 km per minute along the line of sight; the bomber is 50 km away (L8, Pursuit problem: model and flowchart)."
   ],
   [
    "(10.6, 20.8)",
    "Wrong: that adds cos θ and sin θ without multiplying by VF = 20 (L8, Pursuit problem: model and flowchart)."
   ]
  ],
  "a": 0
 },
 {
  "q": "In the pursuit model, the fighter changes its direction continuously to point at the bomber.",
  "o": [
   [
    "True",
    "Wrong: it realigns only after a fixed time span Δt (every minute) and flies straight in between (L8, Pure pursuit problem: definition and assumptions (8-3, Lab 4))."
   ],
   [
    "False",
    "Correct. At instant t it aligns with the line of sight, flies that way for one minute, then looks again."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> After 10 blocks the staggering drunk is at (X, Y) = (2, −1). Is the trial a success?",
  "o": [
   [
    "Yes: the straight-line distance √5 ≈ 2.24 rounds to 2",
    "Wrong: the rule is |X| + |Y| ≤ 2, not the straight-line distance (L8, 8-4. The staggering drunk (random walk) problem)."
   ],
   [
    "Yes: |X + Y| = 1 ≤ 2",
    "Wrong: the signs must not cancel; use the absolute value of each coordinate (L8, 8-4. The staggering drunk (random walk) problem)."
   ],
   [
    "Yes: max(|X|, |Y|) = 2 ≤ 2",
    "Wrong: the rule adds the two distances, |X| + |Y| (L8, 8-4. The staggering drunk (random walk) problem)."
   ],
   [
    "No: |X| + |Y| = 3 &gt; 2, so he ended more than 2 blocks away",
    "Correct. He walks along streets, so the distance in blocks is |2| + |−1| = 3 > 2: failure."
   ]
  ],
  "a": 3
 },
 {
  "q": "In the flipping coin game, why can a game never end after exactly 8 flips?",
  "o": [
   [
    "Because the coin is unbiased",
    "Wrong: the parity argument holds for any coin; it does not depend on P(H) = 0.5 (L8, Flipping coin game: assumptions and model (Lab 5))."
   ],
   [
    "A game stops at |H − T| = 3, an odd difference, so H + T (the number of flips) must be odd",
    "Correct. H − T and H + T have the same parity; an odd difference means an odd total: 3, 5, 7, 9, …"
   ],
   [
    "The code forbids an 8th flip",
    "Wrong: the code keeps flipping while |H − T| ≠ 3; nothing forbids flip 8 (L8, Flipping coin game: assumptions and model (Lab 5))."
   ],
   [
    "Because 8 flips would give a net gain of 0, which is skipped",
    "Wrong: nothing is skipped; an even number of flips simply cannot give |H − T| = 3 (L8, Flipping coin game: assumptions and model (Lab 5))."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Three coin games have net gains 5, −1 and 3. Using the lab's formulas (variance = (1/N) Σ(Xᵢ − X̄)²), what are the mean and the variance?",
  "o": [
   [
    "Mean 3, variance 6.22",
    "Wrong: 3 is the median of 5, −1, 3; the mean is ΣX/n = 7/3 (L8, Flipping coin game: assumptions and model (Lab 5))."
   ],
   [
    "Mean 2.33, variance 6.22",
    "Correct. Mean = 7/3 = 2.33; deviations 2.67, −3.33, 0.67; squares sum 18.67; variance = 18.67/3 = 6.22."
   ],
   [
    "Mean 2.33, variance 9.33",
    "Wrong: that divides by N − 1 = 2; the lab's variance divides by N (L8, Flipping coin game: assumptions and model (Lab 5))."
   ],
   [
    "Mean 2.33, variance 2.49",
    "Wrong: 2.49 is the standard deviation √6.22 (L8, Flipping coin game: assumptions and model (Lab 5))."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Newspaper seller (Quiz 5 prices): Q = 80 papers and the demand is 60. What is the day's profit?",
  "o": [
   [
    "$3.60",
    "Wrong: that forgets the salvage of the 20 unsold papers (L8, Newspaper seller problem: data (Quiz 5))."
   ],
   [
    "$11.20",
    "Wrong: that charges the cost only for the 60 sold papers; all Q = 80 are bought (L8, Newspaper seller problem: data (Quiz 5))."
   ],
   [
    "$13.60",
    "Wrong: that values the leftovers at the selling price $0.50 instead of the scrap price $0.05 (L8, Newspaper seller problem: data (Quiz 5))."
   ],
   [
    "$4.60",
    "Correct. Revenue 0.50 × 60 = 30.00; cost 0.33 × 80 = 26.40; salvage 0.05 × 20 = 1.00; no lost profit: 30.00 − 26.40 + 1.00 = 4.60."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Newspaper seller (Quiz 5): RN(type) = 0.35 and RN(demand) = 0.44. What are the day type and the demand?",
  "o": [
   [
    "Good day, demand 80",
    "Correct. 0.35 is in 01-35 → good; on a good day 44 is in 44-78 → 80."
   ],
   [
    "Fair day, demand 60",
    "Wrong: 35 is the last number of the good range (01-35); fair starts at 36 (L8, Newspaper seller problem: data (Quiz 5))."
   ],
   [
    "Good day, demand 70",
    "Wrong: the good-day 70 range is 24-43; 44 starts the 80 range (L8, Newspaper seller problem: data (Quiz 5))."
   ],
   [
    "Poor day, demand 50",
    "Wrong: that reads 44 in the poor-day column (01-44 → 50); the day type is good (L8, Newspaper seller problem: data (Quiz 5))."
   ]
  ],
  "a": 0
 },
 {
  "q": "In Quiz 5, the lost profit per unmet demand, $0.17, equals the selling price minus the purchase cost.",
  "o": [
   [
    "True",
    "Correct. 0.50 − 0.33 = 0.17."
   ],
   [
    "False",
    "Wrong: the notes give lost profit = 0.50 − 0.33 = $0.17 (L8, Newspaper seller problem: data (Quiz 5))."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> A cake shop uses the general model with P = $6.00, C = $2.50 and S = $1.00. What is the profit on a day with x = 5 and d = 3?",
  "o": [
   [
    "$17.50",
    "Wrong: that is (P − C)x = 3.5 × 5, as if all 5 were sold; that is the case x ≤ d (L8, Cake shop: model development)."
   ],
   [
    "$5.50",
    "Wrong: that loses the full cost C on each surplus cake (10.5 − 2 × 2.5), forgetting the $1.00 salvage (L8, Cake shop: model development)."
   ],
   [
    "$7.50",
    "Correct. x > d: z = (P − S)d + (S − C)x = 5 × 3 − 1.5 × 5 = 15 − 7.5 = 7.5."
   ],
   [
    "$10.50",
    "Wrong: that is (P − C)d = 3.5 × 3, ignoring the $1.50 loss on each of the 2 surplus cakes (L8, Cake shop: model development)."
   ]
  ],
  "a": 2
 },
 {
  "q": "In the Auto Supplies inventory model, a new order can be placed while another order is still outstanding.",
  "o": [
   [
    "True",
    "Wrong: an order is placed only if I ≤ r and no order is outstanding; there are never two orders outstanding (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ],
   [
    "False",
    "Correct. Step 4 checks \"Is an order currently outstanding?\"; if yes, no new order is placed."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Cake shop with a goodwill cost (P = $8, C = $5, S = $3, u = $5 per unsatisfied order). What is the profit on a day with x = 40 and d = 50?",
  "o": [
   [
    "$170",
    "Wrong: that uses the x > d formula 5d − 2x; here x < d (L8, 8-8. End-of-chapter questions (book))."
   ],
   [
    "−$130",
    "Wrong: that charges goodwill on all 50 orders (120 − 250); only the d − x = 10 unsatisfied orders cost goodwill (L8, 8-8. End-of-chapter questions (book))."
   ],
   [
    "$70",
    "Correct. x ≤ d: z = (P − C)x − u(d − x) = 3 × 40 − 5 × 10 = 120 − 50 = 70 (= 8x − 5d)."
   ],
   [
    "$120",
    "Wrong: that is (P − C)x without the goodwill cost of the 10 unsatisfied orders (L8, 8-8. End-of-chapter questions (book))."
   ]
  ],
  "a": 2
 },
 {
  "q": "In one simulated day of the Auto Supplies system (Figure 8-8), what is the first step?",
  "o": [
   [
    "Check for arrivals and update I = I + x",
    "Correct. Orders arrive at the start of the day, before the demand is generated."
   ],
   [
    "Generate the daily demand d",
    "Wrong: that is step 2, after any arrivals are added (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ],
   [
    "Place an order and generate the lead time",
    "Wrong: ordering comes after the demand, when I ≤ r and no order is outstanding (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ],
   [
    "Compute the holding cost",
    "Wrong: the holding cost is computed near the end, on the day's ending inventory (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Auto Supplies (r = 3, $20 per order, $0.10 holding per unit per day, $50 shortage per unit): a day begins with I = 2, no order arrives or is outstanding, and the demand is 4. What is the day's total cost?",
  "o": [
   [
    "$100",
    "Wrong: that forgets the order: I = 0 ≤ r and no order is outstanding, so an order ($20) is placed (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ],
   [
    "$220",
    "Wrong: that charges shortage on all 4 units; the customer takes the 2 available and only d − I = 2 are short (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ],
   [
    "$120.20",
    "Wrong: that charges holding on the beginning inventory 2; holding uses the ending inventory, 0 (L8, 8-6. Inventory problem (Auto Supplies): see Lecture 2)."
   ],
   [
    "$120",
    "Correct. Shortage 50 × (4 − 2) = 100 and I = 0; I ≤ r with no order outstanding → order $20; holding 0.10 × 0 = 0; total 120."
   ]
  ],
  "a": 3
 }
]);
