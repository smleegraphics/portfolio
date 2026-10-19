---
title: Wee Wonderer
description: A cozy browser toy where a tiny figurine walks, runs, jumps and climbs around a Gaussian-splat scan of a real room, with collision built automatically from the scan.
date: 2026-10-16
thumbnail: /images/projects/wee-wonderer/wee-wonderer-thumbnail.jpg
tags:
  - gaussian-splats
  - webgpu
  - typescript
  - three.js
cardTags:
  - gaussian-splats
  - webgpu
  - three.js
featured: true
---

<div class="text-gray-700 dark:text-gray-300 leading-relaxed [&_p]:mb-5">

<p class="text-xl text-gray-600 dark:text-gray-400">A cozy browser toy where a tiny figurine walks, runs, jumps and climbs around a Gaussian-splat scan of a real room.</p>

<div class="flex flex-wrap gap-3 mt-6 mb-10 not-prose">
  <a href="https://wee.samanthamlee.com" target="_blank" rel="noopener" class="btn-primary no-underline">Play it</a>
  <a href="https://github.com/smleegraphics/wee-wonderer" target="_blank" rel="noopener" class="btn-secondary no-underline text-gray-900 dark:text-gray-100">View the code</a>
</div>

It’s been a while since I’ve worked on a personal project end to end… but with how fast frontier models have been improving, I realized there was really nothing stopping me from building something of my own. Recently, it gave me the push I needed to continue pursuing my own education in <a href="https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/" class="text-accent hover:underline">Gaussian splats</a>.

<div class="mt-10" style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1237158623?autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem;" title="Wee Wonderer trailer"></iframe></div>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-14 mb-4 pt-10 border-t border-gray-200 dark:border-gray-800">The Idea</h2>

As a kid, I used to imagine being the size of a thumbtack and seeing the world from that perspective. Not necessarily a unique thought I know… but think about it - climbing up the side of your desk, sledding down your laptop stand on an eraser, or swinging off your houseplant’s leaves to trampoline off your couch cushions!

Gaussian splats make it possible to bring any real environment to life digitally, and with models like Opus 5.5, it’s actually possible to build a version of this as an individual!

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-14 mb-4 pt-10 border-t border-gray-200 dark:border-gray-800">The Tech Stack</h2>

I knew I wanted this to be a browser experience, so <a href="https://threejs.org/" class="text-accent hover:underline">three.js</a> was a natural pick. It also had all the pieces I needed built in: native Gaussian splat support, cameras, lighting and animation. Best of all, three.js draws splats and regular 3D models into the same depth buffer, so the figurine hides behind a chair and the chair hides behind him, without me having to worry about occlusion. It’s also a library LLMs know very well, so the decision was easy.

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-14 mb-4 pt-10 border-t border-gray-200 dark:border-gray-800">Dynamically Generated Collision Meshes</h2>

The most obvious problem to solve in a project like this is generating a collision mesh for a splat scan on the fly. A splat scan is made of over a hundred thousand ellipse-shaped splats, each with its own color, shape and opacity, that together represent a 3D environment. There are no meshes, no physics and no collision system: none of the baseline things a game needs.

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Density Grid</h3>

I used the <a href="https://en.wikipedia.org/wiki/Isosurface" class="text-accent hover:underline">isosurface</a> method: find the surface where density crosses a specific threshold.

The scan is divided into a grid of <a href="https://en.wikipedia.org/wiki/Voxel" class="text-accent hover:underline">voxels</a>, and each voxel holds a running total of opacity, its “density”. For every splat, I calculate how much of its opacity lands in each voxel it covers, based on its shape. That way, large faint splats (often floaters) spread their little bit of opacity over many voxels, while small solid splats on real surfaces concentrate theirs in a few.

With the density grid in place, a threshold decides which voxels are solid. In my implementation, that threshold is 35% of the median density of the voxels, so it adapts to each scan instead of being one fixed number.

<figure class="my-8">
  <video autoplay muted loop playsinline class="w-full rounded-lg" aria-label="Voxels growing over the Kitchen scan, densest first">
    <source src="/images/projects/wee-wonderer/voxel-density.mp4" type="video/mp4" />
  </video>
  <figcaption class="mt-2 text-sm text-gray-500 dark:text-gray-400">The density grid on the Kitchen scan, with the threshold sweeping down: the densest voxels become solid first. Pale blue is just over the threshold, deep blue far over it.</figcaption>
</figure>

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Voxel Cleanup</h3>

Not every scan is perfect. Common issues include stray blobs floating in the air and holes in real surfaces. Wee Wonderer runs several cleanup passes on the voxels:

<ul class="list-disc pl-6 space-y-1 mb-5">
  <li>removing small isolated clumps</li>
  <li>closing small holes</li>
  <li>filling gaps in the floor</li>
  <li>filling holes in flat vertical surfaces like cabinet doors</li>
</ul>

<figure class="my-8">
  <video autoplay muted loop playsinline class="w-full rounded-lg" aria-label="Voxel cleanup on the Kitchen table: orange clumps shrink away, then purple voxels fill the holes">
    <source src="/images/projects/wee-wonderer/voxel-cleanup.mp4" type="video/mp4" />
  </video>
  <figcaption class="mt-2 text-sm text-gray-500 dark:text-gray-400">Cleanup on the Kitchen table, in the order the passes run: stray clumps (orange) are removed, then holes are filled (purple).</figcaption>
</figure>

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Mesh Generation</h3>

I use <a href="https://0fps.net/2012/07/12/smooth-voxel-terrain-part-2/" class="text-accent hover:underline">Surface Nets</a> to build the mesh from the voxel grid. Surface Nets places one vertex inside each voxel cell the surface passes through, where the density crosses the threshold along the cell’s edges, and joins neighboring vertices into faces. The result is a smooth mesh that follows the splats much more closely than the voxels’ blocky faces would. I then run a <a href="https://graphics.stanford.edu/courses/cs468-01-fall/Papers/taubin-smoothing.pdf" class="text-accent hover:underline">Taubin smoothing</a> pass (a kind of smoothing that doesn’t shrink the mesh) so no trace of the blocky voxel shape remains.

<figure class="my-8">
  <img src="/images/projects/wee-wonderer/mesh-wireframe.jpg" alt="The collision mesh drawn as a green wireframe over the bulldozer and table in the Kitchen scan" class="w-full rounded-lg" loading="lazy" />
  <figcaption class="mt-2 text-sm text-gray-500 dark:text-gray-400">The finished collision mesh, drawn as a wireframe over the scan.</figcaption>
</figure>

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Bounding Volume Hierarchy (BVH) Lookup</h3>

Every frame, the game checks the collision mesh to see whether the figurine is bumping into something, whether there’s a wall ahead to climb, where the ground is, and so on. The mesh has tens of thousands of triangles, sometimes over a hundred thousand, so checking every one of them each time would be far too slow. Instead, I use <a href="https://github.com/gkjohnson/three-mesh-bvh" class="text-accent hover:underline">three-mesh-bvh</a> to build a <a href="https://en.wikipedia.org/wiki/Bounding_volume_hierarchy" class="text-accent hover:underline">bounding volume hierarchy</a> (BVH) for each room. A BVH is a tree of boxes: each box holds two smaller boxes, all the way down to small boxes of about ten triangles each. A check starts at the biggest box and only goes into the boxes it actually touches, so it skips most of the room and only tests the few triangles near the figurine.

<figure class="my-8">
  <img src="/images/projects/wee-wonderer/bvh-diagram.svg" alt="Diagram: a top-down room of triangles inside nested boxes, and the same boxes as a tree. A check near the figurine opens one branch and tests 18 of 140 triangles." class="w-full rounded-lg border border-gray-200 dark:border-gray-800" loading="lazy" />
  <figcaption class="mt-2 text-sm text-gray-500 dark:text-gray-400">A check near the figurine only opens the boxes it touches, so it skips most of the room.</figcaption>
</figure>

I also use the BVH when a room loads to build a map of walkable areas, by casting rays straight down to find every floor, tabletop and shelf with enough room above it to stand.

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-14 mb-4 pt-10 border-t border-gray-200 dark:border-gray-800">Future Plans</h2>

So far I’ve built the foundational pieces of Wee Wonderer, but there’s a lot more I want to do. Here are just a few:

<ul class="list-disc pl-6 space-y-1 mb-5">
  <li>Smoother collision meshes for smoother travel, possibly with an LLM-driven step that tunes the collision settings for each scan</li>
  <li>More game mechanics: collectibles, enemies, items and other fun little things hidden in the scans</li>
  <li>More avatars, possibly with their own custom movements and actions</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-14 mb-4 pt-10 border-t border-gray-200 dark:border-gray-800">How I Worked with AI on This Project</h2>

I’ve been working with Claude Code and Codex for almost all of 2026 as part of my work at Meta, and over that time I’ve developed my own style of working with agents. Almost every line of Wee Wonderer was written by an agent, but I stay in charge of the decision making throughout the entire process.

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Staying in Charge</h3>

I lean towards micromanaging my agents, especially on a project like this, where I want to understand exactly how things are implemented and why. That takes attention, so I work with one agent at a time. I used to run an army of agents on four things at once, but I’d confuse myself context switching and couldn’t make decisions well. There’s still a time and place for that kind of multitasking, just not for work I want to understand deeply.

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Plan First, Spike When Unsure</h3>

Most of that attention goes into planning. Before anything gets built, my agent and I agree on a plan: the steps, and how we’ll test the result. The agent knows to ask for my OK before changing anything, which keeps it from going rogue. When planning can’t settle a choice, I run a quick spike to see which approach actually works. With AI, experiments are cheap. I ran about fifteen on this project and threw several away, including a Spider-Man-style wall crawl. Each new feature also gets a fresh session, so everything worth remembering lives in the repo for the next one to read.

<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2">Letting the Agent Check Its Own Work</h3>

I don’t want to play through the game every time the agent tries a fix, so I gave it a testing environment it can run itself. That matters most for finding real fixes: an AI will happily hide a symptom if you let it, so I ask for the root cause of every fix, measured, not guessed. When the figurine could sink into an overhang while climbing, the agent added temporary logging, reproduced the bug, and traced it to a single snap toward the wall that could push the body almost three body-widths forward in one frame. Only then did we fix it.

<h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-14 mb-4 pt-10 border-t border-gray-200 dark:border-gray-800">Credits</h2>

<ul class="list-disc pl-6 space-y-2 text-sm">
  <li><strong class="text-gray-900 dark:text-gray-100">Kitchen, Living Room and Counter scans</strong>: the Mip-NeRF 360 dataset (Jonathan T. Barron, Ben Mildenhall, Dor Verbin, Pratul P. Srinivasan, Peter Hedman, <a href="https://jonbarron.info/mipnerf360/" class="text-accent hover:underline">CVPR 2022</a>), <a href="https://creativecommons.org/licenses/by/4.0/" class="text-accent hover:underline">CC BY 4.0</a>. Trained into splats by alexmkwizu; cleaned, levelled and converted for this project.</li>
  <li><strong class="text-gray-900 dark:text-gray-100">The figurine</strong>: <a href="https://sketchfab.com/3d-models/free-pack-chibi-base-mesh-rigged-fed4fb329f224f1594f631eae8d2626b" class="text-accent hover:underline">Free Pack – Chibi Base Mesh (Rigged)</a> by PolyOne Studio, <a href="https://creativecommons.org/licenses/by/4.0/" class="text-accent hover:underline">CC BY 4.0</a>, with animations from Mixamo.</li>
</ul>

</div>
