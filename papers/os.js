// Operating Systems past papers beyond the course file: questions answered from the lectures, with why every other choice is wrong.
window.PAPERS = window.PAPERS || {};
PAPERS.os = {
  exams: [
    {
      title: `Midterm 2026/2027`,
      meta: `CS332 Operating Systems · Midterm, 1st term 2026/2027 · online quiz · 40 questions (34 MCQ, 6 True/False) · Dr. Ahmed Ibrahim, Dr. Lamiaa Hassaan`,
      note: `Confirmed by the doctor (November 2026). The answers are worked out from the lectures, and several questions go beyond them and come from the standard textbook (Silberschatz) or general knowledge: the boot block, soft real-time scheduling, the API, the other names for kernel mode, real-time and embedded systems, open-source systems and ROM. The answer to "What is the objective of multiprogramming?" is increasing CPU utilization. The questions are kept as they appeared, typos included ("aNo", "ANo", "directory invoking", the stray "18.").`,
      sections: [
        { title: `Choose the correct answer`, marks: `34 questions`, items: [
          { type: `mcq`, q: `The value of the current address of the process is called.`, o: [`stack section`, `Program counter`, `heap`, `data section`], a: 1, why: `The program counter marks where the process is in its code: the location of the next instruction to execute. It is stored in the PCB so the process can resume after a context switch (Topic 2, PCB).`, ow: [`The stack holds temporary data: function parameters, return addresses and local variables (Topic 2).`, null, `The heap is memory allocated dynamically at run time (new, malloc) (Topic 2).`, `The data section holds global and static variables (Topic 2).`] },
          { type: `mcq`, q: ` A boot block ____.`, o: [`typically only knows the location and length of the rest of the bootstrap program`, `typically is sophisticated enough to load the operating system and begin its execution`, `is composed of multiple disk blocks`, `is composed of multiple disk cylinders`], a: 0, key: `Confirmed by the doctor. Not in the lectures (Topic 1 only covers the bootstrap program in ROM/EPROM). Answered from the standard textbook, Silberschatz.`, why: `A boot block is a single disk block at a fixed location, so its code must be small: it typically only knows where the rest of the bootstrap program is on disk and how long it is (Silberschatz).`, ow: [null, `Possible on some systems, but not typical: one block is too small, and the question says "typically" (Silberschatz).`, `It is a single block; that size limit is why its code is so simple (Silberschatz).`, `It is a single block, and a cylinder is far larger than a block (Silberschatz).`] },
          { type: `mcq`, q: `CPU scheduling is the basis of ___________`, o: [`multiprocessor systems`, `multiprogramming operating systems`, `none of the mentioned`, `larger memory sized systems`], a: 1, why: `CPU scheduling only matters when several processes in memory compete for the CPU, which is multiprogramming: when a job waits, the CPU switches to another (Topics 1 and 3). The sentence itself is the opening of the textbook's CPU Scheduling chapter.`, ow: [`Multiprocessor systems are about having several CPUs; scheduling was needed first for sharing one CPU among many jobs (Topic 3).`, null, `"None" is wrong because multiprogramming is correct (Topic 3).`, `More memory has nothing to do with choosing which process gets the CPU (Topic 3).`] },
          { type: `mcq`, q: `The amount of time to execute a particular process`, o: [`Response Time`, `Turnaround Time`, `Waiting Time`, `all of the mentioned`], a: 1, why: `Topic 3 scheduling criteria: turnaround time is the "amount of time to execute a particular process", from submission to completion. TAT = Completion time − Arrival time; minimize it.`, ow: [`Response time runs from the request to the FIRST response, not to completion (Topic 3).`, null, `Waiting time is only the time spent in the ready queue = turnaround − burst (Topic 3).`, `Each criterion has its own definition; only turnaround time matches this one (Topic 3).`] },
          { type: `mcq`, q: `The most common secondary storage device is ____.`, o: [`tape drives`, `solid state disks`, `random access memory`, `magnetic disk`], a: 3, why: `The hard (magnetic) disk is the most common secondary storage: an extension of main memory with large nonvolatile capacity (Topic 1). The same question is in the 2025/26 final.`, ow: [`Tape is slow, sequential-access storage used for backups and archives (Topic 1).`, `SSDs are faster and becoming more popular, but the course's answer is the magnetic disk (Topic 1).`, `RAM is main (primary) memory and volatile, not secondary storage (Topic 1).`, null] },
          { type: `mcq`, q: `A solution to the problem of indefinite blockage of low – priority processes is ____________`, o: [`Starvation`, `Wait queue`, `Ready queue`, `Aging`], a: 3, why: `Topic 3 priority scheduling: low-priority processes may never execute (starvation). The solution is aging: gradually increase the priority of processes that wait a long time.`, ow: [`Starvation is the problem itself, not the solution (Topic 3).`, `A wait queue holds processes waiting for an event or I/O; it does not raise priority (Topic 2).`, `Low-priority processes starve IN the ready queue, so it cannot be the fix (Topic 3).`, null] },
          { type: `mcq`, q: `The FCFS algorithm is particularly troublesome for ____________`, o: [`multiprocessor systems`, `time sharing systems`, `operating systems`, `multiprogramming systems`], a: 1, why: `FCFS is non-preemptive (Topic 3), while time-sharing must switch the CPU among users so often that each can interact (Topic 1). One long process would hold the CPU and leave everyone without a response. The wording "particularly troublesome" is the textbook's.`, ow: [`The number of CPUs is not what makes non-preemption a problem (Topic 3).`, null, `Too general: FCFS is itself a method operating systems use (Topic 3).`, `Weaker fit: batch multiprogramming only needs the CPU busy, with no users waiting for quick responses (Topic 1).`] },
          { type: `mcq`, q: `The Windows CreateProcess() system call creates a new process. What is the equivalent system call in UNIX:`, o: [`process()`, `fork()`, `NTCreateProcess()`, `getpid()`], a: 1, why: `Topic 2 process creation: in UNIX fork() creates a new process (a copy of the parent), and exec() is used after it to load a new program; CreateProcess() is the Windows call.`, ow: [`process() is not a UNIX system call (Topic 2).`, null, `NTCreateProcess() is a Windows NT function, not UNIX.`, `getpid() only returns the ID of the current process; it creates nothing.`] },
          { type: `mcq`, q: `What is FIFO algorithm?`, o: [`first executes the job that needs minimal processor`, `first executes the job that came in last in the queue`, `first executes the job that has maximum processor needs`, `first executes the job that came in first in the queue`], a: 3, why: `FIFO (First In, First Out) is another name for FCFS: the ready queue is served in arrival order, so the job at the front runs first (Topic 3).`, ow: [`Minimal processor need first is SJF (Topic 3).`, `Last in the queue first is LIFO, the opposite of FIFO.`, `Maximum need first is longest-job-first; FIFO looks at arrival order, not CPU need.`, null] },
          { type: `mcq`, q: `The two separate modes of operating in a system are`, o: [`supervisor mode and system mode`, `kernel mode and privileged mode`, `physical mode and logical mode`, `user mode and kernel mode`], a: 3, why: `Topic 1 dual-mode operation lets the OS protect itself and other components: user mode and kernel mode, told apart by a hardware mode bit. Privileged instructions run only in kernel mode.`, ow: [`Both are other names for kernel mode (a standard textbook fact), so this names one mode twice.`, `Privileged mode also means kernel mode, and user mode is missing.`, `These are not CPU modes; physical and logical are terms used for addresses and files (Topics 1, 4).`, null] },
          { type: `mcq`, q: `The one program running at all times on the computer:`, o: [`System calls`, `Kernel`, `Device drivers`, `none of the mentioned`], a: 1, why: `Topic 1: the kernel is "the one program running at all times on the computer"; everything else is either a system program or an application program.`, ow: [`System calls are requests for OS services, not a program that keeps running (Topic 1).`, null, `Device drivers manage specific devices and run when the kernel needs them (Topics 1, 8).`, `"None" is wrong because the kernel is correct (Topic 1).`] },
          { type: `mcq`, q: `Round robin scheduling falls under the category of ____________`, o: [`Preemptive scheduling`, `Non-preemptive scheduling`, `None of the mentioned`, `All of the mentioned`], a: 0, why: `Topic 3: each process gets a time quantum; when it expires the process is preempted and added to the end of the ready queue, even if unfinished. That makes RR preemptive.`, ow: [null, `Non-preemptive means keeping the CPU until finishing or waiting, as in FCFS; RR does not allow that (Topic 3).`, `"None" is wrong because preemptive is correct (Topic 3).`, `An algorithm cannot be both preemptive and non-preemptive (Topic 3).`] },
          { type: `mcq`, q: `The _________ refers to the number of processes in memory.`, o: [`process count`, `long-term scheduler`, `CPU scheduler`, `degree of multiprogramming`], a: 3, why: `Topic 2: the degree of multiprogramming is the number of processes in memory. The long-term scheduler controls it, and the medium-term scheduler can reduce it by swapping.`, ow: [`Sounds right, but it is not the course's term (Topic 2).`, `The trap: it CONTROLS the degree of multiprogramming, but it is not the number itself (Topic 2).`, `The CPU (short-term) scheduler picks which ready process runs next (Topic 2).`, null] },
          { type: `mcq`, q: `What are some other terms for kernel mode?`, o: [`privileged mode`, `supervisor mode`, `system mode`, `all of the mentioned`], a: 3, key: `Confirmed by the doctor. The lecture only says "kernel mode"; these other names are from the standard textbook.`, why: `Kernel mode (Topic 1, dual-mode operation) is also called privileged mode, supervisor mode and system mode, so all three options are correct (the other names are from the standard textbook).`, ow: [`Correct on its own, but so are the other two, so "all of the mentioned" is the full answer.`, `Correct on its own, but so are the other two, so "all of the mentioned" is the full answer.`, `Correct on its own, but so are the other two, so "all of the mentioned" is the full answer.`, null] },
          { type: `mcq`, q: `Which of the following algorithms tends to minimize the process flow time?`, o: [`Earliest Deadline First`, `First come First served`, `Shortest Job First`, `Longest Job First`], a: 2, why: `Flow time is another name for turnaround time. SJF is optimal: it gives the minimum average waiting time for a given set of processes, so short jobs do not wait behind long ones and average turnaround is also lowest (Topic 3).`, ow: [`Earliest Deadline First is a real-time method that aims to meet deadlines, not to minimize flow time.`, `FCFS ignores job length, so a long job at the front makes short jobs wait (convoy effect, Topic 3).`, null, `Longest first makes every short job wait as long as possible: the worst choice for this.`] },
          { type: `mcq`, q: `18. A process control block ____.`, o: [`stores the address of the next instruction to be processed by a different process`, `is an example of a process queue`, `determines which process is to be executed next`, `includes information on the process's state`], a: 3, why: `Topic 2: the PCB holds what the OS needs to know about one process: process state, process number, program counter, CPU registers, scheduling information, memory limits and open files.`, ow: [`Close but wrong: the PCB stores the program counter of its OWN process, not of a different one (Topic 2).`, `A PCB describes one process; queues such as the ready queue link PCBs together (Topic 2).`, `Choosing the next process is the CPU (short-term) scheduler's job; the PCB is only data (Topic 2).`, null] },
          { type: `mcq`, q: `________ provide(s) an interface to the services provided by an operating system.`, o: [`System calls`, `Shared memory`, `Simulators`, `Communication`], a: 0, why: `A system call is a user request for an OS service: it traps into kernel mode (Topic 1). "Interface to the services" is the standard textbook's definition of system calls.`, ow: [null, `Shared memory is one of the two interprocess-communication methods, used to exchange data between processes (Topic 2).`, `Simulators imitate a system; they are not how programs request OS services.`, `Communication is one of the SERVICES the OS provides, not the interface used to reach them.`] },
          { type: `mcq`, q: `Which of the following operating systems is not open source?`, o: [`BSD UNIX`, `Linux`, `Windows`, `PCLinuxOS`], a: 2, why: `Windows is proprietary, closed-source software: Microsoft does not publish its source code for anyone to use or modify. (General knowledge; the lectures do not list open-source systems.)`, ow: [`BSD UNIX is distributed under the open-source BSD license.`, `Linux is open source under the GNU GPL.`, null, `PCLinuxOS is a Linux distribution, so it is open source too.`] },
          { type: `mcq`, q: `_______ operating systems are designed primarily to maximize resource utilization.`, o: [`Handheld computer`, `Network`, `PC`, `Mainframe`], a: 3, why: `Topic 1 (point of view): a shared computer such as a mainframe must keep all its users happy, so its OS focuses on using the CPU, memory and I/O efficiently and fairly.`, ow: [`Handhelds are resource-poor and optimized for usability and battery life (Topic 1).`, `Network operating systems focus on sharing files and communication between machines.`, `PC users want convenience and ease of use and do not care about resource utilization (Topic 1).`, null] },
          { type: `mcq`, q: `The list of processes waiting for a particular I/O device is called aNo ______________.`, o: [`ready queue`, `interrupt queue`, `standby queue`, `waiting queue`], a: 3, key: `Confirmed by the doctor. The lecture's exact term is "device queue", which is not among the options; "waiting queue" is the option with the same meaning.`, why: `Topic 2 calls this a device queue: the set of processes waiting for an I/O device. That term is not offered; waiting queue has the same meaning, since these processes are in the waiting state.`, ow: [`The ready queue holds processes waiting for the CPU, not for an I/O device (Topic 2).`, `Not one of the lecture's queues, which are the job, ready and device queues (Topic 2).`, `Not one of the lecture's queues either (Topic 2).`, null] },
          { type: `mcq`, q: `In real time operating system is__________`, o: [`all processes have the same priority`, `process scheduling can be done only once task`, `must be serviced by its deadline period`, `kernel is not required`], a: 2, key: `Confirmed by the doctor. The notes barely cover real-time systems; answered from the standard definition.`, why: `The defining rule of a real-time OS: each task has a time limit and must be serviced by its deadline. A late result counts as a failure, even if it is correct.`, ow: [`The opposite: real-time systems rely on priorities so urgent tasks run first (Topic 3, real-time processes have the highest priority).`, `Badly worded and not a property of real-time systems; scheduling happens continually as tasks arrive.`, null, `A real-time OS still has a kernel, which schedules tasks and handles interrupts.`] },
          { type: `mcq`, q: `When the System processes data instructions without any delay is called as`, o: [`online system`, `real-time system`, `instruction system`, `offline system`], a: 1, why: `A real-time system processes data as it arrives, without delay, so results are ready within strict time limits, e.g. air-bag controllers and flight control. (Standard definition; the notes barely cover real-time systems.)`, ow: [`Online just means connected to a computer or network; it does not guarantee no delay.`, null, `Not a standard type of system; a distractor built from the question's word "instructions".`, `The opposite: data is stored first and processed later, as in batch processing.`] },
          { type: `mcq`, q: `Which of the following is Preemptive, priority-based scheduling guarantees?`, o: [`hard real-time functionality`, `soft real-time functionality`, `all of the mentioned`, `protection of memory`], a: 1, key: `Confirmed by the doctor. Not in the lectures; it comes from the standard textbook, Silberschatz.`, why: `The standard textbook says a preemptive, priority-based scheduler only guarantees soft real-time functionality: the most urgent process gets the CPU first, but the scheduler alone does not promise that deadlines are met.`, ow: [`Hard real-time requires every task to finish by its deadline, which needs features beyond priorities and preemption (Silberschatz).`, null, `Hard real-time and memory protection are not guaranteed, so not all.`, `Memory protection is done by hardware such as base and limit registers (Topic 4), not CPU scheduling.`] },
          { type: `mcq`, q: `The strategy of making processes that are logically runnable to be temporarily suspended is called ____________`, o: [`Non preemptive scheduling`, `Preemptive scheduling`, `Shortest job first`, `First come First served`], a: 1, why: `Topic 3: in preemptive scheduling the CPU can be taken from a running process even though it could keep running; it goes back to ready and continues later.`, ow: [`The opposite: a process keeps the CPU until it finishes or switches to waiting by itself (Topic 3).`, null, `SJF is a specific algorithm that picks by burst length; its basic form is non-preemptive (Topic 3).`, `FCFS is a specific non-preemptive algorithm; the scheduler never suspends a running process (Topic 3).`] },
          { type: `mcq`, q: `With round robin scheduling algorithm in a time shared system ____________`, o: [`using very small time slices converts it into First come First served scheduling algorithm`, `using very small time slices converts it into Shortest Job First algorithm`, `using extremely small time slices increases performance`, `using very large time slices converts it into First come First served scheduling algorithm`], a: 3, why: `Topic 3: q large → behaves like FIFO/FCFS, because every process finishes within one slice and is never preempted. q small → too many context switches.`, ow: [`Backwards: small slices cause constant switching; it is large slices that give FCFS (Topic 3).`, `RR never looks at burst length, so it does not become SJF (Topic 3).`, `Context-switch overhead takes more and more CPU time, so performance gets worse (Topic 3).`, null] },
          { type: `mcq`, q: `What is a medium-term scheduler?`, o: [`It selects which process has to be brought into the ready queue`, `None of the mentioned`, `It selects which process to remove from memory by swapping`, `It selects which process has to be executed next and allocates CPU`], a: 2, why: `Topic 2: the medium-term scheduler can be added when the degree of multiprogramming must decrease: it removes a process from memory, stores it on disk and brings it back later (swapping).`, ow: [`That is the long-term (job) scheduler (Topic 2).`, `"None" is wrong because (c) is correct (Topic 2).`, null, `That is the short-term (CPU) scheduler (Topic 2).`] },
          { type: `mcq`, q: `Which of the following memories has more speed in accessing data and volatile?`, o: [`EEPROM`, `SRAM`, `DRAM`, `EPROM`], a: 1, why: `SRAM (static RAM) is volatile and the fastest of the four, which is why it is used for cache memory (Topic 1, storage hierarchy).`, ow: [`EEPROM is nonvolatile read-only memory and much slower to write.`, null, `DRAM is volatile too, but slower than SRAM because its cells must be refreshed; it is used for main memory.`, `EPROM is nonvolatile read-only memory, used for firmware such as the bootstrap, and far slower than SRAM (Topic 1).`] },
          { type: `mcq`, q: `Which is the most basic non-volatile memory?`, o: [`Flash memory`, `PROM`, `ROM`, `EPROM`], a: 2, why: `ROM (read-only memory) is the simplest non-volatile memory: its contents are fixed when it is made. The other three add the ability to program or erase. (General knowledge; Topic 1 only mentions ROM and EPROM as where the bootstrap is stored.)`, ow: [`Flash is the most advanced of the group: erased and rewritten electrically in blocks.`, `PROM is a ROM you can program once after manufacture, a step on top of basic ROM.`, null, `EPROM can be erased with ultraviolet light and reprogrammed, a further step again.`] },
          { type: `mcq`, q: `What is an operating system?`, o: [`interface between the hardware and application programs`, `system service provider to the application programs`, `collection of programs that manages hardware resources`, `all of the mentioned`], a: 3, why: `Topic 1 describes the OS by its roles: an intermediary between the user and the hardware, a provider of services to programs, and a resource allocator and control program. All three options are correct.`, ow: [`Correct on its own (intermediary), but the other two are also roles of the OS (Topic 1).`, `Correct on its own, but the other two are also roles of the OS (Topic 1).`, `Correct on its own (resource allocator), but the other two are also roles of the OS (Topic 1).`, null] },
          { type: `mcq`, q: `ANo ________ is the unit of work in a system.`, o: [`process`, `operating system`, `mode bit`, `timer`], a: 0, why: `Topic 1: a process is a program in execution, a unit of work within the system. It needs resources such as CPU, memory, I/O and files to do its task.`, ow: [null, `The operating system manages processes; it is not itself the unit of work (Topic 1).`, `The mode bit tells the CPU whether it is in user or kernel mode (Topic 1).`, `The timer interrupts the CPU after a set period so no program keeps it forever (Topic 1).`] },
          { type: `mcq`, q: `What is ‘Aging’?`, o: [`keeping track of cache contents`, `increasing the priority of jobs to ensure termination in a finite time`, `keeping track of what pages are currently residing in memory`, `keeping track of how many times a given page is referenced`], a: 1, why: `Topic 3: aging is the solution to starvation in priority scheduling: the priority of a waiting process is gradually increased, so it eventually runs and finishes.`, ow: [`Tracking cache contents is the cache hardware's job; it has nothing to do with priority.`, null, `That is what the page table does, using valid-invalid bits (Topics 4, 5).`, `That is reference counting, as in page-replacement algorithms (Topic 5), not aging as a scheduling technique.`] },
          { type: `mcq`, q: `Embedded computers typically run on a ____ operating system.`, o: [`Windows XP`, `network`, `clustered`, `real-time`], a: 3, why: `Embedded computers are built into devices and automobiles (Topic 1) and must respond to events within fixed time limits, so they typically run a real-time OS (standard textbook).`, ow: [`Windows XP is a general-purpose desktop OS, too large for most embedded devices and with no deadline guarantees.`, `Network operating systems are for sharing files and communicating across machines.`, `Clustered systems link several computers for availability or high performance, the opposite end of the scale (Topic 1).`, null] },
          { type: `mcq`, q: `A _______ saves the state of the currently running process and restores the state of the next process to run.`, o: [`save-and-restore`, `state switch`, `context switch`, `none of the mentioned`], a: 2, why: `Topic 2: on a context switch the system saves the state of the old process and loads the saved state of the new one. The time it takes is pure overhead.`, ow: [`Describes what happens in plain words, but it is not the name of the operation (Topic 2).`, `Not the course's term; a process's "state" means running, waiting and so on (Topic 2).`, null, `"None" is wrong because context switch is correct (Topic 2).`] },
          { type: `mcq`, q: `What is the objective of multiprogramming?`, o: [`Have a process running at all time`, `Have multiple programs waiting in a queue ready to run`, `None of the mentioned`, `To increase CPU utilization`], a: 3, key: `Confirmed by the doctor. The textbook puts both ideas in one sentence: "to have some process running at all times, to maximize CPU utilization".`, why: `Maximum CPU utilization is obtained with multiprogramming (Topic 3): several jobs are kept in memory, so when one waits the CPU switches to another instead of sitting idle (Topic 1). Utilization is the goal; having a process running is how it is achieved.`, ow: [`True, but it is the method; it serves the goal of higher CPU utilization (Topics 1, 3).`, `That is only the setup multiprogramming uses, not its objective (Topic 1).`, `"None" is wrong because increasing CPU utilization fits (Topic 3).`, null] }
        ] },
        { title: `True or False`, marks: `6 questions`, items: [
          { type: `tf`, q: `Amount of time a process has been waiting in the ready queue is called waiting time.`, a: 0, why: `Topic 3's definition word for word: waiting time is the amount of time a process has been waiting in the ready queue (minimize it). Waiting time = turnaround − burst.`, ow: [null, `False is wrong: this is exactly the lecture's definition of waiting time (Topic 3).`] },
          { type: `tf`, q: `Solid state disks are considered volatile storage.`, a: 1, why: `SSDs use flash memory, which is nonvolatile: it keeps its contents without power. In the Topic 1 storage hierarchy the volatile levels are registers, cache and main memory.`, ow: [`True is wrong: an SSD keeps its data when the power is off (Topic 1).`, null] },
          { type: `tf`, q: `There is no universally accepted definition of an operating system.`, a: 0, why: `Topic 1 says there is no universally accepted definition; "everything a vendor ships when you order an OS" is a good approximation, but it varies wildly.`, ow: [null, `False is wrong: the lecture states this directly (Topic 1).`] },
          { type: `tf`, q: `The exec() system call creates a new process.`, a: 1, why: `Topic 2: fork() creates a new process; exec(), used after fork(), replaces the process's memory space with a new program, and no new process is created.`, ow: [`True is wrong: exec() replaces the program inside the existing process; fork() is what creates one (Topic 2).`, null] },
          { type: `tf`, q: `Application programmers typically use an API rather than directory invoking system calls.`, a: 0, key: `Confirmed by the doctor. Not in the lectures; it comes from the standard textbook, Silberschatz. "directory" is a typo for "directly".`, why: `Programs typically reach system calls through a high-level API (Win32, POSIX, Java API) rather than directly: it is easier to use and more portable (standard textbook; the lectures do not mention APIs).`, ow: [null, `False is wrong: programmers normally call an API, and the API makes the system calls (Silberschatz).`] },
          { type: `tf`, q: `The operating system kernel consists of all system and application programs in a computer.`, a: 1, why: `Topic 1: the kernel is the one program running at all times; everything else is either a system program or an application program, so those are separate from the kernel.`, ow: [`True is wrong: system and application programs are the "everything else", not part of the kernel (Topic 1).`, null] }
        ] }
      ]
    }
  ],
  quiz: {
    1: [
      { q: ` A boot block ____.`, o: [
        [`typically only knows the location and length of the rest of the bootstrap program`, `Correct. A boot block is a single disk block at a fixed location, so its code must be small: it typically only knows where the rest of the bootstrap program is on disk and how long it is (Silberschatz).`],
        [`typically is sophisticated enough to load the operating system and begin its execution`, `Possible on some systems, but not typical: one block is too small, and the question says "typically" (Silberschatz).`],
        [`is composed of multiple disk blocks`, `It is a single block; that size limit is why its code is so simple (Silberschatz).`],
        [`is composed of multiple disk cylinders`, `It is a single block, and a cylinder is far larger than a block (Silberschatz).`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `The most common secondary storage device is ____.`, o: [
        [`tape drives`, `Tape is slow, sequential-access storage used for backups and archives (Topic 1).`],
        [`solid state disks`, `SSDs are faster and becoming more popular, but the course's answer is the magnetic disk (Topic 1).`],
        [`random access memory`, `RAM is main (primary) memory and volatile, not secondary storage (Topic 1).`],
        [`magnetic disk`, `Correct. The hard (magnetic) disk is the most common secondary storage: an extension of main memory with large nonvolatile capacity (Topic 1). The same question is in the 2025/26 final.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `The two separate modes of operating in a system are`, o: [
        [`supervisor mode and system mode`, `Both are other names for kernel mode (a standard textbook fact), so this names one mode twice.`],
        [`kernel mode and privileged mode`, `Privileged mode also means kernel mode, and user mode is missing.`],
        [`physical mode and logical mode`, `These are not CPU modes; physical and logical are terms used for addresses and files (Topics 1, 4).`],
        [`user mode and kernel mode`, `Correct. Topic 1 dual-mode operation lets the OS protect itself and other components: user mode and kernel mode, told apart by a hardware mode bit. Privileged instructions run only in kernel mode.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `The one program running at all times on the computer:`, o: [
        [`System calls`, `System calls are requests for OS services, not a program that keeps running (Topic 1).`],
        [`Kernel`, `Correct. Topic 1: the kernel is "the one program running at all times on the computer"; everything else is either a system program or an application program.`],
        [`Device drivers`, `Device drivers manage specific devices and run when the kernel needs them (Topics 1, 8).`],
        [`none of the mentioned`, `"None" is wrong because the kernel is correct (Topic 1).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `What are some other terms for kernel mode?`, o: [
        [`privileged mode`, `Correct on its own, but so are the other two, so "all of the mentioned" is the full answer.`],
        [`supervisor mode`, `Correct on its own, but so are the other two, so "all of the mentioned" is the full answer.`],
        [`system mode`, `Correct on its own, but so are the other two, so "all of the mentioned" is the full answer.`],
        [`all of the mentioned`, `Correct. Kernel mode (Topic 1, dual-mode operation) is also called privileged mode, supervisor mode and system mode, so all three options are correct (the other names are from the standard textbook).`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `________ provide(s) an interface to the services provided by an operating system.`, o: [
        [`System calls`, `Correct. A system call is a user request for an OS service: it traps into kernel mode (Topic 1). "Interface to the services" is the standard textbook's definition of system calls.`],
        [`Shared memory`, `Shared memory is one of the two interprocess-communication methods, used to exchange data between processes (Topic 2).`],
        [`Simulators`, `Simulators imitate a system; they are not how programs request OS services.`],
        [`Communication`, `Communication is one of the SERVICES the OS provides, not the interface used to reach them.`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `"Solid state disks are considered volatile storage."`, o: [
        [`True`, `True is wrong: an SSD keeps its data when the power is off (Topic 1).`],
        [`False`, `Correct. SSDs use flash memory, which is nonvolatile: it keeps its contents without power. In the Topic 1 storage hierarchy the volatile levels are registers, cache and main memory.`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `Which of the following operating systems is not open source?`, o: [
        [`BSD UNIX`, `BSD UNIX is distributed under the open-source BSD license.`],
        [`Linux`, `Linux is open source under the GNU GPL.`],
        [`Windows`, `Correct. Windows is proprietary, closed-source software: Microsoft does not publish its source code for anyone to use or modify. (General knowledge; the lectures do not list open-source systems.)`],
        [`PCLinuxOS`, `PCLinuxOS is a Linux distribution, so it is open source too.`]
      ], a: 2, src: `Midterm 2026/27` },
      { q: `_______ operating systems are designed primarily to maximize resource utilization.`, o: [
        [`Handheld computer`, `Handhelds are resource-poor and optimized for usability and battery life (Topic 1).`],
        [`Network`, `Network operating systems focus on sharing files and communication between machines.`],
        [`PC`, `PC users want convenience and ease of use and do not care about resource utilization (Topic 1).`],
        [`Mainframe`, `Correct. Topic 1 (point of view): a shared computer such as a mainframe must keep all its users happy, so its OS focuses on using the CPU, memory and I/O efficiently and fairly.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `"There is no universally accepted definition of an operating system."`, o: [
        [`True`, `Correct. Topic 1 says there is no universally accepted definition; "everything a vendor ships when you order an OS" is a good approximation, but it varies wildly.`],
        [`False`, `False is wrong: the lecture states this directly (Topic 1).`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `In real time operating system is__________`, o: [
        [`all processes have the same priority`, `The opposite: real-time systems rely on priorities so urgent tasks run first (Topic 3, real-time processes have the highest priority).`],
        [`process scheduling can be done only once task`, `Badly worded and not a property of real-time systems; scheduling happens continually as tasks arrive.`],
        [`must be serviced by its deadline period`, `Correct. The defining rule of a real-time OS: each task has a time limit and must be serviced by its deadline. A late result counts as a failure, even if it is correct.`],
        [`kernel is not required`, `A real-time OS still has a kernel, which schedules tasks and handles interrupts.`]
      ], a: 2, src: `Midterm 2026/27` },
      { q: `When the System processes data instructions without any delay is called as`, o: [
        [`online system`, `Online just means connected to a computer or network; it does not guarantee no delay.`],
        [`real-time system`, `Correct. A real-time system processes data as it arrives, without delay, so results are ready within strict time limits, e.g. air-bag controllers and flight control. (Standard definition; the notes barely cover real-time systems.)`],
        [`instruction system`, `Not a standard type of system; a distractor built from the question's word "instructions".`],
        [`offline system`, `The opposite: data is stored first and processed later, as in batch processing.`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `Which of the following memories has more speed in accessing data and volatile?`, o: [
        [`EEPROM`, `EEPROM is nonvolatile read-only memory and much slower to write.`],
        [`SRAM`, `Correct. SRAM (static RAM) is volatile and the fastest of the four, which is why it is used for cache memory (Topic 1, storage hierarchy).`],
        [`DRAM`, `DRAM is volatile too, but slower than SRAM because its cells must be refreshed; it is used for main memory.`],
        [`EPROM`, `EPROM is nonvolatile read-only memory, used for firmware such as the bootstrap, and far slower than SRAM (Topic 1).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `Which is the most basic non-volatile memory?`, o: [
        [`Flash memory`, `Flash is the most advanced of the group: erased and rewritten electrically in blocks.`],
        [`PROM`, `PROM is a ROM you can program once after manufacture, a step on top of basic ROM.`],
        [`ROM`, `Correct. ROM (read-only memory) is the simplest non-volatile memory: its contents are fixed when it is made. The other three add the ability to program or erase. (General knowledge; Topic 1 only mentions ROM and EPROM as where the bootstrap is stored.)`],
        [`EPROM`, `EPROM can be erased with ultraviolet light and reprogrammed, a further step again.`]
      ], a: 2, src: `Midterm 2026/27` },
      { q: `What is an operating system?`, o: [
        [`interface between the hardware and application programs`, `Correct on its own (intermediary), but the other two are also roles of the OS (Topic 1).`],
        [`system service provider to the application programs`, `Correct on its own, but the other two are also roles of the OS (Topic 1).`],
        [`collection of programs that manages hardware resources`, `Correct on its own (resource allocator), but the other two are also roles of the OS (Topic 1).`],
        [`all of the mentioned`, `Correct. Topic 1 describes the OS by its roles: an intermediary between the user and the hardware, a provider of services to programs, and a resource allocator and control program. All three options are correct.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `"Application programmers typically use an API rather than directory invoking system calls."`, o: [
        [`True`, `Correct. Programs typically reach system calls through a high-level API (Win32, POSIX, Java API) rather than directly: it is easier to use and more portable (standard textbook; the lectures do not mention APIs).`],
        [`False`, `False is wrong: programmers normally call an API, and the API makes the system calls (Silberschatz).`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `ANo ________ is the unit of work in a system.`, o: [
        [`process`, `Correct. Topic 1: a process is a program in execution, a unit of work within the system. It needs resources such as CPU, memory, I/O and files to do its task.`],
        [`operating system`, `The operating system manages processes; it is not itself the unit of work (Topic 1).`],
        [`mode bit`, `The mode bit tells the CPU whether it is in user or kernel mode (Topic 1).`],
        [`timer`, `The timer interrupts the CPU after a set period so no program keeps it forever (Topic 1).`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `Embedded computers typically run on a ____ operating system.`, o: [
        [`Windows XP`, `Windows XP is a general-purpose desktop OS, too large for most embedded devices and with no deadline guarantees.`],
        [`network`, `Network operating systems are for sharing files and communicating across machines.`],
        [`clustered`, `Clustered systems link several computers for availability or high performance, the opposite end of the scale (Topic 1).`],
        [`real-time`, `Correct. Embedded computers are built into devices and automobiles (Topic 1) and must respond to events within fixed time limits, so they typically run a real-time OS (standard textbook).`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `"The operating system kernel consists of all system and application programs in a computer."`, o: [
        [`True`, `True is wrong: system and application programs are the "everything else", not part of the kernel (Topic 1).`],
        [`False`, `Correct. Topic 1: the kernel is the one program running at all times; everything else is either a system program or an application program, so those are separate from the kernel.`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `What is the objective of multiprogramming?`, o: [
        [`Have a process running at all time`, `True, but it is the method; it serves the goal of higher CPU utilization (Topics 1, 3).`],
        [`Have multiple programs waiting in a queue ready to run`, `That is only the setup multiprogramming uses, not its objective (Topic 1).`],
        [`None of the mentioned`, `"None" is wrong because increasing CPU utilization fits (Topic 3).`],
        [`To increase CPU utilization`, `Correct. Maximum CPU utilization is obtained with multiprogramming (Topic 3): several jobs are kept in memory, so when one waits the CPU switches to another instead of sitting idle (Topic 1). Utilization is the goal; having a process running is how it is achieved.`]
      ], a: 3, src: `Midterm 2026/27` }
    ],
    2: [
      { q: `The value of the current address of the process is called.`, o: [
        [`stack section`, `The stack holds temporary data: function parameters, return addresses and local variables (Topic 2).`],
        [`Program counter`, `Correct. The program counter marks where the process is in its code: the location of the next instruction to execute. It is stored in the PCB so the process can resume after a context switch (Topic 2, PCB).`],
        [`heap`, `The heap is memory allocated dynamically at run time (new, malloc) (Topic 2).`],
        [`data section`, `The data section holds global and static variables (Topic 2).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `The Windows CreateProcess() system call creates a new process. What is the equivalent system call in UNIX:`, o: [
        [`process()`, `process() is not a UNIX system call (Topic 2).`],
        [`fork()`, `Correct. Topic 2 process creation: in UNIX fork() creates a new process (a copy of the parent), and exec() is used after it to load a new program; CreateProcess() is the Windows call.`],
        [`NTCreateProcess()`, `NTCreateProcess() is a Windows NT function, not UNIX.`],
        [`getpid()`, `getpid() only returns the ID of the current process; it creates nothing.`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `The _________ refers to the number of processes in memory.`, o: [
        [`process count`, `Sounds right, but it is not the course's term (Topic 2).`],
        [`long-term scheduler`, `The trap: it CONTROLS the degree of multiprogramming, but it is not the number itself (Topic 2).`],
        [`CPU scheduler`, `The CPU (short-term) scheduler picks which ready process runs next (Topic 2).`],
        [`degree of multiprogramming`, `Correct. Topic 2: the degree of multiprogramming is the number of processes in memory. The long-term scheduler controls it, and the medium-term scheduler can reduce it by swapping.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `18. A process control block ____.`, o: [
        [`stores the address of the next instruction to be processed by a different process`, `Close but wrong: the PCB stores the program counter of its OWN process, not of a different one (Topic 2).`],
        [`is an example of a process queue`, `A PCB describes one process; queues such as the ready queue link PCBs together (Topic 2).`],
        [`determines which process is to be executed next`, `Choosing the next process is the CPU (short-term) scheduler's job; the PCB is only data (Topic 2).`],
        [`includes information on the process's state`, `Correct. Topic 2: the PCB holds what the OS needs to know about one process: process state, process number, program counter, CPU registers, scheduling information, memory limits and open files.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `The list of processes waiting for a particular I/O device is called aNo ______________.`, o: [
        [`ready queue`, `The ready queue holds processes waiting for the CPU, not for an I/O device (Topic 2).`],
        [`interrupt queue`, `Not one of the lecture's queues, which are the job, ready and device queues (Topic 2).`],
        [`standby queue`, `Not one of the lecture's queues either (Topic 2).`],
        [`waiting queue`, `Correct. Topic 2 calls this a device queue: the set of processes waiting for an I/O device. That term is not offered; waiting queue has the same meaning, since these processes are in the waiting state.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `"The exec() system call creates a new process."`, o: [
        [`True`, `True is wrong: exec() replaces the program inside the existing process; fork() is what creates one (Topic 2).`],
        [`False`, `Correct. Topic 2: fork() creates a new process; exec(), used after fork(), replaces the process's memory space with a new program, and no new process is created.`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `What is a medium-term scheduler?`, o: [
        [`It selects which process has to be brought into the ready queue`, `That is the long-term (job) scheduler (Topic 2).`],
        [`None of the mentioned`, `"None" is wrong because (c) is correct (Topic 2).`],
        [`It selects which process to remove from memory by swapping`, `Correct. Topic 2: the medium-term scheduler can be added when the degree of multiprogramming must decrease: it removes a process from memory, stores it on disk and brings it back later (swapping).`],
        [`It selects which process has to be executed next and allocates CPU`, `That is the short-term (CPU) scheduler (Topic 2).`]
      ], a: 2, src: `Midterm 2026/27` },
      { q: `A _______ saves the state of the currently running process and restores the state of the next process to run.`, o: [
        [`save-and-restore`, `Describes what happens in plain words, but it is not the name of the operation (Topic 2).`],
        [`state switch`, `Not the course's term; a process's "state" means running, waiting and so on (Topic 2).`],
        [`context switch`, `Correct. Topic 2: on a context switch the system saves the state of the old process and loads the saved state of the new one. The time it takes is pure overhead.`],
        [`none of the mentioned`, `"None" is wrong because context switch is correct (Topic 2).`]
      ], a: 2, src: `Midterm 2026/27` }
    ],
    3: [
      { q: `CPU scheduling is the basis of ___________`, o: [
        [`multiprocessor systems`, `Multiprocessor systems are about having several CPUs; scheduling was needed first for sharing one CPU among many jobs (Topic 3).`],
        [`multiprogramming operating systems`, `Correct. CPU scheduling only matters when several processes in memory compete for the CPU, which is multiprogramming: when a job waits, the CPU switches to another (Topics 1 and 3). The sentence itself is the opening of the textbook's CPU Scheduling chapter.`],
        [`none of the mentioned`, `"None" is wrong because multiprogramming is correct (Topic 3).`],
        [`larger memory sized systems`, `More memory has nothing to do with choosing which process gets the CPU (Topic 3).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `The amount of time to execute a particular process`, o: [
        [`Response Time`, `Response time runs from the request to the FIRST response, not to completion (Topic 3).`],
        [`Turnaround Time`, `Correct. Topic 3 scheduling criteria: turnaround time is the "amount of time to execute a particular process", from submission to completion. TAT = Completion time − Arrival time; minimize it.`],
        [`Waiting Time`, `Waiting time is only the time spent in the ready queue = turnaround − burst (Topic 3).`],
        [`all of the mentioned`, `Each criterion has its own definition; only turnaround time matches this one (Topic 3).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `A solution to the problem of indefinite blockage of low – priority processes is ____________`, o: [
        [`Starvation`, `Starvation is the problem itself, not the solution (Topic 3).`],
        [`Wait queue`, `A wait queue holds processes waiting for an event or I/O; it does not raise priority (Topic 2).`],
        [`Ready queue`, `Low-priority processes starve IN the ready queue, so it cannot be the fix (Topic 3).`],
        [`Aging`, `Correct. Topic 3 priority scheduling: low-priority processes may never execute (starvation). The solution is aging: gradually increase the priority of processes that wait a long time.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `The FCFS algorithm is particularly troublesome for ____________`, o: [
        [`multiprocessor systems`, `The number of CPUs is not what makes non-preemption a problem (Topic 3).`],
        [`time sharing systems`, `Correct. FCFS is non-preemptive (Topic 3), while time-sharing must switch the CPU among users so often that each can interact (Topic 1). One long process would hold the CPU and leave everyone without a response. The wording "particularly troublesome" is the textbook's.`],
        [`operating systems`, `Too general: FCFS is itself a method operating systems use (Topic 3).`],
        [`multiprogramming systems`, `Weaker fit: batch multiprogramming only needs the CPU busy, with no users waiting for quick responses (Topic 1).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `What is FIFO algorithm?`, o: [
        [`first executes the job that needs minimal processor`, `Minimal processor need first is SJF (Topic 3).`],
        [`first executes the job that came in last in the queue`, `Last in the queue first is LIFO, the opposite of FIFO.`],
        [`first executes the job that has maximum processor needs`, `Maximum need first is longest-job-first; FIFO looks at arrival order, not CPU need.`],
        [`first executes the job that came in first in the queue`, `Correct. FIFO (First In, First Out) is another name for FCFS: the ready queue is served in arrival order, so the job at the front runs first (Topic 3).`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `"Amount of time a process has been waiting in the ready queue is called waiting time."`, o: [
        [`True`, `Correct. Topic 3's definition word for word: waiting time is the amount of time a process has been waiting in the ready queue (minimize it). Waiting time = turnaround − burst.`],
        [`False`, `False is wrong: this is exactly the lecture's definition of waiting time (Topic 3).`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `Round robin scheduling falls under the category of ____________`, o: [
        [`Preemptive scheduling`, `Correct. Topic 3: each process gets a time quantum; when it expires the process is preempted and added to the end of the ready queue, even if unfinished. That makes RR preemptive.`],
        [`Non-preemptive scheduling`, `Non-preemptive means keeping the CPU until finishing or waiting, as in FCFS; RR does not allow that (Topic 3).`],
        [`None of the mentioned`, `"None" is wrong because preemptive is correct (Topic 3).`],
        [`All of the mentioned`, `An algorithm cannot be both preemptive and non-preemptive (Topic 3).`]
      ], a: 0, src: `Midterm 2026/27` },
      { q: `Which of the following algorithms tends to minimize the process flow time?`, o: [
        [`Earliest Deadline First`, `Earliest Deadline First is a real-time method that aims to meet deadlines, not to minimize flow time.`],
        [`First come First served`, `FCFS ignores job length, so a long job at the front makes short jobs wait (convoy effect, Topic 3).`],
        [`Shortest Job First`, `Correct. Flow time is another name for turnaround time. SJF is optimal: it gives the minimum average waiting time for a given set of processes, so short jobs do not wait behind long ones and average turnaround is also lowest (Topic 3).`],
        [`Longest Job First`, `Longest first makes every short job wait as long as possible: the worst choice for this.`]
      ], a: 2, src: `Midterm 2026/27` },
      { q: `Which of the following is Preemptive, priority-based scheduling guarantees?`, o: [
        [`hard real-time functionality`, `Hard real-time requires every task to finish by its deadline, which needs features beyond priorities and preemption (Silberschatz).`],
        [`soft real-time functionality`, `Correct. The standard textbook says a preemptive, priority-based scheduler only guarantees soft real-time functionality: the most urgent process gets the CPU first, but the scheduler alone does not promise that deadlines are met.`],
        [`all of the mentioned`, `Hard real-time and memory protection are not guaranteed, so not all.`],
        [`protection of memory`, `Memory protection is done by hardware such as base and limit registers (Topic 4), not CPU scheduling.`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `The strategy of making processes that are logically runnable to be temporarily suspended is called ____________`, o: [
        [`Non preemptive scheduling`, `The opposite: a process keeps the CPU until it finishes or switches to waiting by itself (Topic 3).`],
        [`Preemptive scheduling`, `Correct. Topic 3: in preemptive scheduling the CPU can be taken from a running process even though it could keep running; it goes back to ready and continues later.`],
        [`Shortest job first`, `SJF is a specific algorithm that picks by burst length; its basic form is non-preemptive (Topic 3).`],
        [`First come First served`, `FCFS is a specific non-preemptive algorithm; the scheduler never suspends a running process (Topic 3).`]
      ], a: 1, src: `Midterm 2026/27` },
      { q: `With round robin scheduling algorithm in a time shared system ____________`, o: [
        [`using very small time slices converts it into First come First served scheduling algorithm`, `Backwards: small slices cause constant switching; it is large slices that give FCFS (Topic 3).`],
        [`using very small time slices converts it into Shortest Job First algorithm`, `RR never looks at burst length, so it does not become SJF (Topic 3).`],
        [`using extremely small time slices increases performance`, `Context-switch overhead takes more and more CPU time, so performance gets worse (Topic 3).`],
        [`using very large time slices converts it into First come First served scheduling algorithm`, `Correct. Topic 3: q large → behaves like FIFO/FCFS, because every process finishes within one slice and is never preempted. q small → too many context switches.`]
      ], a: 3, src: `Midterm 2026/27` },
      { q: `What is ‘Aging’?`, o: [
        [`keeping track of cache contents`, `Tracking cache contents is the cache hardware's job; it has nothing to do with priority.`],
        [`increasing the priority of jobs to ensure termination in a finite time`, `Correct. Topic 3: aging is the solution to starvation in priority scheduling: the priority of a waiting process is gradually increased, so it eventually runs and finishes.`],
        [`keeping track of what pages are currently residing in memory`, `That is what the page table does, using valid-invalid bits (Topics 4, 5).`],
        [`keeping track of how many times a given page is referenced`, `That is reference counting, as in page-replacement algorithms (Topic 5), not aging as a scheduling technique.`]
      ], a: 1, src: `Midterm 2026/27` }
    ]
  }
};
