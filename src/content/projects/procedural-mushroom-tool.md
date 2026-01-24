---
title: Procedural Mushroom Tool
description: A Houdini-based procedural tool for generating stylized mushrooms with space colonization-driven growth animation.
date: 2022-02-01
thumbnail: /images/projects/procedural-mushroom-tool/mushroom_still.png
tags:
  - project
  - houdini
  - vex
  - python
featured: false
---

Building on my experience with the procedural flower tool, I wanted to explore more complex organic structures. Mushrooms presented an interesting challenge—combining geometric construction of caps, gills, and stems with a biologically-inspired growth algorithm. This tool generates fully art-directable mushrooms and uses space colonization to simulate realistic growth patterns.

<div class="mt-8"></div>

<video autoplay muted loop playsinline controls class="w-full rounded-lg">
  <source src="/images/projects/procedural-mushroom-tool/indv_mushroom_demo.mov" type="video/mp4">
</video>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Inspiration</h2>

I drew inspiration from the iconic Amanita muscaria mushroom, studying its distinctive dome-shaped cap, radial gill structure, and cylindrical stem. Understanding the natural proportions and organic variations in real mushrooms was essential for creating convincing procedural results.

<div class="mt-6"></div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <img src="/images/projects/procedural-mushroom-tool/mushroom_inspo.png" alt="Amanita muscaria mushroom reference" class="w-full h-64 md:h-80 object-cover rounded-lg" />
  <img src="/images/projects/procedural-mushroom-tool/mushroom_inspo2.png" alt="Mushroom reference" class="w-full h-64 md:h-80 object-cover rounded-lg" />
</div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Cap Construction</h2>

The mushroom cap starts as a basic hemisphere, which is then sculpted using a user-defined profile curve. This approach allows for a wide range of cap shapes—from flat parasols to bulbous domes. Noise is applied to break up the geometric perfection and add organic variation to the surface.

<div class="mt-6"></div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-start">
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/cap3.png" alt="Profile curve for cap shape" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Profile curve input</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/cap1.png" alt="Base hemisphere shape" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Base hemisphere</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/cap2.png" alt="Cap with organic deformation" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Organic deformation</p>
  </div>
  
</div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Gill Generation</h2>

The gills are generated using a radial distribution of lines emanating from the center, bounded by the cap's edge. Each line is then extruded and shaped into a blade-like form with tapered edges. The gill count, length, and curvature are all controllable parameters.

<div class="mt-6"></div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-start">
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/gill_generation1.png" alt="Radial line distribution" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Radial distribution</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/gill_generation2.png" alt="Boundary ring" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Boundary definition</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/gill_generation3.png" alt="Final gill geometry" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Final gill geometry</p>
  </div>
</div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Stem Construction</h2>

The stem is built by sweeping a circle along a user-provided curve input, allowing for straight, curved, or twisted stems. Noise displacement adds natural imperfections to the surface. The tool accepts any curve as input, making it easy to integrate with the space colonization growth paths.

<div class="mt-6"></div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-start">
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/stem3.png" alt="Input curve" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Input curve</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/stem2.png" alt="Swept stem geometry" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Swept geometry with noise</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/stem1.png" alt="Houdini network" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Subnetwork setup</p>
  </div>
</div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Space Colonization Algorithm</h2>

To simulate organic mushroom growth across terrain, I implemented a simplified version of the <a href="https://medium.com/@jason.webb/space-colonization-algorithm-in-javascript-6f683b743dc5" target="_blank" class="text-accent hover:underline">space colonization algorithm</a> in VEX. This algorithm was originally developed for modeling tree branching, where growth points compete for "attractor" points scattered in space, creating complex branching structures.

<div class="mt-6"></div>

For mushrooms, I adapted the algorithm to produce non-branching growth paths. Unlike trees that split into multiple branches, mushroom stems grow as single stalks toward the surface. Each growth point claims a single attractor and extends directly toward it, resulting in smooth, upward-reaching paths that mimic how real mushrooms push through soil toward light.

<div class="mt-6"></div>

The simplified algorithm works as follows:

<ol class="list-decimal list-inside space-y-2 mt-4 text-gray-700 dark:text-gray-300">
  <li><strong class="text-gray-900 dark:text-gray-100">Scatter attractors</strong> in the volume above the terrain where mushrooms should grow.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Initialize growth points</strong> on the terrain surface.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Find closest attractor</strong> for each growth point.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Extend upward</strong> by adding new points in the direction of the claimed attractor.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Remove attractors</strong> when a growth point gets close enough.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Repeat</strong> until all attractors are consumed or maximum iterations reached.</li>
</ol>

<div class="mt-6"></div>

<img src="/images/projects/procedural-mushroom-tool/space_colonization_diagram.png" alt="Space colonization algorithm diagram" class="w-full max-w-2xl rounded-lg" />

<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">The standard space colonization algorithm (shown above) produces branching structures. My implementation simplifies this by removing the branching behavior—each stem grows as a single path toward its target attractor.</p>

<div class="mt-6"></div>

<img src="/images/projects/procedural-mushroom-tool/space_colonization_vex.png" alt="VEX implementation in Houdini" class="w-full rounded-lg" />

<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">VEX implementation of the space colonization algorithm in Houdini.</p>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Growth Animation</h2>

By combining the space colonization paths with the mushroom tool, I created an animated growth system. Mushrooms sprout from a terrain surface, with their stems following the organic growth paths generated by the algorithm. The attractor points define where mushrooms will emerge, and the iterative growth creates a natural-looking animation of mushrooms pushing up through the ground.

<div class="mt-6"></div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-start">
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/predetermined_growth_paths.gif" alt="Space colonization paths visualization" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Generates predetermined growth paths</p>
  </div>
  <div class="text-center">
    <img src="/images/projects/procedural-mushroom-tool/animated_growth_paths.gif" alt="Terrain with growing mushrooms" class="w-full aspect-[4/3] object-cover rounded-lg" />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Animates along path by resample length</p>
  </div>
</div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Final Result</h2>

<video autoplay muted loop playsinline controls class="w-full rounded-lg">
  <source src="/images/projects/procedural-mushroom-tool/growth_render.mov" type="video/mp4">
</video>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Future Improvements</h2>

There are several areas I'd like to explore to enhance this tool:

<ul class="list-disc list-inside space-y-2 mt-4 text-gray-700 dark:text-gray-300">
  <li><strong class="text-gray-900 dark:text-gray-100">Mushroom variety</strong> — Expand the tool to generate a wider range of mushroom types beyond the classic toadstool shape, including chanterelles, morels, and shelf fungi.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Softer growth animation</strong> — Add easing to the end of the growth animation and introduce subtle noise-based movement at the final height to simulate mushrooms naturally swaying over time.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Cap-aware growth</strong> — Account for mushroom cap size in the space colonization algorithm to prevent intersections between neighboring mushrooms, creating more realistic clustering.</li>
</ul>
