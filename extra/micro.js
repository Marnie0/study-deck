window.EXTRA = window.EXTRA || {};
EXTRA.micro = {
  1: [
    { q: `Which statement best describes why an assembly program written for one CPU type will not run on another?`,
      o: [
        [`Assembly programs must always be compiled by a high-level compiler first`, `Assembly is translated by an assembler, not a compiler.`],
        [`Each CPU type has its own machine language and assembly language`, `Correct. Assembly language is hardware dependent.`],
        [`Assembly programs are stored in ROM and cannot be copied`, `Where a program is stored has nothing to do with portability; it fails on another CPU because each CPU type has its own machine and assembly language.`],
        [`Assembly language is machine independent like Java`, `High-level languages are the machine-independent ones.`]
      ], a: 1 },
    { q: `Which part of the CPU coordinates the sequencing of steps involved in executing machine instructions?`,
      o: [
        [`ALU`, `The ALU performs arithmetic and logic operations.`],
        [`Clock`, `The clock synchronizes operations; it does not sequence instruction steps.`],
        [`Registers`, `Registers are high-speed temporary storage inside the CPU; they hold data but do not sequence the steps of instructions. That is the control unit.`],
        [`Control unit`, `Correct. That is the lecture definition of the CU.`]
      ], a: 3 },
    { q: `A firmware chip holding the BIOS must be updatable without removing it from the motherboard. Which memory type fits?`,
      o: [
        [`PROM`, `PROM can be written only once, so firmware in it could never be updated at all.`],
        [`EPROM`, `EPROM must be removed and erased with UV light.`],
        [`EEPROM`, `Correct. It is rewritten electrically on the board (slowly) and is used for the BIOS.`],
        [`ROM`, `ROM is written once and never changed, so a BIOS in plain ROM could not be updated.`]
      ], a: 2 },
    { q: `Which bus holds the address of the data when the current instruction transfers data between the CPU and memory?`,
      o: [
        [`Address bus`, `Correct. The address bus holds the addresses of instructions and data when the executing instruction transfers data between the CPU and memory (L1, Buses).`],
        [`Data bus`, `The data bus carries the instructions and data themselves, not their addresses; addresses travel on the address bus.`],
        [`Control bus`, `The control bus carries synchronizing signals.`],
        [`System clock line`, `The clock is a CPU component that synchronizes operations, not one of the three buses (data, address, control).`]
      ], a: 0 },
    { q: `Which pair is NOT correct for the debugger vs assembler comparison?`,
      o: [
        [`Debugger: close to the machine`, `This pair is correct, so it is not the answer: the lecture table lists the debugger as close to the machine.`],
        [`Assembler: more program overhead`, `This pair is correct, so it is not the answer: the assembler has more program overhead, the debugger low overhead.`],
        [`Debugger: good on long programs`, `Correct choice. The debugger is good on SHORT programs; the assembler is good on long ones.`],
        [`Assembler: hard to run`, `This pair is correct, so it is not the answer: the assembler is hard to run, the debugger easy to run.`]
      ], a: 2 },
    { q: `What does the assembler produce from an assembly source file?`,
      o: [
        [`A high-level C program`, `An assembler translates downward, from assembly into machine code; it never produces a high-level C program.`],
        [`Object code (.OBJ)`, `Correct. Source code is translated into object code.`],
        [`A list of registers`, `Registers are CPU hardware, not a translator output; the assembler outputs object code in a .OBJ file.`],
        [`A new BIOS`, `The BIOS is firmware stored in EEPROM; an assembler simply turns .ASM source into .OBJ object code.`]
      ], a: 1 },
    { q: `Which type of software allows programmers to build computer software?`,
      o: [
        [`System software`, `System software consists of programs that let the hardware run properly, not tools for building software.`],
        [`Application software`, `Application software lets users do tasks on the computer besides running the hardware; tools for building software are programming software.`],
        [`Firmware`, `Not one of the three categories in the lecture.`],
        [`Programming software`, `Correct. The lecture defines programming software as the category that allows programmers to build computer software (L1, Hardware, software and the compiler).`]
      ], a: 3 },
    { q: `An EPROM chip can be recognized physically by:`,
      o: [
        [`A small transparent window on top of the IC package`, `Correct. It admits the UV light used for erasing.`],
        [`A battery attached to the chip`, `The lecture describes no battery on EPROM; its mark is the transparent window that admits the UV light used for erasing.`],
        [`Having no pins`, `Every IC package has pins to connect to the board; the EPROM's distinguishing feature is the small transparent window on top.`],
        [`A built-in keyboard`, `Chips have no keyboards; the EPROM is recognized by the transparent window that lets UV light in to erase it.`]
      ], a: 0 },
    { q: `Which component synchronizes the internal operations of the CPU with other system components?`,
      o: [
        [`ALU`, `The ALU performs arithmetic (add, subtract) and logic (AND, OR, NOT) operations; it does not synchronize the CPU with other components.`],
        [`Clock`, `Correct. The clock synchronizes the internal operations of the CPU with other system components, giving the basic timing (L1, Microcomputer block diagram).`],
        [`MAR`, `The MAR (memory address register) only holds the address being accessed; synchronization is the clock's job.`],
        [`Data bus`, `The data bus transfers instructions and data between CPU and memory; it does not provide timing or synchronization.`]
      ], a: 1 },
    { q: `Which language is "one step away from machine language" and lets the programmer use names instead of numbers?`,
      o: [
        [`High-level language`, `High-level languages are machine independent and further from machine language, not one step away from it.`],
        [`Machine language`, `Machine language is itself the 0s and 1s; it uses numbers only, not names. Assembly is the step above it.`],
        [`Assembly language`, `Correct. Assembly is one step away from machine language, with the same structure and commands but names (mnemonics) instead of numbers (L1, Assembly language and the assembler).`],
        [`Natural language`, `Natural (human) language is not one of the three programming language categories; the language one step from machine code is assembly.`]
      ], a: 2 }
  ],
  2: [
    { q: `AX = 3039h. What are AH and AL?`,
      o: [
        [`AH = 39h, AL = 30h`, `This swaps the halves: AH is the UPPER byte of AX (30h) and AL the lower byte (39h).`],
        [`AH = 30h, AL = 39h`, `Correct. Upper 8 bits = 30h, lower 8 bits = 39h (the lab's 0011000000111001b).`],
        [`AH = 3039h, AL = 0`, `AH is only 8 bits wide, so it cannot hold the 16-bit value 3039h; it holds the upper byte 30h.`],
        [`AH = 03h, AL = 09h`, `Each half holds a full byte (two hex digits), not one digit: AH = 30h and AL = 39h.`]
      ], a: 1 },
    { q: `Which register would you use as the counter of a LOOP instruction?`,
      o: [
        [`AX`, `AX is the accumulator for math and logic (and MUL/DIV); the counter of LOOP, shifts and rotates is CX.`],
        [`BX`, `BX is the base register, holding the base/offset address of a memory location; LOOP counts with CX.`],
        [`DX`, `DX is the data register, the extension of AX in MUL/DIV; LOOP uses CX as its counter.`],
        [`CX`, `Correct. CX is the count register, used as the counter for LOOP, rotate and shift instructions (L2, Roles of each register).`]
      ], a: 3 },
    { q: `Which register contains the instruction most recently fetched?`,
      o: [
        [`IR`, `Correct. The Instruction Register (IR) contains the instruction most recently fetched (L2, User-invisible registers).`],
        [`PC`, `PC holds the address of the next instruction.`],
        [`MAR`, `The MAR holds the address of a memory location, not the fetched instruction itself.`],
        [`MBR`, `The MBR holds a data word written to or read from memory, not the most recently fetched instruction.`]
      ], a: 0 },
    { q: `Which of these is a status flag (reflects a result) rather than a control flag?`,
      o: [
        [`DF`, `DF (direction) is the one CONTROL flag, set by the programmer to choose the direction of string instructions; it does not reflect a result.`],
        [`TF`, `TF (trap) is a system flag that enables single-stepping; it does not reflect the result of an operation.`],
        [`ZF`, `Correct. ZF is a status flag: it reflects the outcome of an operation (set to 1 when the result is zero), like CF, PF, AF, SF, OF (L2, EFLAGS bits).`],
        [`IF`, `IF (interrupt) is a system flag that enables or disables interrupts; it does not reflect a result.`]
      ], a: 2 },
    { q: `Which register name does NOT exist in the 8086 programming model?`,
      o: [
        [`BH`, `BH exists: it is the high byte of BX, since BX is one of the four registers with 8-bit halves.`],
        [`SL`, `Correct. SL does not exist: SI (like DI, SP, BP) has no 8-bit halves; only AX, BX, CX, DX do (L2, General purpose registers).`],
        [`DL`, `DL exists: it is the low byte of DX, one of the four registers with 8-bit halves.`],
        [`SP`, `SP exists: it is the 16-bit stack pointer, the offset of the top of the stack.`]
      ], a: 1 },
    { q: `Adding two unsigned bytes gives a result larger than 255. Which flag reports this?`,
      o: [
        [`SF`, `SF reports that the result is negative (MSB = 1); it does not report an unsigned result too large for the byte.`],
        [`ZF`, `ZF reports that the result is zero, not that it exceeded 255.`],
        [`OF`, `OF reports SIGNED overflow (result outside the signed range); an unsigned result above 255 is reported by CF.`],
        [`CF`, `Correct. Unsigned result too large for the destination.`]
      ], a: 3 },
    { q: `Which segment register holds the base of the area where local function variables and parameters are kept?`,
      o: [
        [`SS`, `Correct. The stack segment, addressed by SS, holds local function variables and function parameters (L2, Segment registers).`],
        [`CS`, `CS addresses the code segment, which holds program instructions, not local variables and parameters.`],
        [`DS`, `DS addresses the data segment, which holds the program's variables (data), not function locals and parameters on the stack.`],
        [`ES`, `ES is the extra segment, another data segment; local variables and parameters are kept in the stack segment (SS).`]
      ], a: 0 },
    { q: `What is the main benefit of user-visible registers according to the lecture?`,
      o: [
        [`They control the CPU automatically without the programmer`, `Controlling the CPU's operation is the job of user-INVISIBLE (control/status) registers, not the benefit of user-visible ones.`],
        [`They let the programmer minimize main memory references`, `Correct. User-visible registers can be referenced by machine language, letting the programmer minimize main memory references by optimizing register use (L2, Register classification).`],
        [`They increase the size of RAM`, `Registers are inside the CPU and do not change the size of RAM; their benefit is fewer main memory references.`],
        [`They replace the cache`, `The lecture does not mention cache at all; the stated benefit is minimizing main memory references.`]
      ], a: 1 },
    { q: `Which register is listed as the "Destination Index" used with string instructions?`,
      o: [
        [`SI`, `SI is the Source Index, holding the source data for string instructions, not the destination.`],
        [`BP`, `BP is the base pointer, used to address an array of data in the stack, not the string destination.`],
        [`DI`, `Correct. DI is the Destination Index, holding the destination data for string instructions (L2, Roles of each register).`],
        [`DX`, `DX is the data register, the extension of AX in MUL/DIV; the destination index is DI.`]
      ], a: 2 },
    { q: `EAX = 12345678h. What is AX?`,
      o: [
        [`1234h`, `1234h is the upper 16 bits of EAX, which have no separate name; AX is the LOWER 16 bits, 5678h.`],
        [`78h`, `78h is only the lowest byte, AL; AX is the full lower 16 bits, 5678h (AH = 56h, AL = 78h).`],
        [`12345678h`, `12345678h is all 32 bits, i.e. EAX itself; AX is just the lower 16 bits, 5678h.`],
        [`5678h`, `Correct. AX is the lower 16 bits of EAX: 12345678h → AX = 5678h (AH = 56h, AL = 78h) (L2, General purpose registers).`]
      ], a: 3 }
  ],
  3: [
    { q: `DS = 2500H. What is the physical address of MOV AL, [0120H]?`,
      o: [
        [`25120`, `Correct. DS×10H + offset = 25000 + 0120 = 25120 (L3, Segment:offset and the physical address).`],
        [`2620`, `2620 = 2500 + 0120: DS was added without first being multiplied by 10H. The base is 25000, giving 25120.`],
        [`26200`, `26200 = (2500 + 0120)×10: the offset was shifted too. Only the segment is shifted: 25000 + 0120 = 25120.`],
        [`25012`, `25012 adds the offset one digit too far right (as 12 instead of 120); 25000 + 0120 = 25120.`]
      ], a: 0 },
    { q: `ES = 3A00H. MOV CL, ES:[0FF0H] accesses which address?`,
      o: [
        [`3A0FF0`, `3A0FF0 just glues the segment and offset together. The address is ES×10H + offset = 3A000 + 0FF0 = 3AFF0.`],
        [`3AFF0`, `Correct. ES×10H + offset = 3A000 + 0FF0 = 3AFF0 (L3, Segment:offset and the physical address).`],
        [`49F0`, `49F0 = 3A00 + 0FF0: ES was not multiplied by 10H. With the shift, 3A000 + 0FF0 = 3AFF0.`],
        [`3B0F0`, `3B0F0 is 3A000 + 10F0, an addition slip; the correct sum is 3A000 + 0FF0 = 3AFF0.`]
      ], a: 1 },
    { q: `Which instruction is valid?`,
      o: [
        [`MOV DS, CS`, `MOV DS, CS is a segment-to-segment move, not allowed in one instruction; copy through AX instead.`],
        [`MOV CS, AX`, `MOV CS, AX is incorrect because changing the value of CS is not allowed.`],
        [`MOV DS, AX`, `Correct. A segment register can be loaded from a general register of the same size (16-bit), so MOV DS, AX is valid (L3, Register addressing).`],
        [`MOV AL, BX`, `MOV AL, BX mixes an 8-bit and a 16-bit register; both operands must be the same size.`]
      ], a: 2 },
    { q: `How do you copy CS into DS?`,
      o: [
        [`MOV DS, CS`, `MOV DS, CS moves one segment register to another in one instruction, which is not allowed.`],
        [`XCHG DS, CS`, `XCHG cannot take segment registers either, and it would also change CS, which is not allowed.`],
        [`MOV CS, DS`, `MOV CS, DS changes CS (forbidden), and it is a segment-to-segment move, and the direction is backwards.`],
        [`MOV AX, CS then MOV DS, AX`, `Correct. Segment-to-segment moves are illegal, so go through a general register: MOV AX, CS then MOV DS, AX (L3, Register addressing and its restrictions).`]
      ], a: 3 },
    { q: `MOV CL, [123H] belongs to which mode in the lecture's naming?`,
      o: [
        [`Displacement addressing`, `Correct. Direct addressing is for AL/AX/EAX; other registers = displacement.`],
        [`Immediate addressing`, `Immediate means a constant is the data; [123H] in brackets is an address in memory, so the data comes from memory.`],
        [`Register addressing`, `Register addressing has only register operands; [123H] is a memory operand.`],
        [`Base plus index`, `Base plus index needs BX/BP plus SI/DI in brackets (e.g. [BX+SI]); [123H] is just a fixed offset.`]
      ], a: 0 },
    { q: `Which instruction is INVALID because of operand size?`,
      o: [
        [`MOV AX, BX`, `MOV AX, BX is valid: both are 16-bit registers.`],
        [`MOV SI, BL`, `Correct. SI is 16 bits and BL is 8 bits; both operands must be the same size, so the move is invalid (L3, Register addressing and its restrictions).`],
        [`MOV EAX, EBX`, `MOV EAX, EBX is valid: both are 32-bit registers.`],
        [`MOV CH, 100`, `MOV CH, 100 is valid immediate addressing: 100 fits in the 8-bit register CH.`]
      ], a: 1 },
    { q: `MOV AX, 5 / MOV BX, 3 / XCHG AX, BX. Final values?`,
      o: [
        [`AX = 5, BX = 3`, `These are the values BEFORE XCHG; XCHG swaps the two registers, so AX = 3 and BX = 5.`],
        [`AX = 3, BX = 3`, `Both 3 is what MOV AX, BX would give; XCHG exchanges the values, so BX gets AX's old 5.`],
        [`AX = 3, BX = 5`, `Correct. AX = 5 and BX = 3, then XCHG AX, BX exchanges them: AX = 3, BX = 5 (Lab 3).`],
        [`AX = 8, BX = 0`, `XCHG does no arithmetic; it only exchanges the contents: AX = 3, BX = 5.`]
      ], a: 2 },
    { q: `MOV AX, 5 / ADD AX, 3 / SUB AX, 2 / MOV CX, AX. What is CX?`,
      o: [
        [`10`, `10 comes from adding the 2 (5 + 3 + 2); SUB subtracts it: 5 + 3 − 2 = 6.`],
        [`8`, `8 is AX after ADD only; SUB AX, 2 then makes it 6 before it is copied into CX.`],
        [`5`, `5 is only the starting value of AX; CX gets the final AX after ADD and SUB, which is 6.`],
        [`6`, `Correct. AX = 5, ADD → 8, SUB → 6, then MOV CX, AX copies it: CX = 6 (Lab 3).`]
      ], a: 3 },
    { q: `DS = 0FFFH. What is the address of MOV AL, [0010H]?`,
      o: [
        [`10000`, `Correct. DS×10H + offset = 0FFF0 + 0010 = 10000 (hex addition carries all the way) (L3, Segment:offset and the physical address).`],
        [`0FFF10`, `0FFF10 just appends the offset digits to the segment; the offset must be ADDED to DS×10H: 0FFF0 + 0010 = 10000.`],
        [`1000F`, `1000F is a carry slip in hex addition; 0FFF0 + 0010 = 10000 exactly.`],
        [`0FFFA`, `0FFFA treats the offset 0010H as decimal 10 (= 0AH); in hex 0FFF0 + 10H = 10000.`]
      ], a: 0 },
    { q: `Which statement about MOV EAX, ESP is true?`,
      o: [
        [`It causes an error because ESP is special`, `ESP is one of the eight general purpose registers, so copying it into EAX (same 32-bit size) is valid.`],
        [`It copies ESP into EAX and ESP keeps its value`, `Correct. MOV copies ESP into EAX; the source keeps its value, since MOV never deletes the source (L3, Register addressing).`],
        [`It moves only SP into AX`, `Both operands are 32-bit, so all 32 bits of ESP go into EAX, not just SP into AX.`],
        [`It clears ESP`, `MOV never changes its source; ESP keeps its value and EAX receives a copy.`]
      ], a: 1 }
  ],
  4: [
    { q: `DS = 2000H, BX = 0300H, SI = 0050H. Address of MOV AL, [BX+SI]?`,
      o: [
        [`20350`, `Correct. BX and SI default to DS: DS×10 + BX + SI = 20000 + 300 + 50 = 20350 (L4, Base plus index).`],
        [`2350`, `2350 adds DS without shifting it: the segment must be multiplied by 10H first, giving 20000 + 300 + 50 = 20350.`],
        [`20305`, `20305 adds SI as 5 instead of 50 (wrong digit position); offsets are added as full hex numbers: 20000 + 300 + 50 = 20350.`],
        [`23050`, `23050 treats BX as 3000 instead of 0300; only the segment is shifted, so the result is 20000 + 300 + 50 = 20350.`]
      ], a: 0 },
    { q: `SS = 3000H, DS = 1000H, BP = 0200H. Address of MOV AX, 10[BP]?`,
      o: [
        [`10210`, `10210 uses DS, but BP's default segment is SS, so the base is SS×10 = 30000, giving 30210.`],
        [`30210`, `Correct. BP defaults to SS: SS×10 + 10 + BP = 30000 + 10 + 200 = 30210 (L4, Indexed addressing).`],
        [`3210`, `3210 forgets to shift SS one hex digit; the base is SS×10 = 30000, so the address is 30210.`],
        [`30201`, `30201 adds the displacement 10 as 1 (wrong digit position); 30000 + 200 + 10 = 30210.`]
      ], a: 1 },
    { q: `Which instruction uses SS as its default segment?`,
      o: [
        [`MOV AL, [BX]`, `[BX] is register indirect with BX, whose default segment is DS, not SS.`],
        [`MOV AL, [SI+4]`, `[SI+4] uses SI with a displacement; SI's default segment is DS, not SS.`],
        [`MOV AL, [BP+SI]`, `Correct. Whenever BP is part of the address, the default segment is SS, so [BP+SI] reads SS×10 + BP + SI (L4, Default segment rule).`],
        [`MOV AL, [1234H]`, `[1234H] is direct addressing with a constant offset; constants default to DS, not SS.`]
      ], a: 2 },
    { q: `DS = 1200H, DI = 0100H. MOV AX, 20[DI] reads which two bytes into AL and AH?`,
      o: [
        [`AL from 12120, AH from 12121`, `Correct. Address 12000 + 20 + 100 = 12120; low byte first.`],
        [`AL from 12121, AH from 12120`, `Little-endian: the low byte is at the lower address.`],
        [`AL from 1320, AH from 1321`, `1320 adds DS without shifting it (1200 + 20 + 100); DS×10 = 12000 gives AL from 12120 and AH from 12121.`],
        [`AL from 12102, AH from 12103`, `12102 adds the displacement 20 as 2; the full offset is 20 + 100 = 120, so the bytes are at 12120 and 12121.`]
      ], a: 0 },
    { q: `Which register cannot be used inside brackets as a pointer in 16-bit 8086 code?`,
      o: [
        [`BX`, `BX is one of the four 16-bit pointer registers (BX, BP, SI, DI), so [BX] is valid with default segment DS.`],
        [`BP`, `BP is a valid pointer register; [BP] is legal and uses SS by default.`],
        [`DI`, `DI is a valid index pointer register; [DI] is legal and uses DS by default.`],
        [`CX`, `Correct. Only BX, BP, SI, DI can be pointers.`]
      ], a: 3 },
    { q: `DS = 1000H, BX = 0F00H, DI = 0200H. Address of MOV AL, 50[BX][DI]?`,
      o: [
        [`11150`, `Correct. BX and DI default to DS: 10000 + 50 + F00 + 200 = 11150 (L4, Base plus index plus displacement).`],
        [`10F50`, `10F50 leaves out DI (10000 + F00 + 50); every offset part must be added, including DI = 200, giving 11150.`],
        [`11100`, `11100 leaves out the displacement 50 (10000 + F00 + 200); adding it gives 11150.`],
        [`1F150`, `1F150 does not come from the correct sum: the offset parts are 50 + 0F00 + 200 = 1150, and DS × 10 = 10000, so the address is 10000 + 1150 = 11150. Keep BX as 0F00 (not F000).`]
      ], a: 0 },
    { q: `In base plus index addressing, which pair is a valid base and index?`,
      o: [
        [`SI and DI`, `SI and DI are both index registers; base plus index needs one base (BX or BP) and one index (SI or DI).`],
        [`BX and BP`, `BX and BP are both base registers; the mode needs one base and one index, so two bases cannot be combined.`],
        [`BX and SI`, `Correct. Base plus index uses one base register (BX or BP) and one index register (SI or DI); BX + SI fits, e.g. MOV AL, [BX][SI] (L4, Base plus index).`],
        [`AX and SI`, `AX is a general-purpose register that cannot be a memory pointer; the bases are only BX and BP.`]
      ], a: 2 },
    { q: `SS = 1400H, BP = 1500H, SI = 0100H. MOV AL, [BP+SI-200H] accesses:`,
      o: [
        [`15600`, `15600 is 14000 + 1500 + 100 without the -200; that is the answer for [SI][BP] in Sheet 1, not [BP+SI-200H].`],
        [`13400`, `13400 does not come from the rule: BP means SS, so 14000 + 1500 + 100 - 200 = 15400.`],
        [`15800`, `15800 adds 200 instead of subtracting it; with -200H the address is 14000 + 1500 + 100 - 200 = 15400.`],
        [`15400`, `Correct. 14000 + 1500 + 100 - 200 = 15400 (Sheet 1).`]
      ], a: 3 },
    { q: `MOV AX, DS:[BP] means:`,
      o: [
        [`An error: BP can only be used with SS`, `Segment overriding is allowed: DS: replaces BP's default SS. The lecture gives MOV AX, DS:[BP] as a valid example.`],
        [`Segment override: address = DS×10 + BP`, `Correct. DS: overrides BP's default segment SS, so AX is loaded from the word at DS×10 + BP (L4, Register indirect addressing).`],
        [`AX is loaded with DS + BP`, `The brackets mean memory: AX gets the word stored at DS×10 + BP, not the sum DS + BP itself.`],
        [`Address = SS×10 + DS + BP`, `Only one segment forms an address; the override replaces SS with DS, giving DS×10 + BP. SS is not used at all.`]
      ], a: 1 },
    { q: `DS = 4000H, SI = 0FFFH. Address of MOV BL, [SI+1]?`,
      o: [
        [`40FFF`, `40FFF forgets the +1 displacement; FFF + 1 = 1000 in hex, so the address is 40000 + 1000 = 41000.`],
        [`41000`, `Correct. SI defaults to DS: 40000 + FFF + 1 = 41000, since FFF + 1 carries to 1000 in hex (L4, Indexed addressing).`],
        [`40FFF1`, `40FFF1 writes the 1 after the digits instead of adding it; a physical address is a 5-digit hex sum, 40000 + FFF + 1 = 41000.`],
        [`4100`, `4100 forgets to shift DS one hex digit; the base is DS×10 = 40000, giving 41000.`]
      ], a: 1 }
  ],
  5: [
    { q: `SS = 0500H, SP = 0100H, AX = 1234H. After PUSH AX, which bytes are written and what is SP?`,
      o: [
        [`[050FF] = 34, [050FE] = 12, SP = 00FE`, `The bytes are swapped: the high byte AH = 12 goes to SP-1 (050FF) and the low byte AL = 34 to SP-2 (050FE).`],
        [`[050FF] = 12, [050FE] = 34, SP = 00FE`, `Correct. Address 05000 + 0100 = 05100; AH at 050FF, AL at 050FE.`],
        [`[05101] = 12, [05102] = 34, SP = 0102`, `PUSH writes below SP and decrements it; writing above at 05101/05102 with SP = 0102 is the wrong direction.`],
        [`[050FF] = 12, [050FE] = 34, SP = 0100`, `The bytes are right, but PUSH also decrements SP by 2, so SP becomes 00FE, not 0100.`]
      ], a: 1 },
    { q: `SP = 0200H. After PUSH AX, PUSH BX, POP CX, what is SP?`,
      o: [
        [`01FE`, `Correct. Each PUSH subtracts 2 and the POP adds 2: 200 - 2 - 2 + 2 = 1FE (L5, PUSH and POP).`],
        [`01FC`, `01FC is SP after the two PUSHes only; the POP CX adds 2 back, giving 01FE.`],
        [`0200`, `0200 would need equal PUSHes and POPs; two pushes and one pop leave SP 2 lower, at 01FE.`],
        [`0202`, `0202 treats PUSH as increasing SP; PUSH decreases it, so 200 - 4 + 2 = 1FE.`]
      ], a: 0 },
    { q: `MOV AX, 1111h / MOV BX, 2222h / PUSH AX / PUSH BX / POP AX / POP BX. Final AX and BX?`,
      o: [
        [`AX = 1111h, BX = 2222h`, `The stack is LIFO: POP AX takes the last pushed value (2222h) and POP BX the first (1111h), so the values swap.`],
        [`AX = 2222h, BX = 2222h`, `POP BX runs second and gets the first pushed value, AX's 1111h, not 2222h.`],
        [`AX = 1111h, BX = 1111h`, `POP AX runs first and gets the last pushed value, BX's 2222h, not 1111h.`],
        [`AX = 2222h, BX = 1111h`, `Correct. LIFO: POP AX takes the top value 2222h (pushed last), then POP BX takes 1111h, so AX and BX are swapped (L5, The stack).`]
      ], a: 3 },
    { q: `In which order does PUSHA push the registers?`,
      o: [
        [`AX, BX, CX, DX, SP, BP, SI, DI`, `PUSHA does not use alphabetical order: after AX come CX and DX, then BX (AX, CX, DX, BX, SP, BP, SI, DI).`],
        [`DI, SI, BP, SP, BX, DX, CX, AX`, `DI, SI, BP, SP, BX, DX, CX, AX is POPA's order, the reverse that restores what PUSHA saved.`],
        [`AX, CX, DX, BX, SP, BP, SI, DI`, `Correct. The lecture gives PUSHA's order as AX, CX, DX, BX, SP, BP, SI, DI (8 words, SP - 16) (L5, PUSH).`],
        [`AX, CX, DX, BX, SI, DI, SP, BP`, `After BX, PUSHA pushes SP and BP and only then SI and DI; this option puts SI, DI before SP, BP.`]
      ], a: 2 },
    { q: `ESP = 00FFFFE8. What is ESP after PUSH EAX then PUSH AX?`,
      o: [
        [`00FFFFE2`, `Correct. PUSH EAX subtracts 4 and PUSH AX subtracts 2: E8 - 4 = E4, E4 - 2 = E2, so ESP = 00FFFFE2 (L5, PUSH).`],
        [`00FFFFE4`, `00FFFFE4 is ESP after PUSH EAX only; PUSH AX then subtracts 2 more, giving 00FFFFE2.`],
        [`00FFFFE0`, `00FFFFE0 subtracts 4 twice; PUSH AX is a 16-bit push and only subtracts 2, giving 00FFFFE2.`],
        [`00FFFFEE`, `00FFFFEE adds 6 instead of subtracting; PUSH decreases ESP, so E8 - 4 - 2 = E2.`]
      ], a: 0 },
    { q: `SS = 2000H, SP = 0010H, and memory 20010 = 78, 20011 = 56. After POP DX:`,
      o: [
        [`DX = 7856, SP = 000E`, `POP increases SP and the first byte is the low byte.`],
        [`DX = 5678, SP = 0012`, `Correct. POP DX reads SS:[SP] = 20010: the lower byte 78 goes to DL and 56 to DH, so DX = 5678; then SP = 0010 + 2 = 0012 (L5, POP).`],
        [`DX = 7856, SP = 0012`, `SP is right, but the byte order is reversed: the byte at the lower address (78) is the low byte DL, so DX = 5678.`],
        [`DX = 5678, SP = 0010`, `DX is right, but POP increments SP by 2 after reading, so SP becomes 0012, not 0010.`]
      ], a: 1 },
    { q: `Why must a procedure execute the same number of POPs as PUSHes before RET?`,
      o: [
        [`Because RET pops the return address from the top of the stack`, `Correct. An unbalanced stack makes RET jump to a wrong address.`],
        [`Because POP is faster than PUSH`, `Speed has nothing to do with it; the counts must balance so the return address is on top when RET pops it.`],
        [`Because SS changes on every PUSH`, `SS never changes on PUSH or POP; only SP changes. The issue is RET popping the right return address.`],
        [`Because the flags must be cleared`, `The flags are unrelated; balancing PUSH/POP keeps the return address at the top of the stack for RET.`]
      ], a: 0 },
    { q: `What does PUSHF / STC / POPF do to the carry flag overall?`,
      o: [
        [`CF stays 1 permanently`, `STC sets CF only until POPF, which restores the whole FLAGS register (including the old CF) saved by PUSHF.`],
        [`CF is cleared`, `CF is not forced to 0: POPF restores whatever value CF had when PUSHF saved the flags.`],
        [`CF becomes the parity flag`, `POPF restores each flag to its own saved value; no flag becomes another flag.`],
        [`CF returns to its value before PUSHF`, `Correct. PUSHF saves FLAGS, STC sets CF, and POPF restores the saved FLAGS, so CF returns to its original value (L5, PUSH).`]
      ], a: 3 },
    { q: `Which instruction cannot be used?`,
      o: [
        [`PUSH 1234h`, `PUSH 1234h is allowed: the lecture says the PUSH target can be a register, memory operand or immediate value.`],
        [`POP 1234h`, `Correct. POP needs a register or memory destination.`],
        [`PUSH [BX]`, `PUSH [BX] is allowed: PUSH accepts a memory operand and stores the word at DS:[BX] on the stack.`],
        [`POP DS`, `POP DS is allowed (a common way to load DS); the only segment register POP cannot target is CS.`]
      ], a: 1 },
    { q: `SP = 0100H. After PUSHA, SP equals:`,
      o: [
        [`00F8`, `00F8 subtracts only 8 bytes; PUSHA saves 8 registers of 2 bytes each, 16 bytes = 10H, giving 00F0.`],
        [`0110`, `0110 adds 10H; PUSHA is a push, so SP decreases: 100 - 10 = F0.`],
        [`00F0`, `Correct. 8 words = 16 bytes = 10H: 100 - 10 = F0.`],
        [`00E0`, `00E0 subtracts 32 bytes (20H), which is PUSHAD (8 double words); PUSHA pushes 8 words = 16 bytes, so 100 - 10 = F0.`]
      ], a: 2 }
  ],
  6: [
    { q: `DI = 0040H and DS:0040 holds the word 9ABCH. After LEA BX, [DI]:`,
      o: [
        [`BX = 9ABCH`, `9ABCH is the data at DS:0040, which MOV BX, [DI] would load. LEA loads the offset address itself, 0040H.`],
        [`BX = DS`, `LEA does not copy a segment register; it loads the offset of the operand, so BX = DI = 0040H.`],
        [`BX = 0040H`, `Correct. LEA loads the address specified by [DI], i.e. the offset 0040H, not the word 9ABCH stored there (L6, LEA).`],
        [`BX = 0`, `LEA does not clear the register; it loads the computed offset, which here is DI = 0040H.`]
      ], a: 2 },
    { q: `DS = 3000H, SI = 0010H; memory 30010..30013 = 11, 22, 33, 44. After LES AX, [SI]:`,
      o: [
        [`AX = 2211, ES = 4433`, `Correct. First word → AX, second word → ES (little-endian).`],
        [`AX = 1122, ES = 3344`, `This reads the bytes high-first. Little-endian: 30010=11 is the low byte, so AX = 2211 and ES = 4433.`],
        [`AX = 2211, DS = 4433`, `AX = 2211 is right, but LES loads the second word into ES, not DS; DS stays 3000H.`],
        [`AX = 4433, ES = 2211`, `The words are swapped: the first word (30010, 30011) goes to AX and the second (30012, 30013) to ES.`]
      ], a: 0 },
    { q: `Which instruction changes DS?`,
      o: [
        [`LES BX, [DI]`, `LES BX, [DI] loads its segment word into ES; DS is only used to address the source and is not changed.`],
        [`LSS SP, [SI]`, `LSS SP, [SI] loads SP and SS; DS is used for addressing but stays the same.`],
        [`LEA BX, [DI]`, `LEA loads only an offset into BX and never touches any segment register.`],
        [`LDS SI, [BX]`, `Correct. LDS loads the offset into SI and the second word read from memory into DS, so it changes DS (L6, LDS, LES, LSS).`]
      ], a: 3 },
    { q: `Why is MOV BX, OFFSET LIST faster than LEA BX, LIST?`,
      o: [
        [`The assembler computes the offset of LIST before execution`, `Correct. With OFFSET the assembler computes LIST's offset before execution; LEA makes the microprocessor compute the address at run time, so it is slower (L6, LEA vs OFFSET).`],
        [`OFFSET reads memory twice`, `MOV BX, OFFSET LIST does not read memory at all: the offset is a constant computed by the assembler.`],
        [`LEA uses the stack`, `Neither instruction uses the stack; LEA is slower only because the microprocessor computes the address itself.`],
        [`OFFSET uses ES`, `OFFSET does not involve ES or any segment register; it is an assembler directive giving LIST's offset.`]
      ], a: 0 },
    { q: `Which operand needs LEA rather than OFFSET?`,
      o: [
        [`LIST`, `LIST is a simple operand, so MOV BX, OFFSET LIST works for it (and is faster than LEA).`],
        [`LIST[SI]`, `Correct. OFFSET only works with simple operands like LIST; complex operands such as [DI] or LIST[SI] need LEA, computed at run time (L6, LEA vs OFFSET).`],
        [`A label in the data segment`, `A plain data label is a simple operand whose offset the assembler knows, so OFFSET handles it.`],
        [`A named variable X`, `A named variable X is a simple operand, so MOV reg, OFFSET X works; LEA is needed only for complex operands.`]
      ], a: 1 },
    { q: `DS = 1000H, DI = 0200H. LDS BX, [DI] reads its 4 bytes starting at:`,
      o: [
        [`10200`, `Correct. The 4 bytes are read from the old DS: DS×10 + DI = 10000 + 200 = 10200; DS changes only after the read (L6, Lecture example LDS BX, [DI]).`],
        [`1200`, `1200 comes from DS + DI without multiplying DS by 10H. The physical address is 10000 + 200 = 10200.`],
        [`0200`, `0200 is only the offset in DI; the segment part DS×10 = 10000 must be added, giving 10200.`],
        [`It depends on the new DS`, `The address is computed with DS BEFORE it is changed; the new DS is only the result of the instruction.`]
      ], a: 0 },
    { q: `After LSS SP, [BX] the next PUSH uses which address?`,
      o: [
        [`The old SS with the new SP`, `LSS loads both SP and SS, so the next PUSH uses the NEW SS as well as the new SP.`],
        [`DS:[SP]`, `Stack instructions always use SS:SP, never DS; after LSS that is the new SS with SP - 2.`],
        [`ES:[SP]`, `PUSH addresses the stack through SS, not ES; ES is the destination segment of string instructions.`],
        [`The new SS × 10 + new SP - 2`, `Correct. Both SS and SP were loaded, then PUSH decrements SP.`]
      ], a: 3 },
    { q: `How many bytes does LDS read from memory?`,
      o: [
        [`1`, `One byte cannot hold an offset and a segment; LDS reads 4 bytes, a word for the register and a word for DS.`],
        [`2`, `Two bytes would fill only the offset register; LDS also reads two more bytes for DS, 4 in total.`],
        [`4`, `Correct: 2 for the offset register, 2 for DS (16-bit case).`],
        [`8`, `Eight bytes is too many: in the 16-bit case LDS reads 2 bytes for the register and 2 for DS.`]
      ], a: 2 },
    { q: `MOV BX, [DI] vs LEA BX, [DI]: which is true?`,
      o: [
        [`Both load the same value`, `They normally load different values: MOV loads the data stored at [DI], LEA loads the address DI itself.`],
        [`MOV loads data; LEA loads the address`, `Correct. MOV BX, [DI] loads the data stored at the location addressed by [DI]; LEA BX, [DI] loads the offset address itself (L6, LEA).`],
        [`LEA loads data; MOV loads the address`, `This is reversed: MOV loads the data from memory, LEA loads the address.`],
        [`Both change DS`, `Neither changes DS; only LDS loads DS. MOV and LEA here write only BX.`]
      ], a: 1 },
    { q: `Which is a valid instruction of this lecture?`,
      o: [
        [`LCS AX, [DI]`, `There is no LCS instruction; CS cannot be loaded with LDS/LES/LSS-style instructions.`],
        [`LDS 5, [DI]`, `The destination of LDS must be a 16- or 32-bit register to receive the offset; an immediate value 5 cannot be a destination.`],
        [`LSS DX, [SI]`, `Correct. LSS DX, [SI] loads DX with the offset and SS with the segment from the 4 bytes at [SI] (L6, LDS, LES, LSS).`],
        [`LES [DI], AX`, `Operands reversed; destination must be a register.`]
      ], a: 2 }
  ],
  7: [
    { q: `DS = 2000H, SI = 0010H, D = 0, [20010] = 41h. After LODSB:`,
      o: [
        [`AL = 41h, SI = 0011H`, `Correct. LODSB loads the byte at DS×10 + SI = 20000 + 10 = 20010 into AL (41h); D=0 so SI = 0010 + 1 = 0011H (L7, String instruction summary).`],
        [`AL = 41h, SI = 000FH`, `AL = 41h is right, but D=0 increments SI: 0010 + 1 = 0011H, not 000FH.`],
        [`AX = 0041h, SI = 0012H`, `LODSB loads one byte into AL and steps SI by 1 (to 0011H); a step of 2 would be LODSW.`],
        [`[ES:DI] = 41h`, `Writing AL into ES:[DI] is STOSB; LODSB reads DS:[SI] into AL.`]
      ], a: 0 },
    { q: `ES = 3000H, DI = 0020H, D = 0, AX = 1234h. After STOSW:`,
      o: [
        [`[30020] = 12, [30021] = 34, DI = 0022H`, `The bytes are reversed: the low byte AL = 34 goes to the lower address 30020 and AH = 12 to 30021.`],
        [`[30020] = 34, [30021] = 12, DI = 0022H`, `Correct. STOSW stores AX at ES×10 + DI = 30020: AL = 34 at 30020, AH = 12 at 30021; D=0 so DI = 0020 + 2 = 0022H (L7, String instruction summary).`],
        [`[30020] = 34, [30021] = 12, DI = 001EH`, `The stored bytes are right, but D=0 is the positive direction, so DI becomes 0022H, not 001EH.`],
        [`DS:[SI] = 1234h`, `STOS writes its destination at ES:[DI]; DS:[SI] is the source side used by LODS and OUTS.`]
      ], a: 1 },
    { q: `D = 1, SI = 0100H. After LODSD, SI =`,
      o: [
        [`0104H`, `With D=1 the pointer is decremented, not incremented; 0104H would be the result with D=0.`],
        [`0096H`, `0096 is 100 - 4 done in decimal (the lecture figure writes "96"), but SI is hex: 100H - 4 = 00FCH.`],
        [`00FFH`, `00FFH is a one-byte step (LODSB); LODSD moves a double word, so SI changes by 4.`],
        [`00FCH`, `Correct. LODSD reads 4 bytes and D=1 decrements: SI = 0100H - 4 = 00FCH in hex (L7, Example STOSD hex note).`]
      ], a: 3 },
    { q: `Which string instruction reads from DS:[SI] and sends the data to an output device?`,
      o: [
        [`INS`, `INS goes the other way: it reads from an input device and writes the data to ES:[DI].`],
        [`STOS`, `STOS writes AL/AX/EAX into ES:[DI]; it does not send anything to an output device.`],
        [`OUTS`, `Correct. OUTS reads the string data from DS:[SI] and sends it to the output device, then steps SI (L7, Example OUTSB).`],
        [`LODS`, `LODS reads DS:[SI] but loads it into AL/AX/EAX, not to an output device.`]
      ], a: 2 },
    { q: `Which instruction sets D so that string pointers decrease?`,
      o: [
        [`STD`, `Correct. STD sets the direction flag (D=1), the negative direction, so SI/DI are decremented (L7, Key rules).`],
        [`CLD`, `CLD clears the direction flag (D=0), which makes SI/DI increase, the opposite of what is asked.`],
        [`STC`, `STC sets the carry flag CF, not the direction flag, so it has no effect on string pointers.`],
        [`LODSB`, `LODSB only reads D to choose the step direction; string instructions never change D.`]
      ], a: 0 },
    { q: `DS = 1000H, ES = 2000H, SI = 0005H, DI = 0005H. INSB writes the input byte to:`,
      o: [
        [`10005`, `10005 is DS×10 + DI. INS always writes to ES:[DI], so the address is 20000 + 5 = 20005.`],
        [`20005`, `Correct. INSB writes the input byte to ES:[DI] = ES×10 + DI = 20000 + 5 = 20005; DS and SI are not used (L7, Key rules).`],
        [`1005`, `1005 adds the unshifted DS to DI and uses the wrong segment; ES must be multiplied by 10H: 20000 + 5 = 20005.`],
        [`30005`, `30005 adds DS and ES together; only one segment is used, ES, giving ES×10 + DI = 20005.`]
      ], a: 1 },
    { q: `Which register is the default destination pointer for STOS and INS?`,
      o: [
        [`SI with DS`, `SI with DS is the SOURCE pointer used by LODS and OUTS, not the destination.`],
        [`BX with DS`, `BX is a base register for data addressing, not a string pointer; string destinations use DI with ES.`],
        [`SP with SS`, `SP with SS addresses the stack for PUSH and POP, not string destinations.`],
        [`DI with ES`, `Correct. Destination strings are always written to ES:[DI], which is what STOS and INS use (L7, Key rules).`]
      ], a: 3 },
    { q: `DS = 1000H, SI = 0200H, D = 1, [10200] = 55h, [10201] = 66h. After LODSW:`,
      o: [
        [`AX = 6655h, SI = 01FEH`, `Correct. Address = 10000 + 200 = 10200: AL = 55, AH = 66 → AX = 6655h; D=1 so SI = 0200 - 2 = 01FEH (L7, String instruction summary).`],
        [`AX = 5566h, SI = 01FEH`, `The byte order is reversed: the byte at the lower address (55h) is the low byte AL, so AX = 6655h.`],
        [`AX = 6655h, SI = 0202H`, `AX is right, but D=1 is the negative direction, so SI = 0200 - 2 = 01FEH, not 0202H.`],
        [`AL = 55h, SI = 01FFH`, `Loading only AL and stepping by 1 is LODSB; LODSW loads a word into AX and steps by 2.`]
      ], a: 0 },
    { q: `Which flag does LODSW change?`,
      o: [
        [`ZF`, `LODS only copies data and updates SI; it does not affect ZF or any other flag.`],
        [`CF`, `LODSW is a data transfer, not arithmetic, so it leaves CF unchanged; LODS affects no flags.`],
        [`None`, `Correct. LODS/STOS do not affect the flags, so LODSW changes none of them (L7, Key rules).`],
        [`DF`, `D is only read to choose the direction; it is changed by CLD/STD, not by LODSW.`]
      ], a: 2 },
    { q: `STOSD with D = 0 and DI = 0010H leaves DI =`,
      o: [
        [`0011H`, `0011H is a one-byte step (STOSB); STOSD stores a double word, so DI moves by 4.`],
        [`0014H`, `Correct. STOSD stores EAX (4 bytes) at ES:[DI]; D=0 increments, so DI = 0010 + 4 = 0014H (L7, String instruction summary).`],
        [`000CH`, `000CH would be DI - 4, which needs D=1; with D=0 the pointer increases to 0014H.`],
        [`0012H`, `0012H is the word step (STOSW); STOSD moves 4 bytes, so DI = 0014H.`]
      ], a: 1 }
  ],
  8: [
    { q: `CS = 4000H, IP = 0100H, short jump displacement byte = 20H. Jump address?`,
      o: [
        [`40120`, `Correct. Short jump: IP = 0100 + 20 = 0120, address = CS × 10 + IP = 40000 + 0120 = 40120 (L8, The three jump types).`],
        [`40100`, `40100 is just CS:IP before the jump (40000 + 0100); the displacement 20 must be added to IP.`],
        [`4120`, `4120 forgets to shift CS: the physical address uses CS × 10 = 40000, so the answer is 40000 + 0120 = 40120.`],
        [`42100`, `42100 adds the displacement as 2000; a short jump's single byte 20 is added to IP as 20h: 0100 + 20 = 0120.`]
      ], a: 0 },
    { q: `CS = 4000H, IP = 0100H, near jump bytes after the opcode: 34, 12. Jump address?`,
      o: [
        [`43512`, `Bytes read in the wrong order (3412 instead of 1234).`],
        [`41234`, `41234 is 40000 + 1234, forgetting IP: the new IP is 0100 + 1234 = 1334, giving 41334.`],
        [`41334`, `Correct. IP = 100 + 1234 = 1334 → 40000 + 1334.`],
        [`41434`, `41434 adds IP twice (or makes a carry slip): IP = 0100 + 1234 = 1334, so the address is 40000 + 1334 = 41334.`]
      ], a: 2 },
    { q: `Far jump bytes after the opcode: 00, 05, 00, 60. Jump address?`,
      o: [
        [`06050`, `06050 mixes up the bytes. Offset = bytes 2,3 read high byte last (05 00 → 0500), segment = bytes 4,5 (60 00 → 6000).`],
        [`60500`, `Correct. Offset = 0500, segment = 6000 → 60000 + 0500.`],
        [`00560`, `00560 reads the bytes in the order they appear. Each pair is read high byte last: offset 0500, segment 6000 → 60500.`],
        [`65000`, `65000 takes the offset as 5000. Bytes 00, 05 read high byte last give 0500, so 60000 + 0500 = 60500.`]
      ], a: 1 },
    { q: `A short jump can reach which range?`,
      o: [
        [`+32K to -32K`, `+32K to −32K is the range of the NEAR jump with its 2-byte displacement; a short jump has only one byte.`],
        [`Anywhere in memory`, `Reaching any location in real memory is the FAR jump, which loads a new CS and IP.`],
        [`+255 to 0`, `The 1-byte displacement is signed, so it can jump backwards: the range is +127 to −128, not 0 to +255.`],
        [`+127 to -128 bytes`, `Correct. A short jump has a signed 1-byte displacement, so it reaches +127 to −128 bytes from IP (L8, The three jump types).`]
      ], a: 3 },
    { q: `MOV CX, 5 / MOV AX, 0 / L: ADD AX, 2 / LOOP L. Final AX?`,
      o: [
        [`10`, `Correct. LOOP decrements CX and repeats while CX ≠ 0, so the body runs 5 times: AX = 5 × 2 = 10 (L8, LOOP).`],
        [`8`, `LOOP runs while CX ≠ 0 after decrementing: 5 iterations.`],
        [`12`, `12 would need 6 iterations; with CX = 5, LOOP runs the body exactly 5 times (CX 5→4→3→2→1→0), so AX = 10.`],
        [`2`, `2 is only one pass; LOOP jumps back to L while CX ≠ 0, so ADD AX, 2 runs 5 times.`]
      ], a: 0 },
    { q: `MOV AX, 0 / MOV CX, 4 / L: ADD AX, CX / LOOP L. Final AX?`,
      o: [
        [`4`, `4 is just the first pass (AX = 0 + 4); LOOP repeats while CX ≠ 0 and adds 3, 2 and 1 as well.`],
        [`16`, `16 assumes CX stays 4 each time (4 × 4); LOOP decrements CX, so the values added are 4, 3, 2, 1.`],
        [`10`, `Correct. CX is added before each decrement: 4 + 3 + 2 + 1 = 10; when CX reaches 0 the loop ends (L8, LOOP).`],
        [`6`, `6 = 3 + 2 + 1 misses the first pass: CX = 4 is added before LOOP decrements it for the first time.`]
      ], a: 2 },
    { q: `What does CALL push onto the stack?`,
      o: [
        [`All general registers`, `Pushing all general registers is PUSHA; CALL pushes only the return address (offset of the next instruction).`],
        [`The flags`, `The flags are pushed by PUSHF or by an interrupt, not by CALL; CALL pushes only the return address.`],
        [`The address of the procedure`, `The procedure's address is copied into (E)IP, not pushed; what goes on the stack is the return address.`],
        [`The offset of the next instruction (return address)`, `Correct. CALL pushes the offset of the next instruction (the return address) and copies the procedure address into (E)IP; RET pops it back (L8, Procedures).`]
      ], a: 3 },
    { q: `Which interrupt type cannot be masked and is used for memory parity errors?`,
      o: [
        [`NMI`, `Correct. A non-maskable interrupt (NMI) cannot be masked or ignored and is used for high-priority faults like memory parity or bus errors (L8, Interrupts).`],
        [`Maskable interrupt`, `A maskable interrupt can be blocked by a mask bit, so it is unsuitable for critical faults such as memory parity errors.`],
        [`Software interrupt`, `A software interrupt is triggered by an INT instruction in the program, not by a hardware fault like a parity error.`],
        [`Vectored interrupt`, `Vectored/non-vectored is about whether the ISR address is fixed; it says nothing about masking. The unmaskable one is NMI.`]
      ], a: 0 },
    { q: `LOOPE (LOOPZ) jumps when:`,
      o: [
        [`CX = 0 and ZF = 1`, `If CX = 0 after decrementing, every LOOP variant stops; LOOPE jumps only while CX ≠ 0 and ZF = 1.`],
        [`CX ≠ 0 and ZF = 1`, `Correct. LOOPE/LOOPZ decrements CX and jumps if CX ≠ 0 AND ZF = 1 (L8, LOOP).`],
        [`CX ≠ 0 and ZF = 0`, `CX ≠ 0 and ZF = 0 is the condition of LOOPNE/LOOPNZ, the opposite variant.`],
        [`ZF = 1 only`, `ZF alone is not enough: LOOPE also decrements CX and stops when CX reaches 0, so it needs CX ≠ 0 and ZF = 1.`]
      ], a: 1 },
    { q: `What is the correct first step when an interrupt is recognized?`,
      o: [
        [`Load PC with the ISR address`, `Loading PC with the ISR start address is step 2; the PC and state must be saved first or the return point is lost.`],
        [`Execute the return instruction`, `The return instruction is step 3, at the end of the ISR; it cannot be the first step.`],
        [`Save the PC and current state (flags, registers) on the stack`, `Correct. Step 1 of interrupt handling saves the PC content and current state (flags, registers) in the stack, so the program can resume (L8, Interrupts).`],
        [`Clear all registers`, `Clearing registers would destroy the interrupted program's data; the state is saved on the stack, not cleared.`]
      ], a: 2 }
  ],
  9: [
    { q: `MOV AL, 0B4h / SHR AL, 2. AL and CF?`,
      o: [
        [`AL = 2Dh, CF = 0`, `Correct. 10110100 → 01011010 (CF 0) → 00101101 (CF 0).`],
        [`AL = 0EDh, CF = 0`, `EDh (11101101) is SAR by 2, which copies the sign bit 1 into the top. SHR fills with 0s, giving 00101101 = 2Dh.`],
        [`AL = 2Dh, CF = 1`, `AL is right, but the two bits shifted out (bits 0 and 1 of 10110100) are both 0, so CF = 0.`],
        [`AL = 0D2h, CF = 0`, `D2h (11010010) is ROL AL, 2, a left rotate; SHR moves bits right and fills with 0: 2Dh.`]
      ], a: 0 },
    { q: `MOV AL, 96h / SAR AL, 1. AL?`,
      o: [
        [`4Bh`, `4Bh (01001011) is SHR, which fills the MSB with 0. SAR copies the sign bit 1: 11001011 = CBh.`],
        [`2Ch`, `2Ch is a left shift (96h × 2 = 12Ch, kept 8 bits). SAR shifts right and keeps the sign.`],
        [`0CBh`, `Correct. 10010110 → 11001011, the sign bit is copied.`],
        [`96h`, `SAR AL, 1 always moves every bit one place right, so 96h cannot stay the same; it becomes CBh.`]
      ], a: 2 },
    { q: `MOV BL, 81h / ROL BL, 1. BL and CF?`,
      o: [
        [`BL = 02h, CF = 1`, `02h is SHL: the MSB is lost into CF and bit 0 gets 0. ROL copies the MSB into bit 0 as well: 03h.`],
        [`BL = 03h, CF = 1`, `Correct. 10000001 → 00000011; MSB goes to CF and bit 0.`],
        [`BL = 0C0h, CF = 1`, `C0h (11000000) is ROR, where the LSB 1 goes to the top. ROL moves the MSB to bit 0: 03h.`],
        [`BL = 03h, CF = 0`, `BL = 03h is right, but CF gets the old MSB of 81h, which is 1, so CF = 1.`]
      ], a: 1 },
    { q: `STC / MOV AH, 01h / RCR AH, 1. AH and CF?`,
      o: [
        [`AH = 00h, CF = 1`, `RCR puts the old CF (1, set by STC) into the MSB, so AH becomes 10000000 = 80h, not 00h.`],
        [`AH = 80h, CF = 0`, `AH = 80h is right, but the old LSB of 01h is 1 and it goes into CF, so CF = 1.`],
        [`AH = 00h, CF = 0`, `This ignores STC: CF = 1 enters the MSB (AH = 80h), and the old LSB 1 goes to CF.`],
        [`AH = 80h, CF = 1`, `Correct. RCR: old CF (1, from STC) enters the MSB and the old LSB (1) goes into CF: 00000001 → 10000000 = 80h, CF = 1 (L9, Rotate instructions).`]
      ], a: 3 },
    { q: `MOV AL, 0FFh / ADD AL, 1. AL, CF and ZF?`,
      o: [
        [`AL = 00h, CF = 1, ZF = 1`, `Correct. 255 + 1 = 256 does not fit in 8 bits.`],
        [`AL = 100h, CF = 0, ZF = 0`, `AL is only 8 bits, so it cannot hold 100h; the 9th bit goes to CF (= 1) and AL = 00h, giving ZF = 1.`],
        [`AL = 00h, CF = 0, ZF = 1`, `AL = 00h and ZF = 1 are right, but 255 + 1 carries out of bit 7, so CF = 1.`],
        [`AL = 0FFh, CF = 1, ZF = 0`, `ADD writes its result into AL: FFh + 1 wraps to 00h, so AL is not FFh and ZF = 1.`]
      ], a: 0 },
    { q: `MOV AL, 7Fh / ADD AL, 1. Which flags are set?`,
      o: [
        [`CF only`, `No unsigned carry: 127 + 1 = 128 fits in 8 bits.`],
        [`ZF and CF`, `7Fh + 1 = 80h, which is not zero (ZF = 0) and fits in 8 bits unsigned (CF = 0).`],
        [`OF and SF`, `Correct. +127 + 1 = -128 in signed: overflow, and the result is negative.`],
        [`None`, `Not "None": 80h has its sign bit set (SF = 1) and +127 + 1 overflows the signed range (OF = 1).`]
      ], a: 2 },
    { q: `MOV AX, 17 / MOV DX, 0 / MOV CX, 5 / DIV CX. AX and DX?`,
      o: [
        [`AX = 2, DX = 3`, `Quotient and remainder are swapped: 17 ÷ 5 = 3 remainder 2, with the quotient in AX and the remainder in DX.`],
        [`AX = 3, DX = 2`, `Correct. DIV CX divides DX:AX = 17 by 5: 17 = 5 × 3 + 2, so AX = 3 (quotient) and DX = 2 (remainder) (L9, MUL and DIV rules).`],
        [`AX = 3, DX = 0`, `AX = 3 is right, but the remainder 2 (17 − 15) goes into DX, so DX is not 0.`],
        [`AX = 3.4`, `DIV is integer division: there are no fractions, the result is quotient 3 in AX and remainder 2 in DX.`]
      ], a: 1 },
    { q: `MOV AX, 1 / MOV BX, 0 / TEST AX, BX. Result?`,
      o: [
        [`AX = 0, ZF = 1`, `ZF = 1 is right, but TEST does not store the AND result: AX stays 1.`],
        [`AX = 1, ZF = 0`, `AX = 1 is right, but 1 AND 0 = 0, and a zero result sets ZF = 1.`],
        [`AX = 0, ZF = 0`, `Both are wrong: TEST leaves AX = 1, and the zero result of 1 AND 0 sets ZF = 1.`],
        [`AX = 1, ZF = 1`, `Correct. TEST does AND only to set the flags: 1 AND 0 = 0, so ZF = 1, and AX stays 1 because the result is not stored (L9, NOT, NEG, TEST).`]
      ], a: 3 },
    { q: `MOV DL, 5 / SHL DL, 2. DL?`,
      o: [
        [`20`, `Correct. Shifting left n bits multiplies by 2ⁿ: 5 × 2² = 20 (00000101 → 00010100 = 14h) (L9, Shift instructions).`],
        [`10`, `10 is SHL DL, 1 (5 × 2); the count here is 2, so 5 × 4 = 20.`],
        [`7`, `7 is 5 + 2, as if SHL added the count; shifting left by 2 multiplies by 2² = 4, giving 20.`],
        [`1`, `1 is a right shift (SHR DL, 2 = 5 ÷ 4 → 1); SHL shifts left and multiplies.`]
      ], a: 0 },
    { q: `To compute AX = 7 × 4 with MUL, which code is correct?`,
      o: [
        [`MOV CX, 7 / MUL 4`, `MUL cannot take an immediate, and AX must hold the first factor.`],
        [`MOV AX, 7 / MUL 4`, `MUL takes one register or memory operand, never an immediate, so MUL 4 is invalid; put 4 in BX and use MUL BX.`],
        [`MOV AX, 7 / MOV BX, 4 / MUL BX`, `Correct. MUL needs AX as the first factor and a register operand: AX = 7, MUL BX (= 4) gives DX:AX = 28 (1Ch), DX = 0 (L9, MUL and DIV rules).`],
        [`MOV BX, 7 / MOV CX, 4 / MUL CX`, `MUL CX multiplies AX by CX, but AX was never loaded with 7; the 7 in BX is not used, so the result is not 7 × 4.`]
      ], a: 2 }
  ]
};
