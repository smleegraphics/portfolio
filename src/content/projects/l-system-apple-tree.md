---
title: L-System Apple Tree
description: A procedural apple tree generator built with WebGL and TypeScript using L-System algorithms.
date: 2021-03-10
thumbnail: /images/projects/l-system-apple-tree/tree_thumbnail.png
tags:
  - project
  - code
  - webgl
  - typescript
featured: false
---

I created a procedural apple tree generator based on L-Systems with the base grammar of `F = F[-F]F[+F]` and slowly introduced increasing elements of variation such as leaves, apples, and pseudo-random branch rotations. It was both fascinating and challenging to try to mimic organic structures using math and algorithms.

<a href="https://18smlee.github.io/hw04-l-systems/" target="_blank" class="inline-flex items-center gap-2 text-accent hover:underline font-medium">Live Demo →</a>

<div class="mt-8"></div>

<video autoplay muted loop playsinline controls class="w-full rounded-lg">
  <source src="/images/projects/l-system-apple-tree/apple_tree.mp4" type="video/mp4">
</video>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Instance Rendering</h2>

The branches of the tree are made up of many small cylinders that are instance rendered on top of each other. I created a Turtle class that marches along a path specified by the L-System grammar and determines the size and orientation of a given cylinder instance. The leaves and apples are also instance rendered similarly.

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">User Parameters</h2>

The branch rotation angles are based on a seeded noise function, which means the tree only changes when prompted by the user's seed input. The user may also increase or decrease the number of recursive calls in the L-System with the iterations control. I implemented the apple density control by simply adding a probability value and conditionally rendering an apple based on the apple density value. The branch thickness on the other hand was a bit more tricky to implement.

<div class="mt-6"></div>

Since thickness is an attribute that belongs to the individual instances of each cylinder in the tree, I made the branch thickness a variable in my Turtle class. This allowed me to scale the cylinder up or down depending on how deep in the recursion the turtle was.

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Final Touches</h2>

To add a bit of visual flair, I added FBM-based clouds to the background referencing <a href="https://www.shadertoy.com/view/4tdSWr" target="_blank" class="text-accent hover:underline">this shader</a>.

<div class="mt-6"></div>

I also implemented textures by loading in my own images and adding UV coordinates to my vertex and fragment shaders. To increase variation even further, I sample 2 different textures for both the apples and the leaves.
