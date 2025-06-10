import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as mp from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';

export default function BeautyPanel({ participantID }) {
  const videoRef = useRef(null);
  const [beautyOn, setBeautyOn] = useState(false);

  useEffect(() => {
    if (!beautyOn) return;

    const faceMesh = new mp.FaceMesh({
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(results => {
      // Aqui você pode aplicar canvas com blush/sombra baseado nos landmarks
      const canvas = document.getElementById('beauty-canvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          // Exemplo: desenha pontos como blush
          ctx.fillStyle = "rgba(255, 105, 180, 0.4)";
          const leftCheek = landmarks[234];
          const rightCheek = landmarks[454];
          ctx.beginPath();
          ctx.arc(leftCheek.x * canvas.width, leftCheek.y * canvas.height, 20, 0, 2 * Math.PI);
          ctx.arc(rightCheek.x * canvas.width, rightCheek.y * canvas.height, 20, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    });

    const video = document.querySelector('video');
    if (video) {
      const camera = new cam.Camera(video, {
        onFrame: async () => {
          await faceMesh.send({ image: video });
        },
        width: 640,
        height: 480
      });
      camera.start();
    }
  }, [beautyOn]);

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setBeautyOn(!beautyOn)}>
        {beautyOn ? 'Desligar Filtro' : 'Ligar Filtro de Beleza'}
      </button>
      <canvas id="beauty-canvas" width="640" height="480" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
    </div>
  );
}