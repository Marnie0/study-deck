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
