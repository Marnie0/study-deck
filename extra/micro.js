window.EXTRA = window.EXTRA || {};
EXTRA.micro = {
  1: [
    { q: `Which statement best describes why an assembly program written for one CPU type will not run on another?`,
      o: [
        [`Assembly programs must always be compiled by a high-level compiler first`, `Assembly is translated by an assembler, not a compiler.`],
        [`Each CPU type has its own machine language and assembly language`, `Correct. Assembly language is hardware dependent.`],
        [`Assembly programs are stored in ROM and cannot be copied`, `Storage has nothing to do with portability.`],
        [`Assembly language is machine independent like Java`, `High-level languages are the machine-independent ones.`]
      ], a: 1 },
    { q: `Which part of the CPU coordinates the sequencing of steps involved in executing machine instructions?`,
      o: [
        [`ALU`, `The ALU performs arithmetic and logic operations.`],
        [`Clock`, `The clock synchronizes operations; it does not sequence instruction steps.`],
        [`Registers`, `Registers only store data temporarily.`],
        [`Control unit`, `Correct. That is the lecture definition of the CU.`]
      ], a: 3 },
    { q: `A firmware chip holding the BIOS must be updatable without removing it from the motherboard. Which memory type fits?`,
      o: [
        [`PROM`, `PROM can be written only once.`],
        [`EPROM`, `EPROM must be removed and erased with UV light.`],
        [`EEPROM`, `Correct. It is rewritten electrically on the board (slowly) and is used for the BIOS.`],
        [`ROM`, `ROM is written once and never changed.`]
      ], a: 2 },
    { q: `Which bus holds the address of the data when the current instruction transfers data between the CPU and memory?`,
      o: [
        [`Address bus`, `Correct.`],
        [`Data bus`, `The data bus carries the data itself.`],
        [`Control bus`, `The control bus carries synchronizing signals.`],
        [`System clock line`, `Not a bus in the lecture's list.`]
      ], a: 0 },
    { q: `Which pair is NOT correct for the debugger vs assembler comparison?`,
      o: [
        [`Debugger: close to the machine`, `This is correct in the lecture table.`],
        [`Assembler: more program overhead`, `This is correct.`],
        [`Debugger: good on long programs`, `Correct choice. The debugger is good on SHORT programs; the assembler is good on long ones.`],
        [`Assembler: hard to run`, `This is correct.`]
      ], a: 2 },
    { q: `What does the assembler produce from an assembly source file?`,
      o: [
        [`A high-level C program`, `It translates downward, not upward.`],
        [`Object code (.OBJ)`, `Correct. Source code is translated into object code.`],
        [`A list of registers`, `Not a translator output.`],
        [`A new BIOS`, `Unrelated.`]
      ], a: 1 },
    { q: `Which type of software allows programmers to build computer software?`,
      o: [
        [`System software`, `That lets the hardware run properly.`],
        [`Application software`, `That lets users do tasks.`],
        [`Firmware`, `Not one of the three categories in the lecture.`],
        [`Programming software`, `Correct.`]
      ], a: 3 },
    { q: `An EPROM chip can be recognized physically by:`,
      o: [
        [`A small transparent window on top of the IC package`, `Correct. It admits the UV light used for erasing.`],
        [`A battery attached to the chip`, `Not mentioned for EPROM.`],
        [`Having no pins`, `All chips have pins.`],
        [`A built-in keyboard`, `Unrelated.`]
      ], a: 0 },
    { q: `Which component synchronizes the internal operations of the CPU with other system components?`,
      o: [
        [`ALU`, `Arithmetic and logic only.`],
        [`Clock`, `Correct.`],
        [`MAR`, `MAR holds an address.`],
        [`Data bus`, `The data bus transfers data.`]
      ], a: 1 },
    { q: `Which language is "one step away from machine language" and lets the programmer use names instead of numbers?`,
      o: [
        [`High-level language`, `Further from the machine.`],
        [`Machine language`, `Uses only 0s and 1s.`],
        [`Assembly language`, `Correct.`],
        [`Natural language`, `Not a programming category here.`]
      ], a: 2 }
  ],
  2: [
    { q: `AX = 3039h. What are AH and AL?`,
      o: [
        [`AH = 39h, AL = 30h`, `Reversed: AH is the upper byte.`],
        [`AH = 30h, AL = 39h`, `Correct. Upper 8 bits = 30h, lower 8 bits = 39h (the lab's 0011000000111001b).`],
        [`AH = 3039h, AL = 0`, `AH is only 8 bits.`],
        [`AH = 03h, AL = 09h`, `Each half holds a full byte, not a digit.`]
      ], a: 1 },
    { q: `Which register would you use as the counter of a LOOP instruction?`,
      o: [
        [`AX`, `AX is the accumulator.`],
        [`BX`, `BX is the base register.`],
        [`DX`, `DX extends AX in MUL/DIV.`],
        [`CX`, `Correct. CX is the count register.`]
      ], a: 3 },
    { q: `Which register contains the instruction most recently fetched?`,
      o: [
        [`IR`, `Correct.`],
        [`PC`, `PC holds the address of the next instruction.`],
        [`MAR`, `MAR holds a memory address.`],
        [`MBR`, `MBR holds a data word.`]
      ], a: 0 },
    { q: `Which of these is a status flag (reflects a result) rather than a control flag?`,
      o: [
        [`DF`, `Direction flag is a control flag.`],
        [`TF`, `Trap flag is a system flag.`],
        [`ZF`, `Correct. Zero is a status flag.`],
        [`IF`, `Interrupt flag is a system flag.`]
      ], a: 2 },
    { q: `Which register name does NOT exist in the 8086 programming model?`,
      o: [
        [`BH`, `High byte of BX.`],
        [`SL`, `Correct. SI has no 8-bit halves.`],
        [`DL`, `Low byte of DX.`],
        [`SP`, `Stack pointer.`]
      ], a: 1 },
    { q: `Adding two unsigned bytes gives a result larger than 255. Which flag reports this?`,
      o: [
        [`SF`, `SF reports a negative result.`],
        [`ZF`, `ZF reports zero.`],
        [`OF`, `OF is for signed overflow.`],
        [`CF`, `Correct. Unsigned result too large for the destination.`]
      ], a: 3 },
    { q: `Which segment register holds the base of the area where local function variables and parameters are kept?`,
      o: [
        [`SS`, `Correct. The stack segment.`],
        [`CS`, `Code.`],
        [`DS`, `Global variables / data.`],
        [`ES`, `Extra data segment.`]
      ], a: 0 },
    { q: `What is the main benefit of user-visible registers according to the lecture?`,
      o: [
        [`They control the CPU automatically without the programmer`, `That describes user-invisible registers.`],
        [`They let the programmer minimize main memory references`, `Correct.`],
        [`They increase the size of RAM`, `Registers are inside the CPU.`],
        [`They replace the cache`, `Not mentioned.`]
      ], a: 1 },
    { q: `Which register is listed as the "Destination Index" used with string instructions?`,
      o: [
        [`SI`, `Source index.`],
        [`BP`, `Base pointer.`],
        [`DI`, `Correct.`],
        [`DX`, `Data register.`]
      ], a: 2 },
    { q: `EAX = 12345678h. What is AX?`,
      o: [
        [`1234h`, `That is the upper 16 bits.`],
        [`78h`, `That is AL.`],
        [`12345678h`, `That is EAX.`],
        [`5678h`, `Correct. AX is the lower 16 bits.`]
      ], a: 3 }
  ],
  3: [
    { q: `DS = 2500H. What is the physical address of MOV AL, [0120H]?`,
      o: [
        [`25120`, `Correct. 25000 + 0120.`],
        [`2620`, `DS was not multiplied by 10H.`],
        [`26200`, `0120 was shifted too.`],
        [`25012`, `Wrong digit position.`]
      ], a: 0 },
    { q: `ES = 3A00H. MOV CL, ES:[0FF0H] accesses which address?`,
      o: [
        [`3A0FF0`, `Too many digits: multiply by 10H then add.`],
        [`3AFF0`, `Correct. 3A000 + 0FF0.`],
        [`49F0`, `Segment not shifted.`],
        [`3B0F0`, `Arithmetic slip.`]
      ], a: 1 },
    { q: `Which instruction is valid?`,
      o: [
        [`MOV DS, CS`, `Segment to segment.`],
        [`MOV CS, AX`, `CS cannot be changed.`],
        [`MOV DS, AX`, `Correct. A general register can load DS.`],
        [`MOV AL, BX`, `Size mismatch.`]
      ], a: 2 },
    { q: `How do you copy CS into DS?`,
      o: [
        [`MOV DS, CS`, `Not allowed.`],
        [`XCHG DS, CS`, `Not allowed either.`],
        [`MOV CS, DS`, `Changes CS: not allowed.`],
        [`MOV AX, CS then MOV DS, AX`, `Correct, as in the lecture.`]
      ], a: 3 },
    { q: `MOV CL, [123H] belongs to which mode in the lecture's naming?`,
      o: [
        [`Displacement addressing`, `Correct. Direct addressing is for AL/AX/EAX; other registers = displacement.`],
        [`Immediate addressing`, `123H is an address in brackets, not data.`],
        [`Register addressing`, `There is a memory operand.`],
        [`Base plus index`, `No base or index register.`]
      ], a: 0 },
    { q: `Which instruction is INVALID because of operand size?`,
      o: [
        [`MOV AX, BX`, `Both 16-bit.`],
        [`MOV SI, BL`, `Correct. 16-bit vs 8-bit.`],
        [`MOV EAX, EBX`, `Both 32-bit.`],
        [`MOV CH, 100`, `8-bit register with a byte constant.`]
      ], a: 1 },
    { q: `MOV AX, 5 / MOV BX, 3 / XCHG AX, BX. Final values?`,
      o: [
        [`AX = 5, BX = 3`, `XCHG swaps them.`],
        [`AX = 3, BX = 3`, `That would be MOV AX, BX.`],
        [`AX = 3, BX = 5`, `Correct.`],
        [`AX = 8, BX = 0`, `XCHG does not add.`]
      ], a: 2 },
    { q: `MOV AX, 5 / ADD AX, 3 / SUB AX, 2 / MOV CX, AX. What is CX?`,
      o: [
        [`10`, `5 + 3 + 2 is wrong: 2 is subtracted.`],
        [`8`, `Forgot to subtract 2.`],
        [`5`, `CX gets the computed AX.`],
        [`6`, `Correct. 5 + 3 - 2 = 6.`]
      ], a: 3 },
    { q: `DS = 0FFFH. What is the address of MOV AL, [0010H]?`,
      o: [
        [`10000`, `Correct. 0FFF0 + 0010 = 10000 (hex).`],
        [`0FFF10`, `Wrong shift.`],
        [`1000F`, `Arithmetic slip.`],
        [`0FFFA`, `Decimal-looking addition is wrong.`]
      ], a: 0 },
    { q: `Which statement about MOV EAX, ESP is true?`,
      o: [
        [`It causes an error because ESP is special`, `ESP is a general purpose register.`],
        [`It copies ESP into EAX and ESP keeps its value`, `Correct. MOV copies; it never deletes.`],
        [`It moves only SP into AX`, `All 32 bits are copied.`],
        [`It clears ESP`, `MOV does not change the source.`]
      ], a: 1 }
  ],
  4: [
    { q: `DS = 2000H, BX = 0300H, SI = 0050H. Address of MOV AL, [BX+SI]?`,
      o: [
        [`20350`, `Correct. 20000 + 300 + 50.`],
        [`2350`, `DS not shifted.`],
        [`20305`, `SI added in the wrong digit.`],
        [`23050`, `BX shifted by mistake.`]
      ], a: 0 },
    { q: `SS = 3000H, DS = 1000H, BP = 0200H. Address of MOV AX, 10[BP]?`,
      o: [
        [`10210`, `BP uses SS, not DS.`],
        [`30210`, `Correct. 30000 + 200 + 10.`],
        [`3210`, `SS not shifted.`],
        [`30201`, `Displacement placed wrongly.`]
      ], a: 1 },
    { q: `Which instruction uses SS as its default segment?`,
      o: [
        [`MOV AL, [BX]`, `BX → DS.`],
        [`MOV AL, [SI+4]`, `SI → DS.`],
        [`MOV AL, [BP+SI]`, `Correct. BP in the expression → SS.`],
        [`MOV AL, [1234H]`, `Constant only → DS.`]
      ], a: 2 },
    { q: `DS = 1200H, DI = 0100H. MOV AX, 20[DI] reads which two bytes into AL and AH?`,
      o: [
        [`AL from 12120, AH from 12121`, `Correct. Address 12000 + 20 + 100 = 12120; low byte first.`],
        [`AL from 12121, AH from 12120`, `Little-endian: the low byte is at the lower address.`],
        [`AL from 1320, AH from 1321`, `DS not shifted.`],
        [`AL from 12102, AH from 12103`, `Displacement 20 added in the wrong place.`]
      ], a: 0 },
    { q: `Which register cannot be used inside brackets as a pointer in 16-bit 8086 code?`,
      o: [
        [`BX`, `Allowed.`],
        [`BP`, `Allowed.`],
        [`DI`, `Allowed.`],
        [`CX`, `Correct. Only BX, BP, SI, DI can be pointers.`]
      ], a: 3 },
    { q: `DS = 1000H, BX = 0F00H, DI = 0200H. Address of MOV AL, 50[BX][DI]?`,
      o: [
        [`11150`, `Correct. 10000 + 50 + F00 + 200 = 11150.`],
        [`10F50`, `DI was ignored (10000 + F00 + 50).`],
        [`11100`, `The displacement 50 was ignored.`],
        [`1F150`, `BX was shifted.`]
      ], a: 0 },
    { q: `In base plus index addressing, which pair is a valid base and index?`,
      o: [
        [`SI and DI`, `Two index registers.`],
        [`BX and BP`, `Two base registers.`],
        [`BX and SI`, `Correct.`],
        [`AX and SI`, `AX is not a base register.`]
      ], a: 2 },
    { q: `SS = 1400H, BP = 1500H, SI = 0100H. MOV AL, [BP+SI-200H] accesses:`,
      o: [
        [`15600`, `Forgot the -200.`],
        [`13400`, `Wrong segment arithmetic.`],
        [`15800`, `Added 200 instead of subtracting.`],
        [`15400`, `Correct. 14000 + 1500 + 100 - 200 = 15400 (Sheet 1).`]
      ], a: 3 },
    { q: `MOV AX, DS:[BP] means:`,
      o: [
        [`An error: BP can only be used with SS`, `Overriding is allowed.`],
        [`Segment override: address = DS×10 + BP`, `Correct.`],
        [`AX is loaded with DS + BP`, `It reads memory, not the sum.`],
        [`Address = SS×10 + DS + BP`, `Only one segment is used.`]
      ], a: 1 },
    { q: `DS = 4000H, SI = 0FFFH. Address of MOV BL, [SI+1]?`,
      o: [
        [`40FFF`, `Forgot +1.`],
        [`41000`, `Correct. 40000 + FFF + 1 = 41000.`],
        [`40FFF1`, `Concatenation is not addition.`],
        [`4100`, `DS not shifted.`]
      ], a: 1 }
  ],
  5: [
    { q: `SS = 0500H, SP = 0100H, AX = 1234H. After PUSH AX, which bytes are written and what is SP?`,
      o: [
        [`[050FF] = 34, [050FE] = 12, SP = 00FE`, `The high byte (AH = 12) goes to SP-1.`],
        [`[050FF] = 12, [050FE] = 34, SP = 00FE`, `Correct. Address 05000 + 0100 = 05100; AH at 050FF, AL at 050FE.`],
        [`[05101] = 12, [05102] = 34, SP = 0102`, `The stack grows down.`],
        [`[050FF] = 12, [050FE] = 34, SP = 0100`, `SP must decrease by 2.`]
      ], a: 1 },
    { q: `SP = 0200H. After PUSH AX, PUSH BX, POP CX, what is SP?`,
      o: [
        [`01FE`, `Correct. 200 - 2 - 2 + 2 = 1FE.`],
        [`01FC`, `Forgot the POP.`],
        [`0200`, `Two pushes and one pop do not balance.`],
        [`0202`, `PUSH decreases SP.`]
      ], a: 0 },
    { q: `MOV AX, 1111h / MOV BX, 2222h / PUSH AX / PUSH BX / POP AX / POP BX. Final AX and BX?`,
      o: [
        [`AX = 1111h, BX = 2222h`, `LIFO reverses them.`],
        [`AX = 2222h, BX = 2222h`, `BX gets the first pushed value.`],
        [`AX = 1111h, BX = 1111h`, `AX gets the last pushed value.`],
        [`AX = 2222h, BX = 1111h`, `Correct. The values are swapped (LIFO).`]
      ], a: 3 },
    { q: `In which order does PUSHA push the registers?`,
      o: [
        [`AX, BX, CX, DX, SP, BP, SI, DI`, `CX and DX come before BX.`],
        [`DI, SI, BP, SP, BX, DX, CX, AX`, `That is POPA's order.`],
        [`AX, CX, DX, BX, SP, BP, SI, DI`, `Correct.`],
        [`AX, CX, DX, BX, SI, DI, SP, BP`, `SP and BP come before SI and DI.`]
      ], a: 2 },
    { q: `ESP = 00FFFFE8. What is ESP after PUSH EAX then PUSH AX?`,
      o: [
        [`00FFFFE2`, `Correct. E8 - 4 = E4, then E4 - 2 = E2.`],
        [`00FFFFE4`, `Only the first push counted.`],
        [`00FFFFE0`, `Both treated as 4 bytes.`],
        [`00FFFFEE`, `PUSH decreases ESP.`]
      ], a: 0 },
    { q: `SS = 2000H, SP = 0010H, and memory 20010 = 78, 20011 = 56. After POP DX:`,
      o: [
        [`DX = 7856, SP = 000E`, `POP increases SP and the first byte is the low byte.`],
        [`DX = 5678, SP = 0012`, `Correct. DL = 78, DH = 56; SP + 2.`],
        [`DX = 7856, SP = 0012`, `Byte order wrong.`],
        [`DX = 5678, SP = 0010`, `SP must change.`]
      ], a: 1 },
    { q: `Why must a procedure execute the same number of POPs as PUSHes before RET?`,
      o: [
        [`Because RET pops the return address from the top of the stack`, `Correct. An unbalanced stack makes RET jump to a wrong address.`],
        [`Because POP is faster than PUSH`, `Speed is irrelevant.`],
        [`Because SS changes on every PUSH`, `SS does not change.`],
        [`Because the flags must be cleared`, `Unrelated.`]
      ], a: 0 },
    { q: `What does PUSHF / STC / POPF do to the carry flag overall?`,
      o: [
        [`CF stays 1 permanently`, `POPF restores the old flags.`],
        [`CF is cleared`, `Not necessarily; it is restored.`],
        [`CF becomes the parity flag`, `Meaningless.`],
        [`CF returns to its value before PUSHF`, `Correct.`]
      ], a: 3 },
    { q: `Which instruction cannot be used?`,
      o: [
        [`PUSH 1234h`, `The lab allows an immediate PUSH target.`],
        [`POP 1234h`, `Correct. POP needs a register or memory destination.`],
        [`PUSH [BX]`, `Memory operand allowed.`],
        [`POP DS`, `Allowed.`]
      ], a: 1 },
    { q: `SP = 0100H. After PUSHA, SP equals:`,
      o: [
        [`00F8`, `That is only 8 bytes.`],
        [`0110`, `PUSHA decreases SP.`],
        [`00F0`, `Correct. 8 words = 16 bytes = 10H: 100 - 10 = F0.`],
        [`00E0`, `That would be 32 bytes (PUSHAD).`]
      ], a: 2 }
  ],
  6: [
    { q: `DI = 0040H and DS:0040 holds the word 9ABCH. After LEA BX, [DI]:`,
      o: [
        [`BX = 9ABCH`, `That is MOV BX, [DI].`],
        [`BX = DS`, `No.`],
        [`BX = 0040H`, `Correct. LEA loads the offset itself.`],
        [`BX = 0`, `No.`]
      ], a: 2 },
    { q: `DS = 3000H, SI = 0010H; memory 30010..30013 = 11, 22, 33, 44. After LES AX, [SI]:`,
      o: [
        [`AX = 2211, ES = 4433`, `Correct. First word → AX, second word → ES (little-endian).`],
        [`AX = 1122, ES = 3344`, `Bytes reversed.`],
        [`AX = 2211, DS = 4433`, `LES loads ES.`],
        [`AX = 4433, ES = 2211`, `First word goes to AX.`]
      ], a: 0 },
    { q: `Which instruction changes DS?`,
      o: [
        [`LES BX, [DI]`, `Changes ES.`],
        [`LSS SP, [SI]`, `Changes SS.`],
        [`LEA BX, [DI]`, `No segment register.`],
        [`LDS SI, [BX]`, `Correct.`]
      ], a: 3 },
    { q: `Why is MOV BX, OFFSET LIST faster than LEA BX, LIST?`,
      o: [
        [`The assembler computes the offset of LIST before execution`, `Correct.`],
        [`OFFSET reads memory twice`, `It does not read memory.`],
        [`LEA uses the stack`, `No.`],
        [`OFFSET uses ES`, `No.`]
      ], a: 0 },
    { q: `Which operand needs LEA rather than OFFSET?`,
      o: [
        [`LIST`, `Simple: OFFSET works.`],
        [`LIST[SI]`, `Correct. Complex operands need LEA.`],
        [`A label in the data segment`, `Simple.`],
        [`A named variable X`, `Simple.`]
      ], a: 1 },
    { q: `DS = 1000H, DI = 0200H. LDS BX, [DI] reads its 4 bytes starting at:`,
      o: [
        [`10200`, `Correct. DS×10 + DI with the OLD DS.`],
        [`1200`, `DS not shifted.`],
        [`0200`, `Segment missing.`],
        [`It depends on the new DS`, `The address uses DS before it is changed.`]
      ], a: 0 },
    { q: `After LSS SP, [BX] the next PUSH uses which address?`,
      o: [
        [`The old SS with the new SP`, `SS was also loaded.`],
        [`DS:[SP]`, `Stack uses SS.`],
        [`ES:[SP]`, `No.`],
        [`The new SS × 10 + new SP - 2`, `Correct. Both SS and SP were loaded, then PUSH decrements SP.`]
      ], a: 3 },
    { q: `How many bytes does LDS read from memory?`,
      o: [
        [`1`, `No.`],
        [`2`, `That would only fill the register.`],
        [`4`, `Correct: 2 for the offset register, 2 for DS (16-bit case).`],
        [`8`, `No.`]
      ], a: 2 },
    { q: `MOV BX, [DI] vs LEA BX, [DI]: which is true?`,
      o: [
        [`Both load the same value`, `Only if memory happens to hold DI's value.`],
        [`MOV loads data; LEA loads the address`, `Correct.`],
        [`LEA loads data; MOV loads the address`, `Reversed.`],
        [`Both change DS`, `Neither changes DS.`]
      ], a: 1 },
    { q: `Which is a valid instruction of this lecture?`,
      o: [
        [`LCS AX, [DI]`, `No LCS exists.`],
        [`LDS 5, [DI]`, `Destination must be a register.`],
        [`LSS DX, [SI]`, `Correct.`],
        [`LES [DI], AX`, `Operands reversed; destination must be a register.`]
      ], a: 2 }
  ],
  7: [
    { q: `DS = 2000H, SI = 0010H, D = 0, [20010] = 41h. After LODSB:`,
      o: [
        [`AL = 41h, SI = 0011H`, `Correct.`],
        [`AL = 41h, SI = 000FH`, `D = 0 increments.`],
        [`AX = 0041h, SI = 0012H`, `LODSB loads a byte and adds 1.`],
        [`[ES:DI] = 41h`, `That is STOSB.`]
      ], a: 0 },
    { q: `ES = 3000H, DI = 0020H, D = 0, AX = 1234h. After STOSW:`,
      o: [
        [`[30020] = 12, [30021] = 34, DI = 0022H`, `Low byte (34) goes to the lower address.`],
        [`[30020] = 34, [30021] = 12, DI = 0022H`, `Correct.`],
        [`[30020] = 34, [30021] = 12, DI = 001EH`, `D = 0 increments.`],
        [`DS:[SI] = 1234h`, `STOS writes ES:[DI].`]
      ], a: 1 },
    { q: `D = 1, SI = 0100H. After LODSD, SI =`,
      o: [
        [`0104H`, `D = 1 decrements.`],
        [`0096H`, `Decimal subtraction; in hex 100 - 4 = FC.`],
        [`00FFH`, `That is a byte step.`],
        [`00FCH`, `Correct.`]
      ], a: 3 },
    { q: `Which string instruction reads from DS:[SI] and sends the data to an output device?`,
      o: [
        [`INS`, `INS goes from a device into ES:[DI].`],
        [`STOS`, `STOS writes memory from AL/AX/EAX.`],
        [`OUTS`, `Correct.`],
        [`LODS`, `LODS loads a register.`]
      ], a: 2 },
    { q: `Which instruction sets D so that string pointers decrease?`,
      o: [
        [`STD`, `Correct. Set direction flag (D = 1).`],
        [`CLD`, `Clears D (increment).`],
        [`STC`, `Sets carry.`],
        [`LODSB`, `Uses D but does not change it.`]
      ], a: 0 },
    { q: `DS = 1000H, ES = 2000H, SI = 0005H, DI = 0005H. INSB writes the input byte to:`,
      o: [
        [`10005`, `INS writes to ES, not DS.`],
        [`20005`, `Correct. ES×10 + DI.`],
        [`1005`, `Segment not shifted.`],
        [`30005`, `Segments are not added.`]
      ], a: 1 },
    { q: `Which register is the default destination pointer for STOS and INS?`,
      o: [
        [`SI with DS`, `That is the source side.`],
        [`BX with DS`, `Not a string pointer.`],
        [`SP with SS`, `Stack.`],
        [`DI with ES`, `Correct.`]
      ], a: 3 },
    { q: `DS = 1000H, SI = 0200H, D = 1, [10200] = 55h, [10201] = 66h. After LODSW:`,
      o: [
        [`AX = 6655h, SI = 01FEH`, `Correct. AL = 55, AH = 66, SI - 2.`],
        [`AX = 5566h, SI = 01FEH`, `Byte order reversed.`],
        [`AX = 6655h, SI = 0202H`, `D = 1 decrements.`],
        [`AL = 55h, SI = 01FFH`, `That is LODSB.`]
      ], a: 0 },
    { q: `Which flag does LODSW change?`,
      o: [
        [`ZF`, `LODS does not change flags.`],
        [`CF`, `No.`],
        [`None`, `Correct.`],
        [`DF`, `D is only read.`]
      ], a: 2 },
    { q: `STOSD with D = 0 and DI = 0010H leaves DI =`,
      o: [
        [`0011H`, `That is the byte step.`],
        [`0014H`, `Correct. 4 bytes forward.`],
        [`000CH`, `D = 0 increments.`],
        [`0012H`, `That is the word step.`]
      ], a: 1 }
  ],
  8: [
    { q: `CS = 4000H, IP = 0100H, short jump displacement byte = 20H. Jump address?`,
      o: [
        [`40120`, `Correct. 40000 + 100 + 20.`],
        [`40100`, `Displacement ignored.`],
        [`4120`, `CS not shifted.`],
        [`42100`, `Displacement placed in the wrong digit.`]
      ], a: 0 },
    { q: `CS = 4000H, IP = 0100H, near jump bytes after the opcode: 34, 12. Jump address?`,
      o: [
        [`43512`, `Bytes read in the wrong order (3412 instead of 1234).`],
        [`41234`, `IP was not added.`],
        [`41334`, `Correct. IP = 100 + 1234 = 1334 → 40000 + 1334.`],
        [`41434`, `Arithmetic slip.`]
      ], a: 2 },
    { q: `Far jump bytes after the opcode: 00, 05, 00, 60. Jump address?`,
      o: [
        [`06050`, `Segment and offset mixed up.`],
        [`60500`, `Correct. Offset = 0500, segment = 6000 → 60000 + 0500.`],
        [`00560`, `Wrong reading.`],
        [`65000`, `Offset taken as 5000.`]
      ], a: 1 },
    { q: `A short jump can reach which range?`,
      o: [
        [`+32K to -32K`, `That is the near jump.`],
        [`Anywhere in memory`, `That is the far jump.`],
        [`+255 to 0`, `The displacement is signed.`],
        [`+127 to -128 bytes`, `Correct.`]
      ], a: 3 },
    { q: `MOV CX, 5 / MOV AX, 0 / L: ADD AX, 2 / LOOP L. Final AX?`,
      o: [
        [`10`, `Correct. The body runs 5 times: 5 × 2.`],
        [`8`, `LOOP runs while CX ≠ 0 after decrementing: 5 iterations.`],
        [`12`, `One iteration too many.`],
        [`2`, `It repeats.`]
      ], a: 0 },
    { q: `MOV AX, 0 / MOV CX, 4 / L: ADD AX, CX / LOOP L. Final AX?`,
      o: [
        [`4`, `It repeats 4 times.`],
        [`16`, `CX changes each time.`],
        [`10`, `Correct. 4 + 3 + 2 + 1.`],
        [`6`, `Missing the first iteration.`]
      ], a: 2 },
    { q: `What does CALL push onto the stack?`,
      o: [
        [`All general registers`, `That is PUSHA.`],
        [`The flags`, `That is PUSHF (or an interrupt).`],
        [`The address of the procedure`, `That is loaded into IP, not pushed.`],
        [`The offset of the next instruction (return address)`, `Correct.`]
      ], a: 3 },
    { q: `Which interrupt type cannot be masked and is used for memory parity errors?`,
      o: [
        [`NMI`, `Correct.`],
        [`Maskable interrupt`, `Can be blocked.`],
        [`Software interrupt`, `Triggered by an instruction.`],
        [`Vectored interrupt`, `That classifies the vector address.`]
      ], a: 0 },
    { q: `LOOPE (LOOPZ) jumps when:`,
      o: [
        [`CX = 0 and ZF = 1`, `It needs CX ≠ 0.`],
        [`CX ≠ 0 and ZF = 1`, `Correct.`],
        [`CX ≠ 0 and ZF = 0`, `That is LOOPNE.`],
        [`ZF = 1 only`, `CX is decremented and tested too.`]
      ], a: 1 },
    { q: `What is the correct first step when an interrupt is recognized?`,
      o: [
        [`Load PC with the ISR address`, `That is step 2.`],
        [`Execute the return instruction`, `That ends the ISR.`],
        [`Save the PC and current state (flags, registers) on the stack`, `Correct.`],
        [`Clear all registers`, `The state must be saved, not cleared.`]
      ], a: 2 }
  ],
  9: [
    { q: `MOV AL, 0B4h / SHR AL, 2. AL and CF?`,
      o: [
        [`AL = 2Dh, CF = 0`, `Correct. 10110100 → 01011010 (CF 0) → 00101101 (CF 0).`],
        [`AL = 0EDh, CF = 0`, `That would be SAR (sign filled).`],
        [`AL = 2Dh, CF = 1`, `Both bits shifted out were 0.`],
        [`AL = 0D2h, CF = 0`, `That is a left shift.`]
      ], a: 0 },
    { q: `MOV AL, 96h / SAR AL, 1. AL?`,
      o: [
        [`4Bh`, `That is SHR (fills with 0).`],
        [`2Ch`, `That is a left shift.`],
        [`0CBh`, `Correct. 10010110 → 11001011, the sign bit is copied.`],
        [`96h`, `It changes.`]
      ], a: 2 },
    { q: `MOV BL, 81h / ROL BL, 1. BL and CF?`,
      o: [
        [`BL = 02h, CF = 1`, `That is SHL: the MSB is lost.`],
        [`BL = 03h, CF = 1`, `Correct. 10000001 → 00000011; MSB goes to CF and bit 0.`],
        [`BL = 0C0h, CF = 1`, `That is ROR.`],
        [`BL = 03h, CF = 0`, `CF gets the old MSB (1).`]
      ], a: 1 },
    { q: `STC / MOV AH, 01h / RCR AH, 1. AH and CF?`,
      o: [
        [`AH = 00h, CF = 1`, `CF enters the MSB.`],
        [`AH = 80h, CF = 0`, `The old LSB (1) goes to CF.`],
        [`AH = 00h, CF = 0`, `CF = 1 entered the MSB.`],
        [`AH = 80h, CF = 1`, `Correct. Old CF (1) → MSB; old LSB (1) → CF.`]
      ], a: 3 },
    { q: `MOV AL, 0FFh / ADD AL, 1. AL, CF and ZF?`,
      o: [
        [`AL = 00h, CF = 1, ZF = 1`, `Correct. 255 + 1 = 256 does not fit in 8 bits.`],
        [`AL = 100h, CF = 0, ZF = 0`, `AL is 8 bits.`],
        [`AL = 00h, CF = 0, ZF = 1`, `The carry out of bit 7 sets CF.`],
        [`AL = 0FFh, CF = 1, ZF = 0`, `AL changes.`]
      ], a: 0 },
    { q: `MOV AL, 7Fh / ADD AL, 1. Which flags are set?`,
      o: [
        [`CF only`, `No unsigned carry: 127 + 1 = 128 fits in 8 bits.`],
        [`ZF and CF`, `The result 80h is not zero.`],
        [`OF and SF`, `Correct. +127 + 1 = -128 in signed: overflow, and the result is negative.`],
        [`None`, `OF and SF are set.`]
      ], a: 2 },
    { q: `MOV AX, 17 / MOV DX, 0 / MOV CX, 5 / DIV CX. AX and DX?`,
      o: [
        [`AX = 2, DX = 3`, `Reversed.`],
        [`AX = 3, DX = 2`, `Correct. 17 = 5 × 3 + 2.`],
        [`AX = 3, DX = 0`, `The remainder is in DX.`],
        [`AX = 3.4`, `Integer division.`]
      ], a: 1 },
    { q: `MOV AX, 1 / MOV BX, 0 / TEST AX, BX. Result?`,
      o: [
        [`AX = 0, ZF = 1`, `TEST does not store the result.`],
        [`AX = 1, ZF = 0`, `1 AND 0 = 0, so ZF = 1.`],
        [`AX = 0, ZF = 0`, `AX is unchanged and ZF = 1.`],
        [`AX = 1, ZF = 1`, `Correct. Only the flag changes.`]
      ], a: 3 },
    { q: `MOV DL, 5 / SHL DL, 2. DL?`,
      o: [
        [`20`, `Correct. 5 × 2² = 20 (14h).`],
        [`10`, `That is a shift by 1.`],
        [`7`, `Shifting is not adding.`],
        [`1`, `That is a right shift.`]
      ], a: 0 },
    { q: `To compute AX = 7 × 4 with MUL, which code is correct?`,
      o: [
        [`MOV CX, 7 / MUL 4`, `MUL cannot take an immediate, and AX must hold the first factor.`],
        [`MOV AX, 7 / MUL 4`, `Immediate operands are not allowed with MUL.`],
        [`MOV AX, 7 / MOV BX, 4 / MUL BX`, `Correct. AX = 28 (1Ch), DX = 0.`],
        [`MOV BX, 7 / MOV CX, 4 / MUL CX`, `AX was never loaded with 7.`]
      ], a: 2 }
  ]
};
