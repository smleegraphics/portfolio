---
title: Procedural Flower Tool
description: A Houdini-based procedural tool for generating customizable stylized flowers with art-directable parameters.
date: 2021-02-20
thumbnail: /images/projects/procedural-flower-tool/Active_Render.0001.1.png
tags:
  - project
  - houdini
  - vex
  - python
featured: true
---

I have always wanted to create an art-directable procedural tool in Houdini, and had been fascinated by naturally occurring fractal structures such as flowers! In this project, I created a procedural tool that generates a wide variety of flowers and gives the user the power to tweak anything as small as the amount of bend on the left side of a petal to something as broad as the curve input for the stem of the flower itself.

<div class="mt-8"></div>

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/650966824?autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem;" title="Procedural Flower Tool"></iframe></div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Inspiration</h2>

<div class="flex flex-col md:flex-row gap-6 items-center">
  <div class="w-full md:w-1/2">
    <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://www.youtube.com/embed/CV2P-xsEiYE?autoplay=1&mute=1&loop=1&playlist=CV2P-xsEiYE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem;" title="Flower blooming reference"></iframe></div>
  </div>
  <p class="w-full md:w-1/2 text-gray-700 dark:text-gray-300">I really wanted to draw my inspiration from life, so I studied the structure and blooming patterns of many different types of flowers.</p>
</div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Golden Ratio Petal Structure</h2>

Here is a quick summary of the algorithm used to generate the spiral of petals: For every petal in the flower, I want to calculate the petal's position by finding its polar coordinates (radius and angle). The radius is proportional to the number of petals, so that the spiral continues to grow as we increase the petals. The golden angle is added to the angle for every petal, driving the spiral's curve.

<div class="mt-6"></div>

<img src="/images/projects/procedural-flower-tool/spiral_points_PNG.avif" alt="Golden ratio spiral points diagram" class="w-full max-w-md rounded-lg" />

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Flower and Petal Parameters</h2>

Parameters are categorized into flower parameters, for changes to the overall shape of the flower, and petal parameters, for changes to individual petals. I wanted to focus on improving the usability of the tool and fine tuning the parameters of the petal subnetwork to maximize flower variance and allow artistic specificity.

<div class="mt-6"></div>

After studying many different types of flowers, it became apparent that there is a relationship between the petal's distance from the center and the petal's size and bend amount. For this reason, I thought it would be best to have the petal size and bend amount be ramp parameters based on the petal's distance from the center.

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Final Renders</h2>

Here are just a couple examples of applications of my procedural flower tool:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-start">
  <img src="/images/projects/procedural-flower-tool/Active_Render.0001.1.png" alt="Procedural flower render" class="w-full rounded-lg" />
  <img src="/images/projects/procedural-flower-tool/rose.png" alt="Procedural rose render" class="rounded-lg" style="width: 65%;" />
</div>
