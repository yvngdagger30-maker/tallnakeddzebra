# Don Gray — Beautifully Disturbing

A responsive horror-art portfolio for Don Gray, combining graphic design, computer science, and engineering interests. Built with semantic HTML, CSS, and vanilla JavaScript.

## Features
- Three original generative concept studies with interpretive case files
- Category filters and keyboard-accessible modal gallery
- Interactive signal-distortion lab (no camera, microphone, or uploads)
- Email and telephone links, copyable social handle
- Responsive navigation and reduced-motion preference

## Deployment
Cloudflare Workers Builds is connected to this repository. Production branch: `main`. Build command: none. Deploy command: `npx wrangler deploy`. `wrangler.jsonc` configures the existing `tallnakeddzebra` Worker to serve these static assets. Domain bindings remain managed in Cloudflare; this code does not modify DNS.

## Editing
Update copy and contact information in `index.html`, artwork case files in `script.js`, and styling in `styles.css`. Image assets are hosted locally in `assets/`. The gallery artwork is clearly disclosed as generative concept imagery, not completed client projects or photographs of physical artwork. No specific degree, institution, software proficiency, or professional credential is claimed.

## Artwork direction
Generated using the built-in image generation tool for this portfolio:
1. The Signal: cracked porcelain mannequin head, black surveillance cables, green lens, black studio, cinematic practical-effects sculpture, no gore.
2. Someone Else: mirror-faced figure in a flooded brutalist corridor, fractured identity, red thread, cinematic sculptural portrait, no gore.
3. After Us: ribcage-like industrial ruin in dark water, environmental dread, fog, faint green algae, photoreal miniature concept, no gore.

Fonts use Google Fonts with local system fallbacks. No analytics, autoplay audio, or tracking scripts are included.

## Nightmare Icons
Unofficial generative fan-art ensemble of Jason Voorhees, Freddy Krueger, Michael Myers, and the Creeper, with interactive character interpretations and reduced-motion-aware slasher accent. These characters are attributed to their respective properties and are not presented as Don Gray original character designs.

## Nightmare Icons: Rewired
Four individually generated reinterpretations: Jason / The Anonymous (fiber-optic mask, anonymity); Freddy / The Insomniac (clock-hand claws, burnout); Michael / The Bystander (mirror eye, desensitization); Creeper / The Consumer (e-waste coat, extraction). Built-in image generation used, cinematic practical-effects portrait prompts, charcoal/ivory/acid green, no gore. Assets saved in assets/{jason,freddy,myers,creeper}-rewired.webp. Cards flip to reveal social meaning, have expandable design notes, a reveal-all control, and ultraviolet color mode. Existing reduced-motion control disables flip transitions.

The Rewired card narratives are fictional vignettes inspired by the generated portraits, not canonical film storylines. Each design note describes visible costume and material details.
