let players = {};
let currentPlayer = null;

// YouTube API가 로드되면 호출되는 함수
function onYouTubeIframeAPIReady() {
    initializePlayers();
}

// 플레이어 초기화 함수
function initializePlayers() {
    const buttons = document.querySelectorAll('.music-btn, .noise-btn');
    
    buttons.forEach(button => {
        const playerId = button.dataset.player;
        const videoId = button.dataset.video;
        
        // YouTube 플레이어 생성
        players[playerId] = new YT.Player(playerId, {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'disablekb': 1,
                'enablejsapi': 1,
                'fs': 0,
                'rel': 0,
                'loop': 1,
                'playlist': videoId
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

// 플레이어가 준비되면 호출되는 함수
function onPlayerReady(event) {
    // 플레이어 준비 완료
    console.log(`Player ${event.target.getIframe().id} is ready`);
}

// 플레이어 상태 변경 시 호출되는 함수
function onPlayerStateChange(event) {
    // Optional: Update button text when playback ends (due to loop or external stop)
    // if (event.data === YT.PlayerState.ENDED) {
    //     const iframeId = event.target.getIframe().id;
    //     const button = document.querySelector(`[data-player='${iframeId}']`);
    //     if(button) button.textContent = 'Play';
    //     if(currentPlayer === event.target) currentPlayer = null;
    // }
}

// 버튼 클릭 이벤트 처리
document.addEventListener('DOMContentLoaded', () => {
    // YouTube API가 로드되지 않았다면 수동으로 로드
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        // API가 이미 로드된 경우 바로 플레이어 초기화
        initializePlayers();
    }

    const buttons = document.querySelectorAll('.music-btn, .noise-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const playerId = button.dataset.player;
            const player = players[playerId];
            
            if (!player) return; // Player not initialized yet

            // Check current state of the clicked player
            const playerState = player.getPlayerState();

            if (playerState === YT.PlayerState.PLAYING || playerState === YT.PlayerState.BUFFERING) {
                // If clicked player is playing or buffering, pause it
                player.pauseVideo();
                button.textContent = 'Play';
                if(currentPlayer === player) currentPlayer = null; // Reset currentPlayer if it was the clicked one
            } else {
                // If clicked player is not playing, pause the currently playing one first
                if (currentPlayer && currentPlayer !== player) {
                    currentPlayer.pauseVideo();
                    // Find the button associated with the previously playing player and update its text
                    const prevButton = document.querySelector(`[data-player='${currentPlayer.getIframe().id}']`);
                    if (prevButton) {
                        prevButton.textContent = 'Play';
                    }
                }

                // Then play the clicked player
                player.playVideo();
                button.textContent = 'Stop';
                currentPlayer = player; // Set the clicked player as the new currentPlayer
            }
        });
    });
}); 