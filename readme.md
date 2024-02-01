## EyePop.ai Motion Capture Demo

A realtime motion capture demo in the browser using the simple low code EyePop platform.

---

### Getting started

- Log into your EyePop account at https://dashboard.eyepop.ai/sign-in
- Create your own **API Pop** and select _Live - People and Common Object_ from the object library
- Check out the **API Info** section of your Pop and copy'n paste the `endpoint` and `Auth Token` into `config.js` of your local copy of this repo.
- Edit the `model.js` file with your own mixamorig enabled rig file path. Either fork this sandbox and upload your own model or replace the path with a link.

### Need a Web Server locally to test?

- Easiest: [Web based IDE](https://replit.com/)
- Option 1) Python: `python3 -m http.server 9001`
- Option 2) [LiveServer Extension to VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

Start your web server from within the **_parent_** directory and check out the examples: http://localhost:9001/1_upload_image.html

---

## Overview

In this documentation, we'll talk about the basic architecture choices to allow for advanced graphics drawing with the EyePopSDK.
To get started let's dive into the [`1-heatmap_shoppers.html`](./1-heatmap_shoppers.html) demo.
Our html contains a background canvas and video element and the main script components are in:

- `run()`: Starts the drawing loop
- `save()`: Saves the prediction data to a json data file
- `load()`: Loads the saved json data file

The majority of this code can be found in the [`develop documentation`](https://docs.google.com/document/d/1Bww57Zfn4csWAebSh-xSDa6c4aJ-l1RgFbSgqbew9S0/edit#heading=h.bxxeegbkyqlg) so next lets dive into the specifics of the Three.js setup.

---

## Advanced Graphics Architecture Overview

This project uses the [`../util/ThirdEyePop.js`]('../utils/ThirdEyePop.js') framework to handle the Three.js rendering and scene creation.

Notable Features:

- Custom post effect stack for rendering video directly to canvas, heatmap rendering
- Video playback buffers and syncs to prediction data
- Display responsive and OnHoverOver/OnHoverOff shows dat.gui controls
- Procedural geometry building for pose bones and more!

---

`../util/ThirdEyePop.js`

**_Description:_**
This is the main utility class, it handles rendering the scene, moving meshes to match the prediction data, buffering video playback, the render loop, and more.

**_API_**

- `setup()`: Initializes the renderer and mesh managers
- `getPercentAnalyzed()`: Returns a 0-100 integer percentage of the prediction data loaded.
- `render()`: Runs the render loop manually, automatically renders otherwise
- `pushPredictionData(predictionData)`: Takes prediction data and stores it to an internal stack.
- `popPredictionData()`: Pops one frame off the stack with `predictionData.shift()`.
- `getPredictionData()`: Gets all the prediction frame data.

---

`managers/SceneManager.js`

**_Description:_**
The class that builds and manages adding meshes. Currently handles drawing center points, person paths, person bounds, person trace ids, and person poses.

---

`managers/SceneManager.js`

**_Description:_**
The class that builds and manages adding meshes and moving them around in a scene. It notably has a PeopleManager subclass which is used to track any objects with the person classLabel.

---

`managers/RenderManager.js`

**_Description:_**
The main rendering class, contains an Effect Compositor and camera creation/rendering.
