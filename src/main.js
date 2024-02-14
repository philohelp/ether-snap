import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";

(async function () {
  var cameraKit = await bootstrapCameraKit({
    apiToken:
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk2MTg5NDc4LCJzdWIiOiI2YzljNjA0MC1kZTNkLTQyMTQtOWZiOC04MDhiZjBmNTlmOGR-U1RBR0lOR340ZGFiMTBhYi01MzM4LTQ1YWItYTM4NS1jNTZkN2VhNTcwMjQifQ.VlbKq0bmZmAV8jlBQz2_vkLaAiUbug0YqhnmteHBtqU",
  });
  const session = await cameraKit.createSession();
  document.getElementById("canvas").replaceWith((await session).output.live);
  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    "3699891c-0f77-4d0c-9a1f-2d47821c50f9",
  ]);
  session.applyLens(lenses[1]);
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });
  const source = await createMediaStreamSource(mediaStream, {
    cameraType: "back",
  });
  await session.setSource(source);
  session.source.setRenderSize(window.innerWidth, window.innerHeight);
  session.play();
})();
