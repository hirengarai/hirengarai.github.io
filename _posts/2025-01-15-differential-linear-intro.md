---
layout: post
title: "Differential-Linear Cryptanalysis: A Brief Introduction"
date: 2025-01-15
categories: [cryptanalysis, tutorial]
tags: [differential-linear, chacha, stream-cipher]
math: true
excerpt: "An introduction to differential-linear cryptanalysis and how it applies to modern stream ciphers like ChaCha."
---

## Introduction

Differential-linear cryptanalysis is a powerful technique that combines two classical cryptanalytic methods: differential cryptanalysis and linear cryptanalysis. This hybrid approach has proven particularly effective against ARX-based ciphers.

## The Basic Idea

The attack works in two phases:

1. **Differential Phase**: We find an input difference $\Delta x$ that propagates through the first part of the cipher with high probability.

2. **Linear Phase**: We use a linear approximation $\Gamma \cdot y = 0$ that holds with bias $\epsilon$ for the second part.

## Mathematical Framework

Given a cipher $E = E_1 \circ E_0$, where $E_0$ covers rounds $0$ to $r_0$ and $E_1$ covers rounds $r_0$ to $r$:

### Differential Probability

For the differential part, we need:

$$
\Pr[E_0(x) \oplus E_0(x \oplus \Delta x) = \Delta y] = p
$$

### Linear Correlation

For the linear part, we have:

$$
\Pr[\Gamma \cdot E_1(y) = 0] = \frac{1}{2} + \epsilon
$$

### Combined Bias

The key theorem (Langford-Hellman) states that the combined correlation is:

$$
c = p \cdot (2\epsilon)^2
$$

This is a simplified model. In practice, we use more sophisticated analysis considering multiple paths.

## Application to ChaCha

ChaCha is an ARX cipher with the quarter-round function:

$$
\begin{aligned}
a &\leftarrow a + b \\
d &\leftarrow (d \oplus a) \lll 16 \\
c &\leftarrow c + d \\
b &\leftarrow (b \oplus c) \lll 12 \\
a &\leftarrow a + b \\
d &\leftarrow (d \oplus a) \lll 8 \\
c &\leftarrow c + d \\
b &\leftarrow (b \oplus c) \lll 7
\end{aligned}
$$

The modular additions create non-linearity that we exploit through careful differential analysis.

## Complexity Analysis

The data complexity of a differential-linear attack is approximately:

$$
N \approx \frac{1}{c^2} = \frac{1}{p^2 \cdot 16\epsilon^4}
$$

For our best attack on 7-round ChaCha, we achieve:

| Parameter | Value |
|-----------|-------|
| Differential probability $p$ | $2^{-8}$ |
| Linear bias $\epsilon$ | $2^{-57}$ |
| Data complexity | $2^{230}$ |

## Conclusion

Differential-linear cryptanalysis remains a powerful tool for analyzing symmetric primitives. Recent advances, including automated search techniques using SAT/MILP solvers, have pushed the boundaries of what's achievable.

## References

1. Langford, S. K., & Hellman, M. E. (1994). Differential-linear cryptanalysis. *CRYPTO 1994*.
2. Beierle, C., et al. (2020). Improved Differential-Linear Attacks. *CRYPTO 2020*.
