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
          [`System software`, `System software (programs that let the hardware run properly) is only one of the three categories; application and programming software are also software, so "All" is the answer.`],
          [`Application software`, `Application software (programs that let users do tasks) is only one of the three categories; system and programming software are software too.`],
          [`Programming software`, `Programming software (tools for building software) is only one of the three categories; system and application software are also listed in the lecture.`],
          [`All of the mentioned`, `Correct. Software falls into system, programming and application software.`]
        ], a: 3, src: `Revision sheet` },
        { q: `Programming languages of a microcomputer are:`, o: [
          [`Machine language`, `Machine language (0s and 1s) is only one of the three categories; assembly and high-level languages are also microcomputer languages.`],
          [`Assembly language`, `Assembly language (low level, one step from machine code) is only one of the three categories; machine and high-level languages are the other two.`],
          [`High level languages`, `High-level languages (machine independent, e.g. C, Java) are only one category; the lecture also lists machine and assembly language.`],
          [`All of the mentioned`, `Correct. Machine, assembly and high-level languages.`]
        ], a: 3, src: `Revision sheet` },
        { q: `A debugger is:`, o: [
          [`Easy to run and good with small programs`, `Correct. Debugger: easy to run, low overhead, close to the machine, good on short programs.`],
          [`Difficult to run but good with small programs`, `A debugger is EASY to run, not difficult. "Hard to run" is the assembler's column in the lecture table, while "good on short programs" is right.`],
          [`Easy to run and good with long programs`, `"Good on long programs" belongs to the assembler; the debugger is good on SHORT programs (L1, Debugger vs. Assembler).`],
          [`Difficult to run and good with long programs`, `Hard to run and good on long programs is the assembler's row of the table; the debugger is the opposite: easy to run, good on short programs.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `An assembler is:`, o: [
          [`Easy to run and good with small programs`, `Easy to run and good on small programs describes the debugger; the assembler is hard to run and good on long programs.`],
          [`Difficult to run but good with small programs`, `"Difficult to run" fits the assembler, but it is good on LONG programs; short programs are the debugger's strength.`],
          [`Easy to run and good with long programs`, `The assembler is good with long programs, but it is HARD to run (with more program overhead); "easy to run" is the debugger.`],
          [`Difficult to run and good with long programs`, `Correct. Hard to run, more overhead, isolated from the machine, good on long programs.`]
        ], a: 3, src: `Midterm 2023/24` },
        { q: `………. is a form of semiconductor memory where the data is written once and then not changed; it is stored permanently even when the power is removed.`, o: [
          [`RAM`, `RAM is read/write in any order and loses data without power.`],
          [`ROM`, `Correct. That is the lecture definition of ROM.`],
          [`CPU`, `The CPU is the processor where calculations and logic happen, not a type of semiconductor memory. The "written once, kept without power" memory is ROM.`],
          [`None`, `Not "None": the wording is exactly the lecture's definition of ROM, written once, never changed, kept when power is removed.`]
        ], a: 1, src: `Revision sheet` },
        { q: `……… uses binary signals to synchronize the actions of all devices attached to the system bus.`, o: [
          [`Data bus`, `The data bus transfers instructions and data between the CPU and memory; it does not synchronize devices. Synchronizing with binary signals is the control bus.`],
          [`Control bus`, `Correct. Lecture definition of the control bus.`],
          [`Address bus`, `The address bus holds the addresses of instructions and data during CPU-memory transfers; synchronizing devices with binary signals is the control bus's job.`],
          [`None of the mentioned`, `Not "None": the lecture defines the control bus as the bus that uses binary signals to synchronize all devices on the system bus.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `……. is a form of semiconductor memory where data can be rewritten by removing the chip from the circuit board and exposing it to ultraviolet light.`, o: [
          [`EPROM`, `Correct. EPROM is erased with UV light through its window.`],
          [`ROM`, `ROM is written once and never changed, so it cannot be erased and rewritten at all. Erasing with UV light after removing the chip is EPROM.`],
          [`PROM`, `PROM is written once with a PROM programmer and cannot be erased. Only EPROM is erased by UV light through its transparent window.`],
          [`RAM`, `RAM is rewritten electrically in normal operation.`]
        ], a: 0, src: `Revision sheet` },
        { q: `A chip on which data can be rewritten electrically while the chip is on the circuit board, but the writing process is slow:`, o: [
          [`EROM`, `"EROM" is not one of the lecture's memory types (RAM, ROM, PROM, EPROM, EEPROM). Electrical rewriting on the board with slow writing is EEPROM.`],
          [`PROM`, `PROM can be written only once, before installation, so it cannot be rewritten on the board. That description is EEPROM.`],
          [`EEPROM`, `Correct. Electrically erasable, on the board, slow writing.`],
          [`None of the mentioned`, `Not "None": rewritten electrically on the board, with a slow writing process, is the lecture's exact definition of EEPROM.`]
        ], a: 2, src: `Exam 2022/23 Summer` },
        { q: `PROM stands for:`, o: [
          [`Programmable read only memory`, `Correct. PROM = Programmable Read Only Memory: written once, before installation, with a PROM programmer (L1, Types of memory).`],
          [`Programmable read write memory`, `PROM is read ONLY memory once programmed; it is not read/write. Reading and writing in any order describes RAM.`],
          [`Portable read only memory`, `The P stands for Programmable (it is programmed with a PROM programmer), not Portable.`],
          [`None of the mentioned`, `Not "None": option a, Programmable Read Only Memory, is the exact expansion of PROM.`]
        ], a: 0, src: `Midterm 2022/23` },
        { q: `EPROM stands for (midterm form B options):`, o: [
          [`Electrically programmable read only memory`, `E stands for Erasable (EEPROM is the electrically erasable one). The 2022/23 key underlined this option, but it is wrong.`],
          [`Erasable programmable read write memory`, `EPROM is read ONLY memory, so "read write" is wrong; the exact expansion (Erasable Programmable Read Only Memory) is not listed, hence "None".`],
          [`Erasable portable read only memory`, `The P stands for Programmable, not Portable, so this expansion is wrong; the correct one is not among the options.`],
          [`None of the mentioned`, `Correct. EPROM = Erasable Programmable Read Only Memory, which is not listed exactly.`]
        ], a: 3, src: `Midterm 2022/23` },
        { q: `EPROM stands for:`, o: [
          [`Erasable programmable read only memory`, `Correct. EPROM = Erasable Programmable Read Only Memory: erased by UV light after removing the chip, then reprogrammed (L1, Types of memory).`],
          [`Electrically programmable read write memory`, `Two errors: the E is Erasable (not Electrically) and the chip is read ONLY memory, not read/write.`],
          [`Electrically programmable read only memory`, `The E in EPROM stands for Erasable (by UV light). "Electrically" belongs to EEPROM, Electrically Erasable PROM.`],
          [`None`, `Not "None": option a, Erasable Programmable Read Only Memory, is the exact expansion.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The coded object modules of the program to be assembled are present in:`, o: [
          [`.ASM file`, `The .ASM file holds the assembly source code written by the programmer; the assembler turns it into the object modules stored in the .OBJ file.`],
          [`.OBJ file`, `Correct. The assembler produces object code in the .OBJ file.`],
          [`.EXE file`, `The .EXE is the final executable produced by the linker from the .OBJ modules, not the coded object modules themselves.`],
          [`.OBJECT file`, `There is no standard ".OBJECT" extension; object code produced by the assembler is stored in the .OBJ file.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The advantages of assembly level programming are:`, o: [
          [`Flexibility of programming is more`, `More flexibility is one of the advantages in the revision key, but it is not the only one, so the full answer is "All of the mentioned".`],
          [`Chances of error are less`, `Fewer chances of error is listed in the revision key, but together with flexibility and easy debugging, so "All" is the answer.`],
          [`Debugging is easy`, `Easy debugging is listed in the revision key, but together with flexibility and fewer errors, so the answer is "All of the mentioned".`],
          [`All of the mentioned`, `Correct. The revision sheet key lists all three as advantages of assembly programming: more flexibility, fewer chances of error and easy debugging.`]
        ], a: 3, src: `Revision sheet` },
        { q: `The extension that is essential for every assembly level program is:`, o: [
          [`.ASP`, `.ASP is a web (Active Server Pages) extension, not an assembly file. Every assembly program is saved as .ASM.`],
          [`.ALP`, `.ALP is not the extension used by assemblers such as emu8086 or MASM; assembly source files are saved as .ASM.`],
          [`.ASM`, `Correct. Every assembly source program is saved with the .ASM extension; the assembler turns it into .OBJ and the linker into .EXE (L1, Assembly language and the assembler).`],
          [`.PGM`, `.PGM is not an assembly extension; the essential extension for an assembly source program is .ASM.`]
        ], a: 2, src: `Revision sheet` },
        { q: `……… enables the programmer to run the program step by step to find the exact location of an error.`, o: [
          [`Compiler`, `A compiler translates source code into an executable program; it does not run the program step by step to locate errors.`],
          [`Editor`, `An editor is only used to write and change the source code; stepping through the program to find an error is the debugger's job.`],
          [`Debugger`, `Correct. A debugger lets the programmer run the program step by step to find the exact location of an error, like single step in emu8086 (L1, Assembly language and the assembler).`],
          [`None`, `Not "None": running a program step by step to find an error is exactly what a debugger does.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The control bus uses ……… to synchronize the actions of all devices attached to the system bus.`, o: [
          [`Binary signals`, `Correct. The lecture defines the control bus as using binary signals to synchronize the actions of all devices attached to the system bus (L1, Buses).`],
          [`Continuous signals`, `Buses carry digital on/off values; the lecture says the control bus uses BINARY signals, not continuous (analog) ones.`],
          [`a and b`, `Only binary signals are used; continuous signals are not part of the control bus definition, so "a and b" is wrong.`],
          [`None`, `Not "None": the lecture definition says the control bus uses binary signals.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Each memory location has:`, o: [
          [`An address`, `An address alone is incomplete: every memory location also has contents (the value stored there), so the answer is "a and b".`],
          [`Contents`, `Contents alone is incomplete: each location is also identified by its address, so the answer is "a and b".`],
          [`a and b`, `Correct. Every location has an address and contents.`],
          [`None`, `Not "None": every memory location has both an address and contents.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The set of parallel electrical conducting lines connecting the components of the motherboard is called:`, o: [
          [`Conductors`, `"Conductors" is just a general word for anything that carries current; the lecture's name for a group of parallel wires between components is a bus.`],
          [`Connectors`, `Connectors are the plugs and sockets that join parts, not the parallel conducting lines themselves, which are the buses.`],
          [`Busses`, `Correct. A bus is a group of parallel wires that transfer data from one part of the computer to another: data, address and control buses (L1, Buses).`],
          [`Consecutives`, `"Consecutives" is not a hardware term; the parallel lines connecting motherboard components are called buses.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Assembler is a type of translator that translates …… language into machine level language.`, o: [
          [`High level`, `Translating high-level language into machine code is done by a compiler; the assembler translates assembly (low-level) source code.`],
          [`Assembly level`, `Correct. The assembler translates a program written in low-level assembly language (source code) into executable machine code (object code) (L1, Assembly language and the assembler).`],
          [`Both A and B`, `The assembler handles only assembly language; high-level languages need a compiler, so "Both" is wrong.`],
          [`None of the above`, `Not "None": the assembler translates assembly-level language into machine language.`]
        ], a: 1, src: `Revision sheet` },
        { q: `System software is suited for specific applications.`, o: [
          [`True`, `Application software serves specific tasks; system software lets the hardware run.`],
          [`False`, `Correct. System software allows the hardware to run properly.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Machine language can be directly understood and executed by a machine, and it is the language of 0s and 1s.`, o: [
          [`True`, `Correct. Machine language is the native language of computers, a string of 0s and 1s, directly understood and executed by the machine (L1, Programming languages).`],
          [`False`, `The statement is true: the lecture defines machine language as the native language of the computer, made of 0s and 1s and run directly.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The clock input provides the basic timing for processor operation and bus control activity.`, o: [
          [`True`, `Correct. The clock synchronizes CPU operations with other components.`],
          [`False`, `The statement is true: the clock provides the basic timing and synchronizes the CPU's internal operations with the other system components.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Random Access Memory is a form of semiconductor memory technology used for reading and writing data in any order.`, o: [
          [`True`, `Correct. RAM is semiconductor memory used for reading and writing data in any order, as required by the processor (L1, Types of memory).`],
          [`False`, `The statement is true: it is word for word the lecture's definition of RAM, read and write in any order.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `In EEPROM, data can be rewritten electrically while the chip is on the circuit board, and the writing process is fast.`, o: [
          [`True`, `EEPROM is rewritten electrically on the board, but the lecture stresses the writing process is SLOW, not fast, so the statement is false.`],
          [`False`, `Correct. EEPROM is rewritten electrically while on the circuit board, but the writing process is slow; "fast" makes the statement false (L1, Types of memory).`]
        ], a: 1, src: `Revision sheet` },
        { q: `In PROM, data is written into the chip after it is installed in the circuit, but it can only be written once.`, o: [
          [`True`, `PROM data is written BEFORE the chip is installed in the circuit (with a PROM programmer), not after, so the statement is false.`],
          [`False`, `Correct. PROM is written once, before installation, by plugging it into a PROM programmer; "after it is installed" makes it false (L1, Types of memory).`]
        ], a: 1, src: `Revision sheet` },
        { q: `In PROM, data is written into the chip before being installed in the circuit, but it can only be written once.`, o: [
          [`True`, `Correct. PROM data is written into the chip before it is installed, using a PROM programmer, and only once (L1, Types of memory).`],
          [`False`, `The statement is true: it matches the lecture definition of PROM exactly (written before installation, only once).`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `Assembly language is hardware (machine) dependent.`, o: [
          [`True`, `Correct. Each CPU type has its own assembly language.`],
          [`False`, `The statement is true: each CPU type has its own machine and assembly language, so assembly programs are not portable between CPUs.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `The data bus transfers instructions and data between the CPU and memory.`, o: [
          [`True`, `Correct. The lecture defines the data bus as the bus that transfers instructions and data between the CPU and memory (L1, Buses).`],
          [`False`, `The statement is true: it is the lecture's definition of the data bus. Addresses go on the address bus, sync signals on the control bus.`]
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
          [`A processor`, `The processor is the whole CPU, not a storage area inside it; the high-speed temporary storage built into the CPU is a register.`],
          [`ALU`, `The ALU performs operations, it does not store.`],
          [`A bus`, `A bus is a group of parallel wires that transfers data between parts of the computer; it does not store anything inside the CPU.`],
          [`A register`, `Correct. The lecture defines a register as a high speed temporary storage area built into a CPU (L2, Register classification).`]
        ], a: 3, src: `Exam 2024/25` },
        { q: `The C bit in the EFLAGS register refers to:`, o: [
          [`Compute bit`, `There is no "compute" flag in EFLAGS; the C bit is the carry flag CF, set when an unsigned result is too large for the destination.`],
          [`Control bit`, `C does not mean control; the only control flag is DF (direction). C is the carry flag, a status flag.`],
          [`Carry bit`, `Correct. C is the carry flag (CF), set when the result of an unsigned operation is too large to fit in the destination (L2, EFLAGS bits).`],
          [`None of the mentioned`, `Not "None": the carry bit is listed as option c, and CF is one of the six status flags.`]
        ], a: 2, src: `Exam 2024/25` },
        { q: `The S bit in the EFLAGS register refers to:`, o: [
          [`Status bit`, `S does not mean status; "status flags" is the group name (CF, PF, AF, ZF, SF, OF). S is the sign flag, set for a negative result.`],
          [`Sign bit`, `Correct. SF is set when the result is negative.`],
          [`Sign extension bit`, `There is no "sign extension" flag; S is simply the sign flag, set when the result's most significant bit is 1 (negative).`],
          [`None of the mentioned`, `Not "None": the sign bit is listed as option b; SF = 1 when the result is negative.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The O bit in the EFLAGS register refers to:`, o: [
          [`Overflow bit`, `Correct. O is the overflow flag (OF), set when a signed result is too large or too small to fit into the destination (L2, EFLAGS bits).`],
          [`Overload bit`, `There is no "overload" flag in EFLAGS; O is the overflow flag for signed results that do not fit the destination.`],
          [`Override segment bit`, `A segment override is an instruction prefix (e.g. ES:), not an EFLAGS bit; O is the overflow flag.`],
          [`None of the mentioned`, `Not "None": the overflow bit is listed as option a and is one of the EFLAGS status flags.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `……. contains the address of an instruction to be fetched.`, o: [
          [`PC`, `Correct. The Program Counter (PC) contains the address of an instruction to be fetched, i.e. the next instruction (L2, User-invisible registers).`],
          [`MAR`, `MAR holds the address of a memory location (data).`],
          [`IR`, `IR holds the instruction most recently fetched.`],
          [`MBR`, `The MBR holds a word of data to be written to memory or the word most recently read, not the address of the next instruction.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `……. contains the instruction most recently fetched.`, o: [
          [`PC`, `PC holds the address of the next instruction.`],
          [`MAR`, `The MAR contains the address of a location in memory, not the instruction itself; the most recently fetched instruction is in the IR.`],
          [`IR`, `Correct. The Instruction Register (IR) contains the instruction most recently fetched (L2, User-invisible registers).`],
          [`MBR`, `The MBR holds a data word being written to or read from memory, not the fetched instruction, which sits in the IR.`]
        ], a: 2, src: `Exam 2023/24` },
        { q: `……. contains a word of data to be written to memory or the word most recently read.`, o: [
          [`PC`, `The PC contains the address of the next instruction to be fetched, not a data word going to or from memory.`],
          [`MAR`, `The MAR holds the ADDRESS of the memory location; the data word written there or read from it is held in the MBR.`],
          [`IR`, `The IR holds the instruction most recently fetched, not a data word to be written to memory.`],
          [`MBR`, `Correct. The Memory Buffer Register (MBR) contains a word of data to be written to memory or the word most recently read (L2, User-invisible registers).`]
        ], a: 3, src: `Revision sheet` },
        { q: `……. contains the address of a location in memory.`, o: [
          [`PC`, `PC holds the address of the next instruction specifically.`],
          [`MBR`, `The MBR holds the data word read from or written to memory; the address of that location is in the MAR.`],
          [`IR`, `The IR holds the instruction most recently fetched, not a memory address.`],
          [`MAR`, `Correct. The Memory Address Register (MAR) contains the address of a location in memory (L2, User-invisible registers).`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `MBR is a …….. register.`, o: [
          [`General purpose`, `General purpose registers (EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI) are user visible; the MBR is a user-invisible control register.`],
          [`User invisible`, `Correct. PC, IR, MAR and MBR are user invisible.`],
          [`User visible`, `User-visible registers can be referenced by the machine language; the MBR cannot. The lecture tree places it under user-invisible with PC, IR and MAR.`],
          [`Special purpose`, `Special purpose registers are EIP and EFLAGS.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `PC is a ……….. register.`, o: [
          [`General purpose`, `General purpose registers are EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI; the PC is not one of them but a user-invisible register.`],
          [`User visible`, `The lecture's register tree lists PC under user-INVISIBLE registers (with MAR, MBR, IR), not user-visible.`],
          [`User invisible`, `Correct. In the lecture's register tree the Program Counter is a user-invisible (control/status) register, with MAR, MBR and IR (L2, Register classification).`],
          [`Special purpose`, `Special purpose registers are a user-visible group (EIP, EFLAGS); in the lecture tree PC is under user-invisible registers.`]
        ], a: 2, src: `Midterm 2023/24` },
        { q: `Examples of user visible registers:`, o: [
          [`EAX, AX, ESP, BP`, `Correct. All are general purpose, user-visible.`],
          [`EAX, AX, MAR, IR`, `EAX and AX are user visible, but MAR and IR are user-invisible control registers, so this set is wrong.`],
          [`ECX, MBR, DX, SS`, `ECX, DX and SS are user visible, but the MBR is user-invisible, so the set as a whole is wrong.`],
          [`None`, `Not "None": option a (EAX, AX, ESP, BP) contains only user-visible general purpose registers.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Special purpose registers are:`, o: [
          [`16-bit registers such as CS, DS`, `CS and DS are 16-bit SEGMENT registers; the special purpose registers are the 32-bit EIP and EFLAGS.`],
          [`32-bit registers such as EFLAGS`, `Correct. The lecture names two special purpose registers, EIP and EFLAGS, both 32-bit and manipulated directly by the CPU (L2, Special purpose registers).`],
          [`32-bit registers such as ECX, EDX`, `ECX and EDX are 32-bit GENERAL purpose registers used for arithmetic and data movement, not special purpose.`],
          [`None`, `Not "None": option b is right, since EFLAGS (with EIP) is a 32-bit special purpose register.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `General purpose registers are:`, o: [
          [`16-bit registers such as CS, DS`, `CS and DS are 16-bit segment registers, not general purpose ones.`],
          [`32-bit registers such as EFLAGS`, `EFLAGS is a special purpose register (with EIP), not general purpose.`],
          [`32-bit registers such as ECX, EDX`, `Correct. The eight 32-bit general purpose registers are EAX, EBX, ECX, EDX, EBP, ESP, EDI and ESI, so ECX and EDX qualify (L2, General purpose registers).`],
          [`None`, `Not "None": option c is right, since ECX and EDX are 32-bit general purpose registers.`]
        ], a: 2, src: `Midterm 2022/23` },
        { q: `General purpose registers are (form B):`, o: [
          [`16-bit registers such as CS, DS`, `CS and DS are 16-bit segment registers, not general purpose ones.`],
          [`32-bit registers such as EAX, EBX`, `Correct. EAX and EBX are among the eight 32-bit general purpose registers used for arithmetic and data movement (L2, General purpose registers).`],
          [`32-bit registers such as EFLAGS`, `EFLAGS is special purpose. (The 2022/23 key underlined both b and c; only b is correct.)`],
          [`None`, `Not "None": option b is right, since EAX and EBX are 32-bit general purpose registers.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `General purpose registers are (2022/23 Summer options):`, o: [
          [`16-bit registers such as CS, DS`, `CS and DS are 16-bit segment registers, not general purpose ones.`],
          [`32-bit registers such as EBX and EDX`, `Correct. EBX and EDX are among the eight 32-bit general purpose registers (EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI) (L2, General purpose registers).`],
          [`16-bit registers such as ES, BX`, `BX is general purpose, but ES is the extra SEGMENT register, so this pair is not a set of general purpose registers.`],
          [`32-bit registers such as EIP, EFLAGS`, `EIP and EFLAGS are the two 32-bit special purpose registers, not general purpose ones.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `Segment registers are ………`, o: [
          [`16-bit user visible registers such as CS, DS`, `Correct. Segment registers (CS, DS, ES, SS) are 16-bit user-visible registers used as base locations of segments (L2, Segment registers).`],
          [`16-bit general purpose registers such as FLAGS`, `FLAGS is a special purpose (status/control) register, neither general purpose nor a segment register.`],
          [`32-bit registers such as ECX, EDX`, `ECX and EDX are 32-bit general purpose registers; segment registers are 16-bit (CS, DS, ES, SS).`],
          [`None`, `Not "None": option a is right, since CS and DS are 16-bit user-visible segment registers.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `……. is a segment register that holds the assembly language instructions executed by the microprocessor.`, o: [
          [`DS`, `DS (data segment) points to the segment where data and variables are stored, not program instructions.`],
          [`CS`, `Correct. CS (code segment) addresses the segment where the executable program's instructions are stored (L2, Segment registers).`],
          [`SS`, `SS (stack segment) holds the base of the active stack (local variables, parameters), not the program's instructions.`],
          [`ES`, `ES (extra segment) is an additional data segment, used e.g. as the destination of string instructions, not for code.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The register which keeps track of the status of the running environment:`, o: [
          [`General purpose`, `General purpose registers hold data for arithmetic and data movement; they do not track the status of the running environment.`],
          [`Condition`, `"Condition" is not one of the lecture's register classes; the status bits (condition of results) live in the flags register.`],
          [`Segment`, `Segment registers hold the base locations of the code, data and stack segments, not status information.`],
          [`Flags`, `Correct. The flags register (EFLAGS) keeps track of the status of the running environment: its bits reflect outcomes or control the CPU (L2, Special purpose registers).`]
        ], a: 3, src: `Exam 2023/24` },
        { q: `The Flag register is responsible to indicate the ……….`, o: [
          [`Condition of memory`, `Flags do not describe the state of memory; they reflect the outcome of CPU (ALU) operations or control the CPU.`],
          [`The condition of the result of an ALU operation`, `Correct. Flag bits such as ZF, SF, CF and OF report the condition of the result of an ALU operation (zero, negative, carry, overflow) (L2, Special purpose registers).`],
          [`Result of addition`, `Too narrow: flags report the condition of ANY ALU operation (subtraction, logic, shifts too), not only addition.`],
          [`Result of subtraction`, `Too narrow: flags report the condition of any ALU operation's result, not only subtraction.`]
        ], a: 1, src: `Revision sheet` },
        { q: `…… stores the instruction currently being executed.`, o: [
          [`Instruction segment`, `"Instruction segment" is not a register; instructions are stored in the code segment, and the current one is held in the IR.`],
          [`Instruction register`, `Correct. The instruction register (IR) holds the instruction most recently fetched, i.e. the one being executed (L2, User-invisible registers).`],
          [`Both a and b`, `Only the instruction register does this; "instruction segment" is not a register, so "both" is wrong.`],
          [`None`, `Not "None": the instruction register stores the instruction currently being executed.`]
        ], a: 1, src: `Revision sheet` },
        { q: `What is true about the program counter?`, o: [
          [`It is an 8-bit register holding temporary data of arithmetic and logic operations`, `Holding temporary results of arithmetic and logic describes the accumulator (AX), not the program counter.`],
          [`When an instruction is fetched it is stored in the program counter`, `A fetched instruction is stored in the instruction register (IR); the PC only holds the address of the next instruction.`],
          [`It provides timing and control signals`, `Timing and control signals come from the clock and control unit, not from the program counter.`],
          [`It is a 16-bit register storing the memory address of the next instruction to be executed`, `Correct. The PC (IP in the 8086, 16-bit) holds the memory address of the next instruction to be fetched and executed (L2, User-invisible registers).`]
        ], a: 3, src: `Revision sheet` },
        { q: `The Program Counter (PC) is used to:`, o: [
          [`Specify the address of the instruction to be executed (next)`, `Correct. The PC contains the address of the instruction to be fetched next; EIP likewise holds the address of the next instruction (L2, User-invisible registers).`],
          [`Specify the address of the instruction currently executing`, `Once an instruction is fetched the PC already points to the NEXT instruction; the current instruction itself sits in the IR.`],
          [`Specify the number of instructions executed`, `PC is not a counter of instructions executed.`],
          [`None`, `Not "None": option a is right, since the PC holds the address of the next instruction to be executed.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Stack pointer is stored in …..`, o: [
          [`RAM`, `SP is a register, and registers are built into the CPU; RAM holds the stack data itself, not the stack pointer.`],
          [`ROM`, `ROM is permanent read-only memory; the stack pointer changes constantly and is a register inside the CPU.`],
          [`RAM or ROM`, `SP lives in neither RAM nor ROM: it is a register, a storage area built into the microprocessor.`],
          [`Microprocessor`, `Correct. SP is a register, and registers are high-speed temporary storage built into the CPU, i.e. the microprocessor (L2, Register classification).`]
        ], a: 3, src: `Revision sheet` },
        { q: `Which of the following belongs to the categories of registers?`, o: [
          [`General purpose`, `General purpose is one register category, but so is segment, so the complete answer is "a and b".`],
          [`Segment`, `Segment is one register category, but general purpose is too, so the complete answer is "a and b".`],
          [`Pointer`, `"Pointer" is not a category in the lecture tree (general purpose, special purpose, segment); SP and BP are general purpose registers.`],
          [`a and b`, `Correct. The lecture's user-visible categories are general purpose, special purpose and segment registers, so both a and b are categories (L2, Register classification).`]
        ], a: 3, src: `Revision sheet` },
        { q: `The CS register stores ……. in the code segment.`, o: [
          [`Pointer instructions`, `"Pointer instructions" is not what CS addresses; CS points to the segment holding the program's code instructions.`],
          [`Path instructions`, `"Path instructions" is not a lecture term; the code segment, addressed by CS, holds the program's code instructions.`],
          [`Code instructions`, `Correct (revision key). CS addresses the code segment, where the program's code instructions executed by the processor are stored (L2, Segment registers).`],
          [`Stream line`, `"Stream line" is a meaningless distractor; the code segment addressed by CS holds the code instructions.`]
        ], a: 2, src: `Revision sheet` },
        { q: `A word is:`, o: [
          [`One byte`, `One byte is 8 bits; a word is twice that, 2 bytes (16 bits), the size of AX.`],
          [`8 bytes`, `8 bytes (64 bits) is a quad word; a word is 2 bytes and a double word 4 bytes.`],
          [`2 bytes`, `Correct. A word is 2 bytes = 16 bits, the size of 16-bit registers such as AX; a double word is 4 bytes (L2, MOV instruction).`],
          [`2 bits`, `2 bits is far too small; a byte alone is 8 bits, and a word is 2 bytes (16 bits).`]
        ], a: 2, src: `Revision sheet` },
        { q: `Segment registers cannot be used as operands for arithmetic and logical instructions.`, o: [
          [`True`, `Correct. Segment registers hold segment base locations and cannot be operands of arithmetic or logic instructions (L2, Segment registers).`],
          [`False`, `ADD DS, 5 is illegal; segment registers are loaded only by MOV/POP/LDS etc.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The Z flag is set to 1 when an ALU operation results in a 0 output.`, o: [
          [`True`, `Correct. The zero flag Z is set to 1 when an arithmetic/ALU result is zero (L2, EFLAGS bits).`],
          [`False`, `The statement is true: ZF = 1 exactly when the result of the operation is zero.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `The Z bit of the EFLAGS register is set to zero if a calculation result = zero.`, o: [
          [`True`, `It is the reverse: ZF is set to ONE when the result is zero and cleared to 0 when the result is non-zero.`],
          [`False`, `Correct. ZF becomes 1 (not 0) when the result is zero, so the statement is false (L2, EFLAGS bits).`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The segment registers include SS, CS, DS, ES, DI and SI.`, o: [
          [`True`, `DI and SI are index (general purpose) registers.`],
          [`False`, `Correct. The segment registers are CS, DS, ES, SS (plus FS, GS); DI and SI are index (general purpose) registers (L2, Segment registers).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `You cannot use 1 byte (high or low bits) of the ESP register; you can use either 16 or 32 bits.`, o: [
          [`True`, `Correct. Only AX, BX, CX, DX have 8-bit halves.`],
          [`False`, `The statement is true: only AX, BX, CX and DX have 8-bit halves; SP/ESP has no SPL or SPH, so it is used as 16 or 32 bits.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `You can use 1 byte of the ESI register by using SH, SL.`, o: [
          [`True`, `SH and SL do not exist: SI, DI, SP and BP have no 8-bit halves, only AX, BX, CX and DX do.`],
          [`False`, `Correct. ESI can be used only as SI (16 bits) or ESI (32 bits); there is no SH/SL, since only AX, BX, CX, DX have 8-bit halves (L2, General purpose registers).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `User visible registers include general purpose, special purpose and segment registers.`, o: [
          [`True`, `Correct. That is the lecture's register tree. (A student's mark on the 2024/25 paper said False.)`],
          [`False`, `The lecture lists all three under user-visible.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Memory Address Register (MAR) contains the instruction most recently fetched.`, o: [
          [`True`, `The instruction most recently fetched is held in the IR; the MAR holds the address of a location in memory.`],
          [`False`, `Correct. The MAR contains the address of a memory location; the instruction most recently fetched is in the IR (L2, User-invisible registers).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `The general-purpose registers include AX, BX, CX, DX, EX and FX.`, o: [
          [`True`, `EX and FX do not exist; the 16-bit general registers are AX, BX, CX, DX, SP, BP, SI and DI.`],
          [`False`, `Correct. There are no EX or FX registers; the 16-bit general purpose registers are AX, BX, CX, DX, SP, BP, SI, DI (L2, General purpose registers).`]
        ], a: 1, src: `Revision sheet` },
        { q: `SS is the segment register used to hold the segment of the stack.`, o: [
          [`True`, `Correct. (The revision version "hold the offset of the stack" is False: the offset is in SP.)`],
          [`False`, `The statement is true: SS holds the starting address of the active stack segment (the offset of the top is in SP).`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `The Program Counter (PC) is used to save the number of executed instructions.`, o: [
          [`True`, `PC holds the address of the next instruction.`],
          [`False`, `Correct. The PC holds the address of the next instruction to be fetched; it does not count how many instructions were executed (L2, User-invisible registers).`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The Sign flag is set when the contents of the accumulator become negative after an ALU operation.`, o: [
          [`True`, `Correct. The sign flag is set when the result is negative, i.e. its most significant bit is 1 (L2, EFLAGS bits).`],
          [`False`, `The statement is true: SF = 1 whenever an ALU result (e.g. in the accumulator) is negative.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The CF is known as:`, o: [
          [`Carry flag`, `Correct. CF is the carry flag, set when an unsigned result is too large for the destination; it is also the borrow flag for SBB (L2, EFLAGS bits).`],
          [`Condition flag`, `There is no "condition flag"; CF is the carry flag, one of the six status flags.`],
          [`Common flag`, `There is no "common flag" in EFLAGS; the C in CF stands for carry.`],
          [`None`, `Not "None": option a, carry flag, is the correct name of CF.`]
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
          [`Register`, `Register addressing needs a register as the source (e.g. MOV AX, BX); here the source 0005H is a constant written in the instruction.`],
          [`Direct`, `Direct addressing reads a memory location, written in brackets like [0005H]; 0005H without brackets is data, not an address.`],
          [`Immediate`, `Correct. The source 0005H is a constant written inside the instruction, so MOV copies immediate data into AX (L3, Immediate addressing).`],
          [`Register relative`, `Register relative needs a memory operand like [BX+4]; there are no brackets here, only the constant 0005H.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction MOV AX, BX belongs to the addressing mode:`, o: [
          [`Direct addressing`, `Direct addressing moves data between AL/AX/EAX and a memory location like [1234H]; here both operands are registers.`],
          [`Register addressing`, `Correct. Both operands, AX and BX, are registers of the same size, which is register addressing, the most common mode (L3, Register addressing).`],
          [`Indexed addressing`, `Indexed addressing uses SI or DI in brackets as a memory pointer (e.g. [SI]); MOV AX, BX accesses no memory.`],
          [`Immediate addressing`, `Immediate addressing needs a constant as the source (e.g. MOV AX, 5); BX is a register.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Which of the following instructions is not valid?`, o: [
          [`MOV AX, BX`, `MOV AX, BX is valid register addressing: two 16-bit general registers of the same size.`],
          [`MOV DS, AX`, `Valid: loading a segment register from a general register.`],
          [`MOV [AX], [5000H]`, `Correct. Memory-to-memory move (and AX cannot be a pointer).`],
          [`PUSH AX`, `PUSH AX is valid: it decrements SP by 2 and stores the 16-bit AX on the stack (L5).`]
        ], a: 2, src: `Exam 2024/25` },
        { q: `The operands in a MOV instruction (source and destination) cannot be:`, o: [
          [`Register, register`, `Register to register is allowed (and is the most common mode), as long as both are the same size, e.g. MOV AX, BX.`],
          [`Memory location, memory location`, `Correct. Memory to memory moves are not allowed with MOV (only string instructions can do it), e.g. MOV [DI], [SI] is incorrect (L3, Register addressing and its restrictions).`],
          [`Memory location, register`, `A memory location and a register is allowed in either order, e.g. MOV [BX], AX or MOV AX, [BX].`],
          [`Immediate data, register`, `Allowed as source (but immediate can never be the destination).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The operands in a MOV instruction cannot be (form B):`, o: [
          [`DS, ES`, `Correct. Segment to segment moves are not allowed.`],
          [`AX, CS`, `MOV AX, CS is allowed: CS may be READ into a general register; only changing CS (MOV CS, AX) is forbidden.`],
          [`EAX, ESP`, `MOV EAX, ESP is allowed: both are 32-bit general purpose registers, and MOV simply copies ESP into EAX.`],
          [`BX, DX`, `MOV BX, DX is allowed: two 16-bit general registers of the same size.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `The instruction MOV DS, ES:`, o: [
          [`Copies the contents of ES into DS`, `That is what it tries to do, but moving one segment register into another in a single instruction is not allowed; use MOV AX, ES then MOV DS, AX.`],
          [`Copies the contents of DS into ES`, `MOV copies source (ES) into destination (DS), so this has the direction reversed, and the segment-to-segment move is illegal anyway.`],
          [`Copies and deletes the contents of ES into DS`, `MOV never deletes its source, and in any case a segment-to-segment move like MOV DS, ES is not allowed.`],
          [`Causes an error`, `Correct. Data cannot be moved from one segment register to another with one instruction, so MOV DS, ES is an error (L3, Register addressing and its restrictions).`]
        ], a: 3, src: `Exam 2023/24 Second term` },
        { q: `The instruction MOV EAX, ESP:`, o: [
          [`Copies the contents of ESP into EAX`, `Correct. EAX and ESP are both 32-bit general purpose registers, so MOV copies ESP into EAX and ESP keeps its value (L3, Register addressing).`],
          [`Copies the contents of SP into AX`, `The operands are the 32-bit EAX and ESP, so all 32 bits are copied, not just the 16-bit SP into AX.`],
          [`Copies and deletes the contents of ESP into EAX`, `MOV only copies; the source ESP keeps its value. Nothing is deleted.`],
          [`Causes an error`, `No error: EAX and ESP are same-size general purpose registers, so the move is valid.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Which of the following instructions causes errors?`, o: [
          [`MOV CS, AX`, `Correct. Changing the value of CS is not allowed, so MOV CS, AX causes an error (reading it, MOV AX, CS, is fine) (L3, Register addressing and its restrictions).`],
          [`MOV EAX, EBP`, `MOV EAX, EBP is valid: both are 32-bit general purpose registers.`],
          [`MOV CX, [SI]`, `MOV CX, [SI] is valid register indirect addressing: SI points to a word in the data segment (DS×10 + SI).`],
          [`PUSHA / POP AX`, `Both are valid: PUSHA pushes all 16-bit general registers and POP AX pops one word into AX (L5).`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `The instruction that is not possible among the following:`, o: [
          [`MOV AX, BX`, `MOV AX, BX is possible: register addressing with two 16-bit registers.`],
          [`MOV AX, [BX]`, `MOV AX, [BX] is possible: register indirect, reading the word at DS×10 + BX into AX.`],
          [`MOV 55H, BL`, `Correct. Immediate data cannot be a destination.`],
          [`MOV AL, 55H`, `MOV AL, 55H is possible: immediate addressing copies the byte constant 55H into the 8-bit AL.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction that is not possible among the following:`, o: [
          [`MOV AX, [BX]`, `MOV AX, [BX] is possible: memory to register using BX as a pointer.`],
          [`MOV AX, 5555H`, `MOV AX, 5555H is possible: immediate addressing with a 16-bit constant into a 16-bit register.`],
          [`MOV AX, [SI]`, `MOV AX, [SI] is possible: memory to register with SI as the pointer.`],
          [`MOV [SI], [DI]`, `Correct. Both operands are memory locations, and memory to memory moves are not allowed with MOV (L3, Register addressing and its restrictions).`]
        ], a: 3, src: `Revision sheet` },
        { q: `The instruction that is not possible among the following (2023/24 options):`, o: [
          [`MOV AX, [BX]`, `MOV AX, [BX] is possible: memory to register with BX as a pointer into the data segment.`],
          [`MOV AX, 5555H`, `MOV AX, 5555H is possible: a 16-bit immediate constant into a 16-bit register.`],
          [`MOV [AX], SI`, `Also invalid on the real 16-bit 8086 (AX cannot be used as a pointer), so this option can be defended too.`],
          [`MOV 100, [DI]`, `Correct (intended answer). An immediate value can never be a destination.`]
        ], a: 3, src: `Exam 2023/24` },
        { q: `The instruction MOV [DI], [SI]:`, o: [
          [`Copies the contents of SI into DI`, `MOV [DI], [SI] would copy memory to memory, which MOV cannot do; it also refers to the memory pointed to, not the registers themselves.`],
          [`Copies the contents of DI into SI`, `Wrong direction (the destination is [DI]), and in any case memory to memory moves are not allowed with MOV.`],
          [`Copies and deletes the contents of SI into DI`, `MOV never deletes its source, and this memory-to-memory form is illegal in the first place.`],
          [`Causes an error`, `Correct. Both operands are memory locations; memory to memory moves are not allowed (except with string instructions such as MOVS) (L3, Register addressing and its restrictions).`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `In general, the destination operand of an instruction can be:`, o: [
          [`Memory location`, `Memory is a valid destination, but so is a register, so the complete answer is "memory location and register".`],
          [`Register`, `A register is a valid destination, but so is a memory location, so the complete answer includes both.`],
          [`Immediate data`, `Immediate data can never be a destination: MOV 55H, BL is impossible because a constant cannot receive a value.`],
          [`Memory location and register`, `Correct. The destination can be a register or a memory location, never immediate data (L3, Register addressing and its restrictions).`]
        ], a: 3, src: `Revision sheet` },
        { q: `If DS=1000, ES=1400, DI=150, EAX=1234, the memory address for MOV BL, ES:[1234H] is:`, o: [
          [`15243`, `15243 swaps the last two digits; the correct sum is 14000 + 1234 = 15234.`],
          [`15234`, `Correct. The override uses ES: ES×10H + 1234H = 14000 + 1234 = 15234 (L3, Lecture examples).`],
          [`1634`, `1634 does not come from ES×10H + 1234; with ES = 1400 the base alone is 14000, so the address must be 15234.`],
          [`1643`, `1643 skips the ×10H shift of ES and the correct addition; the address is ES×10 + 1234 = 15234.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The segment register of the instruction MOV BL, ES:[1234H] will be:`, o: [
          [`ES`, `Correct. The ES: prefix is a segment override, so ES replaces the default DS for this memory access (L3, Segment overriding).`],
          [`DS`, `DS is the default segment for MOV, but the written ES: prefix overrides it.`],
          [`SS`, `SS is the default only for BP/SP-based addresses; here ES is written explicitly as an override.`],
          [`CS`, `CS is used for fetching instructions (CS:IP); here ES is written explicitly, so ES is the segment.`]
        ], a: 0, src: `Exam 2023/24 Second term` },
        { q: `The segment register of the instruction MOV BL, [1234H] will be:`, o: [
          [`ES`, `ES is used only when written as an override (ES:[1234H]); with no prefix the default segment applies.`],
          [`DS`, `Correct. No segment is written, so the default segment for MOV, DS, is used: address = DS×10 + 1234 (L3, Segment:offset and the physical address).`],
          [`SS`, `SS is the default only when BP or SP forms the address; [1234H] uses the default DS.`],
          [`CS`, `CS is the segment for instruction fetches (CS:IP), not for data operands like [1234H], which default to DS.`]
        ], a: 1, src: `Revision sheet` },
        { q: `An instruction that subtracts val3 from EAX:`, o: [
          [`sub val3, eax`, `The first operand is the destination, so sub val3, eax computes val3 − eax and stores it in val3, not in EAX.`],
          [`sub eax, val3`, `Correct. Syntax is instruction destination, source: sub eax, val3 computes EAX − val3 and leaves the result in EAX.`],
          [`subtract val3, eax`, `"subtract" is not an 8086 mnemonic; the subtraction instruction is SUB.`],
          [`subtract eax, val3`, `The operand order is right, but the mnemonic is SUB, not "subtract", so this would not assemble.`]
        ], a: 1, src: `Revision sheet` },
        { q: `MOV SS, CS is an incorrect instruction.`, o: [
          [`True`, `Correct. Moving one segment register into another in a single instruction is not allowed, and it would also change CS (L3, Register addressing and its restrictions).`],
          [`False`, `The statement is true: MOV SS, CS is a segment-to-segment move, which is not allowed; go through a general register.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `MOV [AX], [150H] is a correct instruction.`, o: [
          [`True`, `Both operands are memory, and memory to memory moves are not allowed (AX is also not a valid 8086 pointer), so it is not correct.`],
          [`False`, `Correct. MOV [AX], [150H] is a memory-to-memory move, which the lecture lists as incorrect (L3, Register addressing and its restrictions).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `A default segment can be overridden (by writing the required segment before the offset).`, o: [
          [`True`, `Correct. Writing a segment before the offset overrides the default, e.g. MOV BL, ES:[1234H] uses ES instead of DS (L3, Segment overriding).`],
          [`False`, `The statement is true: segment overriding exists, e.g. MOV BL, ES:[1234H] or MOV AL, CS:[BX].`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `Default segment can never be overridden.`, o: [
          [`True`, `Default segments can be overridden by writing a segment prefix, e.g. ES:[1234H] or DS:[BP], so the statement is false.`],
          [`False`, `Correct. A default segment CAN be overridden by writing the segment before the offset, e.g. MOV BL, ES:[1234H] (L3, Segment overriding).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The statement MOV ES:SI, CX is legal.`, o: [
          [`True`, `SI without brackets is a register, so ES:SI is meaningless.`],
          [`False`, `Correct. (Same idea: "MOV ES:SI,CX is incorrect" is True.)`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `The statement MOV ES:SI, CX is incorrect.`, o: [
          [`True`, `Correct. ES:SI is not a memory operand because the brackets are missing; the correct form is MOV ES:[SI], CX (L3, Segment overriding).`],
          [`False`, `The statement is true: without brackets SI is a register, so ES:SI is illegal; MOV ES:[SI], CX would be correct.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Register CS cannot be modified, so the instruction MOV [CS], AX is incorrect.`, o: [
          [`True`, `Correct. CS cannot be a MOV destination (and [CS] is not a valid pointer).`],
          [`False`, `The statement is true: changing CS is not allowed, so CS can never be a MOV destination (and [CS] is not a valid pointer).`]
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
          [`SS`, `Correct. BP is the only pointer whose default segment is SS, so 50[BP] reads SS×10 + 50 + BP; no override is written (L4, Register indirect addressing).`],
          [`CS`, `CS is used for fetching instructions (with IP), never as the default for a data pointer. BP's default segment is SS.`],
          [`DS which contains 50`, `BP changes the default to SS; 50 is a displacement.`],
          [`ES`, `ES is used only when written as an override (e.g. ES:50[BP]) or by string destinations; with no override, BP defaults to SS.`]
        ], a: 0, src: `Midterm 2022/23` },
        { q: `The segment register of the instruction MOV 30[BP], BX will be:`, o: [
          [`ES`, `ES would need an explicit override such as ES:30[BP]; none is written, so BP's default segment SS is used.`],
          [`SS`, `Correct. The memory operand uses BP, and BP's default segment is SS, so the address is SS×10 + 30 + BP (L4, Default segment rule).`],
          [`DS`, `DS is the default only for BX, SI, DI and plain constants; a BP-based operand like 30[BP] defaults to SS.`],
          [`The instruction is incorrect`, `The instruction is valid: it moves register BX into memory (register to memory), and BP with a displacement is legal indexed addressing.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The segment register of the instruction MOV BX, 50[SI-10] will be:`, o: [
          [`SS-10`, `A segment register is a register, not an expression: "SS-10" is meaningless. The -10 is part of the offset, and SI defaults to DS.`],
          [`DS*50`, `"DS*50" mixes up the formula: DS is multiplied by 10H, and 50 is a displacement added to the offset, not to the segment.`],
          [`DS which contains 50`, `DS does not "contain" 50: 50 and -10 are displacements added to SI to form the offset. The segment is simply DS.`],
          [`DS`, `Correct. The pointer register is SI, whose default segment is DS; 50 and -10 only change the offset: DS×10 + 50 + SI - 10 (L4, Indexed addressing).`]
        ], a: 3, src: `Midterm 2023/24` },
        { q: `The segment register of the instruction MOV [SI][BP], BX will be:`, o: [
          [`ES`, `ES needs an explicit override (ES:[SI][BP]); without one, the presence of BP makes the default segment SS.`],
          [`DS`, `SI alone would use DS, but whenever BP is part of the address the default segment becomes SS (Sheet 1: [SI][BP] uses SS).`],
          [`SS`, `Correct. BP is the base register and BP defaults to SS, so the address is SS×10 + BP + SI, as in Sheet 1's MOV AL, [SI][BP] (L4, Base plus index).`],
          [`CS`, `CS is the code segment used with IP to fetch instructions; data operands default to DS, or SS when BP is used.`]
        ], a: 2, src: `Exam 2024/25` },
        { q: `The segment register of the instruction MOV [BX][BP], BX will be:`, o: [
          [`ES`, `No ES: override is written, so ES is not used; the intended answer follows the BP rule and gives SS.`],
          [`DS`, `BX alone would use DS, but the exam's rule is that BP in the address makes the segment SS.`],
          [`SS`, `Correct (intended). BP → SS. Note: on a real 8086, two base registers BX+BP cannot be combined.`],
          [`CS`, `CS holds code and is used with IP for instruction fetch; it is never the default segment for a data operand.`]
        ], a: 2, src: `Exam 2023/24 Second term` },
        { q: `The segment register of the instruction MOV [BX][BP], AX will be:`, o: [
          [`ES`, `No ES: override is written, so ES is not used; the intended answer is SS because BP appears in the address.`],
          [`DS`, `BX on its own would give DS, but BP is also in the address, and the course rule gives SS whenever BP is used.`],
          [`SS`, `Correct (intended answer, same note as above).`],
          [`CS`, `CS is the code segment for instruction fetch; data operands use DS by default, or SS when BP is involved.`]
        ], a: 2, src: `Exam 2023/24` },
        { q: `The memory address when executing MOV AX, 100[DI] will be:`, o: [
          [`DS + DI + 100`, `The segment must be shifted one hex digit (DS×10) before adding the offset; adding DS directly gives a wrong physical address.`],
          [`(DS*10) + DI + 100`, `Correct. Memory location = segment×10 + displacement + offset; DI defaults to DS, so (DS×10) + 100 + DI (L4, Indexed addressing).`],
          [`(ES*10) + DI + 100`, `ES is only used with an override such as ES:100[DI]; DI's default segment for MOV is DS.`],
          [`(DS+10) + DI + 100`, `The segment is multiplied by 10H (shifted one hex digit), not increased by 10; (DS+10) is a wrong formula.`]
        ], a: 1, src: `Revision sheet` },
        { q: `If DS=1000, ES=1400, DI=150, BX=CD01, the memory location for MOV AL, 100[BX][DI] is:`, o: [
          [`1CF51`, `Correct. BX and DI default to DS: DS×10 + 100 + BX + DI = 10000 + 100 + CD01 + 150 = 1CF51 (L4, Lecture examples).`],
          [`CF51`, `CF51 is only the offset 100 + CD01 + 150; the segment base DS×10 = 10000 must be added to give 1CF51.`],
          [`FC51`, `FC51 swaps the C and F of the offset CF51 and also drops the segment base 10000; the right sum is 1CF51.`],
          [`1FC50`, `1FC50 has the offset digits scrambled (FC50 instead of CF51); 10000 + 100 + CD01 + 150 = 1CF51.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The statement MOV AX, [BP - 2] is correct.`, o: [
          [`True`, `Correct. Indexed addressing with a negative displacement, SS segment.`],
          [`False`, `The statement is true: [BP-2] is indexed addressing with a negative displacement, which is legal; the lecture lists [BP-2] as valid.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `The statement MOV AX, [BP - 50] is incorrect.`, o: [
          [`True`, `MOV AX, [BP-50] is legal indexed addressing (BP minus a displacement, segment SS), so calling it incorrect is false.`],
          [`False`, `Correct. A negative displacement with BP is legal indexed addressing: address = SS×10 + BP - 50, so the statement "incorrect" is false (L4, Indexed addressing).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `The statement MOV AX, [BP - 2] is illegal.`, o: [
          [`True`, `[BP-2] is legal: BP is a valid pointer and a negative displacement is allowed, so the statement "illegal" is false.`],
          [`False`, `Correct. The lecture lists [BP-2] as legal indexed addressing: BP plus a (negative) displacement, segment SS (L4, Indexed addressing).`]
        ], a: 1, src: `Revision sheet` },
        { q: `The statement MOV AX, DS:[BP - 2] is incorrect.`, o: [
          [`True`, `Overriding BP's default SS with DS is allowed (MOV AX, DS:[BP] is a lecture example).`],
          [`False`, `Correct. Segment override is allowed: DS: replaces BP's default SS, so the address is DS×10 + BP - 2, like the lecture's MOV AX, DS:[BP] (L4, Register indirect addressing).`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The memory address of MOV AX, 10[SI+BC] = DS*10 + SI + BC.`, o: [
          [`True`, `The displacement 10 is missing from the formula.`],
          [`False`, `Correct. The displacement 10 is missing: the address of 10[SI+BC] is DS×10 + 10 + SI + BC (SI defaults to DS) (L4, Revision sheet Q14).`]
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
          [`Incremented by 2`, `PUSH never increments SP: the stack grows down, so SP is decremented, and by 4 (not 2) because EAX is a 32-bit register.`],
          [`Decremented by 2`, `The direction is right but the size is wrong: EAX is 4 bytes, so SP decreases by 4. Decrement by 2 is for a 16-bit PUSH such as PUSH AX.`],
          [`Incremented by 4`, `The size 4 is right, but PUSH decrements SP (the stack grows toward lower addresses); incrementing is what POP does.`],
          [`Decremented by 4`, `Correct. PUSH first decrements SP by the operand size, then stores it; EAX is 4 bytes, so SP = SP - 4 (L5, PUSH).`]
        ], a: 3, src: `Exam 2024/25` },
        { q: `After each execution of the instruction PUSH AX, the stack pointer is:`, o: [
          [`Incremented by 1`, `PUSH decrements SP, and a 16-bit register moves 2 bytes, so incrementing by 1 is wrong on both counts.`],
          [`Decremented by 1`, `Stack instructions move 2 or 4 bytes, never 1; AX is a word (2 bytes), so SP decreases by 2.`],
          [`Incremented by 2`, `The size is right but the direction is not: PUSH decrements SP; SP + 2 is what POP AX does.`],
          [`Decremented by 2`, `Correct. PUSH AX stores AH at SS:[SP-1] and AL at SS:[SP-2], then SP = SP - 2 (L5, PUSH).`]
        ], a: 3, src: `Revision sheet` },
        { q: `If SS=1300, SP=100, CX=CD01, then after executing POP ECX the following is correct:`, o: [
          [`SS = 1304`, `PUSH and POP never change SS; only SP changes. SS stays 1300 and SP goes from 100 to 104.`],
          [`SP = 98`, `SP = 98 would be a decrement, which is PUSH. POP increments SP, and ECX is 4 bytes: 100 + 4 = 104.`],
          [`SS = 1298`, `SS is never changed by POP (or PUSH); only the stack pointer moves, SP = 100 + 4 = 104.`],
          [`SP = 104`, `Correct. POP copies 4 bytes from SS:[SP] into ECX, then increments SP by 4: 100 + 4 = 104; SS is unchanged (L5, POP).`]
        ], a: 3, src: `Exam 2024/25` },
        { q: `If SS=1300, SP=100, CX=CD01, then after executing PUSH CX the following is correct:`, o: [
          [`SS = 1302`, `PUSH never changes SS; it only decrements SP, here by 2 because CX is 16 bits.`],
          [`SP = 98`, `Correct (intended). SP decreases by 2. Note: in hex 100H - 2 = 0FEH; the exam treated 100 as decimal.`],
          [`SS = 1298`, `SS is the stack segment base and is not changed by PUSH; only SP decreases, by 2 for CX.`],
          [`SP = 102`, `SP = 102 is an increment, which is what POP does; PUSH decrements SP by 2 for the 16-bit CX.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `If SS=1400, SP=160, BX=CD01, then after executing POP AX the following is correct:`, o: [
          [`SS = 1402`, `POP never changes SS; it increments SP by 2 because AX is 16 bits, so SP = 162.`],
          [`SP = 158`, `SP = 158 is a decrement, which is PUSH. POP increments SP: 160 + 2 = 162.`],
          [`SS = 1398`, `SS is not modified by stack operations; only SP changes, from 160 to 162.`],
          [`SP = 162`, `Correct. POP AX copies 2 bytes from SS:[SP] into AX, then SP = SP + 2 = 160 + 2 = 162; SS stays 1400 (L5, POP).`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `The instruction PUSHA (exam options):`, o: [
          [`Increments SP by 32 words`, `PUSHA pushes, so SP decreases, not increases; and 32 words (64 bytes) is far more than the 8 registers it saves.`],
          [`Increments SP by 16 bytes`, `16 bytes is the true size of PUSHA (8 words), but PUSH instructions decrement SP; incrementing by 16 is what POPA does.`],
          [`Decrements SP by 32 words`, `Decrement is right, but 32 words = 64 bytes; PUSHA saves 8 registers (16 bytes) and PUSHAD 8 double words (32 bytes), never 32 words.`],
          [`Decrements SP by 32 bytes`, `Best available answer, but exactly right only for PUSHAD (8 × 4 bytes). PUSHA (8 × 2 bytes) decrements SP by 16 bytes, which is not offered.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `The instruction POPAD will pop ……… double words from the stack.`, o: [
          [`32`, `32 is the number of BYTES popped by POPAD (8 × 4); the question asks for double words, which is 8.`],
          [`8`, `Correct. EDI, ESI, EBP, ESP, EBX, EDX, ECX, EAX.`],
          [`16`, `16 is the number of bytes POPA pops (8 words × 2); POPAD pops 8 double words.`],
          [`4`, `4 is the size of one double word in bytes, not the count; POPAD pops 8 double words (EDI ... EAX).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `After each execution of the instruction POPA, the stack pointer is:`, o: [
          [`Incremented by 16`, `Correct. POPA pops 8 16-bit registers (DI, SI, BP, SP, BX, DX, CX, AX), so SP = SP + 8 × 2 = SP + 16 (L5, POP).`],
          [`Decremented by 16`, `POPA pops data off the stack, so SP increases; decrementing by 16 is what PUSHA does.`],
          [`Incremented by 8`, `POPA pops 8 registers, but each is 2 bytes and SP counts bytes: 8 × 2 = 16, not 8.`],
          [`Decremented by 8`, `Wrong direction and wrong size: POP operations increment SP, and POPA moves 16 bytes, not 8.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The instruction that pushes the contents of the specified register/memory location onto the stack is:`, o: [
          [`PUSHF`, `PUSHF pushes only the 16-bit FLAGS register, not a specified register or memory location.`],
          [`POPF`, `POPF pops the top of the stack INTO the FLAGS register; it does not store anything onto the stack.`],
          [`PUSH`, `Correct. PUSH decrements SP and stores the given register, memory operand (or immediate) at SS:[SP] (L5, PUSH).`],
          [`POP`, `POP does the opposite: it copies data from the top of the stack into a register or memory, then increments SP.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction POP BX:`, o: [
          [`Copies the 32-bit contents of BX to the stack`, `BX is a 16-bit register, and POP copies FROM the stack into BX; copying a register to the stack is PUSH.`],
          [`Copies 16 bits contents of the stack into BX`, `Correct. POP BX copies 2 bytes from SS:[SP] into BX, then increments SP by 2 (L5, The stack).`],
          [`Copies the contents of SS:[SP] to the stack`, `SS:[SP] already is the stack; POP copies that data from the stack into BX, not to the stack.`],
          [`None`, `Not "None": option b, copies 16 bits of the stack into BX, is exactly what POP BX does.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The stack is accessed using:`, o: [
          [`SP register`, `SP alone is only the offset of the top of stack; it must be combined with the segment SS to form SS:[SP].`],
          [`SS register`, `SS alone is only the segment base; the offset of the top of stack comes from SP, giving SS:[SP].`],
          [`SP and SS registers`, `Correct. Stack instructions use the address SS:[SP]: SS gives the stack segment, SP the offset of the top (L5, The stack).`],
          [`None of the mentioned`, `Not "None": the stack is accessed with both SS (segment) and SP (offset), option c.`]
        ], a: 2, src: `Revision sheet` },
        { q: `As data words are stored onto the stack, the stack pointer is:`, o: [
          [`Incremented by 1`, `Storing data on the stack (PUSH) decrements SP, and a word is 2 bytes, so incrementing by 1 is wrong twice.`],
          [`Decremented by 1`, `Direction is right, but a data word is 2 bytes, so SP decreases by 2, not 1.`],
          [`Incremented by 2`, `The stack grows down from high to low addresses, so storing a word decrements SP by 2; +2 is retrieving (POP).`],
          [`Decremented by 2`, `Correct. The stack grows down: storing a 2-byte word (PUSH) decrements SP by 2 (L5, PUSH).`]
        ], a: 3, src: `Revision sheet` },
        { q: `The stack pointer register contains:`, o: [
          [`Address of the stack segment`, `The address (base) of the stack segment is held in SS, not SP; SP holds the offset of the top within it.`],
          [`Pointer address of the stack segment`, `"Pointer address of the segment" is vague and is not the key; SP holds the offset of the top of stack inside the stack segment.`],
          [`Offset of address of stack segment`, `Correct. SP holds the offset (within the stack segment) of the top of the stack; the full address is SS:[SP] (L5, The stack).`],
          [`Data present in the stack segment`, `SP holds an offset address, not the data; the data is in memory at SS:[SP].`]
        ], a: 2, src: `Revision sheet` },
        { q: `POP operation:`, o: [
          [`Decrements SP`, `Decrementing SP is what PUSH does; POP reads SS:[SP] and then increments SP.`],
          [`Increments SP`, `Correct. POP copies the data at SS:[SP] into the operand, then increments SP by 2 or 4 (L5, POP).`],
          [`Decrements SS`, `POP never changes SS; only SP changes, and it is incremented.`],
          [`Increments SS`, `SS is not modified by POP; it is the stack pointer SP that is incremented.`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `The register or memory location that is pushed onto the stack at the end must be:`, o: [
          [`Popped off last`, `The stack is LIFO: the item pushed last sits on top, so it is popped FIRST, not last.`],
          [`Pushed off first`, `"Pushed off" is not an operation; data is removed from the stack by POP, and the last pushed item is popped first.`],
          [`Popped off first`, `Correct. The stack is LIFO (last in, first out): the register pushed last must be popped first (L5, The stack).`],
          [`Pushed off last`, `"Pushed off" is meaningless; removal is by POP, and by LIFO the last pushed item comes off first.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The number of PUSH and POP instructions in a subroutine must be:`, o: [
          [`PUSH greater than POP`, `Extra PUSHes leave data on top of the return address, so RET would pop that data and jump to a wrong address.`],
          [`POP greater than PUSH`, `Extra POPs would remove the return address (or caller data) pushed by CALL, so RET would return to a wrong place.`],
          [`Both equal`, `Correct. The stack also holds the subroutine's return address, so PUSH and POP counts must be equal for RET to find it on top (L5, The stack).`],
          [`Any kind`, `They cannot be any number: unbalanced PUSH/POP corrupts the stack, and RET would pop a wrong return address.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The SS register contains:`, o: [
          [`Address of the data segment`, `The data segment address is in DS; SS holds the stack segment.`],
          [`Address of the stack segment`, `Correct. SS holds the (base) address of the stack segment; SP holds the offset of the top within it (L5, The stack).`],
          [`Pointer address of the stack offset`, `The offset of the top of stack is in SP, not SS; SS holds the segment address.`],
          [`Data in the stack segment`, `SS is a segment register holding an address, not the data stored in the stack.`]
        ], a: 1, src: `Revision sheet` },
        { q: `While retrieving data from the stack, the stack pointer is:`, o: [
          [`Incremented by 1`, `Retrieving (POP) a 16-bit value moves 2 bytes, so SP increases by 2, not 1.`],
          [`Incremented by 2`, `Correct. Retrieving a word with POP copies 2 bytes from SS:[SP] and then increments SP by 2 (L5, POP).`],
          [`Decremented by 1`, `POP increments SP; decrementing (by 2, not 1) is what happens when storing with PUSH.`],
          [`Decremented by 2`, `Decrementing by 2 is PUSH (storing a word); retrieving with POP increments SP by 2.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The address of the instruction POPA will be:`, o: [
          [`SP:[SS]`, `SP:[SS] reverses the pair: the segment is written first and the offset in brackets, SS:[SP].`],
          [`SS:[BP]`, `SS:[BP] is used for BP-based data access (e.g. MOV AX, [BP]); stack instructions use the stack pointer, SS:[SP].`],
          [`SS:[SP]`, `Correct. The default memory address of all stack instructions, including POPA, is SS:[SP] (L5, The stack).`],
          [`SS:[SI]`, `SI is an index register with default segment DS; stack instructions use SS:[SP].`]
        ], a: 2, src: `Revision sheet` },
        { q: `PUSH AX copies the contents of AX onto the stack where:`, o: [
          [`SS:[SP-1]=AH, SS:[SP-2]=AL, SP=SP-2`, `Correct. PUSH AX stores the high byte AH at SS:[SP-1], the low byte AL at SS:[SP-2], then SP = SP - 2 (L5, PUSH).`],
          [`SS:[SP-1]=AL, SS:[SP-2]=AH, SP=SP-2`, `The bytes are swapped: the most-significant byte AH goes to SP-1 and the least-significant AL to SP-2.`],
          [`SS:[SP-1]=AH, SS:[SP-2]=AL, SP=SP+2`, `The byte placement is right, but PUSH decrements SP: SP = SP - 2, not SP + 2.`],
          [`SS:[SP+1]=AH, SS:[SP+2]=AL, SP=SP+2`, `Wrong direction: PUSH writes below SP (SP-1, SP-2) and decrements SP; SP+1/SP+2 and SP+2 describe moving upward.`]
        ], a: 0, src: `Revision sheet` },
        { q: `A stack pointer stores the ……..`, o: [
          [`Address of the bottom of the stack`, `SP points to the TOP of the stack (the most recently pushed value), not the bottom.`],
          [`Address of instruction being executed`, `The address of the instruction being executed relates to IP (CS:IP), not to the stack pointer.`],
          [`Address of instruction to be executed`, `The address of the next instruction to execute is held in IP; SP holds the address of the top of stack.`],
          [`Address of top of stack`, `Correct. SP holds the offset of the top of the stack, the most recently pushed value (L5, The stack).`]
        ], a: 3, src: `Revision sheet` },
        { q: `Which of the following is used to store subroutine calls?`, o: [
          [`Queue`, `A queue is FIFO, but nested calls must return in reverse order (LIFO), so return addresses are kept on the stack.`],
          [`Stack`, `Correct. CALL pushes the return address on the stack and RET pops it; LIFO order handles nested calls (L5, The stack; L8).`],
          [`Data register`, `A single data register cannot hold nested return addresses; the stack stores subroutine calls.`],
          [`None`, `Not "None": subroutine return addresses are stored on the stack.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The address of the instruction PUSH EBX will be SP:[SS].`, o: [
          [`True`, `The address is written segment first, offset in brackets: SS:[SP]. "SP:[SS]" reverses them, so the statement is false.`],
          [`False`, `Correct. The default address of PUSH (and all stack instructions) is SS:[SP], not SP:[SS] (L5, The stack).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `A PUSH increments the SS register, and a POP decrements it.`, o: [
          [`True`, `PUSH/POP change SP, not SS, and PUSH decrements.`],
          [`False`, `Correct. PUSH and POP never change SS; PUSH decrements SP and POP increments SP (L5, POP).`]
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
          [`Segment, segment`, `The 16/32-bit register receives an OFFSET address (the first word read, or doubleword for a 32-bit register), not a segment; only SS receives the segment address.`],
          [`Segment, offset`, `This is reversed: the register gets the offset (read first from memory) and SS gets the segment (the word read after it).`],
          [`Offset, segment`, `Correct. LDS, LES and LSS load a 16- or 32-bit register with an offset address and DS, ES or SS with a segment address; for LSS that is SS (L6, LDS, LES, LSS).`],
          [`Offset, offset`, `SS is a segment register, so it receives a SEGMENT address (the second word read), not an offset.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The instruction LSS DX, [SI] copies ….. into DX and ……into ……….`, o: [
          [`Segment, [SI], SS`, `DX receives the OFFSET (bytes [SI], [SI+1]), not a segment; the segment word from [SI+2], [SI+3] goes into SS.`],
          [`[SI], DS, SS`, `DX does not get the value [SI] as an address and DS is not involved as a destination; LSS puts the offset in DX and the segment in SS.`],
          [`Offset, segment, SS`, `Correct. LSS DX, [SI] reads 4 bytes from DS×10 + SI: the first word (offset) goes into DX and the second word (segment) into SS (L6, LDS, LES, LSS).`],
          [`Offset, DS, SS`, `DS is only used to compute the source address; LSS copies the second word (the segment) into SS, not "DS" into SS.`]
        ], a: 2, src: `Exam 2023/24 Second term` },
        { q: `LDS AX, [DI] loads AX with an offset address, and SS with a segment address.`, o: [
          [`True`, `LDS loads its segment word into DS, not SS. Loading SS is LSS, so the statement is false.`],
          [`False`, `Correct. LDS AX, [DI] loads AX with the offset and DS (not SS) with the segment address; SS is loaded only by LSS (L6, LDS, LES, LSS).`]
        ], a: 1, src: `Revision sheet` },
        { q: `LDS AX, [DI] will change the content of AX only.`, o: [
          [`True`, `LDS writes two registers: AX gets the first word and DS gets the second word, so AX is not the only one changed.`],
          [`False`, `Correct. LDS AX, [DI] changes both AX (offset from [DI], [DI+1]) and DS (segment from [DI+2], [DI+3]), not AX only (L6, LDS, LES, LSS).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `LDS AX, [DI] will change the content of DS.`, o: [
          [`True`, `Correct. DS gets the segment from [DI+2],[DI+3].`],
          [`False`, `The statement is true: LDS copies the second word read ([DI+2], [DI+3]) into DS, so DS does change.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `LES AX, [DI] copies [DI] and [DI+1] into AX and [DI+2] and [DI+3] into ES.`, o: [
          [`True`, `Correct. LES AX, [DI] copies the first two bytes [DI], [DI+1] into AX (offset) and the next two [DI+2], [DI+3] into ES (segment) (L6, LDS, LES, LSS).`],
          [`False`, `The statement is true: this is exactly how LES works, first word into the register, second word into ES.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `LCS instruction loads any 16-bit or 32-bit register with an offset address, and SS with a segment address.`, o: [
          [`True`, `There is no LCS, and the description is of LSS.`],
          [`False`, `Correct. There is no LCS instruction (CS cannot be loaded this way), and the description given belongs to LSS (L6, LDS, LES, LSS).`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `DS=A000H, DI=200H and the bytes at the address are B2, 1A, 00, 3C. After LES BX, [DI]:`, o: [
          [`BX = B21A, ES = 003C`, `This reads the bytes high-first. Memory is little-endian: [A0200]=B2 is the LOW byte, so BX = 1AB2 and ES = 3C00.`],
          [`BX = 1AB2, ES = 3C00`, `Correct. Address = A0000 + 200 = A0200. [A0200]=B2, [A0201]=1A → BX = 1AB2; [A0202]=00, [A0203]=3C → ES = 3C00 (L6, Lecture example LES BX, [DI]).`],
          [`BX = 1AB2, DS = 3C00`, `The BX value is right, but LES loads the segment word into ES, not DS; DS stays A000H.`],
          [`BX = 3C00, ES = 1AB2`, `The words are swapped: the first word (lower addresses) goes into BX and the second word into ES, so BX = 1AB2, ES = 3C00.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `The memory address used by LES BX, [DI] with DS=A000H and DI=200H is:`, o: [
          [`A0200`, `Correct. The source address uses DS: DS×10 + DI = A0000 + 200 = A0200 (L6, Lecture example LES BX, [DI]).`],
          [`A200`, `A200 comes from adding DS + DI without multiplying DS by 10H. The physical address is A0000 + 200 = A0200.`],
          [`2200`, `2200 is ES×10 + DI = 2000 + 200. The source of LES is in the data segment, so DS is used: A0000 + 200 = A0200.`],
          [`A2000`, `A2000 comes from shifting DI instead of only DS (A0000 + 2000). Only the segment is multiplied by 10H: A0000 + 200 = A0200.`]
        ], a: 0, src: `Lecture 6 example` },
        { q: `Which is faster: MOV BX, OFFSET LIST or LEA BX, LIST?`, o: [
          [`LEA, because it is a dedicated instruction`, `LEA is computed by the microprocessor at run time.`],
          [`MOV BX, OFFSET LIST, because the assembler calculates the offset`, `Correct. MOV BX, OFFSET LIST is faster because the assembler calculates the offset of LIST beforehand, while LEA's address is calculated by the microprocessor (L6, LEA vs OFFSET).`],
          [`They take exactly the same time`, `They do not take the same time: the lecture says the microprocessor takes longer to execute LEA BX, LIST than MOV BX, OFFSET LIST.`],
          [`LEA, because it does not access memory`, `Neither reads memory data; OFFSET is still faster.`]
        ], a: 1 },
        { q: `LEA BX, [DI] with DI = 0300H and the word at DS:0300 = 1234H gives:`, o: [
          [`BX = 1234H`, `1234H is the DATA stored at DS:0300, which is what MOV BX, [DI] loads. LEA loads the address (offset) itself, 0300H.`],
          [`BX = 0300H`, `Correct. LEA computes the source operand like MOV but loads the offset address itself, so BX = DI = 0300H, not the data 1234H (L6, LEA).`],
          [`BX = DS×10 + 300`, `DS×10 + 300 is the physical address; LEA loads only the 16-bit offset (0300H) into BX, not the segment-based address.`],
          [`BX unchanged`, `LEA always writes its destination: BX receives the offset 0300H.`]
        ], a: 1 },
        { q: `With DS=1000H, DI=1000H and bytes 7A, 12, 00, 30, LDS BX, [DI] gives:`, o: [
          [`BX = 127A, DS = 3000`, `Correct. Address = DS×10 + DI = 10000 + 1000 = 11000. [11000]=7A, [11001]=12 → BX = 127A; [11002]=00, [11003]=30 → DS = 3000 (L6, Revision LDS BX, [DI]).`],
          [`BX = 7A12, DS = 0030`, `Little-endian: the first byte is the low byte.`],
          [`BX = 127A, ES = 3000`, `BX = 127A is right, but LDS puts the segment word into DS, not ES; ES is loaded by LES.`],
          [`BX = 6F2A, DS = 3000`, `6F2A is BX's old value. LDS overwrites BX with the first word read from memory, 127A.`]
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
          [`ES:[DI], AX`, `ES:[DI] is the destination side used by STOS and INS. LODS always reads its source from DS:[SI].`],
          [`DS:[SI], AX`, `Correct. LODSW loads a string word from DS:[SI] into AX (AL from [SI], AH from [SI+1]), then SI changes by 2 (L7, String instruction summary).`],
          [`DS:[SI], AL`, `DS:[SI] is the right source, but AL is the LODSB destination; LODSW loads a word, so the register is AX.`],
          [`ES:[DI], BX`, `LODS never uses ES:[DI] or BX: it reads DS:[SI] into the accumulator (AL, AX or EAX).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `LODS instruction copies strings from memory location ……. into AL, AX, EAX.`, o: [
          [`ES:[SI]`, `SI is the right pointer but the wrong segment: source strings are in the data segment, DS:[SI], not ES.`],
          [`ES:[DI]`, `ES:[DI] is the destination used by STOS and INS; LODS reads from DS:[SI].`],
          [`DS:[SI]`, `Correct. LODS copies a byte, word or double word from DS:[SI] into AL, AX or EAX (L7, Key rules).`],
          [`DS:[DI]`, `DS is the right segment but DI is the destination pointer; LODS uses SI, so the source is DS:[SI].`]
        ], a: 2, src: `Exam 2023/24 Second term` },
        { q: `STOS instruction copies …….. from AL, AX and EAX into a memory location.`, o: [
          [`Numeric values`, `The revision key says STOS copies STRINGS from AL/AX/EAX into memory; "numeric values" is not the lecture wording.`],
          [`Strings`, `Correct. STOS is a string instruction: it stores string data from AL, AX or EAX into ES:[DI] (revision key; L7, String instruction summary).`],
          [`Both a and b`, `The key gives only "strings": STOS is defined as storing strings from the accumulator, so "both" is not accepted.`],
          [`None`, `Not "None": STOS stores strings from AL, AX or EAX into ES:[DI], and "Strings" is listed.`]
        ], a: 1, src: `Revision sheet` },
        { q: `………… loads a byte of a string in memory into AL.`, o: [
          [`LODSB`, `Correct. LODSB (load string byte) copies one byte from DS:[SI] into AL and changes SI by 1 (L7, String instruction summary).`],
          [`LODSW`, `LODSW loads a WORD (two bytes) into AX, not a single byte into AL.`],
          [`STOSB`, `STOSB goes the other way: it stores AL into memory at ES:[DI], it does not load AL.`],
          [`STOSW`, `STOSW stores AX into ES:[DI]; it writes memory rather than loading a byte into AL.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The instructions used for reading an input port and writing an output port respectively are:`, o: [
          [`MOV, XCHG`, `MOV copies between registers and memory and XCHG swaps values; neither accesses I/O ports. Ports use IN and OUT.`],
          [`IN, OUT`, `Correct. IN reads data from an input port and OUT writes data to an output port (L7, Key rules).`],
          [`IN, MOV`, `IN is right for reading, but MOV cannot write to an I/O port; writing an output port is OUT.`],
          [`MOV, IN`, `MOV cannot read a port and IN is for reading, not writing; the correct order is IN then OUT.`]
        ], a: 1, src: `Revision sheet` },
        { q: `After running the instruction OUTSD with D=1:`, o: [
          [`DI = DI - 2`, `OUTS reads its source from DS:[SI], so SI changes, not DI; and a double word step is 4, not 2.`],
          [`SI = SI - 2`, `SI and the minus sign are right, but OUTSD moves a double word (4 bytes), so SI = SI - 4. Minus 2 is OUTSW.`],
          [`SI = SI - 4`, `Correct. OUTSD sends 4 bytes from DS:[SI]; with D=1 the pointer decrements, so SI = SI - 4 (L7, String instruction summary).`],
          [`DI = DI + 2`, `Two mistakes: OUTS uses SI (not DI), and D=1 decrements by 4 (not increments by 2).`]
        ], a: 2, src: `Exam 2022/23 Summer` },
        { q: `The instruction STOSW, D=1: store string word where ES:[DI] = AX; DI = DI + 2.`, o: [
          [`True`, `ES:[DI] = AX is right, but D=1 means the negative direction, so DI = DI - 2, not + 2.`],
          [`False`, `Correct. STOSW stores AX at ES:[DI], but D=1 decrements the pointer: DI = DI - 2. The +2 would need D=0 (L7, Key rules).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `LODSW loads two bytes of a string from memory into AX.`, o: [
          [`True`, `Correct. LODSW = load string word: two bytes from DS:[SI] go into AX (low byte into AL, high into AH) (L7, String instruction summary).`],
          [`False`, `The statement is true: LODSW loads a word, i.e. two bytes, from DS:[SI] into AX.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `LODSW affects the zero flag.`, o: [
          [`True`, `LODS only copies data into the accumulator and updates SI; it does not affect any flags, ZF included.`],
          [`False`, `Correct. LODS/STOS do not affect the flags, so LODSW leaves ZF unchanged (L7, Key rules).`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `String instructions change the value of the direction flag D.`, o: [
          [`True`, `String instructions only READ D to decide whether SI/DI go up or down; D is changed by CLD and STD.`],
          [`False`, `Correct. String instructions use D but do not change it; only CLD (D=0) and STD (D=1) change it (L7, Key rules).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `String manipulation instructions are not affected by the direction flag D.`, o: [
          [`True`, `They ARE affected: D decides the direction, D=0 increments SI/DI and D=1 decrements them.`],
          [`False`, `Correct. The direction flag decides the direction of string instructions: D=0 positive (SI/DI incremented), D=1 negative (decremented) (L7, Key rules).`]
        ], a: 1, src: `Revision sheet` },
        { q: `String manipulation instructions include LODS, MOV and STOS.`, o: [
          [`True`, `Plain MOV is not a string instruction (MOVS is). The string instructions in the lecture are LODS, STOS, INS and OUTS.`],
          [`False`, `Correct. LODS and STOS are string instructions, but plain MOV is not (MOVS is), so the list is wrong (L7, Key rules).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `String manipulation instructions include LODS, MOV, INS and STOS.`, o: [
          [`True`, `LODS, INS and STOS are string instructions, but MOV is not (only MOVS is), so the statement is false.`],
          [`False`, `Correct. MOV is an ordinary data transfer instruction, not a string instruction; the list would need MOVS instead (L7, Key rules).`]
        ], a: 1, src: `Revision sheet` },
        { q: `LODS loads AL, AX, EAX with a byte, two bytes or four bytes of data stored at DS:[DI].`, o: [
          [`True`, `LODS reads from DS:[SI], not DS:[DI]; DI is the destination pointer used with ES by STOS and INS.`],
          [`False`, `Correct. LODS loads AL, AX or EAX from DS:[SI]; the statement says DS:[DI], which is wrong (L7, String instruction summary).`]
        ], a: 1, src: `Revision sheet` },
        { q: `DS=1000, SI=1000, D=0, [SI]=AB, [SI+1]=CD. After LODSW:`, o: [
          [`AX = ABCD, SI = 1002`, `ABCD reads the bytes in the wrong order: the first byte [SI]=AB goes into AL (low), CD into AH, so AX = CDAB.`],
          [`AX = CDAB, SI = 1002`, `Correct. Address = 10000 + 1000 = 11000. AL = [11000] = AB, AH = [11001] = CD → AX = CDAB; D=0 so SI = 1000 + 2 = 1002 (L7, Example LODSW).`],
          [`AX = CDAB, SI = 0FFE`, `AX = CDAB is right, but D=0 is the positive direction, so SI is incremented to 1002, not decremented to 0FFE.`],
          [`AL = AB, SI = 1001`, `Loading one byte and stepping SI by 1 is LODSB; LODSW loads a word into AX and adds 2 to SI.`]
        ], a: 1, src: `Lecture 7 example` },
        { q: `DS=1000, DI=100, D=1, ES=200. The memory address for INSD is:`, o: [
          [`11000`, `11000 would be DS×10 + 1000, but INS writes to ES:[DI] and DI is 100: ES×10 + DI = 2000 + 100 = 2100.`],
          [`2100`, `Correct. INS writes the input to ES:[DI]: ES×10 + DI = 2000 + 100 = 2100; DS is not used (L7, Example INSD).`],
          [`10100`, `10100 is DS×10 + DI. INS always writes to the extra segment, so ES is used: 2000 + 100 = 2100.`],
          [`300`, `300 comes from ES + DI = 200 + 100 without multiplying ES by 10H; the address is 2000 + 100 = 2100.`]
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
          [`Software interrupt`, `Correct. Software interrupts are special instructions (INT) that transfer control to a predefined ISR, so an interrupt caused by executing an instruction is a software interrupt (L8, Interrupts).`],
          [`External interrupt`, `An external interrupt comes from a signal outside the CPU (a device on an interrupt pin), not from executing an instruction in the program.`],
          [`Hardware interrupt`, `Hardware interrupts are signals given to the processor by devices; an interrupt produced by an INT instruction is a software interrupt.`],
          [`None of the mentioned`, `Not "None": the lecture says interrupts produced by special instructions (INT) are software interrupts.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `An interrupt breaks the execution of instructions and diverts its execution to:`, o: [
          [`Interrupt service routine`, `Correct. An interrupt breaks the normal sequence and transfers control to the Interrupt Service Routine (ISR); afterwards the CPU returns to the interrupted program (L8, Interrupts).`],
          [`Counter word register`, `A counter word register is not where an interrupt sends execution; control is transferred to a routine, the Interrupt Service Routine.`],
          [`Execution unit`, `The execution unit is the part of the CPU that executes instructions; it is not a destination. The interrupt diverts execution to the ISR.`],
          [`Control unit`, `The control unit sequences instruction steps all the time; an interrupt transfers control to a program, the Interrupt Service Routine.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `While the CPU is executing a program, if an interrupt occurs it:`, o: [
          [`Follows the next instruction in the program`, `The CPU does not just continue with the next instruction: it saves its state on the stack and jumps to the ISR first.`],
          [`Jumps to instruction in other registers`, `Instructions are not stored in registers; the CPU loads PC with the ISR's start address and executes the routine.`],
          [`Breaks the normal sequence of execution of instructions`, `Correct. The lecture defines an interrupt as transferring control to a higher-priority program (the ISR), which breaks the normal sequence of execution (L8, Interrupts).`],
          [`Stops executing the program`, `The program is not stopped: after the ISR's return instruction, the CPU goes back to the point where it was interrupted.`]
        ], a: 2, src: `Revision sheet` },
        { q: `If an interrupt request given to an input pin cannot be disabled by any means, the pin is called:`, o: [
          [`Maskable interrupt`, `A maskable interrupt CAN be blocked by an interrupt mask bit, so it is the opposite of a request that cannot be disabled.`],
          [`Non-maskable interrupt`, `Correct. A non-maskable interrupt (NMI) cannot be masked or ignored by any means; it is used for high-priority events like memory parity errors (L8, Interrupts).`],
          [`Both`, `An interrupt cannot be both: maskable ones can be blocked, and a request that can never be disabled is only the non-maskable type.`],
          [`None`, `Not "None": an interrupt input that can never be disabled is by definition a non-maskable interrupt (NMI).`]
        ], a: 1, src: `Revision sheet` },
        { q: `Interrupts can be classified into:`, o: [
          [`Software and hardware`, `Software/hardware is one valid classification, but the lecture also classifies interrupts as maskable/non-maskable and vectored/non-vectored.`],
          [`Maskable and non-maskable`, `Maskable/non-maskable is one classification, but software/hardware and vectored/non-vectored are also given, so "All" is right.`],
          [`Vectored and non-vectored`, `Vectored/non-vectored is one classification, but the lecture also gives software/hardware and maskable/non-maskable.`],
          [`All of the mentioned`, `Correct. The lecture classifies interrupts three ways: software vs hardware, maskable vs non-maskable, and vectored vs non-vectored (L8, Interrupts).`]
        ], a: 3, src: `Revision sheet` },
        { q: `…… instructions are used when some instructions must be executed a number of times.`, o: [
          [`Jump`, `A jump transfers control once to another place; repeating a block a set number of times, with CX as counter, is what LOOP does.`],
          [`Loop`, `Correct. LOOP repeats a block a specific number of times: it decrements CX and jumps back to the label while CX ≠ 0 (L8, LOOP).`],
          [`Shift`, `Shift instructions move bits left or right inside an operand (SHL, SHR, SAR); they do not repeat instructions.`],
          [`Rotate`, `Rotate instructions (ROL, ROR, RCL, RCR) move bits around inside an operand; they do not repeat a block of code.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Non-maskable interrupts are those that cannot be blocked.`, o: [
          [`True`, `Correct. Non-maskable interrupts (NMI) cannot be masked, blocked or ignored; they have absolute priority (L8, Interrupts).`],
          [`False`, `The statement is true: it is the lecture's definition. It is the maskable interrupts that can be blocked by a mask bit.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Registers IP and CS are modified after short and near JMP instructions.`, o: [
          [`True`, `Short and near jumps change IP only. (A student's mark on the 2024/25 paper said True.)`],
          [`False`, `Correct. Short and near jumps stay in the same code segment and change IP only; only the far jump loads both CS and IP (L8, Unconditional jumps).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `Registers IP and CS are modified after any JMP instruction (short, near or far).`, o: [
          [`True`, `Short and near jumps change only IP; CS changes only in a far jump, so "any JMP" makes the statement false.`],
          [`False`, `Correct. Only the far jump changes CS and IP; short and near jumps stay in the same segment and change IP only (L8, Unconditional jumps).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `The far jump is a six bytes instruction.`, o: [
          [`True`, `The far jump is FIVE bytes: opcode + 2-byte offset + 2-byte segment. Short is 2 bytes and near is 3.`],
          [`False`, `Correct. A far jump is 5 bytes: the opcode, then the offset (bytes 2 and 3) and the segment (bytes 4 and 5) (L8, The three jump types).`]
        ], a: 1, src: `Exam 2023/24 Second term` },
        { q: `The fourth and fifth bytes of the near jump define the segment of the jump address.`, o: [
          [`True`, `A near jump has only 3 bytes; that describes the far jump.`],
          [`False`, `Correct. A near jump is only 3 bytes (opcode + 2-byte displacement); bytes 4 and 5 giving the segment belong to the far jump (L8, The three jump types).`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `In short and far jumps, IP is modified before executing the jump instruction.`, o: [
          [`True`, `The jump itself loads the new IP when it executes.`],
          [`False`, `Most likely intended answer: IP gets its new value as the result of executing the jump. (Doubtful item: the CPU does advance IP past the instruction during fetch.)`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `ISR is a program responsible for handling (multiple) interrupts.`, o: [
          [`True`, `Correct. The Interrupt Service Routine is the routine executed when an interrupt (or multiple interrupts) occurs (L8, Interrupts).`],
          [`False`, `The statement is true: the lecture defines the ISR as the routine executed on an interrupt or multiple interrupts.`]
        ], a: 0, src: `Revision sheet` },
        { q: `The first step of interrupt handling is to save the PC content and current state in the heap.`, o: [
          [`True`, `The PC and current state are saved in the STACK, not the heap; RET then gets them back from the stack.`],
          [`False`, `Correct. Step 1 saves the PC content and the current state (flags, registers) in the STACK, not the heap (L8, Interrupts).`]
        ], a: 1, src: `Revision sheet` },
        { q: `Non-vectored interrupts are those in which the vector address is not predefined.`, o: [
          [`True`, `Correct. Non-vectored interrupts have a vector address that is not predefined; vectored ones have a fixed vector address (L8, Interrupts).`],
          [`False`, `The statement is true: it is the lecture definition. Vectored interrupts are the ones with a fixed, predefined vector address.`]
        ], a: 0, src: `Revision sheet` },
        { q: `LOOP is an instruction based on the AX (or AL) register.`, o: [
          [`True`, `LOOP uses CX automatically as its counter (CX = CX − 1, jump if CX ≠ 0); AX and AL play no part in it.`],
          [`False`, `Correct. LOOP is based on CX: it decrements CX and jumps to the label while CX ≠ 0; AX/AL is not involved (L8, LOOP).`]
        ], a: 1, src: `Revision sheet` },
        { q: `The directive that marks the end of an assembly language program is:`, o: [
          [`ENDS`, `ENDS marks the end of a logical segment, not of the whole program; the program ends with END.`],
          [`END`, `Correct. END marks the end of the assembly program; ENDS ends a segment and ENDP ends a procedure (L8, Procedures).`],
          [`ENDS & END`, `Only END ends the program; ENDS closes a logical segment, so naming both is wrong.`],
          [`None`, `Not "None": the END directive marks the end of an assembly language program.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The directive that marks the end of a logical segment is:`, o: [
          [`ENDS`, `Correct. ENDS (end segment) marks the end of a logical segment; END ends the whole program (L8, Procedures).`],
          [`END`, `END marks the end of the whole program, not of one logical segment; segments close with ENDS.`],
          [`ENDS & END`, `Only ENDS closes a logical segment; END ends the program, so "ENDS & END" is wrong.`],
          [`None`, `Not "None": the ENDS directive marks the end of a logical segment.`]
        ], a: 0, src: `Revision sheet` },
        { q: `CS=2000, IP=300, bytes after JMP: 1C, 20, A0, 2D. The near jump address is:`, o: [
          [`2031C`, `That is the short jump (1 byte displacement).`],
          [`2231C`, `Correct. Near jump: IP = 300 + 201C (bytes [CS+2][CS+1]) = 231C, so address = 20000 + 231C = 2231C (L8, Revision Q13).`],
          [`2FA1C`, `2FA1C is the FAR jump (segment 2DA0 → 2DA00 + offset 201C). A near jump stays in CS = 2000.`],
          [`2201C`, `2201C comes from 20000 + 201C, forgetting to add IP = 300: the course formula is IPnew = IP + displacement = 231C.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `CS=2000, IP=300, bytes after JMP: 1C, 20, A0, 2D. The far jump address is:`, o: [
          [`2FA1C`, `Correct. Far jump: offset = bytes 2,3 = 201C, segment = bytes 4,5 = 2DA0 → 2DA00 + 201C = 2FA1C (L8, Revision Q13).`],
          [`2DA00`, `2DA00 is only the segment 2DA0 × 10; the offset 201C (bytes 2 and 3) must be added: 2DA00 + 201C = 2FA1C.`],
          [`A2D1C`, `A2D1C does not follow the rule: the bytes are little-endian, so the segment from bytes A0, 2D is 2DA0 (not A02D) and the offset from 1C, 20 is 201C; 2DA00 + 201C = 2FA1C.`],
          [`2231C`, `2231C is the NEAR jump (20000 + 300 + 201C). A far jump takes its segment from bytes 4 and 5.`]
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
          [`MOV`, `MOV is the basic data transfer instruction: it copies the source into the destination, so it is a copy/transfer instruction.`],
          [`PUSH`, `PUSH is a data transfer instruction: it copies a register or memory word onto the top of the stack.`],
          [`DAS`, `Correct. DAS (decimal adjust after subtraction) is arithmetic.`],
          [`POP`, `POP is a data transfer instruction: it copies the word on top of the stack into a register or memory.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Which of the following is the implementation of AX = (-val2 + BX) - val4?`, o: [
          [`mov ax, val2 / neg ax / add ax, bx / sub ax, val4`, `Correct. MOV AX, val2 then NEG AX gives −val2, ADD AX, BX gives −val2 + BX, and SUB AX, val4 subtracts val4 (L9, Lab formula programs).`],
          [`mov ax, val3 / neg ax / add ax, bx / sub ax, val4`, `It loads val3 instead of val2, so it computes (−val3 + BX) − val4, not the required expression.`],
          [`mov ax, val2 / neg ax / add ax, bx / add ax, val4`, `The last step ADDs val4, giving (−val2 + BX) + val4; the formula needs SUB AX, val4.`],
          [`mov ax, val2 / add ax / add ax, bx / sub ax, val4`, `"add ax" with no source is not a valid instruction, and without NEG AX val2 is never negated.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Which of the following is not an arithmetic instruction?`, o: [
          [`INC`, `INC adds 1 to its operand (dest + 1), so it is an arithmetic instruction.`],
          [`CMP`, `CMP is arithmetic: it computes a − b only to set the flags, without storing the result.`],
          [`DEC`, `DEC subtracts 1 from its operand (dest − 1), so it is an arithmetic instruction.`],
          [`ROL`, `Correct. ROL is a rotate instruction: it moves bits left with the MSB going to CF and bit 0; the lab notes say rotates are not arithmetic (L9, Rotate instructions).`]
        ], a: 3, src: `Revision sheet` },
        { q: `Which is not an operand?`, o: [
          [`Variable`, `A variable (defined with DB, DW, …) names a memory location, so it can be used as an operand, e.g. MOV AX, val2.`],
          [`Assembler`, `Correct. Operands are registers, memory locations (variables) or immediates; the assembler is the program that translates the code, not part of an instruction (L1, Assembly language and the assembler).`],
          [`Register`, `Registers such as AX or BX are the most common operands, e.g. ADD AX, BX.`],
          [`Memory location`, `A memory location is a valid operand, e.g. MOV AX, [BX] or ADD AX, val4.`]
        ], a: 1, src: `Revision sheet` },
        { q: `INC destination increments the content of the destination by:`, o: [
          [`1`, `Correct. INC dest adds exactly 1 to the destination (dest = dest + 1) (L9, Arithmetic instructions).`],
          [`2`, `INC always adds 1, whatever the operand size; adding 2 would need ADD dest, 2 (or INC twice).`],
          [`8`, `INC adds 1, not 8; 8 is the number of bits in a byte, unrelated to the increment.`],
          [`1024`, `INC adds 1; 1024 has nothing to do with it (that would need ADD dest, 1024).`]
        ], a: 0, src: `Revision sheet` },
        { q: `The instruction that supports addition when a carry exists is:`, o: [
          [`ADD`, `ADD computes dest + src and ignores the incoming CF; adding the carry from a previous addition needs ADC.`],
          [`ADC`, `Correct. ADC computes dest + src + CF, so it supports addition when a carry exists (L9, Arithmetic instructions).`],
          [`ADD & ADC`, `Only ADC adds the carry flag (dest + src + CF); plain ADD ignores it.`],
          [`None`, `Not "None": ADC (add with carry) is exactly the instruction for addition with a carry.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The instruction that enables subtraction with borrow is:`, o: [
          [`DEC`, `DEC just subtracts 1 from its operand; it does not use a borrow from a previous subtraction.`],
          [`SUB`, `SUB computes dest − src without the borrow; subtraction with borrow (− CF) is SBB.`],
          [`SBB`, `Correct. SBB computes dest − src − CF, subtraction with borrow (L9, Arithmetic instructions).`],
          [`None`, `Not "None": SBB (subtract with borrow) does exactly this.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The flag that acts as the borrow flag in SBB is the:`, o: [
          [`Direction flag`, `The direction flag controls whether string instructions increment or decrement SI/DI; it is not a borrow.`],
          [`Carry flag`, `Correct. SBB computes dest − src − CF: the carry flag acts as the borrow flag (L9, Arithmetic instructions).`],
          [`Parity flag`, `The parity flag reports whether the result has an even number of 1 bits; it is not used as a borrow.`],
          [`Trap flag`, `The trap flag enables single-step mode for debugging; SBB uses the carry flag as the borrow.`]
        ], a: 1, src: `Revision sheet` },
        { q: `The flag that acts as borrow flag in the subtraction-with-borrow instruction is the carry flag CF.`, o: [
          [`True`, `Correct. SBB = dest − src − CF, so the carry flag CF is the borrow flag (L9, Arithmetic instructions).`],
          [`False`, `The statement is true: in SBB the carry flag acts as the borrow flag (dest − src − CF).`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `MOV AL, 5 then NOT AL gives AL =`, o: [
          [`11111010b (FAh)`, `Correct. NOT is the 1's complement: every bit is inverted, 00000101 → 11111010 = FAh (L9, NOT, NEG, TEST).`],
          [`11111011b (FBh)`, `FBh is NEG AL (2's complement: invert then add 1 = −5); NOT only inverts, giving FAh.`],
          [`00000101b`, `00000101 is AL unchanged; NOT inverts every bit, giving 11111010.`],
          [`10000101b`, `10000101 flips only the sign bit; NOT inverts ALL eight bits: 11111010.`]
        ], a: 0 },
        { q: `MOV AX, 5 / MOV DX, 0 / MOV CX, 2 / DIV CX. The result is:`, o: [
          [`AX = 2, DX = 1`, `Correct. DIV CX divides DX:AX = 5 by 2: quotient 2 goes to AX, remainder 1 to DX (L9, MUL and DIV rules).`],
          [`AX = 1, DX = 2`, `Quotient and remainder are swapped: 5 ÷ 2 = 2 remainder 1, and DIV puts the quotient in AX and the remainder in DX.`],
          [`AX = 2.5`, `DIV is integer division: registers hold whole numbers, so 5 ÷ 2 gives quotient 2 in AX and remainder 1 in DX.`],
          [`CX = 2, AX = 5`, `DIV CX leaves CX unchanged but overwrites AX with the quotient (2) and DX with the remainder (1).`]
        ], a: 0 },
        { q: `MOV AL, 11110000b / ROL AL, 1 gives:`, o: [
          [`AL = 11100001b, CF = 1`, `Correct. ROL shifts every bit left; the old MSB (1) goes to both CF and bit 0: 11110000 → 11100001, CF = 1 (L9, Rotate instructions).`],
          [`AL = 11100000b, CF = 1`, `11100000 is SHL: bit 0 filled with 0 and the MSB lost to CF. ROL copies the MSB into bit 0 as well.`],
          [`AL = 01111000b, CF = 0`, `01111000, CF = 0 is ROR (the lowest bit goes to CF and the MSB). ROL rotates to the left.`],
          [`AL = 11100001b, CF = 0`, `The AL value is right, but CF receives the old MSB, which is 1, so CF = 1.`]
        ], a: 0 },
        { q: `MOV DL, 3Fh / ROL DL, 4 gives:`, o: [
          [`DL = F3h, CF = 1`, `Correct. ROL by 4 exchanges the two nibbles: 0011 1111 → 1111 0011 = F3h; CF = the last bit rotated, 1 (L9, Rotate instructions).`],
          [`DL = F0h, CF = 1`, `F0h is SHL DL, 4: the low nibble is filled with 0s and the 3 is lost. ROL brings those bits back into the low end.`],
          [`DL = 03h, CF = 1`, `03h is SHR DL, 4: the low nibble F is shifted out and lost. A rotate keeps all bits.`],
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
          { type: `mcq`, q: `……. contains the address of an instruction to be fetched.`, o: [`PC`, `MAR`, `IR`, `MBR`], a: 0, why: `PC holds the address of the instruction to be fetched (L2).`, ow: [null, `MAR holds the address of a memory location (data being read or written), not specifically the address of the next instruction to fetch; that is the PC.`, `IR holds the instruction most recently fetched (the instruction itself), not the address of the next one to fetch.`, `MBR holds a word of data to be written to memory or the word most recently read, not an instruction address.`] },
          { type: `mcq`, q: `The C bit in the EFLAGS register refers to:`, o: [`compute bit`, `control bit`, `carry bit`, `none of the mentioned`], a: 2, why: `In EFLAGS the C bit is the carry flag CF, set when the result of an unsigned operation is too large to fit in the destination (L2, EFLAGS bits).`, ow: [`There is no "compute bit" in EFLAGS; the C bit is the carry flag, set when an unsigned result is too large for the destination.`, `The control flags of EFLAGS are bits such as DF (direction); the letter C itself names the carry flag, a status flag.`, null, `Not "None": the carry bit is listed, and CF is exactly what the C bit of EFLAGS means.`] },
          { type: `mcq`, q: `……uses binary signals to synchronize the actions of all devices attached to the system bus.`, o: [`Data bus`, `Control bus`, `Address bus`, `none of the mentioned`], a: 1, why: `The lecture defines the control bus as the bus that uses binary signals to synchronize the actions of all devices attached to the system bus (L1, Buses).`, ow: [`The data bus transfers instructions and data between the CPU and memory; it does not synchronize the devices.`, null, `The address bus holds the addresses of instructions and data during CPU-memory transfers; synchronizing with binary signals is the control bus.`, `Not "None": the control bus matches the lecture definition word for word.`] },
          { type: `mcq`, q: `…… is high speed temporary storage area built into the CPU.`, o: [`A processor`, `ALU`, `A bus`, `A Register`], a: 3, why: `A register is a high speed temporary storage area built into the CPU; the CPU has a limited number of them (L1, Registers; L2).`, ow: [`The processor (CPU) is the whole unit that contains the registers, ALU, CU and clock; it is not itself a storage area.`, `The ALU performs arithmetic and logic operations (ADD, AND, OR, NOT); it does not store data.`, `A bus is a group of parallel wires transferring data between parts of the computer, outside the CPU; it is not storage.`, null] },
          { type: `mcq`, q: `Which of the following instructions is not valid?`, o: [`MOV AX, BX`, `MOV DS, AX`, `MOV [AX], [5000H]`, `PUSH AX`], a: 2, why: `MOV [AX], [5000H] moves memory to memory, which is not allowed except for string instructions; [AX] is also not a valid 16-bit pointer (L3, Register addressing restrictions).`, ow: [`MOV AX, BX is valid register addressing: both operands are 16-bit general registers.`, `MOV DS, AX is valid: a segment register can be loaded from a general register (only CS cannot be changed, and segment-to-segment moves are banned).`, null, `PUSH AX is valid: it decrements SP by 2 and stores AX at SS:[SP].`] },
          { type: `mcq`, q: `After each execution of the instruction PUSH EAX, the stack pointer is:`, o: [`incremented by 2`, `decremented by 2`, `incremented by 4`, `decremented by 4`], a: 3, why: `PUSH first decrements SP by the operand size, then stores the operand; EAX is 32 bits = 4 bytes, so SP = SP - 4 (L5, PUSH).`, ow: [`PUSH never increments SP (the stack grows down), and 2 is the size of a 16-bit register like AX, not EAX.`, `Decrementing by 2 is PUSH AX (16 bits); EAX is 32 bits, so SP drops by 4.`, `Incrementing SP by 4 is what POP EAX does; PUSH decrements it.`, null] },
          { type: `mcq`, q: `LODSW instruction copies strings from ……into register……`, o: [`ES:[DI], AX`, `DS:[SI], AX`, `DS:[SI], AL`, `ES:[DI], BX`], a: 1, why: `LODS reads DS:[SI]; the W form loads AX (L7).`, ow: [`ES:[DI] is the destination used by STOS and INS; LODS reads its source from DS:[SI].`, null, `DS:[SI] is right, but the W (word) form loads 16 bits into AX; AL is used by LODSB.`, `LODS never loads BX and never reads ES:[DI]; LODSW copies DS:[SI] into AX.`] },
          { type: `mcq`, q: `If SS=1300, SP=100, CX=CD01 then after executing the instruction POP ECX the following is correct:`, o: [`SS = 1304`, `SP = 98`, `SS = 1298`, `SP = 104`], a: 3, why: `POP increments SP by 4 for a 32-bit register; SS never changes (L5).`, ow: [`PUSH and POP never change SS; only SP changes. Adding 4 to SS confuses the segment with the stack pointer.`, `SP = 98 would be the result of a 16-bit PUSH (SP - 2 in decimal); POP increments SP, and ECX is 4 bytes.`, `SS = 1298 changes the segment and moves down; POP never touches SS and moves SP up by 4 (SP = 100 + 4 = 104).`, null] },
          { type: `mcq`, q: `If the interrupt is generated by the execution of an interrupt instruction then it is ……`, o: [`software interrupt`, `external interrupt`, `hardware interrupt`, `none of the mentioned`], a: 0, why: `Software interrupts are special instructions (INT) that transfer control to a predefined ISR, so an interrupt caused by executing an instruction is a software interrupt (L8, Interrupts).`, ow: [null, `External interrupts come from devices outside the CPU as signals, not from executing an interrupt instruction.`, `Hardware interrupts are signals given to the processor by devices; an interrupt caused by an INT instruction is a software interrupt.`, `Not "None": the lecture names this case directly, a software interrupt.`] },
          { type: `mcq`, q: `The segment register of the instruction MOV [SI][BP], BX will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 2, why: `BP is used as the base, so the default segment is SS (L4).`, ow: [`ES is used only when written as an override (ES:[...]) or for string destinations; nothing here selects ES.`, `DS is the default for BX, SI, DI or a constant, but once BP appears in the address the default becomes SS.`, null, `CS is the segment for instruction fetch (with IP), not for data operands addressed through BP.`] }
        ]},
        { title: `Question One II · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `User visible registers include general purpose, special purpose and segment registers.`, a: 0, why: `The lecture register tree puts these three under user-visible (L2).`, ow: [null, `The statement is true: the lecture register tree lists general purpose, special purpose and segment registers as the user-visible ones; PC, IR, MAR, MBR are user-invisible.`], key: `Student mark on the paper: False.` },
          { type: `tf`, q: `Register CS cannot be modified, so the instruction MOV [CS], AX is incorrect.`, a: 0, why: `CS cannot be a MOV destination, and [CS] is not a valid memory operand (L3).`, ow: [null, `The statement is true: changing CS by MOV is not allowed, and [CS] is not a valid memory pointer (only BX, BP, SI, DI).`] },
          { type: `tf`, q: `Memory Address Register (MAR) contains the instruction most recently fetched.`, a: 1, why: `That is the IR; MAR contains the address of a memory location (L2).`, ow: [`The instruction most recently fetched is held by the IR; the MAR holds the address of a location in memory.`, null] },
          { type: `tf`, q: `The data bus transfers instructions and data between the CPU and memory.`, a: 0, why: `The lecture defines the data bus as the bus that transfers instructions and data between the CPU and memory (L1, Buses).`, ow: [null, `The statement is true: it is the lecture definition of the data bus. Addresses use the address bus and timing the control bus.`] },
          { type: `tf`, q: `The instruction STOSW, D=1: Store String Word where ES:[DI] = AX; DI = DI + 2.`, a: 1, why: `With D=1 DI is decremented: DI = DI - 2 (L7).`, ow: [`ES:[DI] = AX is right, but with D=1 the direction is negative, so DI is decremented: DI = DI - 2, not + 2.`, null] },
          { type: `tf`, q: `Non-maskable interrupts are those that cannot be blocked.`, a: 0, why: `Non-maskable interrupts (NMI) cannot be masked, blocked or ignored; they have absolute priority, e.g. memory parity or bus faults (L8, Interrupts).`, ow: [null, `The statement is true: maskable interrupts can be blocked by a mask bit, but non-maskable ones cannot be blocked or ignored.`] },
          { type: `tf`, q: `LDS AX, [DI] will change the content of AX only.`, a: 1, why: `LDS reads 4 bytes: the first two go into AX (offset) and the next two into DS (segment), so both AX and DS change (L6, LDS, LES, LSS).`, ow: [`LDS loads a full pointer: the first two bytes into AX and the next two into DS, so DS changes as well as AX.`, null] },
          { type: `tf`, q: `The statement MOV ES:SI, CX is incorrect.`, a: 0, why: `SI without brackets is a register, so a segment prefix makes no sense; ES:[SI] would be correct (L3).`, ow: [null, `The statement is true: SI without brackets is a register, not a memory operand, so the ES: prefix is meaningless. ES:[SI] would be valid.`] },
          { type: `tf`, q: `The memory address of the instruction MOV AX, 10[SI+BC] = DS*10 + SI + BC.`, a: 1, why: `The displacement 10 is missing: DS×10 + 10 + SI + BC (L4).`, ow: [`The given formula drops the displacement 10; indexed addressing adds it: DS×10 + 10 + SI + BC.`, null] },
          { type: `tf`, q: `Registers IP and CS are modified after short and near JMP instructions.`, a: 1, why: `Short and near jumps change IP only; only the far jump changes CS (L8).`, ow: [`Only the far jump changes both CS and IP; short and near jumps stay in the same code segment and change IP only.`, null], key: `Student mark on the paper: True.` }
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
          { type: `mcq`, q: `…… is high speed temporary storage area built into the CPU.`, o: [`A processor`, `ALU`, `A bus`, `A Register`], a: 3, why: `A register is a high speed temporary storage area built into the CPU; the CPU has a limited number of them (L1, Registers; L2).`, ow: [`The processor (CPU) is the whole unit that contains the registers, ALU, CU and clock; it is not itself a storage area.`, `The ALU performs arithmetic and logic operations (ADD, AND, OR, NOT); it does not store data.`, `A bus is a group of parallel wires transferring data between parts of the computer, outside the CPU; it is not storage.`, null] },
          { type: `mcq`, q: `The O bit in the EFLAGS register refers to:`, o: [`overflow bit`, `overload bit`, `override segment bit`, `none of the mentioned`], a: 0, why: `The O bit of EFLAGS is the overflow flag OF, set when a signed result is too large or too small to fit into the destination (L2, EFLAGS bits).`, ow: [null, `There is no "overload" flag in EFLAGS; O names the overflow flag, which reports a signed result that does not fit.`, `Segment override is a prefix written in the instruction (e.g. ES:[...]), not a flag bit; O is the overflow flag.`, `Not "None": overflow bit is listed and is exactly what the O bit means.`] },
          { type: `mcq`, q: `POP operation:`, o: [`decrements SP`, `increments SP`, `decrements SS`, `increments SS`], a: 1, why: `POP copies the data at SS:[SP] into the operand and then increments SP by 2 or 4; SS never changes (L5, POP).`, ow: [`Decrementing SP is what PUSH does (the stack grows down); POP moves SP back up.`, null, `PUSH and POP never change SS, which only holds the stack segment; POP changes SP.`, `SS is not changed by stack instructions; the register that POP increments is SP.`] },
          { type: `mcq`, q: `The instruction MOV DS, ES:`, o: [`copies the contents of ES into DS`, `copies the contents of DS into ES`, `copies and deletes the contents of ES into DS`, `causes an error`], a: 3, why: `You cannot move data from one segment register to another with a single MOV; use a general register: MOV AX, ES then MOV DS, AX (L3, Register addressing restrictions).`, ow: [`That would be the intended effect, but segment-to-segment MOV is not allowed on the 8086, so the instruction is an error.`, `MOV copies source (right) into destination (left), so this reads the operands backwards; and segment-to-segment MOV is illegal anyway.`, `MOV never deletes its source, and segment-to-segment MOV is not allowed at all, so the instruction causes an error.`, null] },
          { type: `mcq`, q: `The segment register of the instruction MOV BL, ES:[1234H] will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 0, why: `The ES: prefix is a segment override, so the memory address is ES×10 + 1234H instead of the default DS (L3, Direct and displacement addressing).`, ow: [null, `DS is the default for a constant offset, but the written ES: prefix overrides it.`, `SS is the default only when BP or SP is used; here the segment is written explicitly as ES.`, `CS is used for instruction fetch with IP; a data operand with an ES: override uses ES.`] },
          { type: `mcq`, q: `LODS instruction copies strings memory location ……. into AL, AX, EAX.`, o: [`ES:[SI]`, `ES:[DI]`, `DS:[SI]`, `DS:[DI]`], a: 2, why: `LODS reads its source string from DS:[SI] into AL, AX or EAX (LODSB/W/D) and then steps SI by the D flag (L7, String instruction summary).`, ow: [`SI is the right pointer, but LODS reads from the data segment DS; ES is used for destination strings.`, `ES:[DI] is the destination used by STOS and INS, not the source read by LODS.`, null, `DS is right but DI is the destination pointer; LODS uses SI as its source pointer.`] },
          { type: `mcq`, q: `The segment register of the instruction MOV [BX][BP], BX will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 2, why: `BP present → SS (L4). Strictly, BX+BP cannot be combined on an 8086.`, ow: [`ES is used only with an explicit ES: override or for string destinations; nothing here selects ES.`, `DS is the default for BX, SI, DI or a constant, but when BP appears in the address the default becomes SS.`, null, `CS is the segment for instruction fetch with IP, not for data addressed through BP.`] },
          { type: `mcq`, q: `The LSS DX, [SI] copies ….. into DX and ……into ……….`, o: [`segment, [SI], SS`, `[SI], DS, SS`, `offset, segment, SS`, `offset, DS, SS`], a: 2, why: `LSS loads the offset into the register and the segment into SS (L6).`, ow: [`The order is reversed: the first two bytes (the offset) go into DX and the next two (the segment) go into SS.`, `DX receives the offset read from memory at [SI], and SS (not DS) receives the segment; DS is only used to form the address.`, null, `DX does get the offset, but SS receives a segment address read from memory, not the contents of DS.`] },
          { type: `mcq`, q: `……. contains the instruction most recently fetched.`, o: [`PC`, `MAR`, `IR`, `MBR`], a: 2, why: `The IR (Instruction Register) contains the instruction most recently fetched, i.e. the one being executed; it is a user-invisible register (L2).`, ow: [`The PC contains the address of the next instruction to be fetched, not the instruction itself.`, `The MAR contains the address of a location in memory, not a fetched instruction.`, null, `The MBR holds a data word to be written to memory or the word most recently read, not the fetched instruction.`] },
          { type: `mcq`, q: `If SS=1300, SP=100, CX=CD01 then after executing the instruction PUSH CX the following is correct:`, o: [`SS = 1302`, `SP = 98`, `SS = 1298`, `SP = 102`], a: 1, why: `PUSH decreases SP by 2 and leaves SS (L5). Intended answer 98; in hex it would be 0FE.`, ow: [`PUSH never changes SS; it only changes SP. Adding 2 to SS confuses the segment with the stack pointer.`, null, `SS is not changed by PUSH; the 2 is subtracted from SP, giving 98 (in the exam's decimal intent).`, `SP = 102 adds 2, which is what POP CX would do; PUSH first decrements SP by 2.`] }
        ]},
        { title: `Question One b · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `The statement MOV ES:SI, CX is correct.`, a: 1, why: `ES:SI is not a valid operand: SI without brackets is a register, so the ES: prefix makes no sense; ES:[SI] would be correct (L3).`, ow: [`A segment prefix applies only to a memory operand in brackets; plain SI is a register, so ES:SI is invalid. ES:[SI] would work.`, null] },
          { type: `tf`, q: `The far jump is a six bytes instruction.`, a: 1, why: `The far jump is 5 bytes: 1 opcode byte, 2 offset bytes and 2 segment bytes (short = 2, near = 3) (L8, The three jump types).`, ow: [`A far jump has 1 opcode + 2 offset + 2 segment bytes = 5 bytes, not 6.`, null] },
          { type: `tf`, q: `LODSW affects the zero flag.`, a: 1, why: `LODS and STOS do not affect the flags, so LODSW just copies DS:[SI] into AX and leaves ZF unchanged (L7, Key rules).`, ow: [`LODS only copies data into AX and steps SI; the lecture says LODS/STOS do not affect the flags, ZF included.`, null] },
          { type: `tf`, q: `RAM is a form of semiconductor memory technology used for reading and writing data in any order.`, a: 0, why: `RAM is semiconductor memory used for reading and writing data in any order, as required by the processor (L1, Types of memory).`, ow: [null, `The statement is true: it is the lecture's exact definition of RAM (read and write in any order).`] },
          { type: `tf`, q: `Registers IP and CS are modified after any JMP instruction (short, near or far).`, a: 1, why: `Short and near jumps change IP only (same code segment); only the far jump changes both CS and IP (L8, Unconditional jumps).`, ow: [`Not any JMP: short and near jumps change only IP; CS changes only with a far jump.`, null] },
          { type: `tf`, q: `The Z flag is set to 1 when an ALU operation results in a 0 output.`, a: 0, why: `ZF (zero flag) is set to 1 when the result of an arithmetic or logic operation is zero (L2, EFLAGS bits).`, ow: [null, `The statement is true: ZF = 1 means the ALU result was zero; ZF = 0 means a non-zero result.`] },
          { type: `tf`, q: `LDS AX, [DI] will change the content of AX only.`, a: 1, why: `LDS reads 4 bytes: the first two go into AX (offset) and the next two into DS (segment), so DS changes too (L6, LDS, LES, LSS).`, ow: [`LDS loads a full pointer: the first two bytes into AX and the next two into DS, so DS changes as well as AX.`, null], key: `Student wrote T.` },
          { type: `tf`, q: `Assembly language is hardware dependent.`, a: 0, why: `Assembly is hardware dependent: each CPU type has its own machine and assembly language, so a program for one CPU won't run on another (L1).`, ow: [null, `The statement is true: different CPUs need different assemblers and assembly languages; high-level languages are the machine-independent ones.`] },
          { type: `tf`, q: `SS is the segment register used to hold the segment of the stack.`, a: 0, why: `SS (Stack Segment) holds the starting address of the currently active stack segment, used with SP for PUSH and POP (L2, Segment registers).`, ow: [null, `The statement is true: SS is the stack segment register; CS holds code, DS data and ES the extra segment.`] },
          { type: `tf`, q: `String manipulation instructions include LODS, MOV, and STOS.`, a: 1, why: `String instructions are LODS, STOS, INS, OUTS (also MOVS, CMPS, SCAS); plain MOV is not a string instruction, so the list is wrong (L7, Key rules).`, ow: [`LODS and STOS are string instructions, but plain MOV is not (MOVS is); so the list is wrong.`, null], key: `Student wrote T.` }
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
          { type: `mcq`, q: `……. contains the instruction most recently fetched.`, o: [`PC`, `MAR`, `IR`, `MBR`], a: 2, why: `The IR (Instruction Register) contains the instruction most recently fetched, i.e. the one being executed; it is a user-invisible register (L2).`, ow: [`The PC contains the address of the next instruction to be fetched, not the instruction itself.`, `The MAR contains the address of a location in memory, not a fetched instruction.`, null, `The MBR holds a data word to be written to memory or the word most recently read, not the fetched instruction.`] },
          { type: `mcq`, q: `Segment registers are ……`, o: [`16 bit user visible registers such as CS, DS`, `16 bit general purpose registers such as FLAGS`, `32 bit registers such as ECX, EDX`, `none`], a: 0, why: `Segment registers (CS, DS, ES, SS) are 16-bit user-visible registers; they cannot be used in arithmetic or logic instructions (L2, Segment registers).`, ow: [null, `FLAGS is a special purpose register, not a general purpose or segment register.`, `ECX and EDX are 32-bit general purpose registers; segment registers are 16-bit, like CS and DS.`, `Not "None": option a, 16-bit user-visible registers such as CS and DS, is the lecture description.`] },
          { type: `mcq`, q: `The instruction POPAD will pop ……… double words from the stack.`, o: [`32`, `8`, `16`, `4`], a: 1, why: `POPAD pops the 8 32-bit registers EDI, ESI, EBP, ESP, EBX, EDX, ECX, EAX: 8 double words = 32 bytes (L5, POP).`, ow: [`32 is the number of BYTES popped (8 double words × 4); the question asks for double words, which is 8.`, null, `16 is the byte count of POPA (8 words × 2), not the number of double words in POPAD.`, `4 is the size of one double word in bytes; POPAD pops 8 of them.`] },
          { type: `mcq`, q: `The O bit in the EFLAGS register refers to:`, o: [`overflow bit`, `overload bit`, `override segment bit`, `none of the mentioned`], a: 0, why: `The O bit of EFLAGS is the overflow flag OF, set when a signed result is too large or too small to fit into the destination (L2, EFLAGS bits).`, ow: [null, `There is no "overload" flag in EFLAGS; O names the overflow flag, which reports a signed result that does not fit.`, `Segment override is a prefix written in the instruction (e.g. ES:[...]), not a flag bit; O is the overflow flag.`, `Not "None": overflow bit is listed and is exactly what the O bit means.`] },
          { type: `mcq`, q: `The instruction that is not possible among the following is:`, o: [`MOV AX, [BX]`, `MOV AX, 5555H`, `MOV [AX], SI`, `MOV 100, [DI]`], a: 3, why: `An immediate value cannot be a destination (L3). MOV [AX], SI is also invalid on a 16-bit 8086.`, ow: [`MOV AX, [BX] is valid register indirect addressing: BX is a legal pointer with default segment DS.`, `MOV AX, 5555H is valid immediate addressing: a 16-bit constant into a 16-bit register.`, `The intended key treats this as possible (register to memory), though strictly [AX] is not a valid 16-bit pointer; the key's answer is the immediate destination.`, null] },
          { type: `mcq`, q: `The register which keeps track of the status of the running environment:`, o: [`General purpose`, `Condition`, `Segment`, `Flags`], a: 3, why: `The FLAGS (EFLAGS) register keeps track of the status of the running environment: its bits control the CPU or reflect the outcome of operations (L2).`, ow: [`General purpose registers (AX, BX, CX, DX ...) hold data and addresses, not the processor's status.`, `"Condition" is not a register name in the lecture; the condition bits live in the FLAGS register.`, `Segment registers hold segment starting addresses (CS, DS, ES, SS), not the status of the environment.`, null] },
          { type: `mcq`, q: `The segment register of the instruction MOV [BX][BP], AX will be:`, o: [`ES`, `DS`, `SS`, `CS`], a: 2, why: `When BP is used in the address, the default segment is SS (BX, SI, DI default to DS), so [BX][BP] uses SS. Strictly, BX+BP cannot be combined on an 8086 (L4).`, ow: [`ES is used only with an explicit ES: override or for string destinations; nothing here selects ES.`, `DS is the default for BX, SI, DI or a constant, but when BP appears in the address the default becomes SS.`, null, `CS is the segment for instruction fetch with IP, not for data addressed through BP.`] },
          { type: `mcq`, q: `If SS=1300, SP=100, CX=CD01 then after executing PUSH CX the following is correct:`, o: [`SS = 1302`, `SP = 98`, `SS = 1298`, `SP = 102`], a: 1, why: `PUSH CX first decrements SP by 2 (CX is 16 bits) and leaves SS unchanged: SP = 100 - 2 = 98 as intended (in hex it would be 0FE) (L5).`, ow: [`PUSH never changes SS; it only changes SP. Adding 2 to SS confuses the segment with the stack pointer.`, null, `SS is not changed by PUSH; the 2 is subtracted from SP, giving 98 (in the exam's decimal intent).`, `SP = 102 adds 2, which is what POP CX would do; PUSH first decrements SP by 2.`] },
          { type: `mcq`, q: `An interrupt breaks the execution of instructions and diverts its execution to ……`, o: [`Interrupt service routine`, `Counter word register`, `Execution unit`, `control unit`], a: 0, why: `An interrupt transfers control to the Interrupt Service Routine (ISR); after the ISR's return instruction the processor resumes the interrupted program (L8, Interrupts).`, ow: [null, `No "counter word register" is involved; the PC is loaded with the start address of the ISR, and control goes to that routine.`, `The execution unit carries out instructions in every case; an interrupt diverts execution to a different program, the ISR.`, `The control unit sequences instruction steps; an interrupt changes WHICH program runs, the interrupt service routine.`] },
          { type: `mcq`, q: `The LSS DX, [SI] copies ….. into DX and ……into ……….`, o: [`segment, [SI], SS`, `[SI], DS, SS`, `offset, segment, SS`, `offset, DS, SS`], a: 2, why: `LSS reads 4 bytes from the computed address: the first two (offset) go into DX and the next two (segment) into SS (L6, LDS, LES, LSS).`, ow: [`The order is reversed: the first two bytes (the offset) go into DX and the next two (the segment) go into SS.`, `DX receives the offset read from memory at [SI], and SS (not DS) receives the segment; DS is only used to form the address.`, null, `DX does get the offset, but SS receives a segment address read from memory, not the contents of DS.`] }
        ]},
        { title: `Question One b · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `Assembly language is hardware dependent.`, a: 0, why: `Assembly is hardware dependent: each CPU type has its own machine and assembly language, so a program for one CPU won't run on another (L1).`, ow: [null, `The statement is true: different CPUs need different assemblers and assembly languages; high-level languages are the machine-independent ones.`] },
          { type: `tf`, q: `String instructions change the value of the direction flag D.`, a: 1, why: `String instructions only USE the direction flag D to decide whether SI/DI increase or decrease; D is changed by CLD/STD (L7, Key rules).`, ow: [`String instructions read D to choose the direction but never change it; only CLD (D=0) and STD (D=1) set it.`, null] },
          { type: `tf`, q: `The address of the instruction PUSH EBX will be SP:[SS].`, a: 1, why: `Stack instructions use SS:[SP]: SS is the segment and SP the offset, so PUSH EBX stores at SS×10 + SP after SP = SP - 4 (L5, The stack).`, ow: [`The order is reversed: the segment register comes first, so the address is SS:[SP], not SP:[SS].`, null] },
          { type: `tf`, q: `The flag that acts as borrow flag in the subtraction with borrow instruction is the carry flag CF.`, a: 0, why: `In SBB (subtract with borrow) the carry flag CF acts as the borrow flag: SBB computes dest - src - CF (Lab, L9).`, ow: [null, `The statement is true: CF doubles as the borrow flag in subtraction, and SBB subtracts it along with the source.`] },
          { type: `tf`, q: `String manipulation instructions include LODS, MOV, and STOS.`, a: 1, why: `String instructions are LODS, STOS, INS, OUTS (also MOVS, CMPS, SCAS); plain MOV is not a string instruction, so the list is wrong (L7, Key rules).`, ow: [`LODS and STOS are string instructions, but plain MOV is not (MOVS is); so the list is wrong.`, null] },
          { type: `tf`, q: `In PROM, data is written into the chip before being installed in the circuit, but it can only be written once.`, a: 0, why: `PROM data is written into the chip before it is installed, using a PROM programmer, and it can be written only once (L1, Types of memory).`, ow: [null, `The statement is true: it matches the lecture definition of PROM exactly (written before installation, only once).`] },
          { type: `tf`, q: `LDS AX, [DI] will change the content of AX only.`, a: 1, why: `LDS reads 4 bytes: the first two go into AX (offset) and the next two into DS (segment), so DS changes too (L6, LDS, LES, LSS).`, ow: [`LDS loads a full pointer: the first two bytes into AX and the next two into DS, so DS changes as well as AX.`, null] },
          { type: `tf`, q: `The instruction MOV CS:[SI], 100 is incorrect.`, a: 1, why: `CS is only a segment override for the destination memory; CS itself is not changed, and overriding with CS is allowed (L3/L4). (An assembler would also need BYTE/WORD PTR.)`, ow: [`Only changing CS is forbidden; here CS: is just a segment override on the memory destination, which is allowed, so the statement "incorrect" is false.`, null] },
          { type: `tf`, q: `LODSW loads two bytes of a string from memory into AX.`, a: 0, why: `LODSW (the word form) copies two bytes from DS:[SI] into AX, AL from [SI] and AH from [SI+1], then steps SI by 2 (L7).`, ow: [null, `The statement is true: W means word = 2 bytes, loaded from DS:[SI] into AX (LODSB loads 1 byte, LODSD 4).`] },
          { type: `tf`, q: `Registers IP and CS are modified after any JMP instruction (short, near or far).`, a: 1, why: `Short and near jumps change IP only (same code segment); only the far jump changes both CS and IP (L8, Unconditional jumps).`, ow: [`Not any JMP: short and near jumps change only IP; CS changes only with a far jump.`, null] }
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
          { type: `mcq`, q: `The segment register of the instruction MOV BX, 50[SI-10] will be:`, o: [`SS-10`, `DS*50`, `DS which contains 50`, `DS`], a: 3, why: `The offset uses SI (plus displacement 50 − 10), and SI's default segment is DS, so the segment register is DS (L4, Default segment rule).`, ow: [`SS is only the default when BP (or SP) is used; this offset uses SI, so the segment is DS. A segment register is also never written as "SS-10".`, `The displacement 50 is added to the offset, not multiplied by the segment; the segment register itself is simply DS.`, `DS does not contain 50: 50 is the displacement added to SI to form the offset. The segment register is just DS.`, null] },
          { type: `mcq`, q: `Special purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EFLAGS`, `32 bit registers such as ECX, EDX`, `None`], a: 1, why: `The two special purpose registers are EIP and EFLAGS, both 32-bit and manipulated directly by the CPU (L2, Special purpose registers).`, ow: [`CS and DS are the 16-bit segment registers, a separate group of user-visible registers, not the special purpose ones.`, null, `ECX and EDX are 32-bit general purpose registers; the special purpose registers are EIP and EFLAGS.`, `Not "None": option b is right, EFLAGS (with EIP) is a 32-bit special purpose register.`] },
          { type: `mcq`, q: `The operands in MOV instruction, source and destination, cannot be:`, o: [`register, register`, `memory location, register`, `memory location, memory location`, `register, data`], a: 2, why: `Memory to memory moves are not allowed with MOV (only string instructions can do that); one operand must be a register or immediate (L3, Register addressing and its restrictions).`, ow: [`Register to register is register addressing, the most common legal form, e.g. MOV AX, BX (same size).`, `Memory to register is legal (direct/displacement addressing), e.g. MOV CL, [123H].`, null, `Moving immediate data into a register is immediate addressing, e.g. MOV AX, 44H; only an immediate DESTINATION is forbidden.`] },
          { type: `mcq`, q: `An assembler is:`, o: [`easy to run, good with small programs`, `difficult to run but good with small programs`, `easy to run, good with long programs`, `difficult to run, good with long programs`], a: 3, why: `Lecture table: the assembler is hard to run, has more program overhead, is isolated from the machine and is good on long programs (L1, Debugger vs. Assembler).`, ow: [`Easy to run and good on small programs is the debugger's column, the opposite of the assembler.`, `The assembler is hard to run, but it is good on LONG programs; short programs are the debugger's strength.`, `The assembler is good on long programs but is HARD to run; "easy to run" describes the debugger.`, null] },
          { type: `mcq`, q: `MBR is a …….. register.`, o: [`general purpose`, `user invisible`, `user visible`, `special purpose`], a: 1, why: `MBR (Memory Buffer Register) holds the word to be written to memory or the word most recently read; it is a user-invisible control/status register with PC, IR and MAR (L2).`, ow: [`General purpose registers are EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI; the programmer cannot reference MBR at all.`, null, `User-visible registers are the ones the machine language can reference (general, special, segment); MBR is user-invisible.`, `Special purpose means EIP and EFLAGS (a user-visible group); MBR belongs to the user-invisible registers.`] }
        ]},
        { title: `Form A · Question 1 II · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `You cannot use 1 byte (high or low bits) of ESP register; you can use either 16 or 32 bits.`, a: 0, why: `Only AX, BX, CX, DX have 8-bit halves; ESP has only SP (16 bits) and ESP (32 bits), with no SPH/SPL byte (L2, General purpose registers).`, ow: [null, `The statement is true: SI, DI, SP and BP have no 8-bit halves, so ESP can be used only as 16 or 32 bits.`] },
          { type: `tf`, q: `The statement MOV AX, [BP - 50] is incorrect.`, a: 1, why: `[BP − 50] is legal indexed addressing: BP plus a (negative) displacement, with default segment SS; the lecture lists [BP−2] as legal (L4, Indexed addressing).`, ow: [`It is not incorrect: BP is one of the four pointer registers (BP, BX, SI, DI) and a displacement may be subtracted, so the move is legal (segment SS).`, null] },
          { type: `tf`, q: `MOV SS, CS is an incorrect instruction.`, a: 0, why: `You cannot move data directly from one segment register to another; MOV SS, CS is the lecture's own example of an incorrect instruction (L3, rule 2).`, ow: [null, `It really is incorrect: segment to segment moves need a general register in between, e.g. MOV AX, CS then MOV SS, AX.`] },
          { type: `tf`, q: `The segment registers include SS, CS, DS, ES, DI, and SI.`, a: 1, why: `The segment registers are CS, DS, ES and SS (FS, GS on 80386+); DI and SI are index (general purpose) registers, not segment registers (L2).`, ow: [`False because DI and SI are general purpose index registers; only SS, CS, DS and ES in this list are segment registers.`, null] },
          { type: `tf`, q: `Default segment can never be overridden.`, a: 1, why: `A default segment can be overridden by writing another segment before the offset, e.g. MOV BL, ES:[1234H] or MOV AX, DS:[BP] (L3, Segment overriding).`, ow: [`Segment overriding exists precisely to replace the default segment, e.g. MOV AL, CS:[BX] uses CS instead of DS.`, null] }
        ]},
        { title: `Form A · Questions 2 and 3`, marks: `9 marks`, items: [
          { type: `written`, q: `Q2: Differentiate between PROM and EPROM. (4 marks)`, ans: `PROM: data is written into the chip before it is installed in the circuit, only once, using a PROM programmer.<br>EPROM: data can be rewritten by removing the chip, erasing it with ultraviolet light through a transparent window, and reprogramming it in a PROM programmer; used for prototypes and small production runs.` },
          { type: `written`, q: `Q3: Given SS=10C0H, DS=20A0H, DI=2000H, BP=0100H. Calculate and show by figure the memory address accessed by MOV EAX, [DI]. (5 marks)`, ans: `Address = DS×10 + DI = 20A00 + 2000 = <b>22A00</b>. EAX gets the 4 bytes 22A00 to 22A03. SS and BP are not used.` }
        ]},
        { title: `Form B · Question 1 I · Choose`, marks: `5 marks`, items: [
          { type: `mcq`, q: `A debugger is:`, o: [`easy to run, good with small programs`, `difficult to run but good with small programs`, `easy to run and good with long programs`, `difficult to run and good with long programs`], a: 0, why: `Lecture table: the debugger is easy to run, has low overhead, is close to the machine and is good on short programs (L1, Debugger vs. Assembler).`, ow: [null, `A debugger is EASY to run; "difficult to run" is the assembler's column.`, `"Good on long programs" is the assembler; the debugger is good on short (small) programs.`, `Difficult to run and good on long programs is the assembler's description, the opposite of the debugger.`] },
          { type: `mcq`, q: `PC is a ……….. register.`, o: [`general purpose`, `user visible`, `user invisible`, `special purpose`], a: 2, why: `The PC (program counter) holds the address of the next instruction to fetch; it is a user-invisible control register with IR, MAR and MBR (L2).`, ow: [`General purpose registers are EAX…ESI used for arithmetic and data movement; the PC cannot be referenced by the programmer.`, `User-visible registers are general, special purpose and segment registers; the PC is listed among the user-invisible ones.`, null, `Special purpose registers are EIP and EFLAGS (user visible); the PC belongs to the user-invisible group.`] },
          { type: `mcq`, q: `The operands in MOV instruction cannot be:`, o: [`DS, ES`, `AX, CS`, `EAX, ESP`, `BX, DX`], a: 0, why: `MOV DS, ES is segment register to segment register, which is not allowed in one instruction; go through a general register (L3, rule 2).`, ow: [null, `MOV AX, CS is legal: reading CS into a general register is allowed; only changing CS or segment-to-segment moves are forbidden.`, `MOV EAX, ESP is legal: two 32-bit general registers of the same size.`, `MOV BX, DX is legal register addressing between two 16-bit general registers.`] },
          { type: `mcq`, q: `The segment register of the instruction MOV 30[BP], BX will be:`, o: [`ES`, `SS`, `DS`, `the instruction is incorrect`], a: 1, why: `The offset 30 + BP uses BP, whose default segment is SS, so the memory operand is in the stack segment (L4, Default segment rule).`, ow: [`ES is only used when written as an override (or for string destinations); with BP the default is SS.`, null, `DS is the default for BX, SI, DI or a constant; BP defaults to SS.`, `The instruction is legal: memory destination 30[BP] with register source BX is indexed addressing, same size (16 bits).`] },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EAX, EBX`, `32 bit registers such as EFLAGS`, `None`], a: 1, why: `The eight general purpose registers are the 32-bit EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI, used mainly for arithmetic and data movement (L2).`, ow: [`CS and DS are 16-bit segment registers, not general purpose registers.`, null, `EFLAGS is a 32-bit special purpose register (with EIP), not a general purpose one.`, `Not "None": option b is right, EAX and EBX are 32-bit general purpose registers.`] }
        ]},
        { title: `Form B · Question 1 II · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `The statement MOV AX, [BP - 2] is correct.`, a: 0, why: `[BP − 2] is legal indexed addressing (BP with a displacement, default segment SS) and AX is 16 bits; the lecture lists [BP-2] as legal (L4).`, ow: [null, `It is correct: BP may hold an offset and a displacement may be subtracted; the word at SS×10 + BP − 2 is copied into AX.`] },
          { type: `tf`, q: `The user visible registers include SS, CS, DS, ES, DI, and SI only.`, a: 1, why: `They also include EAX, EBX, etc. and EIP, EFLAGS (L2).`, ow: [`False: DI and SI are general purpose, not the only extras; user-visible also covers EAX, EBX… and the special purpose EIP and EFLAGS.`, null] },
          { type: `tf`, q: `You can use 1 byte (high or low bits) of ESI register by using SH, SL.`, a: 1, why: `Only AX, BX, CX, DX have 8-bit halves (AH/AL…); ESI has no byte parts, there is no SH or SL, so it is used as SI (16) or ESI (32) only (L2).`, ow: [`SH and SL do not exist: SI, DI, SP and BP have no 8-bit halves, unlike AX/BX/CX/DX.`, null] },
          { type: `tf`, q: `A default segment can be overridden.`, a: 0, why: `A default segment can be overridden by writing a segment prefix, e.g. MOV BL, ES:[1234H] uses ES instead of DS (L3, Segment overriding).`, ow: [null, `Overriding is allowed and is a lecture topic: MOV AL, CS:[BX] and MOV AX, DS:[BP] replace the default segment.`] },
          { type: `tf`, q: `MOV [AX], [150H] is a correct instruction.`, a: 1, why: `Two errors: MOV cannot move memory to memory, and AX cannot be used as a pointer (only BX, BP, SI, DI); the lecture lists MOV [AX], [5000H] as incorrect (L3).`, ow: [`It is incorrect: both operands are memory locations (not allowed except in string instructions), and [AX] is not a valid pointer.`, null] }
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
          { type: `mcq`, q: `A chip on which data can be rewritten electrically while the chip is on the circuit board, but the writing process is slow:`, o: [`EROM`, `PROM`, `EEPROM`, `none of the mentioned`], a: 2, why: `EEPROM (Electrically Erasable PROM) is rewritten electrically while the chip stays on the circuit board, but the writing process is slow; it holds firmware such as the BIOS (L1).`, ow: [`"EROM" is not one of the lecture's memory types (RAM, ROM, PROM, EPROM, EEPROM).`, `PROM is written only once, before it is installed, with a PROM programmer, so it cannot be rewritten on the board.`, null, `Not "None": the description is exactly the lecture definition of EEPROM.`] },
          { type: `mcq`, q: `……… contains the address of a location in memory.`, o: [`PC`, `MBR`, `IR`, `MAR`], a: 3, why: `The MAR (Memory Address Register) contains the address of a location in memory; it is one of the user-invisible registers (L2, User-invisible registers).`, ow: [`The PC contains the address of the next INSTRUCTION to be fetched, not of a general memory location used for data.`, `The MBR holds the data word to be written to memory or most recently read, not the address.`, `The IR holds the instruction most recently fetched, not a memory address.`, null] },
          { type: `mcq`, q: `The C bit in the EFLAGS register refers to:`, o: [`carry bit`, `control bit`, `code segment bit`, `none of the mentioned`], a: 0, why: `C is the carry flag (CF): set when the result of an unsigned operation is too large to fit in the destination (L2, EFLAGS bits).`, ow: [null, `There is no "control bit" C; the control flag of EFLAGS is DF (direction). C is the status flag Carry.`, `EFLAGS bits describe results and CPU control; there is no code segment bit. CS is a separate segment register.`, `Not "None": C in EFLAGS stands for the carry bit.`] },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EBX and EDX`, `16 bit registers such as ES, BX`, `32 bit registers such as EIP, EFLAGS`], a: 1, why: `EBX and EDX are general purpose; EIP and EFLAGS are special purpose (L2).`, ow: [`CS and DS are 16-bit segment registers, not general purpose ones.`, null, `ES is a segment register, so this pair is not all general purpose (BX is, but as the 16-bit part of EBX).`, `EIP and EFLAGS are the 32-bit special purpose registers, a different group from the general purpose ones.`], key: `Student chose d.` },
          { type: `mcq`, q: `Which of the following instructions causes errors?`, o: [`MOV CS, AX`, `MOV EAX, EBP`, `MOV CX, [SI]`, `POP AX`], a: 0, why: `Changing the value of CS with MOV is not allowed, so MOV CS, AX causes an error; reading CS (MOV AX, CS) is fine (L3, rule 3).`, ow: [null, `MOV EAX, EBP is legal: two 32-bit general purpose registers of the same size.`, `MOV CX, [SI] is legal register indirect addressing: the word at DS×10 + SI goes into CX.`, `POP AX is legal: it copies the word at SS:[SP] into AX, then adds 2 to SP.`] },
          { type: `mcq`, q: `If SS=1400, SP=160, BX=CD01 then after executing POP AX the following is correct:`, o: [`SS = 1402`, `SP = 158`, `SS = 1398`, `SP = 162`], a: 3, why: `POP AX copies the word at SS:[SP] into AX, then increments SP by 2: SP = 160 + 2 = 162. SS never changes (BX is a distractor) (L5, POP).`, ow: [`PUSH and POP never change SS; only SP moves. Adding 2 to SS instead of SP gives 1402.`, `SP − 2 = 158 is what PUSH AX would give; POP increments SP.`, `SS is not changed by POP, and nothing is subtracted from it; 1398 mixes up SS with SP and the direction.`, null], key: `Student chose a.` },
          { type: `mcq`, q: `LODS instruction copies strings memory location ……. into AL, AX, EAX.`, o: [`ES:[SI]`, `ES:[DI]`, `DS:[SI]`, `DS:[DI]`], a: 2, why: `LODS reads the source string from DS:[SI] into AL, AX or EAX, then moves SI by 1, 2 or 4 according to D (L7, Key rules).`, ow: [`SI is the source pointer, but its segment is DS; ES pairs with DI for destinations (STOS, INS).`, `ES:[DI] is the DESTINATION used by STOS and INS, not the source that LODS reads.`, null, `DI is the destination pointer and goes with ES; LODS uses SI with DS.`] },
          { type: `mcq`, q: `The instruction MOV [DI], [SI]:`, o: [`copies the contents of SI into DI`, `copies the contents of DI into SI`, `copies and deletes the contents of SI into DI`, `causes an error`], a: 3, why: `Both operands are memory locations and memory to memory moves are not allowed with MOV (only string instructions), so MOV [DI], [SI] is an error (L3, L4).`, ow: [`It would not copy anything: memory to memory MOV is illegal, so the assembler rejects it.`, `Besides MOV going source→destination (into [DI]), the instruction is illegal because both operands are memory.`, `MOV never deletes its source, and this instruction is illegal anyway (memory to memory).`, null] },
          { type: `mcq`, q: `The instruction PUSHA:`, o: [`increments SP by 32 words`, `increments SP by 16 byte`, `decrements SP by 32 words`, `decrements SP by 32 bytes`], a: 3, why: `Best available option. PUSHA actually decrements SP by 16 bytes (8 words); 32 bytes is PUSHAD (L5).`, ow: [`PUSHA stores data on the stack, which grows down, so SP is DECREMENTED, never incremented; and it moves 8 words, not 32.`, `PUSH-type instructions decrement SP; 16 bytes is the right amount for PUSHA but the direction is wrong.`, `PUSHA pushes 8 words (16 bytes); 32 WORDS would be 64 bytes, far more than any PUSHA/PUSHAD.`, null] },
          { type: `mcq`, q: `After running the instruction OUTSD with D=1:`, o: [`DI = DI-2`, `SI = SI-2`, `SI = SI-4`, `DI = DI+2`], a: 2, why: `OUTS reads from DS:[SI], so SI changes; OUTSD moves a double word (4 bytes) and D=1 means decrement: SI = SI − 4 (L7, String instruction summary).`, ow: [`OUTS uses SI (source), not DI; DI changes only for STOS and INS. Also a D-suffix moves 4, not 2.`, `SI is the right register and D=1 does decrement, but OUTSD transfers 4 bytes; −2 would be OUTSW.`, null, `DI is not used by OUTS, and D=1 decrements rather than increments; +2 would fit INSW with D=0.`] }
        ]},
        { title: `Question Two Part 2 · True or false`, marks: `10 marks`, items: [
          { type: `tf`, q: `The Z bit of the EFLAGS register is set to zero if a calculation result = zero.`, a: 1, why: `False. The zero flag ZF is SET to 1 when the result of an operation is zero, and cleared to 0 when the result is not zero (L2, Flags).`, ow: [`False statement: ZF is set to 1 when the result is zero, and cleared to 0 when the result is not zero.`, null] },
          { type: `tf`, q: `LES AX, [DI] copies [DI] and [DI+1] into AX and [DI+2] and [DI+3] into ES.`, a: 0, why: `LES reads 4 bytes from DS×10 + DI: the first two ([DI], [DI+1]) go into the register (offset) and the next two ([DI+2], [DI+3]) into ES (L6, LDS, LES, LSS).`, ow: [null, `The statement is true: the lecture's LES BX, [DI] example loads BX from the first two bytes and ES from the next two.`] },
          { type: `tf`, q: `The Program Counter (PC) is used to save the number of executed instructions.`, a: 1, why: `PC holds the address of the next instruction (L2).`, ow: [`False: the PC holds the address of the next instruction to be fetched; it does not count executed instructions.`, null], key: `Student wrote T.` },
          { type: `tf`, q: `The segment registers include SS, CS, DS, ES, DI and SI.`, a: 1, why: `The segment registers are CS, DS, ES and SS (FS, GS on 80386+); DI and SI are general purpose index registers, not segment registers (L2).`, ow: [`False because DI and SI are general purpose index registers; only CS, DS, ES and SS here are segment registers.`, null] },
          { type: `tf`, q: `In short and far jumps, IP is modified before executing the jump instruction.`, a: 1, why: `IP receives the new value as the result of executing the jump (L8). Doubtful item: the statement is ambiguous.`, ow: [`Per the lecture, IP gets its new value (IP + displacement) as the result of executing the jump, not before; the slides give IPnew = IP + [CS+1].`, null], key: `Student wrote T.` },
          { type: `tf`, q: `The statement MOV AX, DS:[BP-2] is incorrect.`, a: 1, why: `Segment override of BP's default SS with DS is allowed (L4).`, ow: [`It is not incorrect: overriding BP's default segment SS with DS is allowed, and the lecture gives MOV AX, DS:[BP] as an example.`, null] },
          { type: `tf`, q: `The fourth and fifth bytes of the near jump define the segment of the jump address.`, a: 1, why: `That is the far jump; near jumps are 3 bytes (L8).`, ow: [`Near jumps are only 3 bytes (opcode + 2-byte displacement) and stay in the same segment; bytes 4 and 5 holding the segment belong to the far jump.`, null] },
          { type: `tf`, q: `LCS instructions loads any 16-bit or 32-bit register with an offset address, and the SS with a segment address.`, a: 1, why: `There is no LCS; the description is of LSS (L6).`, ow: [`There is no LCS instruction (CS cannot be loaded this way); loading a register and SS with offset and segment is the LSS instruction.`, null] },
          { type: `tf`, q: `Assembly language is machine dependent.`, a: 0, why: `Assembly is hardware dependent: each CPU type has its own machine and assembly language, so a program for one CPU type won't run on another (L1).`, ow: [null, `The statement is true: different manufacturers' CPUs need different assemblers and assembly languages.`] },
          { type: `tf`, q: `LDS AX, [DI] will change the content of DS.`, a: 0, why: `LDS AX, [DI] loads AX with the first two bytes at DS×10 + DI and DS with the next two, so DS is changed (L6, LDS, LES, LSS).`, ow: [null, `LDS changes BOTH the register and DS; in the lecture example LDS BX, [DI] sets DS = 3C00.`] }
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
          { type: `mcq`, q: `An assembler is:`, o: [`easy to run and good with small programs`, `difficult to run but good with small programs`, `easy to run and good with long programs`, `difficult to run and good with long programs`], a: 3, why: `Lecture table: the assembler is hard to run, has more program overhead, is isolated from the machine and is good on long programs (L1, Debugger vs. Assembler).`, ow: [`Easy to run and good on small programs is the debugger's column, the opposite of the assembler.`, `The assembler is hard to run, but it is good on LONG programs; short programs are the debugger's strength.`, `The assembler is good on long programs but is HARD to run; "easy to run" describes the debugger.`, null] },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EFLAGS`, `32 bit registers such as ECX, EDX`, `None`], a: 2, why: `The eight 32-bit general purpose registers are EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI, used mainly for arithmetic and data movement (L2).`, ow: [`CS and DS are 16-bit segment registers, not general purpose ones.`, `EFLAGS is a 32-bit special purpose register (with EIP), not a general purpose one.`, null, `Not "None": option c is right, ECX and EDX are 32-bit general purpose registers.`] },
          { type: `mcq`, q: `The operands in MOV instruction cannot be:`, o: [`register, register`, `memory location, memory location`, `memory location, register`, `immediate data, register`], a: 1, why: `Memory to memory moves are not allowed with MOV (only string instructions can do that), so both operands cannot be memory locations (L3, Register addressing and its restrictions).`, ow: [`Register to register is register addressing, the most common legal form, e.g. MOV AX, BX (same size).`, null, `Memory with a register is legal (direct/displacement addressing), e.g. MOV CL, [123H] or MOV [DI], AX.`, `Immediate data as the SOURCE with a register destination is legal immediate addressing, e.g. MOV AX, 44H (only an immediate destination is forbidden).`] },
          { type: `mcq`, q: `The segment register of the instruction MOV BX, 50[BP] will be:`, o: [`SS`, `CS`, `DS which contains 50`, `ES`], a: 0, why: `The offset 50 + BP uses BP, whose default segment is SS, so the operand is read from the stack segment (L4, Default segment rule).`, ow: [null, `CS is used only for instruction fetches (with IP) or when written as an override; BP defaults to SS.`, `DS is the default for BX, SI, DI or a constant, not BP; and 50 is a displacement added to BP, not DS's content.`, `ES is used only as an override or for string destinations (STOS, INS); with BP the default is SS.`] },
          { type: `mcq`, q: `PROM stands for:`, o: [`programmable read only memory`, `programmable read write memory`, `portable read only memory`, `None of the mentioned`], a: 0, why: `PROM = Programmable Read Only Memory: data is written once, before the chip is installed, using a PROM programmer (L1, Types of memory).`, ow: [null, `PROM is read ONLY memory once programmed; reading and writing in any order describes RAM.`, `The P stands for Programmable (it is written with a PROM programmer), not Portable.`, `Not "None": option a is the exact expansion of PROM.`] }
        ]},
        { title: `Form A · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `You cannot use 1 byte (high or low bits) of ESP register, you can use either 16 or 32 bits.`, a: 0, why: `Only AX, BX, CX, DX have 8-bit halves; ESP has only SP (16 bits) and ESP (32 bits), with no byte parts (L2, General purpose registers).`, ow: [null, `The statement is true: SI, DI, SP and BP have no 8-bit halves, so ESP can be used only as 16 or 32 bits.`] },
          { type: `tf`, q: `The segment registers include SS, CS, DS, ES, DI, and SI.`, a: 1, why: `The segment registers are CS, DS, ES and SS (FS, GS on 80386+); DI and SI are general purpose index registers, not segment registers (L2).`, ow: [`False because DI and SI are general purpose index registers; only SS, CS, DS and ES in this list are segment registers.`, null] },
          { type: `tf`, q: `Default segment cannot be overridden at all.`, a: 1, why: `A default segment can be overridden by writing another segment before the offset, e.g. MOV BL, ES:[1234H] or MOV AX, DS:[BP] (L3, Segment overriding).`, ow: [`Segment overriding exists precisely to replace the default segment, e.g. MOV AL, CS:[BX] uses CS instead of DS.`, null] },
          { type: `tf`, q: `The statement MOV AX, [BP - 2] is incorrect.`, a: 1, why: `[BP − 2] is legal indexed addressing: BP with a displacement subtracted, default segment SS; the lecture lists [BP-2] as legal (L4, Indexed addressing).`, ow: [`It is not incorrect: BP is one of the four pointer registers (BP, BX, SI, DI) and a displacement may be subtracted, so the move is legal.`, null] },
          { type: `tf`, q: `MOV SS, CS is an incorrect instruction.`, a: 0, why: `You cannot move data directly from one segment register to another; MOV SS, CS is the lecture's own example of an incorrect instruction (L3, rule 2).`, ow: [null, `It really is incorrect: segment to segment moves need a general register in between, e.g. MOV AX, CS then MOV SS, AX.`] }
        ]},
        { title: `Form B · Written`, marks: `12 marks`, items: [
          { type: `written`, q: `1- Draw a block diagram of a microcomputer, and describe the functions of PC and MBR. (6 marks)`, ans: `Diagram as in Lecture 1.<br><b>PC</b>: contains the address of an instruction to be fetched.<br><b>MBR</b>: contains a word of data to be written to memory or the word most recently read.` },
          { type: `written`, q: `2- Given SS=10D0H, DS=21B0H, DI=2000H, BP=0100H. Calculate and show by figure the memory address accessed by MOV BX, [DI]. (6 marks)`, ans: `Address = DS×10 + DI = 21B00 + 2000 = <b>23B00</b>.` }
        ]},
        { title: `Form B · Choose`, marks: `5 marks`, items: [
          { type: `mcq`, q: `A debugger is:`, o: [`easy to run and good with small programs`, `difficult to run but good with small programs`, `easy to run and good with long programs`, `difficult to run and good with long programs`], a: 0, why: `Lecture table: the debugger is easy to run, has low overhead, is close to the machine and is good on short programs (L1, Debugger vs. Assembler).`, ow: [null, `A debugger is EASY to run; "difficult to run" is the assembler's column.`, `"Good on long programs" is the assembler; the debugger is good on short (small) programs.`, `Difficult to run and good on long programs is the assembler's description, the opposite of the debugger.`] },
          { type: `mcq`, q: `General purpose registers are:`, o: [`16 bit registers such as CS, DS`, `32 bit registers such as EAX, EBX`, `32 bit registers such as EFLAGS`, `None`], a: 1, why: `The eight general purpose registers are the 32-bit EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI; EFLAGS is special purpose (L2).`, ow: [`CS and DS are 16-bit segment registers, not general purpose registers.`, null, `EFLAGS is a 32-bit special purpose register (with EIP), not a general purpose one.`, `Not "None": option b is right, EAX and EBX are 32-bit general purpose registers.`], key: `The key underlined both b and c.` },
          { type: `mcq`, q: `The operands in MOV instruction cannot be:`, o: [`DS, ES`, `AX, CS`, `EAX, ESP`, `BX, DX`], a: 0, why: `MOV DS, ES moves one segment register into another, which is not allowed in a single instruction; go through a general register (L3, rule 2).`, ow: [null, `MOV AX, CS is legal: reading CS into a general register is allowed; only changing CS or segment-to-segment moves are forbidden.`, `MOV EAX, ESP is legal: two 32-bit general registers of the same size.`, `MOV BX, DX is legal register addressing between two 16-bit general registers.`] },
          { type: `mcq`, q: `The segment register of the instruction MOV 30[BP], BX will be:`, o: [`ES`, `CS`, `SS`, `DS which contains 30`], a: 2, why: `The offset 30 + BP uses BP, whose default segment is SS, so the memory destination is in the stack segment (L4, Default segment rule).`, ow: [`ES is only used when written as an override (or for string destinations); with BP the default is SS.`, `CS is used for instruction fetches with IP, not for data addressed through BP.`, null, `DS is the default for BX, SI, DI or a constant, not BP; and 30 is a displacement added to BP, not DS's content.`] },
          { type: `mcq`, q: `EPROM stands for:`, o: [`Electrically programmable read only memory`, `Erasable programmable read write memory`, `Erasable portable read only memory`, `None of the mentioned`], a: 3, why: `EPROM = Erasable Programmable Read Only Memory; no option matches exactly (L1).`, ow: [`E stands for Erasable (by UV light), not Electrically; "electrically" belongs to EEPROM.`, `EPROM is read ONLY memory, so "read write" makes this expansion wrong.`, `The P stands for Programmable, not Portable, so this expansion is wrong.`, null], key: `The key underlined a (Electrically programmable read only memory).` }
        ]},
        { title: `Form B · True or false`, marks: `5 marks`, items: [
          { type: `tf`, q: `The statement MOV AX, [BP - 2] is correct.`, a: 0, why: `[BP − 2] is legal indexed addressing (BP with a displacement, default segment SS) and AX is 16 bits; the lecture lists [BP-2] as legal (L4).`, ow: [null, `It is correct: the word at SS×10 + BP − 2 is copied into AX; BP may hold an offset and a displacement may be subtracted.`] },
          { type: `tf`, q: `The user visible registers include SS, CS, DS, ES, DI, and SI only.`, a: 1, why: `User-visible registers are general purpose (EAX…ESI), special purpose (EIP, EFLAGS) and segment registers (CS, DS, ES, SS), not just this list (L2).`, ow: [`False: user-visible registers also include EAX, EBX, ECX, EDX, EBP, ESP and the special purpose EIP and EFLAGS, so "only" is wrong.`, null] },
          { type: `tf`, q: `A default segment can be overridden by writing the required segment before the offset.`, a: 0, why: `Segment overriding: writing a segment before the offset replaces the default one, e.g. MOV BL, ES:[1234H] uses ES instead of DS (L3, Segment overriding).`, ow: [null, `The statement is true: it is the lecture's definition of segment overriding, e.g. MOV AL, CS:[BX].`] },
          { type: `tf`, q: `You can use 1 byte (high or low bits) of ESI register by using SH, SL.`, a: 1, why: `Only AX, BX, CX, DX have 8-bit halves; ESI has no byte parts (there is no SH or SL), so it is used as SI (16) or ESI (32) only (L2).`, ow: [`SH and SL do not exist: SI, DI, SP and BP have no 8-bit halves, unlike AX/BX/CX/DX.`, null] },
          { type: `tf`, q: `MOV [AX], [150H] is a correct instruction.`, a: 1, why: `Two errors: MOV cannot move memory to memory, and AX cannot be used as a pointer (only BX, BP, SI, DI); the lecture lists MOV [AX], [5000H] as incorrect (L3).`, ow: [`It is incorrect: both operands are memory locations (not allowed except in string instructions), and [AX] is not a valid pointer.`, null] }
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
