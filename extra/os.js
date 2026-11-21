// Practice questions written for Study Deck (not the professor's), per lecture.
window.EXTRA = window.EXTRA || {};
EXTRA.os = {
 "1": [
  {
   "q": "A user program running in user mode makes a system call, the OS services it, and control returns to the program. What sequence of mode-bit values does the hardware go through?",
   "o": [
    [
     "0 → 1 → 0",
     "Reversed: in the lecture kernel mode = 0 and user mode = 1, and the program starts in user mode."
    ],
    [
     "1 → 0 → 1",
     "Correct. User mode (1), the system call traps into kernel mode (0), and returning from the call resets the bit to user mode (1)."
    ],
    [
     "1 → 1 → 1",
     "The system call must switch to kernel mode, otherwise privileged instructions could not be executed for the service."
    ],
    [
     "0 → 0 → 0",
     "User programs do not run with the kernel-mode bit; that would defeat dual-mode protection."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"The timer that stops a process from hogging the CPU is loaded by the user program with an ordinary (non-privileged) instruction.\"",
   "o": [
    [
     "True",
     "If user code could set the timer, a process could keep the CPU forever, which is exactly what the timer prevents."
    ],
    [
     "False",
     "Correct. The OS sets the timer before scheduling a process, and loading it is a privileged instruction; when the counter reaches zero an interrupt returns control to the OS."
    ]
   ],
   "a": 1
  },
  {
   "q": "With <b>asynchronous I/O</b>, control returns to the user program without waiting. Which structure does the OS index to find a device's state and update its entry?",
   "o": [
    [
     "The interrupt vector",
     "The interrupt vector holds the addresses of the interrupt service routines, not the status of each device."
    ],
    [
     "The page table",
     "The page table maps pages to frames; it has nothing to do with device status."
    ],
    [
     "The device-status table",
     "Correct. It holds one entry per device (type, address, state), and the OS indexes it to find and modify a device's status."
    ],
    [
     "The device controller's local buffer",
     "The local buffer holds the data being transferred, not the bookkeeping about each device's state."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which list orders the storage hierarchy correctly from <b>fastest/smallest</b> to <b>slowest/largest</b>?",
   "o": [
    [
     "Cache → registers → main memory → hard disk → solid-state disk → magnetic tape",
     "Registers are faster than cache, and solid-state disks sit above (are faster than) hard disks."
    ],
    [
     "Registers → main memory → cache → solid-state disk → hard disk → optical disk",
     "Cache must come before main memory: it sits between the registers and main memory."
    ],
    [
     "Registers → cache → main memory → hard disk → solid-state disk → magnetic tape",
     "Solid-state disks are faster than hard disks, so SSD comes before the hard disk."
    ],
    [
     "Registers → cache → main memory → solid-state disk → hard disk → optical disk → magnetic tape",
     "Correct. This is the lecture's hierarchy, organized by speed, cost and volatility."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the I/O subsystem, <b>spooling</b> means:",
   "o": [
    [
     "Overlapping the output of one job with the input of other jobs",
     "Correct. That is the lecture's definition of spooling."
    ],
    [
     "Storing data temporarily while it is being transferred",
     "That is buffering, another I/O-subsystem duty."
    ],
    [
     "Storing parts of data in faster storage for performance",
     "Storing parts of data in faster storage for performance is the lecture's definition of caching, a different I/O-subsystem duty from spooling."
    ],
    [
     "Transferring a whole block from the controller to memory without the CPU",
     "Moving a whole block from the controller's buffer to main memory without the CPU is DMA (Direct Memory Access), not spooling."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Defending the system against a denial-of-service attack or a virus is an example of <b>protection</b>, as the lecture defines it.\"",
   "o": [
    [
     "True",
     "Protection is the mechanism for controlling access of processes or users to OS-defined resources; defending against attacks is security."
    ],
    [
     "False",
     "Correct. Security is defence against internal and external attacks (denial-of-service, viruses, identity theft, theft of service); protection is access control."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Using the lecture's units (KB = 1,024 B, MB = 1,024² B), how many bytes are in a 1.5 MB buffer?",
   "o": [
    [
     "1,500,000",
     "That is the manufacturers' rounding (1 MB ≈ 1 million B), not the OS convention of 1,024² bytes."
    ],
    [
     "1,536,000",
     "This mixes conventions (1.5 × 1,024 × 1,000); a MB is 1,024 × 1,024 bytes."
    ],
    [
     "1,572,864",
     "Correct. 1.5 × 1,024 × 1,024 = 1.5 × 1,048,576 = 1,572,864 bytes."
    ],
    [
     "12,582,912",
     "This is the number of bits (× 8). The question asks for bytes."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> A high-speed device moves 16 KB into main memory in blocks of 1 KB. How many interrupts does the CPU receive with DMA, compared with one interrupt per byte?",
   "o": [
    [
     "16 with DMA vs 16,384 without",
     "Correct. DMA raises one interrupt per block (16 blocks); one interrupt per byte would be 16 × 1,024 = 16,384."
    ],
    [
     "1 with DMA vs 16 without",
     "DMA interrupts once per block, not once for the whole transfer, and \"without\" means per byte, not per block."
    ],
    [
     "16,384 with DMA vs 16 without",
     "Reversed: DMA is what reduces interrupts to one per block."
    ],
    [
     "0 with DMA vs 16,384 without",
     "DMA still interrupts the CPU once each block is done."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which property belongs to <b>timesharing (multitasking)</b> rather than plain multiprogramming?",
   "o": [
    [
     "It keeps a subset of jobs in memory so the CPU always has one to run",
     "That is the basic idea of multiprogramming (batch systems), which timesharing extends."
    ],
    [
     "Response time should be under 1 second so users can interact with each running job",
     "Correct. Timesharing switches jobs so often that users can interact with them; the lecture gives a response time target of &lt; 1 second."
    ],
    [
     "One job is selected by job scheduling and runs until it must wait for I/O",
     "That describes multiprogramming switching only when a job waits."
    ],
    [
     "Each processor is assigned a specific task",
     "That is asymmetric multiprocessing, a hardware architecture, not timesharing."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's \"performance of the levels of storage\" table, which level is managed by the <b>compiler</b>?",
   "o": [
    [
     "Cache",
     "In the storage-levels table, cache is managed by hardware, not by the compiler. The compiler manages only the registers."
    ],
    [
     "Main memory",
     "Main memory is managed by the operating system."
    ],
    [
     "Solid-state disk",
     "Solid-state disks are managed by the operating system."
    ],
    [
     "Registers",
     "Correct. The compiler decides which values live in registers (size &lt; 1 KB, access 0.25–0.5 ns)."
    ]
   ],
   "a": 3
  },
  {
   "q": "The ________ contains the addresses of all the interrupt service routines.",
   "o": [
    [
     "device-status table",
     "Wrong. The device-status table holds the type, address and state of each I/O device."
    ],
    [
     "interrupt vector",
     "Correct. An interrupt transfers control to the service routine through the interrupt vector, which contains the addresses of all service routines (L1, Interrupts)."
    ],
    [
     "local buffer",
     "Wrong. A device controller's local buffer holds the data being transferred, not routine addresses."
    ],
    [
     "bootstrap program",
     "Wrong. The bootstrap program initializes the system and loads the kernel at power-up or reboot."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"A trap is generated by a device controller to tell the CPU that it has finished an I/O operation.\"",
   "o": [
    [
     "True",
     "Wrong. A device controller signals completion with an ordinary (hardware) interrupt; a trap is software-generated."
    ],
    [
     "False",
     "Correct. A trap (exception) is a software-generated interrupt caused either by an error or by a user request (L1, Interrupts)."
    ]
   ],
   "a": 1
  },
  {
   "q": "The operating system determines which type of interrupt has occurred by:",
   "o": [
    [
     "DMA or spooling",
     "Wrong. DMA moves blocks straight to memory and spooling overlaps the I/O of jobs; neither identifies an interrupt type."
    ],
    [
     "The mode bit or the timer",
     "Wrong. The mode bit tells user code from kernel code, and the timer stops a process from hogging the CPU."
    ],
    [
     "Buffering or caching",
     "Wrong. These are I/O-subsystem memory-management tasks, not ways to identify an interrupt."
    ],
    [
     "Polling or a vectored interrupt system",
     "Correct. In interrupt handling the OS determines which type occurred by polling or by a vectored interrupt system (L1, Interrupts)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following is NOT one of the three operating-system goals?",
   "o": [
    [
     "Execute user programs and make solving user problems easier",
     "Wrong. This is the first OS goal."
    ],
    [
     "Make the computer system convenient to use",
     "Wrong. This is the second OS goal."
    ],
    [
     "Provide the basic computing resources such as the CPU, memory and I/O devices",
     "Correct. Providing the basic computing resources is the role of the hardware component, not an OS goal (L1, What is an OS)."
    ],
    [
     "Use the computer hardware in an efficient manner",
     "Wrong. This is the third OS goal."
    ]
   ],
   "a": 2
  },
  {
   "q": "Among the four components of a computer system, compilers, web browsers and video games belong to the:",
   "o": [
    [
     "Application programs",
     "Correct. Application programs define the ways the system resources are used to solve the users' computing problems; compilers, web browsers and video games are the lecture's examples (L1, Four components)."
    ],
    [
     "Hardware",
     "Wrong. The hardware is the CPU, memory and I/O devices that provide the basic computing resources."
    ],
    [
     "Operating system",
     "Wrong. The operating system (e.g. Windows, Linux) controls and coordinates use of the hardware."
    ],
    [
     "Users",
     "Wrong. Users are people, machines and other computers."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Viewed as a control program, the OS decides between conflicting requests for efficient and fair resource use.\"",
   "o": [
    [
     "True",
     "Wrong. Deciding between conflicting requests is the OS viewed as a resource allocator."
    ],
    [
     "False",
     "Correct. As a control program the OS controls execution of programs to prevent errors and improper use; deciding between conflicting requests is the resource-allocator view (L1, What OSes do)."
    ]
   ],
   "a": 1
  },
  {
   "q": "The ________ is \"the one program running at all times on the computer\".",
   "o": [
    [
     "bootstrap program",
     "Wrong. The bootstrap program runs at power-up or reboot to load the kernel; it does not run at all times."
    ],
    [
     "kernel",
     "Correct. The kernel is the one program running at all times; everything else is a system program or an application program (L1, OS definition)."
    ],
    [
     "system program",
     "Wrong. A system program ships with the OS but is not the kernel."
    ],
    [
     "device driver",
     "Wrong. A device driver provides a uniform interface between a device controller and the kernel."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"The bootstrap program initializes all aspects of the system, then loads the operating-system kernel and starts its execution.\"",
   "o": [
    [
     "True",
     "Correct. The bootstrap program, loaded at power-up or reboot, initializes the system and loads the kernel and starts it (L1, Computer startup)."
    ],
    [
     "False",
     "Wrong. Loading and starting the kernel is exactly the bootstrap program's job."
    ]
   ],
   "a": 0
  },
  {
   "q": "With synchronous I/O, control returns to the user program:",
   "o": [
    [
     "Immediately, without waiting for the I/O to complete",
     "Wrong. Returning without waiting is asynchronous I/O."
    ],
    [
     "When the timer counter reaches zero",
     "Wrong. The timer interrupt lets the OS regain control from a process; it is not how I/O returns."
    ],
    [
     "Only upon I/O completion",
     "Correct. In synchronous I/O, control returns only upon I/O completion, so at most one request is outstanding (L1, I/O structure)."
    ],
    [
     "Whenever the device-status table is updated",
     "Wrong. The device-status table is what the OS uses with asynchronous I/O to track each device's state."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Using the lecture's units (GB = 1,024³ B), how many bytes are in 2 GB?",
   "o": [
    [
     "2,000,000,000",
     "Wrong. That uses the manufacturers' rounding (1 GB = 1 billion bytes), not 1,024³."
    ],
    [
     "2,048",
     "Wrong. 2 × 1,024 = 2,048 B is 2 KB."
    ],
    [
     "2,097,152",
     "Wrong. 2 × 1,024² = 2,097,152 B is 2 MB."
    ],
    [
     "2,147,483,648",
     "Correct. 2 × 1,024³ = 2 × 1,073,741,824 = 2,147,483,648 B (L1, Storage definitions)."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> A computer has 64-bit registers and 64-bit memory addressing. Its native word is typically:",
   "o": [
    [
     "1 byte",
     "Wrong. 1 byte is 8 bits, the smallest convenient chunk, not the 64-bit word."
    ],
    [
     "4 bytes",
     "Wrong. 4 bytes would be a 32-bit word."
    ],
    [
     "8 bytes",
     "Correct. 64 bits ÷ 8 bits per byte = 8 bytes, as in the lecture's example (L1, Storage definitions)."
    ],
    [
     "64 bytes",
     "Wrong. 64 is the number of bits in the word, not bytes."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"Like storage, networking measurements are usually given in bytes.\"",
   "o": [
    [
     "True",
     "Wrong. Networking is the exception: it is measured in bits."
    ],
    [
     "False",
     "Correct. Networking measurements are given in bits, because networks move data a bit at a time (L1, Storage definitions)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Main memory is the only large storage the CPU can access directly, and it is typically:",
   "o": [
    [
     "volatile",
     "Correct. Main memory is random access and typically volatile; secondary storage is the nonvolatile extension (L1, Storage structure)."
    ],
    [
     "nonvolatile",
     "Wrong. Nonvolatile describes secondary storage, the extension of main memory."
    ],
    [
     "sequential access only",
     "Wrong. Main memory is random access."
    ],
    [
     "managed by the compiler",
     "Wrong. In the performance table the compiler manages registers; main memory is managed by the operating system."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> A high-speed device sends 32 KB to main memory using DMA, in blocks of 4 KB. How many interrupts does the CPU receive?",
   "o": [
    [
     "4",
     "Wrong. 4 is the block size in KB, not the number of blocks."
    ],
    [
     "8",
     "Correct. 32 KB ÷ 4 KB = 8 blocks, and DMA raises only one interrupt per block (L1, DMA)."
    ],
    [
     "32",
     "Wrong. That would be one interrupt per KB, which is not how DMA works."
    ],
    [
     "32,768",
     "Wrong. 32 × 1,024 = 32,768 is one interrupt per byte, which is exactly what DMA avoids."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's \"performance of the levels of storage\" table, the <b>cache</b> is managed by:",
   "o": [
    [
     "the compiler",
     "Wrong. The compiler manages the registers."
    ],
    [
     "hardware",
     "Correct. The table lists the cache (on/off-chip CMOS SRAM) as managed by hardware (L1, Performance of storage levels)."
    ],
    [
     "the operating system",
     "Wrong. The OS manages main memory, the solid-state disk and the magnetic disk."
    ],
    [
     "the device controller",
     "Wrong. A device controller is in charge of a particular device type, not of the cache level."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"Main memory can be viewed as a cache for secondary storage.\"",
   "o": [
    [
     "True",
     "Correct. The lecture states that main memory can be viewed as a cache for secondary storage (L1, Caching)."
    ],
    [
     "False",
     "Wrong. The lecture explicitly says main memory can be viewed as a cache for secondary storage."
    ]
   ],
   "a": 0
  },
  {
   "q": "In a multiprocessor system, the hardware must provide ________ so that all CPUs see the most recent value in their caches.",
   "o": [
    [
     "cache coherency",
     "Correct. Multiprocessors need hardware cache coherency so all CPUs have the most recent value (L1, Performance of storage levels)."
    ],
    [
     "spooling",
     "Wrong. Spooling overlaps the output of one job with the input of other jobs."
    ],
    [
     "DMA",
     "Wrong. DMA lets a device controller move blocks to main memory without the CPU."
    ],
    [
     "privilege escalation",
     "Wrong. Privilege escalation lets a user change to an effective ID with more rights."
    ]
   ],
   "a": 0
  },
  {
   "q": "Multiprocessor systems are also known as:",
   "o": [
    [
     "batch systems",
     "Wrong. Batch systems are multiprogramming systems that keep several jobs in memory."
    ],
    [
     "timesharing systems",
     "Wrong. Timesharing (multitasking) switches the CPU among jobs so users can interact."
    ],
    [
     "embedded systems",
     "Wrong. Embedded computers sit in devices and automobiles and have little or no user interface."
    ],
    [
     "parallel systems or tightly-coupled systems",
     "Correct. Multiprocessor systems are also known as parallel systems or tightly-coupled systems (L1, Computer-system architecture)."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: \"In asymmetric multiprocessing, every processor performs all tasks.\"",
   "o": [
    [
     "True",
     "Wrong. Every processor performing all tasks is symmetric multiprocessing (SMP)."
    ],
    [
     "False",
     "Correct. In asymmetric multiprocessing each processor is assigned a specific task; performing all tasks is SMP (L1, Computer-system architecture)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In a timesharing system, which technique allows the execution of processes that are not completely in memory?",
   "o": [
    [
     "Swapping",
     "Wrong. Swapping moves processes in and out of memory when they don't fit; it is not the technique for running a partly loaded process."
    ],
    [
     "Job scheduling",
     "Wrong. Job scheduling selects which job to run in a multiprogrammed (batch) system."
    ],
    [
     "Virtual memory",
     "Correct. Virtual memory allows execution of processes not completely in memory (L1, Multiprogramming vs timesharing)."
    ],
    [
     "DMA",
     "Wrong. DMA transfers blocks between a device and main memory without the CPU."
    ]
   ],
   "a": 2
  },
  {
   "q": "CPUs increasingly support multi-mode operation. Which extra mode does the lecture give as an example?",
   "o": [
    [
     "A cache-coherency mode for multiprocessors",
     "Wrong. Cache coherency is a hardware requirement in multiprocessors, not a CPU mode."
    ],
    [
     "A polling mode for device controllers",
     "Wrong. Polling is one way to determine the interrupt type, not a CPU mode."
    ],
    [
     "A DMA mode for high-speed devices",
     "Wrong. DMA is a transfer method for high-speed devices, not a CPU mode."
    ],
    [
     "A virtual machine manager (VMM) mode for guest VMs",
     "Correct. The lecture's example of multi-mode operation is a VMM mode for guest VMs (L1, Dual mode)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following is a <b>process-management</b> activity of the OS?",
   "o": [
    [
     "Suspending and resuming processes",
     "Correct. Process management includes creating, deleting, suspending and resuming processes, plus synchronization, communication and deadlock handling (L1, Process management)."
    ],
    [
     "Allocating and deallocating memory space as needed",
     "Wrong. That is a memory-management activity."
    ],
    [
     "Mapping files onto secondary storage",
     "Wrong. That is a file-system management activity."
    ],
    [
     "Overlapping the output of one job with the input of other jobs",
     "Wrong. That is spooling, done by the I/O subsystem."
    ]
   ],
   "a": 0
  },
  {
   "q": "Free-space management, storage allocation and disk scheduling are OS activities of:",
   "o": [
    [
     "process management",
     "Wrong. Process management covers creating, deleting, suspending and resuming processes, synchronization, communication and deadlock handling."
    ],
    [
     "memory management",
     "Wrong. Memory management tracks memory use, moves processes in and out, and allocates and deallocates space."
    ],
    [
     "mass-storage management",
     "Correct. The lecture lists free-space management, storage allocation and disk scheduling as mass-storage management activities (L1, Mass-storage management)."
    ],
    [
     "the I/O subsystem",
     "Wrong. The I/O subsystem handles buffering, caching, spooling and device drivers."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"Buffering means storing data temporarily while it is being transferred.\"",
   "o": [
    [
     "True",
     "Correct. The I/O subsystem defines buffering as storing data temporarily while it is being transferred (L1, I/O subsystem)."
    ],
    [
     "False",
     "Wrong. That is exactly the lecture's definition of buffering; storing parts of data in faster storage is caching."
    ]
   ],
   "a": 0
  },
  {
   "q": "________ allows a user to change to an effective ID with more rights.",
   "o": [
    [
     "Group ID",
     "Wrong. A group ID defines a set of users and is associated with each process and file."
    ],
    [
     "Privilege escalation",
     "Correct. Privilege escalation allows a user to change to an effective ID with more rights (L1, Protection and security)."
    ],
    [
     "User ID",
     "Wrong. A user ID is a name and an associated number, one per user, used for access control."
    ],
    [
     "Dual-mode operation",
     "Wrong. Dual mode separates user mode and kernel mode to protect the OS."
    ]
   ],
   "a": 1
  },
  {
   "q": "Any mechanism for controlling the access of processes or users to the resources defined by the OS is called:",
   "o": [
    [
     "security",
     "Wrong. Security is the defense of the system against internal and external attacks."
    ],
    [
     "privilege escalation",
     "Wrong. Privilege escalation is changing to an effective ID with more rights."
    ],
    [
     "dual-mode operation",
     "Wrong. Dual mode lets the OS protect itself by separating user and kernel code; it is not the general definition asked for."
    ],
    [
     "protection",
     "Correct. Protection is any mechanism for controlling access of processes or users to resources defined by the OS (L1, Protection and security)."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: \"Each device controller has a local buffer, and the CPU moves data between main memory and these local buffers.\"",
   "o": [
    [
     "True",
     "Correct. Each device controller has a local buffer; the CPU moves data between main memory and the local buffers, and I/O goes from the device to the buffer (L1, Computer-system organization)."
    ],
    [
     "False",
     "Wrong. The lecture says exactly this: each controller has a local buffer and the CPU moves data between it and main memory."
    ]
   ],
   "a": 0
  },
  {
   "q": "According to the lecture, which computers are resource-poor and optimized for usability and battery life?",
   "o": [
    [
     "Mainframes",
     "Wrong. A mainframe is a shared computer that must keep all its users happy."
    ],
    [
     "Workstations",
     "Wrong. Workstations have dedicated resources but often use shared resources from servers."
    ],
    [
     "Handheld computers",
     "Correct. Handheld computers are resource-poor and optimized for usability and battery life (L1, What OSes do)."
    ],
    [
     "Embedded computers",
     "Wrong. Embedded computers (in devices and automobiles) have little or no user interface."
    ]
   ],
   "a": 2
  },
  {
   "q": "A <b>single-threaded</b> process has:",
   "o": [
    [
     "One program counter specifying the location of the next instruction to execute",
     "Correct. A single-threaded process has one program counter and executes instructions sequentially until completion (L1, Process management)."
    ],
    [
     "One program counter per thread",
     "Wrong. One program counter per thread describes a multi-threaded process."
    ],
    [
     "No program counter until it is given the CPU",
     "Wrong. The lecture gives every single-threaded process one program counter."
    ],
    [
     "One program counter per CPU in the system",
     "Wrong. The number of program counters depends on the threads, not on the number of CPUs."
    ]
   ],
   "a": 0
  }
 ],
 "2": [
  {
   "q": "After <code>pid = fork();</code> succeeds, what value of <code>pid</code> does the <b>child</b> process see?",
   "o": [
    [
     "The child's own PID",
     "The child's PID is what the parent receives, not the child."
    ],
    [
     "0",
     "Correct. fork() returns 0 in the child, the child's PID in the parent, and a value &lt; 0 on error."
    ],
    [
     "The parent's PID",
     "fork() does not return the parent's PID to the child."
    ],
    [
     "A negative number",
     "A value &lt; 0 means fork() failed and no child was created."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> A process runs this code (no exec, no error):<br><code>fork();<br>fork();</code><br>How many processes exist in total afterwards, including the original?",
   "o": [
    [
     "2",
     "That counts only the first fork(). Both the parent and its child go on to execute the second fork()."
    ],
    [
     "3",
     "This adds one process per fork() call, forgetting that the first child also executes the second fork()."
    ],
    [
     "4",
     "Correct. The first fork() gives 2 processes; each of them runs the second fork(), giving 2 × 2 = 4."
    ],
    [
     "8",
     "8 = 2³ would need three fork() calls. With two calls the count doubles twice: 2 × 2 = 4."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> In the lecture's shared-memory bounded buffer, <code>BUFFER_SIZE = 8</code>, <code>in = 7</code>, <code>out = 0</code>. What does the producer do next?",
   "o": [
    [
     "It writes to buffer[7] and sets in = 0",
     "It cannot: the test ((in + 1) % 8) == out is (0 == 0), so the buffer is treated as full."
    ],
    [
     "It writes to buffer[0]",
     "The producer writes at index in, never at out, and anyway it must wait here."
    ],
    [
     "It busy-waits because the buffer is full (it already holds 7 items)",
     "Correct. (7 + 1) % 8 = 0 = out, so the \"full\" loop spins. The solution only uses BUFFER_SIZE − 1 = 7 slots."
    ],
    [
     "It busy-waits because the buffer is empty",
     "Empty is the consumer's test (in == out), and 7 ≠ 0."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which scheduler removes processes from memory to disk and later brings them back (swapping), thereby <b>decreasing</b> the degree of multiprogramming?",
   "o": [
    [
     "Medium-term scheduler",
     "Correct. It is added when the degree of multiprogramming must decrease and works by swapping."
    ],
    [
     "Short-term (CPU) scheduler",
     "It only selects which ready process gets the CPU next, every few milliseconds."
    ],
    [
     "Long-term (job) scheduler",
     "It controls the degree of multiprogramming by choosing which processes enter the ready queue; it does not swap them out."
    ],
    [
     "Dispatcher",
     "The dispatcher performs the context switch for the CPU scheduler's choice; it does not swap memory images."
    ]
   ],
   "a": 0
  },
  {
   "q": "A running process is stopped by a timer interrupt because its time slice expired. Which state does it move to?",
   "o": [
    [
     "Waiting",
     "Running → waiting happens on an I/O or event wait, not on an interrupt."
    ],
    [
     "New",
     "New is the state of a process being created. A running process that is interrupted goes back to ready, never to new."
    ],
    [
     "Terminated",
     "It has not finished; it will run again later."
    ],
    [
     "Ready",
     "Correct. In the state diagram, running → ready is labelled \"interrupt\"; the process waits to be dispatched again."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which statement describes <b>indirect</b> message passing (mailboxes/ports)?",
   "o": [
    [
     "Processes must name each other explicitly: send(P, msg), receive(Q, msg)",
     "Naming the other process explicitly, as in send(P, msg) and receive(Q, msg), is direct communication. Indirect communication names a mailbox instead."
    ],
    [
     "A link may connect many processes, and a pair of processes may share several links",
     "Correct. A link exists only if processes share a mailbox; one link can join many processes, and a pair can share several mailboxes."
    ],
    [
     "Exactly one link exists between each pair of processes",
     "Exactly one link between each pair of processes is a property of direct communication. With mailboxes a pair may share several links."
    ],
    [
     "Links are established automatically between every pair of processes",
     "Automatic links are a property of direct communication; with mailboxes the processes must share a mailbox."
    ]
   ],
   "a": 1
  },
  {
   "q": "A program calls <code>malloc()</code> at run time. In which part of the process's memory is that space allocated?",
   "o": [
    [
     "Stack",
     "The stack holds function parameters, return addresses and local variables, and grows down."
    ],
    [
     "Data section",
     "The data section holds global and static variables, fixed before the program runs."
    ],
    [
     "Text section",
     "The text section holds the program code, fixed when the program is loaded. Memory from malloc() at run time comes from the heap."
    ],
    [
     "Heap",
     "Correct. The heap is memory dynamically allocated at run time (new, delete, malloc, free) and grows up."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which socket refers to a service on the <b>local</b> system that uses a <b>well-known</b> port?",
   "o": [
    [
     "127.0.0.1:80",
     "Correct. 127.0.0.1 is the loopback address (the local system) and port 80 is below 1024, so it is well known."
    ],
    [
     "127.0.0.1:5050",
     "Loopback is right, but 5050 is not below 1024, so it is not a well-known port."
    ],
    [
     "161.25.19.8:21",
     "Port 21 is well known, but 161.25.19.8 is a remote host, not the loopback address."
    ],
    [
     "161.25.19.8:1625",
     "This is the lecture's remote example host, and 1625 is not a well-known port."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"During a context switch the system does useful work, because the PCBs are being updated.\"",
   "o": [
    [
     "True",
     "Saving and loading PCBs is bookkeeping; no user process makes progress during it."
    ],
    [
     "False",
     "Correct. Context-switch time is pure overhead, and it is longer when the OS and PCB are more complex."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"In the shared-memory IPC model, communication is controlled by the operating system, which also synchronizes the processes automatically.\"",
   "o": [
    [
     "True",
     "In shared memory, the user processes control the communication. Synchronizing them is the main problem they must solve themselves."
    ],
    [
     "False",
     "Correct. Communication is under the control of the user processes, not the OS, and synchronizing their actions is the major issue."
    ]
   ],
   "a": 1
  },
  {
   "q": "The ________ section of a process holds function parameters, return addresses and local variables.",
   "o": [
    [
     "text",
     "Wrong. The text section is the program code."
    ],
    [
     "data",
     "Wrong. The data section holds global and static variables."
    ],
    [
     "heap",
     "Wrong. The heap is memory dynamically allocated at run time (new, malloc)."
    ],
    [
     "stack",
     "Correct. The stack holds temporary data: function parameters, return addresses and local variables (L2, Process concept)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Global and static variables, declared outside the main function and accessible by any function, are stored in the:",
   "o": [
    [
     "stack section",
     "Wrong. The stack holds function parameters, return addresses and local variables."
    ],
    [
     "data section",
     "Correct. The data section holds global and static variables (L2, Process concept)."
    ],
    [
     "heap",
     "Wrong. The heap holds memory allocated dynamically during run time."
    ],
    [
     "text section",
     "Wrong. The text section holds the program code."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"In a process's memory, the stack grows up from address 0 and the heap grows down from the max address.\"",
   "o": [
    [
     "True",
     "Wrong. It is the other way round: the stack sits at the top (max) and grows down, the heap grows up."
    ],
    [
     "False",
     "Correct. From max down to 0 the layout is stack, heap, data, text; the stack grows down and the heap grows up (L2, Process concept)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A program becomes a process when:",
   "o": [
    [
     "it is compiled into an executable file",
     "Wrong. An executable file on disk is still a program, a passive entity."
    ],
    [
     "it is stored on disk",
     "Wrong. A program stored on disk is a passive entity, not a process."
    ],
    [
     "its executable file is loaded into memory",
     "Correct. A program becomes a process when its executable file is loaded into memory (L2, Process concept)."
    ],
    [
     "it reaches the terminated state",
     "Wrong. Terminated means the process has finished execution."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"One program can be several processes, for example when multiple users run the same program.\"",
   "o": [
    [
     "True",
     "Correct. The lecture states that one program can be several processes, e.g. multiple users running the same program (L2, Process concept)."
    ],
    [
     "False",
     "Wrong. The lecture says one program can indeed be several processes."
    ]
   ],
   "a": 0
  },
  {
   "q": "A process that is waiting to be assigned to a processor is in the ________ state.",
   "o": [
    [
     "new",
     "Wrong. New means the process is being created."
    ],
    [
     "ready",
     "Correct. Ready means waiting to be assigned to a processor (L2, Process states)."
    ],
    [
     "waiting",
     "Wrong. Waiting means waiting for some event such as I/O completion or a signal."
    ],
    [
     "running",
     "Wrong. Running means its instructions are being executed."
    ]
   ],
   "a": 1
  },
  {
   "q": "A running process issues an I/O request. Which state does it move to?",
   "o": [
    [
     "waiting",
     "Correct. The transition running → waiting is labelled \"I/O or event wait\" (L2, Process states)."
    ],
    [
     "ready",
     "Wrong. A running process goes to ready on an interrupt, or reaches ready later when its I/O completes."
    ],
    [
     "new",
     "Wrong. New is only the state while the process is being created."
    ],
    [
     "terminated",
     "Wrong. A running process goes to terminated on exit."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the process-state diagram, the transition labelled \"scheduler dispatch\" goes from:",
   "o": [
    [
     "new to ready",
     "Wrong. New → ready is labelled \"admitted\"."
    ],
    [
     "running to ready",
     "Wrong. Running → ready is labelled \"interrupt\"."
    ],
    [
     "ready to running",
     "Correct. The scheduler dispatches a ready process onto the CPU: ready → running (L2, Process states)."
    ],
    [
     "waiting to ready",
     "Wrong. Waiting → ready is labelled \"I/O or event completion\"."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"When its I/O completes, a waiting process moves directly back to the running state.\"",
   "o": [
    [
     "True",
     "Wrong. There is no waiting → running arrow; it must go back to ready and wait to be dispatched."
    ],
    [
     "False",
     "Correct. I/O or event completion moves a waiting process to ready; only the scheduler dispatch moves it to running (L2, Process states)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which PCB field holds the process's priorities and scheduling-queue pointers?",
   "o": [
    [
     "Accounting information",
     "Wrong. Accounting information holds CPU used, clock time elapsed since start and time limits."
    ],
    [
     "Memory-management information",
     "Wrong. Memory-management information holds the memory allocated to the process."
    ],
    [
     "I/O status information",
     "Wrong. I/O status information holds the I/O devices allocated and the list of open files."
    ],
    [
     "CPU-scheduling information",
     "Correct. CPU-scheduling information holds priorities and scheduling-queue pointers (L2, PCB)."
    ]
   ],
   "a": 3
  },
  {
   "q": "The set of all processes residing in main memory, ready and waiting to execute, is the:",
   "o": [
    [
     "job queue",
     "Wrong. The job queue is the set of all processes in the system."
    ],
    [
     "ready queue",
     "Correct. The ready queue holds all processes residing in main memory, ready and waiting to execute (L2, Scheduling queues)."
    ],
    [
     "device queue",
     "Wrong. A device queue holds processes waiting for an I/O device."
    ],
    [
     "set of swapped-out processes",
     "Wrong. Swapped-out processes have been moved out of memory to disk."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Tracing.</b> In the lecture's figure of the ready queue and I/O device queues (slide 9), which PCB is at the <b>head</b> of the disk unit 0 queue?",
   "o": [
    [
     "PCB7",
     "Wrong. PCB7 is at the head of the ready queue."
    ],
    [
     "PCB6",
     "Wrong. PCB6 is at the tail of the disk unit 0 queue."
    ],
    [
     "PCB3",
     "Correct. Disk unit 0: head → PCB3 → PCB14 → PCB6 → null, tail → PCB6 (L2, Scheduling queues)."
    ],
    [
     "PCB5",
     "Wrong. PCB5 is the only PCB in the terminal unit 0 queue."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"The long-term scheduler should bring in mostly CPU-bound processes to keep the CPU busy.\"",
   "o": [
    [
     "True",
     "Wrong. The long-term scheduler should not favour one kind; it needs a mix."
    ],
    [
     "False",
     "Correct. The long-term scheduler should pick a good mix of I/O-bound and CPU-bound processes (L2, Schedulers)."
    ]
   ],
   "a": 1
  },
  {
   "q": "The short-term (CPU) scheduler:",
   "o": [
    [
     "runs every few seconds or minutes, so it may be slow",
     "Wrong. Infrequent, possibly slow invocation describes the long-term scheduler."
    ],
    [
     "swaps processes out to disk to decrease the degree of multiprogramming",
     "Wrong. Swapping is the medium-term scheduler's job."
    ],
    [
     "selects which processes are brought into the ready queue",
     "Wrong. Choosing which processes enter the ready queue is the long-term scheduler."
    ],
    [
     "is invoked very frequently (milliseconds), so it must be fast",
     "Correct. The short-term scheduler selects the next process for the CPU every few milliseconds, so it must be fast (L2, Schedulers)."
    ]
   ],
   "a": 3
  },
  {
   "q": "According to the lecture's scheduler table, which scheduler <b>controls</b> the degree of multiprogramming?",
   "o": [
    [
     "Long-term scheduler",
     "Correct. The long-term (job) scheduler controls the degree of multiprogramming by choosing which processes enter the ready queue (L2, Schedulers)."
    ],
    [
     "Short-term scheduler",
     "Wrong. The short-term scheduler only decides which ready process gets the CPU."
    ],
    [
     "Medium-term scheduler",
     "Wrong. The medium-term scheduler is added to decrease the degree of multiprogramming by swapping; the table says the long-term one controls it."
    ],
    [
     "None of the mentioned",
     "Wrong. The lecture names a scheduler for this: the long-term scheduler."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Context-switch time depends on hardware support; some hardware provides multiple register sets per CPU, so multiple contexts are loaded at once.\"",
   "o": [
    [
     "True",
     "Correct. The lecture says context-switch time depends on hardware support, e.g. multiple register sets per CPU (L2, Context switch)."
    ],
    [
     "False",
     "Wrong. The lecture states this directly about hardware support for context switches."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Tracing.</b> Which order of kernel actions during a context switch matches the lecture?",
   "o": [
    [
     "Select the next process → save the old process's PCB → restore the next one → switch to user mode",
     "Wrong. The old process's state must be saved and queued before the next process is selected."
    ],
    [
     "Restore the next process's PC → save the old process's registers → move the old process to a queue → select the next process",
     "Wrong. Restoring before saving would overwrite the old process's registers before they are stored."
    ],
    [
     "Save PC, registers and state into the old PCB → move it to the proper queue → select the next process → restore its context from its PCB → switch to user mode and jump to its saved PC",
     "Correct. This is the lecture's sequence of kernel actions (L2, Context switch)."
    ],
    [
     "Switch to user mode → select the next process → save the old PCB → restore the next one",
     "Wrong. Switching to user mode is the last step, after the new context is restored."
    ]
   ],
   "a": 2
  },
  {
   "q": "In UNIX, <code>fork()</code> returns a value less than 0. This means:",
   "o": [
    [
     "the code is running in the child process",
     "Wrong. fork() returns 0 in the child."
    ],
    [
     "the code is running in the parent process",
     "Wrong. In the parent, fork() returns the child's PID."
    ],
    [
     "the child has terminated and become a zombie",
     "Wrong. A zombie is a terminated process whose parent has not called wait(); fork() does not report that."
    ],
    [
     "an error occurred and no child was created",
     "Correct. fork() returns &lt; 0 on error; the lecture's code prints \"Fork Failed\" (L2, Process creation)."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> A process runs this code (no exec, no errors):<br><code>fork();</code><br><code>fork();</code><br><code>fork();</code><br>How many processes exist in total afterwards, including the original?",
   "o": [
    [
     "3",
     "Wrong. Each fork() is run by every process that exists at that point, not once in total."
    ],
    [
     "8",
     "Correct. Each fork() doubles the number of processes: 1 → 2 → 4 → 8 (L2, Process creation)."
    ],
    [
     "6",
     "Wrong. 6 would mean each call adds two processes; in fact each call doubles the count."
    ],
    [
     "4",
     "Wrong. 4 is the total after only two fork() calls."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which system call, used after <code>fork()</code>, replaces the process' memory space with a new program?",
   "o": [
    [
     "exec()",
     "Correct. exec() is used after fork() to replace the process' memory space with a new program (L2, Process creation)."
    ],
    [
     "wait()",
     "Wrong. wait() makes the parent wait for a child and returns its status and pid."
    ],
    [
     "abort()",
     "Wrong. abort() lets a parent terminate a child."
    ],
    [
     "exit()",
     "Wrong. exit() asks the OS to delete the calling process after its last statement."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT a reason given in the lecture for a parent to terminate a child with <code>abort()</code>?",
   "o": [
    [
     "The child has exceeded its allocated resources",
     "Wrong. Exceeding allocated resources is one of the listed reasons."
    ],
    [
     "The task assigned to the child is no longer required",
     "Wrong. A task no longer required is one of the listed reasons."
    ],
    [
     "The parent is exiting and the OS does not allow a child to continue",
     "Wrong. This is the third listed reason."
    ],
    [
     "The child has become a CPU-bound process",
     "Correct. Being CPU-bound (few very long CPU bursts) is not a reason for abort() in the lecture (L2, Process termination)."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: \"In cascading termination, the parent process initiates the termination of its children, grandchildren, and so on.\"",
   "o": [
    [
     "True",
     "Wrong. The lecture says cascading termination is initiated by the operating system."
    ],
    [
     "False",
     "Correct. In cascading termination all children, grandchildren, etc. are terminated, and the termination is initiated by the operating system (L2, Process termination)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In Chrome's multiprocess architecture, which process type renders web pages (HTML, JavaScript) and runs in a sandbox?",
   "o": [
    [
     "Browser process",
     "Wrong. The browser process manages the user interface and disk and network I/O."
    ],
    [
     "Renderer process",
     "Correct. Renderer processes render pages, one per website, in a sandbox that restricts disk and network I/O (L2, Chrome)."
    ],
    [
     "Plug-in process",
     "Wrong. A plug-in process is created for each type of plug-in."
    ],
    [
     "Service",
     "Wrong. A service is how an Android background process performs tasks."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is NOT one of the lecture's reasons for cooperating processes?",
   "o": [
    [
     "Information sharing",
     "Wrong. Information (data) sharing is a listed reason."
    ],
    [
     "Computation speedup",
     "Wrong. Computation speedup is a listed reason."
    ],
    [
     "Increased reliability",
     "Correct. The reasons are information sharing, computation speedup, modularity and convenience; increased reliability is a multiprocessor advantage from Lecture 1 (L2, IPC)."
    ],
    [
     "Modularity",
     "Wrong. Modularity is a listed reason."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> In the lecture's bounded buffer with <code>BUFFER_SIZE = 10</code>, the producer has just stored an item at <code>buffer[9]</code> (so <code>in</code> was 9). What is the new value of <code>in</code>?",
   "o": [
    [
     "0",
     "Correct. in = (9 + 1) % 10 = 0, so the index wraps around to the start (L2, Producer–consumer)."
    ],
    [
     "10",
     "Wrong. 10 ignores the % BUFFER_SIZE; index 10 does not exist in a buffer of size 10."
    ],
    [
     "9",
     "Wrong. in is incremented after the item is stored, so it cannot stay 9."
    ],
    [
     "1",
     "Wrong. (9 + 1) % 10 is 0, not 1."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Bounded buffer with <code>BUFFER_SIZE = 6</code>, <code>in = 4</code>, <code>out = 4</code>. What does the consumer do?",
   "o": [
    [
     "Consumes buffer[4] and sets out to 5",
     "Wrong. in == out means there is nothing to consume yet."
    ],
    [
     "Consumes buffer[3] and sets out to 4",
     "Wrong. The consumer reads buffer[out], never buffer[out − 1], and here the buffer is empty anyway."
    ],
    [
     "Busy-waits, because the buffer is empty",
     "Correct. The consumer loops while (in == out); 4 == 4, so the buffer is empty (L2, Producer–consumer)."
    ],
    [
     "Busy-waits, because the buffer is full",
     "Wrong. Full is (in + 1) % 6 == out → 5 ≠ 4, and full only stops the producer."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"In the message-passing model, processes communicate through shared variables.\"",
   "o": [
    [
     "True",
     "Wrong. Message passing works without shared variables; shared data is the shared-memory model."
    ],
    [
     "False",
     "Correct. In message passing, processes communicate and synchronize without resorting to shared variables, using send and receive (L2, Message passing)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which property belongs to <b>direct</b> communication in message passing?",
   "o": [
    [
     "A link may be associated with many processes",
     "Wrong. Many processes on one link is a property of indirect communication (mailboxes)."
    ],
    [
     "A pair of processes may share several communication links",
     "Wrong. Several links per pair is a property of indirect communication."
    ],
    [
     "Messages are sent to and received from mailboxes (ports)",
     "Wrong. Mailboxes (ports) are the indirect model."
    ],
    [
     "Links are established automatically, and exactly one link exists between each pair",
     "Correct. In direct communication processes name each other, links are established automatically, and there is exactly one link per pair (L2, Direct communication)."
    ]
   ],
   "a": 3
  },
  {
   "q": "P1, P2 and P3 share mailbox A, and P1 sends a message. Which of these is one of the lecture's solutions to \"who gets the message?\"",
   "o": [
    [
     "Allow only one process at a time to execute a receive operation",
     "Correct. The listed solutions: links of at most two processes, only one process at a time may receive, or the system picks the receiver arbitrarily and notifies the sender (L2, Indirect communication)."
    ],
    [
     "Deliver a copy of the message to both P2 and P3",
     "Wrong. Giving the message to every process is not one of the listed solutions."
    ],
    [
     "Return null to P1 so it sends again",
     "Wrong. Null is what a non-blocking receive may return; it is not a mailbox solution."
    ],
    [
     "Convert the mailbox into a direct link between P1 and P2",
     "Wrong. The lecture does not offer switching to direct communication as a solution."
    ]
   ],
   "a": 0
  },
  {
   "q": "With <b>zero-capacity</b> buffering, the sender:",
   "o": [
    [
     "never waits",
     "Wrong. A sender that never waits is unbounded capacity."
    ],
    [
     "waits only when n messages are already queued",
     "Wrong. Waiting when the queue of n messages is full is bounded capacity."
    ],
    [
     "must wait for the receiver (rendezvous)",
     "Correct. With zero capacity no messages are queued, so the sender must wait for the receiver: a rendezvous (L2, Buffering)."
    ],
    [
     "sends and continues, and the receiver may get null",
     "Wrong. Send-and-continue with a possible null is non-blocking (asynchronous) messaging."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"A non-blocking receive returns either a valid message or null.\"",
   "o": [
    [
     "True",
     "Correct. Non-blocking receive gets either a valid message or null (L2, Synchronization)."
    ],
    [
     "False",
     "Wrong. The lecture defines non-blocking receive exactly this way; it is blocking receive that waits."
    ]
   ],
   "a": 0
  },
  {
   "q": "The socket <b>161.25.19.8:1625</b> refers to:",
   "o": [
    [
     "host 1625 on port 161.25.19.8",
     "Wrong. This swaps the parts: the IP address comes first, then the port."
    ],
    [
     "port 1625 on host 161.25.19.8",
     "Correct. A socket is an IP address concatenated with a port: port 1625 on host 161.25.19.8 (L2, Sockets)."
    ],
    [
     "the loopback address on port 1625",
     "Wrong. The loopback address is 127.0.0.1."
    ],
    [
     "a well-known port on host 161.25.19.8",
     "Wrong. Well-known ports are below 1024, and 1625 is not."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"All ports below 1024 are well known and used for standard services.\"",
   "o": [
    [
     "True",
     "Correct. Ports below 1024 are well known, used for standard services (L2, Sockets)."
    ],
    [
     "False",
     "Wrong. The lecture says ports below 1024 are the well-known ones."
    ]
   ],
   "a": 0
  },
  {
   "q": "In Android, a background process uses a ________ to perform tasks; it can keep running even if the background process is suspended, and it has no user interface.",
   "o": [
    [
     "foreground process",
     "Wrong. The foreground process is the one on the display, controlled via the user interface."
    ],
    [
     "renderer process",
     "Wrong. A renderer process is Chrome's process for rendering web pages."
    ],
    [
     "plug-in process",
     "Wrong. A plug-in process is Chrome's process for each type of plug-in."
    ],
    [
     "service",
     "Correct. An Android background process uses a service, which keeps running if the process is suspended, has no UI and uses little memory (L2, Mobile multitasking)."
    ]
   ],
   "a": 3
  },
  {
   "q": "<code>pid = wait(&amp;status);</code> returns:",
   "o": [
    [
     "the status information and the pid of the terminated child",
     "Correct. wait(&amp;status) returns the status and the pid of the terminated process (L2, Process termination)."
    ],
    [
     "the pid of a newly created child",
     "Wrong. Creating a child and returning its pid is fork() in the parent."
    ],
    [
     "0, because it runs in the child",
     "Wrong. Returning 0 in the child is fork()."
    ],
    [
     "the pid of the parent process",
     "Wrong. wait() reports on the terminated child, not on the parent."
    ]
   ],
   "a": 0
  }
 ],
 "3": [
  {
   "q": "<b>Applied.</b> FCFS with (arrival, burst): P1 (0, 5), P2 (1, 3), P3 (2, 8), P4 (3, 2). What is the <b>average turnaround time</b>?",
   "o": [
    [
     "5.75",
     "That is the average waiting time (0 + 4 + 6 + 13)/4. Turnaround also includes the burst."
    ],
    [
     "11.75",
     "That is the average completion time (5 + 8 + 16 + 18)/4 = 47/4 = 11.75. You must subtract each arrival time."
    ],
    [
     "10.25",
     "Correct. Gantt chart: P1 0–5, P2 5–8, P3 8–16, P4 16–18. TAT = CT − AT = 5, 7, 14, 15 → 41/4 = 10.25."
    ],
    [
     "8.5",
     "That is the non-preemptive SJF average turnaround for these processes, not FCFS."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Non-preemptive SJF with (arrival, burst): P1 (0, 5), P2 (1, 3), P3 (2, 8), P4 (3, 2). What is the <b>average waiting time</b>?",
   "o": [
    [
     "4",
     "Correct. Only P1 is there at 0, so it runs 0–5; then the shortest ready job: P4 5–7, P2 7–10, P3 10–18. WT = 0, 6, 8, 2 → 16/4 = 4."
    ],
    [
     "4.25",
     "This treats all processes as arriving at 0 (P4, P2, P1, P3). The arrival times must be honoured: P4 is not there at time 0."
    ],
    [
     "5.75",
     "That is the FCFS average waiting time for the same processes."
    ],
    [
     "8.5",
     "That is the average turnaround time, not the waiting time."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> SRTF (preemptive SJF) with (arrival, burst): P1 (0, 6), P2 (1, 3), P3 (2, 1), P4 (4, 2). What is the average waiting time?",
   "o": [
    [
     "3.75",
     "That is non-preemptive SJF (P1 0–6, P3, P4, P2). SRTF preempts P1 when P2 arrives with a shorter burst."
    ],
    [
     "4.5",
     "4.5 is FCFS: P1 0–6, P2 6–9, P3 9–10, P4 10–12, WT 0 + 5 + 7 + 6 = 18, 18/4 = 4.5. SRTF preempts and gives 2."
    ],
    [
     "5",
     "That is the SRTF average turnaround time (12 + 4 + 1 + 3)/4, not the waiting time."
    ],
    [
     "2",
     "Correct. P1 0–1, P2 1–2, P3 2–3, P2 3–5, P4 5–7, P1 7–12. WT = P1 6, P2 1, P3 0, P4 1 → 8/4 = 2."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> Round Robin, q = 2, all arriving at 0 in the order P1 = 6, P2 = 3, P3 = 1. What is the average waiting time?",
   "o": [
    [
     "5",
     "That is FCFS (WT 0, 6, 9). With RR, P1 is preempted after 2 units."
    ],
    [
     "4.33",
     "Correct. P1 0–2, P2 2–4, P3 4–5, P1 5–7, P2 7–8, P1 8–10. WT = CT − burst = 4, 5, 4 → 13/3 ≈ 4.33."
    ],
    [
     "7.67",
     "That is the average turnaround (10 + 8 + 5)/3. Subtract each burst to get the waiting time."
    ],
    [
     "1.67",
     "That is SJF (P3, P2, P1), which RR does not do."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Non-preemptive priority (smallest number = highest priority), all at time 0. (Burst/priority): P1 4/2, P2 3/1, P3 2/4, P4 6/3. What is the <b>average turnaround time</b>?",
   "o": [
    [
     "5.75",
     "That is the average waiting time (3 + 0 + 13 + 7)/4."
    ],
    [
     "8.75",
     "That is FCFS order P1, P2, P3, P4, which ignores the priorities."
    ],
    [
     "9.25",
     "This treats the largest number as the highest priority. In the lecture the smallest integer is the highest."
    ],
    [
     "9.5",
     "Correct. Order P2 0–3, P1 3–7, P4 7–13, P3 13–15. TAT = CT = 7, 3, 15, 13 → 38/4 = 9.5."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> Round Robin with 5 processes in the ready queue and a time quantum q = 20 ms. What is the most a process waits before its next turn on the CPU?",
   "o": [
    [
     "100 ms",
     "That is n × q. The process does not wait for its own quantum, so it is (n − 1)q."
    ],
    [
     "80 ms",
     "Correct. No process waits more than (n − 1)q = 4 × 20 = 80 ms."
    ],
    [
     "20 ms",
     "That is one quantum, which is only true with 2 processes."
    ],
    [
     "4 ms",
     "That is q / n. Each process gets 1/n of the CPU, but in chunks of q."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Multilevel feedback queue from the lecture: Q0 = RR with q = 8 ms, Q1 = RR with q = 16 ms, Q2 = FCFS. A new process needs a 30 ms CPU burst. How is it served?",
   "o": [
    [
     "8 ms in Q0, 16 ms in Q1, then the last 6 ms in Q2",
     "Correct. It enters Q0 and gets 8 ms, is moved to Q1 for 16 ms more (24 total), and is then preempted and moved to Q2 for the remaining 6 ms."
    ],
    [
     "8 ms in Q0, then the remaining 22 ms in Q1",
     "Q1's quantum is only 16 ms, so after 24 ms in total the process is demoted to Q2."
    ],
    [
     "All 30 ms in Q2, since it is longer than both quanta",
     "Every new process enters Q0; it is only demoted after using up its quantum."
    ],
    [
     "16 ms in Q0, then 14 ms in Q1",
     "The quanta are mixed up: Q0 has q = 8 and Q1 has q = 16."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which scheduling criterion is <b>maximized</b>, not minimized?",
   "o": [
    [
     "Turnaround time",
     "Turnaround (submission to completion) should be minimized."
    ],
    [
     "Response time",
     "Response time (submission to first response) should be minimized."
    ],
    [
     "Throughput",
     "Correct. Throughput, the number of processes completed per time unit, is maximized (as is CPU utilization)."
    ],
    [
     "Waiting time",
     "Waiting time, the time spent in the ready queue, should be minimized. Only throughput and CPU utilization are maximized."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"Preemptive scheduling can cause race conditions when processes share data.\"",
   "o": [
    [
     "True",
     "Correct. A process may be preempted while updating shared data, and the next process then reads inconsistent data."
    ],
    [
     "False",
     "The lecture lists race conditions on shared data as the cost of preemption. Non-preemptive scheduling avoids this."
    ]
   ],
   "a": 0
  },
  {
   "q": "In a multilevel queue that prioritizes by process type, which order goes from <b>highest</b> to <b>lowest</b> priority?",
   "o": [
    [
     "Interactive → system → real-time → batch",
     "Real-time processes have the highest priority, not interactive ones."
    ],
    [
     "Batch → interactive → system → real-time",
     "This is the order reversed: batch processes have the lowest priority and real-time the highest."
    ],
    [
     "System → real-time → batch → interactive",
     "Real-time, not system, comes first, and batch, not interactive, is last. The order is real-time → system → interactive → batch."
    ],
    [
     "Real-time → system → interactive → batch",
     "Correct. This is the lecture's prioritization by process type."
    ]
   ],
   "a": 3
  },
  {
   "q": "FCFS with (arrival, burst): P1 (0, 7), P2 (2, 4), P3 (3, 1), P4 (5, 3). What is the <b>average waiting time</b>?",
   "o": [
    [
     "8.75",
     "This is the average turnaround time (7 + 9 + 9 + 10)/4, not the waiting time."
    ],
    [
     "5",
     "Correct. Gantt P1 0–7 | P2 7–11 | P3 11–12 | P4 12–15; WT = start − arrival = 0, 5, 8, 7 → 20/4 = 5. (L3, FCFS)"
    ],
    [
     "7.5",
     "This ignores the arrival times (treats all as arriving at 0: 0, 7, 11, 12 → 30/4)."
    ],
    [
     "4",
     "This is non-preemptive SJF (P1, P3, P4, P2 → 0, 9, 4, 3), not FCFS."
    ]
   ],
   "a": 1
  },
  {
   "q": "SJF, all processes arrive at time 0: P1 = 5, P2 = 2, P3 = 8, P4 = 3. In what order do they run?",
   "o": [
    [
     "P1, P2, P3, P4",
     "That is FCFS (arrival/index order), not SJF."
    ],
    [
     "P3, P1, P4, P2",
     "That is longest job first, the opposite of SJF."
    ],
    [
     "P2, P4, P1, P3",
     "Correct. Shortest next CPU burst first: 2, 3, 5, 8 → P2 0–2 | P4 2–5 | P1 5–10 | P3 10–18. (L3, SJF)"
    ],
    [
     "P2, P1, P4, P3",
     "P4 (3) is shorter than P1 (5), so P4 must run before P1."
    ]
   ],
   "a": 2
  },
  {
   "q": "For the same SJF set (P1 = 5, P2 = 2, P3 = 8, P4 = 3, all at 0), the <b>average waiting time</b> is:",
   "o": [
    [
     "6.75",
     "This is FCFS in order P1, P2, P3, P4 (0, 5, 7, 15 → 27/4)."
    ],
    [
     "8.75",
     "This is the SJF average turnaround time (2 + 5 + 10 + 18)/4, not the waiting time."
    ],
    [
     "4.75",
     "This runs P1 (5) before P4 (3): starts 0, 2, 7, 10 → 19/4. P4 is shorter, so it goes first."
    ],
    [
     "4.25",
     "Correct. All at 0, so WT = start time: P2 0, P4 2, P1 5, P3 10 → 17/4 = 4.25. (L3, SJF)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Non-preemptive SJF with (arrival, burst): P1 (0, 7), P2 (1, 4), P3 (2, 1), P4 (3, 4). Which process gets the CPU at time 7?",
   "o": [
    [
     "P3, because it has the shortest burst among the ready processes",
     "Correct. P1 is non-preemptive and runs 0–7; at 7 the ready ones are P2 (4), P3 (1), P4 (4), and P3 is shortest. (L3, SJF)"
    ],
    [
     "P2, because it arrived first",
     "Choosing by arrival is FCFS; SJF picks the shortest burst."
    ],
    [
     "P4, because it arrived last",
     "Neither SJF nor FCFS picks the latest arrival; P4's burst (4) is not the shortest."
    ],
    [
     "P3 already took the CPU at time 2 by preempting P1",
     "That would be SRTF (preemptive); plain SJF lets P1 finish its burst."
    ]
   ],
   "a": 0
  },
  {
   "q": "Same set, non-preemptive SJF: P1 (0, 7), P2 (1, 4), P3 (2, 1), P4 (3, 4). What is the average waiting time?",
   "o": [
    [
     "6",
     "This is FCFS (P1, P2, P3, P4 → 0, 6, 9, 9 → 24/4)."
    ],
    [
     "5.25",
     "Correct. Gantt P1 0–7 | P3 7–8 | P2 8–12 | P4 12–16 (P2 and P4 tie at 4, FCFS breaks it); WT 0, 7, 5, 9 → 21/4 = 5.25. (L3, SJF)"
    ],
    [
     "3.25",
     "This is SRTF (preemptive SJF) on the same data, not non-preemptive SJF."
    ],
    [
     "9.25",
     "This is the average turnaround time (7 + 11 + 6 + 13)/4."
    ]
   ],
   "a": 1
  },
  {
   "q": "SRTF with (arrival, burst): P1 (0, 7), P2 (2, 4), P3 (4, 1), P4 (5, 4). Which is the Gantt chart?",
   "o": [
    [
     "P1 0–7 | P3 7–8 | P2 8–12 | P4 12–16",
     "This is non-preemptive SJF: no process is ever preempted."
    ],
    [
     "P1 0–2 | P2 2–6 | P3 6–7 | P4 7–11 | P1 11–16",
     "Misses the preemption at 4: P3 (1) is shorter than P2's remaining 2."
    ],
    [
     "P1 0–2 | P2 2–4 | P3 4–5 | P2 5–7 | P4 7–11 | P1 11–16",
     "Correct. At 2 P2 (4) &lt; P1's 5 left; at 4 P3 (1) &lt; P2's 2 left; at 5 P2 has 2 left &lt; P4's 4, so P2 resumes. (L3, SRTF)"
    ],
    [
     "P1 0–2 | P2 2–4 | P3 4–5 | P4 5–9 | P2 9–11 | P1 11–16",
     "At 5, P2's remaining 2 is shorter than P4's 4, so P2 runs before P4."
    ]
   ],
   "a": 2
  },
  {
   "q": "For that SRTF schedule (P1 (0, 7), P2 (2, 4), P3 (4, 1), P4 (5, 4)), the average waiting time is:",
   "o": [
    [
     "3",
     "Correct. CT P1 16, P2 7, P3 5, P4 11 → WT = CT − AT − BT = 9, 1, 0, 2 → 12/4 = 3. (L3, SRTF)"
    ],
    [
     "4",
     "This is non-preemptive SJF on the same data (0, 6, 3, 7 → 16/4)."
    ],
    [
     "7",
     "This is the average turnaround time (16 + 5 + 1 + 6)/4."
    ],
    [
     "0.5",
     "This is the average response time (first time on CPU − arrival: 0, 0, 0, 2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "In that SRTF schedule, P4 arrives at 5 and first runs at 7. What is P4's <b>response time</b>?",
   "o": [
    [
     "7",
     "7 is the time P4 first gets the CPU, not the time from its arrival."
    ],
    [
     "6",
     "6 is P4's turnaround time (11 − 5)."
    ],
    [
     "0",
     "P4 does not start on arrival: P2 still has 2 units left, which is shorter than 4."
    ],
    [
     "2",
     "Correct. Response time = first time on CPU − arrival = 7 − 5 = 2. (L3, Scheduling criteria)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Round Robin, q = 3, all at time 0 in the order P1 = 9, P2 = 5, P3 = 2. What is the average waiting time?",
   "o": [
    [
     "7.67",
     "This is FCFS (0, 9, 14 → 23/3)."
    ],
    [
     "3",
     "This is SJF (P3, P2, P1 → 0, 2, 7 → 9/3)."
    ],
    [
     "7",
     "Correct. P1 0–3 | P2 3–6 | P3 6–8 | P1 8–11 | P2 11–13 | P1 13–16; WT = CT − burst = 16 − 9, 13 − 5, 8 − 2 = 7, 8, 6 → 21/3 = 7. (L3, Round Robin)"
    ],
    [
     "12.33",
     "This is the average turnaround time (16 + 13 + 8)/3."
    ]
   ],
   "a": 2
  },
  {
   "q": "Same RR schedule (q = 3; P1 = 9, P2 = 5, P3 = 2, all at 0). When does <b>P2 complete</b>?",
   "o": [
    [
     "6",
     "At 6 P2 has only used its first quantum; 2 units are still left."
    ],
    [
     "13",
     "Correct. P2 runs 3–6, waits while P3 (6–8) and P1 (8–11) run, then finishes 11–13. (L3, Round Robin)"
    ],
    [
     "14",
     "14 is P2's completion time under FCFS (9 + 5)."
    ],
    [
     "16",
     "16 is when P1, the last process, completes."
    ]
   ],
   "a": 1
  },
  {
   "q": "RR with q = 2 and (arrival, burst): P1 (0, 5), P2 (1, 3), P3 (2, 1), P4 (4, 2). Using the course convention (a new arrival is queued before the preempted process), which is the Gantt chart?",
   "o": [
    [
     "P1 0–2 | P2 2–4 | P3 4–5 | P1 5–7 | P4 7–9 | P2 9–10 | P1 10–11",
     "Correct. At 2 P3 arrives as P1's quantum ends, so the queue is P2, P3, P1; at 4 P4 arrives as P2's ends: P3, P1, P4, P2. (L3, Round Robin)"
    ],
    [
     "P1 0–2 | P2 2–4 | P1 4–6 | P3 6–7 | P2 7–8 | P4 8–10 | P1 10–11",
     "This puts the preempted process ahead of the new arrival, the opposite of the course convention."
    ],
    [
     "P1 0–5 | P2 5–8 | P3 8–9 | P4 9–11",
     "This is FCFS: no quantum is applied."
    ],
    [
     "P1 0–2 | P2 2–4 | P3 4–5 | P4 5–7 | P1 7–9 | P2 9–10 | P1 10–11",
     "P4 arrives at 4, after P1 re-entered the queue at 2, so P1 runs before P4."
    ]
   ],
   "a": 0
  },
  {
   "q": "For that RR schedule (q = 2; P1 (0, 5), P2 (1, 3), P3 (2, 1), P4 (4, 2)), the average waiting time is:",
   "o": [
    [
     "3.75",
     "This is FCFS on the same data (0, 4, 6, 5 → 15/4)."
    ],
    [
     "4.5",
     "This comes from queueing the preempted process before the new arrival (6, 4, 4, 4 → 18/4)."
    ],
    [
     "7",
     "This is the average turnaround time (11 + 9 + 3 + 5)/4."
    ],
    [
     "4.25",
     "Correct. CT 11, 10, 5, 9 → TAT 11, 9, 3, 5 → WT = TAT − BT = 6, 6, 2, 3 → 17/4 = 4.25. (L3, Round Robin)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Non-preemptive priority (smallest number = highest priority), all at time 0. (Burst/priority): P1 6/4, P2 2/2, P3 4/1, P4 3/3. Average waiting time?",
   "o": [
    [
     "6.5",
     "This takes the largest number as the highest priority (P1, P4, P2, P3 → 0, 6, 9, 11)."
    ],
    [
     "4",
     "This is SJF on the same bursts (P2, P4, P3, P1), not priority."
    ],
    [
     "4.75",
     "Correct. Order P3 (1), P2 (2), P4 (3), P1 (4): P3 0–4 | P2 4–6 | P4 6–9 | P1 9–15 → WT 9, 4, 0, 6 → 19/4 = 4.75. (L3, Priority scheduling)"
    ],
    [
     "8.5",
     "This is the average turnaround time (15 + 6 + 4 + 9)/4."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Preemptive</b> priority (smallest number = highest) with (arrival, burst, priority): P1 (0, 5, 3), P2 (1, 3, 1), P3 (2, 4, 4), P4 (3, 2, 2). Average waiting time?",
   "o": [
    [
     "4.25",
     "This is the non-preemptive version (P1 0–5 | P2 5–8 | P4 8–10 | P3 10–14)."
    ],
    [
     "3.5",
     "Correct. P1 0–1 | P2 1–4 | P4 4–6 | P1 6–10 | P3 10–14 (P2 preempts P1 at 1); WT 5, 0, 8, 1 → 14/4 = 3.5. (L3, Priority scheduling)"
    ],
    [
     "7",
     "This is the average turnaround time (10 + 3 + 12 + 3)/4."
    ],
    [
     "2.25",
     "This is the average response time (0, 0, 8, 1 → 9/4)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Priority with Round-Robin, q = 2, all at 0. (Burst/priority): P1 3/2, P2 4/1, P3 5/2, P4 2/3. Average waiting time?",
   "o": [
    [
     "5.75",
     "This runs P1 and P3 one after the other (no RR between equal priorities)."
    ],
    [
     "9.75",
     "This is the average turnaround time (9 + 4 + 12 + 14)/4."
    ],
    [
     "5.5",
     "This is the average response time (4, 0, 6, 12 → 22/4)."
    ],
    [
     "6.25",
     "Correct. P2 0–4 | P1 4–6 | P3 6–8 | P1 8–9 | P3 9–12 | P4 12–14; WT = CT − burst = 6, 0, 7, 12 → 25/4 = 6.25. (L3, Priority with RR)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Processes P1 = 12, P2 = 5, P3 = 4 arrive at 0 in that order. With RR and q = 15, the average waiting time is:",
   "o": [
    [
     "9.67",
     "Correct. q (15) is larger than every burst, so RR behaves like FCFS: WT 0, 12, 17 → 29/3 = 9.67. (L3, Round Robin)"
    ],
    [
     "8",
     "This is RR with q = 5 (P1 0–5 | P2 5–10 | P3 10–14 | P1 14–21 → 9, 5, 10)."
    ],
    [
     "4.33",
     "This is SJF (P3, P2, P1 → 0, 4, 9 → 13/3)."
    ],
    [
     "16.67",
     "This is the FCFS average turnaround time (12 + 17 + 21)/3."
    ]
   ],
   "a": 0
  },
  {
   "q": "Same processes (P1 = 12, P2 = 5, P3 = 4, all at 0). Rank FCFS, RR (q = 5) and SJF by average waiting time:",
   "o": [
    [
     "FCFS &lt; RR (q = 5) &lt; SJF",
     "Reversed: FCFS is the worst here (9.67) and SJF the best (4.33)."
    ],
    [
     "RR (q = 5) &lt; SJF &lt; FCFS",
     "RR gives 8, which is more than SJF's 4.33; SJF is optimal."
    ],
    [
     "SJF &lt; RR (q = 5) &lt; FCFS",
     "Correct. SJF 4.33 &lt; RR 8 &lt; FCFS 9.67; SJF always gives the minimum average waiting time. (L3, SJF)"
    ],
    [
     "SJF &lt; FCFS &lt; RR (q = 5)",
     "FCFS (9.67) is worse than RR (8) here because short P2 and P3 wait behind P1 (convoy effect)."
    ]
   ],
   "a": 2
  },
  {
   "q": "Round Robin with 4 processes in the ready queue. If no process may wait more than 60 ms before its next turn, the time quantum q is:",
   "o": [
    [
     "15 ms",
     "60/4 divides by n; the bound is (n − 1)q, so divide by 3."
    ],
    [
     "20 ms",
     "Correct. (n − 1)q = 60 → 3q = 60 → q = 20 ms. (L3, Round Robin)"
    ],
    [
     "60 ms",
     "60 ms is the maximum wait itself, not the quantum."
    ],
    [
     "240 ms",
     "240 = 4 × 60 multiplies instead of dividing."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's multilevel feedback queue (Q0 = RR q = 8 ms, Q1 = RR q = 16 ms, Q2 = FCFS), a new process needs a 20 ms CPU burst. How is it served?",
   "o": [
    [
     "8 ms in Q0, then it finishes with 12 ms in Q1",
     "Correct. It enters Q0 and gets 8 ms; not finished, it moves to Q1, where the remaining 12 ms fit in the 16 ms quantum. (L3, Multilevel feedback queue)"
    ],
    [
     "8 ms in Q0, 8 ms in Q1, then 4 ms in Q2",
     "Q1's quantum is 16 ms, not 8, so the 12 remaining ms finish in Q1."
    ],
    [
     "All 20 ms in Q0",
     "Q0 gives only 8 ms; then the process is moved down to Q1."
    ],
    [
     "8 ms in Q0, 16 ms in Q1, the rest in Q2",
     "That needs a burst over 24 ms; this one is done after 8 + 12 = 20 ms."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the review problem (P1 10, P2 3, P3 2, P4 1, all at 0), every schedule finishes all 4 processes by time 16. The <b>throughput</b> is:",
   "o": [
    [
     "4 processes",
     "Throughput is a rate per time unit, not a count of processes."
    ],
    [
     "16 time units",
     "16 is the total time, not processes per time unit."
    ],
    [
     "4 processes per time unit",
     "4 processes took 16 units, not 1 unit."
    ],
    [
     "0.25 processes per time unit",
     "Correct. Throughput = processes completed per time unit = 4/16 = 0.25. (L3, Scheduling criteria)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In which two of the four scheduling situations does the scheduler have a <b>choice</b>?",
   "o": [
    [
     "Running → waiting, and terminates",
     "These are situations 1 and 4, where there is no choice: a new process must be selected."
    ],
    [
     "New → ready, and ready → running",
     "These are the admitted and scheduler-dispatch arrows, not among the four decision situations."
    ],
    [
     "Running → ready, and waiting → ready",
     "Correct. Situations 2 and 3 offer a choice; scheduling in them makes the scheduler preemptive. (L3, Basic concepts)"
    ],
    [
     "Only when a process terminates",
     "Termination is situation 4, which has no choice."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the process-state diagram, a <b>running</b> process goes back to <b>ready</b> because of ………",
   "o": [
    [
     "an interrupt",
     "Correct. The running → ready arrow is labelled interrupt. (L3, Basic concepts)"
    ],
    [
     "I/O or event wait",
     "That arrow goes running → waiting."
    ],
    [
     "scheduler dispatch",
     "That arrow goes ready → running."
    ],
    [
     "I/O or event completion",
     "That arrow goes waiting → ready."
    ]
   ],
   "a": 0
  },
  {
   "q": "……… is the time it takes for the dispatcher to stop one process and start another running.",
   "o": [
    [
     "Response time",
     "Response time runs from submission of a request to the first response."
    ],
    [
     "Dispatch latency",
     "Correct. Dispatch latency covers saving state into PCB0 and restoring state from PCB1. (L3, Dispatcher)"
    ],
    [
     "Waiting time",
     "Waiting time is the time a process spends in the ready queue."
    ],
    [
     "Time quantum",
     "The time quantum is the CPU slice each process gets in RR."
    ]
   ],
   "a": 1
  },
  {
   "q": "……… is the time from the submission of a request until the first response is produced.",
   "o": [
    [
     "Turnaround time",
     "Turnaround time runs from submission to completion, not to the first response."
    ],
    [
     "Waiting time",
     "Waiting time counts only the time spent in the ready queue."
    ],
    [
     "Dispatch latency",
     "Dispatch latency is the dispatcher's time to switch between two processes."
    ],
    [
     "Response time",
     "Correct. Response time = first response − submission, and it should be minimized. (L3, Scheduling criteria)"
    ]
   ],
   "a": 3
  },
  {
   "q": "The <b>convoy effect</b>, where short processes wait behind one long process, is a weakness of:",
   "o": [
    [
     "FCFS",
     "Correct. In FCFS, order 24, 3, 3 gives average WT 17, while 3, 3, 24 gives only 3. (L3, FCFS)"
    ],
    [
     "SRTF",
     "SRTF lets a shorter arrival preempt the long job, so short ones do not get stuck."
    ],
    [
     "Round Robin",
     "RR gives every process a quantum in turn, so short jobs finish early."
    ],
    [
     "SJF",
     "SJF runs the short jobs first, so they never wait behind a long one."
    ]
   ],
   "a": 0
  },
  {
   "q": "According to the lecture, the main difficulty with SJF is:",
   "o": [
    [
     "too many context switches",
     "That is the problem of RR with a very small quantum."
    ],
    [
     "the convoy effect",
     "The convoy effect belongs to FCFS; SJF avoids it."
    ],
    [
     "knowing the length of the next CPU burst",
     "Correct. SJF needs the next burst length, so you ask the user or estimate it. (L3, SJF)"
    ],
    [
     "race conditions on shared data",
     "Race conditions come from preemption in general, not the specific difficulty of SJF."
    ]
   ],
   "a": 2
  },
  {
   "q": "SJF is a priority scheduling algorithm in which the priority is:",
   "o": [
    [
     "the arrival time of the process",
     "Ordering by arrival time is FCFS."
    ],
    [
     "the inverse of the predicted next CPU burst",
     "Correct. The shorter the predicted next burst, the higher the priority. (L3, Priority scheduling)"
    ],
    [
     "the time quantum of its queue",
     "The quantum belongs to RR and multilevel feedback queues, not SJF."
    ],
    [
     "the time it has waited, increased by aging",
     "That describes aging, the fix for starvation."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is NOT one of the things that define a multilevel feedback queue scheduler?",
   "o": [
    [
     "The number of queues",
     "This is one of the defining parameters."
    ],
    [
     "The method used to demote a process",
     "This is one of the defining parameters."
    ],
    [
     "The scheduling algorithm of each queue",
     "This is one of the defining parameters."
    ],
    [
     "The dispatch latency of the CPU",
     "Correct. The scheduler is defined by the number of queues, each queue's algorithm, the upgrade and demote methods, and the method to choose the entry queue. (L3, Multilevel feedback queue)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In RR, making the time quantum <b>very small</b> leads to:",
   "o": [
    [
     "behaviour like FCFS",
     "That happens when q is very large."
    ],
    [
     "too many context switches",
     "Correct. q must be large compared to the context-switch time (a switch takes under 10 µs). (L3, Round Robin)"
    ],
    [
     "starvation of long processes",
     "RR serves every process in turn, so it does not starve any process."
    ],
    [
     "the minimum average waiting time",
     "The minimum average waiting time is given by SJF, not by a small quantum."
    ]
   ],
   "a": 1
  },
  {
   "q": "The CPU scheduler selects the next process to run from the ………",
   "o": [
    [
     "wait queue",
     "Processes in the waiting state are waiting for I/O or an event, not for the CPU."
    ],
    [
     "PCB",
     "The PCB holds a process's saved state; the dispatcher uses it during a switch."
    ],
    [
     "new state",
     "New processes must first be admitted to the ready queue before they can be scheduled."
    ],
    [
     "ready queue",
     "Correct. The CPU scheduler picks a process from the ready queue and allocates a CPU core to it. (L3, Basic concepts)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In the CPU–I/O burst cycle figure, the block <i>wait for I/O</i> is labelled:",
   "o": [
    [
     "I/O burst",
     "Correct. Each wait for I/O block is an I/O burst between two CPU bursts. (L3, Basic concepts)"
    ],
    [
     "CPU burst",
     "CPU bursts are the computing blocks such as load store, add store."
    ],
    [
     "dispatch latency",
     "Dispatch latency belongs to the dispatcher figure, not the burst cycle."
    ],
    [
     "time quantum",
     "The time quantum belongs to Round Robin."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"In situations 1 (running → waiting) and 4 (terminates), the scheduler has a choice about whether to schedule.\"",
   "o": [
    [
     "True",
     "There is no choice in these two cases: a new process must be selected."
    ],
    [
     "False",
     "Correct. In situations 1 and 4 there is no choice; the choice exists only in 2 and 3. (L3, Basic concepts)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"FCFS is a preemptive scheduling algorithm.\"",
   "o": [
    [
     "True",
     "FCFS never takes the CPU away from a running process."
    ],
    [
     "False",
     "Correct. FCFS is non-preemptive: a process keeps the CPU until it terminates or waits. (L3, FCFS)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"In Round Robin with n processes and quantum q, no process waits more than n × q time units.\"",
   "o": [
    [
     "True",
     "The bound in the lecture is (n − 1)q, not nq."
    ],
    [
     "False",
     "Correct. The lecture's bound is (n − 1)q: the process waits for the other n − 1 processes only. (L3, Round Robin)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"RR typically gives a higher average turnaround time than SJF, but better response.\"",
   "o": [
    [
     "True",
     "Correct. This is exactly the lecture's performance note on RR. (L3, Round Robin)"
    ],
    [
     "False",
     "The lecture states RR has higher average turnaround than SJF but better response."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"In this course's priority scheduling, a larger priority number means a higher priority.\"",
   "o": [
    [
     "True",
     "The convention is the opposite: the smallest integer is the highest priority."
    ],
    [
     "False",
     "Correct. Smallest integer = highest priority (e.g. P2 with priority 1 runs first). (L3, Priority scheduling)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"Aging can be implemented using a multilevel feedback queue.\"",
   "o": [
    [
     "True",
     "Correct. Moving a waiting process up to a higher queue is aging. (L3, Multilevel feedback queue)"
    ],
    [
     "False",
     "The lecture says aging can be implemented using a multilevel feedback queue."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"In a plain multilevel queue, a process can move between queues.\"",
   "o": [
    [
     "True",
     "Moving between queues is what defines the multilevel feedback queue."
    ],
    [
     "False",
     "Correct. Only the multilevel feedback queue lets a process be upgraded or demoted. (L3, Multilevel queue)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"Round Robin can cause starvation.\"",
   "o": [
    [
     "True",
     "RR gives every process a quantum in turn, so none waits forever."
    ],
    [
     "False",
     "Correct. FCFS and RR do not starve; SJF and priority can, and aging fixes it. (L3, Priority scheduling)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"Windows, macOS, Linux and UNIX all use preemptive scheduling.\"",
   "o": [
    [
     "True",
     "Correct. Virtually all modern operating systems use preemptive scheduling. (L3, Preemptive vs non-preemptive)"
    ],
    [
     "False",
     "The lecture lists Windows, macOS, Linux and UNIX as preemptive."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"In RR, when a quantum expires at the same instant a new process arrives, the preempted process is queued before the new arrival.\"",
   "o": [
    [
     "True",
     "The course convention is the reverse: the new arrival is queued first."
    ],
    [
     "False",
     "Correct. The new arrival goes first and the preempted process goes behind it. (L3, Round Robin)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"When all processes arrive at time 0, the waiting time of each process in a non-preemptive schedule equals its start time.\"",
   "o": [
    [
     "True",
     "Correct. It waits from 0 until it starts and is never interrupted, so WT = start time (e.g. 0, 24, 27 in FCFS). (L3, Scheduling criteria)"
    ],
    [
     "False",
     "With arrival 0 and no preemption, the only wait is before the process starts."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Throughput and CPU utilization should be maximized, while waiting time should be minimized.\"",
   "o": [
    [
     "True",
     "Correct. CPU utilization and throughput are maximized; turnaround, waiting and response time are minimized. (L3, Scheduling criteria)"
    ],
    [
     "False",
     "The lecture lists exactly these directions for the criteria."
    ]
   ],
   "a": 0
  }
 ],
 "4": [
  {
   "q": "<b>Applied.</b> A process has base register = 2000 and limit register = 500. Which user-mode address causes a trap (addressing error)?",
   "o": [
    [
     "2000",
     "Legal: the check is base ≤ address, and 2000 = base."
    ],
    [
     "2250",
     "Legal: 2000 ≤ 2250 &lt; 2000 + 500 = 2500, so it passes both the base and the limit checks and does not trap (Topic 4, base and limit registers)."
    ],
    [
     "2499",
     "Legal: it is the last address before base + limit = 2500."
    ],
    [
     "2500",
     "Correct. Legal addresses satisfy base ≤ address &lt; base + limit = 2500, so 2500 is outside the range and traps."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> The MMU has relocation register = 5000 and limit register = 300. The process issues logical address 250. What happens?",
   "o": [
    [
     "Physical address 250 is accessed",
     "The user's logical address is never sent to memory unchanged; the relocation value is added."
    ],
    [
     "Physical address 5250 is accessed",
     "Correct. 250 &lt; 300 (limit), so physical = 250 + 5000 = 5250."
    ],
    [
     "A trap occurs, because 5250 is larger than the limit",
     "The limit is compared with the logical address (250 &lt; 300), not with the physical address."
    ],
    [
     "Physical address 5300 is accessed",
     "That adds the limit, not the offset: physical = logical + relocation."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Page size = 512 bytes. Page table: page 0 → frame 5, page 1 → frame 2, page 2 → frame 7, page 3 → frame 0. What is the physical address of logical address 1100?",
   "o": [
    [
     "3660",
     "Correct. p = 1100 DIV 512 = 2, d = 1100 MOD 512 = 76; frame(2) = 7 → 7 × 512 + 76 = 3660."
    ],
    [
     "3584",
     "That is the start of frame 7. The offset 76 still has to be added."
    ],
    [
     "2636",
     "That uses frame 5 (page 0's frame). The page number is 2, not 0."
    ],
    [
     "1100",
     "With paging the logical address is translated; it equals the physical address only if page 2 were in frame 2."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> A logical address space has 2<sup>13</sup> bytes and the page size is 512 bytes. How are the logical address bits split?",
   "o": [
    [
     "9-bit page number, 4-bit offset",
     "Reversed: the offset needs n = 9 bits to address 512 = 2⁹ bytes inside a page."
    ],
    [
     "4-bit page number, 9-bit offset",
     "Correct. m = 13, n = 9: the page number is the high m − n = 4 bits (16 pages) and the offset is the low 9 bits."
    ],
    [
     "13-bit page number, 9-bit offset",
     "The two fields together must equal the 13-bit address, so the page number is only 13 − 9 bits."
    ],
    [
     "4-bit page number, 13-bit offset",
     "The offset only covers one page (2⁹ bytes), not the whole address space."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Page size = 1,024 bytes and a process needs 5,000 bytes. How many frames does it get, and how much internal fragmentation is there?",
   "o": [
    [
     "4 frames, 904 bytes",
     "4 frames only hold 4,096 bytes; the remaining 904 bytes need a 5th frame. And 904 is the used part of the last page, not the waste."
    ],
    [
     "5 frames, 904 bytes",
     "5 frames is right, but 904 bytes is how much of the last frame is used. The waste is 1,024 − 904."
    ],
    [
     "5 frames, 120 bytes",
     "Correct. 5,000 = 4 × 1,024 + 904, so 5 frames; internal fragmentation = 1,024 − 904 = 120 bytes."
    ],
    [
     "5 frames, 0 bytes",
     "Paging has no external fragmentation, but the last page usually has internal fragmentation."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Holes in order: 150, 400, 250, 600 KB. Processes arrive in order: 350, 200, 300 KB. Which strategy <b>fails</b> to place all three?",
   "o": [
    [
     "First-fit only",
     "First-fit places 350 → 400, 200 → 250, 300 → 600: all placed."
    ],
    [
     "Best-fit only",
     "Best-fit places 350 → 400, 200 → 250, 300 → 600: all placed."
    ],
    [
     "None of them; all three strategies place every process",
     "Worst-fit runs out of a big enough hole for the 300 KB process."
    ],
    [
     "Worst-fit only",
     "Correct. 350 → 600 (250 left), 200 → 400 (200 left); the holes are now 150, 200, 250, 250, so 300 KB must wait."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> A segment table has STLR = 4. Segment 3 has base 900 and limit 200. Which logical address is translated <b>without</b> a trap?",
   "o": [
    [
     "(4, 10)",
     "Segment number 4 is not legal: s must be &lt; STLR = 4, so this traps even though the offset is small."
    ],
    [
     "(3, 150) → physical 1050",
     "Correct. s = 3 &lt; 4 and d = 150 &lt; 200, so physical = 900 + 150 = 1050."
    ],
    [
     "(3, 200) → physical 1100",
     "The offset must be strictly less than the limit; 200 is not &lt; 200, so it traps."
    ],
    [
     "(3, 250) → physical 1150",
     "250 ≥ limit 200, so this is an addressing error."
    ]
   ],
   "a": 1
  },
  {
   "q": "At which address-binding stage is <b>absolute code</b> produced, so the program must be recompiled if its start location changes?",
   "o": [
    [
     "Compile time",
     "Correct. If the memory location is known a priori, the compiler generates absolute code; changing the start location means recompiling."
    ],
    [
     "Load time",
     "Load-time binding generates relocatable code, because the location is not known at compile time."
    ],
    [
     "Execution time",
     "Execution-time binding delays binding until run time, so the process can even move while running."
    ],
    [
     "Link time with dynamic loading",
     "Dynamic loading is about loading a routine only when it is called; it is not a binding stage that produces absolute code."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Compaction can be used to reduce external fragmentation only if relocation is dynamic and done at execution time.\"",
   "o": [
    [
     "True",
     "Correct. Compaction moves processes in memory, which is only possible when their addresses are bound at execution time."
    ],
    [
     "False",
     "With compile-time or load-time binding a process cannot be moved, so compaction is not possible."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Dynamic loading needs special support from the operating system to work.\"",
   "o": [
    [
     "True",
     "The lecture says dynamic loading needs no special OS support; the OS may only help by providing libraries."
    ],
    [
     "False",
     "Correct. It is implemented through program design: a routine is loaded only when it is called. The OS can help by providing libraries."
    ]
   ],
   "a": 1
  }
 ],
 "5": [
  {
   "q": "<b>Applied.</b> Reference string 1, 3, 0, 3, 5, 6, 3, 1, 0, 2 with <b>3 frames</b>, initially empty. How many page faults does <b>FIFO</b> cause?",
   "o": [
    [
     "7",
     "7 is the Optimal count for this string, which evicts the page used farthest in the future; FIFO evicts by load time and makes 9 faults (Topic 5)."
    ],
    [
     "8",
     "That is the LRU count. FIFO evicts by load time and throws out page 3 just before it is needed again."
    ],
    [
     "10",
     "This counts every reference. The second reference to 3 (position 4) is a hit."
    ],
    [
     "9",
     "Correct. Faults on 1, 3, 0, (3 hit), 5 (evict 1), 6 (evict 3), 3 (evict 0), 1 (evict 5), 0 (evict 6), 2 (evict 3) = 9."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> Same string 1, 3, 0, 3, 5, 6, 3, 1, 0, 2 with 3 frames. How many page faults does <b>LRU</b> cause?",
   "o": [
    [
     "8",
     "Correct. 1, 3, 0 fault; 3 hit; 5 evicts 1; 6 evicts 0; 3 hit; 1 evicts 5; 0 evicts 6; 2 evicts 3 → 8 faults."
    ],
    [
     "9",
     "That is FIFO. LRU keeps page 3 because it was used recently, so the 7th reference is a hit."
    ],
    [
     "7",
     "That is Optimal, which looks into the future; LRU only uses the past."
    ],
    [
     "6",
     "This leaves out the 3 faults that fill the empty frames at the start. They count as faults."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> Same string 1, 3, 0, 3, 5, 6, 3, 1, 0, 2 with 3 frames. How many page faults does <b>Optimal</b> cause?",
   "o": [
    [
     "8",
     "That is LRU. When 5 arrives, Optimal evicts 0 (used farthest in the future), not 1."
    ],
    [
     "9",
     "9 is FIFO's count for this string: it evicts by load time (e.g. throws out 3 just before it is needed); Optimal gives 7 (Topic 5)."
    ],
    [
     "7",
     "Correct. 1, 3, 0 fault; 3 hit; 5 evicts 0 (next used last); 6 evicts 5 (never used again); 3 and 1 hit; 0 and 2 fault → 7."
    ],
    [
     "4",
     "This forgets the initial fills: the first 3 references to empty frames are faults too."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Second-chance (clock) algorithm. The FIFO order (oldest first) with reference bits is: A (1), B (1), C (0), D (1). A page must be replaced. Which page is the victim?",
   "o": [
    [
     "A, because it is the oldest",
     "A's bit is 1, so it gets a second chance: its bit is cleared and it stays."
    ],
    [
     "D, because it was loaded last",
     "The algorithm starts from the oldest page, and D's bit is 1 anyway."
    ],
    [
     "C",
     "Correct. A and B have bit 1, so each is set to 0 and skipped; C has bit 0, so it is replaced."
    ],
    [
     "B, after A's bit is cleared",
     "B's bit is also 1, so it also gets a second chance."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Pages in memory with reference counts: P = 5, Q = 2, R = 9. Which page does <b>MFU</b> replace, and which does <b>LFU</b> replace?",
   "o": [
    [
     "MFU replaces Q, LFU replaces R",
     "Reversed: LFU removes the smallest count and MFU the largest."
    ],
    [
     "MFU replaces R, LFU replaces Q",
     "Correct. MFU removes the largest count (R = 9); LFU removes the smallest count (Q = 2)."
    ],
    [
     "Both replace Q",
     "Only LFU picks the smallest count. MFU argues the smallest-count page was probably just brought in."
    ],
    [
     "Both replace R",
     "Only MFU picks the largest count (R = 9); LFU replaces the page with the smallest count, which is Q = 2 (Topic 5, Counting Algorithms)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the basic page-fault handling, after the page has been read into a free frame, what are the last two steps?",
   "o": [
    [
     "Restart the instruction, then set the validation bit to v",
     "The order is wrong: the tables must show the page is in memory before the instruction is restarted, or it would fault again."
    ],
    [
     "Abort the process, then free the frame",
     "Abort only happens for an invalid reference, found in step 1."
    ],
    [
     "Set the validation bit to i, then restart the instruction",
     "i means \"not in memory\". After loading, the bit must be set to v."
    ],
    [
     "Reset the tables (validation bit = v), then restart the instruction that caused the fault",
     "Correct. These are steps 4 and 5 of the lecture's page-fault handling."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: \"LRU can suffer from Belady's anomaly, just like FIFO.\"",
   "o": [
    [
     "True",
     "The lecture states LRU and OPT are stack algorithms and never suffer from Belady's anomaly."
    ],
    [
     "False",
     "Correct. Belady's anomaly (more frames → more faults) affects FIFO. LRU and OPT are stack algorithms and are immune."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"When counting page faults on a reference string, loading a page into an empty frame at the start does not count as a fault.\"",
   "o": [
    [
     "True",
     "Every empty-frame fill at the start is also a page fault, because the page was not in memory."
    ],
    [
     "False",
     "Correct. The lecture counts every initial fill as a fault; only repeated access to a page already in memory is not a fault."
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the trade-off of the <b>stack</b> implementation of LRU?",
   "o": [
    [
     "Each reference is more expensive (up to 6 pointer changes), but no search is needed to find the victim",
     "Correct. The referenced page moves to the top of a doubly-linked stack, and the LRU page is always at the bottom."
    ],
    [
     "Each reference only copies the clock, but replacement needs a search for the smallest counter",
     "Copying the clock on each reference and searching for the smallest counter at replacement is the counter implementation, the stack's opposite trade-off (Topic 5)."
    ],
    [
     "It needs no hardware help and is identical to FIFO",
     "A stack ordered by recent use is LRU, not FIFO; FIFO orders by load time."
    ],
    [
     "It only knows which pages were referenced, not in which order",
     "That is the limitation of the single reference bit."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the worst-case stages of demand paging, what does the OS do while the process waits for its page to be read from disk?",
   "o": [
    [
     "Busy-waits until the disk transfer completes",
     "Wasteful: the lecture's stage 6 gives the CPU to another user during the wait."
    ],
    [
     "Allocates the CPU to some other user",
     "Correct. Stage 6: while waiting, allocate the CPU to some other user; the disk interrupt (stage 7) signals completion later."
    ],
    [
     "Restarts the faulting instruction right away",
     "The instruction can only be restarted after the page is in memory and the tables are corrected."
    ],
    [
     "Terminates the process to free its frames",
     "A legal page fault is a normal event; the process is resumed, not terminated."
    ]
   ],
   "a": 1
  }
 ],
 "6": [
  {
   "q": "<b>Applied.</b> Use this snapshot (resources A B C, totals A = 6, B = 4, C = 5):<br><table><tr><th>Process</th><th>Allocation</th><th>Max</th></tr><tr><td>P0</td><td>1 0 1</td><td>3 2 2</td></tr><tr><td>P1</td><td>2 1 0</td><td>2 2 1</td></tr><tr><td>P2</td><td>0 1 1</td><td>4 1 3</td></tr><tr><td>P3</td><td>1 1 0</td><td>1 3 2</td></tr></table>What is the <b>Need</b> of P2?",
   "o": [
    [
     "(4, 2, 4)",
     "This adds Allocation to Max. Need = Max − Allocation."
    ],
    [
     "(4, 0, 2)",
     "Correct. Need = Max − Allocation, so for P2: (4, 1, 3) − (0, 1, 1) = (4, 0, 2) (Topic 6, Banker's Algorithm)."
    ],
    [
     "(4, 1, 3)",
     "That is P2's Max. It already holds (0, 1, 1), which must be subtracted."
    ],
    [
     "(−4, 0, −2)",
     "The subtraction is reversed (Allocation − Max)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Same snapshot (totals A = 6, B = 4, C = 5; Allocation P0 1 0 1, P1 2 1 0, P2 0 1 1, P3 1 1 0). What is the <b>Available</b> vector?",
   "o": [
    [
     "(4, 3, 2)",
     "That is the sum of the Allocation columns. Available = Total − that sum."
    ],
    [
     "(6, 4, 5)",
     "Those are the totals; some instances are already allocated."
    ],
    [
     "(2, 1, 3)",
     "Correct. The Allocation columns sum to (1+2+0+1, 0+1+1+1, 1+0+1+0) = (4, 3, 2), so Available = (6, 4, 5) − (4, 3, 2) = (2, 1, 3) (Topic 6)."
    ],
    [
     "(2, 2, 1)",
     "(2, 2, 1) is P0's Need, (3, 2, 2) − (1, 0, 1); Available is Total minus all allocations: (6, 4, 5) − (4, 3, 2) = (2, 1, 3) (Topic 6)."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Same snapshot: Available = (2, 1, 3); Need P0 (2, 2, 1), P1 (0, 1, 1), P2 (4, 0, 2), P3 (0, 2, 2). Which is a <b>safe sequence</b>?",
   "o": [
    [
     "&lt;P0, P1, P2, P3&gt;",
     "P0 cannot go first: it needs 2 of B but only 1 is available."
    ],
    [
     "&lt;P2, P1, P3, P0&gt;",
     "P2 cannot go first: it needs 4 of A but only 2 are available."
    ],
    [
     "&lt;P3, P1, P2, P0&gt;",
     "P3 cannot go first: it needs 2 of B but only 1 is available."
    ],
    [
     "&lt;P1, P2, P3, P0&gt;",
     "Correct. P1 → Work (4, 2, 3); P2 → (4, 3, 4); P3 → (5, 4, 4); P0 → (6, 4, 5). Everyone finishes, so the state is safe."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> Same snapshot (Available (2, 1, 3)). P0 now requests (1, 1, 0). What does the banker's algorithm decide?",
   "o": [
    [
     "Grant it, because the request ≤ Need and ≤ Available",
     "Those checks pass, but the pretend state must also be safe, and it is not."
    ],
    [
     "Error, because the request exceeds P0's maximum claim",
     "Request (1, 1, 0) ≤ Need (2, 2, 1), so it does not exceed the claim."
    ],
    [
     "P0 must wait: the pretend state is unsafe",
     "Correct. Pretend: Available (1, 0, 3), Need P0 (1, 1, 1). With B = 0, no process (P0, P1, P3 all need B; P2 needs 4 A) can finish, so the old state is restored and P0 waits."
    ],
    [
     "Grant it, because the system was safe before the request",
     "Safety must be checked on the new state after the pretend allocation, not on the old one."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> Detection algorithm, resources A B, Available (0, 0).<br>Allocation: P0 (1, 0), P1 (1, 1), P2 (1, 1). Request: P0 (0, 1), P1 (1, 0), P2 (0, 0).<br>What is the result?",
   "o": [
    [
     "No deadlock: &lt;P2, P0, P1&gt; can finish",
     "Correct. P2 requests nothing → Work (1, 1); P0 (0, 1) ✓ → (2, 1); P1 (1, 0) ✓ → (3, 2). All Finish = true."
    ],
    [
     "P0 and P1 are deadlocked",
     "They would be stuck only if P2 never released its resources; P2's request is (0, 0), so it finishes first."
    ],
    [
     "All three are deadlocked, since Available is (0, 0)",
     "Available = 0 does not mean deadlock: a process with Request ≤ Work (P2) can still finish and release."
    ],
    [
     "Only P2 is deadlocked",
     "P2 needs nothing more, so it is the first to finish."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"If a resource-allocation graph contains a cycle, the system is definitely deadlocked.\"",
   "o": [
    [
     "True",
     "Only with a single instance per resource type. With several instances a cycle means only a possibility (the lecture's P2/P4 example)."
    ],
    [
     "False",
     "Correct. A cycle with several instances per type only means deadlock is possible; e.g. P2 and P4 can release and break the cycle."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Circular-wait prevention with F(tape drive) = 1, F(disk drive) = 5, F(printer) = 12. A process already holds the <b>disk drive</b>. Which request is allowed next?",
   "o": [
    [
     "The tape drive",
     "F(tape) = 1 &lt; 5. Requests must be in increasing order, so it cannot ask for the tape while holding the disk."
    ],
    [
     "The tape drive and the printer together",
     "The tape part still breaks the increasing order."
    ],
    [
     "Any resource, as long as it is free",
     "Then circular wait would not be prevented. Requests must follow the total ordering."
    ],
    [
     "The printer",
     "Correct. F(printer) = 12 > F(disk) = 5, so the request is in increasing order of enumeration."
    ]
   ],
   "a": 3
  },
  {
   "q": "To prevent the <b>no-preemption</b> condition, a process that cannot get a resource releases everything it holds. To which resources does this approach apply?",
   "o": [
    [
     "Resources whose state is easily saved and restored, such as CPU registers and memory space",
     "Correct. The lecture limits this method to such resources."
    ],
    [
     "Non-sharable resources such as printers in the middle of a job",
     "Taking a printer in mid-job cannot be undone cleanly; its state is not easily saved."
    ],
    [
     "Only read-only files",
     "Read-only files are sharable, which is about mutual exclusion, not preemption."
    ],
    [
     "Every resource type in the system",
     "The lecture restricts it to resources whose state can be saved and restored."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Searching a wait-for graph with n vertices for a cycle costs O(n²) operations.\"",
   "o": [
    [
     "True",
     "Correct. The lecture gives O(n²) for cycle detection in the wait-for graph (single instance of each resource type)."
    ],
    [
     "False",
     "The lecture states cycle detection requires O(n²) operations for n vertices."
    ]
   ],
   "a": 0
  },
  {
   "q": "In recovery by resource preemption, how does the system stop the same process from always being chosen as the victim?",
   "o": [
    [
     "It aborts all deadlocked processes at once",
     "That is recovery by process termination, not a fix for victim starvation."
    ],
    [
     "It rolls the victim back to the very beginning every time",
     "Rollback is a separate issue; it does not stop the same victim being picked again."
    ],
    [
     "It includes the number of rollbacks in the cost factor",
     "Correct. Counting rollbacks in the cost stops the same process from starving."
    ],
    [
     "It uses aging on the CPU priority",
     "Aging is the solution to starvation in CPU scheduling (Lecture 3), not the one given for victim selection."
    ]
   ],
   "a": 2
  }
 ],
 "7": [
  {
   "q": "<b>Applied.</b> After <code>chmod 754 notes</code>, what may the <b>group</b> do with the file?",
   "o": [
    [
     "Read, write and execute",
     "Read, write, execute is 7 = 111, the owner's digit in 754; the group digit is 5 = 101 (Topic 7)."
    ],
    [
     "Read only",
     "Read only is 4 = 100, the public digit in 754; the group digit is 5 = 101 = R-X (Topic 7)."
    ],
    [
     "Read and execute",
     "Correct. In 754 the digits are owner, group, public; group = 5 = 101 in binary = R-X, so the group may read and execute but not write (Topic 7, Access Lists and Groups)."
    ],
    [
     "Read and write",
     "That would be 6 = 110, but the group digit here is 5."
    ]
   ],
   "a": 2
  },
  {
   "q": "<b>Applied.</b> A file should give the owner read and write, the group read only, and the public nothing. Which chmod value is this?",
   "o": [
    [
     "640",
     "Correct. Owner RW- = 110 = 6, group R-- = 100 = 4, public --- = 000 = 0."
    ],
    [
     "620",
     "2 = 010 is write only, not read only, for the group."
    ],
    [
     "460",
     "The digits are in the order owner, group, public; here the owner and group are swapped."
    ],
    [
     "750",
     "7 gives the owner execute too, and 5 gives the group execute."
    ]
   ],
   "a": 0
  },
  {
   "q": "<b>Applied.</b> With contiguous allocation, a directory entry for file <code>data</code> says start = 20, length = 5. Which disk block holds the <b>4th</b> block of the file?",
   "o": [
    [
     "24",
     "Off by one: the blocks are 20, 21, 22, 23, 24, so 24 is the 5th (last) block."
    ],
    [
     "3",
     "That is the block's position inside the file. It must be added to the start block."
    ],
    [
     "25",
     "25 is past the end of the file (start + length)."
    ],
    [
     "23",
     "Correct. The file occupies 20–24; the 4th block is start + 3 = 23. This easy direct access is why contiguous allocation performs well."
    ]
   ],
   "a": 3
  },
  {
   "q": "<b>Applied.</b> In a FAT volume, a directory entry has start block 5. FAT[5] = 12, FAT[12] = 3, FAT[3] = −1. Which is true?",
   "o": [
    [
     "The file has 2 blocks and ends at block 12",
     "The chain does not stop at 12: FAT[12] points to block 3."
    ],
    [
     "The file has 3 blocks, 5 → 12 → 3, and block 3 is the last",
     "Correct. Follow the links from the start block; −1 marks the end of file at block 3."
    ],
    [
     "The file has 4 blocks, including block −1",
     "−1 is the end-of-file marker in the FAT, not a block number, so the file has 3 blocks: 5 → 12 → 3 (Topic 7)."
    ],
    [
     "The file occupies blocks 3 to 12 contiguously",
     "FAT is a variant of linked allocation; the blocks can be scattered anywhere."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Sequential access is simulated on a direct-access file with a current position <code>cp</code>. Right now cp = 4 and a <b>read next</b> is issued. What happens?",
   "o": [
    [
     "Block 5 is read and cp becomes 5",
     "It reads at the current position before it increments cp."
    ],
    [
     "Block 4 is read and cp stays 4",
     "read next also advances the position: it does read cp, then cp = cp + 1, so cp becomes 5 (Topic 7, Simulation of Sequential Access)."
    ],
    [
     "cp is reset to 0, then block 0 is read",
     "Setting cp = 0 is what reset does, not read next."
    ],
    [
     "Block 4 is read and cp becomes 5",
     "Correct. Simulating sequential access, read next = read block cp, then cp = cp + 1; so block 4 is read and cp becomes 5 (Topic 7, Simulation of Sequential Access on Direct-access File)."
    ]
   ],
   "a": 3
  },
  {
   "q": "What does the <b>open(F<sub>i</sub>)</b> operation do?",
   "o": [
    [
     "It searches the directory on disk for entry F<sub>i</sub> and moves its content to memory",
     "Correct. This is the lecture's definition; close(F<sub>i</sub>) moves the in-memory entry back to the directory on disk."
    ],
    [
     "It copies the whole file's data blocks into main memory",
     "open brings in the directory entry, not all the file's data."
    ],
    [
     "It moves the in-memory entry back to the directory on disk",
     "Moving the in-memory entry back to the directory structure on disk is what close(F<sub>i</sub>) does, the reverse of open (Topic 7, File Operations)."
    ],
    [
     "It creates a new empty file named F<sub>i</sub>",
     "Making a new empty file is the create operation; open(F<sub>i</sub>) finds an existing entry and brings it into memory (Topic 7)."
    ]
   ],
   "a": 0
  },
  {
   "q": "What is the <b>file-open count</b> used for?",
   "o": [
    [
     "To record the last read/write location for each process",
     "Recording the last read/write location per process is the job of the file pointer, not the open count (Topic 7, Open Files)."
    ],
    [
     "To store each process's access mode",
     "Per-process access mode is kept as the access-rights information, not the file-open count (Topic 7, Open Files)."
    ],
    [
     "To count how many times the file has been opened, so its open-file-table entry can be removed when the last process closes it",
     "Correct. When the count drops to zero, the entry can be removed from the open-file table."
    ],
    [
     "To count the number of blocks allocated to the file",
     "That is the file's size/location information, not open-file data."
    ]
   ],
   "a": 2
  },
  {
   "q": "Compared with a single-level directory, what does a <b>two-level directory</b> (one UFD per user) fix, and what problem remains?",
   "o": [
    [
     "It fixes grouping, but users still need unique names",
     "It is the other way round: naming is fixed and grouping is not."
    ],
    [
     "It fixes naming (different users can use the same file name), but there is still no grouping within a user",
     "Correct. Files are addressed as user/file, so names only need to be unique per user; grouping needs a tree structure."
    ],
    [
     "It fixes both naming and grouping",
     "A user still cannot group their own files; that needs a tree-structured directory."
    ],
    [
     "It fixes nothing; it only makes searching slower",
     "Searching becomes efficient, and the naming problem across users is solved."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: \"In a tree-structured directory, deleting the directory <code>mail</code> deletes the entire subtree rooted at <code>mail</code>.\"",
   "o": [
    [
     "True",
     "Correct. The lecture states that deleting \"mail\" deletes the whole subtree rooted at mail."
    ],
    [
     "False",
     "In the lecture's tree example, deleting a directory removes everything under it."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"With linked allocation, the size of a file must be declared when it is created.\"",
   "o": [
    [
     "True",
     "Knowing the size in advance is a problem of contiguous allocation. Linked files grow block by block."
    ],
    [
     "False",
     "Correct. Linked allocation has no external fragmentation, needs no compaction and does not need the size at creation."
    ]
   ],
   "a": 1
  }
 ],
 "8": [
  {
   "q": "<b>Applied.</b> In the six-step DMA process, the driver asks for C = 2,048 bytes to go into a buffer at address X. After the DMA controller has moved 500 bytes, what are C and the next memory address?",
   "o": [
    [
     "C = 2,048, next address X",
     "The DMA controller updates both values after every byte it transfers."
    ],
    [
     "C = 500, next address X + 1,548",
     "The values are swapped: 500 bytes are done, so 1,548 remain and the address has moved forward by 500."
    ],
    [
     "C = 1,548, next address X + 500",
     "Correct. The DMA controller increases the memory address and decreases C for each byte, until C = 0."
    ],
    [
     "C = 1,548, next address X − 500",
     "The DMA controller increases the memory address while decreasing C, so after 500 bytes the next address is X + 500, not X − 500 (Topic 8, Six Steps)."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which item is <b>not</b> part of the DMA command block that the OS writes into memory?",
   "o": [
    [
     "Source and destination addresses",
     "Source and destination addresses are item 1 of the DMA command block the OS writes into memory (Topic 8, Direct Memory Access)."
    ],
    [
     "The PCB of the process that requested the I/O",
     "Correct. The command block holds the source and destination addresses, read/write mode and byte count; the PCB is not in it."
    ],
    [
     "Read or write mode",
     "Read or write mode is item 2 of the DMA command block (Topic 8, Direct Memory Access)."
    ],
    [
     "Count of bytes",
     "The count of bytes is item 3 of the DMA command block; the controller decreases it as it transfers (Topic 8)."
    ]
   ],
   "a": 1
  },
  {
   "q": "<b>Applied.</b> Using the lecture's PC I/O port table, which device answers at port address <b>3FA</b>?",
   "o": [
    [
     "Diskette-drive controller",
     "The diskette-drive controller uses ports 3F0–3F7, which ends just before 3FA; 3FA lies in the primary serial port range 3F8–3FF (Topic 8, I/O Port Locations)."
    ],
    [
     "Serial port (secondary)",
     "The secondary serial port uses 2F8–2FF; 3FA is in 3F8–3FF, the primary serial port (Topic 8, I/O Port Locations)."
    ],
    [
     "Graphics controller",
     "The graphics controller uses 3D0–3DF, below 3FA; 3FA falls in 3F8–3FF, the primary serial port (Topic 8)."
    ],
    [
     "Serial port (primary)",
     "Correct. The primary serial port uses 3F8–3FF, and 3FA is inside that range."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the Intel Pentium event-vector table, what do vectors <b>32–255</b> hold?",
   "o": [
    [
     "Maskable interrupts",
     "Correct. 0–31 are specific events (divide error, page fault…) or reserved; 32–255 are maskable interrupts."
    ],
    [
     "Page faults",
     "A page fault is the single vector 14 among the specific events 0–31, not the range 32–255 (Topic 8, Event-Vector Table)."
    ],
    [
     "Reserved entries",
     "The reserved entries are 15 and 19–31, inside 0–31; vectors 32–255 are used for maskable interrupts (Topic 8)."
    ],
    [
     "Divide errors",
     "Divide error is the single vector 0; vectors 32–255 hold maskable interrupts (Topic 8, Event-Vector Table)."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the polling handshake, after the host sets the <b>command-ready</b> bit, what happens next?",
   "o": [
    [
     "The host reads the busy bit until it becomes 0",
     "That is step 1, done before the host sets command-ready."
    ],
    [
     "The controller raises an interrupt on the Interrupt Request Line",
     "Polling does not use interrupts; the host keeps checking the status register."
    ],
    [
     "The controller sets the busy bit and executes the transfer",
     "Correct. Step 4: the controller sees command-ready, sets busy and does the transfer; in step 5 it clears busy, error and command-ready."
    ],
    [
     "The host copies the data into the data-out register",
     "For a write this is done in step 2, before command-ready is set."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the polling handshake, the host repeatedly checks the busy bit. Which device register is it reading?",
   "o": [
    [
     "Data-in",
     "Data-in holds data the host reads from the device."
    ],
    [
     "Data-out",
     "Data-out holds data the host writes to the device."
    ],
    [
     "Control",
     "The control register is for commands from the host; the busy bit the host polls is reported elsewhere."
    ],
    [
     "Status",
     "Correct. The busy (and error) bits are in the status register."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which pair matches a device class with the commands the lecture lists for it?",
   "o": [
    [
     "Block devices (disk drives): read, write, seek. Character devices (keyboard, mouse): get(), put()",
     "Correct. Block devices also allow raw I/O, memory-mapped file access and DMA; character devices can have line editing layered on top."
    ],
    [
     "Block devices: get(), put(). Character devices: read, write, seek",
     "Reversed: seek only makes sense for random-access block devices such as disks."
    ],
    [
     "Both classes use only get() and put()",
     "Only character devices use get() and put(); disk drives are block devices with commands read, write and seek (Topic 8, Block and Character Devices)."
    ],
    [
     "Character devices are disk drives; block devices are keyboards",
     "Reversed: keyboards, mice and serial ports are character devices; disk drives are block devices."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the typical PC bus figure, which bus connects relatively <b>slow</b> devices such as the keyboard and the serial and parallel ports?",
   "o": [
    [
     "The PCI bus",
     "PCI connects the graphics, SCSI and IDE controllers; slow devices hang off the expansion bus behind it."
    ],
    [
     "The memory bus through the bridge/memory controller",
     "That links the processor and memory, not the keyboard or ports."
    ],
    [
     "The expansion bus",
     "Correct. The expansion bus interface on the PCI bus connects the keyboard and the parallel and serial ports."
    ],
    [
     "The SCSI bus",
     "The SCSI bus links the SCSI controller to disks; slow devices such as the keyboard and the serial and parallel ports sit on the expansion bus (Topic 8, Typical PC Bus Structure)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: \"When it finishes, the interrupt handler performs a state restore and executes a return-from-interrupt instruction so the CPU returns to its previous state.\"",
   "o": [
    [
     "True",
     "Correct. The handler determines the cause, does the necessary processing, restores state and returns from the interrupt."
    ],
    [
     "False",
     "This is exactly how the lecture says the interrupt handler ends."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: \"Polling is always more efficient than interrupts, whatever the speed of the device.\"",
   "o": [
    [
     "True",
     "Busy-waiting wastes the CPU on slow devices. That is why the controller notifying the CPU (an interrupt) is sometimes more efficient."
    ],
    [
     "False",
     "Correct. Polling is reasonable for fast devices but inefficient for slow ones; interrupts let the device notify the CPU instead."
    ]
   ],
   "a": 1
  }
 ]
};

// Final revision practice questions (2026-11-21), appended per lecture
EXTRA.os["5"] = (EXTRA.os["5"] || []).concat([
 {
  "q": "<b>Applied.</b> Reference string 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 with <b>3 frames</b>, initially empty. How many page faults does <b>FIFO</b> cause?",
  "o": [
   [
    "7",
    "7 is the LRU count. FIFO ignores recent use: at the 5th reference it throws out page 2, although 2 was just used at reference 3."
   ],
   [
    "6",
    "This leaves out the 3 faults that fill the empty frames at the start (it only matches the Optimal count by chance). Filling an empty frame counts as a fault."
   ],
   [
    "9",
    "Correct. Faults on 2, 3, (2 hit), 1, 5 (evict 2), 2 (evict 3), 4 (evict 1), (5 hit), 3 (evict 5), (2 hit), 5 (evict 2), 2 (evict 4) = 9."
   ],
   [
    "12",
    "This counts every reference. References 3 (page 2), 8 (page 5) and 10 (page 2) find the page already in a frame, so they are hits."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Same string 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 with 3 frames. How many page faults does <b>LRU</b> cause?",
  "o": [
   [
    "7",
    "Correct. 2, 3 fault; 2 hit; 1 faults; 5 evicts 3 (used longest ago); 2 hit; 4 evicts 1; 5 hit; 3 evicts 2; 2 evicts 4; 5 and 2 hit → 7."
   ],
   [
    "9",
    "That is FIFO. LRU keeps page 2 at the 5th reference because 2 was used at reference 3, so reference 6 is a hit."
   ],
   [
    "6",
    "That is Optimal, which looks at future references; LRU can only use the past."
   ],
   [
    "4",
    "This leaves out the 3 faults that fill the empty frames at the start. They count as faults."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Same string 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 with 3 frames. How many page faults does <b>Optimal</b> cause?",
  "o": [
   [
    "7",
    "That is LRU. At the 5th reference LRU evicts 3 (least recently used), but 3 is needed again at reference 9; Optimal evicts 1, which is never used again."
   ],
   [
    "9",
    "That is FIFO, which evicts by load time and ignores future use."
   ],
   [
    "3",
    "This leaves out the 3 faults that fill the empty frames at the start."
   ],
   [
    "6",
    "Correct. 2, 3 and 1 fault (the second 2 is a hit); 5 evicts 1 (never used again); 4 evicts 2 (next used farthest away, at reference 10); 2 evicts 4 (never used again); the rest are hits → 6."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Same string 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2, now with <b>4 frames</b>. How many page faults does <b>FIFO</b> cause?",
  "o": [
   [
    "9",
    "That is the count with 3 frames. With a 4th frame pages stay in memory longer, so this string gets fewer faults."
   ],
   [
    "6",
    "Correct. 2, 3, 1, 5 fill the 4 frames (4 faults; the second 2 is a hit); the next 2 hits; 4 evicts 2 (loaded first); 5 and 3 hit; 2 evicts 3; 5 and 2 hit → 6. Here the 4th frame cuts the faults from 9 to 6."
   ],
   [
    "5",
    "That is Optimal with 4 frames. FIFO evicts page 2 at the 7th reference even though 2 is needed again at reference 10."
   ],
   [
    "2",
    "This leaves out the 4 faults that fill the empty frames at the start."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> FIFO on 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 with 3 frames. When page <b>3</b> arrives at the 9th reference, the frames hold 5, 2 and 4. Which page is evicted?",
  "o": [
   [
    "Page 2",
    "2 was the first page of the string, but it was evicted at reference 5 and loaded again at reference 6. FIFO counts from the new load time."
   ],
   [
    "Page 5",
    "Correct. 5 was loaded at reference 5, 2 at reference 6 and 4 at reference 7, so 5 is the oldest load and FIFO evicts it."
   ],
   [
    "Page 4",
    "4 is the newest load (reference 7). FIFO evicts the oldest page, not the newest."
   ],
   [
    "None: page 3 is a hit",
    "Page 3 was evicted at reference 6, so it is not in a frame. This reference is a fault."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Four frames hold pages 3, 5, 7 and 8, loaded in that order. Their most recent uses, oldest first, were 5, 8, 7, 3. Page 9 now faults, and the next references are 5, 3, 7, 3, 8. Which page does <b>Optimal</b> evict?",
  "o": [
   [
    "Page 3",
    "That is the FIFO choice (3 was loaded first). Optimal looks only at future use, and 3 is needed at the 2nd future reference."
   ],
   [
    "Page 5",
    "That is the LRU choice (5 was used longest ago). Optimal looks ahead, and 5 is needed at the very next reference, so evicting it causes another fault at once."
   ],
   [
    "Page 7",
    "7 is next used at the 3rd future reference, sooner than 8 (5th). Optimal evicts the farthest next use."
   ],
   [
    "Page 8",
    "Correct. Next uses: 5 at the 1st future reference, 3 at the 2nd, 7 at the 3rd, 8 at the 5th. Optimal evicts the page whose next use is farthest away: 8."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> LRU with the <b>counter</b> implementation. The counters (clock value at each page's last reference) are A = 17, B = 9, C = 23, D = 12. Which page is replaced?",
  "o": [
   [
    "B",
    "Correct. The counter holds the time of the last reference, so the smallest counter (9) is the page used longest ago: the LRU victim."
   ],
   [
    "C",
    "C has the largest counter, so it was referenced most recently; LRU keeps it."
   ],
   [
    "D",
    "D (12) is the second smallest. LRU looks for the smallest counter value."
   ],
   [
    "A",
    "A is just the first entry in the table. The counter implementation searches the whole table for the smallest counter, not the first entry."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> LRU with the <b>stack</b> implementation. Pages are referenced in the order 4, 7, 0, 7, 1, 0, 1, 2. Which page is at the <b>bottom</b> of the stack, ready to be the victim?",
  "o": [
   [
    "2",
    "2 was referenced last, so it sits at the top, not the bottom."
   ],
   [
    "7",
    "7 was last used at the 4th reference, so it is second from the bottom. Its earlier use does not matter; only the last use counts."
   ],
   [
    "4",
    "Correct. Each reference moves the page to the top, so the stack from top to bottom is 2, 1, 0, 7, 4. Page 4 (last used at the 1st reference) is at the bottom."
   ],
   [
    "0",
    "0 was last used at the 6th reference, so it is in the middle of the stack."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Second-chance (clock) algorithm. The FIFO order (oldest first) with reference bits is A (1), B (1), C (1), D (1). A page must be replaced. Which one?",
  "o": [
   [
    "D, the newest page",
    "Second chance never prefers the newest page; it moves through the pages in FIFO order, oldest first."
   ],
   [
    "None: every page keeps its second chance, so nothing can be replaced",
    "A second chance is given only once: the bit is cleared, so on the next pass the page has bit 0 and can be replaced."
   ],
   [
    "B, because A's bit is cleared and B is next",
    "B's bit is also 1, so it too is cleared and skipped. The algorithm stops only at a page with bit 0."
   ],
   [
    "A, after every bit has been cleared to 0",
    "Correct. Each page with bit 1 has its bit cleared and is skipped: A, B, C, D all become 0. Back at A the bit is 0, so A is replaced. With all bits 1 it behaves like plain FIFO."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Run <b>LRU</b> on Belady's string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 frames and then with 4 frames. What are the fault counts?",
  "o": [
   [
    "9 with 3 frames, 10 with 4 frames",
    "Those are FIFO's counts, the anomaly itself. LRU does not suffer from Belady's anomaly."
   ],
   [
    "10 with 3 frames, 8 with 4 frames",
    "Correct. LRU is a stack algorithm: adding a frame never adds faults. With 3 frames all but 1, 2 (the 8th and 9th references) fault = 10; with 4 frames 5, 3, 4, 5 replace pages after the 4 fills = 8."
   ],
   [
    "8 with 3 frames, 10 with 4 frames",
    "This assumes LRU shows the anomaly too. As a stack algorithm it never gets more faults with more frames."
   ],
   [
    "7 with 3 frames, 6 with 4 frames",
    "Those are Optimal's counts; LRU cannot do better than Optimal."
   ]
  ],
  "a": 1
 },
 {
  "q": "With only a <b>reference bit</b> per page (0 initially, set to 1 when referenced), the OS can replace a page whose bit is 0. What does it <b>not</b> know?",
  "o": [
   [
    "Whether a page has been referenced",
    "That is exactly what the bit records: 1 means referenced."
   ],
   [
    "Which pages are currently in memory",
    "That is given by the valid–invalid bit in the page table, not by the reference bit."
   ],
   [
    "The order in which the pages were used",
    "Correct. The bit only says whether a page was referenced, not when; the lecture notes that we do not know the order."
   ],
   [
    "Which pages are candidates for replacement",
    "Any page with bit 0 is a candidate; the bit tells the OS that much."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Reference string 4, 4, 1, 4, 2, 2, 1, 3 with 3 frames, FIFO, initially empty. How many page faults?",
  "o": [
   [
    "4",
    "Correct. 4 faults, 4 hits, 1 faults, 4 hits, 2 faults, 2 and 1 hit, 3 faults (evicting 4) → 4. A repeated reference to a page already in memory is not a fault."
   ],
   [
    "8",
    "This counts every reference. Four of them (the second 4, the third 4, the second 2 and the second 1) find the page already in a frame."
   ],
   [
    "5",
    "This treats the immediate repeat 4, 4 as a second fault. The page is already in a frame after the first reference."
   ],
   [
    "1",
    "This counts only the replacement (3 evicting 4) and drops the 3 faults that fill the empty frames."
   ]
  ],
  "a": 0
 },
 {
  "q": "True or False: \"When a process starts under demand paging, every page-table entry is marked v (valid).\"",
  "o": [
   [
    "True",
    "Initially all entries are marked i (not in memory); pages are brought in only when they are referenced."
   ],
   [
    "False",
    "Correct. Initially every valid–invalid bit is i. The first reference to each page finds i and causes a page fault."
   ]
  ],
  "a": 1
 },
 {
  "q": "During page-fault handling, the OS looks at another table and finds that the reference is <b>invalid</b>. What happens?",
  "o": [
   [
    "The process is aborted",
    "Correct. Step 1 of page-fault handling: invalid reference → abort; only a valid page that is just not in memory is brought in."
   ],
   [
    "A free frame is found and the page is read in",
    "That is the case where the reference is valid but the page is not in memory."
   ],
   [
    "The validation bit is set to v and the instruction is restarted",
    "Those are the last steps after a valid page has been read in; an invalid reference never gets there."
   ],
   [
    "A victim page is written to disk",
    "Choosing and writing a victim is page replacement, used only to make room for a valid page."
   ]
  ],
  "a": 0
 },
 {
  "q": "In the worst-case stages of demand paging, the OS has just received the interrupt from the disk I/O subsystem (I/O completed). What is the <b>next</b> stage?",
  "o": [
   [
    "Restore the faulting process's registers and resume the instruction",
    "That is the last stage (11). Before it, the other user's state is saved, the page table corrected, and the process waits for the CPU."
   ],
   [
    "Issue a read from the disk to a free frame",
    "That was stage 5; the read has just completed."
   ],
   [
    "Determine that the interrupt was a page fault",
    "That was stage 3, right after the original trap."
   ],
   [
    "Save the registers and process state of the other user that was running",
    "Correct. Stage 8: the CPU was given to another user while waiting (stage 6), so that user's state is saved before the page table is corrected (stage 9)."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"When page replacement picks a victim frame, the victim is always written to disk before the new page is read in.\"",
  "o": [
   [
    "True",
    "Only a dirty victim (changed since it was loaded) must be written out; a clean one can simply be overwritten."
   ],
   [
    "False",
    "Correct. The victim is written to disk only if it is dirty. That is why a fault needs up to 2 page transfers, not always 2."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which algorithm decides <b>how many frames</b> each process gets?",
  "o": [
   [
    "The page-replacement algorithm",
    "It chooses the victim page when a fault finds no free frame; it does not decide each process's share of frames."
   ],
   [
    "The frame-allocation algorithm",
    "Correct. It decides how many frames to give each process and which frames to replace."
   ],
   [
    "LRU",
    "LRU is one particular page-replacement algorithm."
   ],
   [
    "The lazy swapper",
    "The lazy swapper only decides when to bring a page in (only when needed)."
   ]
  ],
  "a": 1
 },
 {
  "q": "Why does <b>MFU</b> replace the page with the <b>largest</b> reference count?",
  "o": [
   [
    "The largest count means the page was used longest ago",
    "A count says how often a page was used, not when. Time since last use is LRU's idea."
   ],
   [
    "The page with the largest count was loaded first",
    "Load order is FIFO's rule; counts are not load times."
   ],
   [
    "The page with the largest count will not be used for the longest time in the future",
    "That is Optimal's rule, which needs the future; MFU only counts past references."
   ],
   [
    "It argues that the page with the smallest count was probably just brought in and has yet to be used",
    "Correct. That is MFU's argument in the lecture; LFU does the opposite and replaces the smallest count."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"A swapper that deals with individual pages, instead of whole processes, is called a pager.\"",
  "o": [
   [
    "True",
    "Correct. The lecture: \"a swapper that deals with pages is a pager\"; the lazy swapper is one that never swaps a page in unless it will be needed."
   ],
   [
    "False",
    "This is the lecture's own definition of a pager."
   ]
  ],
  "a": 0
 },
 {
  "q": "True or False: \"Running a partially loaded program lets more programs run at the same time, increasing CPU utilization and throughput with no increase in response or turnaround time.\"",
  "o": [
   [
    "True",
    "Correct. Each program uses less memory, so more programs fit at once; the lecture lists this benefit with no increase in response or turnaround time."
   ],
   [
    "False",
    "This is one of the listed benefits of virtual memory: less memory per program means more programs at the same time."
   ]
  ],
  "a": 0
 }
]);
EXTRA.os["6"] = (EXTRA.os["6"] || []).concat([
 {
  "q": "<b>Applied.</b> Snapshot S, resources A B C with totals A = 8, B = 5, C = 6:<br><table><tr><th>Process</th><th>Allocation A B C</th><th>Max A B C</th></tr><tr><td>P0</td><td>1 1 0</td><td>4 3 2</td></tr><tr><td>P1</td><td>2 0 1</td><td>3 2 2</td></tr><tr><td>P2</td><td>1 2 2</td><td>5 2 4</td></tr><tr><td>P3</td><td>0 1 1</td><td>2 2 2</td></tr><tr><td>P4</td><td>2 0 0</td><td>3 1 4</td></tr></table>What is the <b>Need</b> of P4?",
  "o": [
   [
    "(5, 1, 4)",
    "This adds Allocation to Max. Need is what is still missing: Max minus what is already held."
   ],
   [
    "(3, 1, 4)",
    "That is P4's Max. It already holds (2, 0, 0), which must be subtracted."
   ],
   [
    "(−1, −1, −4)",
    "This is Allocation − Max, the subtraction reversed. Need is never negative."
   ],
   [
    "(1, 1, 4)",
    "Correct. Need = Max − Allocation = (3, 1, 4) − (2, 0, 0) = (1, 1, 4)."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Snapshot S (totals A = 8, B = 5, C = 6; Allocation P0 (1, 1, 0), P1 (2, 0, 1), P2 (1, 2, 2), P3 (0, 1, 1), P4 (2, 0, 0)). What is the <b>Available</b> vector?",
  "o": [
   [
    "(6, 4, 4)",
    "That is the total allocated; it still has to be subtracted from the totals."
   ],
   [
    "(2, 1, 2)",
    "Correct. Column sums of Allocation = (6, 4, 4), so Available = (8, 5, 6) − (6, 4, 4) = (2, 1, 2)."
   ],
   [
    "(8, 5, 6)",
    "Those are the total instances. Some are already allocated, so they are not all available."
   ],
   [
    "(−9, −5, −8)",
    "This subtracts the Max column sums (17, 10, 14). Available depends on what is allocated, not on the maximum claims."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Using snapshot S (totals A = 8, B = 5, C = 6; Available (2, 1, 2); Need P0 (3, 2, 2), P1 (1, 2, 1), P2 (4, 0, 2), P3 (2, 1, 1), P4 (1, 1, 4)), which is a <b>safe sequence</b>?",
  "o": [
   [
    "&lt;P1, P3, P2, P4, P0&gt;",
    "P1 cannot go first: it needs 2 B but only 1 B is available."
   ],
   [
    "&lt;P3, P4, P1, P2, P0&gt;",
    "After P3, Work = (2,2,3), and P4 needs 4 C. P4 must wait until P1 and P2 have released theirs."
   ],
   [
    "&lt;P3, P1, P2, P4, P0&gt;",
    "Correct. Work (2,1,2): P3 (2,1,1) fits → (2,2,3); P1 (1,2,1) → (4,2,4); P2 (4,0,2) → (5,4,6); P4 (1,1,4) → (7,4,6); P0 (3,2,2) → (8,5,6) = totals."
   ],
   [
    "&lt;P0, P1, P2, P3, P4&gt;",
    "P0 cannot start: it needs 3 A but only 2 A are available. A safe sequence is not simply the process numbers in order."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Using snapshot S (totals A = 8, B = 5, C = 6; Available (2, 1, 2); Need P0 (3, 2, 2), P1 (1, 2, 1), P2 (4, 0, 2), P3 (2, 1, 1), P4 (1, 1, 4)), P4 now requests (1, 0, 1). What does the banker's algorithm decide?",
  "o": [
   [
    "P4 must wait: the pretend state is unsafe",
    "Correct. Pretend: Available (1,1,1), Allocation P4 (3,0,1), Need P4 (0,1,3). No process fits now: P3 needs 2 A, P1 needs 2 B, P0 and P2 need more A, P4 needs 3 C. Unsafe, so P4 waits and the old state is restored."
   ],
   [
    "Grant it, because the request ≤ Need and ≤ Available",
    "Those two checks only allow the pretend allocation. The request is granted only if the safety algorithm then finds the state safe, and here it does not."
   ],
   [
    "Error, because the request exceeds P4's maximum claim",
    "(1, 0, 1) ≤ Need P4 (1, 1, 4), so the claim is not exceeded."
   ],
   [
    "P4 must wait because the request is more than Available",
    "(1, 0, 1) ≤ Available (2, 1, 2), so there are enough free instances; the problem is that the resulting state is unsafe."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Using snapshot S (totals A = 8, B = 5, C = 6; Available (2, 1, 2); Need P0 (3, 2, 2), P1 (1, 2, 1), P2 (4, 0, 2), P3 (2, 1, 1), P4 (1, 1, 4)), P3 now requests (0, 2, 0). What does the banker's algorithm decide?",
  "o": [
   [
    "P3 must wait until 2 B are available",
    "Waiting is for a valid request that exceeds Available. This request fails the earlier check against Need."
   ],
   [
    "Grant it, because the system is safe",
    "A safe state does not let a process ask for more than its declared maximum."
   ],
   [
    "Error: the request exceeds P3's maximum claim",
    "Correct. Step 1 checks Request ≤ Need: Need P3 = (2, 1, 1), and 2 B > 1 B, so it is an error condition."
   ],
   [
    "Run the safety algorithm, then decide",
    "The safety algorithm runs only after both checks pass; this request fails the first one."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Using snapshot S (totals A = 8, B = 5, C = 6; Available (2, 1, 2); Need P0 (3, 2, 2), P1 (1, 2, 1), P2 (4, 0, 2), P3 (2, 1, 1), P4 (1, 1, 4)), P0 now requests (3, 0, 0). What does the banker's algorithm decide?",
  "o": [
   [
    "P0 must wait: the request is more than Available",
    "Correct. Request ≤ Need P0 (3, 2, 2) passes, but 3 A > Available 2 A, so step 2 makes P0 wait. The safety algorithm is not even reached."
   ],
   [
    "Error: the request exceeds P0's maximum claim",
    "(3, 0, 0) ≤ Need (3, 2, 2), so it is within P0's claim."
   ],
   [
    "Grant it after a successful safety check",
    "Only 2 A are free, so 3 A cannot be allocated, even for pretend."
   ],
   [
    "Abort P0 to free its resources",
    "The banker's algorithm avoids deadlock by making the process wait; it does not abort processes."
   ]
  ],
  "a": 0
 },
 {
  "q": "True or False: \"In snapshot S, when the safety algorithm has finished every process, Work equals the total instances (8, 5, 6).\"",
  "o": [
   [
    "True",
    "Correct. Every process releases its Allocation, so the final Work = Available + all Allocations = (2,1,2) + (6,4,4) = (8,5,6). It is a good self-check."
   ],
   [
    "False",
    "When all processes finish, everything they held is back in Work, so it must equal the totals."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Detection algorithm with resources A, B, C (one instance each), Available (0, 0, 0).<br>Allocation: P0 (1, 0, 0), P1 (0, 1, 0), P2 (0, 0, 1). Request: P0 (0, 1, 0), P1 (1, 0, 0), P2 (0, 0, 0).<br>What is the result?",
  "o": [
   [
    "All three are deadlocked, since Available is (0, 0, 0)",
    "P2 requests nothing, so it can finish even with nothing available."
   ],
   [
    "P0 and P1 are deadlocked; P2 can finish",
    "Correct. Work (0,0,0): P2's request (0,0,0) fits → Work (0,0,1). P0 needs B and P1 needs A, which each other holds, so Finish stays false for P0 and P1."
   ],
   [
    "No deadlock: P2 finishes and its release lets the others continue",
    "P2 releases only C, but P0 is waiting for B (held by P1) and P1 for A (held by P0)."
   ],
   [
    "Only P2 is deadlocked",
    "P2's request is zero, so Request ≤ Work holds at once; it is the one process that can finish."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> The slide's graph has R1 → P2, R2 → P1 and R2 → P2, R3 → P3 (assignments) and P1 → R1, P2 → R3 (requests). Now P3 → R2 is added. Which processes are deadlocked?",
  "o": [
   [
    "None: R2 has two instances, so there is only a possibility of deadlock",
    "Several instances only make deadlock possible in general. Here both R2 instances are held by P1 and P2, which are themselves waiting, so the deadlock is real."
   ],
   [
    "P1, P2 and P3",
    "Correct. There are two cycles, P1 → R1 → P2 → R3 → P3 → R2 → P1 and P2 → R3 → P3 → R2 → P2, and both instances of R2 are held by waiting processes, so nobody can finish."
   ],
   [
    "Only P2 and P3, the shorter cycle",
    "P1 waits for R1, held by P2, which can never finish, so P1 is stuck too."
   ],
   [
    "Only P3, the process that made the new request",
    "P3's request closes the cycles; P1 and P2 are in them as well."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> A graph has the cycle P1 → R1 → P3 → R2 → P1, but R1's other instance is held by P2 and R2's other instance by P4. Why is there <b>no</b> deadlock?",
  "o": [
   [
    "A cycle never means deadlock",
    "With one instance per resource type a cycle does mean deadlock; here it is the extra instances that save the system."
   ],
   [
    "Because R1 and R2 are sharable resources",
    "Nothing says they are sharable; the cycle is broken because other holders of the instances can release them."
   ],
   [
    "Because P1 and P3 can take resources from each other",
    "No preemption holds: resources are released only voluntarily by their holders."
   ],
   [
    "P2 and P4 are not waiting, so they can finish and release instances that break the cycle",
    "Correct. When P4 releases its R2 instance, P3 can get it and finish, and then P1 can proceed."
   ]
  ],
  "a": 3
 },
 {
  "q": "In a resource-allocation graph, an arrow goes from an instance dot inside box R2 to process P1. What does it mean?",
  "o": [
   [
    "An assignment edge: P1 holds an instance of R2",
    "Correct. Assignment edges go Rj → Pi, from an instance dot to the process holding it."
   ],
   [
    "A request edge: P1 is waiting for R2",
    "A request edge goes the other way, Pi → Rj, from the process to the resource box."
   ],
   [
    "A wait-for edge from R2 to P1",
    "A wait-for graph has only process nodes (Pi → Pj); resource nodes are collapsed away."
   ],
   [
    "Nothing: edges only go from processes to resources",
    "Both directions exist: requests go P → R and assignments go R → P."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> Single-instance resources. P1 requests R1, which is held by P2; P2 requests R2, which is held by P3; P3 requests nothing. What does the wait-for graph show?",
  "o": [
   [
    "P1 → P2 → P3 → P1, a deadlock",
    "There is no edge from P3 to P1, because P3 is not waiting for anything."
   ],
   [
    "P3 → P2 → P1",
    "The edges point from the waiting process to the one it waits for, so they go P1 → P2 → P3."
   ],
   [
    "P1 → P2 → P3, no cycle, so no deadlock",
    "Correct. Collapsing the resource nodes gives P1 → P2 and P2 → P3. There is no cycle: P3 finishes, then P2, then P1."
   ],
   [
    "It cannot be built: wait-for graphs need several instances per type",
    "It is the other way round: the wait-for graph is the detection method for a single instance of each resource type."
   ]
  ],
  "a": 2
 },
 {
  "q": "Making a resource <b>sharable</b>, such as a read-only file that many processes can open at once, attacks which deadlock condition?",
  "o": [
   [
    "Hold and wait",
    "Hold and wait is denied by requesting all resources up front or only when holding none."
   ],
   [
    "No preemption",
    "No preemption is denied by making a blocked process release everything it holds."
   ],
   [
    "Circular wait",
    "Circular wait is denied by a total ordering of resource types."
   ],
   [
    "Mutual exclusion",
    "Correct. Mutual exclusion is not required for sharable resources, so they can never be part of a deadlock."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"Deadlock prevention can always deny the mutual-exclusion condition.\"",
  "o": [
   [
    "True",
    "Mutual exclusion must hold for non-sharable resources (a printer cannot be shared), so it generally cannot be denied."
   ],
   [
    "False",
    "Correct. Only sharable resources such as read-only files avoid it; for non-sharable resources mutual exclusion must hold."
   ]
  ],
  "a": 1
 },
 {
  "q": "For deadlock <b>avoidance</b>, which tool fits which case?",
  "o": [
   [
    "Single instance: the banker's algorithm. Multiple instances: a resource-allocation graph",
    "This is reversed. The banker's algorithm is the one built for multiple instances."
   ],
   [
    "Both cases: the wait-for graph",
    "The wait-for graph is for detection (single instances), not avoidance."
   ],
   [
    "Single instance per type: a resource-allocation graph (with claim edges). Multiple instances: the banker's algorithm",
    "Correct. That is the lecture's split for avoidance."
   ],
   [
    "Both cases: a total ordering of resource types",
    "Total ordering prevents circular wait; it is a prevention method."
   ]
  ],
  "a": 2
 },
 {
  "q": "True or False: \"In the banker's algorithm, a process that gets all its resources may keep them for as long as it likes.\"",
  "o": [
   [
    "True",
    "The lecture's rule: a process that gets all its resources must return them in a finite amount of time."
   ],
   [
    "False",
    "Correct. Each process claims its maximum a priori, may have to wait, and must return all its resources in a finite amount of time."
   ]
  ],
  "a": 1
 },
 {
  "q": "When choosing which deadlocked process to abort first, which factor is <b>not</b> in the lecture's list?",
  "o": [
   [
    "The priority of the process",
    "Priority is factor 1 in the list."
   ],
   [
    "How many processes will need to be terminated",
    "This is factor 5 in the list."
   ],
   [
    "How many page faults the process has caused",
    "Correct. Page faults are not listed. The factors are priority, time computed and still needed, resources used, resources needed, how many processes must be terminated, and interactive or batch."
   ],
   [
    "Whether the process is interactive or batch",
    "This is factor 6 in the list."
   ]
  ],
  "a": 2
 },
 {
  "q": "When deciding how often to invoke the detection algorithm, the lecture considers how many processes will need to be rolled back. How many?",
  "o": [
   [
    "One for each disjoint cycle",
    "Correct. Each disjoint cycle needs at least one process rolled back to break it."
   ],
   [
    "Every process in the system",
    "Only processes in the deadlock cycles are involved; the others are not deadlocked."
   ],
   [
    "Exactly one, whatever the number of cycles",
    "One victim breaks only one cycle; separate cycles each need their own."
   ],
   [
    "None: rollback is never used",
    "Rollback is one of the issues of recovery by resource preemption."
   ]
  ],
  "a": 0
 },
 {
  "q": "In the system model, in what order does a process use a resource?",
  "o": [
   [
    "Use → request → release",
    "A process cannot use a resource before requesting and getting it."
   ],
   [
    "Request → release → use",
    "Releasing gives the resource back, so it can no longer be used."
   ],
   [
    "Release → request → use",
    "There is nothing to release before the resource has been requested and used."
   ],
   [
    "Request → use → release",
    "Correct. The process must request the resource (waiting if necessary), use it, then release it."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"The deadlock-detection algorithm checks Need_i ≤ Work, exactly like the safety algorithm.\"",
  "o": [
   [
    "True",
    "Detection has no Max or Need: it uses the current requests, Request_i ≤ Work."
   ],
   [
    "False",
    "Correct. The detection algorithm uses Request_i ≤ Work instead of Need, and Finish[i] starts true when Allocation_i = 0."
   ]
  ],
  "a": 1
 }
]);
EXTRA.os["7"] = (EXTRA.os["7"] || []).concat([
 {
  "q": "<b>Applied.</b> Which permissions does <code>chmod 536 plan</code> give?",
  "o": [
   [
    "Owner RW-, group -WX, public R-X",
    "This reads the digits from right to left. chmod lists owner, then group, then public."
   ],
   [
    "Owner R-X, group -WX, public RW-",
    "Correct. R = 4, W = 2, X = 1: 5 = 4 + 1 (R-X) for the owner, 3 = 2 + 1 (-WX) for the group, 6 = 4 + 2 (RW-) for the public."
   ],
   [
    "Owner R-X, group RW-, public -WX",
    "The group digit 3 is 2 + 1 (write and execute); RW- would be 6."
   ],
   [
    "Owner -WX, group R-X, public RW-",
    "5 is 4 + 1 (read and execute); -WX is 2 + 1 = 3."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> Linked allocation: file jeep is the chain 9 → 16 → 1 → 10 → 25 (the directory holds start 9 and end 25). How many disk blocks must be read to reach the file's <b>4th</b> block?",
  "o": [
   [
    "1",
    "That would need direct access, as with contiguous or indexed allocation. With linked allocation the address of block i is only in block i − 1."
   ],
   [
    "5",
    "Reading stops at the 4th block (10); block 25 is not needed."
   ],
   [
    "2",
    "The directory gives only the start and the end; the middle blocks can only be found by following the pointers one by one."
   ],
   [
    "4",
    "Correct. The 4th block's address is stored only in the 3rd block, so blocks 9, 16 and 1 must be read to find block 10, then 10 itself is read. This is why linked allocation has poor direct access."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> Indexed allocation: jeep's index block 19 lists 9, 16, 1, 10, 25, −1, … Which disk block holds the file's <b>4th</b> data block?",
  "o": [
   [
    "10",
    "Correct. The i-th entry of the index block points to the i-th block of the file: 9, 16, 1, then 10."
   ],
   [
    "1",
    "1 is the 3rd entry; one entry too early."
   ],
   [
    "25",
    "25 is the 5th entry, the last block of the file. Counting the entries from 0 lands here by mistake."
   ],
   [
    "19",
    "19 is the index block itself, which holds the pointers, not the file's data."
   ]
  ],
  "a": 0
 },
 {
  "q": "<b>Applied.</b> In the lecture's FAT example, the directory entry \"test\" has start block 217, and the file is 217 → 618 → 339. What is stored in <b>FAT[618]</b>?",
  "o": [
   [
    "−1",
    "−1 (end of file) is in FAT[339], the last block."
   ],
   [
    "217",
    "217 is the start block, kept in the directory entry; FAT[217] holds 618."
   ],
   [
    "339",
    "Correct. Each FAT entry holds the number of the next block of the file, so the entry for block 618 holds 339."
   ],
   [
    "618",
    "An entry does not hold its own block number; it holds the next block's number."
   ]
  ],
  "a": 2
 },
 {
  "q": "<b>Applied.</b> Sequential access is simulated on a direct-access file with current position <code>cp</code>. Starting from cp = 6, the operations are: read next, read next, reset, write next. Which block is written, and what is cp at the end?",
  "o": [
   [
    "Block 8 is written and cp = 9",
    "This ignores the reset, which sets cp back to 0 before the write."
   ],
   [
    "Block 0 is written and cp = 0",
    "Write next also advances the position: write cp, then cp = cp + 1."
   ],
   [
    "Block 1 is written and cp = 2",
    "This adds 1 before writing. The operation writes block cp first, then increases cp."
   ],
   [
    "Block 0 is written and cp = 1",
    "Correct. The reads use blocks 6 and 7 (cp becomes 8), reset sets cp = 0, and write next writes block 0 and sets cp = 1."
   ]
  ],
  "a": 3
 },
 {
  "q": "<b>Applied.</b> In a tree-structured directory the current directory is <code>/mail</code>, and the user types <code>mkdir count</code>. Where is the new directory created?",
  "o": [
   [
    "/count, at the root",
    "A relative name is taken from the current directory, not from the root."
   ],
   [
    "/mail/count",
    "Correct. New files and subdirectories are created in the current directory, as in the lecture's example (in /mail: mkdir count)."
   ],
   [
    "/spell/mail/prog/count",
    "That path comes from the separate cd example; here the current directory is /mail."
   ],
   [
    "Nowhere: mkdir replaces the directory mail",
    "mkdir adds a subdirectory; it does not replace or delete anything."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which file attribute is a <b>pointer to the file's location on the device</b>?",
  "o": [
   [
    "Identifier",
    "The identifier is a unique tag (number) that names the file within the file system."
   ],
   [
    "Name",
    "The name is the only information kept in human-readable form."
   ],
   [
    "Location",
    "Correct. Location is the pointer to where the file is on the device."
   ],
   [
    "Protection",
    "Protection records who can read, write and execute the file."
   ]
  ],
  "a": 2
 },
 {
  "q": "True or False: \"A file checksum is an example of an extended file attribute.\"",
  "o": [
   [
    "True",
    "Correct. The lecture lists the file checksum among the extended attributes."
   ],
   [
    "False",
    "The lecture names the file checksum as an extended attribute."
   ]
  ],
  "a": 0
 },
 {
  "q": "Repositioning within a file is also called:",
  "o": [
   [
    "Truncate",
    "Truncate is a separate file operation in the list, not repositioning."
   ],
   [
    "Open",
    "open(Fi) searches the directory and moves the entry to memory; it does not move inside the file."
   ],
   [
    "Seek",
    "Correct. The lecture lists the operation as \"reposition within the file (seek)\"."
   ],
   [
    "Append",
    "Append is a type of access (adding to the end), not a repositioning operation."
   ]
  ],
  "a": 2
 },
 {
  "q": "True or False: \"For an open file, a single file pointer is shared by all the processes that opened it.\"",
  "o": [
   [
    "True",
    "The file pointer (last read/write location) is kept per process, so each process has its own position."
   ],
   [
    "False",
    "Correct. The file pointer is per process, as are the access rights; the file-open count is what is shared for the file."
   ]
  ],
  "a": 1
 },
 {
  "q": "The extensions <code>so</code> and <code>dll</code> belong to which file type?",
  "o": [
   [
    "Object",
    "Object files are obj and o."
   ],
   [
    "Executable",
    "Executables are exe, com and bin."
   ],
   [
    "Archive",
    "Archives are arc, zip and tar."
   ],
   [
    "Library",
    "Correct. The lecture's library type is lib, a, so, dll."
   ]
  ],
  "a": 3
 },
 {
  "q": "A <b>relocatable load file</b> is an example of which file structure?",
  "o": [
   [
    "No structure (a sequence of words or bytes)",
    "That is the plain stream case, with no internal records."
   ],
   [
    "Complex structure",
    "Correct. Complex structures are a formatted document or a relocatable load file."
   ],
   [
    "Simple record structure",
    "Simple record structure means lines, fixed-length or variable-length records."
   ],
   [
    "Direct access",
    "Direct access is an access method, not a file structure."
   ]
  ],
  "a": 1
 },
 {
  "q": "Why does direct access address records by a <b>relative block number</b> n?",
  "o": [
   [
    "It makes sequential access impossible on the file",
    "Sequential access can still be simulated on a direct-access file with a current position cp."
   ],
   [
    "It lets the OS decide where the file is placed on disk",
    "Correct. The program asks for block n of the file, and the OS maps it to wherever the file actually is."
   ],
   [
    "n is the physical sector number on the disk",
    "n is relative to the start of the file, not a physical disk address."
   ],
   [
    "It is needed because the file is stored on tape",
    "Tape is the model for sequential access; direct access is for disks."
   ]
  ],
  "a": 1
 },
 {
  "q": "Two users can use the same name for different files, and one file can have several names. Which directory-organization goal is this?",
  "o": [
   [
    "Efficiency",
    "Efficiency means locating a file quickly."
   ],
   [
    "Grouping",
    "Grouping means logical groups of files by properties, e.g. all Java programs or all games."
   ],
   [
    "Protection",
    "Protection is about who may access a file; it is not one of the three organization goals."
   ],
   [
    "Naming",
    "Correct. The naming goal is convenience for users: the same name for different users' files, and several names for one file."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"The directory structure is kept only in main memory; only the files themselves are on disk.\"",
  "o": [
   [
    "True",
    "The lecture says both the directory structure and the files reside on disk."
   ],
   [
    "False",
    "Correct. Both the directory structure and the files reside on disk; open() brings a directory entry into memory when needed."
   ]
  ],
  "a": 1
 },
 {
  "q": "A directory implemented as a <b>linear list</b> of file names with pointers to the data blocks. What is its main drawback?",
  "o": [
   [
    "Two names can hash to the same location",
    "Collisions are the problem of the hash-table implementation."
   ],
   [
    "It only works with fixed-size entries",
    "That limit belongs to the hash table, unless chained overflow is used."
   ],
   [
    "Finding a file is time-consuming (linear search)",
    "Correct. It is simple to program but slow to search; keeping it sorted (linked list or B+ tree) helps."
   ],
   [
    "It cannot store pointers to data blocks",
    "A linear list stores each file name with a pointer to its data blocks."
   ]
  ],
  "a": 2
 },
 {
  "q": "True or False: \"A hash-table directory is only good if its entries are fixed size, or if it uses the chained-overflow method.\"",
  "o": [
   [
    "True",
    "Correct. A hash table cuts search time but must handle collisions; the lecture says it is only good with fixed-size entries or chained overflow."
   ],
   [
    "False",
    "This is the lecture's own condition for the hash-table directory."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which storage structure holds the information about a file?",
  "o": [
   [
    "The device driver",
    "The device driver controls the physical device."
   ],
   [
    "The file control block (FCB)",
    "Correct. The FCB is the storage structure holding information about a file."
   ],
   [
    "The open-file table",
    "The open-file table only tracks which files are open."
   ],
   [
    "The index block",
    "An index block holds pointers to a file's data blocks in indexed allocation."
   ]
  ],
  "a": 1
 },
 {
  "q": "On distributed systems, files are shared across a network. Which is the common distributed file-sharing method named in the lecture?",
  "o": [
   [
    "FAT",
    "FAT is a disk allocation method (linked allocation with a table)."
   ],
   [
    "FCB",
    "The FCB holds information about one file."
   ],
   [
    "NFS (Network File System)",
    "Correct. NFS is the lecture's common distributed file-sharing method."
   ],
   [
    "chmod",
    "chmod sets UNIX access modes on a file; it does not share files across a network."
   ]
  ],
  "a": 2
 },
 {
  "q": "Which of these is <b>not</b> one of the types of access the owner can control?",
  "o": [
   [
    "Defragment",
    "Correct. The types of access are read, write, execute, append, delete and list."
   ],
   [
    "Append",
    "Append is in the list of access types."
   ],
   [
    "List",
    "List is in the list of access types."
   ],
   [
    "Delete",
    "Delete is in the list of access types."
   ]
  ],
  "a": 0
 }
]);
EXTRA.os["8"] = (EXTRA.os["8"] || []).concat([
 {
  "q": "In the typical PC bus figure, which bus does the lecture name as common in PCs and servers, connecting the graphics, SCSI and IDE disk controllers?",
  "o": [
   [
    "The expansion bus",
    "The expansion bus connects relatively slow devices such as the keyboard and the serial and parallel ports."
   ],
   [
    "The Interrupt Request Line",
    "That is a single CPU wire used to signal interrupts, not a bus for controllers."
   ],
   [
    "The PCI bus",
    "Correct. PCI is the common PC and server bus; the graphics controller, SCSI controller, IDE disk controller and the expansion bus interface hang off it."
   ],
   [
    "A port",
    "A port is a connection point for one device; a bus is shared by many devices."
   ]
  ],
  "a": 2
 },
 {
  "q": "A program divides by zero on an Intel Pentium. Which entry of the event-vector table handles it?",
  "o": [
   [
    "Vector 0 (divide error)",
    "Correct. Vector 0 is the divide error."
   ],
   [
    "Vector 14",
    "Vector 14 is the page fault."
   ],
   [
    "Vector 13",
    "Vector 13 is general protection."
   ],
   [
    "Vector 32",
    "Vectors 32–255 are the maskable interrupts, not the divide error."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which is <b>not</b> one of the lecture's three device categories?",
  "o": [
   [
    "Storage",
    "Storage is one of the three categories."
   ],
   [
    "Transmission",
    "Transmission is one of the three categories."
   ],
   [
    "Human-interface",
    "Human-interface is one of the three categories."
   ],
   [
    "Processing",
    "Correct. The three categories are storage, transmission and human-interface."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"A controller (host adapter) is sometimes a separate circuit board containing a processor, microcode, private memory and a bus controller.\"",
  "o": [
   [
    "True",
    "Correct. The lecture: a controller is sometimes integrated and sometimes a separate circuit board, and contains a processor, microcode, private memory, a bus controller, etc."
   ],
   [
    "False",
    "This is the lecture's description of a controller (host adapter)."
   ]
  ],
  "a": 0
 },
 {
  "q": "During a polled <b>write</b>, where does the host put the byte to be written?",
  "o": [
   [
    "The data-in register",
    "Data-in is read by the host to get input from the device."
   ],
   [
    "The data-out register",
    "Correct. In step 2 of the handshake the host sets the write bit and copies the byte into data-out."
   ],
   [
    "The status register",
    "The status register holds bits such as busy, which the host reads."
   ],
   [
    "The control register",
    "The control register receives commands (such as command-ready), not the data byte."
   ]
  ],
  "a": 1
 },
 {
  "q": "Which is the correct order of the polling handshake for one byte?",
  "o": [
   [
    "Host sets command-ready → host reads busy until 0 → host sets read/write → controller transfers → controller clears busy",
    "The host must first wait for busy = 0; it sets command-ready only after the command and data are in place."
   ],
   [
    "Controller sets busy → host reads busy until 0 → host sets command-ready → controller transfers → host clears busy",
    "The controller sets busy only after command-ready, and it is the controller, not the host, that clears it."
   ],
   [
    "Host reads busy until 0 → controller transfers → host sets command-ready → host sets read/write → controller clears busy",
    "The controller cannot transfer before it has a command: write bit, data-out and command-ready come first."
   ],
   [
    "Host reads busy until 0 → host sets read/write (and data-out) → host sets command-ready → controller sets busy and transfers → controller clears busy, error and command-ready",
    "Correct. These are the five steps in the lecture's order."
   ]
  ],
  "a": 3
 },
 {
  "q": "Memory-mapped I/O maps device registers into the processor's address space. When is it especially used?",
  "o": [
   [
    "For large address spaces such as graphics",
    "Correct. The lecture says memory-mapped I/O is used especially for large address spaces, such as graphics."
   ],
   [
    "For slow devices that send one byte at a time, such as keyboards",
    "The lecture ties memory-mapped I/O to large address spaces such as graphics, not to small byte-at-a-time devices."
   ],
   [
    "Only for disk sectors",
    "Disks are block devices; memory-mapped I/O is about device registers and data, e.g. graphics memory."
   ],
   [
    "To hold the interrupt vector",
    "The interrupt vector holds handler addresses; it is not a device register."
   ]
  ],
  "a": 0
 },
 {
  "q": "In the interrupt-driven I/O cycle, the controller has just generated an interrupt signal (input ready, output complete or error). What happens next?",
  "o": [
   [
    "The interrupt handler returns from the interrupt",
    "The handler must first be given control and process the data."
   ],
   [
    "The device driver initiates the I/O",
    "That is the very first step of the cycle."
   ],
   [
    "The CPU, checking for interrupts between instructions, receives it and transfers control to the interrupt handler",
    "Correct. That is step 4, before the handler processes the data and returns."
   ],
   [
    "The CPU resumes the interrupted task",
    "That is the last step, after the handler returns."
   ]
  ],
  "a": 2
 },
 {
  "q": "When a controller asserts a signal on the Interrupt Request Line, what does the CPU do?",
  "o": [
   [
    "It finishes the whole running program first",
    "The line is sensed after every instruction, so the CPU responds at once, not at the end of the program."
   ],
   [
    "It starts a DMA transfer",
    "DMA is set up by the OS writing a command block; an interrupt does not start one."
   ],
   [
    "It polls the device's busy bit",
    "Interrupts exist exactly so the CPU does not have to poll the busy bit."
   ],
   [
    "It performs a state save and jumps to the interrupt-handler routine at a fixed address",
    "Correct. After the current instruction, the CPU saves state and jumps to the handler at a fixed address."
   ]
  ],
  "a": 3
 },
 {
  "q": "After the OS writes the DMA command block into memory, how does the DMA controller find it?",
  "o": [
   [
    "The CPU copies each byte of the block to the controller",
    "Copying byte by byte through the CPU is the programmed I/O that DMA avoids."
   ],
   [
    "The OS writes the location of the command block to the DMA controller",
    "Correct. That is step 4 of setting up DMA; then the controller takes the bus (bus mastering)."
   ],
   [
    "The device driver puts it in the data-out register",
    "Data-out is a device data register used in polling, not a pointer to a DMA command block."
   ],
   [
    "The controller looks it up in the interrupt vector",
    "The interrupt vector holds interrupt-handler addresses."
   ]
  ],
  "a": 1
 },
 {
  "q": "<b>Applied.</b> 4 KB of data is moved in 512-byte blocks. How many interrupts occur with DMA, compared with an interrupt for every byte?",
  "o": [
   [
    "1 with DMA, compared with 4,096",
    "DMA interrupts once per block, not once for the whole 4 KB here."
   ],
   [
    "8 in both cases",
    "Without DMA the CPU is involved for every byte, so there are 4,096, not 8."
   ],
   [
    "8 with DMA, compared with 4,096",
    "Correct. 4 KB = 4,096 bytes; 4,096 / 512 = 8 blocks, and DMA raises one interrupt per block instead of one per byte."
   ],
   [
    "4,096 with DMA, compared with 8",
    "This is reversed: DMA is the one with fewer interrupts."
   ]
  ],
  "a": 2
 },
 {
  "q": "In the six-step DMA transfer, what comes right after \"the disk controller initiates the DMA transfer\"?",
  "o": [
   [
    "The disk controller sends each byte to the DMA controller",
    "Correct. That is step 4; step 5 is the DMA controller writing the bytes into buffer X."
   ],
   [
    "DMA interrupts the CPU to signal completion",
    "That is step 6, when C reaches 0."
   ],
   [
    "The device driver tells the disk controller to transfer C bytes",
    "That is step 2, before the transfer starts."
   ],
   [
    "The DMA controller transfers the bytes to buffer X",
    "That is step 5; the bytes must first reach the DMA controller."
   ]
  ],
  "a": 0
 },
 {
  "q": "On one device data must be read in order; on another any position can be reached directly. Which dimension of device variety is this?",
  "o": [
   [
    "Sharable or dedicated",
    "That is about whether several processes can use the device at once."
   ],
   [
    "Synchronous or asynchronous",
    "That is about timing of transfers, not about order of access."
   ],
   [
    "Sequential or random-access",
    "Correct. This is the sequential vs random-access dimension in the lecture's list."
   ],
   [
    "Read-write, read-only or write-only",
    "That is about which directions of transfer are allowed."
   ]
  ],
  "a": 2
 },
 {
  "q": "True or False: \"Because the device-driver layer hides differences among I/O controllers from the kernel, a new device using an already-implemented protocol needs no extra work.\"",
  "o": [
   [
    "True",
    "Correct. The lecture states both points: the driver layer hides controller differences, and new devices using implemented protocols need no extra work."
   ],
   [
    "False",
    "This is exactly what the lecture says about the device-driver layer."
   ]
  ],
  "a": 0
 },
 {
  "q": "On a block device, memory-mapped file access maps the file into virtual memory. How are its clusters brought in?",
  "o": [
   [
    "All at once when the file is opened",
    "Demand paging brings in only what is referenced, not the whole file at open."
   ],
   [
    "With get() and put()",
    "get() and put() are character-device commands."
   ],
   [
    "By polling each byte",
    "Polling is a way of talking to device registers, not how a mapped file is loaded."
   ],
   [
    "By demand paging",
    "Correct. The lecture: the file is mapped to virtual memory and clusters are brought in via demand paging."
   ]
  ],
  "a": 3
 },
 {
  "q": "True or False: \"For character devices, libraries layered on top of get() and put() allow line editing.\"",
  "o": [
   [
    "True",
    "Correct. The lecture: character devices (keyboard, mouse, serial ports) use get() and put(), and libraries layered on top allow line editing."
   ],
   [
    "False",
    "The lecture says exactly this about character devices."
   ]
  ],
  "a": 0
 },
 {
  "q": "Which is <b>not</b> one of the ways the lecture says I/O affects system performance?",
  "o": [
   [
    "The CPU must execute device-driver code",
    "This is listed: I/O demands the CPU to run driver code."
   ],
   [
    "It causes external fragmentation of main memory",
    "Correct. Fragmentation is a memory-allocation problem (Topic 4). The I/O costs are CPU time for driver code, context switches due to interrupts, and data copying."
   ],
   [
    "Interrupts cause context switches",
    "This is listed: context switches due to interrupts."
   ],
   [
    "Data must be copied",
    "This is listed: I/O causes data copying."
   ]
  ],
  "a": 1
 },
 {
  "q": "True or False: \"One of the lecture's ways to reduce interrupts is to use polling, along with large transfers and smart controllers.\"",
  "o": [
   [
    "True",
    "Correct. \"Reduce interrupts by using large transfers, smart controllers, polling\" is in the list of ways to improve performance."
   ],
   [
    "False",
    "The lecture lists polling among the ways to reduce interrupts. Polling is wasteful only when it busy-waits on a slow device."
   ]
  ],
  "a": 0
 },
 {
  "q": "True or False: \"Because DMA steals bus cycles from the CPU, it is less efficient than programmed I/O.\"",
  "o": [
   [
    "True",
    "The lecture says cycle stealing costs a little but DMA is still much more efficient than moving one byte at a time."
   ],
   [
    "False",
    "Correct. Cycle stealing has a small cost, but DMA is still much more efficient: one interrupt per block and the CPU is free for other work."
   ]
  ],
  "a": 1
 },
 {
  "q": "Why is it sometimes better for the controller to <b>interrupt</b> the CPU than for the CPU to poll it?",
  "o": [
   [
    "Interrupts have no overhead at all",
    "Servicing an interrupt costs a state save, the handler, and a state restore."
   ],
   [
    "With interrupts the data moves without the CPU",
    "Moving data without the CPU is DMA; with plain interrupt-driven I/O the handler still processes the data."
   ],
   [
    "With a slow device the CPU does not waste time busy-waiting and can switch to other tasks",
    "Correct. Polling's busy-wait is inefficient when the device is slow; an interrupt notifies the CPU only when the device is ready."
   ],
   [
    "Devices cannot be polled",
    "Polling works with any device; it is just wasteful for slow ones."
   ]
  ],
  "a": 2
 }
]);
