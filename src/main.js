import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";

(async function () {
  var cameraKit = await bootstrapCameraKit({ apiToken: "YOUR_API" });
  const session = await cameraKit.createSession();
  document.getElementById("canvas").replaceWith((await session).output.live);
  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    "<GROUP_ID>",
  ]);
  session.applyLens(lenses[0]);
  let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
  const source = await createMediaStreamSource(mediaStream, {
    transform: Transform2D.MirrorX,
    cameraType: "front",
  });
  await session.setSource(source);
  session.source.setRenderSize(window.innerWidth, window.innerHeight);
  session.play();
})();
