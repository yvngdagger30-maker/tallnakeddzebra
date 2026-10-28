# Current release — silent animated encounters and three-hit health

Jason, Freddy, Myers and the Creeper each have a photographic eight-pose canvas animation, their own environment and attack timing, atmospheric depth, recoil and impact effects. Lower-body cutouts complete distant compositions. Hover a portrait or use PLAY ENCOUNTER; Escape or Close dismisses it. All encounters are completely silent. No audio API, sound control, or playback script is loaded. These are illustrated photographic-pose animations, not generated live-action footage.

Midnight Pursuit now has three health segments. Obstacles remove one segment, cancel boosts and slow the player to 64% pace for 2.1 seconds; a collision grace interval prevents a single hit draining multiple segments. The third hit ends the run. Each takedown gives 100 points and a 2.8-second +28% speed boost. Health and pace are visible above the canvas and in its HUD. Restart resets health, points and effects.

Validation: action-scares.test.cjs and pursuit.test.cjs cover pose sequences, lifecycle cleanup, silence, loading fallback, portrait sizing, motion guard, attacks, jumping, collision grace, health, scoring, boosts, slowdown and reset. Browser review included four scene compositions, launch/dismissal, motion off and 390×844 portrait controls. Production excludes the internal review pages and notes under production/.

New optimized assets are assets/action-{jason,freddy,myers,creeper,environments,lower-bodies}.webp. Built-in image generation supplied realistic costume pose sheets, empty cinematic environment plates, and matching waist-to-feet cutouts. The original four character references and prompt set are recorded in production/action-image-prompts.json; the additional lower-body brief specified four consistent front-view costume cutouts (black cargo trousers, brown work trousers, navy coveralls, and ragged creature legs), true transparency, matched lighting and no scenery/text. action-atlas.js records the source bounds and anchors.

---

## Game pacing and artwork update

Police start well behind the character. Starting speed is 190 px/s (previously 292); speed caps at 255. Encounters use one spaced queue instead of overlapping independent spawners. Jump airtime is about 1.24 seconds before a second jump; attacks last 0.82 seconds, with a 0.53-second active window, increased reach and a 0.24-second input buffer. The simulation uses fixed 120 Hz updates. Feet are registered per sprite frame; run poses use a ping-pong loop with short crossfades, plus eased crouch and landing response.

Generated detailed transparent police sedan, adult bystander walk atlas, and weathered barricade/chain-hook artwork replace the simple gameplay shapes. Original character images are preserved. Assets: `assets/pursuit-patrol.webp`, `assets/pursuit-bystanders.webp`, `assets/pursuit-road-props.webp`; `pursuit-atlas.js` records source rectangles and foot pivots. Built-in image generation prompts requested realistic painted cinematic side-view assets, transparent backgrounds, consistent walk poses, moonlit material detail and no pixel art.

Four generated six-pose painted character atlases (`assets/*-runner.webp`) animate running and signature attacks. The engine uses a 3×2 atlas and retains vector fallbacks while art loads.

# Prior release: Midnight Pursuit + cinematic encounters

The portfolio now uses generated photographic character encounter plates with separate foreground effects (Jason: machete and glass; Freddy: claws and cuts; Myers: opening door, power cuts and knife; Creeper: wings, dust and talon shadows). These are still-image compositions with animated layers, not recorded live-action video. The legacy vector scenes remain as a prior implementation, while cinematic-scares.js supplies the active controller.

Last Light is now Midnight Pursuit: a smooth illustrated side-scrolling slasher chase on a painted industrial street. Four playable characters use individual attack range/cooldown/weapon animations. Adult NPCs react to attacks and fall without graphic injury. Two police cars replace the monster; the pursuit gauge increases from collisions, decreases with signal pickups, and ends in capture or escape at 1,600 metres. Keyboard: Space/Up jump, X/J attack, Down duck, P pause. Touch buttons and local best distance are included.

Image generation: built-in image tool. Character references: existing assets/{jason,freddy,myers,creeper}-rewired.webp. Prompt set: photoreal 35mm practical-effects-style lake/machete encounter; boiler room/claw foreground encounter; white-mask suburban doorway encounter; winged rural-road creature encounter. Preserve portfolio costume cues, landscape framing, no text or graphic injury. The town backdrop uses a wide empty wet industrial street, moonlit warehouses, fog and rust-red distant illumination. Assets saved in assets/{jason,freddy,myers,creeper}-encounter.webp and assets/pursuit-town.webp.

---

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

## Last Light / haunted portfolio update
Animated breathing portraits trigger a brief full-screen character lunge when opened; Escape dismisses it. Footer controls disable scares or enable a synthesized sound sting (off by default). Reduced-motion mode suppresses jump scares and decorative motion. Blood drips and SVG cobwebs are pointer-transparent screen overlays.

Projects contains Last Light: a canvas runner using the existing four character portraits as playable characters and pursuers, with graves, hanging chains, collectible signals, double jumps, duck, pause/resume, victory at 13 signals, and local best score. Keyboard: Space/Up, Down, P. Touch buttons are included. No remote scores or tracking.

Artist asset: assets/artist-alter-ego.webp. Generated with the built-in image tool using a fictional adult male horror-artist portrait brief: cracked ivory mask, dark hoodie, abandoned studio, crimson and green lighting, cobwebs, no text. An invented alter ego, not an actual likeness.

## Pixel Inferno upgrade
All four in-game characters are now native canvas pixel sprites with animated feet and individual masks, hats, weapons, and silhouettes. The inferno has scrolling rock layers, lava currents, flames and rising embers. Space/Up jumps (second press double jumps), Down ducks, P pauses/resumes; touch buttons remain available.

Desktop pointer hover triggers each Nightmare Icons portrait after 180 ms. Jason uses a water-toned rise and machete sweep, Freddy a dream warp and claw overlay, Myers a monochrome stepped approach, Creeper a wing-shadow dive. Per-character cooldown prevents loops. Tap and keyboard click still reveal the meaning and trigger scares. Visible blood animation now stretches drips and drops them down the screen. Reduced-motion settings disable decorative motion and scares.

## Choreographed character encounters
scare-scenes.js replaces moving-portrait scares with original layered vector encounters. Jason emerges from a lake, raises and swings a machete, then fractures the screen. Freddy's articulated glove reaches out before four staggered claw cuts. Myers appears as a door swings open, approaches during two blackouts, tilts his head and raises a knife. The Creeper beats separate wings, dives, extends talons and opens its jaw before a wing blackout. Encounters last 3.3–3.6 seconds, retain Escape/Close and the scares/motion controls, and use distinct optional synthesized sound tones. Full-screen photos are hidden during these sequences.

## Expanded interference lab
Four live looks (Dead channel, Heat signature, Submerged, X-ray), RGB fracture and scan-line depth controls, tracking sweep, scratches, freeze/resume, original comparison, and pointer inspection light. Mutate randomizes the new controls; Reset restores all controls. Reduced-motion remains respected. Everything renders locally using the existing image; no camera, uploads or external requests.

## Directional haunted scrolling
Native scrolling now adds a small velocity-based drag and tilt, settling when scrolling stops. Crossing into a section triggers a direction-aware shadow/blood smear and a short section arrival. No scroll snapping, wheel interception, forced navigation, or focus changes. Motion off and system reduced-motion cancel all effects immediately. The sweep never intercepts clicks; the animated drag loop stops at rest.

## The Human Horror / cinematic exhibition, first direction
Original redesign informed by studying Light in the Darkness (https://www.lightinthedarkness.it/), the Awwwards listing for Best Horror Scenes (https://www.awwwards.com/sites/best-horror-scenes), and The Cursed Library case study (https://www.awwwards.com/the-cursed-library.html). Reference principles: layered perception, typography-led exhibition pacing, and a coherent journey. No third-party artwork, code or brand elements were copied.

New exhibition.css and exhibition.js create a cinematic split-image opening, interactive Reality/Nightmare color perception, pointer light/parallax, a readable prologue, large editorial case studies, a horizontally scrollable character filmstrip with buttons and keyboard navigation, a full-screen chapter index with artwork previews, chapter progress rail, and always-available motion/scare/sound settings. All existing art case files, character stories/encounters, game, lab, contact links and reduced-motion controls remain. Previous release is preserved on backup/before-cinematic-revamp-1ca9fc2. No new dependencies or external assets.
