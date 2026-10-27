# Character action reels — production brief

Status: video playback and integration prepared. No action reels have been rendered. The manifest deliberately contains null entries; current photographic scenes remain the fallback. Do not describe this stage as completed video scares.

## Creative direction

Use 4–5 second continuous first-person encounters. The character's shoulders, elbow, wrist, clothes and weapon must move together with real acceleration and follow-through. Photographic practical-effects appearance, readable silhouettes, one clear attack per shot, no floating weapons or Ken Burns motion. The environment and lens stay subordinate to the performance. Use the existing reinterpretations as the costume reference, rather than replacing the portfolio's identity with unrelated movie footage.

References found through public pages (not a frame-by-frame video review):
- LIGHTS ARE OFF: https://www.youtube.com/c/LIGHTSAREOFF/about — immersive POV horror direction, described in the filmmaker roundup below.
- Shortest Blockbusters: https://www.tiktok.com/@shortestblockbusters — short CGI/found-footage encounters, described in the roundup.
- Danny Donahue: https://www.youtube.com/c/dannyfdonahue/videos — horror shorts reference.
- Filmmaker roundup: https://www.neonsplatter.com/afternoon-delights/four-tiktok-horror-filmmakers
- Cinematic framing/lighting: https://www.pinterest.com/ideas/cinematic-horror-shots/896499914838/

Use these as creative references. No third-party clips have been downloaded, copied, or added to the site.

## Render prompts

Render a pilot before spending on all variants. Five seconds, 16:9, photoreal, 24–30 fps. Keep character and weapon action in the central 40% so the shot also works in a portrait crop. If that crop cannot preserve the motion, produce a 9:16 variant. The impact times below are storyboard targets; measure the rendered clip and set the final manifest cue from its actual action.

### Jason / The Anonymous — the dock

Reference: assets/jason-encounter.webp and assets/jason-rewired.webp.

POV, low camera on a wet wooden dock at night. The adult masked slasher in a weathered coat with blank identity badges and subtle green cable lights stands three metres ahead, breathing with physical chest movement. Dark lake behind him. He turns his shoulders, firmly plants a boot and raises a single machete over his right shoulder, then steps directly toward the camera and swings it down diagonally across the lens in one forceful continuous motion. His elbow, wrist, shoulder and torso all articulate together; the machete stays gripped in the same hand. His coat and dangling badges lag behind the movement and settle. A tiny lens recoil at the near miss, then the body follows through into shadow. Realistic weight and anatomy, moonlit practical costume, natural shutter blur, no graphic injury, no text, no extra limbs, no disconnected weapon, no dissolves, no image zoom as a substitute for action. 0–1.3 s hold and recognition; 1.3–2.7 s wind-up; about 3.0 s near-lens strike; 3–5 s follow-through and darkness.

### Freddy / The Insomniac — the boiler room

Reference: assets/freddy-encounter.webp and assets/freddy-rewired.webp.

First-person view at eye level in a claustrophobic boiler corridor. An adult fedora-wearing nightmare figure in a distressed red-and-black sweater with clock motifs watches from an arm's length beyond the lens. Warm furnace side light, cooler shadow on his face. He slowly curls and spreads four ornate clock-hand blades on a leather glove, tilts his head with a slight sinister smile, rotates his shoulder and forcefully rakes the articulated bladed hand across the camera from right to left. His forearm and fingers remain anatomically connected; the blades maintain their spacing and follow his actual hand. Shallow focus shifts briefly to the knuckles as they pass inches from the lens. Sparks from a nearby pipe, then his arm recoils and the light dims. Five-second practical-effects-looking horror take, actual body action, no stationary portrait with an independent slash overlay, no extra fingers or duplicated hands, no text or graphic injury. Recognition 0–1.2 s; glove flex 1.2–2.4 s; rake around 3.0 s; recoil 3.0–5.0 s.

### Michael Myers / The Bystander — the doorway

Reference: assets/myers-encounter.webp and assets/myers-rewired.webp.

Fixed first-person camera inside a dim suburban hallway, facing a half-open door. An adult white-masked figure wearing dark blue coveralls and overlapping reflective city panels stands still beyond it. Hold the unnerving stillness for a second. He deliberately pushes the door open with his free hand, takes one heavy step over the threshold, lifts a single kitchen knife in his right hand, then drives his shoulder, upper arm and forearm forward in one sudden downward strike toward the lens, stopping before contact. His whole body completes the follow-through, his mask tilts very slightly, and the camera recoils into darkness. A single warm overhead light, physical costume and coherent joints, minimal camera movement before the attack, no repeated flashing, no floating knife, no morphing mask, no text, no wounds. 0–1.4 s stillness; 1.4–2.8 s door and step; strike near 3.4 s; finish by 5 s.

### The Creeper / The Consumer — the road

Reference: assets/creeper-encounter.webp and assets/creeper-rewired.webp.

POV looking down a deserted rural road at dusk. An adult winged creature in a weathered broad-brim hat and ragged coat patched with rusted panels and scraps crouches on a truck roof in the middle distance. The wings are connected at the shoulders. It launches with its legs, opens the wings into a single strong downstroke and swoops fast toward the viewer. The coat streams backward, the torso banks, and one articulated taloned hand reaches toward the lens as its face fills the frame. A wing passes close to the camera and naturally blocks the light to black. Coherent head and hands, grounded take-off, visible wing joints, cinematic practical creature appearance, no instant scale-up of a still image, no extra wings, no text, no graphic injury. 0–1 s distant hold; 1–2.5 s crouch and launch; 2.5–3.5 s swoop; talon/wing near lens about 3.7 s; black by 5 s.

## Delivery and review

- Review the full clip, not just a thumbnail: anatomy, weapon continuity, readable motion and follow-through.
- Export H.264 MP4, yuv420p, fast-start metadata; 720p first pass, target under 3 MB each. Preserve original generated master separately if feasible.
- Save reviewed files to assets/{jason,freddy,myers,creeper}-scare.mp4.
- Set manifest src, durationMs, impactMs and focalPoint for each reviewed clip. durationMs must be 1–8 seconds, impactMs must occur inside it. Optional portraitSrc switches to a portrait clip on narrow viewports.
- Footage stays muted. Existing Sound toggle gates the synthesized signature sting, triggered at the media clock impact cue. No autoplay sound on hover.
- playsinline and muted support mobile playback. Pause/stop on dismissal; timeout or rejected playback falls back to the current scene. Scares-off and reduced-motion gates remain in haunt.js.
- Before release, verify actual body motion, mobile cropping, slow-loading fallback, repeated entry/exit, no late audio after close, and a complete uninterrupted playback on desktop and mobile.
