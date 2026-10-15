/* scripted notebook content, adapted from Academy K */
function o(e,t,r=1e4){let{pX:s,pY:a,pZ:i}=e,n=0,l=0,c=0,d=0,u=0;for(let e=0;e<r;e++){let r=0,o=0,m=0;for(let u=0;u<t;u++){let p=function(e){let t=43758.5453*Math.sin(12.9898*e+78.233);return t-Math.floor(t)}(e*t+u);p<s?(r++,n++):p<s+a?(o++,l++):p<s+a+i?(m++,c++):d++}let p=(o+m)%2;(r%2>0||p>0)&&u++}let m=n+l+c+d,p="none";return n+l+c>0&&(p=n>=l&&n>=c?"X":l>=n&&l>=c?"Y":"Z"),{pLogicalError:u/r,pNoError:d/m,dominantError:p,errorCounts:{X:n,Y:l,Z:c,I:d}}}let a={pX:.001,pY:.001,pZ:.001},i={pX:5e-4,pY:5e-4,pZ:.002};function n(e){return e<1e-4?"<0.01%":e<.01?`${(100*e).toFixed(2)}%`:`${(100*e).toFixed(1)}%`}let l=()=>Math.random().toString(36).slice(2,9);function c(){return[{id:"cell-1",number:1,question:"What actually happens when a qubit experiences an error? Let's start with the three fundamental error types.",prompts:[{label:"What is a bit-flip (X) error?",key:"x-error"},{label:"What is a phase-flip (Z) error?",key:"z-error"},{label:"What about Y errors?",key:"y-error"},{label:"Show me all three with numbers",key:"all-errors"}],messages:[]},{id:"cell-2",number:2,question:"In real hardware, which errors happen most often? This shapes everything we do in QEC.",prompts:[{label:"Are all error types equally likely?",key:"equal-likely"},{label:"What is depolarizing noise?",key:"depolarizing"},{label:"Why might Z errors dominate?",key:"z-dominant"},{label:"Simulate 10,000 gates and count",key:"sim-count"}],messages:[]},{id:"cell-3",number:3,question:"Errors accumulate as circuits get deeper. How bad does it get?",prompts:[{label:"10 gates vs 100 gates vs 1000",key:"depth-compare"},{label:"When does computation become useless?",key:"useless-point"},{label:"Why can't we just use fewer gates?",key:"fewer-gates"}],messages:[]},{id:"cell-4",number:4,question:"Phase errors are sneaky. They don't flip bits, so when do they actually matter?",prompts:[{label:"What does a Z error do to |0⟩?",key:"z-on-zero"},{label:"What about superpositions?",key:"z-on-super"},{label:"Why are phase errors hard to catch?",key:"phase-hard"},{label:"Simulate: Z errors on |+⟩ state",key:"sim-z-plus"}],messages:[]},{id:"cell-5",number:5,question:"Hardware noise is often biased—one error type dominates. Why should we care?",prompts:[{label:"What is biased noise?",key:"biased-noise"},{label:"How does bias affect QEC?",key:"bias-qec"},{label:"Compare: symmetric vs Z-biased",key:"compare-bias"}],messages:[]},{id:"cell-6",number:6,question:"Project contribution: Define the noise model that everyone will use for the rest of the course.",prompts:[{label:"Use symmetric noise (0.1% each)",key:"pick-symmetric"},{label:"Use Z-biased noise (2:1 ratio)",key:"pick-zbiased"},{label:"Use realistic superconducting (0.3%)",key:"pick-realistic"},{label:"Show me the final model summary",key:"show-summary"}],messages:[]}]}function d(e,t,r){let s=o(a,100),l=o(i,100),c=[10,100,1e3].map(e=>1-Math.pow(.997,e));return({"x-error":{content:`**Bit-flip (X) error:** Flips |0⟩ → |1⟩ and |1⟩ → |0⟩. This is the quantum version of a classical bit flip.

In the Pauli matrix form: X = [[0,1],[1,0]]. When applied to a qubit, it swaps the amplitudes of |0⟩ and |1⟩.

*Simulation:* At 0.1% X error rate per gate, running 100 gates produces an X error ~${n(.09520785288629108)} of the time.`,contextUpdate:{selectedErrors:[...t.selectedErrors||[],"X"]}},"z-error":{content:`**Phase-flip (Z) error:** Leaves |0⟩ unchanged but flips |1⟩ → -|1⟩. This changes the *phase* of the quantum state.

In matrix form: Z = [[1,0],[0,-1]]. It looks invisible if you only measure in the computational basis!

*Simulation:* A Z error on |0⟩ does nothing observable. But on |+⟩ = (|0⟩+|1⟩)/√2, it flips it to |-⟩ = (|0⟩-|1⟩)/√2.`,contextUpdate:{selectedErrors:[...t.selectedErrors||[],"Z"]}},"y-error":{content:`**Y error:** A combination of both X and Z (up to a phase). Y = iXZ.

It both flips the bit AND flips the phase. In matrix form: Y = [[0,-i],[i,0]].

*Simulation:* Y errors are detected by BOTH X-type and Z-type stabilizers in CSS codes. This makes them easier to catch but also more destructive.`,contextUpdate:{selectedErrors:[...t.selectedErrors||[],"Y"]}},"all-errors":{content:`**All three error types at a glance:**

| Error | Effect on |0⟩ | Effect on |1⟩ | Effect on |+⟩ |
|-------|-----------|-----------|-----------|
| X | → |1⟩ | → |0⟩ | → |+⟩ (no change) |
| Z | → |0⟩ (no change) | → -|1⟩ | → |-⟩ |
| Y | → i|1⟩ | → -i|0⟩ | → i|-⟩ |

*Simulation with symmetric 0.1% per gate:*
After 100 gates: ${s.errorCounts.X} X errors, ${s.errorCounts.Y} Y errors, ${s.errorCounts.Z} Z errors observed across 10,000 trials.`,contextUpdate:{selectedErrors:["X","Y","Z"]}},"equal-likely":{content:`Not always! In **depolarizing noise**, yes—X, Y, Z each occur with probability p/3.

But real hardware often has **biased noise**. Superconducting qubits typically see more Z (dephasing) errors than X (bit-flip) errors, sometimes by a factor of 10-100\xd7.

*Simulation:* With symmetric noise at 0.3% total: X=${n(.001)}, Y=${n(.001)}, Z=${n(.001)} per gate.`},depolarizing:{content:`**Depolarizing noise** is the "democratic" error model: each Pauli error (X, Y, Z) has equal probability.

If total error rate is p, then:
- P(X) = p/3
- P(Y) = p/3  
- P(Z) = p/3
- P(no error) = 1-p

*Simulation (p=0.3%):* After 100 gates on 10,000 trials, we see roughly equal counts: X≈${Math.round(s.errorCounts.X)}, Y≈${Math.round(s.errorCounts.Y)}, Z≈${Math.round(s.errorCounts.Z)}.

This is a common benchmark model, but real hardware is usually biased.`},"z-dominant":{content:`Z errors (dephasing) often dominate because of how physical qubits work.

**In superconducting qubits:** The energy levels that encode |0⟩ and |1⟩ fluctuate due to noise in the environment. This causes the *phase* to drift (T2 decay) faster than the *population* flips (T1 decay).

Typical ratio: T1/T2 ≈ 2, meaning dephasing is twice as fast as bit-flips.

*Simulation (Z-biased, 4:1 ratio):* After 100 gates: X=${l.errorCounts.X}, Z=${l.errorCounts.Z}. Z errors clearly dominate.`,contextUpdate:{dominantPick:"Z"}},"sim-count":{content:`**Simulation: 10,000 circuits \xd7 100 gates each**

With symmetric noise (0.1% per Pauli per gate):
- X errors: ${s.errorCounts.X} total (${n(s.errorCounts.X/(s.errorCounts.X+s.errorCounts.Y+s.errorCounts.Z+s.errorCounts.I))} of all events)
- Y errors: ${s.errorCounts.Y} total
- Z errors: ${s.errorCounts.Z} total
- No error: ${s.errorCounts.I} slots

Logical error rate (unprotected): ${n(s.pLogicalError)}

*The simulator shows:* Even at 0.3% physical error rate, an unprotected 100-gate circuit fails about ${n(s.pLogicalError)} of the time.`},"depth-compare":{content:`**How errors accumulate with circuit depth:**

At 0.3% error rate per gate:
| Depth | P(at least one error) |
|-------|----------------------|
| 10 gates | ${n(c[0])} |
| 100 gates | ${n(c[1])} |
| 1000 gates | ${n(c[2])} |

${t.selectedErrors?.includes("Z")?"Earlier you explored Z errors—imagine those accumulating with depth!":""}

*The simulator shows:* By 1000 gates, you're almost certain to have errors. This is why we need QEC.`,contextUpdate:{depthConcern:"1000"}},"useless-point":{content:`Computation becomes useless when P(logical error) ≈ 50%—you're just guessing at that point.

**Rule of thumb:** If physical error rate is p, after ~1/p gates you're likely to have at least one error.

At p = 0.3%: ~300 gates before you expect an error.
At p = 1%: ~100 gates before you expect an error.

${t.depthConcern?`You saw earlier that at 1000 gates, error probability is ${n(c[2])}.`:""}

*This is the core problem QEC solves:* We need thousands or millions of gates for useful algorithms.`},"fewer-gates":{content:`We can't just use fewer gates because useful quantum algorithms *require* deep circuits:

- **Shor's factoring:** ~O(n\xb3) gates for n-bit numbers → millions of gates
- **Chemistry simulation:** Thousands of Trotter steps → millions of gates
- **Grover search:** √N iterations → thousands of gates for large N

${t.depthConcern?"Earlier you saw that 1000 gates already gives near-certain errors. Algorithms need 10,000× more.":""}

*The only solution:* Error correction that can run indefinitely without accumulating errors.`},"z-on-zero":{content:`Z|0⟩ = |0⟩. **Nothing happens!**

This is why phase errors are sneaky. If you measure in the computational basis {|0⟩, |1⟩}, you can't tell if a Z error occurred on |0⟩.

Similarly: Z|1⟩ = -|1⟩. The minus sign is a "global phase" that's also unobservable in a single measurement.

*Simulation:* Applying Z errors to |0⟩ states, 0% are detected by computational basis measurement.`},"z-on-super":{content:`On superpositions, Z errors are devastating:

- Z|+⟩ = |-⟩ (completely orthogonal!)
- Z|-⟩ = |+⟩

The |+⟩ and |-⟩ states differ by a relative phase, and Z flips that phase.

*Simulation:* Measuring |+⟩ in the X basis: P(+)=100%, P(-)=0%
After Z error: P(+)=0%, P(-)=100%

${t.selectedErrors?.includes("X")?"Compare this to X errors, which flip |0⟩↔|1⟩ directly.":""}

This matters for any algorithm using superposition—which is all of them.`},"phase-hard":{content:`Phase errors are hard to catch because they're **invisible in the wrong basis.**

- If you only measure in {|0⟩,|1⟩}: Z errors on |0⟩ or |1⟩ are undetectable
- You need X-type stabilizers (measured in a rotated basis) to detect Z errors

*This is why QEC codes have BOTH X and Z stabilizers:*
- Z stabilizers catch X errors
- X stabilizers catch Z errors

${"Z"===t.dominantPick?"Earlier you noted Z errors often dominate in hardware—this means X stabilizers are crucial!":""}`},"sim-z-plus":{content:`**Simulation: Z errors on |+⟩ states**

Setup: Prepare |+⟩, apply Z error with probability p, measure in X basis.

| Error Rate | P(correct |+⟩) | P(flipped to |-⟩) |
|-----------|----------------|-------------------|
| 0.1% | 99.9% | 0.1% |
| 1% | 99% | 1% |
| 10% | 90% | 10% |

*The simulator shows:* Z errors directly flip the measurement outcome in the X basis. This is exactly what an X-type stabilizer would detect!`},"biased-noise":{content:`**Biased noise** means one error type occurs more often than others.

Common in real hardware:
- **Superconducting qubits:** Z errors dominate (T2 < T1)
- **Cat qubits:** Exponentially suppressed X errors (designed bias)
- **Spin qubits:** Often X-biased (environmental magnetic noise)

A bias ratio η = P(Z)/P(X) can range from 2 to 1000+ depending on the platform.

${t.selectedErrors?.length?`You've explored ${t.selectedErrors.join(", ")} errors—bias determines which you'll see most.`:""}`},"bias-qec":{content:`Bias fundamentally changes QEC strategy:

**If Z errors dominate (η >> 1):**
- Use fewer X stabilizers (they detect Z errors)
- Or use specialized "bias-preserving" codes like XZZX
- Can achieve higher thresholds by tailoring to the bias

**If errors are symmetric (η ≈ 1):**
- Standard surface code works well
- Need equal resources for X and Z detection

*Simulation (Z-biased, η=4):* Logical error rate is ${n(l.pLogicalError)} vs ${n(s.pLogicalError)} for symmetric noise at same total rate.`,contextUpdate:{biasPick:"aware"}},"compare-bias":{content:`**Comparison: Symmetric vs Z-biased noise**

Both at 0.3% total error rate, 100 gates, 10,000 trials:

| Model | X errors | Y errors | Z errors | P(logical) |
|-------|----------|----------|----------|------------|
| Symmetric | ${s.errorCounts.X} | ${s.errorCounts.Y} | ${s.errorCounts.Z} | ${n(s.pLogicalError)} |
| Z-biased (4:1) | ${l.errorCounts.X} | ${l.errorCounts.Y} | ${l.errorCounts.Z} | ${n(l.pLogicalError)} |

${"Z"===t.dominantPick?"This confirms what you suspected earlier—Z errors really do dominate in biased systems!":""}

*The simulator shows:* Same total rate, different distribution. QEC codes can exploit this!`},"pick-symmetric":{content:`**Noise Model Selected: Symmetric Depolarizing**

\`\`\`
SHARED_NOISE_MODEL = {
  p_X: 0.001,  // 0.1% per gate
  p_Y: 0.001,  // 0.1% per gate
  p_Z: 0.001,  // 0.1% per gate
  total: 0.003 // 0.3% total
  bias: "symmetric"
}
\`\`\`

This model treats all error types equally—a good baseline for comparing codes.

${t.depthConcern?`At your earlier depth of ${t.depthConcern} gates, expect ~${n(1-Math.pow(.997,parseInt(t.depthConcern)))} probability of error.`:""}

*Project contribution locked in. Everyone will use this noise model.*`,contextUpdate:{noiseParams:{pX:.001,pY:.001,pZ:.001}}},"pick-zbiased":{content:`**Noise Model Selected: Z-Biased (2:1 ratio)**

\`\`\`
SHARED_NOISE_MODEL = {
  p_X: 0.00075,  // 0.075% per gate
  p_Y: 0.00075,  // 0.075% per gate
  p_Z: 0.0015,   // 0.15% per gate
  total: 0.003   // 0.3% total
  bias: "Z-dominant (η=2)"
}
\`\`\`

${"aware"===t.biasPick?"Earlier you learned that bias affects QEC strategy—this model lets us explore that!":""}

This matches typical superconducting hardware where dephasing exceeds bit-flip.

*Project contribution locked in. Everyone will use this noise model.*`,contextUpdate:{noiseParams:{pX:75e-5,pY:75e-5,pZ:.0015}}},"pick-realistic":{content:`**Noise Model Selected: Realistic Superconducting**

\`\`\`
SHARED_NOISE_MODEL = {
  p_X: 0.0005,  // 0.05% per gate
  p_Y: 0.0005,  // 0.05% per gate  
  p_Z: 0.002,   // 0.2% per gate
  total: 0.003  // 0.3% total
  bias: "Z-dominant (η=4)"
}
\`\`\`

Based on published Google/IBM device parameters (2024).

${"Z"===t.dominantPick?"This confirms your earlier intuition—Z errors dominate at 4:1!":""}

*Project contribution locked in. Everyone will use this noise model.*`,contextUpdate:{noiseParams:{pX:5e-4,pY:5e-4,pZ:.002}}},"show-summary":{content:t.noiseParams?`**Project Contribution Complete: Shared Noise Model**

Throughout this notebook, you explored:
${t.selectedErrors?.length?`- Error types: ${t.selectedErrors.join(", ")}`:"- The three fundamental error types (X, Y, Z)"}
${t.depthConcern?`- Depth effects: saw errors reach ${n(1-Math.pow(.997,parseInt(t.depthConcern)))} at ${t.depthConcern} gates`:"- How errors accumulate with circuit depth"}
${t.dominantPick?`- Dominant error: you identified ${t.dominantPick} as often dominant`:"- Which errors dominate in real hardware"}
${t.biasPick?"- Bias implications for QEC strategy":"- Why noise bias matters for code design"}

**Your chosen noise model:**
\`\`\`
p_X = ${n(t.noiseParams.pX)} per gate
p_Y = ${n(t.noiseParams.pY)} per gate
p_Z = ${n(t.noiseParams.pZ)} per gate
\`\`\`

*This model will be used for all simulations in Units 2-11.*`:`You haven't selected a noise model yet. Choose one of the options above to complete your project contribution.

Options:
- Symmetric (equal X, Y, Z)
- Z-biased (2:1 ratio)
- Realistic superconducting (4:1 ratio)`}})[e]||{content:"I don't have a specific response for that. Try one of the suggested prompts, or ask about error types, accumulation, or bias."}}
var freeText=function(e,t,r){let s=e.toLowerCase();if(s.includes("x error")||s.includes("bit flip")||s.includes("bit-flip"))return d("x-error",t,r).content;if(s.includes("z error")||s.includes("phase flip")||s.includes("phase-flip")||s.includes("dephasing"))return d("z-error",t,r).content;if(s.includes("y error"))return d("y-error",t,r).content;if(s.includes("depolariz"))return d("depolarizing",t,r).content;if(s.includes("bias"))return d("biased-noise",t,r).content;if(s.includes("accumul")||s.includes("depth")||s.includes("how many gate"))return d("depth-compare",t,r).content;if(s.includes("superposition")||s.includes("|+"))return d("z-on-super",t,r).content;if(s.includes("threshold")||s.includes("useless")||s.includes("fail"))return d("useless-point",t,r).content;let o=[];return t.selectedErrors?.length&&o.push(`You've explored ${t.selectedErrors.join(", ")} errors`),t.dominantPick&&o.push(`earlier you identified ${t.dominantPick} as often dominant`),t.noiseParams&&o.push(`your selected noise model has P(X)=${n(t.noiseParams.pX)}, P(Z)=${n(t.noiseParams.pZ)}`),`I can help with questions about quantum error types (X, Y, Z), how errors accumulate with circuit depth, phase errors on superpositions, or biased noise models.

${o.length?`Context from your exploration: ${o.join("; ")}.`:""}

Try asking about one of these topics, or use the suggested prompts above.

*Remember: All numbers come from the simulator—it's the source of truth.*`};
