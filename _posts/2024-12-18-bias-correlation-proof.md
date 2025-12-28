---
layout: vlog
title: "Bias, Correlation, and a Tiny Proof"
date: 2024-12-18
mood: focused
read_time: 4 min read
lead: "A compact derivation I keep forgetting. Clean statement, clean assumptions."
written_at: "2:30 am"
tags: [Math, Crypto]
math: true
---

## the setup

When analyzing stream ciphers, we often need to understand the relationship between bias and correlation. Here's the key insight I always have to re-derive.

## the statement

For random variables $X$ and $Y$ over $\{0,1\}$:

$$\Pr[X \oplus Y = 1] = \frac{1}{2} + \varepsilon$$

where $\varepsilon$ is the correlation bias.

## why it matters

This simple relationship is the foundation of differential-linear cryptanalysis. The bias propagates through rounds, and understanding how it compounds is key to breaking ciphers.

The key insight is that for independent biases $\varepsilon_1, \varepsilon_2$:

$$\varepsilon_{total} \approx 2 \cdot \varepsilon_1 \cdot \varepsilon_2$$

## quick notes

- Bias compounds multiplicatively (mostly)
- Independence assumptions matter more than we think
- Always check your experimental correlations against theory
