document.addEventListener('DOMContentLoaded', () => {
    const dDayTitleInput = document.getElementById('dDayTitle');
    const dDayDateInput = document.getElementById('dDayDate');
    const setDDayButton = document.getElementById('setDDay');
    const cancelDDayButton = document.getElementById('cancelDDay');
    const dDayTitleDisplay = document.getElementById('dDayTitleDisplay');
    const dDayCount = document.getElementById('dDayCount');
    const dDayDisplay = document.getElementById('dDayDisplay');

    // 저장된 D-day 정보 불러오기
    const savedDDay = JSON.parse(localStorage.getItem('dDay'));
    if (savedDDay) {
        updateDDayDisplay(savedDDay.title, savedDDay.date);
        cancelDDayButton.style.display = 'inline-block'; // 저장된 D-day가 있으면 취소 버튼 표시
    } else {
        cancelDDayButton.style.display = 'none'; // 저장된 D-day가 없으면 취소 버튼 숨김
    }

    setDDayButton.addEventListener('click', () => {
        const title = dDayTitleInput.value.trim();
        const date = dDayDateInput.value;

        if (!title || !date) {
            alert('목표와 날짜를 모두 입력해주세요.');
            return;
        }

        // D-day 정보 저장
        const dDayInfo = {
            title: title,
            date: date
        };
        localStorage.setItem('dDay', JSON.stringify(dDayInfo));

        updateDDayDisplay(title, date);
        cancelDDayButton.style.display = 'inline-block'; // D-day 설정 시 취소 버튼 표시
        
        // 입력 필드 초기화
        dDayTitleInput.value = '';
        dDayDateInput.value = '';
    });

    // 취소 버튼 이벤트 리스너
    cancelDDayButton.addEventListener('click', () => {
        if (confirm('D-day를 취소하시겠습니까?')) {
            localStorage.removeItem('dDay');
            dDayDisplay.style.display = 'none';
            dDayTitleInput.value = '';
            dDayDateInput.value = '';
            cancelDDayButton.style.display = 'none'; // D-day 취소 시 취소 버튼 숨김
        }
    });

    function updateDDayDisplay(title, date) {
        const targetDate = new Date(date);
        const today = new Date();
        
        // 시간 차이 계산 (밀리초)
        const timeDiff = targetDate.getTime() - today.getTime();
        
        // 일수 차이 계산
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        // D-day 표시 업데이트
        dDayTitleDisplay.textContent = title;
        dDayCount.textContent = `D-${dayDiff}`;
        
        // D-day 섹션 표시
        dDayDisplay.style.display = 'block';
    }

    // 매일 자정에 D-day 업데이트
    function updateDDayAtMidnight() {
        const savedDDay = JSON.parse(localStorage.getItem('dDay'));
        if (savedDDay) {
            updateDDayDisplay(savedDDay.title, savedDDay.date);
        }
    }

    // 다음 자정까지 남은 시간 계산
    function getTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return midnight.getTime() - now.getTime();
    }

    // 자정에 D-day 업데이트
    setTimeout(() => {
        updateDDayAtMidnight();
        // 이후 24시간마다 업데이트
        setInterval(updateDDayAtMidnight, 24 * 60 * 60 * 1000);
    }, getTimeUntilMidnight());
}); 