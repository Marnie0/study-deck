window.COURSES = window.COURSES || {};
COURSES.micro = {
  id: `micro`,
  name: `Microprocessors & Assembly Language`,
  short: `Micro`,
  code: `CS203`,
  by: `Dr. Lamiaa Hassaan, Dr. Ahmed Ibrahim`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Introduction: Hardware, Software, Languages and Memory`,
      notes: [
        { h: `Hardware, software and the compiler`, pts: [
          `<b>Computer hardware</b>, being part of a machine, can only understand two basic concepts: <b>on and off</b>. The on and off concept is called <b>binary</b>.`,
          `<b>Computer software</b> translates concepts and directions that people can understand into something that can actually be done on the hardware. It tells the computer <b>what to do and where to do it</b>. These commands are called <b>source code</b>.`,
          `A <b>compiler</b> is another program used on the source code, transforming the commands into a language the computer understands. The result is an <b>executable program</b> (another name for software).`,
          `<b>Three categories of software</b>: <b>System software</b> (programs that allow the hardware to run properly), <b>Application software</b> (programs that let users do something besides simply running the hardware), <b>Programming software</b> (allows programmers to build software).`
        ]},
        { h: `Three categories of programming languages`, table: [
          [`Language`, `Definition (lecture wording)`],
          [`Machine language (machine code)`, `The <b>native / elemental</b> language of computers, a string of <b>0's and 1's</b>. Directly understood and executed by the machine.`],
          [`Assembly language`, `Also called a <b>low-level</b> language, <b>one step away</b> from machine language. The most basic language available for a processor; the programmer works only with operations implemented <b>directly on the physical CPU</b>.`],
          [`High-level language`, `<b>Machine-independent</b> (C, FORTRAN, Java). Closer to human languages and further from machine languages.`]
        ]},
        { h: `Assembly language and the assembler`, pts: [
          `Assembly language is <b>hardware dependent</b>: each type of CPU has its own machine language and assembly language, so a program written for one CPU type won't run on another. Different manufacturers need <b>different assemblers</b>.`,
          `Assembly has the <b>same structure and set of commands as machine language</b>, but lets the programmer use <b>names instead of numbers</b> (mnemonics such as MOV, ADD).`,
          `To run, an assembly program must be translated into machine code by an <b>assembler</b>: a program that translates a program written in a low-level language (<b>"source code"</b>) into executable code (<b>"object code"</b>). Figure: Source code (.ASM) → ASSEMBLER → Object code (.OBJ) → Hardware.`,
          `File extensions (revision sheet): every assembly program is saved as <b>.ASM</b>; the coded object modules are in the <b>.OBJ</b> file; the linker then produces the <b>.EXE</b>.`,
          `A <b>debugger</b> lets the programmer run the program <b>step by step</b> to find the exact location of an error.`
        ]},
        { h: `Debugger vs. Assembler (very frequent exam question)`, table: [
          [`Debugger`, `Assembler`],
          [`Easy to run`, `Hard to run`],
          [`Low overhead programs`, `More program overhead`],
          [`Close to the machine`, `Isolated from the machine`],
          [`Good on short programs`, `Good on long programs`]
        ]},
        { h: `Microcomputer block diagram`, pts: [
          `<b>Computer hardware</b> is the collection of physical components that make up a computer.`,
          `Block diagram to draw: a <b>CPU</b> box (containing <b>registers</b>, and <b>ALU | CU | clock</b>), a <b>Memory Storage Unit</b>, and <b>I/O Device #1</b>, <b>I/O Device #2</b>, all connected by three horizontal buses: the <b>data bus</b> (top), the <b>control bus</b> (dashed) and the <b>address bus</b> (bottom).`,
          `<b>CPU</b>: where all calculations and logic operations take place. It contains a limited number of storage locations called <b>registers</b>, a high-frequency <b>clock</b>, a <b>control unit</b> and an <b>arithmetic logic unit</b>.`,
          `<b>ALU</b>: performs arithmetic (addition, subtraction) and logical operations (AND, OR, NOT).`,
          `<b>CU</b>: coordinates the sequencing of steps involved in executing machine instructions.`,
          `<b>Clock</b>: synchronizes the internal operations of the CPU with other system components (it provides the basic timing for processor operation and bus control activity).`,
          `<b>Memory storage unit</b>: where instructions and data are held while a program is running. It receives requests for data from the CPU, transfers data from RAM to the CPU, and from the CPU into memory.`
        ]},
        { h: `Buses`, pts: [
          `A <b>bus</b> is a group of <b>parallel wires</b> that transfer data from one part of the computer to another.`,
          `<b>Data bus</b>: transfers <b>instructions and data</b> between the CPU and memory.`,
          `<b>Control bus</b>: uses <b>binary signals</b> to synchronize the actions of all devices attached to the system bus.`,
          `<b>Address bus</b>: holds the <b>addresses</b> of instructions and data when the currently executing instruction transfers data between the CPU and memory.`
        ]},
        { h: `Types of memory`, table: [
          [`Memory`, `Definition`],
          [`RAM (Random Access Memory)`, `Semiconductor memory used for <b>reading and writing data in any order</b>, as required by the processor. Volatile.`],
          [`ROM (Read Only Memory)`, `Data is <b>written once and then not changed</b>; stored <b>permanently, even when the power is removed</b>.`],
          [`PROM (Programmable ROM)`, `Data is written into the chip <b>before it is installed</b> in the circuit, and can only be written <b>once</b>, using a device called a <b>PROM programmer</b>.`],
          [`EPROM (Erasable Programmable ROM)`, `Rewritten by <b>removing the chip</b> from the board, exposing it to <b>ultraviolet light</b> to erase, then plugging it into a PROM programmer. Has a small transparent <b>"window"</b> to admit UV light. Used for <b>prototypes and small production runs</b>.`],
          [`EEPROM (Electrically Erasable PROM)`, `Rewritten <b>electrically while the chip is on the circuit board</b>, but the writing process is <b>slow</b>. Holds <b>firmware</b> such as the <b>BIOS</b> so it can be updated.`]
        ]},
        { h: `Registers (preview) and Lab 1`, pts: [
          `A <b>register</b> is a <b>high speed temporary storage area built into a CPU</b>. (Lab: "a high-speed memory"; each register has a specific length.)`,
          `Lab 1: assembly language is a low-level language that works on the memory of the processor. We work on the model of the <b>Intel 8086</b> processor, using the <b>emu8086</b> emulator (New → empty workspace → write code → <b>emulate</b>; <b>single step</b> runs line by line, <b>run</b> runs the whole program).`,
          `Lab register types: <b>1. General purpose</b> (AX, BX, CX, DX, SI, DI, SP, BP), <b>2. Special purpose</b> (IP, FLAGS), <b>3. Segment</b> (CS, DS, ES, SS). Details in Lecture 2.`
        ]}
      ],
      cards: [
        [`Binary`, `The on/off concept that hardware understands.`],
        [`Source code`, `Commands written by people that tell the computer what to do and where to do it.`],
        [`Compiler`, `Transforms source code into an executable program.`],
        [`Three categories of software`, `System software, programming software, application software.`],
        [`Three categories of programming languages`, `Machine language, assembly language, high-level language.`],
        [`Machine language`, `Native language of the computer: a string of 0's and 1's.`],
        [`Assembly language`, `Low-level language one step away from machine language; uses names instead of numbers; hardware dependent.`],
        [`Assembler`, `Translates low-level source code into executable object code.`],
        [`Debugger`, `Runs the program step by step to find the exact location of an error; easy to run, good on short programs.`],
        [`Assembler vs debugger in one line`, `Assembler: hard to run, more overhead, isolated from machine, good on long programs. Debugger: the opposite.`],
        [`CPU contains`, `Registers, a high-frequency clock, a control unit (CU) and an ALU.`],
        [`Control unit`, `Coordinates the sequencing of steps in executing machine instructions.`],
        [`Clock`, `Synchronizes internal CPU operations with other system components.`],
        [`Bus`, `A group of parallel wires transferring data from one part of the computer to another.`],
        [`Control bus`, `Uses binary signals to synchronize all devices attached to the system bus.`],
        [`Address bus`, `Holds the addresses of instructions and data during CPU-memory transfers.`],
        [`EPROM erased by`, `Ultraviolet light through a transparent window, after removing the chip.`],
        [`EEPROM`, `Rewritten electrically on the board, but slowly; holds firmware such as the BIOS.`],
        [`PROM`, `Written once, before installation, with a PROM programmer.`],
        [`Assembly file extensions`, `.ASM source, .OBJ object modules, .EXE executable.`]
      ],
      qa: [
        [`Compare between a debugger and an assembler.`, `<table><tr><th>Debugger</th><th>Assembler</th></tr><tr><td>Easy to run</td><td>Hard to run</td></tr><tr><td>Low overhead programs</td><td>More program overhead</td></tr><tr><td>Close to the machine</td><td>Isolated from the machine</td></tr><tr><td>Good on short programs</td><td>Good on long programs</td></tr></table>`],
        [`What is a bus? Describe the different types of buses.`, `A bus is a group of parallel wires that transfer data from one part of the computer to another.<br><b>Data bus</b>: transfers instructions and data between the CPU and memory.<br><b>Control bus</b>: uses binary signals to synchronize the actions of all devices attached to the system bus.<br><b>Address bus</b>: holds the addresses of instructions and data when the executing instruction transfers data between the CPU and memory.`],
        [`Draw a block diagram of a microcomputer and describe its parts.`, `Diagram: CPU box (registers on top; ALU, CU, clock at the bottom), Memory Storage Unit, I/O Device #1 and I/O Device #2, all hanging from a <b>data bus</b> at the top and joined at the bottom by a dashed <b>control bus</b> and the <b>address bus</b>.<br>CPU: does all calculations and logic; contains registers, clock, CU and ALU. ALU: arithmetic and logic operations. CU: sequences the steps of executing instructions. Clock: synchronizes CPU operations with other components. Memory storage unit: holds instructions and data while the program runs, transferring data between RAM and CPU.`],
        [`Differentiate between PROM and EPROM.`, `<b>PROM</b>: data is written into the chip before it is installed in the circuit, but it can only be written <b>once</b>, using a PROM programmer.<br><b>EPROM</b>: data can be <b>rewritten</b> by removing the chip from the board, exposing it to ultraviolet light to erase it, and plugging it into a PROM programmer. It has a small transparent window to admit the UV light and is used for prototypes and small production runs.`],
        [`Differentiate between EPROM and EEPROM.`, `<b>EPROM</b>: erased by removing the chip and exposing it to <b>ultraviolet light</b> (transparent window), then reprogrammed in a PROM programmer; used for prototypes and small production runs.<br><b>EEPROM</b>: rewritten <b>electrically while the chip stays on the circuit board</b>, but writing is slow; used to hold firmware such as the BIOS so it can be updated.`],
        [`Why is assembly language called hardware dependent?`, `Each type of CPU has its own machine language and assembly language, so an assembly program written for one CPU type won't run on another. Computers from different manufacturers therefore need different assemblers and assembly languages.`],
        [`State the three categories of software and of programming languages.`, `Software: system software (lets the hardware run properly), application software (lets users do tasks), programming software (lets programmers build software).<br>Languages: machine language (0s and 1s), assembly language (low level, names instead of numbers), high-level language (machine independent, e.g. C, FORTRAN, Java).`]
      ],
      quiz: [
        { q: `Computer software is:`, o: [
          [`System software`, `Only one of the three categories.`],
          [`Application software`, `Only one of the three categories.`],
          [`Programming software`, `Only one of the three categories.`],
          [`All of the mentioned`, `Correct. Software falls into system, programming and application software.`]
        ], a: 3, src: `Revision sheet` },
        { q: `Programming languages of a microcomputer are:`, o: [
          [`Machine language`, `Only one of the three categories.`],
          [`Assembly language`, `Only one of the three categories.`],
          [`High level languages`, `Only one of the three categories.`],
          [`All of the mentioned`, `Correct. Machine, assembly and high-level languages.`]
        ], a: 3, src: `Revision sheet` },
        { q: `A debugger is:`, o: [
          [`Easy to run and good with small programs`, `Correct. Debugger: easy to run, low overhead, close to the machine, good on short programs.`],
          [`Difficult to run but good with small programs`, `A debugger is easy to run.`],
          [`Easy to run and good with long programs`, `Long programs suit the assembler.`],
          [`Difficult to run and good with long programs`, `That describes the assembler.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `An assembler is:`, o: [
          [`Easy to run and good with small programs`, `That is the debugger.`],
          [`Difficult to run but good with small programs`, `Assemblers are good with long programs.`],
          [`Easy to run and good with long programs`, `Assemblers are hard to run.`],
          [`Difficult to run and good with long programs`, `Correct. Hard to run, more overhead, isolated from the machine, good on long programs.`]
        ], a: 3, src: `Midterm 2023/24` },
        { q: `………. is a form of semiconductor memory where the data is written once and then not changed; it is stored permanently even when the power is removed.`, o: [
          [`RAM`, `RAM is read/write in any order and loses data without power.`],
          [`ROM`, `Correct. That is the lecture definition of ROM.`],
          [`CPU`, `The CPU is not memory technology.`],
          [`None`, `ROM matches exactly.`]
        ], a: 1, src: `Revision sheet` },
        { q: `……… uses binary signals to synchronize the actions of all devices attached to the system bus.`, o: [
          [`Data bus`, `The data bus carries instructions and data.`],
          [`Control bus`, `Correct. Lecture definition of the control bus.`],
          [`Address bus`, `The address bus holds addresses.`],
          [`None of the mentioned`, `The control bus matches.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `……. is a form of semiconductor memory where data can be rewritten by removing the chip from the circuit board and exposing it to ultraviolet light.`, o: [
          [`EPROM`, `Correct. EPROM is erased with UV light through its window.`],
          [`ROM`, `ROM is written once and never changed.`],
          [`PROM`, `PROM can only be written once.`],
          [`RAM`, `RAM is rewritten electrically in normal operation.`]
        ], a: 0, src: `Revision sheet` },
        { q: `A chip on which data can be rewritten electrically while the chip is on the circuit board, but the writing process is slow:`, o: [
          [`EROM`, `Not a memory type in the lecture.`],
          [`PROM`, `PROM is written only once.`],
          [`EEPROM`, `Correct. Electrically erasable, on the board, slow writing.`],
          [`None of the mentioned`, `EEPROM matches exactly.`]
        ], a: 2, src: `Exam 2022/23 Summer` },
        { q: `PROM stands for:`, o: [
          [`Programmable read only memory`, `Correct.`],
          [`Programmable read write memory`, `PROM is read only.`],
          [`Portable read only memory`, `P is for Programmable.`],
          [`None of the mentioned`, `Option a is correct.`]
        ], a: 0, src: `Midterm 2022/23` },
        { q: `EPROM stands for (midterm form B options):`, o: [
          [`Electrically programmable read only memory`, `E stands for Erasable (EEPROM is the electrically erasable one). The 2022/23 key underlined this option, but it is wrong.`],
          [`Erasable programmable read write memory`, `It is read ONLY memory, not read write.`],
          [`Erasable portable read only memory`, `P is Programmable, not portable.`],
          [`None of the mentioned`, `Correct. EPROM = Erasable Programmable Read Only Memory, which is not listed exactly.`]
        ], a: 3, src: `Midterm 2022/23` },
        { q: `EPROM stands for:`, o: [
          [`Erasable programmable read only memory`, `Correct.`],
          [`Electrically programmable read write memory`, `Wrong expansion.`],
          [`Electrically programmable read only memory`, `E stands for Erasable.`],
          [`None`, `Option a is correct.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The coded object modules of the program to be assembled are present in:`, o: [
          [`.ASM file`, `The .ASM file holds the source code.`],
          [`.OBJ file`, `Correct. The assembler produces object code in the .OBJ file.`],
          [`.EXE file`, `The .EXE is the linked executable.`],
          [`.OBJECT file`, `No such standard extension.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The advantages of assembly level programming are:`, o: [
          [`Flexibility of programming is more`, `True, but not the only advantage listed.`],
          [`Chances of error are less`, `Listed, but not alone.`],
          [`Debugging is easy`, `Listed, but not alone.`],
          [`All of the mentioned`, `Correct according to the revision key.`]
        ], a: 3, src: `Revision sheet` },
        { q: `The extension that is essential for every assembly level program is:`, o: [
          [`.ASP`, `That is a web page extension.`],
          [`.ALP`, `Not the standard extension.`],
          [`.ASM`, `Correct. Assembly source files use .ASM.`],
          [`.PGM`, `Not used for assembly source.`]
        ], a: 2, src: `Revision sheet` },
        { q: `……… enables the programmer to run the program step by step to find the exact location of an error.`, o: [
          [`Compiler`, `A compiler translates code.`],
          [`Editor`, `An editor is for writing code.`],
          [`Debugger`, `Correct.`],
          [`None`, `The debugger does this.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The control bus uses ……… to synchronize the actions of all devices attached to the system bus.`, o: [
          [`Binary signals`, `Correct.`],
          [`Continuous signals`, `Digital buses use binary signals.`],
          [`a and b`, `Only binary signals.`],
          [`None`, `Binary signals is correct.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Each memory location has:`, o: [
          [`An address`, `It also has contents.`],
          [`Contents`, `It also has an address.`],
          [`a and b`, `Correct. Every location has an address and contents.`],
          [`None`, `Both apply.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The set of parallel electrical conducting lines connecting the components of the motherboard is called:`, o: [
          [`Conductors`, `Too general.`],
          [`Connectors`, `Connectors are plugs.`],
          [`Busses`, `Correct. A bus is a group of parallel wires.`],
          [`Consecutives`, `Meaningless distractor.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Assembler is a type of translator that translates …… language into machine level language.`, o: [
          [`High level`, `That is a compiler.`],
          [`Assembly level`, `Correct.`],
          [`Both A and B`, `Only assembly language.`],
          [`None of the above`, `Assembly level is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `System software is suited for specific applications.`, o: [
          [`True`, `Application software serves specific tasks; system software lets the hardware run.`],
          [`False`, `Correct. System software allows the hardware to run properly.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Machine language can be directly understood and executed by a machine, and it is the language of 0s and 1s.`, o: [
          [`True`, `Correct.`],
          [`False`, `This is exactly the lecture definition.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The clock input provides the basic timing for processor operation and bus control activity.`, o: [
          [`True`, `Correct. The clock synchronizes CPU operations with other components.`],
          [`False`, `This is the clock's role.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Random Access Memory is a form of semiconductor memory technology used for reading and writing data in any order.`, o: [
          [`True`, `Correct. Lecture definition of RAM.`],
          [`False`, `This is the exact definition.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `In EEPROM, data can be rewritten electrically while the chip is on the circuit board, and the writing process is fast.`, o: [
          [`True`, `The writing process is slow.`],
          [`False`, `Correct. Writing is slow.`]
        ], a: 1, src: `Revision sheet` },
        { q: `In PROM, data is written into the chip after it is installed in the circuit, but it can only be written once.`, o: [
          [`True`, `It is written BEFORE installation.`],
          [`False`, `Correct. Written before installation.`]
        ], a: 1, src: `Revision sheet` },
        { q: `In PROM, data is written into the chip before being installed in the circuit, but it can only be written once.`, o: [
          [`True`, `Correct.`],
          [`False`, `This matches the definition.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `Assembly language is hardware (machine) dependent.`, o: [
          [`True`, `Correct. Each CPU type has its own assembly language.`],
          [`False`, `The lecture underlines "hardware dependent".`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `The data bus transfers instructions and data between the CPU and memory.`, o: [
          [`True`, `Correct.`],
          [`False`, `This is the lecture definition.`]
        ], a: 0, src: `Exam 2024/25` }
      ]
    },
    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `Registers and the MOV Instruction`,
      notes: [
        { h: `Register classification`, pts: [
          `A <b>register</b> is a high speed temporary storage area built into a CPU.`,
          `A processor has <b>user-visible</b> registers and <b>user-invisible</b> (control/status) registers.`,
          `User-visible: <b>General purpose</b>, <b>Special purpose</b>, <b>Segment registers</b>. User-invisible: <b>Program Counter (PC)</b>, <b>MAR</b>, <b>MBR</b>, <b>Instruction Register (IR)</b>.`,
          `User-visible registers may be general purpose or have a special use (fixed/floating-point numbers, addresses, indexes, segment pointers). User-invisible registers are used to <b>control the operation of the CPU</b>.`,
          `A <b>user-visible register</b> is one that may be referenced by the machine language the CPU executes. They let the programmer <b>minimize main memory references</b> by optimizing use of registers.`
        ]},
        { h: `General purpose registers`, pts: [
          `Primarily used for <b>arithmetic and data movement</b>. There are <b>eight</b> on the 80x86: <b>EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI</b>. Many instructions work more efficiently with, or absolutely require, a specific one.`,
          `Each can be addressed as one <b>32-bit</b> value or as <b>16-bit</b> values; some also as <b>8-bit</b> parts. EAX is 32 bits; its lower 16 bits are <b>AX</b>; the upper 8 bits of AX are <b>AH</b>, the lower 8 bits are <b>AL</b>.`,
          `Only <b>AX, BX, CX, DX</b> have 8-bit halves (AH/AL, BH/BL, CH/CL, DH/DL). <b>SI, DI, SP, BP</b> have <b>no</b> 8-bit halves: there is no SH/SL, so you can use ESP or ESI only as 16 or 32 bits.`,
          `Lab example: if AX = 0011000000111001b then AH = 00110000b and AL = 00111001b. Modifying an 8-bit half also updates the 16-bit register.`
        ]},
        { h: `Roles of each register (Lab 1 + programming model)`, table: [
          [`Register`, `Name`, `Use`],
          [`AX (EAX)`, `Accumulator`, `Math and logic; often holds the result. Must be used in MUL and DIV.`],
          [`BX (EBX)`, `Base index`, `Holds the base (offset) address of a memory location.`],
          [`CX (ECX)`, `Count`, `Count for rotate, shift and LOOP instructions.`],
          [`DX (EDX)`, `Data`, `Extension of AX in multiplication and division (holds the remainder in DIV).`],
          [`SP (ESP)`, `Stack pointer`, `Offset of the top of the stack inside the stack segment.`],
          [`BP (EBP)`, `Base pointer`, `Addresses an array of data in the stack.`],
          [`DI (EDI)`, `Destination index`, `Destination data for string instructions.`],
          [`SI (ESI)`, `Source index`, `Source data for string instructions.`],
          [`IP (EIP)`, `Instruction pointer`, `With CS (CS:IP) points to the next instruction to fetch.`],
          [`FLAGS (EFLAGS)`, `Flags`, `Status of the processor and control of its operation.`]
        ]},
        { h: `Segment registers`, pts: [
          `Segment registers are used as <b>base locations</b> for pre-assigned memory areas called <b>segments</b>: code segment (program instructions), data segment (variables), stack segment (local function variables and parameters).`,
          `<b>CS</b> (Code Segment): addresses the segment where the executable program (instructions) is stored.`,
          `<b>DS</b> (Data Segment): points to the segment where data is stored.`,
          `<b>ES</b> (Extra Segment): another data segment.`,
          `<b>SS</b> (Stack Segment): holds the starting address of the currently active stack segment. (FS and GS also exist on 80386+.)`,
          `Segment registers are <b>16-bit user-visible</b> registers. DI and SI are <b>not</b> segment registers. Segment registers cannot be used as operands of arithmetic and logical instructions.`
        ]},
        { h: `Special purpose registers (EIP, EFLAGS)`, pts: [
          `Two special purpose registers: <b>EIP</b> and <b>EFLAGS</b> (32-bit). You do not access them the way you access other registers; the CPU manipulates them directly.`,
          `<b>EIP (Instruction Pointer)</b>: contains the <b>address of the next instruction to be executed</b>. Certain instructions (jumps) manipulate it to branch.`,
          `<b>EFLAGS</b>: individual binary bits that either <b>control the operation of the CPU</b> or <b>reflect the outcome</b> of some CPU operation (the condition of the result of an ALU operation). It keeps track of the status of the running environment. Instructions can test and manipulate the flags.`
        ]},
        { h: `EFLAGS bits`, table: [
          [`Group`, `Flags`],
          [`Status flags`, `<b>CF</b> carry, <b>PF</b> parity, <b>AF</b> auxiliary carry, <b>ZF</b> zero, <b>SF</b> sign, <b>OF</b> overflow`],
          [`Control flag`, `<b>DF</b> direction (used by string instructions)`],
          [`System flags`, `TF trap, IF interrupt, IOPL I/O privilege level, NT nested task, RF resume, VM virtual 8086 mode, AC alignment check, VIF virtual interrupt flag, VIP virtual interrupt pending, ID`],
          [`Z (zero)`, `Set to 1 when the arithmetic result is zero.`],
          [`C (carry)`, `Set when the result of an <b>unsigned</b> operation is too large to fit in the destination (also the <b>borrow</b> flag for SBB).`],
          [`S (sign)`, `Set when the result is negative (most significant bit = 1).`],
          [`O (overflow)`, `Set when the signed result is too large or too small to fit into the destination.`]
        ]},
        { h: `User-invisible registers`, table: [
          [`Register`, `Contains`],
          [`PC (Program Counter)`, `The <b>address of an instruction to be fetched</b> (next instruction).`],
          [`IR (Instruction Register)`, `The <b>instruction most recently fetched</b> (the instruction being executed).`],
          [`MAR (Memory Address Register)`, `The <b>address of a location in memory</b>.`],
          [`MBR (Memory Buffer Register)`, `A <b>word of data to be written to memory</b> or the word most recently read.`]
        ]},
        { h: `MOV instruction`, pts: [
          `MOV copies the contents of a register or memory location (or immediate data) into another register or memory location. Syntax: <code>MOV destination, source</code>.`,
          `<code>MOV EAX, 100</code> copies 100 decimal into EAX. <code>MOV BL, 10H</code> copies 10 hexadecimal into BL. <code>MOV DX, CX</code> copies the content of CX into DX.`,
          `A <b>word</b> is <b>2 bytes</b> (16 bits); a double word is 4 bytes.`
        ]}
      ],
      cards: [
        [`Register`, `A high speed temporary storage area built into a CPU.`],
        [`User-visible register`, `One that may be referenced by the machine language the CPU executes; lets the programmer minimize memory references.`],
        [`User-visible groups`, `General purpose, special purpose, segment registers.`],
        [`User-invisible registers`, `PC, IR, MAR, MBR.`],
        [`Eight 80x86 general purpose registers`, `EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI.`],
        [`AH / AL`, `Upper / lower 8 bits of AX (lower 16 bits of EAX).`],
        [`8-bit parts of SI, DI, SP, BP`, `None. There is no SL/SH; use 16 or 32 bits only.`],
        [`Special purpose registers`, `EIP and EFLAGS (32-bit).`],
        [`EIP`, `Address of the next instruction to be executed.`],
        [`EFLAGS`, `Bits that control the CPU or reflect the outcome of operations.`],
        [`PC`, `Address of an instruction to be fetched.`],
        [`IR`, `Instruction most recently fetched.`],
        [`MAR`, `Address of a location in memory.`],
        [`MBR`, `Word to be written to memory or most recently read.`],
        [`CS`, `Code segment: holds the instructions executed by the microprocessor.`],
        [`SS`, `Stack segment: address of the stack segment.`],
        [`CX role`, `Counter for LOOP, shifts and rotates.`],
        [`DX role`, `Extension of AX for MUL/DIV; remainder after DIV.`],
        [`S, O, C, Z bits`, `Sign, Overflow, Carry, Zero.`],
        [`Word`, `2 bytes.`]
      ],
      qa: [
        [`Define user-visible registers and state their types.`, `A user-visible register is one that may be referenced by means of the machine language the CPU executes. They enable the programmer to minimize main memory references by optimizing register use. Types: general purpose (EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI), special purpose (EIP, EFLAGS) and segment registers (CS, DS, ES, SS).`],
        [`What are user-invisible registers? State and describe four of them.`, `Control and status registers that are used to control the operation of the CPU and cannot be referenced by the assembly programmer.<br><b>PC</b>: contains the address of an instruction to be fetched.<br><b>IR</b>: contains the instruction most recently fetched.<br><b>MAR</b>: contains the address of a location in memory.<br><b>MBR</b>: contains a word of data to be written to memory or the word most recently read.`],
        [`Define EIP and EFLAGS.`, `<b>EIP</b> (instruction pointer) contains the address of the next instruction to be executed; jump instructions change it to branch. <b>EFLAGS</b> consists of individual binary bits that either control the operation of the CPU or reflect the outcome of some CPU operation.`],
        [`State the functions of the Z, C, S and O bits of EFLAGS.`, `<b>ZF</b>: set if the arithmetic result is zero. <b>CF</b>: set if the result of an unsigned operation is too large to fit into the destination. <b>SF</b>: set if the result is negative. <b>OF</b>: set if the (signed) result is too large or too small to fit into the destination.`],
        [`Explain how EAX is divided and which registers can be used as 8-bit values.`, `EAX is 32 bits; its lower 16 bits are AX; AX splits into AH (upper 8 bits) and AL (lower 8 bits). The same is true for EBX/BX/BH/BL, ECX/CX/CH/CL, EDX/DX/DH/DL. ESP, EBP, ESI, EDI only have 16-bit parts (SP, BP, SI, DI); there is no 8-bit part such as SL or SH.`],
        [`Describe the four segment registers.`, `CS: code segment, holds the program instructions. DS: data segment, holds variables. ES: extra segment, another data segment. SS: stack segment, holds the starting address of the active stack (local variables, parameters, return addresses).`]
      ],
      quiz: [
        { q: `……. is a high speed temporary storage area built into the CPU.`, o: [
          [`A processor`, `The processor is the whole CPU.`],
          [`ALU`, `The ALU performs operations, it does not store.`],
          [`A bus`, `A bus transfers data.`],
          [`A register`, `Correct. Lecture definition.`]
        ], a: 3, src: `Exam 2024/25` },
        { q: `The C bit in the EFLAGS register refers to:`, o: [
          [`Compute bit`, `No such flag.`],
          [`Control bit`, `C is not "control".`],
          [`Carry bit`, `Correct. CF = carry flag.`],
          [`None of the mentioned`, `Carry is listed.`]
        ], a: 2, src: `Exam 2024/25` },
        { q: `The S bit in the EFLAGS register refers to:`, o: [
          [`Status bit`, `S is not "status".`],
          [`Sign bit`, `Correct. SF is set when the result is negative.`],
          [`Sign extension bit`, `No such flag.`],
          [`None of the mentioned`, `Sign is listed.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The O bit in the EFLAGS register refers to:`, o: [
          [`Overflow bit`, `Correct.`],
          [`Overload bit`, `No such flag.`],
          [`Override segment bit`, `Segment override is a prefix, not a flag.`],
          [`None of the mentioned`, `Overflow is listed.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `……. contains the address of an instruction to be fetched.`, o: [
          [`PC`, `Correct. Program Counter.`],
          [`MAR`, `MAR holds the address of a memory location (data).`],
          [`IR`, `IR holds the instruction most recently fetched.`],
          [`MBR`, `MBR holds a data word.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `……. contains the instruction most recently fetched.`, o: [
          [`PC`, `PC holds the address of the next instruction.`],
          [`MAR`, `MAR holds a memory address.`],
          [`IR`, `Correct. Instruction Register.`],
          [`MBR`, `MBR holds data.`]
        ], a: 2, src: `Exam 2023/24` },
        { q: `……. contains a word of data to be written to memory or the word most recently read.`, o: [
          [`PC`, `PC is about instruction addresses.`],
          [`MAR`, `MAR holds the address, not the data.`],
          [`IR`, `IR holds the instruction.`],
          [`MBR`, `Correct. Memory Buffer Register.`]
        ], a: 3, src: `Revision sheet` },
        { q: `……. contains the address of a location in memory.`, o: [
          [`PC`, `PC holds the address of the next instruction specifically.`],
          [`MBR`, `MBR holds the data word.`],
          [`IR`, `IR holds the instruction.`],
          [`MAR`, `Correct. Memory Address Register.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `MBR is a …….. register.`, o: [
          [`General purpose`, `General purpose registers are EAX, EBX ...`],
          [`User invisible`, `Correct. PC, IR, MAR and MBR are user invisible.`],
          [`User visible`, `MBR cannot be referenced by the programmer.`],
          [`Special purpose`, `Special purpose registers are EIP and EFLAGS.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `PC is a ……….. register.`, o: [
          [`General purpose`, `No.`],
          [`User visible`, `PC is listed under user-invisible.`],
          [`User invisible`, `Correct.`],
          [`Special purpose`, `In the lecture tree, PC is user-invisible.`]
        ], a: 2, src: `Midterm 2023/24` },
        { q: `Examples of user visible registers:`, o: [
          [`EAX, AX, ESP, BP`, `Correct. All are general purpose, user-visible.`],
          [`EAX, AX, MAR, IR`, `MAR and IR are user-invisible.`],
          [`ECX, MBR, DX, SS`, `MBR is user-invisible.`],
          [`None`, `Option a is correct.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Special purpose registers are:`, o: [
          [`16-bit registers such as CS, DS`, `Those are segment registers.`],
          [`32-bit registers such as EFLAGS`, `Correct. EIP and EFLAGS.`],
          [`32-bit registers such as ECX, EDX`, `Those are general purpose.`],
          [`None`, `Option b is correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `General purpose registers are:`, o: [
          [`16-bit registers such as CS, DS`, `Segment registers.`],
          [`32-bit registers such as EFLAGS`, `EFLAGS is special purpose.`],
          [`32-bit registers such as ECX, EDX`, `Correct.`],
          [`None`, `Option c is correct.`]
        ], a: 2, src: `Midterm 2022/23` },
        { q: `General purpose registers are (form B):`, o: [
          [`16-bit registers such as CS, DS`, `Segment registers.`],
          [`32-bit registers such as EAX, EBX`, `Correct.`],
          [`32-bit registers such as EFLAGS`, `EFLAGS is special purpose. (The 2022/23 key underlined both b and c; only b is correct.)`],
          [`None`, `Option b is correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `General purpose registers are (2022/23 Summer options):`, o: [
          [`16-bit registers such as CS, DS`, `Segment registers.`],
          [`32-bit registers such as EBX and EDX`, `Correct.`],
          [`16-bit registers such as ES, BX`, `ES is a segment register.`],
          [`32-bit registers such as EIP, EFLAGS`, `These are special purpose.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `Segment registers are ………`, o: [
          [`16-bit user visible registers such as CS, DS`, `Correct.`],
          [`16-bit general purpose registers such as FLAGS`, `FLAGS is not a segment or general register.`],
          [`32-bit registers such as ECX, EDX`, `Those are general purpose.`],
          [`None`, `Option a is correct.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `……. is a segment register that holds the assembly language instructions executed by the microprocessor.`, o: [
          [`DS`, `DS holds data.`],
          [`CS`, `Correct. Code segment.`],
          [`SS`, `SS is the stack.`],
          [`ES`, `ES is an extra data segment.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The register which keeps track of the status of the running environment:`, o: [
          [`General purpose`, `They hold data.`],
          [`Condition`, `Not a register class here.`],
          [`Segment`, `They hold segment bases.`],
          [`Flags`, `Correct.`]
        ], a: 3, src: `Exam 2023/24` },
        { q: `The Flag register is responsible to indicate the ……….`, o: [
          [`Condition of memory`, `Flags describe results, not memory.`],
          [`The condition of the result of an ALU operation`, `Correct.`],
          [`Result of addition`, `Too narrow.`],
          [`Result of subtraction`, `Too narrow.`]
        ], a: 1, src: `Revision sheet` },
        { q: `…… stores the instruction currently being executed.`, o: [
          [`Instruction segment`, `Not a register.`],
          [`Instruction register`, `Correct.`],
          [`Both a and b`, `Only IR.`],
          [`None`, `IR is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `What is true about the program counter?`, o: [
          [`It is an 8-bit register holding temporary data of arithmetic and logic operations`, `That describes an accumulator.`],
          [`When an instruction is fetched it is stored in the program counter`, `Fetched instructions go to the IR.`],
          [`It provides timing and control signals`, `That is the control unit / clock.`],
          [`It is a 16-bit register storing the memory address of the next instruction to be executed`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `The Program Counter (PC) is used to:`, o: [
          [`Specify the address of the instruction to be executed (next)`, `Correct.`],
          [`Specify the address of the instruction currently executing`, `PC already points to the next one.`],
          [`Specify the number of instructions executed`, `PC is not a counter of instructions executed.`],
          [`None`, `Option a is correct.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Stack pointer is stored in …..`, o: [
          [`RAM`, `SP is a register.`],
          [`ROM`, `No.`],
          [`RAM or ROM`, `No.`],
          [`Microprocessor`, `Correct. Registers are inside the CPU.`]
        ], a: 3, src: `Revision sheet` },
        { q: `Which of the following belongs to the categories of registers?`, o: [
          [`General purpose`, `Also segment.`],
          [`Segment`, `Also general purpose.`],
          [`Pointer`, `Not a lecture category.`],
          [`a and b`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `The CS register stores ……. in the code segment.`, o: [
          [`Pointer instructions`, `No.`],
          [`Path instructions`, `No.`],
          [`Code instructions`, `Correct (key).`],
          [`Stream line`, `No.`]
        ], a: 2, src: `Revision sheet` },
        { q: `A word is:`, o: [
          [`One byte`, `A byte is 8 bits.`],
          [`8 bytes`, `That is a quad word.`],
          [`2 bytes`, `Correct. 16 bits.`],
          [`2 bits`, `No.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Segment registers cannot be used as operands for arithmetic and logical instructions.`, o: [
          [`True`, `Correct.`],
          [`False`, `ADD DS, 5 is illegal; segment registers are loaded only by MOV/POP/LDS etc.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The Z flag is set to 1 when an ALU operation results in a 0 output.`, o: [
          [`True`, `Correct.`],
          [`False`, `ZF = 1 means the result was zero.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `The Z bit of the EFLAGS register is set to zero if a calculation result = zero.`, o: [
          [`True`, `It is set to ONE when the result is zero.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The segment registers include SS, CS, DS, ES, DI and SI.`, o: [
          [`True`, `DI and SI are index (general purpose) registers.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `You cannot use 1 byte (high or low bits) of the ESP register; you can use either 16 or 32 bits.`, o: [
          [`True`, `Correct. Only AX, BX, CX, DX have 8-bit halves.`],
          [`False`, `There is no SPL/SPH in the 8086 model.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `You can use 1 byte of the ESI register by using SH, SL.`, o: [
          [`True`, `SH/SL do not exist.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `User visible registers include general purpose, special purpose and segment registers.`, o: [
          [`True`, `Correct. That is the lecture's register tree. (A student's mark on the 2024/25 paper said False.)`],
          [`False`, `The lecture lists all three under user-visible.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Memory Address Register (MAR) contains the instruction most recently fetched.`, o: [
          [`True`, `That is the IR.`],
          [`False`, `Correct. MAR holds a memory address.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `The general-purpose registers include AX, BX, CX, DX, EX and FX.`, o: [
          [`True`, `EX and FX do not exist.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `SS is the segment register used to hold the segment of the stack.`, o: [
          [`True`, `Correct. (The revision version "hold the offset of the stack" is False: the offset is in SP.)`],
          [`False`, `SS holds the stack segment.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `The Program Counter (PC) is used to save the number of executed instructions.`, o: [
          [`True`, `PC holds the address of the next instruction.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The Sign flag is set when the contents of the accumulator become negative after an ALU operation.`, o: [
          [`True`, `Correct.`],
          [`False`, `SF = 1 for a negative result.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The CF is known as:`, o: [
          [`Carry flag`, `Correct.`],
          [`Condition flag`, `No.`],
          [`Common flag`, `No.`],
          [`None`, `Carry flag is correct.`]
        ], a: 0, src: `Revision sheet` }
      ]
    },
    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `Addressing Modes (1): Register, Immediate, Direct, Displacement`,
      notes: [
        { h: `What is an addressing mode?`, pts: [
          `An addressing mode is <b>the approach in which data is addressed in memory</b>. Modes include register, immediate, direct and displacement addressing (this lecture), then register indirect, indexed, base plus index and base plus index plus displacement (Lecture 4).`,
          `The MOV instruction is used to show the differences among the modes.`
        ]},
        { h: `Register addressing and its restrictions`, pts: [
          `The <b>most common</b> form of data addressing: both operands are registers, e.g. <code>MOV AX, BX</code>, <code>MOV BL, CL</code>.`,
          `<b>1. Both operands must be the same size.</b> <code>MOV EAX, BL</code> and <code>MOV SI, BL</code> are incorrect; <code>MOV EBX, AX</code> and <code>MOV ECX, AX</code> are incorrect (32 vs 16 bits).`,
          `<b>2. You cannot move data from one segment register to another</b> with a single instruction: <code>MOV DS, CS</code>, <code>MOV DS, ES</code>, <code>MOV SS, CS</code> are incorrect. Use a general register: <code>MOV AX, CS</code> then <code>MOV DS, AX</code>.`,
          `<b>3. Changing the value of CS is not allowed</b>: <code>MOV CS, AX</code> is incorrect. (Reading CS is fine: <code>MOV AX, CS</code>, <code>MOV AX, DS</code> are correct.)`,
          `<b>4. Memory to memory moves are not allowed</b> (except string instructions): <code>MOV [DI], [SI]</code>, <code>MOV [AX], [5000H]</code> are incorrect.`,
          `<b>5. The destination cannot be immediate data</b>: <code>MOV 55H, BL</code>, <code>MOV 100, [DI]</code> are impossible. The destination can be a register or a memory location.`,
          `Copying between any general registers of the same size is allowed: <code>MOV EAX, ESP</code> copies ESP into EAX (the source keeps its value; MOV never deletes the source).`
        ]},
        { h: `Immediate addressing`, pts: [
          `MOV transfers a copy of the <b>immediate data</b> (a constant written in the instruction) into a register or memory location. In the 8086 it operates on a byte or a word.`,
          `<code>MOV BL, 44</code> (8 bits), <code>MOV AX, 44H</code> (16 bits), <code>MOV CH, 100</code> (8 bits), <code>MOV EAX, 12</code> (32 bits), <code>MOV EBX, 100B</code> (32 bits, binary 100).`,
          `<code>MOV AX, 0005H</code> belongs to <b>immediate</b> addressing; <code>MOV AX, BX</code> belongs to <b>register</b> addressing.`,
          `Number suffixes: H = hexadecimal, B = binary (e.g. <code>MOV AX, 1001b</code>), no suffix = decimal.`
        ]},
        { h: `Direct and displacement addressing`, pts: [
          `<b>Direct addressing</b>: MOV transfers data between a memory location in the data segment and <b>AL, AX or EAX</b>. <code>MOV AL, [123H]</code> (default segment DS); <code>MOV EAX, ES:[123H]</code> (segment forced to ES).`,
          `<b>Displacement addressing</b>: same idea but between memory and <b>all other registers</b>. <code>MOV CL, [123H]</code> (DS); <code>MOV EBX, ES:[123H]</code> (ES).`,
          `(Exams also call <code>MOV EAX, [DI]</code> "direct addressing environment"; it is really register indirect, see Lecture 4, but the address calculation is the same: DS×10 + DI.)`
        ]},
        { h: `Segment:offset and the physical address`, formula: [
          `A memory address has two parts: segment and offset, written  Segment:[offset]`,
          `If no segment is written, the default segment is used (usually DS for MOV)`,
          `Physical address = (Segment register × 10H) + offset`,
          `"× 10" in hex = shift one hex digit left = × 16 decimal`,
          `Example: DS = 1000  →  segment base = 10000`,
          `Example: DS = 20A0  →  base = 20A00`
        ]},
        { h: `Lecture examples (DS=1000, ES=1400, DI=150, EAX=1234)`, formula: [
          `MOV AL, [1234H]:`,
          `  address = DS×10 + 1234 = 10000 + 1234 = 11234`,
          `  figure: DS(1000)×10 → (+) ← 1234 → points to 11234; the byte there (e.g. 22) goes to AL`,
          `MOV BL, ES:[1234H]  (segment override):`,
          `  address = ES×10 + 1234 = 14000 + 1234 = 15234`,
          `  the byte at 15234 (e.g. 33) is copied into BL`
        ]},
        { h: `Segment overriding`, pts: [
          `<b>Segment overriding</b>: when a default offset register is not used with its default base segment register but with a different one, by writing the segment before the offset. Example: <code>MOV BL, ES:[1234H]</code>, <code>MOV AL, CS:[BX]</code>, <code>MOV AX, DS:[BP]</code>.`,
          `A default segment <b>can</b> be overridden. <code>MOV ES:SI, CX</code> is <b>illegal</b> (the brackets are missing: SI is a register, not a memory operand); <code>MOV ES:[SI], CX</code> would be correct.`
        ]},
        { h: `Lab 3: first programs in emu8086`, code: `; ADD 5 , 6           -> AX = 11 (0Bh)
MOV AX, 5
ADD AX, 6

; SUB 11 , 7           -> AX = 4
MOV AX, 11
SUB AX, 7

; exchange AX and BX   -> AX = 3, BX = 5
MOV AX, 5
MOV BX, 3
XCHG AX, BX

; (5 + 3 - 2) in CX    -> CX = 6
MOV AX, 5
ADD AX, 3
SUB AX, 2
MOV CX, AX

; INC / DEC change a value by 1
MOV AX, 5
INC AX                 ; AX = 6
MOV AX, 3
DEC AX                 ; AX = 2` }
      ],
      cards: [
        [`Addressing mode`, `The approach in which data is addressed in memory.`],
        [`Most common addressing mode`, `Register addressing.`],
        [`Register addressing rule 1`, `Both operands must be the same size (MOV EAX, BL is wrong).`],
        [`Segment to segment MOV`, `Not allowed. Use MOV AX, CS then MOV DS, AX.`],
        [`MOV CS, AX`, `Incorrect: changing CS is not allowed.`],
        [`MOV [DI], [SI]`, `Incorrect: memory to memory moves are not allowed.`],
        [`MOV 55H, BL`, `Impossible: the destination cannot be immediate data.`],
        [`MOV AX, 0005H`, `Immediate addressing.`],
        [`Direct addressing`, `Memory in DS with AL, AX or EAX, e.g. MOV AL, [123H].`],
        [`Displacement addressing`, `Memory in DS with all other registers, e.g. MOV CL, [123H].`],
        [`Physical address formula`, `Segment × 10H + offset.`],
        [`DS=1000, MOV AL,[1234H]`, `Address 11234.`],
        [`ES=1400, MOV BL, ES:[1234H]`, `Address 15234, segment ES.`],
        [`Segment overriding`, `Using a segment other than the default by writing it before the offset, e.g. ES:[1234H].`],
        [`Default segment of MOV with no register base`, `DS.`],
        [`XCHG AX, BX`, `Swaps the contents of AX and BX.`]
      ],
      qa: [
        [`State the restrictions of register addressing with examples.`, `1) Both operands must be the same size: MOV EAX, BL and MOV SI, BL are incorrect.<br>2) You cannot move data from a segment register to another with one instruction: MOV DS, CS is incorrect; use MOV AX, CS then MOV DS, AX.<br>3) Changing the value of CS is not allowed: MOV CS, AX is incorrect.<br>(Also: no memory-to-memory moves, and the destination cannot be immediate data.)`],
        [`Find and justify the errors: MOV AX, 100 / MOV EBX, AX / MOV AX, DS / MOV CS, DS.`, `MOV AX, 100: no error.<br>MOV EBX, AX: error, EBX (32 bits) and AX (16 bits) differ in size.<br>MOV AX, DS: no error (reading a segment register is allowed).<br>MOV CS, DS: error, segment to segment move is not allowed and CS cannot be changed.`],
        [`Define segment overriding with an example.`, `When a default offset register is not used with its default base segment register but with a different segment, written before the offset. Example: MOV BL, ES:[1234H] uses ES instead of the default DS: address = ES×10 + 1234.`],
        [`Consider DS=1000, ES=1400, DI=150, EAX=1234. Show the memory state for MOV AL, [1234H] and MOV BL, ES:[1234H].`, `MOV AL, [1234H]: address = DS×10 + 1234 = 10000 + 1234 = <b>11234</b>; the byte at 11234 is copied into AL.<br>MOV BL, ES:[1234H]: address = ES×10 + 1234 = 14000 + 1234 = <b>15234</b>; the byte at 15234 is copied into BL.<br>Figure: segment register box ×10 and offset feed an adder (+), the arrow points to the memory location, and an arrow from the memory cell goes to the destination register.`],
        [`Differentiate between direct and displacement addressing.`, `Both transfer data between a memory location in the data segment (default DS, can be overridden) and a register using a constant address. Direct addressing uses AL, AX or EAX (MOV AL, [123H]); displacement addressing uses all other registers (MOV CL, [123H]).`]
      ],
      quiz: [
        { q: `The instruction MOV AX, 0005H belongs to the addressing mode:`, o: [
          [`Register`, `The source is a constant, not a register.`],
          [`Direct`, `There is no memory access.`],
          [`Immediate`, `Correct. 0005H is immediate data.`],
          [`Register relative`, `No register-relative memory operand.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction MOV AX, BX belongs to the addressing mode:`, o: [
          [`Direct addressing`, `No memory operand.`],
          [`Register addressing`, `Correct.`],
          [`Indexed addressing`, `No index register used as a pointer.`],
          [`Immediate addressing`, `No constant.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Which of the following instructions is not valid?`, o: [
          [`MOV AX, BX`, `Valid register move.`],
          [`MOV DS, AX`, `Valid: loading a segment register from a general register.`],
          [`MOV [AX], [5000H]`, `Correct. Memory-to-memory move (and AX cannot be a pointer).`],
          [`PUSH AX`, `Valid.`]
        ], a: 2, src: `Exam 2024/25` },
        { q: `The operands in a MOV instruction (source and destination) cannot be:`, o: [
          [`Register, register`, `Allowed.`],
          [`Memory location, memory location`, `Correct. Memory-to-memory is not allowed.`],
          [`Memory location, register`, `Allowed.`],
          [`Immediate data, register`, `Allowed as source (but immediate can never be the destination).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The operands in a MOV instruction cannot be (form B):`, o: [
          [`DS, ES`, `Correct. Segment to segment moves are not allowed.`],
          [`AX, CS`, `MOV AX, CS is allowed.`],
          [`EAX, ESP`, `Allowed, same size.`],
          [`BX, DX`, `Allowed.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `The instruction MOV DS, ES:`, o: [
          [`Copies the contents of ES into DS`, `Not allowed in one instruction.`],
          [`Copies the contents of DS into ES`, `Wrong direction, and not allowed anyway.`],
          [`Copies and deletes the contents of ES into DS`, `MOV never deletes.`],
          [`Causes an error`, `Correct. Segment to segment move.`]
        ], a: 3, src: `Exam 2023/24 Second term` },
        { q: `The instruction MOV EAX, ESP:`, o: [
          [`Copies the contents of ESP into EAX`, `Correct. Same size, valid.`],
          [`Copies the contents of SP into AX`, `It copies all 32 bits.`],
          [`Copies and deletes the contents of ESP into EAX`, `MOV does not delete the source.`],
          [`Causes an error`, `It is valid.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Which of the following instructions causes errors?`, o: [
          [`MOV CS, AX`, `Correct. CS cannot be changed by MOV.`],
          [`MOV EAX, EBP`, `Valid.`],
          [`MOV CX, [SI]`, `Valid register indirect.`],
          [`PUSHA / POP AX`, `Valid.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `The instruction that is not possible among the following:`, o: [
          [`MOV AX, BX`, `Possible.`],
          [`MOV AX, [BX]`, `Possible.`],
          [`MOV 55H, BL`, `Correct. Immediate data cannot be a destination.`],
          [`MOV AL, 55H`, `Possible.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction that is not possible among the following:`, o: [
          [`MOV AX, [BX]`, `Possible.`],
          [`MOV AX, 5555H`, `Possible.`],
          [`MOV AX, [SI]`, `Possible.`],
          [`MOV [SI], [DI]`, `Correct. Memory to memory.`]
        ], a: 3, src: `Revision sheet` },
        { q: `The instruction that is not possible among the following (2023/24 options):`, o: [
          [`MOV AX, [BX]`, `Possible.`],
          [`MOV AX, 5555H`, `Possible.`],
          [`MOV [AX], SI`, `Also invalid on the real 16-bit 8086 (AX cannot be used as a pointer), so this option can be defended too.`],
          [`MOV 100, [DI]`, `Correct (intended answer). An immediate value can never be a destination.`]
        ], a: 3, src: `Exam 2023/24` },
        { q: `The instruction MOV [DI], [SI]:`, o: [
          [`Copies the contents of SI into DI`, `Not allowed.`],
          [`Copies the contents of DI into SI`, `Not allowed.`],
          [`Copies and deletes the contents of SI into DI`, `Not allowed.`],
          [`Causes an error`, `Correct. Memory-to-memory move.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `In general, the destination operand of an instruction can be:`, o: [
          [`Memory location`, `Also a register.`],
          [`Register`, `Also memory.`],
          [`Immediate data`, `Never a destination.`],
          [`Memory location and register`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `If DS=1000, ES=1400, DI=150, EAX=1234, the memory address for MOV BL, ES:[1234H] is:`, o: [
          [`15243`, `Digits swapped.`],
          [`15234`, `Correct. 14000 + 1234 = 15234.`],
          [`1634`, `ES was not multiplied by 10.`],
          [`1643`, `Wrong.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The segment register of the instruction MOV BL, ES:[1234H] will be:`, o: [
          [`ES`, `Correct. Segment override.`],
          [`DS`, `DS is the default, but it is overridden.`],
          [`SS`, `No BP or stack.`],
          [`CS`, `No.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `The segment register of the instruction MOV BL, [1234H] will be:`, o: [
          [`ES`, `No override written.`],
          [`DS`, `Correct. Default for MOV.`],
          [`SS`, `Only with BP/SP.`],
          [`CS`, `No.`]
        ], a: 1, src: `Revision sheet` },
        { q: `An instruction that subtracts val3 from EAX:`, o: [
          [`sub val3, eax`, `This would store into val3.`],
          [`sub eax, val3`, `Correct. Destination first.`],
          [`subtract val3, eax`, `No such mnemonic.`],
          [`subtract eax, val3`, `No such mnemonic.`]
        ], a: 1, src: `Revision sheet` },
        { q: `MOV SS, CS is an incorrect instruction.`, o: [
          [`True`, `Correct. Segment to segment move.`],
          [`False`, `It is incorrect.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `MOV [AX], [150H] is a correct instruction.`, o: [
          [`True`, `Memory to memory is illegal.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `A default segment can be overridden (by writing the required segment before the offset).`, o: [
          [`True`, `Correct.`],
          [`False`, `Segment overriding exists, e.g. ES:[1234H].`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `Default segment can never be overridden.`, o: [
          [`True`, `It can be overridden.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The statement MOV ES:SI, CX is legal.`, o: [
          [`True`, `SI without brackets is a register, so ES:SI is meaningless.`],
          [`False`, `Correct. (Same idea: "MOV ES:SI,CX is incorrect" is True.)`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `The statement MOV ES:SI, CX is incorrect.`, o: [
          [`True`, `Correct.`],
          [`False`, `It is incorrect.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Register CS cannot be modified, so the instruction MOV [CS], AX is incorrect.`, o: [
          [`True`, `Correct. CS cannot be a MOV destination (and [CS] is not a valid pointer).`],
          [`False`, `It is incorrect.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `The instruction MOV CS:[SI], 100 is incorrect.`, o: [
          [`True`, `CS is only used as a segment override here; CS itself is not changed.`],
          [`False`, `Correct (lecture logic). Overriding with CS is allowed (MOV AL, CS:[BX]). Strictly an assembler would also want BYTE PTR/WORD PTR for the size.`]
        ], a: 1, src: `Exam 2023/24` }
      ]
    },
    /* ───────────────────────── LECTURE 4 ───────────────────────── */
    {
      n: 4, title: `Addressing Modes (2): Register Indirect, Indexed, Base plus Index`,
      notes: [
        { h: `Register indirect addressing`, pts: [
          `Data is addressed at any memory location through an <b>offset held in one of BP, BX, DI, SI</b> (only these four can be pointers in 16-bit mode; <code>[AX]</code>, <code>[CX]</code>, <code>[DX]</code> are invalid).`,
          `<b>Default segment of BX, DI and SI is DS</b>: <code>MOV AL, [BX]</code>, <code>MOV BL, [DI]</code>, <code>MOV EAX, [SI]</code>.`,
          `<b>Default segment of BP is SS</b>: <code>MOV AL, [BP]</code> uses SS.`,
          `Memory to memory moves are not allowed except for string instructions: <code>MOV [DI], [SI]</code> is incorrect.`,
          `Segment overriding can access other segments: <code>MOV AL, CS:[BX]</code>, <code>MOV AX, DS:[BP]</code>.`
        ]},
        { h: `Default segment rule (memorize)`, table: [
          [`Offset uses`, `Default segment`],
          [`BX, SI, DI, or a constant only`, `DS`],
          [`BP (anywhere in the expression)`, `SS`],
          [`SP (PUSH / POP)`, `SS`],
          [`IP (instruction fetch)`, `CS`],
          [`DI in string destinations (STOS, INS)`, `ES`],
          [`Explicit prefix like ES:[...]`, `The written segment (override)`]
        ]},
        { h: `Indexed addressing (register + displacement)`, pts: [
          `The offset is the <b>sum of a displacement constant and the specified register</b>. Uses BX, SI, DI (default DS) and BP (default SS).`,
          `<code>MOV AL, 20[BX]</code> (DS), <code>MOV AX, 1000[BP]</code> (SS), <code>MOV AX, AB[SI]</code>, <code>MOV EAX, ES:100[DI]</code> (ES override).`,
          `<code>20[BX]</code> is the same as <code>[BX+20]</code>; <code>[BP-2]</code> and <code>[BP+200H]</code> are legal.`
        ]},
        { h: `Base plus index and base plus index plus displacement`, pts: [
          `<b>Base plus index</b>: one <b>base</b> register (BP or BX) plus one <b>index</b> register (DI or SI). The base often holds the start of an array, the index the relative position of an element.`,
          `Offset = base + index; then add segment×10. <code>MOV AL, [BX][SI]</code> (DS); <code>MOV EAX, ES:[BX][SI]</code> (ES).`,
          `<b>Base indexed plus displacement</b>: <code>MOV AL, disp[BX][SI]</code>, e.g. <code>100[BX][DI]</code> (DS).`,
          `Note: two bases (<code>[BX][BP]</code>) or two indexes (<code>[SI][DI]</code>) cannot be combined on a real 8086. When exams ask the segment of <code>MOV [BX][BP], AX</code>, the intended answer is SS (because BP is used).`
        ]},
        { h: `Lecture examples`, formula: [
          `DS=AB00, MOV AL, [DI] with DI=150:`,
          `  address = DS×10 + DI = AB000 + 150 = AB150`,
          `DS=1000, MOV AX, 100[DI] with DI=150:`,
          `  address = DS×10 + disp + DI = 10000 + 100 + 150 = 10250   (AX gets 2 bytes: 10250 and 10251)`,
          `DS=1000, BX=CD01, DI=150, MOV AL, [BX][DI]:`,
          `  address = 10000 + CD01 + 150 = 10000 + CE51 = 1CE51`,
          `DS=1000, BX=CD01, DI=150, MOV AL, 100[BX][DI]:`,
          `  address = 10000 + 100 + CD01 + 150 = 1CF51`
        ]},
        { h: `Sheet 1 solved (DS=1100H, BX=0200H, SI=0500H)`, formula: [
          `a) MOV 120[SI], EDX   = DS×10 + 120 + SI = 11000 + 120 + 500 = 11620`,
          `b) MOV CL, 100[BX+SI] = 11000 + 100 + 200 + 500 = 11800`,
          `c) MOV CH, [BX+SI]    = 11000 + 200 + 500 = 11700`,
          `DS=1300H, SS=1400H, BP=1500H, SI=0100H (BP → SS):`,
          `a) MOV EAX, [BP+200H]    = SS×10 + BP + 200 = 14000 + 1500 + 200 = 15700`,
          `b) MOV AL, [BP+SI-200H]  = 14000 + 1500 + 100 - 200 = 15400`,
          `c) MOV AL, [SI][BP]      = 14000 + 1500 + 100 = 15600`
        ]},
        { h: `Revision sheet Q14 (SS=2000H, DS=2200H, SI=1200H, BP=0101H)`, formula: [
          `(i)   MOV EAX, [BP+120H]    = SS×10 + BP + 120 = 20000 + 101 + 120 = 20221`,
          `(ii)  MOV BL, [BP+SI-100H]  = 20000 + 101 + 1200 - 100 = 21201`,
          `(iii) MOV CX, [SI+0BC]      = DS×10 + SI + BC = 22000 + 1200 + BC = 232BC`,
          `Method: 1) pick the segment (BP → SS, else DS)  2) shift it one hex digit (×10)  3) add every offset part in HEX`
        ]},
        { h: `How to draw the "memory state" figure`, pts: [
          `Left: register boxes (EAX, EBX, ECX, EDI/ESI, DS) with their values. The segment value goes through "×10" into a circle with <b>+</b>; the offset register (and displacement) also enter the adder.`,
          `The adder output arrow points to the computed address in a memory column on the right (label it, e.g. 1CE51).`,
          `An arrow from the memory cell(s) goes back to the destination register (AL for 1 byte, AX for 2 bytes, EAX for 4 bytes). For a word, the byte at the lower address goes to the low half (little-endian).`
        ]}
      ],
      cards: [
        [`Registers usable for register indirect addressing`, `BP, BX, DI, SI.`],
        [`Default segment of BX, SI, DI`, `DS.`],
        [`Default segment of BP`, `SS.`],
        [`MOV AL, CS:[BX]`, `Segment override: CS×10 + BX.`],
        [`Indexed addressing offset`, `Displacement + register (BX, SI, DI → DS; BP → SS).`],
        [`Base registers`, `BX and BP.`],
        [`Index registers`, `SI and DI.`],
        [`Base plus index offset`, `Base + index, then + segment×10.`],
        [`DS=1000, BX=CD01, DI=150: [BX][DI]`, `1CE51.`],
        [`DS=1000, BX=CD01, DI=150: 100[BX][DI]`, `1CF51.`],
        [`DS=1000, DI=150: 100[DI]`, `10250.`],
        [`MOV AX, 100[DI] formula`, `(DS×10) + DI + 100.`],
        [`Segment of MOV BX, 50[BP]`, `SS.`],
        [`Segment of MOV BX, 50[SI-10]`, `DS.`],
        [`[BP-2]`, `Legal: BP plus a negative displacement, segment SS.`]
      ],
      qa: [
        [`Explain register indirect addressing and its restrictions.`, `The offset of the memory operand is held in BP, BX, DI or SI. BX, DI and SI default to DS (MOV AL, [BX]); BP defaults to SS (MOV AL, [BP]). Memory-to-memory moves are not allowed except for string instructions (MOV [DI], [SI] is incorrect). Segment overriding can access other segments: MOV AL, CS:[BX], MOV AX, DS:[BP].`],
        [`Consider DS=1000, ES=1400, DI=150, BX=CD01. Show the memory state for MOV AL, 100[BX][DI].`, `Memory location = DS×10 + disp + base + index = 10000 + 100 + CD01 + 150 = 10000 + 100 + CE51 = <b>1CF51</b>.<br>Figure: EBX = CD01, EDI = 150, DS = 1000 (×10) and Disp. 100 enter the adder; the arrow points to 1CF51; the byte there goes into AL.`],
        [`Consider DS=1000, ES=1400, DI=150, BX=CD01. Show the memory state for MOV AL, [BX][DI].`, `Memory location = DS×10 + base + index = 10000 + CD01 + 150 = 10000 + CE51 = <b>1CE51</b>. The byte at 1CE51 is copied into AL.`],
        [`Given DS=1100H, BX=0200H, SI=0500H, compute the address of MOV 120[SI], EDX; MOV CL, 100[BX+SI]; MOV CH, [BX+SI].`, `a) 11000 + 120 + 500 = <b>11620</b> (EDX is stored in 4 bytes 11620 to 11623).<br>b) 11000 + 100 + 200 + 500 = <b>11800</b>.<br>c) 11000 + 200 + 500 = <b>11700</b>.`],
        [`Given DS=1300H, SS=1400H, BP=1500H, SI=0100H compute: MOV EAX, [BP+200H]; MOV AL, [BP+SI-200H]; MOV AL, [SI][BP].`, `All use BP so the segment is SS (14000).<br>a) 14000 + 1500 + 200 = <b>15700</b><br>b) 14000 + 1500 + 100 - 200 = <b>15400</b><br>c) 14000 + 1500 + 100 = <b>15600</b>`],
        [`What is base plus index addressing and why is it useful?`, `It uses one base register (BX or BP) and one index register (SI or DI). The base often holds the beginning address of an array and the index the relative position of an element, so stepping the index walks through the array. Offset = base + index; default segment DS (SS if BP).`]
      ],
      quiz: [
        { q: `The segment register of the instruction MOV BX, 50[BP] will be:`, o: [
          [`SS`, `Correct. BP defaults to SS.`],
          [`CS`, `CS is for code.`],
          [`DS which contains 50`, `BP changes the default to SS; 50 is a displacement.`],
          [`ES`, `No override written.`]
        ], a: 0, src: `Midterm 2022/23` },
        { q: `The segment register of the instruction MOV 30[BP], BX will be:`, o: [
          [`ES`, `No override.`],
          [`SS`, `Correct. BP → SS.`],
          [`DS`, `BP is not DS-based.`],
          [`The instruction is incorrect`, `It is valid (register to memory).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The segment register of the instruction MOV BX, 50[SI-10] will be:`, o: [
          [`SS-10`, `Meaningless.`],
          [`DS*50`, `Meaningless.`],
          [`DS which contains 50`, `DS does not "contain" the displacement.`],
          [`DS`, `Correct. SI defaults to DS.`]
        ], a: 3, src: `Midterm 2023/24` },
        { q: `The segment register of the instruction MOV [SI][BP], BX will be:`, o: [
          [`ES`, `No override.`],
          [`DS`, `BP in the expression makes it SS.`],
          [`SS`, `Correct. BP base → SS.`],
          [`CS`, `No.`]
        ], a: 2, src: `Exam 2024/25` },
        { q: `The segment register of the instruction MOV [BX][BP], BX will be:`, o: [
          [`ES`, `No override.`],
          [`DS`, `BX alone would be DS, but BP is present.`],
          [`SS`, `Correct (intended). BP → SS. Note: on a real 8086, two base registers BX+BP cannot be combined.`],
          [`CS`, `No.`]
        ], a: 2, src: `Exam 2023/24 Second term` },
        { q: `The segment register of the instruction MOV [BX][BP], AX will be:`, o: [
          [`ES`, `No override.`],
          [`DS`, `BP present.`],
          [`SS`, `Correct (intended answer, same note as above).`],
          [`CS`, `No.`]
        ], a: 2, src: `Exam 2023/24` },
        { q: `The memory address when executing MOV AX, 100[DI] will be:`, o: [
          [`DS + DI + 100`, `DS must be multiplied by 10H.`],
          [`(DS*10) + DI + 100`, `Correct.`],
          [`(ES*10) + DI + 100`, `Default is DS, not ES.`],
          [`(DS+10) + DI + 100`, `Multiply, not add.`]
        ], a: 1, src: `Revision sheet` },
        { q: `If DS=1000, ES=1400, DI=150, BX=CD01, the memory location for MOV AL, 100[BX][DI] is:`, o: [
          [`1CF51`, `Correct. 10000 + 100 + CD01 + 150.`],
          [`CF51`, `Forgot the segment base 10000.`],
          [`FC51`, `Wrong digits.`],
          [`1FC50`, `Wrong digits.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The statement MOV AX, [BP - 2] is correct.`, o: [
          [`True`, `Correct. Indexed addressing with a negative displacement, SS segment.`],
          [`False`, `It is legal.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `The statement MOV AX, [BP - 50] is incorrect.`, o: [
          [`True`, `It is legal.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The statement MOV AX, [BP - 2] is illegal.`, o: [
          [`True`, `It is legal.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The statement MOV AX, DS:[BP - 2] is incorrect.`, o: [
          [`True`, `Overriding BP's default SS with DS is allowed (MOV AX, DS:[BP] is a lecture example).`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The memory address of MOV AX, 10[SI+BC] = DS*10 + SI + BC.`, o: [
          [`True`, `The displacement 10 is missing from the formula.`],
          [`False`, `Correct. It should be DS×10 + 10 + SI + BC.`]
        ], a: 1, src: `Exam 2024/25` }
      ]
    },
    /* ───────────────────────── LECTURE 5 ───────────────────────── */
    {
      n: 5, title: `Stack Instructions: PUSH, POP, PUSHA, POPA`,
      notes: [
        { h: `The stack`, pts: [
          `PUSH and POP store and retrieve data from the <b>LIFO</b> (Last-In, First-Out) stack memory. The register pushed last must be popped first.`,
          `The default memory address for stack instructions is <b>SS:[SP]</b>. SS holds the stack segment; <b>SP holds the offset of the top of the stack</b> (the most recently pushed value).`,
          `The stack is accessed using both <b>SS and SP</b>. It grows <b>down</b>: from high addresses to lower addresses.`,
          `Stack instructions transfer <b>2 or 4 bytes</b> depending on the register size: <code>PUSH AX</code> (2 bytes), <code>PUSH EAX</code> (4 bytes), <code>POP BX</code> (2 bytes from the stack into BX).`,
          `In a program (lab): <code>.stack 100h</code> declares a stack of size 100h. The stack also stores subroutine return addresses, so PUSH and POP counts in a subroutine must be equal.`
        ]},
        { h: `PUSH`, pts: [
          `PUSH <b>first decrements SP</b> by the operand size, then stores the operand at [SP]. Target can be a register, memory operand or immediate value.`,
          `16-bit push: the <b>most-significant byte</b> goes to SS:[SP-1], the <b>least-significant byte</b> to SS:[SP-2], then SP = SP - 2. So <code>PUSH AX</code>: SS:[SP-1] = AH, SS:[SP-2] = AL, SP = SP - 2.`,
          `32-bit push: four bytes stored (MSB first, at SP-1 down to SP-4), then SP = SP - 4. Example: ESP = 00FFFFE8, <code>PUSH EAX</code> sets ESP = 00FFFFE4 and stores EAX at 00FFFFE4.`,
          `<b>PUSHA</b> pushes the 16-bit registers in the order <b>AX, CX, DX, BX, SP, BP, SI, DI</b> (8 words = 16 bytes, SP decreases by 16). <b>PUSHAD</b> pushes EAX, ECX, EDX, EBX, ESP, EBP, ESI, EDI (8 double words = 32 bytes).`,
          `<b>PUSHF</b> pushes the 16-bit FLAGS register; <b>POPF</b> pops the stack into FLAGS.`
        ]},
        { h: `POP`, pts: [
          `POP copies the data at SS:[SP] into the register or memory operand, <b>then increments SP</b> by 2 or 4. Target: register or memory (not immediate; and POP CS is not allowed).`,
          `Example: ESP = 00FFFFE4, <code>POP EAX</code> sets ESP = 00FFFFE8 and copies 4 bytes from the stack into EAX.`,
          `<b>POPA</b> pops in the reverse order <b>DI, SI, BP, SP, BX, DX, CX, AX</b>, restoring what PUSHA saved; SP increases by 16. <b>POPAD</b> pops 8 double words (32 bytes).`,
          `A PUSH or POP never changes SS; only SP changes.`
        ]},
        { h: `Lecture example: PUSH AX`, formula: [
          `Given AL=B3, AH=5A, SP=07FE, SS=300, DS=100`,
          `Memory location = SS×10 + SP = 3000 + 07FE = 37FE`,
          `AH = 5A → [37FD]      (SP-1)`,
          `AL = B3 → [37FC]      (SP-2)`,
          `SP = 07FE - 2 = 07FC`,
          `(Final 2024/25 asked the same with PUSH BX, BH=5A, BL=B3: same numbers.)`
        ]},
        { h: `Revision example: POP EAX`, formula: [
          `Given SP=1234, SS=300, DS=100, [SP]=11, [SP+1]=22, [SP+2]=33, [SP+3]=44`,
          `Memory location = SS×10 + SP = 3000 + 1234 = 4234`,
          `bytes 4234=11, 4235=22, 4236=33, 4237=44`,
          `EAX = 44 33 22 11   (AL=11, AH=22, upper word 4433)`,
          `SP = 1234 + 4 = 1238`,
          `Note: the lecture slide wrote the same example with [SP+1]=11 ... [SP+4]=44 and drew the bytes at 4235 to 4238; the revision sheet and the final exam use [SP] to [SP+3], which is how the 8086 really works (POP reads from SS:SP upward).`
        ]},
        { h: `Sheet 1 Q5: PUSH EAX (EAX=ABCD, SP=0100H, SS=0200H)`, formula: [
          `Address = SS×10 + SP = 2000 + 0100 = 2100`,
          `EAX = 0000ABCD → bytes 00, 00, AB (AH), CD (AL)`,
          `[20FF] = 00   [20FE] = 00`,
          `[20FD] = AB  ← AH`,
          `[20FC] = CD  ← AL`,
          `SP = 0100 - 4 = 00FC`
        ]},
        { h: `Lab 6 code examples`, code: `MOV AX, 1234h
PUSH AX        ; store value of AX in stack
MOV AX, 5678h  ; modify the AX value
POP AX         ; restore the original value: AX = 1234h

PUSHF          ; save flags
STC            ; set carry (changes CF)
POPF           ; restore the old flags

PUSHA          ; save AX,CX,DX,BX,SP,BP,SI,DI
MOV AX, 3
MOV BX, 4
ADD AX, BX     ; AX = 7 temporarily
POPA           ; all registers restored` }
      ],
      cards: [
        [`Stack type`, `LIFO: last in, first out.`],
        [`Default stack address`, `SS:[SP].`],
        [`SP contains`, `The offset of the top of the stack (address of top of stack).`],
        [`SS contains`, `The address of the stack segment.`],
        [`PUSH AX`, `SS:[SP-1]=AH, SS:[SP-2]=AL, SP=SP-2.`],
        [`PUSH EAX`, `SP decremented by 4.`],
        [`POP effect on SP`, `Incremented by 2 (16-bit) or 4 (32-bit).`],
        [`PUSHA order`, `AX, CX, DX, BX, SP, BP, SI, DI.`],
        [`POPA order`, `DI, SI, BP, SP, BX, DX, CX, AX.`],
        [`SP change after PUSHA / POPA`, `-16 / +16 bytes.`],
        [`PUSHAD / POPAD`, `8 double words = 32 bytes.`],
        [`PUSHF / POPF`, `Push / pop the 16-bit FLAGS register.`],
        [`Stack direction`, `Grows down, from high to low addresses.`],
        [`AL=B3, AH=5A, SP=07FE, SS=300: PUSH AX`, `Address 37FE; [37FD]=5A, [37FC]=B3; SP=07FC.`],
        [`SP=1234, SS=300: POP EAX`, `Address 4234, EAX=44332211, SP=1238.`],
        [`Used to store subroutine calls`, `The stack.`]
      ],
      qa: [
        [`Explain how PUSH and POP work.`, `PUSH decrements SP by the operand size (2 or 4) and stores the operand at SS:[SP]; the most-significant byte goes to SP-1 and the least-significant to SP-2 for a word. POP copies the data at SS:[SP] into the operand and then increments SP by 2 or 4. The stack is LIFO and grows from higher to lower addresses.`],
        [`Consider AL=B3, AH=5A, SP=07FE, SS=300, DS=100. Show the memory state when executing PUSH AX.`, `Memory location = SS×10 + SP = 3000 + 07FE = <b>37FE</b>.<br>[37FD] = 5A (AH), [37FC] = B3 (AL), SP = <b>07FC</b>.<br>Figure: SS (300)×10 plus SP into the adder pointing to 37FE; AH and AL arrows go to 37FD and 37FC; the old SP 07FE is crossed out and 07FC written.`],
        [`Consider SP=1234, SS=300, DS=100, [SP]=11, [SP+1]=22, [SP+2]=33, [SP+3]=44. Show the memory state for POP EAX.`, `Memory location = SS×10 + SP = 3000 + 1234 = <b>4234</b>.<br>Bytes 4234..4237 = 11, 22, 33, 44 → EAX = <b>44332211</b> (AL=11, AH=22).<br>SP = 1234 + 4 = <b>1238</b>.`],
        [`Show where AH and AL are stored when PUSH EAX is executed with EAX=ABCD, SP=0100H, SS=0200H.`, `Address = 2000 + 0100 = 2100. EAX = 0000ABCD: [20FF]=00, [20FE]=00, [20FD]=AB (AH), [20FC]=CD (AL). SP becomes 00FC.`],
        [`What do PUSHA and POPA do? Why is the order important?`, `PUSHA copies the 16-bit registers AX, CX, DX, BX, SP, BP, SI, DI to the stack (SP decreases by 16). POPA pops them in the reverse order DI, SI, BP, SP, BX, DX, CX, AX so every register gets back its own value (LIFO). PUSHAD/POPAD do the same with the 32-bit registers (32 bytes).`]
      ],
      quiz: [
        { q: `After each execution of the instruction PUSH EAX, the stack pointer is:`, o: [
          [`Incremented by 2`, `PUSH decrements.`],
          [`Decremented by 2`, `EAX is 4 bytes.`],
          [`Incremented by 4`, `PUSH decrements.`],
          [`Decremented by 4`, `Correct.`]
        ], a: 3, src: `Exam 2024/25` },
        { q: `After each execution of the instruction PUSH AX, the stack pointer is:`, o: [
          [`Incremented by 1`, `No.`],
          [`Decremented by 1`, `A word is 2 bytes.`],
          [`Incremented by 2`, `PUSH decrements.`],
          [`Decremented by 2`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `If SS=1300, SP=100, CX=CD01, then after executing POP ECX the following is correct:`, o: [
          [`SS = 1304`, `POP never changes SS.`],
          [`SP = 98`, `POP increments SP.`],
          [`SS = 1298`, `SS does not change.`],
          [`SP = 104`, `Correct. ECX is 4 bytes: 100 + 4 = 104.`]
        ], a: 3, src: `Exam 2024/25` },
        { q: `If SS=1300, SP=100, CX=CD01, then after executing PUSH CX the following is correct:`, o: [
          [`SS = 1302`, `SS does not change.`],
          [`SP = 98`, `Correct (intended). SP decreases by 2. Note: in hex 100H - 2 = 0FEH; the exam treated 100 as decimal.`],
          [`SS = 1298`, `SS does not change.`],
          [`SP = 102`, `PUSH decrements.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `If SS=1400, SP=160, BX=CD01, then after executing POP AX the following is correct:`, o: [
          [`SS = 1402`, `SS does not change.`],
          [`SP = 158`, `POP increments.`],
          [`SS = 1398`, `SS does not change.`],
          [`SP = 162`, `Correct. 160 + 2.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `The instruction PUSHA (exam options):`, o: [
          [`Increments SP by 32 words`, `PUSH instructions decrement SP.`],
          [`Increments SP by 16 bytes`, `Decrements, not increments.`],
          [`Decrements SP by 32 words`, `Far too much.`],
          [`Decrements SP by 32 bytes`, `Best available answer, but exactly right only for PUSHAD (8 × 4 bytes). PUSHA (8 × 2 bytes) decrements SP by 16 bytes, which is not offered.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `The instruction POPAD will pop ……… double words from the stack.`, o: [
          [`32`, `32 is the number of bytes.`],
          [`8`, `Correct. EDI, ESI, EBP, ESP, EBX, EDX, ECX, EAX.`],
          [`16`, `No.`],
          [`4`, `No.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `After each execution of the instruction POPA, the stack pointer is:`, o: [
          [`Incremented by 16`, `Correct. 8 registers × 2 bytes.`],
          [`Decremented by 16`, `POP increments.`],
          [`Incremented by 8`, `8 registers but 16 bytes.`],
          [`Decremented by 8`, `No.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The instruction that pushes the contents of the specified register/memory location onto the stack is:`, o: [
          [`PUSHF`, `Pushes only the flags.`],
          [`POPF`, `Pops flags.`],
          [`PUSH`, `Correct.`],
          [`POP`, `Removes data.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction POP BX:`, o: [
          [`Copies the 32-bit contents of BX to the stack`, `BX is 16 bits and POP reads from the stack.`],
          [`Copies 16 bits contents of the stack into BX`, `Correct.`],
          [`Copies the contents of SS:[SP] to the stack`, `It copies from the stack into BX.`],
          [`None`, `b is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The stack is accessed using:`, o: [
          [`SP register`, `Also needs SS.`],
          [`SS register`, `Also needs SP.`],
          [`SP and SS registers`, `Correct. SS:[SP].`],
          [`None of the mentioned`, `c is correct.`]
        ], a: 2, src: `Revision sheet` },
        { q: `As data words are stored onto the stack, the stack pointer is:`, o: [
          [`Incremented by 1`, `No.`],
          [`Decremented by 1`, `A word is 2 bytes.`],
          [`Incremented by 2`, `The stack grows down.`],
          [`Decremented by 2`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `The stack pointer register contains:`, o: [
          [`Address of the stack segment`, `That is SS.`],
          [`Pointer address of the stack segment`, `Vague, not the key.`],
          [`Offset of address of stack segment`, `Correct.`],
          [`Data present in the stack segment`, `SP holds an offset, not data.`]
        ], a: 2, src: `Revision sheet` },
        { q: `POP operation:`, o: [
          [`Decrements SP`, `PUSH decrements.`],
          [`Increments SP`, `Correct.`],
          [`Decrements SS`, `SS is unchanged.`],
          [`Increments SS`, `SS is unchanged.`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `The register or memory location that is pushed onto the stack at the end must be:`, o: [
          [`Popped off last`, `LIFO: last in, first out.`],
          [`Pushed off first`, `Meaningless.`],
          [`Popped off first`, `Correct.`],
          [`Pushed off last`, `Meaningless.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The number of PUSH and POP instructions in a subroutine must be:`, o: [
          [`PUSH greater than POP`, `The return address would be wrong.`],
          [`POP greater than PUSH`, `Would pop the return address.`],
          [`Both equal`, `Correct.`],
          [`Any kind`, `They must balance.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The SS register contains:`, o: [
          [`Address of the data segment`, `That is DS.`],
          [`Address of the stack segment`, `Correct.`],
          [`Pointer address of the stack offset`, `The offset is in SP.`],
          [`Data in the stack segment`, `No.`]
        ], a: 1, src: `Revision sheet` },
        { q: `While retrieving data from the stack, the stack pointer is:`, o: [
          [`Incremented by 1`, `No.`],
          [`Incremented by 2`, `Correct (16-bit POP).`],
          [`Decremented by 1`, `No.`],
          [`Decremented by 2`, `That is PUSH.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The address of the instruction POPA will be:`, o: [
          [`SP:[SS]`, `Reversed.`],
          [`SS:[BP]`, `BP is not the stack pointer.`],
          [`SS:[SP]`, `Correct.`],
          [`SS:[SI]`, `No.`]
        ], a: 2, src: `Revision sheet` },
        { q: `PUSH AX copies the contents of AX onto the stack where:`, o: [
          [`SS:[SP-1]=AH, SS:[SP-2]=AL, SP=SP-2`, `Correct.`],
          [`SS:[SP-1]=AL, SS:[SP-2]=AH, SP=SP-2`, `High byte goes first to SP-1.`],
          [`SS:[SP-1]=AH, SS:[SP-2]=AL, SP=SP+2`, `SP decreases.`],
          [`SS:[SP+1]=AH, SS:[SP+2]=AL, SP=SP+2`, `Wrong direction.`]
        ], a: 0, src: `Revision sheet` },
        { q: `A stack pointer stores the ……..`, o: [
          [`Address of the bottom of the stack`, `It points to the top.`],
          [`Address of instruction being executed`, `That is IP/PC related.`],
          [`Address of instruction to be executed`, `That is IP/PC.`],
          [`Address of top of stack`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `Which of the following is used to store subroutine calls?`, o: [
          [`Queue`, `Calls return in LIFO order.`],
          [`Stack`, `Correct. CALL pushes the return address.`],
          [`Data register`, `No.`],
          [`None`, `Stack is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The address of the instruction PUSH EBX will be SP:[SS].`, o: [
          [`True`, `It is SS:[SP] (segment first).`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `A PUSH increments the SS register, and a POP decrements it.`, o: [
          [`True`, `PUSH/POP change SP, not SS, and PUSH decrements.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` }
      ]
    },
    /* ───────────────────────── LECTURE 6 ───────────────────────── */
    {
      n: 6, title: `Load Effective Address: LEA, OFFSET, LDS, LES, LSS`,
      notes: [
        { h: `LEA (Load Effective Address)`, pts: [
          `LEA calculates its source operand <b>the same way MOV does</b>, but instead of loading the <b>contents</b> of that address into the destination, it loads the <b>address (offset) itself</b>.`,
          `<code>LEA BX, [DI]</code> loads the offset address specified by [DI] (i.e. the value of DI) into BX.`,
          `<code>MOV BX, [DI]</code> loads the <b>data stored</b> at the memory location addressed by [DI] into BX.`
        ]},
        { h: `LEA vs OFFSET`, table: [
          [`MOV BX, OFFSET LIST`, `LEA BX, LIST`],
          [`Works with <b>simple</b> operands such as LIST`, `Used for more <b>complex</b> operands such as [DI], LIST[SI]`],
          [`More efficient for simple operands`, `Less efficient than OFFSET for simple operands`],
          [`Takes the microprocessor <b>less time</b>`, `Takes the microprocessor <b>longer</b>`],
          [`The <b>assembler</b> calculates the offset of LIST`, `The <b>microprocessor</b> calculates the address at run time`]
        ]},
        { h: `LDS, LES, LSS`, pts: [
          `LDS, LES and LSS load any 16-bit or 32-bit register with an <b>offset address</b>, and the <b>DS, ES or SS</b> segment register with a <b>segment address</b>.`,
          `They read <b>4 bytes</b> from memory starting at the computed address (default DS×10 + offset): the <b>first two bytes</b> (lower addresses) go into the register (offset), the <b>next two bytes</b> go into the segment register.`,
          `So <code>LES AX, [DI]</code> copies [DI] and [DI+1] into AX and [DI+2] and [DI+3] into ES. <code>LDS AX, [DI]</code> changes <b>both AX and DS</b> (not AX only).`,
          `There is no "LCS" (CS cannot be loaded this way).`
        ]},
        { h: `Lecture example: LES BX, [DI]`, formula: [
          `Given DS=A000H, SS=2100H, BX=2C2AH, SI=320H, ES=200H, DI=200H; bytes from the address: B2, 1A, 00, 3C`,
          `Memory address = DS×10 + DI = A0000 + 200 = A0200`,
          `[A0200]=B2, [A0201]=1A → BX = 1AB2   (old 2C2A replaced)`,
          `[A0202]=00, [A0203]=3C → ES = 3C00   (old 0200 replaced)`,
          `DS and DI unchanged`
        ]},
        { h: `Lecture example: LDS BX, [DI]`, formula: [
          `Same data: address = A0000 + 200 = A0200`,
          `BX = 1AB2`,
          `DS = 3C00   (DS is changed after it was used to compute the address)`,
          `ES stays 0200`
        ]},
        { h: `Revision / Final 2023/24: LDS BX, [DI] (DS=1000H, BX=6F2AH, DI=1000H)`, formula: [
          `Address = DS×10 + DI = 10000 + 1000 = 11000`,
          `[11000]=7A, [11001]=12 → BX = 127A`,
          `[11002]=00, [11003]=30 → DS = 3000`
        ]},
        { h: `Final 2024/25 e and 2023/24 e: LSS / LES then a stack or string instruction`, formula: [
          `2024/25: DS=2000H, SS=1100H, SP=200H, SI=300H, [SI]=CD, [SI+1]=AB, [SI+2]=34, [SI+3]=12`,
          `LSS AX, [SI]: address = DS×10 + SI = 20000 + 300 = 20300 → AX = ABCD, SS = 1234`,
          `POP AX (uses the NEW SS): address = SS×10 + SP = 12340 + 200 = 12540`,
          `  AX = [SP+1][SP] = F1E0 (given [SP]=E0, [SP+1]=F1), SP = 202`,
          `2023/24: same bytes, ES=1100H, DI=200H, D=0`,
          `LES AX, [SI]: address 20300 → AX = ABCD, ES = 1234`,
          `STOSW: address = ES×10 + DI = 12340 + 200 = 12540; [12540]=CD (AL), [12541]=AB (AH); DI = 202`
        ]}
      ],
      cards: [
        [`LEA`, `Loads the address (offset) of the operand, not its contents.`],
        [`LEA BX, [DI] vs MOV BX, [DI]`, `LEA puts the offset (DI) in BX; MOV puts the data at [DI] in BX.`],
        [`MOV BX, OFFSET LIST`, `Same result as LEA BX, LIST but faster: the assembler computes the offset.`],
        [`Why LEA is slower`, `The microprocessor computes the address at run time.`],
        [`OFFSET is used for`, `Simple operands such as LIST.`],
        [`LEA is used for`, `Complex operands such as [DI], LIST[SI].`],
        [`LDS / LES / LSS`, `Load a register with an offset and DS / ES / SS with a segment, from 4 consecutive bytes.`],
        [`LES AX, [DI]`, `AX ← [DI],[DI+1]; ES ← [DI+2],[DI+3].`],
        [`LDS AX, [DI] changes`, `AX and DS.`],
        [`LES BX,[DI] with bytes B2,1A,00,3C`, `BX = 1AB2, ES = 3C00.`],
        [`LDS BX,[DI] with bytes 7A,12,00,30`, `BX = 127A, DS = 3000.`],
        [`LSS loads`, `A register with an offset address and SS with a segment address.`]
      ],
      qa: [
        [`Differentiate between LEA and MOV with an example.`, `LEA computes the effective address of its source like MOV but loads the address itself. LEA BX, [DI] puts the offset in DI into BX. MOV BX, [DI] loads the data stored at the memory location addressed by DI into BX.`],
        [`Compare between LEA and OFFSET.`, `MOV BX, OFFSET LIST and LEA BX, LIST both load the offset of LIST into BX. OFFSET works only with simple operands and is faster, because the assembler calculates the offset. LEA works with complex operands like [DI] or LIST[SI] and is slower, because the microprocessor calculates the address when the instruction executes.`],
        [`Given DS=A000H, SS=2100H, BX=2C2AH, SI=320H, ES=200H, DI=200H, draw the execution of LES BX, [DI] if the four bytes at the address are B2, 1A, 00, 3C.`, `Memory address = DS×10 + DI = A0000 + 200 = <b>A0200</b>.<br>[A0200]=B2, [A0201]=1A, [A0202]=00, [A0203]=3C.<br>BX = <b>1AB2</b>, ES = <b>3C00</b> (old ES 200 crossed out).<br>Figure: DS×10 + EDI into the adder → A0200; arrow from the first two bytes to EBX, from the last two bytes to ES.`],
        [`Given DS=1000H, BX=6F2AH, DI=1000H, draw the execution of LDS BX, [DI] if the four bytes are 7A, 12, 00, 30.`, `Address = 10000 + 1000 = <b>11000</b>. [11000]=7A, [11001]=12, [11002]=00, [11003]=30.<br>BX = <b>127A</b> (was 6F2A), DS = <b>3000</b> (was 1000).`],
        [`What do LDS, LES and LSS do?`, `They load any 16-bit or 32-bit register with an offset address and the DS, ES or SS segment register with a segment address, both taken from four consecutive memory bytes: the first word goes to the register, the second word to the segment register.`]
      ],
      quiz: [
        { q: `LSS instruction loads any 16-bit or 32-bit register with an …… address, and SS with a ……. address.`, o: [
          [`Segment, segment`, `The register gets an offset.`],
          [`Segment, offset`, `Reversed.`],
          [`Offset, segment`, `Correct.`],
          [`Offset, offset`, `SS gets a segment.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction LSS DX, [SI] copies ….. into DX and ……into ……….`, o: [
          [`Segment, [SI], SS`, `DX gets the offset.`],
          [`[SI], DS, SS`, `Meaningless.`],
          [`Offset, segment, SS`, `Correct. Offset into DX, segment into SS.`],
          [`Offset, DS, SS`, `The segment goes to SS, not DS.`]
        ], a: 2, src: `Exam 2023/24 Second term` },
        { q: `LDS AX, [DI] loads AX with an offset address, and SS with a segment address.`, o: [
          [`True`, `LDS loads DS, not SS.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `LDS AX, [DI] will change the content of AX only.`, o: [
          [`True`, `It also changes DS.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `LDS AX, [DI] will change the content of DS.`, o: [
          [`True`, `Correct. DS gets the segment from [DI+2],[DI+3].`],
          [`False`, `DS is loaded.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `LES AX, [DI] copies [DI] and [DI+1] into AX and [DI+2] and [DI+3] into ES.`, o: [
          [`True`, `Correct.`],
          [`False`, `This is exactly how LES works.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `LCS instruction loads any 16-bit or 32-bit register with an offset address, and SS with a segment address.`, o: [
          [`True`, `There is no LCS, and the description is of LSS.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `DS=A000H, DI=200H and the bytes at the address are B2, 1A, 00, 3C. After LES BX, [DI]:`, o: [
          [`BX = B21A, ES = 003C`, `Bytes are little-endian: low byte first.`],
          [`BX = 1AB2, ES = 3C00`, `Correct.`],
          [`BX = 1AB2, DS = 3C00`, `LES loads ES.`],
          [`BX = 3C00, ES = 1AB2`, `The first word goes to BX.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `The memory address used by LES BX, [DI] with DS=A000H and DI=200H is:`, o: [
          [`A0200`, `Correct. A0000 + 200.`],
          [`A200`, `DS not multiplied by 10.`],
          [`2200`, `ES was used.`],
          [`A2000`, `Wrong alignment.`]
        ], a: 0, src: `Lecture 6 example` },
        { q: `Which is faster: MOV BX, OFFSET LIST or LEA BX, LIST?`, o: [
          [`LEA, because it is a dedicated instruction`, `LEA is computed by the microprocessor at run time.`],
          [`MOV BX, OFFSET LIST, because the assembler calculates the offset`, `Correct.`],
          [`They take exactly the same time`, `The lecture says OFFSET is faster.`],
          [`LEA, because it does not access memory`, `Neither reads memory data; OFFSET is still faster.`]
        ], a: 1 },
        { q: `LEA BX, [DI] with DI = 0300H and the word at DS:0300 = 1234H gives:`, o: [
          [`BX = 1234H`, `That is MOV BX, [DI].`],
          [`BX = 0300H`, `Correct. LEA loads the address itself.`],
          [`BX = DS×10 + 300`, `LEA loads only the offset.`],
          [`BX unchanged`, `LEA writes BX.`]
        ], a: 1 },
        { q: `With DS=1000H, DI=1000H and bytes 7A, 12, 00, 30, LDS BX, [DI] gives:`, o: [
          [`BX = 127A, DS = 3000`, `Correct.`],
          [`BX = 7A12, DS = 0030`, `Little-endian: the first byte is the low byte.`],
          [`BX = 127A, ES = 3000`, `LDS loads DS.`],
          [`BX = 6F2A, DS = 3000`, `BX is overwritten.`]
        ], a: 0, src: `Exam 2023/24 Second term` }
      ]
    },
    /* ───────────────────────── LECTURE 7 ───────────────────────── */
    {
      n: 7, title: `String Instructions: LODS, STOS, OUTS, INS`,
      notes: [
        { h: `String instruction summary`, table: [
          [`Instruction`, `Operation`, `Pointer`, `Step (D=0 / D=1)`],
          [`LODSB / LODSW / LODSD`, `AL / AX / EAX ← DS:[SI]`, `SI`, `+1,+2,+4 / -1,-2,-4`],
          [`STOSB / STOSW / STOSD`, `ES:[DI] ← AL / AX / EAX`, `DI`, `+1,+2,+4 / -1,-2,-4`],
          [`OUTSB / OUTSW / OUTSD`, `output device ← DS:[SI]`, `SI`, `same`],
          [`INSB / INSW / INSD`, `ES:[DI] ← input device`, `DI`, `same`]
        ]},
        { h: `Key rules`, pts: [
          `<b>Source</b> strings are read from <b>DS:[SI]</b> (LODS, OUTS). <b>Destination</b> strings are written to <b>ES:[DI]</b> (STOS, INS).`,
          `The <b>direction flag D</b> (in EFLAGS) decides the direction: <b>D=0 positive</b> (SI/DI incremented), <b>D=1 negative</b> (decremented). String instructions <b>use</b> D but do <b>not change</b> it (CLD/STD change it).`,
          `LODS/STOS do <b>not affect the flags</b> (LODSW does not affect ZF).`,
          `String manipulation instructions are LODS, STOS, INS, OUTS (also MOVS, CMPS, SCAS). Plain <b>MOV is not</b> a string instruction.`,
          `Reading an input port and writing an output port use <b>IN</b> and <b>OUT</b>.`
        ]},
        { h: `Example: LODSW`, formula: [
          `DS=1000, SI=1000, D=0, SS=200, [SI]=AB, [SI+1]=CD, [SI-1]=00`,
          `Memory location = DS×10 + SI = 10000 + 1000 = 11000`,
          `AL = [11000] = AB,  AH = [11001] = CD  →  AX = CDAB`,
          `D=0 → SI = 1000 + 2 = 1002`,
          `(SS and [SI-1] are distractors)`
        ]},
        { h: `Example: STOSD (and the hex note)`, formula: [
          `DS=1000, DI=100, D=1, ES=200, EAX=ABCD1234`,
          `Memory location = ES×10 + DI = 2000 + 100 = 2100`,
          `4 bytes of EAX are stored starting at 2100`,
          `D=1 → DI = DI - 4. Lecture figure writes "96" (100 - 4 in decimal).`,
          `Strictly in hex: 100H - 4 = 00FCH. Write DI = 0FCH (and mention 96 if you follow the slide).`,
          `Byte order: the slide draws AB, CD, 12, 34 below 2100. On a real 8086 STOSD writes little-endian at 2100..2103: 34, 12, CD, AB.`
        ]},
        { h: `Example: OUTSB`, formula: [
          `DS=1000, SI=1000, D=0, [SI]=AB, [SI+1]=CD`,
          `Memory location = DS×10 + SI = 11000`,
          `Output device ← AB (one byte)`,
          `SI = 1001`
        ]},
        { h: `Example: INSD (asked in almost every final)`, formula: [
          `DS=1000, DI=100, D=1, ES=200, input string = ABCD1234`,
          `Memory location = ES×10 + DI = 2000 + 100 = 2100`,
          `Input device → memory: 4 bytes AB, CD, 12, 34 stored starting at 2100 (as drawn in the lecture)`,
          `D=1 → DI = 100 - 4 = 0FCH  (slide/key: "96")`,
          `DS is NOT used: INS always writes to ES:[DI]`
        ]},
        { h: `Revision: STOSW after LES (Final 2023/24)`, formula: [
          `After LES AX,[SI]: AX = ABCD, ES = 1234, DI = 200H, D = 0`,
          `STOSW: address = ES×10 + DI = 12340 + 200 = 12540`,
          `[12540] = CD (AL), [12541] = AB (AH)`,
          `DI = 200 + 2 = 202`
        ]}
      ],
      cards: [
        [`LODS reads from`, `DS:[SI] into AL/AX/EAX.`],
        [`STOS writes to`, `ES:[DI] from AL/AX/EAX.`],
        [`OUTS`, `Sends a byte/word/dword from DS:[SI] to an output device.`],
        [`INS`, `Stores data from an input device into ES:[DI].`],
        [`D=0`, `Positive direction: SI/DI incremented.`],
        [`D=1`, `Negative direction: SI/DI decremented.`],
        [`LODSB`, `AL = DS:[SI]; SI = SI ± 1.`],
        [`LODSW`, `AX = DS:[SI]; SI = SI ± 2.`],
        [`STOSD`, `ES:[DI] = EAX; DI = DI ± 4.`],
        [`STOSW with D=1`, `DI = DI - 2.`],
        [`OUTSD with D=1`, `SI = SI - 4.`],
        [`Do string instructions change D?`, `No, they only use it.`],
        [`LODSW with [SI]=AB, [SI+1]=CD`, `AX = CDAB.`],
        [`INSD with ES=200, DI=100, D=1`, `Address 2100; DI = 0FCH (slide writes 96).`],
        [`Instructions to read/write I/O ports`, `IN, OUT.`]
      ],
      qa: [
        [`Consider DS=1000, SI=1000, D=0, SS=200, [SI]=AB, [SI+1]=CD, [SI-1]=00. Show the memory state for LODSW.`, `Memory location = DS×10 + SI = 10000 + 1000 = <b>11000</b>.<br>AL = AB, AH = CD → <b>AX = CDAB</b>.<br>D = 0 so <b>SI = 1002</b>.<br>Figure: DS×10 + ESI into the adder → 11000; bytes AB, CD go to EAX; ESI 1000 crossed out, 1002 written.`],
        [`Consider DS=1000, DI=100, D=1, ES=200, input string = ABCD1234. Show the memory state for INSD.`, `INS stores into ES:[DI]. Memory location = ES×10 + DI = 2000 + 100 = <b>2100</b>.<br>The 4 bytes AB, CD, 12, 34 from the input device are stored starting at 2100 (lecture figure).<br>D = 1 so DI = DI - 4: the slide writes <b>96</b>; in hex 100H - 4 = <b>0FCH</b>.`],
        [`Consider DS=1000, DI=100, D=1, ES=200, EAX=ABCD1234. Show the memory state for STOSD.`, `Address = ES×10 + DI = 2000 + 100 = <b>2100</b>; EAX (4 bytes) is stored there; DI = DI - 4 = 0FCH (slide: 96). Byte order on a real 8086: [2100]=34, [2101]=12, [2102]=CD, [2103]=AB (the slide draws AB, CD, 12, 34).`],
        [`Explain the role of the direction flag in string instructions.`, `D (in EFLAGS) sets the direction in which data is retrieved or stored. D = 0: positive direction, SI/DI increase by 1, 2 or 4 after each instruction. D = 1: negative direction, they decrease. String instructions are affected by D but do not change it.`],
        [`Compare LODS, STOS, OUTS and INS.`, `LODS loads AL/AX/EAX from DS:[SI] (SI ± 1/2/4). STOS stores AL/AX/EAX at ES:[DI] (DI ± 1/2/4). OUTS sends data from DS:[SI] to an output device (SI changes). INS takes data from an input device into ES:[DI] (DI changes).`]
      ],
      quiz: [
        { q: `LODSW instruction copies strings from …… into register ……`, o: [
          [`ES:[DI], AX`, `ES:[DI] is the destination side.`],
          [`DS:[SI], AX`, `Correct.`],
          [`DS:[SI], AL`, `LODSW loads a word into AX.`],
          [`ES:[DI], BX`, `No.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `LODS instruction copies strings from memory location ……. into AL, AX, EAX.`, o: [
          [`ES:[SI]`, `Wrong segment.`],
          [`ES:[DI]`, `That is STOS's destination.`],
          [`DS:[SI]`, `Correct.`],
          [`DS:[DI]`, `Wrong pointer.`]
        ], a: 2, src: `Exam 2023/24 Second term` },
        { q: `STOS instruction copies …….. from AL, AX and EAX into a memory location.`, o: [
          [`Numeric values`, `Key says strings.`],
          [`Strings`, `Correct (key).`],
          [`Both a and b`, `Key: strings.`],
          [`None`, `Strings is listed.`]
        ], a: 1, src: `Revision sheet` },
        { q: `………… loads a byte of a string in memory into AL.`, o: [
          [`LODSB`, `Correct.`],
          [`LODSW`, `Loads a word into AX.`],
          [`STOSB`, `Stores AL into memory.`],
          [`STOSW`, `Stores AX.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The instructions used for reading an input port and writing an output port respectively are:`, o: [
          [`MOV, XCHG`, `Not port instructions.`],
          [`IN, OUT`, `Correct.`],
          [`IN, MOV`, `MOV does not write ports.`],
          [`MOV, IN`, `No.`]
        ], a: 1, src: `Revision sheet` },
        { q: `After running the instruction OUTSD with D=1:`, o: [
          [`DI = DI - 2`, `OUTS uses SI.`],
          [`SI = SI - 2`, `A double word is 4 bytes.`],
          [`SI = SI - 4`, `Correct.`],
          [`DI = DI + 2`, `Wrong register and direction.`]
        ], a: 2, src: `Exam 2022/23 Summer` },
        { q: `The instruction STOSW, D=1: store string word where ES:[DI] = AX; DI = DI + 2.`, o: [
          [`True`, `D=1 means DI = DI - 2.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `LODSW loads two bytes of a string from memory into AX.`, o: [
          [`True`, `Correct.`],
          [`False`, `LODSW = load string word.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `LODSW affects the zero flag.`, o: [
          [`True`, `LODS does not change flags.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `String instructions change the value of the direction flag D.`, o: [
          [`True`, `They only read D.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `String manipulation instructions are not affected by the direction flag D.`, o: [
          [`True`, `D decides increment or decrement.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `String manipulation instructions include LODS, MOV and STOS.`, o: [
          [`True`, `MOV is not a string instruction (MOVS is).`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `String manipulation instructions include LODS, MOV, INS and STOS.`, o: [
          [`True`, `MOV is not a string instruction.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `LODS loads AL, AX, EAX with a byte, two bytes or four bytes of data stored at DS:[DI].`, o: [
          [`True`, `LODS uses DS:[SI].`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `DS=1000, SI=1000, D=0, [SI]=AB, [SI+1]=CD. After LODSW:`, o: [
          [`AX = ABCD, SI = 1002`, `The first byte goes to AL.`],
          [`AX = CDAB, SI = 1002`, `Correct.`],
          [`AX = CDAB, SI = 0FFE`, `D=0 increments.`],
          [`AL = AB, SI = 1001`, `That is LODSB.`]
        ], a: 1, src: `Lecture 7 example` },
        { q: `DS=1000, DI=100, D=1, ES=200. The memory address for INSD is:`, o: [
          [`11000`, `INS uses ES, not DS.`],
          [`2100`, `Correct. 2000 + 100.`],
          [`10100`, `Wrong segment.`],
          [`300`, `ES must be multiplied by 10.`]
        ], a: 1, src: `Lecture 7 example` }
      ]
    },
    /* ───────────────────────── LECTURE 8 ───────────────────────── */
    {
      n: 8, title: `Jump Instructions, Interrupts, LOOP and Procedures`,
      notes: [
        { h: `Unconditional jumps (JMP)`, pts: [
          `Unconditional transfer instructions let the programmer <b>skip sections</b> of a program and branch to any part of memory for the next instruction.`,
          `Three types: <b>short</b>, <b>near</b>, <b>far</b>. Remember: <b>IP</b> holds the address of the next instruction; <b>CS</b> holds the segment of the code.`,
          `Short and near jumps change <b>IP only</b> (same code segment). Only the far jump changes <b>both CS and IP</b>.`
        ]},
        { h: `The three jump types`, table: [
          [`Type`, `Size`, `Range`, `New address`],
          [`Short`, `2 bytes (opcode + 1-byte displacement)`, `+127 to -128 bytes`, `IPnew = IP + [CS+1]`],
          [`Near`, `3 bytes (opcode + 2-byte displacement)`, `+32K to -32K bytes`, `IPnew = IP + [CS+2][CS+1]`],
          [`Far`, `5 bytes (opcode + offset + segment)`, `Any location in real memory`, `offset = bytes 2,3 = [CS+2][CS+1]; segment = bytes 4,5 = [CS+4][CS+3]`]
        ]},
        { h: `Lecture examples (CS=1000, IP=0002, JMP at 10000)`, formula: [
          `Short, [CS+1]=04: IPnew = 002 + 004 = 006 → jump address = CS×10 + 006 = 10006`,
          `Near, [CS+1]=02, [CS+2]=01: IPnew = 002 + 0102 = 104 → 10104`,
          `Far, [CS+1]=27, [CS+2]=01, [CS+3]=00, [CS+4]=A3:`,
          `   offset = 0127, segment = A300 → A300×10 + 0127 = A3127`,
          `Bytes are read high byte last: [CS+2][CS+1] means "byte 3 followed by byte 2".`
        ]},
        { h: `Revision Q12 / Final 2023/24 (CS=1000, IP=300; bytes JMP, 04, 02, 30, A4)`, formula: [
          `Starting address = CS×10 = 10000 (the JMP opcode)`,
          `Short: IP = 300 + 04 = 304 → 10000 + 304 = 10304`,
          `Near:  IP = 300 + 0204 = 504 → 10504`,
          `Far:   offset = 0204, segment = A430 → A4300 + 0204 = A4504`
        ]},
        { h: `Revision Q13 / Final 2024/25 (CS=2000, IP=300; bytes JMP, 1C, 20, A0, 2D)`, formula: [
          `Short: IP = 300 + 1C = 31C → 20000 + 31C = 2031C`,
          `Near:  IP = 300 + 201C = 231C → 2231C`,
          `Far:   offset = 201C, segment = 2DA0 → 2DA00 + 201C = 2FA1C`,
          `SS, DS, BP in the question are distractors.`
        ]},
        { h: `Final 2023/24 (CS=3000H, IP=400H; bytes JMP, 10, 43, 1C, 20)`, formula: [
          `Near: IP = 400 + 4310 = 4710 → 30000 + 4710 = 34710`,
          `Far:  offset = 4310, segment = 201C → 201C0 + 4310 = 244D0`,
          `(Short, if asked: IP = 400 + 10 = 410 → 30410)`,
          `Real 8086 note: the CPU adds the displacement to the IP of the NEXT instruction; the course formula adds it to the given IP.`
        ]},
        { h: `Interrupts`, pts: [
          `An <b>interrupt</b> is the mechanism by which the processor transfers control from the current program to another program having <b>higher priority</b>. It breaks the normal sequence of execution.`,
          `The routine executed on an interrupt (or multiple interrupts) is the <b>Interrupt Service Routine (ISR)</b>. After the ISR the processor must return to the interrupted program.`,
          `<b>Handling sequence</b>: (1) save the PC content and the current state (flags, registers) <b>in the stack</b>; (2) load PC with the start address of the ISR and execute it; (3) finish the ISR when the return instruction executes; (4) return to the point where execution was interrupted.`,
          `<b>Vectored</b> interrupts have a fixed vector address (start of the subroutine); <b>non-vectored</b> interrupts have a vector address that is not predefined.`,
          `<b>Maskable</b> interrupts can be blocked (inhibited by an interrupt mask bit). <b>Non-maskable</b> (NMI) cannot be masked or ignored; used for high-priority tasks like memory parity or bus faults; absolute priority: the CPU finishes the current memory cycle then branches to the handler.`,
          `<b>Software</b> interrupts are special instructions (INT) that transfer control to a predefined ISR. <b>Hardware</b> interrupts are signals given to the processor.`
        ]},
        { h: `LOOP (Lab 7)`, pts: [
          `LOOP repeats a block a specific number of times. <b>CX</b> is automatically the counter: (1) CX = CX - 1; (2) if CX ≠ 0 jump to the label, else continue with the next instruction.`,
          `<b>LOOPE/LOOPZ</b>: decrement CX, jump if CX ≠ 0 <b>and ZF = 1</b>. <b>LOOPNE/LOOPNZ</b>: jump if CX ≠ 0 <b>and ZF = 0</b>.`,
          `For a nested loop, save the outer CX in a variable (or on the stack) before setting the inner count, and restore it before the outer LOOP.`
        ]},
        { h: `LOOP programs (Lab 7)`, code: `; increment AX 10 times
MOV AX, 0
MOV CX, 10
L:  INC AX
    LOOP L          ; AX = 10

; nested: AX 10 times, BX 20 times for each -> AX = 10, BX = 200
count DW ?
MOV AX, 0
MOV BX, 0
MOV CX, 10
L1: INC AX
    MOV count, CX   ; save outer counter
    MOV CX, 20
L2: INC BX
    LOOP L2
    MOV CX, count   ; restore outer counter
    LOOP L1

; sum 1..10 in AX then increment -> AX = 55 + 1 = 56
MOV AX, 0
MOV CX, 10
L:  ADD AX, CX
    LOOP L
INC AX` },
        { h: `Procedures: CALL and RET (Lab 8)`, pts: [
          `A <b>subroutine (procedure)</b> is a special part of a program that can be called from any point; it performs a function needed frequently. It is the ASM equivalent of a Java/C++ function. Syntax: <code>name PROC ... RET ... name ENDP</code>.`,
          `<b>CALL</b> pushes the offset of the next instruction on the stack and copies the address of the called procedure into (E)IP.`,
          `<b>RET</b> pops the top of the stack into (E)IP, returning to the main program. Every procedure must end with RET.`,
          `Directives: <b>END</b> marks the end of the program; <b>ENDS</b> marks the end of a logical segment; <b>ENDP</b> ends a procedure.`
        ]},
        { h: `Procedure examples (Lab 8)`, code: `.data
Number DW 4h
Square DW ?
.code
main PROC
    CALL getSquare
    RET
main ENDP
getSquare PROC
    MOV AX, Number
    MUL AX          ; AX = 4 * 4 = 16
    MOV Square, AX
    RET
getSquare ENDP

; area of triangle = (base * hight) / 2
Triangle_Area PROC
    MOV AX, base
    MUL hight       ; AX = 5 * 10 = 50
    MOV BX, 2
    DIV BX          ; AX = 25
    MOV area, AX
    RET
Triangle_Area ENDP
base  DW 5
hight DW 10
area  DW ?
END` }
      ],
      cards: [
        [`Short jump`, `2 bytes, range +127 to -128; IPnew = IP + [CS+1].`],
        [`Near jump`, `3 bytes, range ±32K; IPnew = IP + [CS+2][CS+1].`],
        [`Far jump`, `5 bytes, anywhere in real memory; bytes 2-3 offset, bytes 4-5 segment.`],
        [`Registers changed by short/near JMP`, `IP only.`],
        [`Registers changed by far JMP`, `CS and IP.`],
        [`Interrupt`, `Transfers control from the current program to a higher-priority program.`],
        [`ISR`, `Interrupt service routine: the routine executed on interrupt(s).`],
        [`First step of interrupt handling`, `Save the PC and current state (flags, registers) in the stack.`],
        [`Non-maskable interrupt`, `Cannot be blocked; high priority (memory parity, bus faults).`],
        [`Non-vectored interrupt`, `Vector address not predefined.`],
        [`Software interrupt`, `Generated by executing an interrupt instruction.`],
        [`Interrupt classes`, `Vectored/non-vectored, maskable/non-maskable, software/hardware.`],
        [`LOOP counter`, `CX (decrement, jump if not zero).`],
        [`LOOPE / LOOPNE`, `Also require ZF=1 / ZF=0.`],
        [`CALL`, `Pushes the offset of the next instruction, loads the procedure address into IP.`],
        [`RET`, `Pops the top of the stack into IP.`],
        [`END vs ENDS`, `END ends the program; ENDS ends a segment.`],
        [`CS=1000, IP=300, bytes 04 02 30 A4: far jump`, `A4504.`]
      ],
      qa: [
        [`Given CS=1000, SS=2000, IP=300, BP=1200, show the execution of short, near and far jump for the bytes JMP, 04, 02, 30, A4 (from the starting address up).`, `Starting address = CS×10 = 10000.<br><b>Short</b> (2-byte, +127/-128): IP = 300 + 04 = 304 → <b>10304</b>.<br><b>Near</b> (3-byte, ±32K; bytes 2 and 3 are the displacement): IP = 300 + 0204 = 504 → <b>10504</b>.<br><b>Far</b> (5-byte; bytes 2-3 offset, 4-5 segment): offset = 0204, segment = A430 → A4300 + 0204 = <b>A4504</b>.`],
        [`Given CS=2000, SS=1000, IP=300, DS=1200, calculate the short, near and far jump for the bytes JMP, 1C, 20, A0, 2D.`, `Short: 20000 + 300 + 1C = <b>2031C</b>.<br>Near: 20000 + 300 + 201C = <b>2231C</b>.<br>Far: segment 2DA0 ×10 = 2DA00, offset 201C → <b>2FA1C</b>.`],
        [`Describe the interrupt handling procedure.`, `1) Save the PC content and information about the current state (flags, registers) in the stack. 2) Load PC with the beginning address of the ISR and execute it. 3) Finish the ISR when the return instruction is executed. 4) Return to the point in the interrupted program where execution was interrupted.`],
        [`Explain the types of interrupts.`, `<b>Vectored vs non-vectored</b>: vectored have a fixed vector address (start of the ISR); non-vectored have no predefined vector address.<br><b>Maskable vs non-maskable</b>: maskable can be blocked using an interrupt mask bit; non-maskable (NMI) cannot be ignored, are used for high-priority events such as memory parity or bus faults, and have absolute priority.<br><b>Software vs hardware</b>: software interrupts are instructions that transfer control to a predefined ISR; hardware interrupts are signals given to the processor.`],
        [`Explain how the LOOP instruction works and write a program that sums 1 to 10.`, `LOOP first subtracts 1 from CX, then compares CX with zero; if CX ≠ 0 it jumps to the label, otherwise execution continues after LOOP.<br><pre>MOV AX, 0\nMOV CX, 10\nL: ADD AX, CX\n   LOOP L      ; AX = 55</pre>`],
        [`What do CALL and RET do?`, `CALL pushes the offset of the next instruction (return address) on the stack and copies the address of the called procedure into EIP. RET pops the top of the stack into EIP so execution returns to the instruction after the CALL.`]
      ],
      quiz: [
        { q: `If an interrupt is generated by the execution of an interrupt instruction, it is a:`, o: [
          [`Software interrupt`, `Correct.`],
          [`External interrupt`, `External means hardware signals.`],
          [`Hardware interrupt`, `Hardware interrupts are signals.`],
          [`None of the mentioned`, `Software is correct.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `An interrupt breaks the execution of instructions and diverts its execution to:`, o: [
          [`Interrupt service routine`, `Correct.`],
          [`Counter word register`, `No.`],
          [`Execution unit`, `No.`],
          [`Control unit`, `No.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `While the CPU is executing a program, if an interrupt occurs it:`, o: [
          [`Follows the next instruction in the program`, `It transfers control to the ISR.`],
          [`Jumps to instruction in other registers`, `No.`],
          [`Breaks the normal sequence of execution of instructions`, `Correct.`],
          [`Stops executing the program`, `It returns after the ISR.`]
        ], a: 2, src: `Revision sheet` },
        { q: `If an interrupt request given to an input pin cannot be disabled by any means, the pin is called:`, o: [
          [`Maskable interrupt`, `Maskable can be blocked.`],
          [`Non-maskable interrupt`, `Correct.`],
          [`Both`, `No.`],
          [`None`, `NMI is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Interrupts can be classified into:`, o: [
          [`Software and hardware`, `Only one classification.`],
          [`Maskable and non-maskable`, `Only one classification.`],
          [`Vectored and non-vectored`, `Only one classification.`],
          [`All of the mentioned`, `Correct.`]
        ], a: 3, src: `Revision sheet` },
        { q: `…… instructions are used when some instructions must be executed a number of times.`, o: [
          [`Jump`, `Jumps transfer control but the key is Loop.`],
          [`Loop`, `Correct.`],
          [`Shift`, `No.`],
          [`Rotate`, `No.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Non-maskable interrupts are those that cannot be blocked.`, o: [
          [`True`, `Correct.`],
          [`False`, `This is the definition.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Registers IP and CS are modified after short and near JMP instructions.`, o: [
          [`True`, `Short and near jumps change IP only. (A student's mark on the 2024/25 paper said True.)`],
          [`False`, `Correct. Only the far jump changes CS.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `Registers IP and CS are modified after any JMP instruction (short, near or far).`, o: [
          [`True`, `CS changes only in far jumps.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `The far jump is a six bytes instruction.`, o: [
          [`True`, `It is five bytes.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `The fourth and fifth bytes of the near jump define the segment of the jump address.`, o: [
          [`True`, `A near jump has only 3 bytes; that describes the far jump.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `In short and far jumps, IP is modified before executing the jump instruction.`, o: [
          [`True`, `The jump itself loads the new IP when it executes.`],
          [`False`, `Most likely intended answer: IP gets its new value as the result of executing the jump. (Doubtful item: the CPU does advance IP past the instruction during fetch.)`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `ISR is a program responsible for handling (multiple) interrupts.`, o: [
          [`True`, `Correct.`],
          [`False`, `It is the routine executed on interrupt(s).`]
        ], a: 0, src: `Revision sheet` },
        { q: `The first step of interrupt handling is to save the PC content and current state in the heap.`, o: [
          [`True`, `It is saved in the STACK.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Non-vectored interrupts are those in which the vector address is not predefined.`, o: [
          [`True`, `Correct.`],
          [`False`, `This is the definition.`]
        ], a: 0, src: `Revision sheet` },
        { q: `LOOP is an instruction based on the AX (or AL) register.`, o: [
          [`True`, `LOOP uses CX.`],
          [`False`, `Correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The directive that marks the end of an assembly language program is:`, o: [
          [`ENDS`, `Ends a segment.`],
          [`END`, `Correct.`],
          [`ENDS & END`, `Only END.`],
          [`None`, `END is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The directive that marks the end of a logical segment is:`, o: [
          [`ENDS`, `Correct.`],
          [`END`, `Ends the program.`],
          [`ENDS & END`, `Only ENDS.`],
          [`None`, `ENDS is correct.`]
        ], a: 0, src: `Revision sheet` },
        { q: `CS=2000, IP=300, bytes after JMP: 1C, 20, A0, 2D. The near jump address is:`, o: [
          [`2031C`, `That is the short jump (1 byte displacement).`],
          [`2231C`, `Correct. 20000 + 300 + 201C.`],
          [`2FA1C`, `That is the far jump.`],
          [`2201C`, `IP was not added.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `CS=2000, IP=300, bytes after JMP: 1C, 20, A0, 2D. The far jump address is:`, o: [
          [`2FA1C`, `Correct. 2DA00 + 201C.`],
          [`2DA00`, `Offset missing.`],
          [`A2D1C`, `Segment bytes reversed.`],
          [`2231C`, `That is the near jump.`]
        ], a: 0, src: `Exam 2024/25` }
      ]
    },
    /* ───────────────────────── LAB LECTURE 9 ───────────────────────── */
    {
      n: 9, title: `Lab: Arithmetic, Logic, Shift and Rotate Instructions`,
      notes: [
        { h: `Arithmetic instructions (Labs 3 and 4)`, table: [
          [`Instruction`, `Effect`],
          [`ADD dest, src`, `dest = dest + src`],
          [`ADC dest, src`, `dest = dest + src + CF (addition when a carry exists)`],
          [`SUB dest, src`, `dest = dest - src`],
          [`SBB dest, src`, `dest = dest - src - CF (subtraction with borrow; CF acts as the borrow flag)`],
          [`INC dest / DEC dest`, `dest + 1 / dest - 1`],
          [`NEG dest`, `2's complement (dest = 0 - dest)`],
          [`CMP a, b`, `Computes a - b only to set the flags (result not stored)`],
          [`XCHG a, b`, `Swaps the two operands`],
          [`MUL src`, `Byte src: <b>AX = AL × src</b>. Word src: <b>DX:AX = AX × src</b> (high word in DX)`],
          [`DIV src`, `Word src (e.g. CX): DX:AX ÷ src → <b>AX = quotient (integer part), DX = remainder</b>. Byte src: AX ÷ src → AL = quotient, AH = remainder`]
        ]},
        { h: `MUL and DIV rules`, pts: [
          `<b>AX must be used</b> in multiplication and division: MUL and DIV take only one operand (register or memory, never immediate); the other operand is always AX.`,
          `So "MOV CX,5 / MUL 3" style code is wrong: you must <code>MOV AX, 5</code> then <code>MOV BX, 3</code>, <code>MUL BX</code> → AX = 15.`,
          `<code>MOV AX, 5 / MOV CX, 2 / DIV CX</code> → AX = 2, DX = 1. <code>MOV AX, 10 / MOV BX, 2 / DIV BX</code> → AX = 5, DX = 0 (the lab explains division as repeated subtraction: 10-2-2-2-2-2 = 0 in 5 steps).`,
          `Before a word DIV, DX must hold the high part of the dividend (normally 0).`,
          `Multiplication vs addition (trade-off): <code>C = 5x + 7</code> with MUL uses 2 registers and 5 instructions; with repeated ADD uses 1 register and 7 instructions. <code>C = (3x + 4y) - 14</code>: MUL version 3 registers, 10 instructions; ADD version 1 register, 9 instructions. Not every time is MUL better.`
        ]},
        { h: `Lab formula programs`, code: `; C = 5x + 7  (using MUL)
MOV AX, X
MOV BX, 5
MUL BX          ; AX = 5x
ADD AX, 7
MOV C, AX

; (A * 35 + B) / (C - D)
MOV AX, A
MOV BX, 35
MUL BX
ADD AX, B
MOV BX, C
SUB BX, D
DIV BX          ; AX = quotient, DX = remainder

; (4A + 18) / 6B
MOV AX, 4
MOV BX, A
MUL BX          ; AX = 4A
ADD AX, 18
MOV CX, AX      ; CX = 4A + 18
MOV AX, B
MOV BX, 6
MUL BX          ; AX = 6B
MOV BX, AX
MOV AX, CX
DIV BX          ; AX = (4A + 18) / 6B

; [9C / 5] + 32
MOV AX, C
MOV BX, 9
MUL BX
MOV BX, 5
DIV BX
ADD AX, 32

; AX = (-val2 + BX) - val4
MOV AX, val2
NEG AX
ADD AX, BX
SUB AX, val4` },
        { h: `Logical instructions (Labs 4 and 5)`, table: [
          [`A`, `B`, `AND`, `OR`, `XOR`],
          [`0`, `0`, `0`, `0`, `0`],
          [`0`, `1`, `0`, `1`, `1`],
          [`1`, `0`, `0`, `1`, `1`],
          [`1`, `1`, `1`, `1`, `0`]
        ]},
        { h: `NOT, NEG, TEST`, pts: [
          `<b>NOT</b> converts 1 to 0 and 0 to 1 (1's complement): <code>MOV AL, 5 / NOT AL</code>: 00000101 → <b>11111010</b> (FAh).`,
          `<b>NEG</b> gets the <b>2's complement</b>: invert then add 1: <code>MOV AL, 5 / NEG AL</code> → 11111011 (FBh = -5).`,
          `<b>TEST</b> has the same truth table as AND but <b>only affects the flags (ZF)</b>; the result is not stored. If the result = 0 → ZF = 1; if the result ≠ 0 → ZF = 0. <code>MOV AX,1 / MOV BX,0 / TEST AX,BX</code> → ZF = 1, AX unchanged.`,
          `Binary numbers must end with <b>b</b>: <code>MOV AX, 1001b</code>. Hex ends with h; a hex number starting with a letter needs a leading 0 (0FFh).`
        ]},
        { h: `Variables (define directives)`, table: [
          [`Directive`, `Purpose`, `Storage`],
          [`DB`, `Define Byte`, `1 byte (8-bit) integer`],
          [`DW`, `Define Word`, `2 bytes (16-bit) integer`],
          [`DD`, `Define Doubleword`, `4 bytes (32-bit) integer or real`],
          [`DQ`, `Define Quadword`, `8 bytes (64-bit) integer or real`],
          [`DT`, `Define Ten Bytes`, `10 bytes (80-bit) integer or real`]
        ]},
        { h: `Shift instructions`, pts: [
          `Shifting moves bits left or right inside an operand. Syntax: <code>SHL destination, count</code>; destination = register or memory; count = immediate or <b>CL</b>. Shifts and rotates affect the Carry (and Overflow) flags.`,
          `<b>Logical shift</b> fills the new bit position with <b>0</b>. <b>Arithmetic shift</b> fills it with a copy of the <b>sign bit</b>.`,
          `<b>SHL</b> (= <b>SAL</b>): shift left, lowest bit filled with 0, highest bit goes to CF. Shifting left n bits multiplies by 2ⁿ: <code>MOV DL,5 / SHL DL,1</code> → 10; <code>SHL DL,2</code> → 20.`,
          `<b>SHR</b>: shift right, highest bit filled with 0, lowest bit goes to CF. Divides an unsigned number by 2ⁿ: DL = 80 (01010000b) → SHR 1 = 40 → SHR 2 = 10.`,
          `<b>SAR</b>: shift right keeping the sign: DL = -80 (10110000b) → SAR 1 = 11011000b = -40 → SAR 2 = 11110110b = -10, CF = 0.`,
          `Sign-extend AL into AX: <code>MOV AL,80h / SHL AX,8</code> (AX = 8000h) <code>/ SAR AX,8</code> → AX = FF80h.`
        ]},
        { h: `Rotate instructions`, pts: [
          `<b>ROL</b>: each bit shifts left; the highest bit goes to <b>CF and to bit 0</b>. No bits are lost. <code>AL=11110000b, ROL AL,1</code> → 11100001b, CF = 1.`,
          `<b>ROR</b>: each bit shifts right; the lowest bit goes to <b>CF and to the highest bit</b>. <code>AL=11110000b, ROR AL,1</code> → 01111000b, CF = 0.`,
          `Exchanging the upper (bits 4-7) and lower (bits 0-3) halves of a byte: <code>DL=3Fh, ROL DL,4</code> (or ROR DL,4) → F3h, CF = 1.`,
          `<b>RCL</b>: shift left, <b>CF goes into the LSB</b>, MSB goes into CF. <code>CLC / MOV BL,88h / RCL BL,1</code> → BL = 00010000b, CF = 1; <code>RCL BL,1</code> again → BL = 00100001b, CF = 0.`,
          `<b>RCR</b>: shift right, CF goes into the MSB, LSB goes into CF. <code>STC / MOV AH,10h / RCR AH,1</code> → AH = 10001000b, CF = 0.`,
          `<b>CLC</b> clears CF; <b>STC</b> sets CF. ROL/ROR/RCL/RCR are not arithmetic instructions.`
        ]}
      ],
      cards: [
        [`ADC`, `Add with carry: dest + src + CF.`],
        [`SBB`, `Subtract with borrow: dest - src - CF (CF is the borrow flag).`],
        [`MUL operand rules`, `One register/memory operand; AX is the implicit operand and holds the result.`],
        [`DIV results`, `AX = quotient, DX = remainder.`],
        [`5 / 2 with DIV`, `AX = 2, DX = 1.`],
        [`NOT 00000101`, `11111010 (FAh).`],
        [`NEG 5 (8-bit)`, `11111011 = FBh = -5 (2's complement).`],
        [`TEST`, `AND that only sets flags; result 0 → ZF = 1.`],
        [`DB / DW / DD / DQ / DT`, `1 / 2 / 4 / 8 / 10 bytes.`],
        [`Logical vs arithmetic shift`, `Logical fills with 0; arithmetic fills with the sign bit.`],
        [`SHL by n`, `Multiply by 2ⁿ.`],
        [`SHR by n`, `Unsigned divide by 2ⁿ.`],
        [`SAL`, `Identical to SHL.`],
        [`ROL`, `MSB → CF and LSB; no bits lost.`],
        [`RCL`, `CF → LSB, MSB → CF.`],
        [`ROL DL,4 with DL=3Fh`, `DL = F3h (swaps the nibbles), CF = 1.`],
        [`CLC / STC`, `Clear / set the carry flag.`],
        [`Count operand of shift/rotate`, `Immediate value or CL.`]
      ],
      qa: [
        [`Write a program to compute C = (3x + 4y) - 14 using MUL, and another using ADD only. Which is better?`, `<pre>; using MUL          ; using ADD\nMOV AX, 3            MOV AX, x\nMOV BX, x            ADD AX, x\nMUL BX               ADD AX, x\nMOV BX, AX           ADD AX, y\nMOV CX, 4            ADD AX, y\nMOV AX, y            ADD AX, y\nMUL CX               ADD AX, y\nADD BX, AX           SUB AX, 14\nSUB BX, 14           MOV C, AX\nMOV C, BX</pre>The MUL version uses 3 registers and 10 instructions; the ADD version uses one register and 9 instructions. Both are correct; not every time is multiplication better, it is a trade-off.`],
        [`Explain the difference between logical and arithmetic shift with SHR and SAR examples.`, `Logical shift fills the new position with 0; arithmetic shift fills it with a copy of the sign bit, so the sign is preserved. SHR on 80 (01010000b) by 1 gives 40; SAR on -80 (10110000b) by 1 gives 11011000b = -40, and by 2 more gives 11110110b = -10.`],
        [`Compare ROL, ROR, RCL and RCR.`, `ROL: bits move left, MSB goes to CF and to the LSB. ROR: bits move right, LSB goes to CF and to the MSB. RCL: bits move left through the carry: CF enters the LSB and the MSB enters CF. RCR: bits move right through the carry: CF enters the MSB and the LSB enters CF. No bits are lost in any rotate.`],
        [`Explain how MUL and DIV use the registers.`, `Both use AX implicitly. MUL src: AX × src, result in AX (DX:AX for 16-bit operands). DIV src: AX (with DX as the high word) ÷ src: AX = integer quotient, DX = remainder. The operand must be a register or memory, so the program must load AX first.`],
        [`What is the difference between NOT and NEG?`, `NOT inverts every bit (1's complement): 5 = 00000101 becomes 11111010. NEG gives the 2's complement (invert then add 1), i.e. the negative of the number: 5 becomes 11111011 = -5.`]
      ],
      quiz: [
        { q: `Which of the following is not a data copy/transfer instruction?`, o: [
          [`MOV`, `MOV copies data.`],
          [`PUSH`, `PUSH copies data to the stack.`],
          [`DAS`, `Correct. DAS (decimal adjust after subtraction) is arithmetic.`],
          [`POP`, `POP copies data from the stack.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Which of the following is the implementation of AX = (-val2 + BX) - val4?`, o: [
          [`mov ax, val2 / neg ax / add ax, bx / sub ax, val4`, `Correct.`],
          [`mov ax, val3 / neg ax / add ax, bx / sub ax, val4`, `Uses val3 instead of val2.`],
          [`mov ax, val2 / neg ax / add ax, bx / add ax, val4`, `val4 must be subtracted.`],
          [`mov ax, val2 / add ax / add ax, bx / sub ax, val4`, `Missing NEG (and "add ax" is incomplete).`]
        ], a: 0, src: `Revision sheet` },
        { q: `Which of the following is not an arithmetic instruction?`, o: [
          [`INC`, `Arithmetic.`],
          [`CMP`, `Arithmetic (subtraction for flags).`],
          [`DEC`, `Arithmetic.`],
          [`ROL`, `Correct. ROL is a rotate (bit) instruction.`]
        ], a: 3, src: `Revision sheet` },
        { q: `Which is not an operand?`, o: [
          [`Variable`, `Can be an operand.`],
          [`Assembler`, `Correct. The assembler is a program.`],
          [`Register`, `Operand.`],
          [`Memory location`, `Operand.`]
        ], a: 1, src: `Revision sheet` },
        { q: `INC destination increments the content of the destination by:`, o: [
          [`1`, `Correct.`],
          [`2`, `No.`],
          [`8`, `No.`],
          [`1024`, `No.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The instruction that supports addition when a carry exists is:`, o: [
          [`ADD`, `Ignores the incoming carry.`],
          [`ADC`, `Correct.`],
          [`ADD & ADC`, `Only ADC adds CF.`],
          [`None`, `ADC is correct.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The instruction that enables subtraction with borrow is:`, o: [
          [`DEC`, `Subtracts 1.`],
          [`SUB`, `No borrow input.`],
          [`SBB`, `Correct.`],
          [`None`, `SBB is correct.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The flag that acts as the borrow flag in SBB is the:`, o: [
          [`Direction flag`, `Used by string instructions.`],
          [`Carry flag`, `Correct.`],
          [`Parity flag`, `No.`],
          [`Trap flag`, `No.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The flag that acts as borrow flag in the subtraction-with-borrow instruction is the carry flag CF.`, o: [
          [`True`, `Correct.`],
          [`False`, `CF is the borrow flag in SBB.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `MOV AL, 5 then NOT AL gives AL =`, o: [
          [`11111010b (FAh)`, `Correct. Every bit inverted.`],
          [`11111011b (FBh)`, `That is NEG (2's complement).`],
          [`00000101b`, `Unchanged; NOT inverts.`],
          [`10000101b`, `Only the sign bit flipped.`]
        ], a: 0 },
        { q: `MOV AX, 5 / MOV DX, 0 / MOV CX, 2 / DIV CX. The result is:`, o: [
          [`AX = 2, DX = 1`, `Correct. Quotient in AX, remainder in DX.`],
          [`AX = 1, DX = 2`, `Reversed.`],
          [`AX = 2.5`, `Integer division only.`],
          [`CX = 2, AX = 5`, `DIV changes AX and DX.`]
        ], a: 0 },
        { q: `MOV AL, 11110000b / ROL AL, 1 gives:`, o: [
          [`AL = 11100001b, CF = 1`, `Correct.`],
          [`AL = 11100000b, CF = 1`, `That is SHL (bit 0 filled with 0).`],
          [`AL = 01111000b, CF = 0`, `That is ROR.`],
          [`AL = 11100001b, CF = 0`, `CF receives the old MSB (1).`]
        ], a: 0 },
        { q: `MOV DL, 3Fh / ROL DL, 4 gives:`, o: [
          [`DL = F3h, CF = 1`, `Correct. The nibbles are exchanged.`],
          [`DL = F0h, CF = 1`, `That is SHL by 4.`],
          [`DL = 03h, CF = 1`, `That is SHR by 4.`],
          [`DL = 3Fh, CF = 0`, `A rotate by 4 changes an 8-bit value unless the halves are equal.`]
        ], a: 0 }
      ]
    }
  ],
  exams: [
    /* ───────────── FINAL 2024/25 ───────────── */
    { title: `Final Exam 2024/2025 (First term)`,
      meta: `First term · 2 hours · 60 marks · 2 questions · CS203 · Dr. Lamiaa Hassaan, Dr. Ahmed Ibrahim`,
      note: `Transcribed from two phone photos. The paper has a student's pencil ticks on the true/false part and pencil working on part d (2231C and 2FA1C, which agree with our answers). The student's marks disagree with the lectures on T/F 1 (student: False; lecture register tree: True) and T/F 10 (student: True; short and near jumps change IP only: False).`,
      sections: [
        { title: `Question One I · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `……. contains the address of an instruction to be fetched.`, o: [`PC`, `MAR`, `IR`, `MBR`], a: 0, why: `PC holds the address of the instruction to be fetched (L2).` },
          { type: `mcq`, q: `The C bit in the EFLAGS register refers to:`, o: [`compute bit`, `control bit`, `carry bit`, `none of the mentioned`], a: 2, why: `CF is the carry flag (L2).` },
          { type: `mcq`, q: `……uses binary signals to synchronize the actions of all devices attached to the system bus.`, o: [`Data bus`, `Control bus`, `Address bus`, `none of the mentioned`], a: 1, why: `Lecture definition of the control bus (L1).` },
          { type: `mcq`, q: `…… is high speed temporary storage area built into the CPU.`, o: [`A processor`, `ALU`, `A bus`, `A Register`], a: 3, why: `Definition of a register (L1, L2).` },
          { type: `mcq`, q: `Which of the following instructions is not valid?`, o: [`MOV AX, BX`, `MOV DS, AX`, `MOV [AX], [5000H]`, `PUSH AX`], a: 2, why: `Memory-to-memory moves are not allowed (L3).` },
          { type: `mcq`, q: `After each execution of the instruction PUSH EAX, the stack pointer is:`, o: [`incremented by 2`, `decremented by 2`, `incremented by 4`, `decremented by 4`], a: 3, why: `EAX is 4 bytes and PUSH decrements SP (L5).` },
          { type: `mcq`, q: `LODSW instruction copies strings from ……into register……`, o: [`ES:[DI], AX`, `DS:[SI], AX`, `DS:[SI], AL`, `ES:[DI], BX`], a: 1, why: `LODS reads DS:[SI]; the W form loads AX (L7).` },
          { type: `mcq`, q: `If SS=1300, SP=100, CX=CD01 then after executing the instruction POP ECX the following is correct:`, o: [`SS = 1304`, `SP = 98`, `SS = 1298`, `SP = 104`], a: 3, why: `POP increments SP by 4 for a 32-bit register; SS never changes (L5).` },
          { type: `mcq`, q: `If the interrupt is generated by the execution of an interrupt instruction then it is ……`, o: [`software interrupt`, `external interrupt`, `hardware interrupt`, `none of the mentioned`], a: 0, why: `Software interrupts are instructions (L8).` },
          { type: `mcq`, q: `The segment register of the instruction MOV [SI][BP], BX will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 2, why: `BP is used as the base, so the default segment is SS (L4).` }
        ]},
        { title: `Question One II · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `User visible registers include general purpose, special purpose and segment registers.`, a: 0, why: `The lecture register tree puts these three under user-visible (L2).`, key: `Student mark on the paper: False.` },
          { type: `tf`, q: `Register CS cannot be modified, so the instruction MOV [CS], AX is incorrect.`, a: 0, why: `CS cannot be a MOV destination, and [CS] is not a valid memory operand (L3).` },
          { type: `tf`, q: `Memory Address Register (MAR) contains the instruction most recently fetched.`, a: 1, why: `That is the IR; MAR contains the address of a memory location (L2).` },
          { type: `tf`, q: `The data bus transfers instructions and data between the CPU and memory.`, a: 0, why: `Lecture definition (L1).` },
          { type: `tf`, q: `The instruction STOSW, D=1: Store String Word where ES:[DI] = AX; DI = DI + 2.`, a: 1, why: `With D=1 DI is decremented: DI = DI - 2 (L7).` },
          { type: `tf`, q: `Non-maskable interrupts are those that cannot be blocked.`, a: 0, why: `L8.` },
          { type: `tf`, q: `LDS AX, [DI] will change the content of AX only.`, a: 1, why: `It also loads DS (L6).` },
          { type: `tf`, q: `The statement MOV ES:SI, CX is incorrect.`, a: 0, why: `SI without brackets is a register, so a segment prefix makes no sense; ES:[SI] would be correct (L3).` },
          { type: `tf`, q: `The memory address of the instruction MOV AX, 10[SI+BC] = DS*10 + SI + BC.`, a: 1, why: `The displacement 10 is missing: DS×10 + 10 + SI + BC (L4).` },
          { type: `tf`, q: `Registers IP and CS are modified after short and near JMP instructions.`, a: 1, why: `Short and near jumps change IP only; only the far jump changes CS (L8).`, key: `Student mark on the paper: True.` }
        ]},
        { title: `Question Two`, marks: `40 marks`, items: [
          { type: `written`, q: `a- Compare between a debugger and an assembler. (6 marks)`, ans: `<table><tr><th>Debugger</th><th>Assembler</th></tr><tr><td>Easy to run</td><td>Hard to run</td></tr><tr><td>Low overhead programs</td><td>More program overhead</td></tr><tr><td>Close to the machine</td><td>Isolated from the machine</td></tr><tr><td>Good on short programs</td><td>Good on long programs</td></tr></table>` },
          { type: `written`, q: `b- Consider that BL=B3, BH=5A, SP=07FE, SS=300 and DS=100. Show by figure the memory state when executing the instruction PUSH BX. (8 marks)`, ans: `Memory location = SS×10 + SP = 3000 + 07FE = <b>37FE</b>.<br>SS:[SP-1] = [37FD] = <b>5A</b> (BH)<br>SS:[SP-2] = [37FC] = <b>B3</b> (BL)<br>SP = 07FE - 2 = <b>07FC</b>.<br>Figure: SS (300) ×10 and ESP (07FE) into the adder pointing to 37FE; BH and BL arrows into 37FD and 37FC; old SP crossed out and 07FC written. DS is not used.` },
          { type: `written`, q: `c- Consider DS=1000, DI=100, D=1, ES=200, input string = ABCD1234. Show the memory state when executing the instruction INSD. (8 marks)`, ans: `INS writes to ES:[DI]. Memory location = ES×10 + DI = 2000 + 100 = <b>2100</b>.<br>The input bytes AB, CD, 12, 34 are stored starting at 2100 (as drawn in the lecture).<br>D = 1 → DI = DI - 4: lecture/key writes <b>96</b>; in hex 100H - 4 = <b>0FCH</b>.<br>Figure: input device box "AB CD 12 34" with an arrow into memory at 2100; ES (200)×10 + EDI (100) into the adder; EDI 100 crossed out, new value written.` },
          { type: `written`, q: `d- Given that CS=2000, SS=1000, IP=300, DS=1200, calculate and draw the execution of near jump and far jump considering the figure (from the starting address up: JMP, 1C, 20, A0, 2D). (8 marks)`, ans: `Starting address = CS×10 = 20000.<br><b>Near jump</b> (3 bytes; bytes 2 and 3 = 201C): IP = 300 + 201C = 231C → jump address = 20000 + 231C = <b>2231C</b>.<br><b>Far jump</b> (5 bytes): offset = bytes 2,3 = 201C; segment = bytes 4,5 = 2DA0 → 2DA00 + 201C = <b>2FA1C</b>.<br>Draw the memory column with JMP at 20000 and the arrow to the jump address.` },
          { type: `written`, q: `e- Given that DS=2000H, SS=1100H, SP=200H, SI=300H, D=0, AX=C0B1, [SI]=CD, [SI+1]=AB, [SI+2]=34, [SI+3]=12. Also [SP]=E0, [SP+1]=F1 and [SP-1]=44. Calculate and show by two separate figures the address after executing sequentially: LSS AX, [SI] then POP AX. (10 marks)`, ans: `<b>1) LSS AX, [SI]</b>: address = DS×10 + SI = 20000 + 300 = <b>20300</b>.<br>AX ← [20301][20300] = <b>ABCD</b>; SS ← [20303][20302] = <b>1234</b>.<br><b>2) POP AX</b> uses the new SS: address = SS×10 + SP = 12340 + 200 = <b>12540</b>.<br>AL = [SP] = E0, AH = [SP+1] = F1 → <b>AX = F1E0</b> (ABCD is overwritten); SP = 200 + 2 = <b>202</b>.<br>[SP-1] = 44 is below the top of stack and is not read; D and the old AX are distractors.` }
        ]}
      ]
    },
    /* ───────────── FINAL 2023/24 SECOND TERM ───────────── */
    { title: `Final Exam 2023/2024 (Second term)`,
      meta: `Second term · 2 hours · 60 marks · 2 questions · CS203 · Dr. Lamiaa Hassaan, Dr. Ahmed Ibrahim`,
      note: `Transcribed from a scanned photo (2 pages, May 2024). A student wrote T/F letters next to some statements; they disagree with the lectures on T/F 7 (student T; LDS also changes DS so False) and T/F 10 (student T; MOV is not a string instruction so False). MCQ 7 uses [BX][BP], which a real 8086 cannot encode; the intended answer is SS. MCQ 10 expects SP = 98 although 100H - 2 = 0FEH in hex.`,
      sections: [
        { title: `Question One a · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `…… is high speed temporary storage area built into the CPU.`, o: [`A processor`, `ALU`, `A bus`, `A Register`], a: 3, why: `L1/L2.` },
          { type: `mcq`, q: `The O bit in the EFLAGS register refers to:`, o: [`overflow bit`, `overload bit`, `override segment bit`, `none of the mentioned`], a: 0, why: `OF = overflow flag (L2).` },
          { type: `mcq`, q: `POP operation:`, o: [`decrements SP`, `increments SP`, `decrements SS`, `increments SS`], a: 1, why: `POP increments SP (L5).` },
          { type: `mcq`, q: `The instruction MOV DS, ES:`, o: [`copies the contents of ES into DS`, `copies the contents of DS into ES`, `copies and deletes the contents of ES into DS`, `causes an error`], a: 3, why: `Segment-to-segment moves are not allowed (L3).` },
          { type: `mcq`, q: `The segment register of the instruction MOV BL, ES:[1234H] will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 0, why: `Segment override (L3).` },
          { type: `mcq`, q: `LODS instruction copies strings memory location ……. into AL, AX, EAX.`, o: [`ES:[SI]`, `ES:[DI]`, `DS:[SI]`, `DS:[DI]`], a: 2, why: `L7.` },
          { type: `mcq`, q: `The segment register of the instruction MOV [BX][BP], BX will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 2, why: `BP present → SS (L4). Strictly, BX+BP cannot be combined on an 8086.` },
          { type: `mcq`, q: `The LSS DX, [SI] copies ….. into DX and ……into ……….`, o: [`segment, [SI], SS`, `[SI], DS, SS`, `offset, segment, SS`, `offset, DS, SS`], a: 2, why: `LSS loads the offset into the register and the segment into SS (L6).` },
          { type: `mcq`, q: `……. contains the instruction most recently fetched.`, o: [`PC`, `MAR`, `IR`, `MBR`], a: 2, why: `L2.` },
          { type: `mcq`, q: `If SS=1300, SP=100, CX=CD01 then after executing the instruction PUSH CX the following is correct:`, o: [`SS = 1302`, `SP = 98`, `SS = 1298`, `SP = 102`], a: 1, why: `PUSH decreases SP by 2 and leaves SS (L5). Intended answer 98; in hex it would be 0FE.` }
        ]},
        { title: `Question One b · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `The statement MOV ES:SI, CX is correct.`, a: 1, why: `ES:SI is not a valid operand (L3).` },
          { type: `tf`, q: `The far jump is a six bytes instruction.`, a: 1, why: `Five bytes (L8).` },
          { type: `tf`, q: `LODSW affects the zero flag.`, a: 1, why: `LODS does not change flags (L7).` },
          { type: `tf`, q: `RAM is a form of semiconductor memory technology used for reading and writing data in any order.`, a: 0, why: `L1.` },
          { type: `tf`, q: `Registers IP and CS are modified after any JMP instruction (short, near or far).`, a: 1, why: `Only the far jump changes CS (L8).` },
          { type: `tf`, q: `The Z flag is set to 1 when an ALU operation results in a 0 output.`, a: 0, why: `L2.` },
          { type: `tf`, q: `LDS AX, [DI] will change the content of AX only.`, a: 1, why: `DS changes too (L6).`, key: `Student wrote T.` },
          { type: `tf`, q: `Assembly language is hardware dependent.`, a: 0, why: `L1.` },
          { type: `tf`, q: `SS is the segment register used to hold the segment of the stack.`, a: 0, why: `L2.` },
          { type: `tf`, q: `String manipulation instructions include LODS, MOV, and STOS.`, a: 1, why: `MOV is not a string instruction (L7).`, key: `Student wrote T.` }
        ]},
        { title: `Question Two (8 marks each)`, marks: `40 marks`, items: [
          { type: `written`, q: `a- What are user invisible registers? State and describe four of them.`, ans: `Control/status registers used to control the operation of the CPU; they cannot be referenced by the assembly programmer.<br><b>PC</b>: address of an instruction to be fetched. <b>IR</b>: instruction most recently fetched. <b>MAR</b>: address of a location in memory. <b>MBR</b>: word of data to be written to memory or the word most recently read.` },
          { type: `written`, q: `b- Suppose SS=1500H, DS=200H, SI=110H, BP=0111H and DI=10. Calculate (without drawing) the address accessed by: (i) MOV EBX, [DI-100H] (ii) MOV [BP+SI+50H], AX (iii) MOV AX, [SI+0AD]`, ans: `(i) DS×10 + DI - 100 = 2000 + 10 - 100 = <b>1F10</b> (DS segment).<br>(ii) BP → SS: 15000 + 111 + 110 + 50 = <b>15271</b>.<br>(iii) DS×10 + SI + AD = 2000 + 110 + AD = <b>21BD</b>.<br>(Note for (i): the offset 10 - 100 is negative; the course simply subtracts. A real 8086 would wrap the offset to FF10, giving 11F10.)` },
          { type: `written`, q: `c- Consider DS=1000, DI=100, D=1, ES=200, input string = ABCD1234. Show the memory state when executing INSD.`, ans: `Address = ES×10 + DI = 2000 + 100 = <b>2100</b>; bytes AB, CD, 12, 34 from the input device stored from 2100; DI = DI - 4 = <b>0FCH</b> (lecture writes 96). DS is not used.` },
          { type: `written`, q: `d- Given that CS=1000, SS=2000, IP=300, BP=1200, show the execution of short jump and near jump (bytes from the start: JMP, 04, 02, 30, A4).`, ans: `Starting address = 10000.<br>Short: IP = 300 + 04 = 304 → <b>10304</b>.<br>Near: IP = 300 + 0204 = 504 → <b>10504</b>.` },
          { type: `written`, q: `e- Given DS=1000H, BX=6F2AH, DI=1000H, draw a memory figure for LDS BX, [DI]. The four bytes starting at the calculated address are 7A, 12, 00, 30.`, ans: `Address = DS×10 + DI = 10000 + 1000 = <b>11000</b>.<br>[11000]=7A, [11001]=12 → <b>BX = 127A</b> (6F2A crossed out).<br>[11002]=00, [11003]=30 → <b>DS = 3000</b> (1000 crossed out).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2023/24 FIRST TERM ───────────── */
    { title: `Final Exam 2023/2024 (First term)`,
      meta: `First term · 2 hours · 60 marks · 2 questions · CS203 · Dr. Lamiaa Hassaan, Dr. Ahmed Ibrahim`,
      note: `Transcribed from a two-page scan plus a second photo of page 2 (identical). No key. MCQ 5 has two invalid options: MOV 100, [DI] (immediate destination, intended) and MOV [AX], SI (AX cannot be a pointer on the 8086). MCQ 8 expects SP = 98 (decimal subtraction; hex gives 0FE). Q2-b(ii) has no source operand; only the address is needed.`,
      sections: [
        { title: `Question One a · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `……. contains the instruction most recently fetched.`, o: [`PC`, `MAR`, `IR`, `MBR`], a: 2, why: `L2.` },
          { type: `mcq`, q: `Segment registers are ……`, o: [`16 bit user visible registers such as CS, DS`, `16 bit general purpose registers such as FLAGS`, `32 bit registers such as ECX, EDX`, `none`], a: 0, why: `L2.` },
          { type: `mcq`, q: `The instruction POPAD will pop ……… double words from the stack.`, o: [`32`, `8`, `16`, `4`], a: 1, why: `8 registers (32 bytes) (L5).` },
          { type: `mcq`, q: `The O bit in the EFLAGS register refers to:`, o: [`overflow bit`, `overload bit`, `override segment bit`, `none of the mentioned`], a: 0, why: `L2.` },
          { type: `mcq`, q: `The instruction that is not possible among the following is:`, o: [`MOV AX, [BX]`, `MOV AX, 5555H`, `MOV [AX], SI`, `MOV 100, [DI]`], a: 3, why: `An immediate value cannot be a destination (L3). MOV [AX], SI is also invalid on a 16-bit 8086.` },
          { type: `mcq`, q: `The register which keeps track of the status of the running environment:`, o: [`General purpose`, `Condition`, `Segment`, `Flags`], a: 3, why: `L2.` },
          { type: `mcq`, q: `The segment register of the instruction MOV [BX][BP], AX will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 2, why: `BP → SS (L4).` },
          { type: `mcq`, q: `If SS=1300, SP=100, CX=CD01 then after executing PUSH CX the following is correct:`, o: [`SS = 1302`, `SP = 98`, `SS = 1298`, `SP = 102`], a: 1, why: `SP - 2 (L5).` },
          { type: `mcq`, q: `An interrupt breaks the execution of instructions and diverts its execution to ……`, o: [`Interrupt service routine`, `Counter word register`, `Execution unit`, `control unit`], a: 0, why: `L8.` },
          { type: `mcq`, q: `The LSS DX, [SI] copies ….. into DX and ……into ……….`, o: [`segment, [SI], SS`, `[SI], DS, SS`, `offset, segment, SS`, `offset, DS, SS`], a: 2, why: `L6.` }
        ]},
        { title: `Question One b · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `Assembly language is hardware dependent.`, a: 0, why: `L1.` },
          { type: `tf`, q: `String instructions change the value of the direction flag D.`, a: 1, why: `They only use D (L7).` },
          { type: `tf`, q: `The address of the instruction PUSH EBX will be SP:[SS].`, a: 1, why: `It is SS:[SP] (L5).` },
          { type: `tf`, q: `The flag that acts as borrow flag in the subtraction with borrow instruction is the carry flag CF.`, a: 0, why: `SBB uses CF as borrow (Lab, L9).` },
          { type: `tf`, q: `String manipulation instructions include LODS, MOV, and STOS.`, a: 1, why: `MOV is not a string instruction (L7).` },
          { type: `tf`, q: `In PROM, data is written into the chip before being installed in the circuit, but it can only be written once.`, a: 0, why: `L1.` },
          { type: `tf`, q: `LDS AX, [DI] will change the content of AX only.`, a: 1, why: `DS too (L6).` },
          { type: `tf`, q: `The instruction MOV CS:[SI], 100 is incorrect.`, a: 1, why: `CS is only a segment override for the destination memory; CS itself is not changed, and overriding with CS is allowed (L3/L4). (An assembler would also need BYTE/WORD PTR.)` },
          { type: `tf`, q: `LODSW loads two bytes of a string from memory into AX.`, a: 0, why: `L7.` },
          { type: `tf`, q: `Registers IP and CS are modified after any JMP instruction (short, near or far).`, a: 1, why: `L8.` }
        ]},
        { title: `Question Two (8 marks each)`, marks: `40 marks`, items: [
          { type: `written`, q: `a- Draw a block diagram of a microcomputer. Also, describe types of busses.`, ans: `Diagram: CPU (registers; ALU, CU, clock), Memory Storage Unit, I/O Device #1, I/O Device #2 connected by the data bus (top), control bus (dashed) and address bus.<br>A bus is a group of parallel wires that transfer data from one part of the computer to another. <b>Data bus</b>: transfers instructions and data between CPU and memory. <b>Control bus</b>: uses binary signals to synchronize all devices attached to the system bus. <b>Address bus</b>: holds the addresses of instructions and data during CPU-memory transfers.` },
          { type: `written`, q: `b- Suppose SS=1500H, DS=200H, SI=110H, BP=0111H and DI=10H. Calculate (without drawing) the address of: (i) MOV EBX, [DI+100H] (ii) MOV [BP+SI-10H] (iii) MOV AX, [SI+0BC]`, ans: `(i) DS: 2000 + 10 + 100 = <b>2110</b><br>(ii) SS (BP): 15000 + 111 + 110 - 10 = <b>15211</b><br>(iii) DS: 2000 + 110 + BC = <b>21CC</b>` },
          { type: `written`, q: `c- Consider SP=1234H, SS=300H, DS=100H, [SP]=11H, [SP+1]=22H, [SP+2]=33H, [SP+3]=44H. Calculate and show by figure the memory state when executing POP EAX.`, ans: `Address = SS×10 + SP = 3000 + 1234 = <b>4234</b>.<br>Bytes 4234..4237 = 11, 22, 33, 44 → <b>EAX = 44332211</b>.<br>SP = 1234 + 4 = <b>1238</b>.` },
          { type: `written`, q: `d- Given CS=3000H, SS=2000H, IP=400H, DS=2200H, show the execution of near jump and far jump (bytes from the start: JMP, 10, 43, 1C, 20).`, ans: `Starting address = CS×10 = 30000.<br><b>Near</b>: IP = 400 + 4310 = 4710 → 30000 + 4710 = <b>34710</b>.<br><b>Far</b>: offset = 4310, segment = 201C → 201C0 + 4310 = <b>244D0</b>.` },
          { type: `written`, q: `e- Given DS=2000H, ES=1100H, DI=200H, SI=300H, D=0, AX=C0B1H, [SI]=CDH, [SI+1]=ABH, [SI+2]=34H, [SI+3]=12H. Also [DI]=E0H, [DI+1]=F1H, [DI-1]=44H. Calculate and show by two separate figures the address after executing sequentially: LES AX, [SI] then STOSW.`, ans: `<b>1) LES AX, [SI]</b>: address = DS×10 + SI = 20000 + 300 = <b>20300</b>; AX = <b>ABCD</b>, ES = <b>1234</b>.<br><b>2) STOSW</b> uses the new ES: address = ES×10 + DI = 12340 + 200 = <b>12540</b>. AX is stored: [12540] = CD (AL), [12541] = AB (AH), overwriting E0 and F1 (those values are only distractors, as are [DI-1] and the old AX). D = 0 → DI = 200 + 2 = <b>202</b>.` }
        ]}
      ]
    },
    /* ───────────── MIDTERM 2023/24 ───────────── */
    { title: `Midterm 2023/2024 (Forms A and B)`,
      meta: `First term · 1 hour · 20 marks · 3 questions · CS203 · official answer model`,
      note: `Transcribed from the official "Answers of Midterm Exam" PDF (underlined answers). All key answers agree with the lectures.`,
      sections: [
        { title: `Form A · Question 1 I · Choose`, marks: `5 marks`, items: [
          { type: `mcq`, q: `The segment register of the instruction MOV BX, 50[SI-10] will be:`, o: [`SS-10`, `DS*50`, `DS which contains 50`, `DS`], a: 3, why: `SI → DS (L4).` },
          { type: `mcq`, q: `Special purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EFLAGS`, `32 bit registers such as ECX, EDX`, `None`], a: 1, why: `EIP and EFLAGS (L2).` },
          { type: `mcq`, q: `The operands in MOV instruction, source and destination, cannot be:`, o: [`register, register`, `memory location, register`, `memory location, memory location`, `register, data`], a: 2, why: `L3.` },
          { type: `mcq`, q: `An assembler is:`, o: [`easy to run, good with small programs`, `difficult to run but good with small programs`, `easy to run, good with long programs`, `difficult to run, good with long programs`], a: 3, why: `L1.` },
          { type: `mcq`, q: `MBR is a …….. register.`, o: [`general purpose`, `user invisible`, `user visible`, `special purpose`], a: 1, why: `L2.` }
        ]},
        { title: `Form A · Question 1 II · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `You cannot use 1 byte (high or low bits) of ESP register; you can use either 16 or 32 bits.`, a: 0, why: `L2.` },
          { type: `tf`, q: `The statement MOV AX, [BP - 50] is incorrect.`, a: 1, why: `Legal (L4).` },
          { type: `tf`, q: `MOV SS, CS is an incorrect instruction.`, a: 0, why: `L3.` },
          { type: `tf`, q: `The segment registers include SS, CS, DS, ES, DI, and SI.`, a: 1, why: `L2.` },
          { type: `tf`, q: `Default segment can never be overridden.`, a: 1, why: `L3.` }
        ]},
        { title: `Form A · Questions 2 and 3`, marks: `9 marks`, items: [
          { type: `written`, q: `Q2: Differentiate between PROM and EPROM. (4 marks)`, ans: `PROM: data is written into the chip before it is installed in the circuit, only once, using a PROM programmer.<br>EPROM: data can be rewritten by removing the chip, erasing it with ultraviolet light through a transparent window, and reprogramming it in a PROM programmer; used for prototypes and small production runs.` },
          { type: `written`, q: `Q3: Given SS=10C0H, DS=20A0H, DI=2000H, BP=0100H. Calculate and show by figure the memory address accessed by MOV EAX, [DI]. (5 marks)`, ans: `Address = DS×10 + DI = 20A00 + 2000 = <b>22A00</b>. EAX gets the 4 bytes 22A00 to 22A03. SS and BP are not used.` }
        ]},
        { title: `Form B · Question 1 I · Choose`, marks: `5 marks`, items: [
          { type: `mcq`, q: `A debugger is:`, o: [`easy to run, good with small programs`, `difficult to run but good with small programs`, `easy to run and good with long programs`, `difficult to run and good with long programs`], a: 0, why: `L1.` },
          { type: `mcq`, q: `PC is a ……….. register.`, o: [`general purpose`, `user visible`, `user invisible`, `special purpose`], a: 2, why: `L2.` },
          { type: `mcq`, q: `The operands in MOV instruction cannot be:`, o: [`DS, ES`, `AX, CS`, `EAX, ESP`, `BX, DX`], a: 0, why: `Segment to segment (L3).` },
          { type: `mcq`, q: `The segment register of the instruction MOV 30[BP], BX will be:`, o: [`ES`, `SS`, `DS`, `the instruction is incorrect`], a: 1, why: `BP → SS (L4).` },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EAX, EBX`, `32 bit registers such as EFLAGS`, `None`], a: 1, why: `L2.` }
        ]},
        { title: `Form B · Question 1 II · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `The statement MOV AX, [BP - 2] is correct.`, a: 0, why: `L4.` },
          { type: `tf`, q: `The user visible registers include SS, CS, DS, ES, DI, and SI only.`, a: 1, why: `They also include EAX, EBX, etc. and EIP, EFLAGS (L2).` },
          { type: `tf`, q: `You can use 1 byte (high or low bits) of ESI register by using SH, SL.`, a: 1, why: `L2.` },
          { type: `tf`, q: `A default segment can be overridden.`, a: 0, why: `L3.` },
          { type: `tf`, q: `MOV [AX], [150H] is a correct instruction.`, a: 1, why: `Memory to memory (L3).` }
        ]},
        { title: `Form B · Questions 2 and 3`, marks: `9 marks`, items: [
          { type: `written`, q: `Q2: Differentiate between EPROM and EEPROM. (4 marks)`, ans: `EPROM: erased by removing the chip and exposing it to UV light (transparent window), reprogrammed with a PROM programmer; for prototypes and small runs.<br>EEPROM: rewritten electrically while the chip is on the circuit board, but writing is slow; holds firmware such as the BIOS so it can be updated.` },
          { type: `written`, q: `Q3: Given SS=10D0H, DS=21B0H, DI=1000H, BP=0100H. Calculate and show by figure the address accessed by MOV BX, [DI]. (5 marks)`, ans: `Address = DS×10 + DI = 21B00 + 1000 = <b>22B00</b>; BX gets the word at 22B00 (BL) and 22B01 (BH).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2022/23 SUMMER ───────────── */
    { title: `Final Exam 2022/2023 (Summer term)`,
      meta: `Summer term · 2 hours · 60 marks · 2 questions · Dr. Lamiaa Hassaan, Dr. Ahmed Ibrahim`,
      note: `Transcribed from a phone scan of a graded student paper (marks and ticks visible). The student's answers disagree with the lectures on MCQ 4 (student d), MCQ 6 (student a) and T/F 3 (student True). Q1-d gives [SP], [SP-1], [SP-2] but not [SP+1], so AH cannot be determined; see the answer. MCQ 9 (PUSHA) has no exactly correct option. T/F 5 is ambiguous; our answer is marked as doubtful.`,
      sections: [
        { title: `Question One`, marks: `40 marks`, items: [
          { type: `written`, q: `a- Compare between a debugger and an assembler. (6 marks)`, ans: `Debugger: easy to run, low overhead programs, close to the machine, good on short programs. Assembler: hard to run, more program overhead, isolated from the machine, good on long programs.` },
          { type: `written`, q: `b- Suppose SS=1000H, DS=2000H, SI=1100H, BP=0111H and DI=100H. Calculate and show by figure the address accessed by: (i) MOV AL, [BP+SI-80H] (ii) MOV AX, 100[DI] (6 marks)`, ans: `(i) BP → SS: 10000 + 111 + 1100 - 80 = <b>11191</b>; AL gets the byte at 11191.<br>(ii) DS: 20000 + 100 + 100 = <b>20200</b>; AX gets the word at 20200 (AL) and 20201 (AH).` },
          { type: `written`, q: `d- Given DS=2000H, SS=1100H, SP=200H, SI=300H, AX=1A03, EBX=AABBCCDD, [SP]=9C, [SP-1]=EF, [SP-2]=CE and D=0, calculate and show by figure the address after executing POP AX. (8 marks)`, ans: `Address = SS×10 + SP = 11000 + 200 = <b>11200</b>.<br>POP AX copies 2 bytes from the top of the stack: AL = [SP] = <b>9C</b>, AH = [SP+1] (the byte at 11201, not given in the question). SP = 200 + 2 = <b>202</b>.<br>[SP-1] and [SP-2] lie below the top of the stack and are not read; DS, SI, EBX, D and the old AX are distractors.` },
          { type: `written`, q: `e- Consider DS=1000, DI=100, D=1, ES=200, input string = ABCD1234. Show the memory state when executing INSD. (8 marks)`, ans: `Address = ES×10 + DI = 2000 + 100 = <b>2100</b>; AB, CD, 12, 34 stored from 2100; DI = 0FCH (slide: 96).` },
          { type: `written`, q: `f- Given DS=1000H, BX=6F2AH, DI=1000H, draw a memory figure for LDS BX, [DI]. The four bytes are 7A, 12, 00 and 30. (8 marks)`, ans: `Address = 10000 + 1000 = <b>11000</b>; BX = <b>127A</b>; DS = <b>3000</b>.` },
          { type: `written`, q: `g- Find the errors in: MOV AX, 5 / LDS AX, [DI] / MOV DS, CS / MOV AL, SL / STOSD / MOV ECX, AX. (4 marks)`, ans: `MOV AX, 5: correct.<br>LDS AX, [DI]: correct.<br><b>MOV DS, CS</b>: error, segment-to-segment move is not allowed.<br><b>MOV AL, SL</b>: error, there is no SL register (SI has no 8-bit halves).<br>STOSD: correct (stores EAX at ES:[DI]).<br><b>MOV ECX, AX</b>: error, operands of different sizes (32 and 16 bits).` }
        ]},
        { title: `Question Two Part 1 · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `A chip on which data can be rewritten electrically while the chip is on the circuit board, but the writing process is slow:`, o: [`EROM`, `PROM`, `EEPROM`, `none of the mentioned`], a: 2, why: `L1.` },
          { type: `mcq`, q: `……… contains the address of a location in memory.`, o: [`PC`, `MBR`, `IR`, `MAR`], a: 3, why: `L2.` },
          { type: `mcq`, q: `The C bit in the EFLAGS register refers to:`, o: [`carry bit`, `control bit`, `code segment bit`, `none of the mentioned`], a: 0, why: `L2.` },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EBX and EDX`, `16 bit registers such as ES, BX`, `32 bit registers such as EIP, EFLAGS`], a: 1, why: `EBX and EDX are general purpose; EIP and EFLAGS are special purpose (L2).`, key: `Student chose d.` },
          { type: `mcq`, q: `Which of the following instructions causes errors?`, o: [`MOV CS, AX`, `MOV EAX, EBP`, `MOV CX, [SI]`, `POP AX`], a: 0, why: `CS cannot be changed by MOV (L3).` },
          { type: `mcq`, q: `If SS=1400, SP=160, BX=CD01 then after executing POP AX the following is correct:`, o: [`SS = 1402`, `SP = 158`, `SS = 1398`, `SP = 162`], a: 3, why: `POP increments SP by 2 (L5).`, key: `Student chose a.` },
          { type: `mcq`, q: `LODS instruction copies strings memory location ……. into AL, AX, EAX.`, o: [`ES:[SI]`, `ES:[DI]`, `DS:[SI]`, `DS:[DI]`], a: 2, why: `L7.` },
          { type: `mcq`, q: `The instruction MOV [DI], [SI]:`, o: [`copies the contents of SI into DI`, `copies the contents of DI into SI`, `copies and deletes the contents of SI into DI`, `causes an error`], a: 3, why: `Memory to memory (L3).` },
          { type: `mcq`, q: `The instruction PUSHA:`, o: [`increments SP by 32 words`, `increments SP by 16 byte`, `decrements SP by 32 words`, `decrements SP by 32 bytes`], a: 3, why: `Best available option. PUSHA actually decrements SP by 16 bytes (8 words); 32 bytes is PUSHAD (L5).` },
          { type: `mcq`, q: `After running the instruction OUTSD with D=1:`, o: [`DI = DI-2`, `SI = SI-2`, `SI = SI-4`, `DI = DI+2`], a: 2, why: `OUTS uses SI; double word = 4 (L7).` }
        ]},
        { title: `Question Two Part 2 · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `The Z bit of the EFLAGS register is set to zero if a calculation result = zero.`, a: 1, why: `ZF is set to 1 for a zero result (L2).` },
          { type: `tf`, q: `LES AX, [DI] copies [DI] and [DI+1] into AX and [DI+2] and [DI+3] into ES.`, a: 0, why: `L6.` },
          { type: `tf`, q: `The Program Counter (PC) is used to save the number of executed instructions.`, a: 1, why: `PC holds the address of the next instruction (L2).`, key: `Student wrote T.` },
          { type: `tf`, q: `The segment registers include SS, CS, DS, ES, DI and SI.`, a: 1, why: `L2.` },
          { type: `tf`, q: `In short and far jumps, IP is modified before executing the jump instruction.`, a: 1, why: `IP receives the new value as the result of executing the jump (L8). Doubtful item: the statement is ambiguous.`, key: `Student wrote T.` },
          { type: `tf`, q: `The statement MOV AX, DS:[BP-2] is incorrect.`, a: 1, why: `Segment override of BP's default SS with DS is allowed (L4).` },
          { type: `tf`, q: `The fourth and fifth bytes of the near jump define the segment of the jump address.`, a: 1, why: `That is the far jump; near jumps are 3 bytes (L8).` },
          { type: `tf`, q: `LCS instructions loads any 16-bit or 32-bit register with an offset address, and the SS with a segment address.`, a: 1, why: `There is no LCS; the description is of LSS (L6).` },
          { type: `tf`, q: `Assembly language is machine dependent.`, a: 0, why: `L1.` },
          { type: `tf`, q: `LDS AX, [DI] will change the content of DS.`, a: 0, why: `L6.` }
        ]}
      ]
    },
    /* ───────────── MIDTERM 2022/23 SUMMER ───────────── */
    { title: `Midterm 2022/2023 (Summer term, Forms A and B)`,
      meta: `Summer term · 1 hour · 20 marks · 4 questions · CS307 · official answer model`,
      note: `Transcribed from the official answer PDF (underlined answers). Key errors: Form A Q1 defines MAR with the MBR definition (correct: MAR contains the address of a location in memory). Form B MCQ 2 underlines both "EAX, EBX" and "EFLAGS" (only EAX, EBX is right). Form B MCQ 5 underlines "Electrically programmable read only memory" for EPROM; EPROM is Erasable PROM, so the right choice is "None of the mentioned".`,
      sections: [
        { title: `Form A · Written`, marks: `10 marks`, items: [
          { type: `written`, q: `1- Draw a block diagram of a microcomputer, and describe the functions of the registers IR and MAR. (4 marks)`, ans: `Diagram: CPU (registers, ALU, CU, clock), memory storage unit, two I/O devices, joined by data, control and address buses.<br><b>IR</b>: contains the instruction most recently fetched.<br><b>MAR</b>: contains the address of a location in memory. (The official key wrongly copied the MBR definition here.)` },
          { type: `written`, q: `2- Given SS=10C0H, DS=20A0H, DI=3000H, BP=0100H. Calculate and show by figure the memory address accessed by MOV EAX, [DI]. (6 marks)`, ans: `Address = DS×10 + DI = 20A00 + 3000 = <b>23A00</b>.` }
        ]},
        { title: `Form A · Choose`, marks: `5 marks`, items: [
          { type: `mcq`, q: `An assembler is:`, o: [`easy to run and good with small programs`, `difficult to run but good with small programs`, `easy to run and good with long programs`, `difficult to run and good with long programs`], a: 3, why: `L1.` },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EFLAGS`, `32 bit registers such as ECX, EDX`, `None`], a: 2, why: `L2.` },
          { type: `mcq`, q: `The operands in MOV instruction cannot be:`, o: [`register, register`, `memory location, memory location`, `memory location, register`, `immediate data, register`], a: 1, why: `L3.` },
          { type: `mcq`, q: `The segment register of the instruction MOV BX, 50[BP] will be:`, o: [`SS`, `CS`, `DS which contains 50`, `ES`], a: 0, why: `L4.` },
          { type: `mcq`, q: `PROM stands for:`, o: [`programmable read only memory`, `programmable read write memory`, `portable read only memory`, `None of the mentioned`], a: 0, why: `L1.` }
        ]},
        { title: `Form A · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `You cannot use 1 byte (high or low bits) of ESP register, you can use either 16 or 32 bits.`, a: 0, why: `L2.` },
          { type: `tf`, q: `The segment registers include SS, CS, DS, ES, DI, and SI.`, a: 1, why: `L2.` },
          { type: `tf`, q: `Default segment cannot be overridden at all.`, a: 1, why: `L3.` },
          { type: `tf`, q: `The statement MOV AX, [BP - 2] is incorrect.`, a: 1, why: `L4.` },
          { type: `tf`, q: `MOV SS, CS is an incorrect instruction.`, a: 0, why: `L3.` }
        ]},
        { title: `Form B · Written`, marks: `12 marks`, items: [
          { type: `written`, q: `1- Draw a block diagram of a microcomputer, and describe the functions of PC and MBR. (6 marks)`, ans: `Diagram as in Lecture 1.<br><b>PC</b>: contains the address of an instruction to be fetched.<br><b>MBR</b>: contains a word of data to be written to memory or the word most recently read.` },
          { type: `written`, q: `2- Given SS=10D0H, DS=21B0H, DI=2000H, BP=0100H. Calculate and show by figure the memory address accessed by MOV BX, [DI]. (6 marks)`, ans: `Address = DS×10 + DI = 21B00 + 2000 = <b>23B00</b>.` }
        ]},
        { title: `Form B · Choose`, marks: `5 marks`, items: [
          { type: `mcq`, q: `A debugger is:`, o: [`easy to run and good with small programs`, `difficult to run but good with small programs`, `easy to run and good with long programs`, `difficult to run and good with long programs`], a: 0, why: `L1.` },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EAX, EBX`, `32 bit registers such as EFLAGS`, `None`], a: 1, why: `EFLAGS is special purpose (L2).`, key: `The key underlined both b and c.` },
          { type: `mcq`, q: `The operands in MOV instruction cannot be:`, o: [`DS, ES`, `AX, CS`, `EAX, ESP`, `BX, DX`], a: 0, why: `L3.` },
          { type: `mcq`, q: `The segment register of the instruction MOV 30[BP], BX will be:`, o: [`ES`, `CS`, `SS`, `DS which contains 30`], a: 2, why: `L4.` },
          { type: `mcq`, q: `EPROM stands for:`, o: [`Electrically programmable read only memory`, `Erasable programmable read write memory`, `Erasable portable read only memory`, `None of the mentioned`], a: 3, why: `EPROM = Erasable Programmable Read Only Memory; no option matches exactly (L1).`, key: `The key underlined a (Electrically programmable read only memory).` }
        ]},
        { title: `Form B · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `The statement MOV AX, [BP - 2] is correct.`, a: 0, why: `L4.` },
          { type: `tf`, q: `The user visible registers include SS, CS, DS, ES, DI, and SI only.`, a: 1, why: `L2.` },
          { type: `tf`, q: `A default segment can be overridden by writing the required segment before the offset.`, a: 0, why: `L3.` },
          { type: `tf`, q: `You can use 1 byte (high or low bits) of ESI register by using SH, SL.`, a: 1, why: `L2.` },
          { type: `tf`, q: `MOV [AX], [150H] is a correct instruction.`, a: 1, why: `L3.` }
        ]}
      ]
    },
    /* ───────────── REVISION SHEET + SHEET 1 WRITTEN ───────────── */
    { title: `Revision Sheet 2023/24 and Sheet 1: written problems`,
      meta: `Dr. Lamiaa Hassaan's revision sheet (the summer sheet 2022/23 repeats it) and Sheet 1 · practice, not an exam`,
      note: `The 92 MCQs and 28 T/F of the revision sheet are in the lecture quizzes (src "Revision sheet"). Student answer key by Ehab Alaa: it agrees with the lectures, except that its INSD figure keeps the slide's DI = 96 (hex: 0FC) and its POP EAX uses [SP]..[SP+3] while the lecture slide used [SP+1]..[SP+4].`,
      sections: [
        { title: `Revision sheet written problems`, marks: `practice`, items: [
          { type: `written`, q: `1- Compare between a debugger and an assembler.`, ans: `Debugger: easy to run, low overhead, close to the machine, good on short programs. Assembler: hard to run, more overhead, isolated from the machine, good on long programs.` },
          { type: `written`, q: `2- What is a bus? Describe the types of buses.`, ans: `A group of parallel wires transferring data between parts of the computer. Data bus: instructions and data between CPU and memory. Control bus: binary signals synchronizing all devices on the system bus. Address bus: addresses of instructions and data.` },
          { type: `written`, q: `4- What are user invisible registers? State four of them.`, ans: `Registers that cannot be written by the assembly programmer: PC (address of the instruction to be fetched), IR (instruction most recently fetched), MAR (address of a memory location), MBR (word to be written to memory or most recently read).` },
          { type: `written`, q: `5/6- DS=1000, ES=1400, DI=150, BX=CD01. Show the memory state for MOV AL, 100[BX][DI] and MOV AL, [BX][DI].`, ans: `100[BX][DI]: 10000 + 100 + CD01 + 150 = <b>1CF51</b>.<br>[BX][DI]: 10000 + CD01 + 150 = <b>1CE51</b>.` },
          { type: `written`, q: `7- SP=1234, SS=300, DS=100, [SP]=11, [SP+1]=22, [SP+2]=33, [SP+3]=44. Show POP EAX.`, ans: `Address 3000 + 1234 = <b>4234</b>; EAX = <b>44332211</b>; SP = <b>1238</b>.` },
          { type: `written`, q: `8- DS=A000H, SS=2100H, BX=2C2AH, SI=320H, ES=200H, DI=200H. Draw LES BX, [DI] with bytes B2, 1A, 00, 3C.`, ans: `Address A0000 + 200 = <b>A0200</b>; BX = <b>1AB2</b>; ES = <b>3C00</b>.` },
          { type: `written`, q: `9- DS=1000, SI=1000, D=0, SS=200, [SI]=AB, [SI+1]=CD, [SI-1]=00. Show LODSW.`, ans: `Address 10000 + 1000 = <b>11000</b>; AX = <b>CDAB</b>; SI = <b>1002</b>.` },
          { type: `written`, q: `10- DS=1000, DI=100, D=1, ES=200, input string ABCD1234. Show INSD.`, ans: `Address 2000 + 100 = <b>2100</b>; bytes AB CD 12 34 stored from 2100; DI = 100H - 4 = <b>0FCH</b> (key: 96).` },
          { type: `written`, q: `11- DS=1000H, BX=6F2AH, DI=1000H. Draw LDS BX, [DI] with bytes 7A, 12, 00, 30.`, ans: `Address <b>11000</b>; BX = <b>127A</b>; DS = <b>3000</b>.` },
          { type: `written`, q: `12- CS=1000, SS=2000, IP=300, BP=1200; bytes JMP, 04, 02, 30, A4. Short, near and far jump.`, ans: `Short: 10000 + 300 + 04 = <b>10304</b>. Near: 10000 + 300 + 0204 = <b>10504</b>. Far: A4300 + 0204 = <b>A4504</b>.` },
          { type: `written`, q: `13- CS=2000, SS=1000, IP=300, DS=1200; bytes JMP, 1C, 20, A0, 2D. Short, near and far jump.`, ans: `Short: <b>2031C</b>. Near: <b>2231C</b>. Far: 2DA00 + 201C = <b>2FA1C</b>.` },
          { type: `written`, q: `14- SS=2000H, DS=2200H, SI=1200H, BP=0101H. (i) MOV EAX, [BP+120H] (ii) MOV BL, [BP+SI-100H] (iii) MOV CX, [SI+0BC]`, ans: `(i) 20000 + 101 + 120 = <b>20221</b> (ii) 20000 + 101 + 1200 - 100 = <b>21201</b> (iii) 22000 + 1200 + BC = <b>232BC</b>.` }
        ]},
        { title: `Sheet 1`, marks: `practice`, items: [
          { type: `written`, q: `1- Define: register; bus and its types; user visible registers; EIP, EFLAGS; functions of Z, C, S, O; the four user invisible registers; segment overriding.`, ans: `Register: high speed temporary storage area built into a CPU. Bus: parallel wires (data, control, address). User visible: registers referenced by the machine language, used to minimize memory references. EIP: address of the next instruction. EFLAGS: bits that control the CPU or reflect results. ZF: result is zero; CF: unsigned result too large; SF: result negative; OF: result too large or too small for the destination. PC, IR, MAR, MBR as in Lecture 2. Segment overriding: using a segment other than the default, e.g. MOV BL, ES:[1234H].` },
          { type: `written`, q: `3- DS=1100H, BX=0200H, SI=0500H: a) MOV 120[SI], EDX b) MOV CL, 100[BX+SI] c) MOV CH, [BX+SI]`, ans: `a) <b>11620</b> b) <b>11800</b> c) <b>11700</b>.` },
          { type: `written`, q: `4- DS=1300H, SS=1400H, BP=1500H, SI=0100H: a) MOV EAX, [BP+200H] b) MOV AL, [BP+SI-200H] c) MOV AL, [SI][BP]`, ans: `All SS: a) <b>15700</b> b) <b>15400</b> c) <b>15600</b>.` },
          { type: `written`, q: `5- Show PUSH EAX with EAX=ABCD, SP=0100H, SS=0200H; where are AH and AL stored?`, ans: `Address 2000 + 0100 = 2100. [20FF]=00, [20FE]=00, <b>[20FD]=AB (AH)</b>, <b>[20FC]=CD (AL)</b>; SP = <b>00FC</b>.` },
          { type: `written`, q: `Solved sheet extra: find the errors in MOV AX, 100 / MOV EBX, AX / MOV AX, DS / MOV CS, DS.`, ans: `MOV EBX, AX: size mismatch. MOV CS, DS: cannot change CS (and segment to segment). The other two are correct.` }
        ]}
      ]
    }
  ]
};
