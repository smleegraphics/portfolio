---
title: Mini Minecraft
description: A C++ and OpenGL recreation of Minecraft featuring procedural terrain generation, multithreaded chunk loading, and a dynamic day/night sky system.
date: 2020-04-15
thumbnail: /images/projects/mini-minecraft/minecraft-thumbnail.png
tags:
  - project
  - code
  - opengl
  - cpp
featured: true
---


I worked in a team of 3 to build a miniature version of Minecraft for the final project in our Introduction to Computer Graphics class. Despite having to work in three different time zones due to the Covid-19 crisis, we were able to complete an intergalactic themed Minecraft world!

<div class="mt-8"></div>

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/412736781?autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem;" title="Mini Minecraft"></iframe></div>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Efficient Chunk Creation</h2>

One of my primary contributions was optimizing the chunk creation system. In Minecraft-style games, the world is divided into chunks—16x256x16 blocks that are loaded and unloaded as the player moves. Efficiently managing these chunks is critical for smooth gameplay.

<div class="mt-6"></div>

The chunk creation pipeline involves three main steps:

<ol class="list-decimal list-inside space-y-2 mt-4 text-gray-700 dark:text-gray-300">
  <li><strong class="text-gray-900 dark:text-gray-100">Block data generation</strong> — Determine which block types exist at each position using noise functions for terrain height, caves, and biome distribution.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Mesh construction</strong> — Build the renderable geometry by only creating faces between solid and transparent blocks (culling hidden faces).</li>
  <li><strong class="text-gray-900 dark:text-gray-100">VBO creation</strong> — Upload the mesh data to the GPU for rendering.</li>
</ol>

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Multithreading</h2>

To prevent frame drops when loading new chunks, I implemented a multithreaded system that offloads the expensive block data generation and mesh construction to worker threads. Only the final VBO creation step—which requires OpenGL context—runs on the main thread.

<div class="mt-6"></div>

This approach keeps the main rendering loop responsive while chunks are being prepared in the background. As the player explores, new terrain seamlessly appears without noticeable stuttering.

<div class="mt-16"></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Procedural Sky</h2>

I also implemented a procedural sky system with a full day/night cycle. Rather than using a static skybox, the sky colors are computed in the fragment shader based on the sun's position, creating smooth transitions between dawn, day, dusk, and night.

<div class="mt-6"></div>

The sky shader uses:

<ul class="list-disc list-inside space-y-2 mt-4 text-gray-700 dark:text-gray-300">
  <li><strong class="text-gray-900 dark:text-gray-100">Rayleigh scattering</strong> — Simulates how sunlight scatters through the atmosphere, creating blue skies and orange sunsets.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Sun disc rendering</strong> — A bright circular gradient that tracks across the sky.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">Color palette interpolation</strong> — Blends between predefined color palettes for different times of day.</li>
</ul>
