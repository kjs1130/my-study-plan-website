document.addEventListener('DOMContentLoaded', () => {
    const noiseButtons = document.querySelectorAll('.noise-btn');
    let currentlyPlaying = null;

    // 오디오 컨텍스트 생성
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // 백색소음 생성 함수
    function createWhiteNoise(type) {
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        switch(type) {
            case 'rain':
                // 비 내리는 소리 - 주기적인 패턴과 랜덤한 강도
                for (let i = 0; i < bufferSize; i++) {
                    const time = i / audioContext.sampleRate;
                    const dropPattern = Math.sin(time * 20) * 0.5; // 물방울 패턴
                    const randomNoise = Math.random() * 0.3; // 배경 소음
                    output[i] = dropPattern + randomNoise;
                }
                break;

            case 'cafe':
                // 카페 소음 - 여러 주파수의 중첩된 소리
                for (let i = 0; i < bufferSize; i++) {
                    const time = i / audioContext.sampleRate;
                    const baseNoise = Math.random() * 0.2; // 기본 배경 소음
                    const voicePattern = Math.sin(time * 5) * 0.1; // 사람들의 목소리 패턴
                    const machineNoise = Math.sin(time * 50) * 0.15; // 커피 머신 소리
                    output[i] = baseNoise + voicePattern + machineNoise;
                }
                break;

            case 'nature':
                // 자연의 소리 - 부드러운 바람 소리와 새소리
                for (let i = 0; i < bufferSize; i++) {
                    const time = i / audioContext.sampleRate;
                    const windNoise = Math.sin(time * 2) * 0.3; // 바람 소리
                    const birdPattern = Math.random() > 0.99 ? Math.sin(time * 100) * 0.2 : 0; // 가끔 들리는 새소리
                    const leaves = Math.sin(time * 10) * 0.1; // 나뭇잎 소리
                    output[i] = windNoise + birdPattern + leaves;
                }
                break;
        }

        return noiseBuffer;
    }

    // 소리 재생 함수
    function playSound(type) {
        if (currentlyPlaying) {
            currentlyPlaying.stop();
        }

        const noiseBuffer = createWhiteNoise(type);
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        
        // 볼륨 조절
        gainNode.gain.value = 0.5; // 전체 볼륨을 50%로 설정
        
        source.buffer = noiseBuffer;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.loop = true;
        source.start();
        currentlyPlaying = source;
    }

    // 버튼 이벤트 리스너
    noiseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const soundType = button.dataset.sound.replace('Sound', '');
            
            if (button.textContent === '재생') {
                playSound(soundType);
                button.textContent = '정지';
            } else {
                if (currentlyPlaying) {
                    currentlyPlaying.stop();
                    currentlyPlaying = null;
                }
                button.textContent = '재생';
            }
        });
    });

    // 페이지를 벗어날 때 소리 정지
    window.addEventListener('beforeunload', () => {
        if (currentlyPlaying) {
            currentlyPlaying.stop();
        }
    });
}); 